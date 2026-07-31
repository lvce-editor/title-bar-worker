import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-output'

export const test: Test = async (api) => {
  await selectViewMenuItem(api, 15, 'Output')

  await api.expect(api.Locator('.Panel')).toBeVisible()
  await api.expect(api.Locator('.PanelTab[name="Output"]')).toHaveAttribute('aria-selected', 'true')
}
