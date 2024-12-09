import { handleKeyArrowDownMenuClosed } from './ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.ts'
import { handleKeyArrowDownMenuOpen } from './ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.js'

export const handleKeyArrowDown = ifElse(handleKeyArrowDownMenuOpen, handleKeyArrowDownMenuClosed)
