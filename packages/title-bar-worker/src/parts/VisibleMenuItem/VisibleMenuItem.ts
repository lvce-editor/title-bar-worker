export interface VisibleMenuItem {
  readonly label: string
  readonly flags: number
  readonly isFocused: boolean
  readonly isExpanded: boolean
  readonly level: number
  readonly key: number
}
