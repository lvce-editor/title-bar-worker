import { CacheWorker } from '@lvce-editor/rpc-registry'
import * as LaunchCacheWorker from '../LaunchCacheWorker/LaunchCacheWorker.ts'

const cacheName = 'lvce-title-bar-measurements-v1'
const cacheHeaders = { 'content-type': 'application/json' }

export const getCacheKey = async (
  labels: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<string> => {
  const input = JSON.stringify([labels, fontWeight, fontSize, fontFamily, letterSpacing])
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `/title-bar-measurements/v1/${hash}`
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
