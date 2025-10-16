import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AddWidths from '../AddWidths/AddWidths.ts'
import { getTitleBarButtons } from '../GetTitleBarButtons/GetTitleBarButtons.ts'

export const loadContent = async (state: TitleBarMenuBarState, titleBarEntries: readonly VisibleMenuItem[]): Promise<TitleBarMenuBarState> => {
  const {
    platform, controlsOverlayEnabled, titleBarStyleCustom,
    labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding } = state
  const withWidths = AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  const buttons = getTitleBarButtons(platform, controlsOverlayEnabled, titleBarStyleCustom)
  const title = 'test'
  return {
    ...state,
    titleBarEntries: withWidths,
    buttons,
    title
  }
}
