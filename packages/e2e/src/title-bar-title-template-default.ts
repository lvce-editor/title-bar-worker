import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-title-template-default'

export const skip = false

export const test: Test = async ({ expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  // assert - default template should be ${folderName}
  const title = Locator('.TitleBarTitle')
  await expect(title).toBeVisible()
  await expect(title).toHaveText('my-project')
}
