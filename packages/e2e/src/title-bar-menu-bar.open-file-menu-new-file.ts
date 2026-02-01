import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar.open-file-menu-new-file'

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

  // act - click on "New File"
  const menuItemNewFile = Locator('.MenuItem', { hasText: 'New File' })
  // @ts-ignore
  await menuItemNewFile.click()

  // assert - verify action was triggered
  // The new file creation command should have been executed
  await expect(menuItemNewFile).not.toBeVisible()
}
