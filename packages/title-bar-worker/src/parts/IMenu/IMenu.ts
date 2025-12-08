import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export interface IMenu {
  readonly expanded?: boolean
  readonly focusedIndex: number
  readonly id?: number
  readonly items: readonly MenuEntry[]
  readonly level: number
  readonly x: number
  readonly y: number
}
