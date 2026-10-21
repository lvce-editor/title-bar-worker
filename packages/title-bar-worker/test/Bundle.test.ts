import { expect, test } from '@jest/globals'
// @ts-expect-error The test runs in Node, while this worker project intentionally excludes Node types.
import { readFileSync } from 'node:fs'

const bundleUrl = new URL('../../../.tmp/dist/dist/titleBarWorkerMain.js', import.meta.url)
const bundle = readFileSync(bundleUrl, 'utf8')

test('production bundle tree shakes unused virtual DOM validation', () => {
  expect(bundle).not.toContain('validVirtualDomElementTypes')
  expect(bundle).not.toContain('VirtualDomElements')
})
