import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderMenus

export const isEqual = (oldState: TitleBarMenuBarState, newState: TitleBarMenuBarState): boolean => {
  return oldState.menus === newState.menus
}
