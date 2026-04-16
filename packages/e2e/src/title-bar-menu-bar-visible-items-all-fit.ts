import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-all-fit'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 700)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  await expect(titleBarEntries).toHaveCount(6)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'File' })).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'Edit' })).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'Selection' })).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'View' })).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'Go' })).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: 'Help' })).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry', { hasText: '...' })).toHaveCount(0)
}
