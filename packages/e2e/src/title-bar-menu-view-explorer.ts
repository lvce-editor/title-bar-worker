import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-explorer'

export const test: Test = async (api) => {
  await api.Command.execute('Layout.hideSideBar')
  await selectViewMenuItem(api, 6, 'Explorer')

  await api.expect(api.Locator('.SideBar:not(.SecondarySideBar)')).toBeVisible()
  await api.expect(api.Locator('.SideBarTitleAreaTitle')).toHaveText('Explorer')
}
