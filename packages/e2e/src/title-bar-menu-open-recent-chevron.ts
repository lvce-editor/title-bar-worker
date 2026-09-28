import type { Test } from '@lvce-editor/test-with-playwright'

// The runtime matcher accepts a RegExp, but the test-worker declaration currently says string.
const chevronMaskImage = /chevron-right\.svg/ as unknown as string

export const name = 'title-bar-menu-open-recent-chevron'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()

  const menu = Locator('#Menu-0')
  const openRecent = menu.locator('.MenuItemSubMenu')
  const chevron = openRecent.locator('.MenuItemSubMenuArrowRight')

  await expect(menu).toBeVisible()
  await expect(openRecent).toBeVisible()
  await expect(chevron).toBeVisible()
  await expect(chevron).toHaveCSS('width', '16px')
  await expect(chevron).toHaveCSS('height', '16px')
  await expect(chevron).toHaveCSS('mask-image', chevronMaskImage)
  await expect(chevron).toHaveCSS('mask-mode', 'alpha')
  const regularMenuItemChevron = menu.locator('.MenuItem').nth(0).locator('.MenuItemSubMenuArrowRight')
  await expect(regularMenuItemChevron).toHaveCount(0)

  await TitleBarMenuBar.handleKeyHome()
  for (let i = 0; i < 4; i++) {
    await TitleBarMenuBar.handleKeyArrowDown()
  }

  const focusedOpenRecent = menu.locator('.MenuItemSubMenu.MenuItemFocused')
  const focusedChevron = focusedOpenRecent.locator('.MenuItemSubMenuArrowRight')
  await expect(focusedChevron).toBeVisible()
  await expect(focusedOpenRecent).toBeFocused()

  await TitleBarMenuBar.handleKeyArrowRight()
  await expect(focusedOpenRecent).toHaveAttribute('aria-expanded', 'true')
  const openRecentSubmenu = Locator('#Menu-1')
  await expect(openRecentSubmenu).toBeVisible()
}
