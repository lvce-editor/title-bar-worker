import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as AddWidths from '../AddWidths/AddWidths.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'
import { measureTitleWidth } from '../MeasureTitleWidth/MeasureTitleWidth.ts'
import * as MenuEntriesTitleBar from '../MenuEntriesTitleBar/MenuEntriesTitleBar.ts'

// TODO in the future, it could also be a multi-root workspace
export const handleWorkspaceChange = async (state: TitleBarMenuBarState, uri: string): Promise<TitleBarMenuBarState> => {
  const {
    applicationName,
    labelFontFamily,
    labelFontSize,
    labelFontWeight,
    labelLetterSpacing,
    labelPadding,
    platform,
    titleTemplate,
    titleWidth: oldTitleWidth,
    width,
  } = state
  const title = getTitle(uri, titleTemplate, applicationName)
  const titleWidth = await measureTitleWidth(title, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  const titleBarEntries = await MenuEntriesTitleBar.getMenuEntries(platform, uri)
  const withWidths = await AddWidths.addWidths(titleBarEntries, labelPadding, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  return {
    ...state,
    title,
    titleBarEntries: withWidths,
    titleWidth,
    // The title is centered, so half its width change becomes available to the menu.
    width: width + (oldTitleWidth - titleWidth) / 2,
    workspaceUri: uri,
  }
}
