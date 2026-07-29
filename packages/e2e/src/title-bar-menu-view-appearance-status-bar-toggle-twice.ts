import type { Test } from '@lvce-editor/test-with-playwright'
import { clickAppearanceMenuItem } from './_title-bar-menu-view-appearance-shared.js'

export const name = 'title-bar-menu-view-appearance-status-bar-toggle-twice'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const statusBar = Locator('.StatusBar')
  await Command.execute('Layout.hideStatusBar')

  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Status Bar', 7)
  await expect(statusBar).toBeVisible()
  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Status Bar', 7)

  await expect(statusBar).toBeHidden()
}
