import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-update-title-on-close-workspace'

export const test: Test = async ({ Command, expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const title = Locator('.TitleBarTitle')
  const closeFolder = Locator('.MenuItem', { hasText: 'Close Folder' })

  // assert
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  await expect(closeFolder).toHaveAttribute('aria-disabled', 'true')
  await Command.execute('TitleBar.handleMenuClick', 0, 12)
  await expect(title).toHaveText('Lvce Editor')
  await TitleBarMenuBar.handleKeyEscape()

  // act
  await Workspace.setUri(`${tmpDir}/my-project`)

  // assert
  await expect(title).toBeVisible()
  await expect(title).toHaveText('my-project')

  // act
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  await expect(closeFolder).toBeVisible()
  await expect(closeFolder).toHaveAttribute('aria-disabled', null)
  const closeFolderIndex = 12
  await Command.execute('TitleBar.handleMenuClick', 0, closeFolderIndex)

  // assert
  await expect(title).toHaveText('Lvce Editor')

  // act
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert
  await expect(closeFolder).toHaveAttribute('aria-disabled', 'true')
  await TitleBarMenuBar.handleKeyEscape()
}
