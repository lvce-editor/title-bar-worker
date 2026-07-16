import type { TestApi } from '@lvce-editor/test-with-playwright'

type MenuKeyBindingsApi = Pick<TestApi, 'expect' | 'Locator'>

export const expectMenuKeyBinding = async (
  { expect, Locator }: MenuKeyBindingsApi,
  menuSelector: string,
  label: string,
  keyBinding: string,
): Promise<void> => {
  const menuItem = Locator(`${menuSelector} .MenuItem`, { hasText: label })
  await expect(menuItem).toBeVisible()
  await expect(menuItem.locator('.MenuItemKeyBinding')).toHaveText(keyBinding)
}
