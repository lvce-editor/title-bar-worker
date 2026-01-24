import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setTitleTemplate } from '../src/parts/SetTitleTemplate/SetTitleTemplate.ts'

test('setTitleTemplate - sets the title template', () => {
  const state = createDefaultState()
  const newState = setTitleTemplate(state, '${appName} - ${folderName}')
  expect(newState.titleTemplate).toBe('${appName} - ${folderName}')
})

test('setTitleTemplate - sets empty title template', () => {
  const state = createDefaultState()
  const newState = setTitleTemplate(state, '')
  expect(newState.titleTemplate).toBe('')
})

test('setTitleTemplate - sets custom title template', () => {
  const state = createDefaultState()
  const newState = setTitleTemplate(state, 'My Custom Title')
  expect(newState.titleTemplate).toBe('My Custom Title')
})

test('setTitleTemplate - does not modify other state properties', () => {
  const state = createDefaultState()
  const newState = setTitleTemplate(state, '${folderName}')
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
  expect(newState.title).toBe(state.title)
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
  expect(newState.width).toBe(state.width)
  expect(newState.workspaceUri).toBe(state.workspaceUri)
  expect(newState.x).toBe(state.x)
  expect(newState.y).toBe(state.y)
})
