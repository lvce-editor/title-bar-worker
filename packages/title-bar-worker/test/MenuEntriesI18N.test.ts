import { expect, jest, test } from '@jest/globals'

const translations = {
  'Align Panel': 'Translated align panel',
  Center: 'Translated center',
  'Go to File...': 'Translated go to file',
  'Move Primary Side Bar Left': 'Translated left sidebar',
  'Move Primary Side Bar Right': 'Translated right sidebar',
  'Switch Editor': 'Translated switch editor',
}

// The real i18n implementation returns its English key when no locale is configured.
// eslint-disable-next-line jest/no-restricted-jest-methods
await jest.unstable_mockModule('../src/parts/I18NString/I18NString.ts', (): { i18nString: (key: string) => string } => ({
  i18nString: (key: string): string => translations[key as keyof typeof translations] ?? key,
}))

const MenuEntriesAppearance = await import('../src/parts/MenuEntriesAppearance/MenuEntriesAppearance.ts')
const MenuEntriesGo = await import('../src/parts/MenuEntriesGo/MenuEntriesGo.ts')

test('appearance menu labels use localized strings', async () => {
  const leftSideBarEntries = await MenuEntriesAppearance.getMenuEntries(1)
  const rightSideBarEntries = await MenuEntriesAppearance.getMenuEntries(2)
  const alignPanelEntries = await MenuEntriesAppearance.getAlignPanelMenuEntries()

  expect(leftSideBarEntries.find(({ id }) => id === 'movePrimarySideBarRight')?.label).toBe('Translated right sidebar')
  expect(rightSideBarEntries.find(({ id }) => id === 'movePrimarySideBarLeft')?.label).toBe('Translated left sidebar')
  expect(leftSideBarEntries.find(({ id }) => id === 'alignPanel')?.label).toBe('Translated align panel')
  expect(alignPanelEntries.find(({ id }) => id === 'alignPanelCenter')?.label).toBe('Translated center')
})

test('Go menu labels use localized strings', () => {
  const entries = MenuEntriesGo.getMenuEntries()

  expect(entries.find(({ id }) => id === 'switchEditor')?.label).toBe('Translated switch editor')
  expect(entries.find(({ id }) => id === 'goToFile')?.label).toBe('Translated go to file')
})
