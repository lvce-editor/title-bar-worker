import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-one-plus-overflow'

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await TitleBarMenuBar.setTitleTemplate('A')
  await TitleBarMenuBar.setWidth(240)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  const fileEntry = Locator('.TitleBarTopLevelEntry[name="File"]')
  const editEntry = Locator('.TitleBarTopLevelEntry[name="Edit"]')
  const overflowEntry = Locator('.TitleBarTopLevelEntry[name="..."]')
  await expect(titleBarEntries).toHaveCount(2)
  await expect(fileEntry).toHaveCount(1)
  await expect(editEntry).toHaveCount(0)
  await expect(overflowEntry).toHaveCount(1)
}
