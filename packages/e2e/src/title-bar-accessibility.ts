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

// export const skip = true

export const test: Test = async ({ expect, FileSystem, Locator, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')

  await Workspace.setPath(tmpDir)

  const titleBar = Locator('#TitleBar')
  await expect(titleBar).toHaveAttribute('role', 'contentinfo')
  const titleBarMenuBar = Locator('.TitleBarMenuBar')
  await expect(titleBarMenuBar).toBeVisible()
  await expect(titleBarMenuBar).toHaveAttribute('role', 'menubar')
  const menuItemFile = Locator('.TitleBarTopLevelEntry[name="File"]')
  await expect(menuItemFile).toHaveAttribute('aria-haspopup', 'true')
  await expect(menuItemFile).toHaveAttribute('aria-expanded', 'false')
  await expect(menuItemFile).toHaveAttribute('role', 'menuitem')
}
