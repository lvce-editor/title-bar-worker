import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

const openMenu = async ({ TitleBarMenuBar }: TestApi, menuOffset: number): Promise<void> => {
  await TitleBarMenuBar.focus()
  for (let i = 0; i < menuOffset; i++) {
    await TitleBarMenuBar.handleKeyArrowRight()
  }
  await TitleBarMenuBar.handleKeyArrowDown()
}

export const createMenuItemTest = (menuOffset: number, itemIndex: number, label: string): Test => {
  return async (api) => {
    await openMenu(api, menuOffset)

    const menu = api.Locator('#Menu-0')
    await api.expect(menu).toBeVisible()

    const item = menu.locator('.MenuItem').nth(itemIndex)
    await api.expect(item).toBeVisible()
    await api.expect(item).toContainText(label)
    await api.expect(item).toHaveAttribute('role', 'menuitem')
  }
}
