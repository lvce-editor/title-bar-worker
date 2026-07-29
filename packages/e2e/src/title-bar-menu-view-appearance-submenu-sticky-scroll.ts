import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-view-appearance-submenu-sticky-scroll'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowRight()

  const menuItem = Locator('#Menu-1 .MenuItem', { hasText: 'Sticky Scroll' })
  await expect(menuItem).toBeVisible()
}
