import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-navigation-end-focuses-help'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyEnd()

  const item = Locator('.TitleBarTopLevelEntry', { hasText: 'Help' })
  await expect(item).toHaveAttribute('id', 'TitleBarEntryActive')
}
