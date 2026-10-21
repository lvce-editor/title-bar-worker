import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Both browser and Electron tests must load the worker built by this checkout.
process.argv.push('--link', fileURLToPath(new URL('../../../.tmp/dist', import.meta.url)))
process.argv.push('--link', fileURLToPath(new URL('../../../.tmp/chat-view-2', import.meta.url)))
const require = createRequire(import.meta.url)
process.argv.push('--link', dirname(require.resolve('@lvce-editor/test-worker/package.json')))
await import('@lvce-editor/application-test-server/bin/server.js')
