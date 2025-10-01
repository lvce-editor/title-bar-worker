import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletRegistry from '@lvce-editor/viewlet-registry'

export const { get, set, getCommandIds, registerCommands } = ViewletRegistry.create<TitleBarMenuBarState>()
