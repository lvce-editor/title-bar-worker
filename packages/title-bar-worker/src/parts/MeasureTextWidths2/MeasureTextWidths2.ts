import { launchTextMeasurementWorker } from '../LaunchTextMeasurementWorker/LaunchTextMeasurementWorker.ts'
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
  try {
    cacheKey = await TitleBarMeasurementCache.getCacheKey(texts, fontWeight, fontSize, fontFamily, letterSpacing)
    const cachedWidths = await TitleBarMeasurementCache.getWidths(cacheKey, texts.length)
    if (cachedWidths) {
      return cachedWidths
    }
  } catch {
    // Cache failures must not prevent title bar rendering.
  }
  const rpc = await launchTextMeasurementWorker()
  try {
    const isMonospaceFont = false
    const charWidth = 0
    const result = await rpc.invoke(
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
  } finally {
    await rpc[Symbol.asyncDispose]()
  }
}
