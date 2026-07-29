import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-navigation-home-focuses-file'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyHome()

  const item = Locator('.TitleBarTopLevelEntry', { hasText: 'File' })
  await expect(item).toHaveAttribute('id', 'TitleBarEntryActive')
}
