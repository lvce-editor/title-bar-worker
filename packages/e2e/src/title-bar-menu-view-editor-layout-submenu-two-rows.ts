import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-view-editor-layout-submenu-two-rows'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await Command.execute('TitleBar.handleMenuClick', 0, 4)

  const item = Locator('#Menu-1 .MenuItem', { hasText: 'Two Rows' }).nth(0)
  await expect(item).toBeVisible()
}
