import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const noop = (state: TitleBarMenuBarState): TitleBarMenuBarState => {
  return state
}
