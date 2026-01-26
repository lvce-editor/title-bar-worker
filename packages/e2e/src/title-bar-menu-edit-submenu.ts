import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-edit-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus menu bar
  await TitleBarMenuBar.focus()

  // act - navigate to Edit menu
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert - Edit is focused
  const editMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Edit',
  })
  await expect(editMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open Edit menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Edit submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - verify expected menu items in Edit submenu
  const undoItem = Locator('.MenuItem', { hasText: 'Undo' })
  await expect(undoItem).toBeVisible()

  const redoItem = Locator('.MenuItem', { hasText: 'Redo' })
  await expect(redoItem).toBeVisible()

  const cutItem = Locator('.MenuItem', { hasText: 'Cut' })
  await expect(cutItem).toBeVisible()

  const copyItem = Locator('.MenuItem', { hasText: 'Copy' })
  await expect(copyItem).toBeVisible()

  const pasteItem = Locator('.MenuItem', { hasText: 'Paste' })
  await expect(pasteItem).toBeVisible()

  const toggleLineCommentItem = Locator('.MenuItem', { hasText: 'Toggle Line Comment' })
  await expect(toggleLineCommentItem).toBeVisible()

  const toggleBlockCommentItem = Locator('.MenuItem', { hasText: 'Toggle Block Comment' })
  await expect(toggleBlockCommentItem).toBeVisible()

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and Edit is still focused
  await expect(menu).not.toBeVisible()
  await expect(editMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
