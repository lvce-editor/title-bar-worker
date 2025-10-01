export interface TitleBarMenuBarState {
  readonly uid: number
  readonly titleBarEntries: readonly any[]
  readonly focusedIndex: number
  readonly isMenuOpen: boolean
  readonly menus: readonly any[]
  readonly labelFontWeight: number
  readonly labelFontFamily: string
  readonly labelFontSize: number
  readonly labelPadding: number
  readonly labelLetterSpacing: number
  readonly titleBarHeight: number
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly iconWidth: number
}
