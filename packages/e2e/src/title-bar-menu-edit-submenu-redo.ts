import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-edit-submenu-redo'

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

  // act - click on "Redo"
  const menuItemRedo = Locator('.MenuItem', { hasText: 'Redo' })
  // @ts-ignore
  await menuItemRedo.click()

  // assert - verify action was triggered
  await expect(menuItemRedo).not.toBeVisible()
}
