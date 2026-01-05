import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AddWidths from '../AddWidths/AddWidths.ts'
import { getTitleBarButtons } from '../GetTitleBarButtons/GetTitleBarButtons.ts'

export const loadContent = async (state: TitleBarMenuBarState, titleBarEntries: readonly VisibleMenuItem[]): Promise<TitleBarMenuBarState> => {
  const { controlsOverlayEnabled, labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding, platform, titleBarStyleCustom } =
    state
  const withWidths = await AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  const buttons = getTitleBarButtons(platform, controlsOverlayEnabled, titleBarStyleCustom)
  const title = 'test'
  return {
    ...state,
    buttons,
    title,
    titleBarEntries: withWidths,
  }
}
