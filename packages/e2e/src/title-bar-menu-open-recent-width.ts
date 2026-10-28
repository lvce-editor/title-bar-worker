import type { Test } from '@lvce-editor/test-with-playwright'

const expandedMenuWidth = /^(?:[3-9]\d{2}|\d{4,})(?:\.\d+)?px$/ as unknown as string

export const name = 'title-bar-menu-open-recent-width'

// Persisting recently-opened.json is not supported by the Windows E2E file-system fixture.
const runtime = globalThis as typeof globalThis & { navigator?: { platform?: string } }
export const skip = runtime.navigator?.platform === 'Win32'

export const test: Test = async ({ Command, expect, FileSystem, Locator, TitleBarMenuBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const current = `${tmpDir}/current`
  const recent = `${tmpDir}/${'long-recent-workspace-path-'.repeat(5)}`
  await Workspace.setUri(current)
  await Command.execute('RecentlyOpened.clearRecentlyOpened')
  await Command.execute('RecentlyOpened.addToRecentlyOpened', recent)
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()
  await Command.execute('TitleBar.handleMenuClick', 0, 5)

  const menu = Locator('#Menu-1')
  const item = menu.locator('.MenuItem').nth(0)
  await expect(menu).toBeVisible()
  // The old fixed 250px width clips this path in every supported font.
  await expect(menu).toHaveCSS('width', expandedMenuWidth)
  await expect(item).toContainText(recent)
  await expect(item).toHaveAttribute('title', recent)
  await expect(item).toHaveCSS('text-overflow', 'ellipsis')
  await TitleBarMenuBar.handleKeyArrowDown()
  await expect(item).toBeFocused()
  await TitleBarMenuBar.handleKeyEscape()
  await expect(menu).toBeHidden()

  // eslint-disable-next-line @typescript-eslint/no-deprecated -- reset the hovered parent item
  await Locator('#Menu-0 .MenuItem').nth(0).dispatchEvent('mousemove', { bubbles: true } as unknown as string)

  // Exercise the mousemove event too: it previously had a separate fixed-width path.
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- verifies the DOM mouse event
  await Locator('#Menu-0 .MenuItemSubMenu').dispatchEvent('mousemove', { bubbles: true } as unknown as string)
  await expect(menu).toBeVisible()
  await expect(menu).toHaveCSS('width', expandedMenuWidth)
  await expect(item).toHaveAttribute('title', recent)
}
