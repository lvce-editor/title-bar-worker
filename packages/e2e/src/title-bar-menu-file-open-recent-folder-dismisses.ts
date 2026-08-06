import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-open-recent-folder-dismisses'

export const test: Test = async ({ Command, expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const recentFolder = `${tmpDir}/recent-folder`
  const currentFolder = `${tmpDir}/current-folder`
  await Workspace.setPath(currentFolder)
  await Command.execute('RecentlyOpened.clearRecentlyOpened')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', recentFolder)
  await Command.execute('RecentlyOpened.addToRecentlyOpened', currentFolder)

  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowRight()

  const fileMenu = Locator('#Menu-0')
  const recentMenu = Locator('#Menu-1')
  await expect(fileMenu).toBeVisible()
  await expect(recentMenu).toBeVisible()

  const recentFolderItem = recentMenu.locator('.MenuItem').nth(1)
  const title = Locator('.TitleBarTitle')
  await expect(recentFolderItem).toContainText(recentFolder)
  await Command.execute('TitleBar.handleMenuClick', 1, 1)

  await expect(title).toHaveText(recentFolder.slice(recentFolder.lastIndexOf('/') + 1))
  await expect(fileMenu).toBeHidden()
  await expect(recentMenu).toBeHidden()
}
