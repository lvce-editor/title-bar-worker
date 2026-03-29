import { measureTextWidths2 } from '../MeasureTextWidths2/MeasureTextWidths2.ts'

export const measureTextWidths = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly number[]> => measureTextWidths2(texts, fontWeight, fontSize, fontFamily, letterSpacing)
