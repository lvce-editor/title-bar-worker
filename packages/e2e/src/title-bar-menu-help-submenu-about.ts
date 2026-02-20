import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-submenu-about'

export const skip = 1

export const test: Test = async ({ expect, Locator }) => {
  // arrange
  const titleBarItemHelp = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Help',
  })

  // act - open Help menu
  // @ts-ignore
  await titleBarItemHelp.click()

  // assert - Help menu is visible
  const helpMenu = Locator('#Menu-3')
  await expect(helpMenu).toBeVisible()

  // act - click on "About"
  const menuItemAbout = Locator('.MenuItem', { hasText: 'About' })
  // @ts-ignore
  await menuItemAbout.click()

  // assert - verify action was triggered
  await expect(menuItemAbout).not.toBeVisible()
}
