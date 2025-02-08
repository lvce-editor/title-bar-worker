import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { TitleBarMenuBarState } from '../TitleBarMenuBarState/TitleBarMenuBarState.ts'
import * as ViewletRegistry from '../ViewletRegistry/ViewletRegistry.ts'

export const { get, set } = ViewletRegistry.create<TitleBarMenuBarState>()
