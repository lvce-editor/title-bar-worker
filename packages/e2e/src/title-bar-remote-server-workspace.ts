import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-remote-server-workspace'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  // arrange
  const title = Locator('.TitleBarTitle')
  const terminalMenu = Locator('.TitleBarTopLevelEntry', { hasText: 'Terminal' })

  // act
  await TitleBarMenuBar.handleWorkspaceChange('remote-server://user@example.com/home/user/my-project')

  // assert
  await expect(title).toBeVisible()
  await expect(terminalMenu).toBeVisible()

  // act - open Terminal menu
  await TitleBarMenuBar.focus()
  for (let index = 0; index < 6; index++) {
    await TitleBarMenuBar.handleKeyArrowRight()
  }
  await TitleBarMenuBar.handleKeyArrowDown()

  // assert - Terminal submenu commands are available
  const newTerminalItem = Locator('.MenuItem', { hasText: 'New Terminal' })
  await expect(newTerminalItem).toBeVisible()

  // act - change to a remote SSH workspace
  await TitleBarMenuBar.closeMenu()
  await TitleBarMenuBar.handleWorkspaceChange('remote-ssh://user@example.com/home/user/my-project')

  // assert - the Terminal menu remains available for remote SSH
  await expect(terminalMenu).toBeVisible()
}
