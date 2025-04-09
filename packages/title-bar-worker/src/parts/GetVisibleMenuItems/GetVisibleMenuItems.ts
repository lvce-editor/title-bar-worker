import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'

export const getVisible = (items: readonly any[], focusedIndex: number, expanded: boolean, level: number): readonly VisibleMenuItem[] => {
  const visibleItems: VisibleMenuItem[] = []
  const { length } = items
  for (let i = 0; i < length; i++) {
    const item = items[i]
    const { flags, label } = item
    visibleItems.push({
      label,
      flags,
      isFocused: i === focusedIndex,
      isExpanded: i === focusedIndex && expanded,
      level,
      key: item.key,
    })
  }
  return visibleItems
}
