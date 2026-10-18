import { cp, mkdir, readdir, readFile, realpath, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const owner = resolve(here, '../..')
if (!process.argv[2]) throw new Error('Pass the path to a disposable LVCE checkout')
const application = resolve(process.argv[2])
const manifest = JSON.parse(await readFile(join(application, 'package.json'), 'utf8'))
if (manifest.name !== 'lvce-editor') throw new Error('Expected an LVCE application checkout')
const config = JSON.parse(await readFile(join(here, 'config.json'), 'utf8'))
const tests = join(application, 'packages/extension-host-worker-tests')
// Keep the application's runner and replace only its test inventory.
for (const name of await readdir(join(tests, 'src'))) {
  if (name !== '_all.js') await rm(join(tests, 'src', name), { recursive: true })
}
await cp(join(here, 'src'), join(tests, 'src'), { recursive: true })
await rm(join(tests, 'fixtures'), { recursive: true, force: true })
await mkdir(join(tests, 'fixtures'), { recursive: true })
try {
  await cp(join(here, 'fixtures'), join(tests, 'fixtures'), { recursive: true })
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
for (const path of config.scripts) {
  await cp(join(here, 'scripts', path.split('/').at(-1)), join(application, path))
}
// Exercise this repository's build in the pinned application runtime.
for (const [from, to] of config.artifacts) {
  const target = await realpath(join(application, to)).catch((error) => {
    if (error.code !== 'ENOENT') throw error
    return join(application, to)
  })
  await cp(join(owner, from), target, { recursive: true })
}

// Temporary startup probes for the uncapped cache-read regression.
const bundlePath = join(application, config.artifacts[0][1], 'dist/titleBarWorkerMain.js')
let bundle = await readFile(bundlePath, 'utf8')
for (const boundary of [
  'cacheKey = await getCacheKey(texts, fontWeight, fontSize, fontFamily, letterSpacing);',
  'const cachedWidths = await getWidths(cacheKey, texts.length);',
  'await sendMessagePortToCacheWorker(port);',
]) {
  if (!bundle.includes(boundary)) throw new Error(`Missing diagnostic boundary: ${boundary}`)
  bundle = bundle.replace(boundary, `console.log('[DEBUG-cache] start: ${boundary}');\n${boundary}\nconsole.log('[DEBUG-cache] done: ${boundary}');`)
}
await writeFile(bundlePath, bundle)
for (const relative of [
  'packages/renderer-worker/src/parts/SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.js',
  'packages/renderer-worker/src/parts/LaunchCacheWorker/LaunchCacheWorker.js',
]) {
  const path = join(application, relative)
  const source = await readFile(path, 'utf8')
  const boundary = relative.includes('LaunchCacheWorker')
    ? 'return ipc'
    : "await CacheWorker.invokeAndTransfer('CacheWorker.handleMessagePort', port)"
  if (!source.includes(boundary)) throw new Error(`Missing diagnostic boundary: ${relative}`)
  await writeFile(path, source.replace(boundary, `console.log('[DEBUG-cache] ${relative}');\n${boundary}`))
}
