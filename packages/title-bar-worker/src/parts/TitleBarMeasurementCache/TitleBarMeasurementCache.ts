import { CacheWorker } from '@lvce-editor/rpc-registry'
import { hash53 } from '../Hash53/Hash53.ts'

const cacheName = 'lvce-title-bar-measurements-v1'

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
  const item = await CacheWorker.getCacheStorageJsonItem(key, cacheName)
  if (!item) {
    return undefined
  }
  return isValidWidths(item.value, count) ? item.value : undefined
}

export const setWidths = async (key: string, widths: readonly number[]): Promise<void> => {
  await CacheWorker.setCacheStorageJsonItem(key, widths, cacheName)
}
