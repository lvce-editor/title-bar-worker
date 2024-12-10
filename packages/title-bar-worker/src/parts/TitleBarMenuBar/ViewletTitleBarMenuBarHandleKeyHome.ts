import { handleKeyHomeMenuClosed } from './ViewletTitleBarMenuBarHandleKeyHomeMenuClosed.ts'
import { handleKeyHomeMenuOpen } from './ViewletTitleBarMenuBarHandleKeyHomeMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleKeyHome = ifElse(handleKeyHomeMenuOpen, handleKeyHomeMenuClosed)
