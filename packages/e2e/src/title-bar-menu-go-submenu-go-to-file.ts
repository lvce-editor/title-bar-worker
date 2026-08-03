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
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()

  const goToFileItem = Locator('.MenuItem', { hasText: 'Go to File...' })
  await expect(goToFileItem).toBeVisible()
  await expect(goToFileItem).toBeFocused()

  // act
  await Command.execute('TitleBar.handleKeyEnter')

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()
  const quickPickInput = Locator('[name="QuickPickInput"]')
  await expect(quickPickInput).toBeFocused()
  await QuickPick.setValue('menu-file')

  const quickPickItem = Locator('.QuickPickItemLabel').first()
  await expect(quickPickItem).toContainText('menu-file.txt')
}
