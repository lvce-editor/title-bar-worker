import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-submenu-about'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  // arrange
  const titleBarItemHelp = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Help',
  })

  // act - open Help menu
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await expect(titleBarItemHelp).toHaveAttribute('id', 'TitleBarEntryActive')
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Help menu is visible
  const helpMenu = Locator('#Menu-0')
  await expect(helpMenu).toBeVisible()

  // act - trigger "About"
  const menuItemAbout = Locator('.MenuItem', { hasText: 'About' })
  await Command.execute('TitleBar.handleMenuClick', 0, 3)

  // assert - verify action was triggered
  await expect(menuItemAbout).not.toBeVisible()
}
