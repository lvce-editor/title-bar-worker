import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleElectronMenuClick from '../src/parts/HandleElectronMenuClick/HandleElectronMenuClick.ts'

test('should invoke command with label', async () => {
  const state = {
    ...createDefaultState(),
    commandMap: {
      File: {
        args: [],
        command: 'file.open',
      },
    },
  }

  using _mockRpc = RendererWorker.registerMockRpc({
    'file.open'() {},
  })

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'File')

  expect(result).toBe(state)
})

test('should invoke command with args', async () => {
  const state = {
    assetDir: '/assets',
    buttons: [],
    commandCenterEnabled: false,
    commandMap: {
      'Open File': {
        args: ['/path/to/file', true],
        command: 'file.openFile',
      },
    },
    controlsOverlayEnabled: false,
    focused: false,
    focusedIndex: -1,
    height: 30,
    iconWidth: 16,
    isMenuOpen: false,
    labelFontFamily: 'Arial',
    labelFontSize: 12,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 8,
  }

  using _mockRpc = RendererWorker.registerMockRpc({
    'file.openFile'() {},
  })

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'Open File')

  expect(result).toBe(state)
})

test('should throw error when label not found in commandMap', async () => {
  const state = {
    assetDir: '/assets',
    buttons: [],
    commandCenterEnabled: false,
    commandMap: {
      File: {
        args: [],
        command: 'file.open',
      },
    },
    controlsOverlayEnabled: false,
    focused: false,
    focusedIndex: -1,
    height: 30,
    iconWidth: 16,
    isMenuOpen: false,
    labelFontFamily: 'Arial',
    labelFontSize: 12,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 8,
  }

  await expect(HandleElectronMenuClick.handleElectronMenuClick(state, 'NonExistent')).rejects.toThrow('no command found for NonExistent')
})

test('should handle multiple arguments', async () => {
  const state = {
    assetDir: '/assets',
    buttons: [],
    commandCenterEnabled: false,
    commandMap: {
      'Run Command': {
        args: ['arg1', 'arg2', 'arg3'],
        command: 'extension.runCommand',
      },
    },
    controlsOverlayEnabled: false,
    focused: false,
    focusedIndex: -1,
    height: 30,
    iconWidth: 16,
    isMenuOpen: false,
    labelFontFamily: 'Arial',
    labelFontSize: 12,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 8,
  }

  using _mockRpc = RendererWorker.registerMockRpc({
    'extension.runCommand'() {},
  })

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'Run Command')

  expect(result).toBe(state)
})

test('should handle command without args property', async () => {
  const state = {
    assetDir: '/assets',
    buttons: [],
    commandCenterEnabled: false,
    commandMap: {
      Edit: {
        command: 'edit.undo',
      },
    },
    controlsOverlayEnabled: false,
    focused: false,
    focusedIndex: -1,
    height: 30,
    iconWidth: 16,
    isMenuOpen: false,
    labelFontFamily: 'Arial',
    labelFontSize: 12,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 8,
  }

  using _mockRpc = RendererWorker.registerMockRpc({
    'edit.undo'() {},
  })

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'Edit')

  expect(result).toBe(state)
})

test('should return the same state object', async () => {
  const state = {
    assetDir: '/assets',
    buttons: [],
    commandCenterEnabled: false,
    commandMap: {
      View: {
        args: [],
        command: 'view.toggle',
      },
    },
    controlsOverlayEnabled: false,
    focused: false,
    focusedIndex: -1,
    height: 30,
    iconWidth: 16,
    isMenuOpen: false,
    labelFontFamily: 'Arial',
    labelFontSize: 12,
    labelFontWeight: 400,
    labelLetterSpacing: 0,
    labelPadding: 8,
  }

  using _mockRpc = RendererWorker.registerMockRpc({
    'view.toggle'() {},
  })

  const result = await HandleElectronMenuClick.handleElectronMenuClick(state, 'View')

  expect(result).toBe(state)
  expect(result).not.toBeNull()
})
