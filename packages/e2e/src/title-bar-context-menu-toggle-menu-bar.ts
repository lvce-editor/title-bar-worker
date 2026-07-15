import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar.context-menu-toggle-menu-bar'

export const test: Test = async ({ ContextMenu, expect, Locator, TitleBarMenuBar }) => {
  const menuBar = Locator('.TitleBarMenuBar')
  await expect(menuBar).toBeVisible()
  await TitleBarMenuBar.handleContextMenu(2, 0, 0)

  await ContextMenu.selectItem('Menu Bar')

  await expect(menuBar).toHaveCount(0)
}
