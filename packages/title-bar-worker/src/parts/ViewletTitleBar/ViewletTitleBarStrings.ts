import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  File: 'File',
  Edit: 'Edit',
  Selection: 'Selection',
  View: 'View',
  Go: 'Go',
  Run: 'Run',
  Terminal: 'Terminal',
  Help: 'Help',
}

export const file = () :string=> {
  return I18nString.i18nString(UiStrings.File)
}

export const edit = () :string=> {
  return I18nString.i18nString(UiStrings.Edit)
}

export const selection = () :string=> {
  return I18nString.i18nString(UiStrings.Selection)
}

export const view = () :string=> {
  return I18nString.i18nString(UiStrings.View)
}

export const go = () :string=> {
  return I18nString.i18nString(UiStrings.Go)
}

export const run = () :string=> {
  return I18nString.i18nString(UiStrings.Run)
}

export const terminal = () :string=> {
  return I18nString.i18nString(UiStrings.Terminal)
}

export const help = () :string=> {
  return I18nString.i18nString(UiStrings.Help)
}