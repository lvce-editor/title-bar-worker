import * as DiffEntries from '../DiffEntries/DiffEntries.ts'
import * as DiffFocusedIndex from '../DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffMenus from '../DiffMenus/DiffMenus.ts'

export const modules = [DiffEntries.isEqual, DiffFocusedIndex.isEqual, DiffMenus.isEqual]

export const numbers = [DiffEntries.diffType, DiffFocusedIndex.diffType, DiffMenus.diffType]
