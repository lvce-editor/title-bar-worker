import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-submenu-view-license'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // arrange
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await TitleBarMenuBar.handleKeyArrowDown()

  const viewLicenseItem = Locator('.MenuItem', { hasText: 'View License' })
  await expect(viewLicenseItem).toBeVisible()

  // act
  // eslint-disable-next-line e2e/no-menu-item-click, e2e/no-direct-click, @typescript-eslint/no-deprecated -- tests the menu item's DOM click opening the license editor
  await viewLicenseItem.click()

  // assert
  const tabTitle = Locator('.MainTab .TabTitle')
  await expect(tabTitle).toHaveText('LICENSE')
  const editor = Locator('.Editor')
  await expect(editor).toContainText('The MIT License (MIT)')
  const editorInput = Locator('[name="editor"]')
  await expect(editorInput).toBeFocused()
}
