import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import { measureTextWidths } from '../MeasureTextWidths/MeasureTextWidths.ts'

const getLabel = (entry: VisibleMenuItem): string => {
  return entry.label
}

export const addWidths = (
  entries: readonly VisibleMenuItem[],
  labelPadding: number,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): readonly any[] => {
  const labels = entries.map(getLabel)
  const widths = measureTextWidths(labels, fontWeight, fontSize, fontFamily, letterSpacing)
  const withWidths = []
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const textWidth = widths[i]
    const width = textWidth + labelPadding * 2
    withWidths.push({ ...entry, width })
  }
  return withWidths
}
