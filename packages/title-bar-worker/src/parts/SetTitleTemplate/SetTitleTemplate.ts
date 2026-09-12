import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'
import { measureTitleWidth } from '../MeasureTitleWidth/MeasureTitleWidth.ts'

export const setTitleTemplate = async (state: TitleBarMenuBarState, titleTemplate: string): Promise<TitleBarMenuBarState> => {
  const { appName, labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, titleWidth: oldTitleWidth, width, workspaceUri } = state
  const title = getTitle(workspaceUri, titleTemplate, appName)
  const titleWidth = await measureTitleWidth(title, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  return {
    ...state,
    title,
    titleTemplate,
    titleWidth,
    // The title is centered, so half its width change becomes available to the menu.
    width: width + (oldTitleWidth - titleWidth) / 2,
  }
}
