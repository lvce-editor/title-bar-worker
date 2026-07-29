import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-run-task'

export const test: Test = async (api) => {
  await openCommandCenter(api)

  await api.QuickPick.selectItem('Run Task', { waitUntil: 'quickPick' })

  await api.expect(api.Locator('.QuickPickItem', { hasText: 'Help: About' })).toBeVisible()
  await api.Command.execute('QuickPick.close')
}
