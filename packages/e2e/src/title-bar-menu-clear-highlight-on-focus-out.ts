import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-clear-highlight-on-focus-out'

export const test: Test = async ({ expect, FileSystem, Locator, Main, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/test.txt`
  await FileSystem.writeFile(file, 'test')
  await Workspace.setUri(tmpDir)
  await Main.openUri(file)

  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  const helpMenuItem = Locator('.TitleBarTopLevelEntry', { hasText: 'Help' })
  const menu = Locator('.Menu')
  const editorRow = Locator('.EditorRow').first()
  const editorInput = Locator('[name="editor"]')

  for (let iteration = 0; iteration < 20; iteration++) {
    // eslint-disable-next-line e2e/no-direct-click, @typescript-eslint/no-deprecated -- verifies the DOM menu click focus lifecycle
    await helpMenuItem.click()
    await expect(menu).toBeVisible()

    await TitleBarMenuBar.handleKeyEscape()
    await expect(menu).toBeHidden()
    await expect(helpMenuItem).toHaveAttribute('id', 'TitleBarEntryActive')
    // Synthetic mouse clicks do not apply the browser's default button focus behavior.
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- restores the synthetic click's missing button focus
    await helpMenuItem.type('')
    await expect(helpMenuItem).toBeFocused()

    // eslint-disable-next-line e2e/no-direct-click, @typescript-eslint/no-deprecated -- moves focus to the editor through a real DOM click
    await editorRow.click()
    await expect(editorInput).toBeFocused()
    await expect(helpMenuItem).toHaveAttribute('id', null)
    await expect(helpMenuItem).toHaveAttribute('aria-expanded', 'false')
    await expect(titleBarMenuBar).toHaveAttribute('aria-activedescendant', null)
  }
}
