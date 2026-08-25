import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-separator-hover-keeps-open'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()

  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()
  const newFile = Locator('#Menu-0 .MenuItem', { hasText: 'New File' })
  await expect(newFile).toBeFocused()

  const separator = Locator('#Menu-0 .MenuItemSeparator').first()
  await separator.hover()

  await expect(menu).toBeVisible()
  await expect(newFile).toBeFocused()
}
