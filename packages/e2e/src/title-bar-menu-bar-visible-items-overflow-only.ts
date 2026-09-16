import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-overflow-only'

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await TitleBarMenuBar.setTitleTemplate('A')
  await TitleBarMenuBar.setWidth(140)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  await expect(titleBarEntries).toHaveCount(1)

  const overflowEntry = Locator('.TitleBarTopLevelEntry', { hasText: '...' })
  await expect(overflowEntry).toBeVisible()
}
