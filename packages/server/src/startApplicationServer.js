import { fileURLToPath } from 'node:url'

// Application blur integration needs a runtime that forwards blur to the title bar.
process.argv.push('--link', fileURLToPath(new URL('../../../.tmp/dist', import.meta.url)))
await import('@lvce-editor/application-test-server/bin/server.js')
