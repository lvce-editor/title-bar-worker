import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-selection-submenu-select-all'

export const skip = 1

export const test: Test = async ({ expect, Locator }) => {
  // arrange
  const titleBarItemSelection = Locator('.TitleBarTopLevelEntry', {
    hasText: 'Selection',
  })

  // act - open Selection menu
  // @ts-ignore
  await titleBarItemSelection.click()

  // assert - Selection menu is visible
  const selectionMenu = Locator('#Menu-2')
  await expect(selectionMenu).toBeVisible()

  // act - click on "Select All"
  const menuItemSelectAll = Locator('.MenuItem', { hasText: 'Select All' })
  // @ts-ignore
  await menuItemSelectAll.click()

  // assert - verify action was triggered
  await expect(menuItemSelectAll).not.toBeVisible()
}
