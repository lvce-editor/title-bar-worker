import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'

export const getVisible = (items: readonly any[], focusedIndex: number, expanded: boolean, level: number): readonly VisibleMenuItem[] => {
  const visibleItems: VisibleMenuItem[] = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const { flags, label } = item
    visibleItems.push({
      flags,
      isExpanded: i === focusedIndex && expanded,
      isFocused: i === focusedIndex,
      key: item.key,
      label,
      level,
    })
  }
  return visibleItems
}
