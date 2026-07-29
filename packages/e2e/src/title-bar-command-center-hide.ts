import type { Test } from '@lvce-editor/test-with-playwright'
import { showCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-hide'

export const test: Test = async (api) => {
  const commandCenter = await showCommandCenter(api)

  await api.Command.execute('TitleBar.hideCommandCenter', 0)

  await api.expect(commandCenter).toHaveCount(0)
}
