import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-selection-submenu-shrink-selection'

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

  // act - click on "Shrink Selection"
  const menuItemShrinkSelection = Locator('.MenuItem', { hasText: 'Shrink Selection' })
  // @ts-ignore
  await menuItemShrinkSelection.click()

  // assert - verify action was triggered
  await expect(menuItemShrinkSelection).not.toBeVisible()
}
