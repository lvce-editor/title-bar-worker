import type { Test } from '@lvce-editor/test-with-playwright'
import { clickAppearanceMenuItem } from './_title-bar-menu-view-appearance-shared.js'

export const name = 'title-bar-menu-view-appearance-status-bar-show'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const statusBar = Locator('.StatusBar')
  await Command.execute('Layout.hideStatusBar')
  await expect(statusBar).toBeHidden()

  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Status Bar', 7)

  await expect(statusBar).toBeVisible()
}
