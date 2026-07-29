import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-visible-items-all-fit'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 900)

  const titleBarEntries = Locator('.TitleBarTopLevelEntry')
  const fileEntry = Locator('.TitleBarTopLevelEntry[name="File"]')
  const editEntry = Locator('.TitleBarTopLevelEntry[name="Edit"]')
  const selectionEntry = Locator('.TitleBarTopLevelEntry[name="Selection"]')
  const viewEntry = Locator('.TitleBarTopLevelEntry[name="View"]')
  const goEntry = Locator('.TitleBarTopLevelEntry[name="Go"]')
  const runEntry = Locator('.TitleBarTopLevelEntry[name="Run"]')
  const terminalEntry = Locator('.TitleBarTopLevelEntry[name="Terminal"]')
  const helpEntry = Locator('.TitleBarTopLevelEntry[name="Help"]')
  const overflowEntry = Locator('.TitleBarTopLevelEntry[name="..."]')
  await expect(titleBarEntries).toHaveCount(8)
  await expect(fileEntry).toHaveCount(1)
  await expect(editEntry).toHaveCount(1)
  await expect(selectionEntry).toHaveCount(1)
  await expect(viewEntry).toHaveCount(1)
  await expect(goEntry).toHaveCount(1)
  await expect(runEntry).toHaveCount(1)
  await expect(terminalEntry).toHaveCount(1)
  await expect(helpEntry).toHaveCount(1)
  await expect(overflowEntry).toHaveCount(0)
}
