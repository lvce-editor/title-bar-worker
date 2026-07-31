import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-run'

export const test: Test = async (api) => {
  await selectViewMenuItem(api, 9, 'Run')

  await api.expect(api.Locator('.SideBar:not(.SecondarySideBar)')).toBeVisible()
  await api.expect(api.Locator('.SideBarTitleAreaTitle')).toHaveText('Run And Debug')
}
