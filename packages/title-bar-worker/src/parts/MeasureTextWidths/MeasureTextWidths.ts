import { px } from '@lvce-editor/virtual-dom-worker'
import { createTextMeasureContext } from '../CreateTextMeasureContext/CreateTextMeasureContext.ts'
import * as GetFontString from '../GetFontString/GetFontString.ts'
import { measureTextWidths2 } from '../MeasureTextWidths2/MeasureTextWidths2.ts'

const measureTextWidthsOld = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly number[]> => {
  if (typeof letterSpacing !== 'number') {
    throw new TypeError('letterSpacing must be of type number')
  }
  const letterSpacingString = px(letterSpacing)
  const fontString = GetFontString.getFontString(fontWeight, fontSize, fontFamily)
  const ctx = createTextMeasureContext(letterSpacingString, fontString)
  const widths: number[] = []
  for (const text of texts) {
    const metrics = ctx.measureText(text)
    const { width } = metrics
    widths.push(width)
  }
  return widths
}

export const measureTextWidths = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly number[]> => {
  try {
    return measureTextWidths2(texts, fontWeight, fontSize, fontFamily, letterSpacing)
  } catch {
    return measureTextWidthsOld(texts, fontWeight, fontSize, fontFamily, letterSpacing)
  }
}
