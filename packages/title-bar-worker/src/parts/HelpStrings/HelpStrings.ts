import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const toggleDeveloperTools = (): string => {
  return I18nString.i18nString(UiStrings.ToggleDeveloperTools)
}

export const openProcessExplorer = (): string => {
  return I18nString.i18nString(UiStrings.OpenProcessExplorer)
}

export const checkForUpdates = (): string => {
  return I18nString.i18nString(UiStrings.CheckForUpdates)
}

export const about = (): string => {
  return I18nString.i18nString(UiStrings.About)
}
