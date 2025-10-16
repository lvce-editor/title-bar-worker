import * as DiffFocusedIndex from '../DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffMenus from '../DiffMenus/DiffMenus.ts'
import * as DiffTitleBar from '../DiffTitleBar/DiffTitleBar.ts'

export const modules = [DiffTitleBar.isEqual, DiffFocusedIndex.isEqual, DiffMenus.isEqual]

export const numbers = [DiffTitleBar.diffType, DiffFocusedIndex.diffType, DiffMenus.diffType]
