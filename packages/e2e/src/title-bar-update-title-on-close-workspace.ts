import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-update-title-on-close-workspace'

export const test: Test = async ({ Command, expect, Explorer, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const title = Locator('.TitleBarTitle')

  // act
  await Workspace.setPath(`${tmpDir}/my-project`)

  // assert
  await expect(title).toBeVisible()
  await expect(title).toHaveText('my-project')

  // act
  await Command.execute('Explorer.focus')
  await Explorer.focusFirst()
  await Explorer.openContextMenu(0)

  // assert
  const closeWorkspaceItem = Locator('.MenuItem', { hasText: 'Close Folder' })
  await expect(closeWorkspaceItem).toBeVisible()

  // act
  // @ts-ignore
  await closeWorkspaceItem.click()

  // assert
  await expect(title).toHaveText('')
}
