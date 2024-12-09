import * as I18NString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  SplitTerminal: 'Split Terminal',
  KillTerminal: 'Kill Terminal',
  NewTerminal: 'New Terminal',
}

export const newTerminal = (): string => {
  return I18NString.i18nString(UiStrings.NewTerminal)
}
