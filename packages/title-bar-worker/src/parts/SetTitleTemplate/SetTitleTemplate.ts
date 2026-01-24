import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const setTitleTemplate = (state: TitleBarMenuBarState, titleTemplate: string): TitleBarMenuBarState => {
  return {
    ...state,
    titleTemplate,
  }
}
