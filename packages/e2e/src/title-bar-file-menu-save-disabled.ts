import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-file-menu-save-disabled'

export const test: Test = async ({ expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowDown()

  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()

  const disabledItems = menu.locator('.MenuItem[aria-disabled="true"]')
  const save = disabledItems.nth(0)
  const saveAll = Locator('#Menu-0 .MenuItem', { hasText: 'Save All' })

  await expect(save).toHaveClass('MenuItemDisabled')
  await expect(save).toHaveAttribute('aria-disabled', 'true')
  await expect(saveAll).toHaveAttribute('aria-disabled', null)

  // eslint-disable-next-line @typescript-eslint/no-deprecated -- exercises the DOM hover style under test
  await save.hover()
  await expect(save).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')

  const newFile = menu.locator('.MenuItem').nth(0)
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- exercises the DOM hover style under test
  await newFile.hover()
  const focusedNewFile = Locator('#Menu-0 .MenuItem.MenuItemFocused', { hasText: 'New File' })
  await expect(focusedNewFile).toBeVisible()
}
