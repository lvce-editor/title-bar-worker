import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickToggleMaximize from '../src/parts/HandleClickToggleMaximize/HandleClickToggleMaximize.ts'
import * as NativeHostState from '../src/parts/NativeHostState/NativeHostState.ts'

for (const maximized of [false, true]) {
  test(`maximize button uses the native toggle even when cached state is ${maximized}`, async () => {
    using mockRpc = RendererWorker.registerMockRpc({
      'ElectronWindow.toggleMaximize'() {},
    })
    NativeHostState.setMaximized(maximized)
    const state = createDefaultState()
    expect(await HandleClickToggleMaximize.handleClickToggleMaximize(state)).toBe(state)
    expect(mockRpc.invocations).toEqual([['ElectronWindow.toggleMaximize']])
    NativeHostState.setMaximized(false)
  })
}
