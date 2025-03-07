import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export interface Renderer {
  (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): any
}
