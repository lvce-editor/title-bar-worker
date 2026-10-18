import * as TitleBarMeasurementCache from '../TitleBarMeasurementCache/TitleBarMeasurementCache.ts'

const cacheReadTimeoutMs = 500

const withCacheReadTimeout = async <T>(promise: Promise<T>): Promise<T | undefined> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<undefined>((resolve) => {
    timeoutId = setTimeout(resolve, cacheReadTimeoutMs, undefined)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}

export const getCachedWidths = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  onCacheKey: (cacheKey: string) => void,
): Promise<readonly number[] | undefined> => {
  try {
    return await withCacheReadTimeout(
      (async (): Promise<readonly number[] | undefined> => {
        const cacheKey = await TitleBarMeasurementCache.getCacheKey(texts, fontWeight, fontSize, fontFamily, letterSpacing)
        onCacheKey(cacheKey)
        return TitleBarMeasurementCache.getWidths(cacheKey, texts.length)
      })(),
    )
  } catch {
    // Cache failures must not prevent title bar rendering.
    return undefined
  }
}
