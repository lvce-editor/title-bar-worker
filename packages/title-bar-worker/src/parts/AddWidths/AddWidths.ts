import * as MeasureTitleBarEntryWidth from '../MeasureTitleBarEntryWidth/MeasureTitleBarEntryWidth.ts'

export const addWidths = (
  entries: any,
  labelPadding: number,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): readonly any[] => {
  const withWidths = []
  for (const entry of entries) {
    const textWidth = MeasureTitleBarEntryWidth.measureTitleBarEntryWidth(entry.label, fontWeight, fontSize, fontFamily, letterSpacing)
    const width = textWidth + labelPadding * 2
    withWidths.push({ ...entry, width })
  }
  return withWidths
}
