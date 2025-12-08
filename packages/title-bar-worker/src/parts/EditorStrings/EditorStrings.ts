import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const cut = (): string => {
  return I18nString.i18nString(UiStrings.Cut)
}

export const copy = (): string => {
  return I18nString.i18nString(UiStrings.Copy)
}

export const paste = (): string => {
  return I18nString.i18nString(UiStrings.Paste)
}

export const undo = (): string => {
  return I18nString.i18nString(UiStrings.Undo)
}

export const redo = (): string => {
  return I18nString.i18nString(UiStrings.Redo)
}

export const toggleLineComment = (): string => {
  return I18nString.i18nString(UiStrings.ToggleLineComment)
}

export const toggleBlockComment = (): string => {
  return I18nString.i18nString(UiStrings.ToggleBlockComment)
}

export const selectAll = (): string => {
  return I18nString.i18nString(UiStrings.SelectAll)
}

export const expandSelection = (): string => {
  return I18nString.i18nString(UiStrings.ExpandSelection)
}

export const shrinkSelection = (): string => {
  return I18nString.i18nString(UiStrings.ShrinkSelection)
}

export const copyLineUp = (): string => {
  return I18nString.i18nString(UiStrings.CopyLineUp)
}

export const copyLineDown = (): string => {
  return I18nString.i18nString(UiStrings.CopyLineDown)
}

export const moveLineUp = (): string => {
  return I18nString.i18nString(UiStrings.MoveLineUp)
}

export const moveLineDown = (): string => {
  return I18nString.i18nString(UiStrings.MoveLineDown)
}

export const duplicateSelection = (): string => {
  return I18nString.i18nString(UiStrings.DuplicateSelection)
}

export const addCursorAbove = (): string => {
  return I18nString.i18nString(UiStrings.AddCursorAbove)
}

export const addCursorBelow = (): string => {
  return I18nString.i18nString(UiStrings.AddCursorBelow)
}

export const addCursorsToLineEnds = (): string => {
  return I18nString.i18nString(UiStrings.AddCursorsToLineEnds)
}

export const addNextOccurrence = (): string => {
  return I18nString.i18nString(UiStrings.AddNextOccurrence)
}

export const addPreviousOccurrence = (): string => {
  return I18nString.i18nString(UiStrings.AddPreviousOccurrence)
}

export const selectAllOccurrences = (): string => {
  return I18nString.i18nString(UiStrings.SelectAllOccurrences)
}
