import type * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export type TitleBarEntryId =
  | typeof MenuEntryId.Edit
  | typeof MenuEntryId.File
  | typeof MenuEntryId.Go
  | typeof MenuEntryId.Help
  | typeof MenuEntryId.OpenRecent
  | typeof MenuEntryId.Run
  | typeof MenuEntryId.Selection
  | typeof MenuEntryId.Terminal
  | typeof MenuEntryId.TitleBar
  | typeof MenuEntryId.View

export interface TitleBarEntry {
  readonly ariaLabel?: string
  readonly icon?: string
  readonly id?: TitleBarEntryId
  readonly keyboardShortCut?: string
  readonly label: string
  readonly width: number
}

export interface TitleBarEntryFocusState {
  readonly isFocused: boolean
  readonly isOpen: boolean
}

export type VisibleTitleBarEntry<T extends TitleBarEntry = TitleBarEntry> = T & TitleBarEntryFocusState

export interface OverflowTitleBarEntry<T extends TitleBarEntry = TitleBarEntry> extends TitleBarEntryFocusState {
  readonly ariaLabel: string
  readonly hiddenEntries: readonly T[]
  readonly icon: string
  readonly id: string
  readonly keyboardShortCut?: string
  readonly label: string
  readonly width: number
}

export type ComputedTitleBarEntry<T extends TitleBarEntry = TitleBarEntry> = VisibleTitleBarEntry<T> | OverflowTitleBarEntry<T>
