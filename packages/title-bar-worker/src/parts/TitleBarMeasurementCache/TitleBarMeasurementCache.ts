import { CacheWorker } from '@lvce-editor/rpc-registry'
import * as LaunchCacheWorker from '../LaunchCacheWorker/LaunchCacheWorker.ts'

const cacheName = 'lvce-title-bar-measurements-v1'
const cacheHeaders = { 'content-type': 'application/json' }

const hash53 = (value: string, seed: number): number => {
  let hash1 = 0xde_ad_be_ef ^ seed
  let hash2 = 0x41_c6_ce_57 ^ seed
  for (const character of value) {
    const code = character.codePointAt(0)!
    hash1 = Math.imul(hash1 ^ code, 0x85_eb_ca_6b)
    hash2 = Math.imul(hash2 ^ code, 0xc2_b2_ae_35)
  }
  hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 0x85_eb_ca_6b) ^ Math.imul(hash2 ^ (hash2 >>> 13), 0xc2_b2_ae_35)
  hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 0x85_eb_ca_6b) ^ Math.imul(hash1 ^ (hash1 >>> 13), 0xc2_b2_ae_35)
  return 4_294_967_296 * (2_097_151 & hash2) + (hash1 >>> 0)
}

export const getCacheKey = async (
  labels: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<string> => {
  const input = JSON.stringify([labels, fontWeight, fontSize, fontFamily, letterSpacing])
  const hash = hash53(input, 0).toString(16).padStart(14, '0') + hash53(input, 1).toString(16).padStart(14, '0')
  return `/title-bar-measurements/v2/${hash}`
}

const isValidWidths = (value: unknown, count: number): value is readonly number[] => {
  return Array.isArray(value) && value.length === count && value.every((width) => typeof width === 'number' && Number.isFinite(width) && width >= 0)
}

export const getWidths = async (key: string, count: number): Promise<readonly number[] | undefined> => {
  await LaunchCacheWorker.launchCacheWorker()
  const item = await CacheWorker.getCacheStorageItem(key, cacheName)
  if (!item) {
    return undefined
  }
  const value: unknown = JSON.parse(new TextDecoder().decode(item.body))
  return isValidWidths(value, count) ? value : undefined
}

export const setWidths = async (key: string, widths: readonly number[]): Promise<void> => {
  await LaunchCacheWorker.launchCacheWorker()
  await CacheWorker.setCacheStorageItem(key, JSON.stringify(widths), cacheName, cacheHeaders)
}
