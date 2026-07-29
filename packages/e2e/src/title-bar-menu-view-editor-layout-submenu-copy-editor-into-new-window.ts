import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-view-editor-layout-submenu-copy-editor-into-new-window'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await Command.execute('TitleBar.handleMenuClick', 0, 4)

  const item = Locator('#Menu-1 .MenuItem', { hasText: 'Copy Editor into New Window' })
  await expect(item).toBeVisible()
}
