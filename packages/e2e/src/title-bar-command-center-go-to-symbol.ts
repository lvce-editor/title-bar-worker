import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-go-to-symbol'

export const test: Test = async (api) => {
  await openCommandCenter(api)

  await api.QuickPick.selectItem('Go to Symbol in Editor', { waitUntil: 'quickPick' })

  await api.expect(api.Locator('.QuickPick')).toBeVisible()
  await api.Command.execute('QuickPick.close')
}
