import * as Assert from '../Assert/Assert.ts'
import * as Icon from '../Icon/Icon.ts'
import * as TitleBarMenuBarStrings from '../TitleBarMenuBarStrings/TitleBarMenuBarStrings.ts'

const MoreEntryWidth = 38

export const OverflowMenuId = 'title-bar-overflow'

const getTotalWidth = (entries: readonly any[]): number => {
  let total = 0
  for (const entry of entries) {
    total += entry.width
  }
  return total
}

export const getVisibleTitleBarEntries = (entries: readonly any[], width: number, focusedIndex: number, isMenuOpen: boolean): readonly any[] => {
  Assert.array(entries)
  Assert.number(width)
  let total = 0
  const visible = []
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const nextTotal = total + entry.width
    if (nextTotal >= width) {
      break
    }
    total = nextTotal
    const visibleIndex = visible.length
    const isOpen = visibleIndex === focusedIndex && isMenuOpen
    const isFocused = visibleIndex === focusedIndex
    visible.push({ ...entry, isFocused, isOpen })
  }
  const hasOverflow = visible.length < entries.length
  if (hasOverflow) {
    while (visible.length > 0 && getTotalWidth(visible) + MoreEntryWidth > width) {
      visible.pop()
    }
    const hiddenEntries = entries.slice(visible.length)
    const overflowIndex = visible.length
    visible.push({
      ariaLabel: TitleBarMenuBarStrings.moreDot(),
      hiddenEntries,
      icon: Icon.Ellipsis,
      id: OverflowMenuId,
      isFocused: overflowIndex === focusedIndex,
      isOpen: overflowIndex === focusedIndex && isMenuOpen,
      label: '...',
      width: MoreEntryWidth,
    })
  }
  return visible
}
