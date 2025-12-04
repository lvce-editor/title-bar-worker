export interface VisibleMenuItem {
  readonly flags: number
  readonly isExpanded: boolean
  readonly isFocused: boolean
  readonly key: number
  readonly label: string
  readonly level: number
}
