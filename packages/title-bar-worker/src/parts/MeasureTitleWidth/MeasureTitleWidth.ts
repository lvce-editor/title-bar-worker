import { measureTextWidths } from '../MeasureTextWidths/MeasureTextWidths.ts'

export const measureTitleWidth = async (
  title: string,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<number> => {
  const [titleWidth = 0] = await measureTextWidths([title], fontWeight, fontSize, fontFamily, letterSpacing)
  return titleWidth
}