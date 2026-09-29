import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.title-bar-open-folder-unsupported'

export const test: Test = async ({ Command, expect, Locator, Workspace }) => {
  await Workspace.setUri('')
  await Command.execute('FilePicker.setOpenFolderSupported', false)
  await Command.execute('Dialog.openFolder')

  const dialog = Locator('.DialogContent')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('.DialogHeading')).toHaveText('Opening Local Folders is Unsupported')
  await expect(dialog.locator('.DialogMessage')).toHaveText("Your browser doesn't support opening local folders.")

  const confirm = dialog.locator('button[name="Confirm"]')
  await expect(confirm).toHaveText('Ok')
  await expect(dialog.locator('.DialogClose')).toHaveAttribute('aria-label', 'Cancel')

  await Command.execute('FilePicker.setOpenFolderSupported', true)
}
