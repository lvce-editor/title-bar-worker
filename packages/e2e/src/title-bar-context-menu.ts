import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar.context-menu'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  const commandCenter = Locator('.MenuItem', { hasText: 'Command Center' })
  const layoutControls = Locator('.MenuItem', { hasText: 'Layout Controls' })
  const menuBar = Locator('.MenuItem', { hasText: 'Menu Bar' })

  await TitleBarMenuBar.handleContextMenu(2, 0, 0)

  await expect(menuBar).toBeVisible()
  await expect(commandCenter).toBeVisible()
  await expect(layoutControls).toBeVisible()
}
