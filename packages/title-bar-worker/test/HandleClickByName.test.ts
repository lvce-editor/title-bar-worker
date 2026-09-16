import { expect, test } from '@jest/globals'
import type { TitleBarMenuBarState } from '../src/parts/TitleBarMenuBarState/TitleBarMenuBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickByName } from '../src/parts/HandleClickByName/HandleClickByName.ts'

const createState = (): TitleBarMenuBarState => ({
  ...createDefaultState(),
  titleBarEntries: [
    { id: 1, label: 'File', width: 50 },
    { id: 7, label: 'Help', width: 50 },
  ],
})

test('opens Help by name independently of title bar position', async () => {
  const state = { ...createState(), x: 78 }
  const result = await handleClickByName(state, 0, 'Help')
  expect(result.focusedIndex).toBe(1)
  expect(result.isMenuOpen).toBe(true)
  expect(result.menus[0].items).toContainEqual(expect.objectContaining({ command: 'About.showAbout' }))
  const closed = await handleClickByName(result, 0, 'Help')
  expect(closed.isMenuOpen).toBe(false)
})

test('opens overflow by its rendered name', async () => {
  const state = { ...createState(), width: 90 }
  const result = await handleClickByName(state, 0, '...')
  expect(result.isMenuOpen).toBe(true)
  expect(result.menus[0].items).toContainEqual(expect.objectContaining({ id: 7, label: 'Help' }))
  expect(await handleClickByName(state, 0, 'Help')).toBe(state)
})

test('ignores empty names, unknown entries, and non-left clicks', async () => {
  const state = createState()
  expect(await handleClickByName(state, 0, '')).toBe(state)
  expect(await handleClickByName(state, 0, 'missing')).toBe(state)
  expect(await handleClickByName(state, 2, 'Help')).toBe(state)
})
