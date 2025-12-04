import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const showCommandCenter = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return {
    ...state,
    commandCenterEnabled: true,
  }
}
