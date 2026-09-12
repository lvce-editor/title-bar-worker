import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'
import { measureTitleWidth } from '../MeasureTitleWidth/MeasureTitleWidth.ts'

// TODO in the future, it could also be a multi-root workspace
export const handleWorkspaceChange = async (state: TitleBarMenuBarState, uri: string): Promise<TitleBarMenuBarState> => {
  const { appName, labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, titleTemplate } = state
  const title = getTitle(uri, titleTemplate, appName)
  const titleWidth = await measureTitleWidth(title, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  return {
    ...state,
    title,
    titleWidth,
    // The title is centered, so half its width change becomes available to the menu.
    width: state.width + (state.titleWidth - titleWidth) / 2,
    workspaceUri: uri,
  }
}
