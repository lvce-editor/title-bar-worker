import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { getCachedWidths } from '../GetCachedWidths/GetCachedWidths.ts'
import * as TitleBarMeasurementCache from '../TitleBarMeasurementCache/TitleBarMeasurementCache.ts'

export const measureTextWidths2 = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly number[]> => {
  if (typeof letterSpacing !== 'number') {
    throw new TypeError('letterSpacing must be of type number')
  }
  let cacheKey: string | undefined
  const cachedWidths = await getCachedWidths(texts, fontWeight, fontSize, fontFamily, letterSpacing, (key) => {
    cacheKey = key
  })
  if (cachedWidths) {
    return cachedWidths
  }
  const isMonospaceFont = false
  const charWidth = 0
  const result = await TextMeasurementWorker.invoke(
    'TextMeasurement.measureTextWidths',
    texts,
    fontWeight,
    fontSize,
    fontFamily,
    letterSpacing,
    isMonospaceFont,
    charWidth,
  )
  if (cacheKey) {
    void TitleBarMeasurementCache.setWidths(cacheKey, result).catch(() => {})
  }
  return result
}
