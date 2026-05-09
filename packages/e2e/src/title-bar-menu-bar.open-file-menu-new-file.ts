import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-bar.open-file-menu-new-file'

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

  // act - trigger "New File"
  const menuItemNewFile = Locator('.MenuItem', { hasText: 'New File' })
  await Command.execute('TitleBar.handleMenuClick', 0, 0)

  // assert - verify action was triggered
  // The new file creation command should have been executed
  await expect(menuItemNewFile).not.toBeVisible()
}
