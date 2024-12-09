import * as MeasureTitleBarEntryWidth from '../MeasureTitleBarEntryWidth/MeasureTitleBarEntryWidth.ts'

export const create = (id: any, uri: any, x: any, y: any, width: any, height: any): any => {
  return {
    uid: id,
    titleBarEntries: [],
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
    labelFontWeight: 400,
    labelFontSize: 13,
    labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
    labelPadding: 8,
    labelLetterSpacing: 0,
    titleBarHeight: height,
    x,
    y,
    width,
    height,
  }
}

const addWidths = (entries: any, labelPadding: any, fontWeight: any, fontSize: any, fontFamily: any, letterSpacing: any): any => {
  const withWidths = []
  for (const entry of entries) {
    const textWidth = MeasureTitleBarEntryWidth.measureTitleBarEntryWidth(entry.label, fontWeight, fontSize, fontFamily, letterSpacing)
    const width = textWidth + labelPadding * 2
    withWidths.push({ ...entry, width })
  }
  return withWidths
}

export const loadContent = async (state: any): Promise<any> => {
  const { labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding } = state
  const titleBarEntries: any = []
  const withWidths = addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  // const visible = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(withWidths, width)
  // console.log({ visible })
  return {
    ...state,
    titleBarEntries: withWidths,
  }
}
