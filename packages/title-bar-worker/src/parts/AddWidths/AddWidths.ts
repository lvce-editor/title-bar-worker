import * as MeasureTitleBarEntryWidth from '../MeasureTitleBarEntryWidth/MeasureTitleBarEntryWidth.ts'

export const addWidths = (entries: any, labelPadding: any, fontWeight: any, fontSize: any, fontFamily: any, letterSpacing: any): any => {
  const withWidths = []
  for (const entry of entries) {
    const textWidth = MeasureTitleBarEntryWidth.measureTitleBarEntryWidth(entry.label, fontWeight, fontSize, fontFamily, letterSpacing)
    const width = textWidth + labelPadding * 2
    withWidths.push({ ...entry, width })
  }
  return withWidths
}
