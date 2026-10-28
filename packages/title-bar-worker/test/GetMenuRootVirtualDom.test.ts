import { expect, test } from '@jest/globals'
import { getMenuRootVirtualDom } from '../src/parts/GetMenuRootVirtualDom/GetMenuRootVirtualDom.ts'

test('recent paths retain their full tooltip and ellipsis style in a constrained submenu', () => {
  const label = '/home/user/' + 'long-workspace/'.repeat(50)
  const dom = getMenuRootVirtualDom([
    { focusedIndex: -1, items: [{ command: 'Workspace.setUri', flags: 0, label }], level: 1, width: 320, x: 0, y: 30 },
  ])
  expect(dom[1].style).toContain('width:320px')
  expect(dom[2]).toMatchObject({ style: 'display:block;line-height:26px;overflow:hidden;text-overflow:ellipsis', title: label })
  expect(dom[3]).toMatchObject({ text: label })
})
