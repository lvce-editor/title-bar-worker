import type { MenuEntryId } from '@lvce-editor/constants'

export interface TitleBarEntry {
  readonly ariaLabel?: string
  readonly icon?: string
  readonly id?: MenuEntryId
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
  readonly keyboardShortCut?: string
  readonly id: string
  readonly label: string
  readonly width: number
}

export type ComputedTitleBarEntry<T extends TitleBarEntry = TitleBarEntry> = VisibleTitleBarEntry<T> | OverflowTitleBarEntry<T>
