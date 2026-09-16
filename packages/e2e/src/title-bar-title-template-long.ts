import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-title-template-long'

export const skip = true

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setUri(`${tmpDir}/my-project`)

  // act
  await TitleBarMenuBar.setTitleTemplate(
    'This is a very long title template that should still be displayed correctly in the title bar without any issues',
  )

  // assert
  const title = Locator('.TitleBarTitle')
  await expect(title).toBeVisible()
  await expect(title).toHaveText('This is a very long title template that should still be displayed correctly in the title bar without any issues')
}
