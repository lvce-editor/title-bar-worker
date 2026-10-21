import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-help-hover-leave-clears-highlight'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await Command.execute('TitleBar.handleMouseOver', 7)
  const help = Locator('.TitleBarTopLevelEntry', { hasText: 'Help' })
  await expect(help).toHaveAttribute('id', 'TitleBarEntryActive')

  await Command.execute('TitleBar.handlePointerOut', 1000, 1000)
  await expect(help).toHaveAttribute('id', null)
}
