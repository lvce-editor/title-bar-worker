import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.title-bar-expand-menu'

export const skip = true

export const test: Test = async ({ expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')

  await Workspace.setPath(tmpDir)

  const titleBar = Locator('#TitleBar')
  await expect(titleBar).toHaveAttribute('role', 'contentinfo')
  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  await expect(titleBarMenuBar).toHaveAttribute('role', 'menubar')
  const menuItemFile = titleBarMenuBar.locator('.TitleBarTopLevelEntry[name="File"]')
  await expect(menuItemFile).toHaveAttribute('tabindex', '-1')
  await expect(menuItemFile).toHaveAttribute('aria-haspopup', 'true')
  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'false')
  await expect(menuItemFile).toHaveAttribute('role', 'menuitem')
  // @ts-ignore
  await menuItemFile.click()

  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'true')

  const menu = Locator('.Menu')
  await expect(menu).toHaveCount(1)

  const menuItemNewWindow = menu.locator('text=New Window')
  await menuItemNewWindow.hover()
  await expect(menuItemNewWindow).toHaveClass('Focused')

  const menuItemOpenRecent = menu.locator('text=Open Recent')
  await menuItemOpenRecent.hover()
  await expect(menuItemOpenRecent).toHaveClass('Focused')

  await expect(menu).toHaveCount(2)
  const subMenu = menu.nth(1)
  await expect(menuItemOpenRecent).toHaveAttribute('aria-expanded', 'true')
  await expect(menuItemOpenRecent).toHaveAttribute('aria-owns', 'Menu-1')

  const subMenuItemClearRecentlyOpened = subMenu.locator('text=Clear Recently Opened')
  await subMenuItemClearRecentlyOpened.hover()

  const menuItemExit = menu.locator('text=Exit')
  await menuItemExit.hover()

  await expect(menu).toHaveCount(1)
  await expect(menuItemExit).toBeFocused()
  // await expect(menuItemOpenRecent).toHaveAttribute('aria-expanded', 'false') // TODO
}
