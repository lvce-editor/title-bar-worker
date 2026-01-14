import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const isEqual = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): boolean => {
  return oldState.menus === newState.menus
}
