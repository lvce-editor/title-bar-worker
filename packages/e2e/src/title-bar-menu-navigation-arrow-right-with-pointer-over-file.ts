import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-navigation-arrow-right-with-pointer-over-file'

export const test: Test = async ({ Command, expect, KeyBoard, Locator }) => {
  const fileEntry = Locator('.TitleBarTopLevelEntry[name="File"]')
  const editEntry = Locator('.TitleBarTopLevelEntry[name="Edit"]')
  const selectionEntry = Locator('.TitleBarTopLevelEntry[name="Selection"]')

  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Keep the real pointer stationary for this regression scenario.
  await fileEntry.hover()
  await Command.execute('TitleBar.handleClick', 0, 0)
  await expect(fileEntry).toHaveAttribute('aria-expanded', 'true')

  await KeyBoard.press('ArrowRight')
  await expect(editEntry).toHaveAttribute('aria-expanded', 'true')

  await KeyBoard.press('ArrowRight')
  await expect(selectionEntry).toHaveAttribute('aria-expanded', 'true')
}
