import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-two-plus-overflow'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 320)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  await expect(titleBarEntries).toHaveCount(3)
  await expect(Locator('.TitleBarTopLevelEntry[name="File"]')).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry[name="Edit"]')).toHaveCount(1)
  await expect(Locator('.TitleBarTopLevelEntry[name="Selection"]')).toHaveCount(0)
  await expect(Locator('.TitleBarTopLevelEntry[name="..."]')).toHaveCount(1)
}
