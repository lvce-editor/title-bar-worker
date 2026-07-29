import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar.command-center-context-menu-show'

export const test: Test = async ({ Command, ContextMenu, expect, Locator, TitleBarMenuBar }) => {
  await Command.execute('TitleBar.hideCommandCenter', 0)
  const commandCenter = Locator('.TitleBarCommandCenter')

  await TitleBarMenuBar.handleContextMenu(2, 0, 0)
  await ContextMenu.selectItem('Command Center')

  await expect(commandCenter).toBeVisible()
}
