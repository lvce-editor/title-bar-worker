import type { Test } from '@lvce-editor/test-with-playwright'
import { clickAppearanceMenuItem } from './_title-bar-menu-view-appearance-shared.js'

export const name = 'title-bar-menu-view-appearance-submenu-move-primary-side-bar-left'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const sideBarLeft = 1
  const sideBarRight = 2
  const expectSideBarPosition = async (expected: number): Promise<void> => {
    const sideBarPosition = await Command.execute('Layout.getSideBarPosition')
    if (sideBarPosition !== expected) {
      throw new Error(`expected side bar position to be ${expected} but was ${sideBarPosition}`)
    }
  }

  await Command.execute('Layout.moveSideBarRight')
  await expectSideBarPosition(sideBarRight)

  await clickAppearanceMenuItem({ Command, expect, Locator, TitleBarMenuBar }, 'Move Primary Side Bar Left', 10)

  await expectSideBarPosition(sideBarLeft)
}
