import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

const DEFAULT_UID = 1
const DEFAULT_APP_NAME = 'Lvce Editor'
const DEFAULT_MAIN_AREA_UID = 2

export const createDefaultState = (uid: number = DEFAULT_UID): TitleBarMenuBarState => ({
  appName: DEFAULT_APP_NAME,
  assetDir: '',
  buttons: [],
  commandCenterEnabled: false,
  commandMap: {},
  controlsOverlayEnabled: false,
  focused: false,
  focusedIndex: -1,
  height: 30,
  iconWidth: 30,
  isMenuOpen: false,
  labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
  labelFontSize: 13,
  labelFontWeight: 400,
  labelLetterSpacing: 0,
  labelPadding: 8,
  layoutControlsEnabled: false,
  mainAreaUid: DEFAULT_MAIN_AREA_UID,
  menus: [],
  platform: PlatformType.Electron,
  title: '',
  titleBarButtons: [],
  titleBarButtonsEnabled: true,
  titleBarButtonsWidth: 90,
  titleBarEntries: [],
  titleBarHeight: 30,
  titleBarIconEnabled: true,
  titleBarIconWidth: 30,
  titleBarMenuBarEnabled: true,
  titleBarStyleCustom: true,
  titleBarTitleEnabled: true,
  titleTemplate: '${folderName}',
  titleWidth: 0,
  uid,
  width: 800,
  workspaceUri: '',
  x: 0,
  y: 0,
})
