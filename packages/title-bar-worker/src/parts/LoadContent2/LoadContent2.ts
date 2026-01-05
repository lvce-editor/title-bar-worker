import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as AddWidths from '../AddWidths/AddWidths.ts'
import { hydrate } from '../ElectronApplicationMenu/ElectronApplicationMenu.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'
import { getTitleBarButtons } from '../GetTitleBarButtons/GetTitleBarButtons.ts'
import * as MenuEntriesTitleBar from '../MenuEntriesTitleBar/MenuEntriesTitleBar.ts'

export const loadContent2 = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  const { controlsOverlayEnabled, labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, labelPadding, platform, titleBarStyleCustom } =
    state
  const titleBarEntries = await MenuEntriesTitleBar.getMenuEntries(platform)
  const withWidths = await AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  const buttons = getTitleBarButtons(platform, controlsOverlayEnabled, titleBarStyleCustom)
  const workspaceUri = await RendererWorker.invoke('Workspace.getUri')
  const title = getTitle(workspaceUri)
  const iconWidth = 30
  if (titleBarStyleCustom === false) {
    return hydrate(state)
  }
  return {
    ...state,
    buttons,
    iconWidth,
    title,
    titleBarButtons: buttons,
    titleBarEntries: withWidths,
  }
}
