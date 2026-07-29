import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-three-plus-overflow'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 460)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  const fileEntry = Locator('.TitleBarTopLevelEntry[name="File"]')
  const editEntry = Locator('.TitleBarTopLevelEntry[name="Edit"]')
  const selectionEntry = Locator('.TitleBarTopLevelEntry[name="Selection"]')
  const viewEntry = Locator('.TitleBarTopLevelEntry[name="View"]')
  const overflowEntry = Locator('.TitleBarTopLevelEntry[name="..."]')
  await expect(titleBarEntries).toHaveCount(4)
  await expect(fileEntry).toHaveCount(1)
  await expect(editEntry).toHaveCount(1)
  await expect(selectionEntry).toHaveCount(1)
  await expect(viewEntry).toHaveCount(0)
  await expect(overflowEntry).toHaveCount(1)
}
