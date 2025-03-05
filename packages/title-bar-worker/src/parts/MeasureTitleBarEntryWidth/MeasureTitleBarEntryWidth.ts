import * as MeasureTextWidth from '../MeasureTextWidth/MeasureTextWidth.ts'

export const measureTitleBarEntryWidth = (label: string, fontWeight: number, fontSize: number, fontFamily: string, letterSpacing: number): number => {
  const isMonospaceFont = false
  const charWidth = 0
  return MeasureTextWidth.measureTextWidth(label, fontWeight, fontSize, fontFamily, letterSpacing, isMonospaceFont, charWidth)
}
