import type { Test } from '@lvce-editor/test-with-playwright'
import { showCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-show'

export const test: Test = async (api) => {
  const commandCenter = await showCommandCenter(api)

  await api.expect(commandCenter).toHaveText('Search')
}
