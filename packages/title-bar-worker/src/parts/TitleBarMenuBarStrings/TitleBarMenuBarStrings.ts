import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  More: 'more',
  MoreDot: 'More ...',
  ClearRecentlyOpened: 'Clear Recently Opened',
}

export const moreDot = (): string => {
  return I18nString.i18nString(UiStrings.MoreDot)
}

export const clearRecentlyOpened = (): string => {
  return I18nString.i18nString(UiStrings.ClearRecentlyOpened)
}
