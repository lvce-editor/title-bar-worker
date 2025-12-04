import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const setPlatform = (state: TitleBarMenuBarState, platform: number): TitleBarMenuBarState => {
  return {
    ...state,
    platform,
  }
}
