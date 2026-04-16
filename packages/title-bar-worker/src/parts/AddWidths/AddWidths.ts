import { measureTextWidths } from '../MeasureTextWidths/MeasureTextWidths.ts'

interface EntryWithLabel {
  readonly label: string
}

export interface EntryWithWidth {
  readonly width: number
}

const getLabel = (entry: EntryWithLabel): string => {
  return entry.label
}

const getWithWidths = <T extends EntryWithLabel>(
  entries: readonly T[],
  widths: readonly number[],
  labelPadding: number,
): readonly (T & EntryWithWidth)[] => {
  const withWidths: Array<T & EntryWithWidth> = []
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const textWidth = widths[i]
    const width = textWidth + labelPadding * 2
    withWidths.push({ ...entry, width })
  }
  return withWidths
}

export const addWidths = async <T extends EntryWithLabel>(
  entries: readonly T[],
  labelPadding: number,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly (T & EntryWithWidth)[]> => {
  const labels = entries.map(getLabel)
  const widths = await measureTextWidths(labels, fontWeight, fontSize, fontFamily, letterSpacing)
  const withWidths = getWithWidths(entries, widths, labelPadding)
  return withWidths
}
