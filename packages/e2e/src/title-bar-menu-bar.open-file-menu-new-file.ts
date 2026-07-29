import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar.open-file-menu-new-file'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  // arrange
  const titleBarItemFile = Locator('.TitleBarTopLevelEntry', {
    hasText: 'File',
  })

  // act - open File menu
  await TitleBarMenuBar.focus()
  await expect(titleBarItemFile).toHaveAttribute('id', 'TitleBarEntryActive')
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - File menu is visible
  const fileMenu = Locator('#Menu-0')
  await expect(fileMenu).toBeVisible()

  // act - trigger "New File"
  const menuItemNewFile = Locator('.MenuItem', { hasText: 'New File' })
  await Command.execute('TitleBar.handleMenuClick', 0, 0)

  // assert
  await expect(menuItemNewFile).toBeHidden()
  const newFileTab = Locator('.MainTab.MainTabSelected')
  await expect(newFileTab).toBeVisible()
  const editorInput = Locator('.EditorInput textarea')
  await expect(editorInput).toBeFocused()
}
