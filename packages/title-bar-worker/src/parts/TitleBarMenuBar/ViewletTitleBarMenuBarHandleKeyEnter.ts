import { handleKeyEnterMenuClosed } from './ViewletTitleBarMenuBarHandleKeyEnterMenuClosed.ts'
import { handleKeyEnterMenuOpen } from './ViewletTitleBarMenuBarHandleKeyEnterMenuOpen.ts'
import { ifElse } from './ViewletTitleBarMenuBarIfElse.ts'

export const handleKeyEnter = ifElse(handleKeyEnterMenuOpen, handleKeyEnterMenuClosed)
