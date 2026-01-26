import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-run-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus menu bar
  await TitleBarMenuBar.focus()

  // act - navigate to Run menu
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert - Run is focused
  const runMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Run',
  })
  await expect(runMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open Run menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Run submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - menu is open (Run menu is currently empty, but we verify it opens)
  // In the future when Run menu has items, add specific item checks here

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and Run is still focused
  await expect(menu).toBeHidden()
  await expect(runMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
