import * as MeasureTextWitdth from '../MeasureTextWidth/MeasureTextWidth.ts'

export const measureTitleBarEntryWidth = (label: string, fontWeight: number, fontSize: number, fontFamily: string, letterSpacing: string): number => {
  const isMonospaceFont = false
  const charWidth = 0
  return MeasureTextWitdth.measureTextWidth(label, fontWeight, fontSize, fontFamily, letterSpacing, isMonospaceFont, charWidth)
}
