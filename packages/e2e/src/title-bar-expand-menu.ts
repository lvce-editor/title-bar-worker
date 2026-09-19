import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.title-bar-expand-menu'

export const skip = true

export const test: Test = async ({ Command, expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')

  await Workspace.setUri(tmpDir)

  const titleBar = Locator('#TitleBar')
  await expect(titleBar).toHaveAttribute('role', 'contentinfo')
  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  await expect(titleBarMenuBar).toHaveAttribute('role', 'menubar')
  const menuItemFile = titleBarMenuBar.locator('.TitleBarTopLevelEntry[name="File"]')
  await expect(menuItemFile).toHaveAttribute('tabindex', '-1')
  await expect(menuItemFile).toHaveAttribute('aria-haspopup', 'true')
  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'false')
  await expect(menuItemFile).toHaveAttribute('role', 'menuitem')
  await Command.execute('TitleBar.handleClick', 0, 0)

  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'true')

  const menu = Locator('.Menu')
  await expect(menu).toHaveCount(1)

  const menuItemNewWindow = menu.locator('text=New Window')
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- exercises DOM hover handling; a command would bypass the event under test
  await menuItemNewWindow.hover()
  await expect(menuItemNewWindow).toHaveClass('Focused')

  const menuItemOpenRecent = menu.locator('text=Open Recent')
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- exercises DOM hover handling; a command would bypass the event under test
  await menuItemOpenRecent.hover()
  await expect(menuItemOpenRecent).toHaveClass('Focused')

  await expect(menu).toHaveCount(2)
  const subMenu = menu.nth(1)
  await expect(menuItemOpenRecent).toHaveAttribute('aria-expanded', 'true')
  await expect(menuItemOpenRecent).toHaveAttribute('aria-owns', 'Menu-1')

  const subMenuItemClearRecentlyOpened = subMenu.locator('text=Clear Recently Opened')
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- exercises DOM hover handling; a command would bypass the event under test
  await subMenuItemClearRecentlyOpened.hover()

  const menuItemExit = menu.locator('text=Exit')
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- exercises DOM hover handling; a command would bypass the event under test
  await menuItemExit.hover()

  await expect(menu).toHaveCount(1)
  await expect(menuItemExit).toBeFocused()
  // await expect(menuItemOpenRecent).toHaveAttribute('aria-expanded', 'false') // TODO
}
