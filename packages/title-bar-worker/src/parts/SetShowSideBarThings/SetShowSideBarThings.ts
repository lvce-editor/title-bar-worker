import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

const setShowSideBarThings = (state: TitleBarMenuBarState, showSideBarThings: boolean): TitleBarMenuBarState => {
  const { focused, focusedIndex, isMenuOpen, menus, showSideBarThings: currentShowSideBarThings } = state
  if (showSideBarThings === currentShowSideBarThings) {
    return state
  }
  return {
    ...state,
    focused: showSideBarThings && focused,
    focusedIndex: showSideBarThings ? focusedIndex : -1,
    isMenuOpen: showSideBarThings && isMenuOpen,
    menus: showSideBarThings ? menus : [],
    showSideBarThings,
  }
}

export const set = TitleBarMenuBarStates.wrapCommand(setShowSideBarThings)
