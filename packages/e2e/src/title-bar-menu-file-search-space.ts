import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-search-space'

export const test: Test = async ({ Command, expect, KeyBoard, Locator, TitleBarMenuBar }) => {
  // arrange
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  const fileMenu = Locator('#Menu-0')
  await expect(fileMenu).toBeVisible()

  // act
  await Command.execute('ActivityBar.handleClickIndex', 0, 1, 0, 0)
  const searchInput = Locator('[name="SearchValue"]')
  await expect(searchInput).toBeVisible()
  await expect(searchInput).toBeFocused()
  await TitleBarMenuBar.closeMenu()
  await TitleBarMenuBar.focusIndex(0)
  // A stale title-bar focus context handles Space here and reopens the File menu.
  await KeyBoard.press('Space')

  // assert
  await expect(fileMenu).toBeHidden()
}
