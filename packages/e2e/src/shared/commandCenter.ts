import type { TestApi } from '@lvce-editor/test-with-playwright'

export const showCommandCenter = async ({ Command, expect, Locator }: TestApi): Promise<ReturnType<TestApi['Locator']>> => {
  await Command.execute('TitleBar.showCommandCenter', 0)
  const commandCenter = Locator('.TitleBarCommandCenter')
  await expect(commandCenter).toBeVisible()
  return commandCenter
}

export const openCommandCenter = async (api: TestApi): Promise<void> => {
  await showCommandCenter(api)
  void api.Command.execute('TitleBar.handleCommandCenterClick', 0)
  await api.expect(api.Locator('.QuickPick')).toBeVisible()
  await api.expect(api.Locator('.QuickPickItem', { hasText: 'Go to File' })).toBeVisible()
}
