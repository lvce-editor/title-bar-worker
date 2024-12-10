import { handleKeyArrowRightMenuClosed } from './ViewletTitleBarMenuBarHandleKeyArrowRightMenuClosed.ts'
import { handleKeyArrowRightMenuOpen } from './ViewletTitleBarMenuBarHandleKeyArrowRightMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleKeyArrowRight = ifElse(handleKeyArrowRightMenuOpen, handleKeyArrowRightMenuClosed)
