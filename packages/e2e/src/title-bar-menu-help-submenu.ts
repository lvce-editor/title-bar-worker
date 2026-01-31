import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus menu bar
  await TitleBarMenuBar.focus()

  // act - navigate to Help menu (using End to jump to last item)
  await TitleBarMenuBar.handleKeyEnd()

  // assert - Help is focused
  const helpMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Help',
  })
  await expect(helpMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open Help menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Help submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - verify expected menu items in Help submenu
  const aboutItem = Locator('.MenuItem', { hasText: 'About' })
  await expect(aboutItem).toBeVisible()

  // Note: Platform-specific items like Toggle Developer Tools and Check for Updates
  // may not be visible in all environments, but About should always be present

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and Help is still focused
  await expect(menu).toBeHidden()
  await expect(helpMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
