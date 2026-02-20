import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-edit-submenu-paste'

export const skip = 1

export const test: Test = async ({ expect, Locator }) => {
  // arrange
  const titleBarItemEdit = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Edit',
  })

  // act - open Edit menu
  // @ts-ignore
  await titleBarItemEdit.click()

  // assert - Edit menu is visible
  const editMenu = Locator('#Menu-1')
  await expect(editMenu).toBeVisible()

  // act - click on "Paste"
  const menuItemPaste = Locator('.MenuItem', { hasText: 'Paste' })
  // @ts-ignore
  await menuItemPaste.click()

  // assert - verify action was triggered
  await expect(menuItemPaste).not.toBeVisible()
}
