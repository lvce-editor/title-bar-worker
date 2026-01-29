import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { getTitle } from '../GetTitle/GetTitle.ts'

const APP_NAME = 'Lvce Editor'

export const setTitleTemplate = (state: TitleBarMenuBarState, titleTemplate: string): TitleBarMenuBarState => {
  const title = getTitle(state.workspaceUri, titleTemplate, APP_NAME)
  return {
    ...state,
    title,
    titleTemplate,
  }
}
