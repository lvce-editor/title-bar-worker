import type { TestApi } from '@lvce-editor/test-with-playwright'

export const selectEditorLayoutItem = async ({ Command, expect, Locator, TitleBarMenuBar }: TestApi, label: string, index: number): Promise<void> => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await Command.execute('TitleBar.handleMenuClick', 0, 4)

  const item = Locator('#Menu-1 .MenuItem', { hasText: label })
  await expect(item).toBeVisible()
  await Command.execute('TitleBar.handleMenuClick', 1, index)
  await expect(item).toBeHidden()
}
