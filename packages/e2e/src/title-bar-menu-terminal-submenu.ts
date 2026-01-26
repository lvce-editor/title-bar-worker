import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-terminal-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus menu bar
  await TitleBarMenuBar.focus()

  // act - navigate to Terminal menu
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert - Terminal is focused
  const terminalMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Terminal',
  })
  await expect(terminalMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open Terminal menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Terminal submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - verify expected menu items in Terminal submenu
  const newTerminalItem = Locator('.MenuItem', { hasText: 'New Terminal' })
  await expect(newTerminalItem).toBeVisible()

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and Terminal is still focused
  await expect(menu).toBeHidden()
  await expect(terminalMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
