import * as KeyCode from '../KeyCode/KeyCode.ts'

export const getKeyLabel = (keyCode: number, fallback: string): string => {
  switch (keyCode) {
    case KeyCode.Backquote:
      return '`'
    case KeyCode.Backslash:
      return '\\'
    case KeyCode.F11:
      return 'F11'
    case KeyCode.Minus:
      return '-'
    case KeyCode.Numpad0:
      return 'NumPad0'
    case KeyCode.Slash:
      return '/'
    default:
      return fallback
  }
}
