import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-update-title-on-workspace-change'

export const test: Test = async ({ About, expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir1 = await FileSystem.getTmpDir()

  // act
  await Workspace.setPath(`${tmpDir1}/folder-1`)

  // assert
  const title = Locator('.TitleBarTitle')
  await expect(title).toBeVisible()
}
