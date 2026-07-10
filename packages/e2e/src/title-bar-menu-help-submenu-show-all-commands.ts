import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-submenu-show-all-commands'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  // arrange
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()
  await TitleBarMenuBar.handleKeyArrowDown()

  const showAllCommandsItem = Locator('.MenuItem', { hasText: 'Show All Commands' })
  await expect(showAllCommandsItem).toBeVisible()

  // act
  await Command.execute('TitleBar.handleMenuClick', 0, 0)

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()
}
