import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'

export const { get, set, getCommandIds, registerCommands } = ViewletRegistry.create<TitleBarMenuBarState>()
