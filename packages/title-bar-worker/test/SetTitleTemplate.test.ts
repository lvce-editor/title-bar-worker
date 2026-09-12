/* eslint-disable jest/no-restricted-jest-methods */
import { expect, jest, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

const mockMeasureTextWidths = jest.fn(
  async (texts: readonly string[], _fontWeight: number, _fontSize: number, _fontFamily: string, _letterSpacing: number) =>
    texts.map((text) => text.length * 10),
)

await jest.unstable_mockModule('../src/parts/MeasureTextWidths/MeasureTextWidths.ts', () => ({
  measureTextWidths: mockMeasureTextWidths,
}))

const { setTitleTemplate } = await import('../src/parts/SetTitleTemplate/SetTitleTemplate.ts')

test('setTitleTemplate - sets the title template', async () => {
  const state = {
    ...createDefaultState(),
    workspaceUri: '/home/user/project',
  }
  const newState = await setTitleTemplate(state, '${appName} - ${folderName}')
  expect(newState.titleTemplate).toBe('${appName} - ${folderName}')
  expect(newState.title).toBe('Lvce Editor - project')
  expect(newState.titleWidth).toBe(210)
})

test('setTitleTemplate - sets empty title template', async () => {
  const state = {
    ...createDefaultState(),
    workspaceUri: '/home/user/project',
  }
  const newState = await setTitleTemplate(state, '')
  expect(newState.titleTemplate).toBe('')
  expect(newState.title).toBe('project')
})

test('setTitleTemplate - sets custom title template', async () => {
  const state = {
    ...createDefaultState(),
    workspaceUri: '/home/user/project',
  }
  const newState = await setTitleTemplate(state, 'My Custom Title')
  expect(newState.titleTemplate).toBe('My Custom Title')
  expect(newState.title).toBe('My Custom Title')
})

test('setTitleTemplate - does not modify other state properties', async () => {
  const state = {
    ...createDefaultState(),
    workspaceUri: '/home/user/project',
  }
  const newState = await setTitleTemplate(state, '${folderName}')
  expect(newState.assetDir).toBe(state.assetDir)
  expect(newState.buttons).toBe(state.buttons)
  expect(newState.commandCenterEnabled).toBe(state.commandCenterEnabled)
  expect(newState.controlsOverlayEnabled).toBe(state.controlsOverlayEnabled)
  expect(newState.focused).toBe(state.focused)
  expect(newState.focusedIndex).toBe(state.focusedIndex)
  expect(newState.height).toBe(state.height)
  expect(newState.iconWidth).toBe(state.iconWidth)
  expect(newState.isMenuOpen).toBe(state.isMenuOpen)
  expect(newState.labelFontFamily).toBe(state.labelFontFamily)
  expect(newState.labelFontSize).toBe(state.labelFontSize)
  expect(newState.labelFontWeight).toBe(state.labelFontWeight)
  expect(newState.labelLetterSpacing).toBe(state.labelLetterSpacing)
  expect(newState.labelPadding).toBe(state.labelPadding)
  expect(newState.layoutControlsEnabled).toBe(state.layoutControlsEnabled)
  expect(newState.menus).toBe(state.menus)
  expect(newState.platform).toBe(state.platform)
  expect(newState.titleBarButtons).toBe(state.titleBarButtons)
  expect(newState.titleBarButtonsEnabled).toBe(state.titleBarButtonsEnabled)
  expect(newState.titleBarButtonsWidth).toBe(state.titleBarButtonsWidth)
  expect(newState.titleBarEntries).toBe(state.titleBarEntries)
  expect(newState.titleBarHeight).toBe(state.titleBarHeight)
  expect(newState.titleBarIconEnabled).toBe(state.titleBarIconEnabled)
  expect(newState.titleBarIconWidth).toBe(state.titleBarIconWidth)
  expect(newState.titleBarMenuBarEnabled).toBe(state.titleBarMenuBarEnabled)
  expect(newState.titleBarStyleCustom).toBe(state.titleBarStyleCustom)
  expect(newState.titleBarTitleEnabled).toBe(state.titleBarTitleEnabled)
  expect(newState.uid).toBe(state.uid)
  expect(newState.workspaceUri).toBe(state.workspaceUri)
  expect(newState.x).toBe(state.x)
  expect(newState.y).toBe(state.y)
})

test('setTitleTemplate - restores menu entries when the title becomes shorter without a resize', async () => {
  const { setWidth } = await import('../src/parts/SetWidth/SetWidth.ts')
  const { getVisibleTitleBarEntries } = await import('../src/parts/GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts')
  const entries = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map((label) => ({ label, width: 45 }))
  const longTitleState = await setTitleTemplate({ ...createDefaultState(), workspaceUri: '/project' }, 'A'.repeat(30))
  const narrowState = setWidth(longTitleState, 900)
  expect(getVisibleTitleBarEntries(entries, narrowState.width, -1, false).at(-1)?.label).toBe('...')
  const shortTitleState = await setTitleTemplate(narrowState, 'A')
  expect(getVisibleTitleBarEntries(entries, shortTitleState.width, -1, false).map((entry) => entry.label)).toEqual(
    entries.map((entry) => entry.label),
  )
  const restoredState = await setTitleTemplate(shortTitleState, 'A'.repeat(30))
  expect(restoredState.width).toBe(narrowState.width)
})
