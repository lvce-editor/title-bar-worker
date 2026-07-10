import type { Test } from '@lvce-editor/test-with-playwright'
import { clickAppearanceMenuItem } from './_title-bar-menu-view-appearance-shared.js'

export const name = 'title-bar-menu-view-appearance-secondary-side-bar-show'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const secondarySideBar = Locator('.SecondarySideBar')
  await Command.execute('Layout.hideSecondarySideBar')
  await expect(secondarySideBar).toBeHidden()

  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Secondary Side Bar', 6)

  await expect(secondarySideBar).toBeVisible()
}
