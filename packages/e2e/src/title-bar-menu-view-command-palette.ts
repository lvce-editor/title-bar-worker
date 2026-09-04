import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-command-palette'

export const test: Test = async (api) => {
  await selectViewMenuItem(api, 0, 'Command Palette')

  await api.expect(api.Locator('.QuickPick')).toBeVisible()
  await api.expect(api.Locator('[name="QuickPickInput"]')).toHaveValue('>')
  await api.Command.execute('QuickPick.close')
}
