import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-run-task'

export const test: Test = async (api) => {
  await openCommandCenter(api)

  await api.expect(api.Locator('.QuickPickItem', { hasText: 'Run Task' })).toBeVisible()
}
