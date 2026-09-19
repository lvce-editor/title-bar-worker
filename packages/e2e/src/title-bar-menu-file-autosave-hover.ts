import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-file-autosave-hover'

export const skip = 1

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()

  const autoSaveItem = Locator('#Menu-0 .MenuItem', { hasText: 'Auto Save' })
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- exercises DOM hover handling; a command would bypass the event under test
  await autoSaveItem.hover()

  const focusedAutoSaveItem = Locator('#Menu-0 .MenuItem.MenuItemFocused', { hasText: 'Auto Save' })
  await expect(focusedAutoSaveItem).toBeVisible()
}
