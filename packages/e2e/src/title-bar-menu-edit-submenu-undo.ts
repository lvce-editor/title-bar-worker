import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-edit-submenu-undo'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  // arrange
  const titleBarItemEdit = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Edit',
  })

  // act - open Edit menu
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await expect(titleBarItemEdit).toHaveAttribute('id', 'TitleBarEntryActive')
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Edit menu is visible
  const editMenu = Locator('#Menu-0')
  await expect(editMenu).toBeVisible()

  // act - trigger "Undo"
  const menuItemUndo = Locator('.MenuItem', { hasText: 'Undo' })
  await Command.execute('TitleBar.handleMenuClick', 0, 0)

  // assert - verify action was triggered
  await expect(menuItemUndo).not.toBeVisible()
}
