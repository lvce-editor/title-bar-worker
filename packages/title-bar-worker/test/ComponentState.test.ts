import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getComponentDom } from '../src/parts/GetComponentDom/GetComponentDom.ts'
import { getComponentState } from '../src/parts/GetComponentState/GetComponentState.ts'
import { setComponentState } from '../src/parts/SetComponentState/SetComponentState.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('gets and sets the live component state', async () => {
  const uid = 101
  const oldState = { ...createDefaultState(uid), title: 'Before' }
  const newState = { ...oldState, title: 'After' }
  TitleBarMenuBarStates.set(uid, oldState, oldState)

  expect(getComponentState(uid)).toBe(oldState)
  await setComponentState(uid, newState)

  expect(TitleBarMenuBarStates.get(uid)).toEqual({ newState, oldState, scheduledState: newState })
})

test('rejects an invalid live component state', async () => {
  const uid = 102
  const state = createDefaultState(uid)
  TitleBarMenuBarStates.set(uid, state, state)

  await expect(setComponentState(uid, { ...state, uid: 103 })).rejects.toThrow('Title Bar state uid must remain 102')
  await expect(setComponentState(uid, [] as unknown)).rejects.toThrow('Title Bar state must be an object')
})

test('inspects the current virtual DOM without advancing rendered state', () => {
  const uid = 104
  const oldState = { ...createDefaultState(uid), uid }
  const newState = { ...oldState, initial: false }
  TitleBarMenuBarStates.set(uid, oldState, newState)
  const before = TitleBarMenuBarStates.get(uid)
  const dom = getComponentDom(uid)

  expect(Array.isArray(dom)).toBe(true)
  expect(dom.length).toBeGreaterThan(0)
  expect(dom[0]).toEqual(expect.objectContaining({ childCount: expect.any(Number), type: expect.any(Number) }))
  expect(TitleBarMenuBarStates.get(uid)).toEqual(before)
  expect(TitleBarMenuBarStates.get(uid).oldState).toBe(oldState)
  expect(TitleBarMenuBarStates.get(uid).newState).toBe(newState)
})
