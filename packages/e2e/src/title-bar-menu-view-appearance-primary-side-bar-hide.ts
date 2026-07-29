import type { Test } from '@lvce-editor/test-with-playwright'
import { clickAppearanceMenuItem } from './_title-bar-menu-view-appearance-shared.js'

export const name = 'title-bar-menu-view-appearance-primary-side-bar-hide'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const sideBar = Locator('.SideBar:not(.SecondarySideBar)')
  await Command.execute('Layout.showSideBar')
  await expect(sideBar).toBeVisible()

  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Primary Side Bar', 5)

  await expect(sideBar).toBeHidden()
}
