import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-close-on-click-outside'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, TitleBarMenuBar }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const testFile = `${tmpDir}/click-outside.txt`
  await FileSystem.writeFile(testFile, 'hello')
  await Main.openUri(testFile)

  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()

  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  const editorRow = Locator('.EditorRow').first()
  // eslint-disable-next-line e2e/no-direct-click
  await editorRow.click()

  await expect(menu).toBeHidden()
  const editorInput = Locator('[name="editor"]')
  await expect(editorInput).toBeFocused()
}
