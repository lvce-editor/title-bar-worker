import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'title-bar-menu-go-back'

export const test: Test = async ({ Command, expect, Locator, TitleBarMenuBar }) => {
  await TitleBarMenuBar.focus()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowRight()
  await TitleBarMenuBar.handleKeyArrowDown()

  const back = Locator('.MenuItem', { hasText: 'Back' })
  await expect(back).toBeVisible()

  await Command.execute('TitleBar.handleMenuClick', 0, 0)

  const dialog = Locator('.DialogContent')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('.DialogMessage')).toHaveText('Not implemented')

  await Command.execute('Dialog.close')
  await expect(dialog).toBeHidden()
}
