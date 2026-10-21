import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-root-lifecycle'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  const root = Locator('.TitleBarMenuRoot')
  const rootMenus = Locator('.TitleBarMenuRoot > .Menu')
  const subMenu = Locator('.TitleBarMenuRoot #Menu-1')
  const allMenus = Locator('.Menu')
  for (let iteration = 0; iteration < 3; iteration++) {
    await TitleBarMenuBar.focus()
    await TitleBarMenuBar.handleKeyArrowRight()
    await TitleBarMenuBar.handleKeyArrowRight()
    await TitleBarMenuBar.handleKeyArrowRight()
    await TitleBarMenuBar.handleKeyArrowDown()
    await TitleBarMenuBar.handleKeyArrowDown()
    await TitleBarMenuBar.handleKeyArrowDown()
    await TitleBarMenuBar.handleKeyArrowRight()
    await expect(root).toHaveCount(1)
    await expect(rootMenus).toHaveCount(2)
    await expect(subMenu).toBeVisible()
    await TitleBarMenuBar.handleKeyEscape()
    await TitleBarMenuBar.handleKeyEscape()
    await expect(root).toHaveCount(0)
    await expect(allMenus).toHaveCount(0)
  }
}
