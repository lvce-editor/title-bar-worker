import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-update-title-on-close-workspace'

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
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
  // eslint-disable-next-line e2e/no-direct-click, e2e/no-menu-item-click -- select Close Folder independently of menu ordering
  await closeFolder.click()

  // assert
  await expect(title).toHaveText('Lvce Editor')
}
