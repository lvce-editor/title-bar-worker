import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../CreateDefaultState/CreateDefaultState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const create = (id: any, uri: string, x: number, y: number, width: number, height: number): TitleBarMenuBarState => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    uid: id,
    titleBarEntries: [],
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
    labelFontWeight: 400,
    labelFontSize: 13,
    labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
    labelPadding: 8,
    labelLetterSpacing: 0,
    titleBarHeight: height,
    x,
    y,
    width,
    height,
    iconWidth: 30,
  }
  TitleBarMenuBarStates.set(id, state, state)
  return state
}
