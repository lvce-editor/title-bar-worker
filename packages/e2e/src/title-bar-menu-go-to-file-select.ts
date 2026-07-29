import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-go-to-file-select'

export const test: Test = async ({ Command, expect, FileSystem, Locator, QuickPick, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/menu-select-file.txt`, 'content')
  await Workspace.setPath(tmpDir)

  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()

  const goToFile = Locator('.MenuItem', { hasText: 'Go to File...' })
  await expect(goToFile).toBeVisible()
  await Command.execute('TitleBar.handleMenuClick', 0, 7)

  await QuickPick.setValue('menu-select-file')
  const quickPickItem = Locator('.QuickPickItemLabel', { hasText: 'menu-select-file.txt' })
  await expect(quickPickItem).toBeVisible()

  await QuickPick.selectItem('menu-select-file.txt')

  const selectedTab = Locator('.MainTabSelected[title$="menu-select-file.txt"]')
  await expect(selectedTab).toBeVisible()
}
