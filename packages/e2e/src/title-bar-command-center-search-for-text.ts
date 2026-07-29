import type { Test } from '@lvce-editor/test-with-playwright'
import { openCommandCenter } from './shared/commandCenter.ts'

export const name = 'title-bar.command-center-search-for-text'

export const test: Test = async (api) => {
  await openCommandCenter(api)

  await api.QuickPick.selectItem('Search for Text')

  await api.expect(api.Locator('.Search')).toBeVisible()
}
