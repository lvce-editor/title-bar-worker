import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'
import { measureTitleWidth } from '../MeasureTitleWidth/MeasureTitleWidth.ts'

export const setTitleTemplate = async (state: TitleBarMenuBarState, titleTemplate: string): Promise<TitleBarMenuBarState> => {
  const {
    applicationName,
    labelFontFamily,
    labelFontSize,
    labelFontWeight,
    labelLetterSpacing,
    titleWidth: oldTitleWidth,
    width,
    workspaceUri,
  } = state
  const title = getTitle(workspaceUri, titleTemplate, applicationName)
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
