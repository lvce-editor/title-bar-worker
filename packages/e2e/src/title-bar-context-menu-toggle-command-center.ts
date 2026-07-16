import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar.context-menu-toggle-command-center'

export const test: Test = async ({ Command, ContextMenu, expect, KeyBoard, Locator, TitleBarMenuBar }) => {
  await Command.execute('TitleBar.hideCommandCenter', 0)

  const commandCenter = Locator('.MenuItem', { hasText: 'Command Center' })
  await TitleBarMenuBar.handleContextMenu(2, 0, 0)
  await expect(commandCenter).toHaveAttribute('aria-checked', 'false')

  await ContextMenu.selectItem('Command Center')

  await TitleBarMenuBar.handleContextMenu(2, 0, 0)
  await expect(commandCenter).toHaveAttribute('aria-checked', 'true')

  await ContextMenu.selectItem('Command Center')

  await TitleBarMenuBar.handleContextMenu(2, 0, 0)
  await expect(commandCenter).toHaveAttribute('aria-checked', 'false')

  await KeyBoard.press('Escape')
  await expect(commandCenter).toBeHidden()
}
