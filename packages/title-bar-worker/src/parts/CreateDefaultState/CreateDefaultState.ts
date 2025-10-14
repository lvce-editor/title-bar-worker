import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const DEFAULT_UID = 1

export const createDefaultState = (uid: number = DEFAULT_UID): TitleBarMenuBarState => ({
  titleBarIconWidth: 30,
  itleBarIconEnabled: true,
  titleBarMenuBarEnabled: true,
  titleBarButtonsEnabled: true,
  titleBarButtonsWidth: 90,
  titleBarTitleEnabled: true,
  uid,
  titleBarEntries: [],
  focusedIndex: -1,
  isMenuOpen: false,
  menus: [],
  labelFontWeight: 400,
  labelFontSize: 13,
  labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
  labelPadding: 8,
  labelLetterSpacing: 0,
  titleBarHeight: 30,
  x: 0,
  y: 0,
  width: 800,
  height: 30,
  iconWidth: 30,
})
