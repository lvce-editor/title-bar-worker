import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-submenu-save-enablement'

export const skip = 1

const openFileMenu = async (TitleBarMenuBar, expect, Locator): Promise<void> => {
  await TitleBarMenuBar.focus()
  const fileMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'File',
  })
  await expect(fileMenu).toHaveAttribute('id', 'TitleBarEntryActive')
  await TitleBarMenuBar.handleKeyArrowDown()
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()
}

export const test: Test = async ({ expect, FileSystem, Locator, Main, TitleBarMenuBar }) => {
  await openFileMenu(TitleBarMenuBar, expect, Locator)

  const saveItem = Locator('.MenuItem', { hasText: 'Save' })
  await expect(saveItem).toHaveAttribute('disabled', '')
  const saveAllItem = Locator('.MenuItem', { hasText: 'Save All' })
  await expect(saveAllItem).toHaveAttribute('disabled', '')

  await TitleBarMenuBar.handleKeyEscape()

  const tmpDir = await FileSystem.getTmpDir({ scheme: 'memfs' })
  const testFile = `${tmpDir}/test.txt`
  await FileSystem.writeFile(testFile, 'hello')
  await Main.openUri(testFile)

  await openFileMenu(TitleBarMenuBar, expect, Locator)
  await expect(saveItem).toHaveAttribute('disabled', null)
  await expect(saveAllItem).toHaveAttribute('disabled', null)
}
