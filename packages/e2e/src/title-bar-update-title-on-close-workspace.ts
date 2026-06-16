import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-update-title-on-close-workspace'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const title = Locator('.TitleBarTitle')

  // act
  await Workspace.setPath(`${tmpDir}/my-project`)

  // assert
  await expect(title).toBeVisible()
  await expect(title).toHaveText('my-project')

  // act
  await Command.execute('Workspace.close')

  // assert
  await expect(title).toHaveText('')
}
