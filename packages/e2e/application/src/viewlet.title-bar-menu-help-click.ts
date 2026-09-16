import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.title-bar-menu-help-click'

export const test: Test = async ({ expect, Locator }) => {
  const help = Locator('.TitleBarTopLevelEntry', { hasText: 'Help' })
  const menu = Locator('#Menu-0')
  for (let iteration = 0; iteration < 2; iteration++) {
    // eslint-disable-next-line e2e/no-direct-click -- exercises the DOM mouse event rather than the index-based command
    await help.click()
    await expect(help).toHaveAttribute('aria-expanded', 'true')
    await expect(menu).toBeVisible()
    await expect(menu.locator('.MenuItem', { hasText: 'About' })).toBeVisible()
    // eslint-disable-next-line e2e/no-direct-click -- verifies clicking the focused label closes the menu
    await help.click()
    await expect(menu).toBeHidden()
  }
}
