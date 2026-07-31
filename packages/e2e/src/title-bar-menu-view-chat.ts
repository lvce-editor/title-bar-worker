import type { Test } from '@lvce-editor/test-with-playwright'
import { selectViewMenuItem } from './shared/viewMenu.ts'

export const name = 'title-bar-menu-view-chat'

export const test: Test = async (api) => {
  await api.Command.execute('Layout.hideSecondarySideBar')
  await selectViewMenuItem(api, 12, 'Chat')

  await api.expect(api.Locator('.SecondarySideBar')).toBeVisible()
  await api.expect(api.Locator('.SecondarySideBar .Chat')).toBeVisible()
}
