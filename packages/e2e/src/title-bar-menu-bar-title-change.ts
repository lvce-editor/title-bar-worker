import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-title-change'

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  const longTitle = 'A'.repeat(40)
  await TitleBarMenuBar.setTitleTemplate(longTitle)
  await TitleBarMenuBar.setWidth(900)

  const overflowEntry = Locator('.TitleBarTopLevelEntry[name="..."]')
  const entries = Locator('.TitleBarTopLevelEntry')
  await expect(overflowEntry).toHaveCount(1)

  await TitleBarMenuBar.setTitleTemplate('A')
  await expect(overflowEntry).toHaveCount(0)
  await expect(entries).toHaveCount(8)

  await TitleBarMenuBar.setTitleTemplate(longTitle)
  await expect(overflowEntry).toHaveCount(1)

  await TitleBarMenuBar.setTitleTemplate('${folderName}')
  await TitleBarMenuBar.handleWorkspaceChange(`${tmpDir}/${longTitle}`)
  await expect(overflowEntry).toHaveCount(1)

  await TitleBarMenuBar.handleWorkspaceChange(`${tmpDir}/A`)
  await expect(overflowEntry).toHaveCount(0)
  await expect(entries).toHaveCount(8)
}
