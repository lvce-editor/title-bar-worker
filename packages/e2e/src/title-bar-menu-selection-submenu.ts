import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-selection-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus menu bar
  await TitleBarMenuBar.focus()

  // act - navigate to Selection menu
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert - Selection is focused
  const selectionMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Selection',
  })
  await expect(selectionMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open Selection menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Selection submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - verify expected menu items in Selection submenu
  const selectAllItem = Locator('.MenuItem', { hasText: 'Select All' })
  await expect(selectAllItem).toBeVisible()

  const expandSelectionItem = Locator('.MenuItem', { hasText: 'Expand Selection' })
  await expect(expandSelectionItem).toBeVisible()

  const shrinkSelectionItem = Locator('.MenuItem', { hasText: 'Shrink Selection' })
  await expect(shrinkSelectionItem).toBeVisible()

  const copyLineUpItem = Locator('.MenuItem', { hasText: 'Copy Line Up' })
  await expect(copyLineUpItem).toBeVisible()

  const copyLineDownItem = Locator('.MenuItem', { hasText: 'Copy Line Down' })
  await expect(copyLineDownItem).toBeVisible()

  const moveLineUpItem = Locator('.MenuItem', { hasText: 'Move Line Up' })
  await expect(moveLineUpItem).toBeVisible()

  const moveLineDownItem = Locator('.MenuItem', { hasText: 'Move Line Down' })
  await expect(moveLineDownItem).toBeVisible()

  const duplicateSelectionItem = Locator('.MenuItem', { hasText: 'Duplicate Selection' })
  await expect(duplicateSelectionItem).toBeVisible()

  const addCursorAboveItem = Locator('.MenuItem', { hasText: 'Add Cursor Above' })
  await expect(addCursorAboveItem).toBeVisible()

  const addCursorBelowItem = Locator('.MenuItem', { hasText: 'Add Cursor Below' })
  await expect(addCursorBelowItem).toBeVisible()

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and Selection is still focused
  await expect(menu).toBeHidden()
  await expect(selectionMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
