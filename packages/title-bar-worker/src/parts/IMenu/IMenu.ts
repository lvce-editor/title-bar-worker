export interface IMenu {
  readonly expanded?: boolean
  readonly focusedIndex: number
  readonly id?: number
  readonly items: readonly any[]
  readonly level: number
  readonly x: number
  readonly y: number
}
