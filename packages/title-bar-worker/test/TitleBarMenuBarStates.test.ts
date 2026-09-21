import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as TitleBarMenuBarStates from '../src/parts/TitleBarMenuBarStates/TitleBarMenuBarStates.ts'

test('focus notification and menu navigation retain both state changes', async () => {
  const uid = 981
  const state = { ...createDefaultState(), uid }
  TitleBarMenuBarStates.set(uid, state, state)
  const started = Promise.withResolvers<void>()
  const resume = Promise.withResolvers<void>()
  const focus = TitleBarMenuBarStates.wrapCommand(async (current) => {
    started.resolve()
    await resume.promise
    return { ...current, focused: true }
  })
  const navigate = TitleBarMenuBarStates.wrapCommand(async (current) => ({ ...current, focusedIndex: 1 }))
  const pendingFocus = focus(uid)
  await started.promise
  const pendingNavigation = navigate(uid)
  resume.resolve()
  await Promise.all([pendingFocus, pendingNavigation])
  expect(TitleBarMenuBarStates.get(uid).newState).toMatchObject({ focused: true, focusedIndex: 1 })
})

test('workspace notification can complete inside a queued menu action', async () => {
  const uid = 982
  const state = { ...createDefaultState(), uid }
  TitleBarMenuBarStates.set(uid, state, state)
  const notify = TitleBarMenuBarStates.wrapNotification(async (current) => ({ ...current, title: 'workspace' }))
  const action = TitleBarMenuBarStates.wrapCommand(async () => {
    await notify(uid)
    return TitleBarMenuBarStates.get(uid).newState
  })
  await action(uid)
  expect(TitleBarMenuBarStates.get(uid).newState.title).toBe('workspace')
})
