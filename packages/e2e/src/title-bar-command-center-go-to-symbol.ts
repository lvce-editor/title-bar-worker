import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-go-to-symbol'

export const test: Test = async (api) => {
  await openCommandCenter(api)

  const commandCenterItem = api.Locator('.QuickPickItem', { hasText: 'Go to Symbol in Editor' })
  await api.QuickPick.selectItem('Go to Symbol in Editor')

  await api.expect(api.Locator('.QuickPick')).toBeVisible()
  await api.expect(commandCenterItem).toHaveCount(0)
  await api.Command.execute('QuickPick.close')
}
