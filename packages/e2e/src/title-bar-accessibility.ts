import type { Test } from '@lvce-editor/test-with-playwright'

// manual accessibility tests

// title bar
// nvda says: "File, sub menu, one of eight, expanded"
// windows narrator says: "File, Menu Item, expanded, one of eight"
// orca says: "File expanded, opens menu, expanded" ❌

// menu item "New Window"
// nvda says: "New window, two of six"
// windows narrator says: "New Window, menu item, two of siz"
// orca says: "new window"

// menu item "Open Recent"
// nvda says: "Open recent, sub menu, five of six"
// windows narrator says: "Open recent, menu item, expanded, five of six"
// orca says: "Open recent collapsed, opens menu"

// sub menu item "Clear Recently Opened"
// nvda says: "Clear recently opened, four of four"
// windows narrator says: "Clear recently opened, menu item, four of four"
// orca says: "Clear recently opened"

export const name = 'viewlet.title-bar-accessibility'

export const skip = true

export const test: Test = async ({ FileSystem, Locator, expect, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')

  await Workspace.setPath(tmpDir)

  const titleBar = Locator('#TitleBar')
  await expect(titleBar).toHaveAttribute('role', 'contentinfo')
  const titleBarMenuBar = Locator('#TitleBarMenu')
  await expect(titleBarMenuBar).toHaveAttribute('role', 'menubar')
  const menuItemFile = titleBarMenuBar.locator('.TitleBarTopLevelEntry[data-id="file"]')
  await expect(menuItemFile).toHaveAttribute('tabindex', '-1')
  await expect(menuItemFile).toHaveAttribute('aria-haspopup', 'true')
  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'false')
  await expect(menuItemFile).toHaveAttribute('role', 'menuitem')
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
