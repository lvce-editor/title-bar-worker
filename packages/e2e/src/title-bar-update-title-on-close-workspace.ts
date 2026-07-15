import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-update-title-on-close-workspace'

export const test: Test = async ({ Command, expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const title = Locator('.TitleBarTitle')

  // act
  await Workspace.setPath(`${tmpDir}/my-project`)

  // assert
  await expect(title).toBeVisible()
  await expect(title).toHaveText('my-project')

  // act
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  const closeFolder = Locator('.MenuItem', { hasText: 'Close Folder' })
  await expect(closeFolder).toBeVisible()
  const closeFolderIndex = 12
  await Command.execute('TitleBar.handleMenuClick', 0, closeFolderIndex)

  // assert
  await expect(title).toHaveText('')
}
