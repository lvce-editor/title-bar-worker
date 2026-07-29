import type { Test } from '@lvce-editor/test-with-playwright'
import { showCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-context-menu-hide'

export const test: Test = async (api) => {
  const commandCenter = await showCommandCenter(api)

  await api.TitleBarMenuBar.handleContextMenu(2, 0, 0)
  await api.ContextMenu.selectItem('Command Center')

  await api.expect(commandCenter).toHaveCount(0)
}
