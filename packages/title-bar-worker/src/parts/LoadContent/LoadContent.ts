import * as AddWidths from '../AddWidths/AddWidths.ts'

export const loadContent = async (state: any): Promise<any> => {
  const { labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding } = state
  const titleBarEntries: any = []
  const withWidths = AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  // const visible = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(withWidths, width)
  // console.log({ visible })
  return {
    ...state,
    titleBarEntries: withWidths,
  }
}
