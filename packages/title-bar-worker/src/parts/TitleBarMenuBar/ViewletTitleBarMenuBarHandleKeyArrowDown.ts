import { handleKeyArrowDownMenuClosed } from './ViewletTitleBarMenuBarHandleKeyArrowDownMenuClosed.ts'
import { handleKeyArrowDownMenuOpen } from './ViewletTitleBarMenuBarHandleKeyArrowDownMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleKeyArrowDown = ifElse(handleKeyArrowDownMenuOpen, handleKeyArrowDownMenuClosed)
