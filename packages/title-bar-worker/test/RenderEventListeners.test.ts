import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners - should return an array of event listeners', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('renderEventListeners - should return listeners with name and params', () => {
  const result = RenderEventListeners.renderEventListeners()
  for (const listener of result) {
    expect(listener).toHaveProperty('name')
    expect(listener).toHaveProperty('params')
    expect(typeof listener.name).toBe('number')
    expect(Array.isArray(listener.params)).toBe(true)
  }
})

test('renderEventListeners - should have correct structure for HandleClickMinimize', () => {
  const result = RenderEventListeners.renderEventListeners()
  const minimizeListener = result.find((l) => l.name === DomEventListenerFunctions.HandleClickMinimize)
  expect(minimizeListener).toBeDefined()
  expect(minimizeListener?.params).toEqual(['handleClickMinimize'])
})

test('renderEventListeners - should have correct structure for HandleContextMenu', () => {
  const result = RenderEventListeners.renderEventListeners()
  const contextMenuListener = result.find((l) => l.name === DomEventListenerFunctions.HandleContextMenu)
  expect(contextMenuListener).toBeDefined()
  expect(contextMenuListener?.params.length).toBe(4)
  expect(contextMenuListener?.params[0]).toBe('handleContextMenu')
})

test('renderEventListeners - should return the same result on multiple calls', () => {
  const result1 = RenderEventListeners.renderEventListeners()
  const result2 = RenderEventListeners.renderEventListeners()
  expect(result1).toEqual(result2)
})
