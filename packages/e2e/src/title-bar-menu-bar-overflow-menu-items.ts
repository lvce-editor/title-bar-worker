import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar-overflow-menu-items'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(`${tmpDir}/my-project`)

  await Command.execute('TitleBar.setTitleTemplate', 'A')
  await Command.execute('TitleBar.setWidth', 320)

  const overflowEntry = Locator('.TitleBarTopLevelEntry', { hasText: '...' })
  // @ts-ignore
  await overflowEntry.click()

  const overflowMenu = Locator('#Menu-0')
  await expect(overflowMenu).toBeVisible()
  await expect(Locator('.MenuItem', { hasText: 'Selection' })).toHaveCount(1)
  await expect(Locator('.MenuItem', { hasText: 'View' })).toHaveCount(1)
  await expect(Locator('.MenuItem', { hasText: 'Go' })).toHaveCount(1)
  await expect(Locator('.MenuItem', { hasText: 'Help' })).toHaveCount(1)
}
