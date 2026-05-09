import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar.open-file-menu-close-editor'

export const skip = 1

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

  // act - trigger "Close Editor"
  const menuItemCloseEditor = Locator('.MenuItem', { hasText: 'Close Editor' })
  await Command.execute('Main.CloseEditor')
  await TitleBarMenuBar.handleKeyEscape()

  // assert - verify action was triggered
  await expect(menuItemCloseEditor).not.toBeVisible()
}
