import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-view-appearance-submenu-centered-layout'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowRight()

  const menuItem = Locator('#Menu-1 .MenuItem', { hasText: 'Centered Layout' })
  await expect(menuItem).toBeVisible()
}
