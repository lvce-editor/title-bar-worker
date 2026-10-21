import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Both browser and Electron tests must load the worker built by this checkout.
process.argv.push('--link', fileURLToPath(new URL('../../../.tmp/dist', import.meta.url)))
process.argv.push('--link', fileURLToPath(new URL('../../../.tmp/chat-view-2', import.meta.url)))
const require = createRequire(import.meta.url)
const testWorkerMainPath = require.resolve('@lvce-editor/test-worker/dist/testWorkerMain.js')
process.argv.push('--link', dirname(dirname(testWorkerMainPath)))
await import('@lvce-editor/application-test-server/bin/server.js')
