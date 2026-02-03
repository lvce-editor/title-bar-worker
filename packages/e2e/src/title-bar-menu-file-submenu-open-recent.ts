import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-submenu-open-recent'

export const skip = true

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

  // act - move down to reach Open Recent and then open its submenu
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()

  // act - open the Open Recent submenu
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert - submenu is visible
  const submenu = Locator('#Menu-1')
  await expect(submenu).toBeVisible()

  // assert - verify expected items in Open Recent submenu
  // The submenu should contain recently opened folders and always has:
  // - "..." (More)
  // - "Clear Recently Opened"
  const moreItem = Locator('.MenuItem', { hasText: /^\.\.\./ })
  await expect(moreItem).toBeVisible()

  const clearRecentlyOpenedItem = Locator('.MenuItem', { hasText: 'Clear Recently Opened' })
  await expect(clearRecentlyOpenedItem).toBeVisible()

  // Close the submenu and menu
  await TitleBarMenuBar.handleKeyEscape()
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and File is still focused
  await expect(menu).toBeHidden()
  await expect(fileMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
