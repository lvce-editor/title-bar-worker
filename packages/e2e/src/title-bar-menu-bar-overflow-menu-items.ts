import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-overflow-menu-items'

export const test: Test = async ({ Command, expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 320)

  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await TitleBarMenuBar.handleKeyArrowDown()

  const overflowMenu = Locator('#Menu-0')
  await expect(overflowMenu).toBeVisible()
  await expect(overflowMenu.locator('.MenuItem')).toHaveCount(6)
}
