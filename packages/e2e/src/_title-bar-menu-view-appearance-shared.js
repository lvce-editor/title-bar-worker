// @ts-check

/**
 * @typedef {import('@lvce-editor/test-with-playwright').TestApi} TestApi
 * @typedef {Pick<TestApi, 'Command' | 'expect' | 'Locator' | 'TitleBarMenuBar'>} AppearanceMenuApi
 */

/**
 * @param {AppearanceMenuApi} api
 * @param {string} label
 * @param {number} index
 * @returns {Promise<void>}
 */
export const clickAppearanceMenuItem = async ({ Command, expect, Locator, TitleBarMenuBar }, label, index) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowRight()

  const menuItem = Locator('#Menu-1 .MenuItem', { hasText: label })
  await expect(menuItem).toBeVisible()
  await Command.execute('TitleBar.handleMenuClick', 1, index)
}
