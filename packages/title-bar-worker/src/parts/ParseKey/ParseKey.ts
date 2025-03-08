import type { ParsedKey } from '../ParsedKey/ParsedKey.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetKeyCodeString from '../GetKeyCodeString/GetKeyCodeString.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'

export const parseKey = (rawKey: number): ParsedKey => {
  Assert.number(rawKey)
  const isCtrl = Boolean(rawKey & KeyModifier.CtrlCmd)
  const isShift = Boolean(rawKey & KeyModifier.Shift)
  const keyCode = rawKey & 0x00_00_00_ff
  const key = GetKeyCodeString.getKeyCodeString(keyCode)
  return {
    key,
    isCtrl,
    isShift,
  }
}
