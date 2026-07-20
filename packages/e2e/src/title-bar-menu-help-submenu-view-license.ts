import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-submenu-view-license'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  // arrange
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await TitleBarMenuBar.handleKeyArrowDown()

  const viewLicenseItem = Locator('.MenuItem', { hasText: 'View License' })
  await expect(viewLicenseItem).toBeVisible()

  // act
  await Command.execute('TitleBar.handleMenuClick', 0, 2)

  // assert
  const tabTitle = Locator('.MainTab .TabTitle')
  await expect(tabTitle).toHaveText('LICENSE')
  const editor = Locator('.Editor')
  await expect(editor).toContainText('The MIT License (MIT)')
}
