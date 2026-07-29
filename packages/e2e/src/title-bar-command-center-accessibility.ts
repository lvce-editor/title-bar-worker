import type { Test } from '@lvce-editor/test-with-playwright'
import { showCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-accessibility'

export const test: Test = async (api) => {
  const commandCenter = await showCommandCenter(api)

  await api.expect(commandCenter).toHaveAttribute('aria-label', 'Command Center')
  await api.expect(commandCenter).toHaveAttribute('role', 'button')
  await api.expect(commandCenter).toHaveAttribute('tabindex', '0')
}
