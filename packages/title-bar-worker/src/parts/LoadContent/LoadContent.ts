import * as AddWidths from '../AddWidths/AddWidths.ts'

export const loadContent = async (state: any, titleBarEntries: readonly any[]): Promise<any> => {
  const { labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding } = state
  const withWidths = AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  return {
    ...state,
    titleBarEntries: withWidths,
  }
}
