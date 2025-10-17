import { MenuEntryId } from '@lvce-editor/constants'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as AddWidths from '../AddWidths/AddWidths.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'
import { getTitleBarButtons } from '../GetTitleBarButtons/GetTitleBarButtons.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as RendererWorker from '../ParentRpc/ParentRpc.ts'

export const loadContent2 = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { platform, controlsOverlayEnabled, titleBarStyleCustom, labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding } =
    state
  const titleBarEntries = await MenuEntries.getMenuEntries(MenuEntryId.TitleBar)
  const withWidths = AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  const buttons = getTitleBarButtons(platform, controlsOverlayEnabled, titleBarStyleCustom)
  // @ts-ignore
  const workspaceUri = await RendererWorker.invoke('Workspace.getUri')
  const title = getTitle(workspaceUri)
  const iconWidth = 30
  return {
    ...state,
    titleBarEntries: withWidths,
    buttons,
    title,
    iconWidth,
  }
}
