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
  await expect(overflowMenu.locator('.MenuItem', { hasText: /^Selection$/ })).toHaveCount(1)
  await expect(overflowMenu.locator('.MenuItem', { hasText: /^View$/ })).toHaveCount(1)
  await expect(overflowMenu.locator('.MenuItem', { hasText: /^Go$/ })).toHaveCount(1)
  await expect(overflowMenu.locator('.MenuItem', { hasText: /^Run$/ })).toHaveCount(1)
  await expect(overflowMenu.locator('.MenuItem', { hasText: /^Terminal$/ })).toHaveCount(1)
  await expect(overflowMenu.locator('.MenuItem', { hasText: /^Help$/ })).toHaveCount(1)
}
