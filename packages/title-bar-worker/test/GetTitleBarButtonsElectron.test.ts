import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
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
    icon: 'Minimize',
    id: 'Minimize',
    label: 'Minimize',
    onClick: DomEventListenerFunctions.HandleClickMinimize,
  })
  expect(result[1]).toEqual({
    icon: 'Maximize',
    id: 'ToggleMaximize',
    label: 'Maximize',
    onClick: DomEventListenerFunctions.HandleClickToggleMaximize,
  })
  expect(result[2]).toEqual({
    icon: 'ChromeClose',
    id: 'Close',
    label: 'Close',
    onClick: DomEventListenerFunctions.HandleClickClose,
  })
})
