import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-go-submenu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // act - focus menu bar
  await TitleBarMenuBar.focus()

  // act - navigate to Go menu
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()

  // assert - Go is focused
  const goMenu = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Go',
  })
  await expect(goMenu).toHaveAttribute('id', 'TitleBarEntryActive')

  // act - open Go menu
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Go submenu is visible
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  // assert - verify expected menu items in Go submenu
  const switchEditorItem = Locator('.MenuItem', { hasText: 'Switch Editor' })
  await expect(switchEditorItem).toBeVisible()

  const switchGroupItem = Locator('.MenuItem', { hasText: 'Switch Group' })
  await expect(switchGroupItem).toBeVisible()

  const goToFileItem = Locator('.MenuItem', { hasText: 'Go to File...' })
  await expect(goToFileItem).toBeVisible()

  const nextProblemItem = Locator('.MenuItem', { hasText: 'Next Problem' })
  await expect(nextProblemItem).toBeVisible()

  // Close the menu
  await TitleBarMenuBar.handleKeyEscape()

  // assert - menu is closed and Go is still focused
  await expect(menu).toBeHidden()
  await expect(goMenu).toHaveAttribute('id', 'TitleBarEntryActive')
}
