import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-terminal'

export const test: Test = async (api) => {
  await selectViewMenuItem(api, 16, 'Terminal')

  await api.expect(api.Locator('.Panel')).toBeVisible()
  await api.expect(api.Locator('.PanelTab[name="Terminals"]')).toHaveAttribute('aria-selected', 'true')
}
