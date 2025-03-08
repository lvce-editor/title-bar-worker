import { expect, test } from '@jest/globals'
import * as Px from '../src/parts/Px/Px.ts'

test('px - positive number', () => {
  expect(Px.px(10)).toBe('10px')
})

test('px - zero', () => {
  expect(Px.px(0)).toBe('0px')
})

test('px - negative number', () => {
  expect(Px.px(-5)).toBe('-5px')
})

test('px - decimal number', () => {
  expect(Px.px(1.5)).toBe('1.5px')
})
