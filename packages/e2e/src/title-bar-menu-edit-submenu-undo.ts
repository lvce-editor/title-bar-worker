import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-edit-submenu-undo'

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

  // act - click on "Undo"
  const menuItemUndo = Locator('.MenuItem', { hasText: 'Undo' })
  // @ts-ignore
  await menuItemUndo.click()

  // assert - verify action was triggered
  await expect(menuItemUndo).not.toBeVisible()
}
