import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-title-change'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  const longTitle = 'A'.repeat(40)
  await Command.execute('TitleBar.setTitleTemplate', longTitle)
  await Command.execute('TitleBar.setWidth', 900)

  const overflowEntry = Locator('.TitleBarTopLevelEntry[name="..."]')
  const entries = Locator('.TitleBarTopLevelEntry')
  await expect(overflowEntry).toHaveCount(1)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await expect(overflowEntry).toHaveCount(0)
  await expect(entries).toHaveCount(8)

  await Command.execute('TitleBar.setTitleTemplate', longTitle)
  await expect(overflowEntry).toHaveCount(1)

  await Command.execute('TitleBar.setTitleTemplate', '${folderName}')
  await Command.execute('TitleBar.handleWorkspaceChange', `${tmpDir}/${longTitle}`)
  await expect(overflowEntry).toHaveCount(1)

  await Command.execute('TitleBar.handleWorkspaceChange', `${tmpDir}/A`)
  await expect(overflowEntry).toHaveCount(0)
  await expect(entries).toHaveCount(8)
}
