import type { Test } from '@lvce-editor/test-with-playwright'
import { showCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-enter'

export const test: Test = async (api) => {
  await showCommandCenter(api)

  await api.Command.execute('TitleBar.handleCommandCenterKeyDown', 'Enter')

  await api.expect(api.Locator('.QuickPick')).toBeVisible()
  await api.Command.execute('QuickPick.close')
}
