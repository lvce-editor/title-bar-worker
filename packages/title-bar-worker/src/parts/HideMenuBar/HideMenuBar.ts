import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const hideMenuBar = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return {
    ...state,
    titleBarMenuBarEnabled: false,
  }
}
