import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'
import { measureTitleWidth } from '../MeasureTitleWidth/MeasureTitleWidth.ts'

export const setTitleTemplate = async (state: TitleBarMenuBarState, titleTemplate: string): Promise<TitleBarMenuBarState> => {
  const { appName, labelFontFamily, labelFontSize, labelFontWeight, labelLetterSpacing, workspaceUri } = state
  const title = getTitle(workspaceUri, titleTemplate, appName)
  const titleWidth = await measureTitleWidth(title, labelFontWeight, labelFontSize, labelFontFamily, labelLetterSpacing)
  return {
    ...state,
    title,
    titleTemplate,
    titleWidth,
  }
}
