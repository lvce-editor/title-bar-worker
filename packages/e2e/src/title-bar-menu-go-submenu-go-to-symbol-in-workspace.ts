import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-go-submenu-go-to-symbol-in-workspace'
export const skip = 1

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  // arrange
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()

  const goToSymbolInWorkspaceItem = Locator('.MenuItem', { hasText: 'Go to Symbol in Workspace...' })
  await expect(goToSymbolInWorkspaceItem).toBeVisible()

  // act
  await Command.execute('TitleBar.handleMenuClick', 0, 8)

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()

  const quickPickInput = Locator('#QuickPick .InputBox')
  await expect(quickPickInput).toHaveValue('#')
}
