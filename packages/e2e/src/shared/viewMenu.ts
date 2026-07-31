import type { TestApi } from '@lvce-editor/test-with-playwright'

const viewMenuOffset = 3

export const openViewMenu = async ({ TitleBarMenuBar }: TestApi): Promise<void> => {
  await TitleBarMenuBar.focus()
  for (let i = 0; i < viewMenuOffset; i++) {
    await TitleBarMenuBar.handleKeyArrowRight()
  }
  await TitleBarMenuBar.handleKeyArrowDown()
}

export const selectViewMenuItem = async (api: TestApi, itemIndex: number, label: string): Promise<void> => {
  await openViewMenu(api)
  const item = api.Locator('#Menu-0 .MenuItem', { hasText: label })
  await api.expect(item).toBeVisible()
  await api.Command.execute('TitleBar.handleMenuClick', 0, itemIndex)
  await api.expect(item).toBeHidden()
}
