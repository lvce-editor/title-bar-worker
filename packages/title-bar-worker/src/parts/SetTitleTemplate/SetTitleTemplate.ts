import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'

export const setTitleTemplate = (state: TitleBarMenuBarState, titleTemplate: string): TitleBarMenuBarState => {
  const title = getTitle(state.workspaceUri, titleTemplate, state.appName)
  return {
    ...state,
    title,
    titleTemplate,
  }
}
