import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../CreateDefaultState/CreateDefaultState.ts'
import * as GetTitleBarButtons from '../GetTitleBarButtons/GetTitleBarButtons.ts'
import * as TitleBarMenuBarStates from '../TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

export const create3 = (
  id: number,
  uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
  platform: number,
  controlsOverlayEnabled: boolean,
  titleBarStyleCustom: boolean,
  assetDir: string,
): void => {
  const titleBarButtons = GetTitleBarButtons.getTitleBarButtons(platform, controlsOverlayEnabled, titleBarStyleCustom)

  const state: TitleBarMenuBarState = {
    ...createDefaultState(),
    assetDir,
    commandCenterEnabled: false,
    commandMap: {},
    controlsOverlayEnabled,
    focused: false,
    focusedIndex: -1,
    height,
    iconWidth: 30,
    isMenuOpen: false,
    labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
    labelFontSize: 13,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 8,
    layoutControlsEnabled: false,
    menus: [],
    platform,
    titleBarButtons,
    titleBarEntries: [],
    titleBarHeight: height,
    titleBarStyleCustom,
    uid: id,
    width,
    x,
    y,
    workspaceUri: '',
  }
  TitleBarMenuBarStates.set(id, state, state)
}
