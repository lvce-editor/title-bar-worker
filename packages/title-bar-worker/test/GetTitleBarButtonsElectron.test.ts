import { expect, test } from '@jest/globals'
import * as GetTitleBarButtonsElectron from '../src/parts/GetTitleBarButtonsElectron/GetTitleBarButtonsElectron.ts'

test('getTitleBarButtonsElectron - controlsOverlayEnabled true', () => {
  expect(GetTitleBarButtonsElectron.getTitleBarButtonsElectron(true, false)).toEqual([])
})

test('getTitleBarButtonsElectron - controlsOverlayEnabled true, titleBarStyleCustom true', () => {
  expect(GetTitleBarButtonsElectron.getTitleBarButtonsElectron(true, true)).toEqual([])
})

test('getTitleBarButtonsElectron - controlsOverlayEnabled false, titleBarStyleCustom false', () => {
  expect(GetTitleBarButtonsElectron.getTitleBarButtonsElectron(false, false)).toEqual([])
})

test('getTitleBarButtonsElectron - controlsOverlayEnabled false, titleBarStyleCustom true', () => {
  const result = GetTitleBarButtonsElectron.getTitleBarButtonsElectron(false, true)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    label: 'Minimize',
    icon: 'Minimize',
    id: 'Minimize',
    onClick: 'handleClickMinimize',
  })
  expect(result[1]).toEqual({
    label: 'Maximize',
    icon: 'Maximize',
    id: 'ToggleMaximize',
    onClick: 'handleClickToggleMaximize',
  })
  expect(result[2]).toEqual({
    label: 'Close',
    icon: 'ChromeClose',
    id: 'Close',
    onClick: 'handleClickClose',
  })
})
