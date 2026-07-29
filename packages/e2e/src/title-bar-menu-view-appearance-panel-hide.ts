import type { Test } from '@lvce-editor/test-with-playwright'
import { clickAppearanceMenuItem } from './_title-bar-menu-view-appearance-shared.js'

export const name = 'title-bar-menu-view-appearance-panel-hide'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const panel = Locator('.Panel')
  await Command.execute('Layout.showPanel', 'Output')
  await expect(panel).toBeVisible()

  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Panel', 8)

  await expect(panel).toBeHidden()
}
