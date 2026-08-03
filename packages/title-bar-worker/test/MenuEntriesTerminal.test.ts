import { expect, test } from '@jest/globals'
import { getMenuEntries } from '../src/parts/MenuEntriesTerminal/MenuEntriesTerminal.ts'

test('opens a new integrated terminal', () => {
  expect(getMenuEntries()).toEqual([
    {
      args: [''],
      command: 'Layout.openIntegratedTerminal',
      flags: 0,
      id: 'newTerminal',
      label: 'New Terminal',
    },
  ])
})
