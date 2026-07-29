import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-show-run-commands'

export const test: Test = async (api) => {
  await openCommandCenter(api)

  await api.QuickPick.selectItem('Show and Run Commands')

  await api.QuickPick.setValue('>Help: About')
  await api.expect(api.Locator('.QuickPickItem', { hasText: 'Help: About' })).toBeVisible()
  await api.Command.execute('QuickPick.close')
}
