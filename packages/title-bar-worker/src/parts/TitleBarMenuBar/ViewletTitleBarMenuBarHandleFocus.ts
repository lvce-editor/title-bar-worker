import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const handleFocus = async (state: TitleBarMenuBarState): Promise<TitleBarMenuBarState> => {
  return {
    ...state,
    focused: true,
  }
}
