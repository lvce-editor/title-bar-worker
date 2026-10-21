import { cp, mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'

const require = createRequire(join(root, 'packages', 'server', 'package.json'))

const sharedProcessUrl = pathToFileURL(require.resolve('@lvce-editor/shared-process')).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/explorer-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  extensionPaths: ['.tmp/chat-view-2'],
  testPath: 'packages/e2e',
})

// The runtime HTML points at the production worker path. Replace the shipped
// worker there so the static suite exercises this checkout too.
const workerPath = join(root, '.tmp/dist/dist/titleBarWorkerMain.js')
const titleBarWorkerPath = join(root, 'dist', commitHash, 'packages', 'title-bar-worker', 'dist', 'titleBarWorkerMain.js')
await mkdir(dirname(titleBarWorkerPath), { recursive: true })
await cp(workerPath, titleBarWorkerPath)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
