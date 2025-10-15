import type { TitleBarButton } from '../TitleBarButton/TitleBarButton.ts'

export interface TitleBarMenuBarState {
  readonly assetDir: string
  readonly buttons: readonly TitleBarButton[]
  readonly controlsOverlayEnabled: boolean
  readonly focusedIndex: number
  readonly height: number
  readonly iconWidth: number
  readonly isMenuOpen: boolean
  readonly titleBarIconEnabled: boolean
  readonly labelFontFamily: string
  readonly labelFontSize: number
  readonly labelFontWeight: number
  readonly labelLetterSpacing: number
  readonly labelPadding: number
  readonly menus: readonly any[]
  readonly platform: number
  readonly title: string
  readonly titleBarButtons: readonly TitleBarButton[]
  readonly titleBarButtonsEnabled: boolean
  readonly titleBarButtonsWidth: number
  readonly titleBarEntries: readonly any[]
  readonly titleBarHeight: number
  readonly titleBarIconWidth: number
  readonly titleBarMenuBarEnabled: boolean
  readonly titleBarStyleCustom: boolean
  readonly titleBarTitleEnabled: boolean
  readonly uid: number
  readonly width: number
  readonly x: number
  readonly y: number
}
