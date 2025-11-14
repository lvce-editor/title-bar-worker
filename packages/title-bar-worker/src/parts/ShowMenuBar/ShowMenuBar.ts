import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const showMenuBar = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return {
    ...state,
    titleBarMenuBarEnabled: true,
  }
}
