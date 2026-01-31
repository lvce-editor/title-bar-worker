import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-title-template-combined'

export const skip = false

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  // act
  await Command.execute('TitleBar.setTitleTemplate', '${appName} - ${folderName}')

  // assert
  const title = Locator('.TitleBarTitle')
  await expect(title).toBeVisible()
  await expect(title).toHaveText('Lvce Editor - my-project')
}
