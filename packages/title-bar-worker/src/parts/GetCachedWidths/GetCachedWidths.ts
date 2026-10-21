import * as TitleBarMeasurementCache from '../TitleBarMeasurementCache/TitleBarMeasurementCache.ts'

export const getCachedWidths = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  onCacheKey: (cacheKey: string) => void,
): Promise<readonly number[] | undefined> => {
  try {
    const cacheKey = await TitleBarMeasurementCache.getCacheKey(texts, fontWeight, fontSize, fontFamily, letterSpacing)
    onCacheKey(cacheKey)
    return await TitleBarMeasurementCache.getWidths(cacheKey, texts.length)
  } catch {
    // Cache failures must not prevent title bar rendering.
    return undefined
  }
}
