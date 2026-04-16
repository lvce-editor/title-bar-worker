import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-overflow-only'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 140)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  await expect(titleBarEntries).toHaveCount(1)

  const overflowEntry = Locator('.TitleBarTopLevelEntry', { hasText: '...' })
  await expect(overflowEntry).toBeVisible()
}
