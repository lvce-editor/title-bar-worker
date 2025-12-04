import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const hideCommandCenter = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return {
    ...state,
    commandCenterEnabled: false,
  }
}
