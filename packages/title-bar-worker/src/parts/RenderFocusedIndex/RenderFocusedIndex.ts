import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderFocusedIndex = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): readonly any[] => {
  return [
    'Viewlet.send',
    newState.uid,
    /* method */ RenderMethod.SetFocusedIndex,
    /* oldFocusedIndex */ oldState.focusedIndex,
    /* newfocusedIndex */ newState.focusedIndex,
    /* oldIsMenuOpen */ oldState.isMenuOpen,
    /* newIsMenuOpen */ newState.isMenuOpen,
  ]
}
