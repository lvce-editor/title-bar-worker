import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Application blur integration needs a runtime that forwards blur to the title bar.
process.argv.push('--link', fileURLToPath(new URL('../../../.tmp/dist', import.meta.url)))
const require = createRequire(import.meta.url)
process.argv.push('--link', dirname(require.resolve('@lvce-editor/test-worker/package.json')))
await import('@lvce-editor/application-test-server/bin/server.js')
