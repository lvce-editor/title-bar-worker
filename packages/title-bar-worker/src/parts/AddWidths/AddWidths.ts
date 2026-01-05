import { measureTextWidths } from '../MeasureTextWidths/MeasureTextWidths.ts'

interface EntryWithLabel {
  readonly label: string
}

const getLabel = (entry: EntryWithLabel): string => {
  return entry.label
}

export const addWidths = async (
  entries: readonly EntryWithLabel[],
  labelPadding: number,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly any[]> => {
  const labels = entries.map(getLabel)
  const widths = await measureTextWidths(labels, fontWeight, fontSize, fontFamily, letterSpacing)
  const withWidths = []
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const textWidth = widths[i]
    const width = textWidth + labelPadding * 2
    withWidths.push({ ...entry, width })
  }
  return withWidths
}
