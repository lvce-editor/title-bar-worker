import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-go-submenu-go-to-file'

export const test: Test = async ({ Command, expect, FileSystem, Locator, QuickPick, TitleBarMenuBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/menu-file.txt`, 'content')
  await Workspace.setPath(tmpDir)

  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()

  const goToFileItem = Locator('.MenuItem', { hasText: 'Go to File...' })
  await expect(goToFileItem).toBeVisible()

  // act
  await Command.execute('TitleBar.handleMenuClick', 0, 7)

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()
  await QuickPick.setValue('menu-file')

  const quickPickItem = Locator('.QuickPickItemLabel').first()
  await expect(quickPickItem).toContainText('menu-file.txt')
}
