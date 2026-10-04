import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-view-appearance-submenu-align-panel'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowRight()

  const menuItem = Locator('#Menu-1 .MenuItem', { hasText: 'Align Panel' })
  await expect(menuItem).toBeVisible()
  await TitleBarMenuBar.handleKeyArrowRight()
  const centerMenuItem = Locator('#Menu-2 .MenuItem', { hasText: 'Center' })
  const justifyMenuItem = Locator('#Menu-2 .MenuItem', { hasText: 'Justify' })
  const leftMenuItem = Locator('#Menu-2 .MenuItem', { hasText: 'Left' })
  const rightMenuItem = Locator('#Menu-2 .MenuItem', { hasText: 'Right' })
  await expect(centerMenuItem).toBeVisible()
  await expect(justifyMenuItem).toBeVisible()
  await expect(leftMenuItem).toBeVisible()
  await expect(rightMenuItem).toBeVisible()
}
