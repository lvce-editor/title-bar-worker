import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-overflow-menu-items'

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setUri(`${tmpDir}/my-project`)

  await TitleBarMenuBar.setTitleTemplate('A')
  await TitleBarMenuBar.setWidth(320)

  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await TitleBarMenuBar.handleKeyArrowDown()

  const overflowMenu = Locator('#Menu-0')
  await expect(overflowMenu).toBeVisible()
  await expect(overflowMenu.locator('.MenuItem')).toHaveCount(6)
}
