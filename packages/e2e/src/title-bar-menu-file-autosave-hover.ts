import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-autosave-hover'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()

  const autoSaveItem = Locator('#Menu-0 .MenuItem', { hasText: 'Auto Save' })
  await autoSaveItem.hover()

  const focusedAutoSaveItem = Locator('#Menu-0 .MenuItem.MenuItemFocused', { hasText: 'Auto Save' })
  await expect(focusedAutoSaveItem).toBeVisible()
}
