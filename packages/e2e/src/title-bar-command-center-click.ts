import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-click'

export const test: Test = async (api) => {
  await openCommandCenter(api)

  await api.Command.execute('QuickPick.close')
}
