import * as Assert from '../Assert/Assert.ts'
import * as Icon from '../Icon/Icon.ts'
import * as TitleBarMenuBarStrings from '../TitleBarMenuBarStrings/TitleBarMenuBarStrings.ts'
import type { ComputedTitleBarEntry, OverflowTitleBarEntry, TitleBarEntry } from '../TitleBarEntry/TitleBarEntry.ts'

const MoreEntryWidth = 38

export const OverflowMenuId = 'title-bar-overflow'

interface EntryWithWidth {
  readonly width: number
}

const getTotalWidth = (entries: readonly EntryWithWidth[]): number => {
  let total = 0
  for (const entry of entries) {
    total += entry.width
  }
  return total
}

const createOverflowEntry = <T extends TitleBarEntry>(
  hiddenEntries: readonly T[],
  overflowIndex: number,
  focusedIndex: number,
  isMenuOpen: boolean,
): OverflowTitleBarEntry<T> => {
  return {
    ariaLabel: TitleBarMenuBarStrings.moreDot(),
    hiddenEntries,
    icon: Icon.Ellipsis,
    id: OverflowMenuId,
    isFocused: overflowIndex === focusedIndex,
    isOpen: overflowIndex === focusedIndex && isMenuOpen,
    label: '...',
    width: MoreEntryWidth,
  }
}

export const isOverflowTitleBarEntry = <T extends TitleBarEntry>(
  entry: ComputedTitleBarEntry<T>,
): entry is OverflowTitleBarEntry<T> => {
  return entry.id === OverflowMenuId
}

export const getVisibleTitleBarEntries = <T extends TitleBarEntry>(
  entries: readonly T[],
  width: number,
  focusedIndex: number,
  isMenuOpen: boolean,
): readonly ComputedTitleBarEntry<T>[] => {
  Assert.array(entries)
  Assert.number(width)
  let total = 0
  const visible: ComputedTitleBarEntry<T>[] = []
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const nextTotal = total + entry.width
    if (nextTotal >= width) {
      break
    }
    total = nextTotal
    const visibleIndex: number = visible.length
    const isOpen: boolean = visibleIndex === focusedIndex && isMenuOpen
    const isFocused: boolean = visibleIndex === focusedIndex
    visible.push({ ...entry, isFocused, isOpen })
  }
  const hasOverflow = visible.length < entries.length
  if (hasOverflow) {
    while (visible.length > 0 && getTotalWidth(visible) + MoreEntryWidth > width) {
      visible.pop()
    }
    const hiddenEntries = entries.slice(visible.length)
    const overflowIndex = visible.length
    visible.push(createOverflowEntry(hiddenEntries, overflowIndex, focusedIndex, isMenuOpen))
  }
  return visible
}
