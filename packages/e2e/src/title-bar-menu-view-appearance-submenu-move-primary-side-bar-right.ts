import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-view-appearance-submenu-move-primary-side-bar-right'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  const sideBarLeft = 1

  await Command.execute('Layout.moveSideBarLeft')
  const sideBarPosition = await Command.execute('Layout.getSideBarPosition')
  if (sideBarPosition !== sideBarLeft) {
    throw new Error(`expected side bar position to be ${sideBarLeft} but was ${sideBarPosition}`)
  }

  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowDown()
  await TitleBarMenuBar.handleKeyArrowRight()

  const movePrimarySideBarRight = Locator('#Menu-1 .MenuItem', { hasText: 'Move Primary Side Bar Right' })
  await expect(movePrimarySideBarRight).toBeVisible()
}
