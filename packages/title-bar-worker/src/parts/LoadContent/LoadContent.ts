import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as AddWidths from '../AddWidths/AddWidths.ts'

export const loadContent = async (state: TitleBarMenuBarState, titleBarEntries: readonly any[]): Promise<TitleBarMenuBarState> => {
  const { labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding } = state
  const withWidths = AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  return {
    ...state,
    titleBarEntries: withWidths,
  }
}
