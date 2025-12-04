import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../CreateDefaultState/CreateDefaultState.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const create = (id: any, uri: string, x: number, y: number, width: number, height: number): TitleBarMenuBarState => {
  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    height,
    iconWidth: 30,
    isMenuOpen: false,
    labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
    labelFontSize: 13,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 8,
    menus: [],
    titleBarEntries: [],
    titleBarHeight: height,
    uid: id,
    width,
    x,
    y,
  }
  TitleBarMenuBarStates.set(id, state, state)
  return state
}
