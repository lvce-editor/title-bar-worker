import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

const DEFAULT_UID = 1

export const createDefaultState = (uid: number = DEFAULT_UID): TitleBarMenuBarState => ({
  assetDir: '',
  focusedIndex: -1,
  height: 30,
  iconWidth: 30,
  isMenuOpen: false,
  itleBarIconEnabled: true,
  labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
  labelFontSize: 13,
  labelFontWeight: 400,
  labelLetterSpacing: 0,
  labelPadding: 8,
  menus: [],
  titleBarButtonsEnabled: true,
  titleBarButtonsWidth: 90,
  titleBarEntries: [],
  titleBarHeight: 30,
  titleBarIconWidth: 30,
  titleBarMenuBarEnabled: true,
  titleBarTitleEnabled: true,
  uid,
  width: 800,
  x: 0,
  y: 0,
})
