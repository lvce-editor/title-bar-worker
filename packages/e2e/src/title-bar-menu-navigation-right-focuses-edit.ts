import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-navigation-right-focuses-edit'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()

  const item = Locator('.TitleBarTopLevelEntry', { hasText: 'Edit' })
  await expect(item).toHaveAttribute('id', 'TitleBarEntryActive')
}
