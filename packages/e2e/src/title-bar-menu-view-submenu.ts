import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-view-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus menu bar
  await TitleBarMenuBar.focus()

  // act - navigate to View menu
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert - View is focused
  const viewMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'View',
  })
  await expect(viewMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open View menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - View submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - menu is open (View menu is currently empty, but we verify it opens)
  // In the future when View menu has items, add specific item checks here

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and View is still focused
  await expect(menu).not.toBeVisible()
  await expect(viewMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
