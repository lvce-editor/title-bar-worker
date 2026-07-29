import type { Test } from '@lvce-editor/test-with-playwright'
import { clickAppearanceMenuItem } from './_title-bar-menu-view-appearance-shared.js'

export const name = 'title-bar-menu-view-appearance-primary-side-bar-toggle-twice'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const sideBar = Locator('.SideBar:not(.SecondarySideBar)')
  await Command.execute('Layout.hideSideBar')

  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Primary Side Bar', 5)
  await expect(sideBar).toBeVisible()
  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Primary Side Bar', 5)

  await expect(sideBar).toBeHidden()
}
