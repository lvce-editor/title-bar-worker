import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners - should return an array', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(Array.isArray(result)).toBe(true)
})

test('renderEventListeners - should return correct number of listeners', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(result.length).toBe(11)
})

test('renderEventListeners - should have HandleClickMinimize listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleClickMinimize)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleClickMinimize'])
})

test('renderEventListeners - should have HandleContextMenu listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleContextMenu)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleContextMenu', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY])
})

test('renderEventListeners - should have HandleClickToggleClose listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleClickToggleClose)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleClickClose'])
})

test('renderEventListeners - should have HandleClickToggleMaximize listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleClickToggleMaximize)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleClickToggleMaximize'])
})

test('renderEventListeners - should have HandleFocusIn listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleFocusIn)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleFocus'])
})

test('renderEventListeners - should have HandleMenuClick listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleMenuClick)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleMenuClick', EventExpression.ClientX, EventExpression.ClientY])
})

test('renderEventListeners - should have HandleMenuMouseOver listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleMenuMouseOver)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleMenuMouseOver', EventExpression.ClientX, EventExpression.ClientY])
})

test('renderEventListeners - should have HandleClick listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleClick)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleClickAt', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY])
})

test('renderEventListeners - should have HandlePointerOut listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandlePointerOut)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handlePointerOut', EventExpression.ClientX, EventExpression.ClientY])
})

test('renderEventListeners - should have HandlePointerOver listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandlePointerOver)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handlePointerOver', EventExpression.TargetName])
})

test('renderEventListeners - should have HandleFocusOut listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  const listener = result.find((l) => l.name === DomEventListenerFunctions.HandleFocusOut)
  expect(listener).toBeDefined()
  expect(listener?.params).toEqual(['handleFocusOut', EventExpression.ClientX, EventExpression.ClientY])
})

test('renderEventListeners - all listeners should have name and params', () => {
  const result = RenderEventListeners.renderEventListeners()
  for (const listener of result) {
    expect(listener.name).toBeDefined()
    expect(Array.isArray(listener.params)).toBe(true)
    expect(listener.params.length).toBeGreaterThan(0)
  }
})
