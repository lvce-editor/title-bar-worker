import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus and open File menu
  await TitleBarMenuBar.focus()

  // assert - File is focused
  const fileMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'File',
  })
  await expect(fileMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open File menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - File submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - verify expected menu items in File submenu
  const newFileItem = Locator('.MenuItem', { hasText: 'New File' })
  await expect(newFileItem).toBeVisible()

  const newWindowItem = Locator('.MenuItem', { hasText: 'New Window' })
  await expect(newWindowItem).toBeVisible()

  const openFileItem = Locator('.MenuItem', { hasText: 'Open File' })
  await expect(openFileItem).toBeVisible()

  const openFolderItem = Locator('.MenuItem', { hasText: 'Open Folder' })
  await expect(openFolderItem).toBeVisible()

  const openRecentItem = Locator('.MenuItem', { hasText: 'Open Recent' })
  await expect(openRecentItem).toBeVisible()

  const saveItem = Locator('.MenuItem', { hasText: 'Save' })
  await expect(saveItem).toBeVisible()

  const saveAllItem = Locator('.MenuItem', { hasText: 'Save All' })
  await expect(saveAllItem).toBeVisible()

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and File is still focused
  await expect(menu).toBeHidden()
  await expect(fileMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
