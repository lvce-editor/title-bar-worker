import { handleKeyArrowLeftMenuClosed } from './ViewletTitleBarMenuBarHandleKeyArrowLeftMenuClosed.ts'
import { handleKeyArrowLeftMenuOpen } from './ViewletTitleBarMenuBarHandleKeyArrowLeftMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleKeyArrowLeft = ifElse(handleKeyArrowLeftMenuOpen, handleKeyArrowLeftMenuClosed)
