import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-search'

export const test: Test = async (api) => {
  await selectViewMenuItem(api, 7, 'Search')

  await api.expect(api.Locator('.SideBar:not(.SecondarySideBar)')).toBeVisible()
  await api.expect(api.Locator('.SideBarTitleAreaTitle')).toHaveText('Search')
}
