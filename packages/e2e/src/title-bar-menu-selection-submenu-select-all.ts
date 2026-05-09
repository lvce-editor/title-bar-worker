import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-selection-submenu-select-all'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  // arrange
  const titleBarItemSelection = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Selection',
  })

  // act - open Selection menu
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await expect(titleBarItemSelection).toHaveAttribute('id', 'TitleBarEntryActive')
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Selection menu is visible
  const selectionMenu = Locator('#Menu-0')
  await expect(selectionMenu).toBeVisible()

  // act - trigger "Select All"
  const menuItemSelectAll = Locator('.MenuItem', { hasText: 'Select All' })
  await Command.execute('TitleBar.handleMenuClick', 0, 0)

  // assert - verify action was triggered
  await expect(menuItemSelectAll).not.toBeVisible()
}
