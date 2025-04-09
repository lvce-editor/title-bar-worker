export const getVisible = (items: readonly any[], focusedIndex: number, expanded: boolean, level: number): readonly any[] => {
  const visibleItems = []
  for (let i = 0; i < items.length; i++) {
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
