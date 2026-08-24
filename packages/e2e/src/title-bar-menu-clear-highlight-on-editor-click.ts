import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-clear-highlight-on-editor-click'

export const test: Test = async ({ expect, FileSystem, KeyBoard, Locator, Main }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const testFile = `${tmpDir}/clear-title-bar-highlight.txt`
  await FileSystem.writeFile(testFile, 'hello')
  await Main.openUri(testFile)

  const titleBarItemFile = Locator('.TitleBarTopLevelEntry', { hasText: 'File' })
  // eslint-disable-next-line e2e/no-direct-click
  await titleBarItemFile.click()

  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  await KeyBoard.press('Escape')

  await expect(menu).toBeHidden()
  await expect(titleBarItemFile).toHaveAttribute('id', 'TitleBarEntryActive')

  const editorRow = Locator('.EditorRow').first()
  // eslint-disable-next-line e2e/no-direct-click
  await editorRow.click()

  await expect(titleBarItemFile).toHaveAttribute('id', null)
  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  await expect(titleBarMenuBar).toHaveAttribute('aria-activedescendant', '')
  const editorInput = Locator('[name="editor"]')
  await expect(editorInput).toBeFocused()
}
