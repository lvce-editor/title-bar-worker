import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-title-template-foldername'

export const skip = true

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  // act
  await TitleBarMenuBar.setTitleTemplate('${folderName}')

  // assert
  const title = Locator('.TitleBarTitle')
  await expect(title).toBeVisible()
  await expect(title).toHaveText('my-project')
}
