import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-problems'

export const test: Test = async (api) => {
  await api.Command.execute('Layout.hidePanel')
  await selectViewMenuItem(api, 14, 'Problems')

  await api.expect(api.Locator('.Panel')).toBeVisible()
  await api.expect(api.Locator('.PanelTab[name="Problems"]')).toHaveAttribute('aria-selected', 'true')
}
