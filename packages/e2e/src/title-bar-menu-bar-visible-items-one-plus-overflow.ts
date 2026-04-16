import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-one-plus-overflow'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 240)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  await expect(titleBarEntries).toHaveCount(2)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'File' })).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'Edit' })).toHaveCount(0)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: '...' })).toHaveCount(1)
}
