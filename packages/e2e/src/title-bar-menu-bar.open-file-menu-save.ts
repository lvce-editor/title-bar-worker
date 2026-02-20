import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar.open-file-menu-save'

export const skip = 1

export const test: Test = async ({ expect, Locator }) => {
  // arrange
  const titleBarItemFile = Locator('.TitleBarTopLevelEntry', {
    hasText: 'File',
  })

  // act - open File menu
  // @ts-ignore
  await titleBarItemFile.click()

  // assert - File menu is visible
  const fileMenu = Locator('#Menu-0')
  await expect(fileMenu).toBeVisible()

  // act - click on "Save"
  const menuItemSave = Locator('.MenuItem', { hasText: 'Save' })
  // @ts-ignore
  await menuItemSave.click()

  // assert - verify action was triggered
  await expect(menuItemSave).not.toBeVisible()
}
