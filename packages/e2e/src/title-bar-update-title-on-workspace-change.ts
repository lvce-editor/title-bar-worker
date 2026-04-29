import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-update-title-on-workspace-change'

export const test: Test = async ({ expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir1 = await FileSystem.getTmpDir()
  const tmpDir2 = await FileSystem.getTmpDir()
  const title = Locator('.TitleBarTitle')

  // act
  await Workspace.setPath(`${tmpDir1}/folder-1`)

  // assert
  await expect(title).toBeVisible()
  await expect(title).toHaveText('folder-1')

  // act
  await Workspace.setPath(`${tmpDir2}/folder-2`)

  // assert
  await expect(title).toHaveText('folder-2')
}
