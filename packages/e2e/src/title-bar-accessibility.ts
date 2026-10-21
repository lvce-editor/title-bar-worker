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

export const test: Test = async ({ expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')

  await Workspace.setUri(tmpDir)

  const titleBar = Locator('#TitleBar')
  await expect(titleBar).toHaveAttribute('role', 'contentinfo')
  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  await expect(titleBarMenuBar).toBeVisible()
  await expect(titleBarMenuBar).toHaveAttribute('role', 'menubar')
  await expect(titleBarMenuBar).toHaveAttribute('tabindex', '0')
  const menuItemFile = Locator('.TitleBarTopLevelEntry', { hasText: 'File' })
  const menu0 = Locator('#Menu-0')
  await expect(menuItemFile).toHaveAttribute('aria-haspopup', 'true')
  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'false')
  await expect(menuItemFile).toHaveAttribute('role', 'menuitem')
  await TitleBarMenuBar.focus()
  await expect(titleBarMenuBar).toHaveAttribute('aria-activedescendant', 'TitleBarEntryActive')
  await expect(menuItemFile).toHaveAttribute('id', 'TitleBarEntryActive')
  await TitleBarMenuBar.handleKeyArrowDown()
  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'true')
  await expect(menuItemFile).toHaveAttribute('aria-owns', 'Menu-0')
  await expect(menu0).toBeVisible()
}
