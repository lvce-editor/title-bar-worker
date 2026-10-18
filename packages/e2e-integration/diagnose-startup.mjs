// Temporary instrumentation for the disposable, pinned integration checkout only.
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const target = resolve(process.argv[2], 'packages/extension-host-worker-tests/src/_all.js')
let source = await readFile(target, 'utf8')
const replaceOnce = (before, after) => {
  if (source.split(before).length !== 2) throw new Error(`Expected one runner fragment: ${before}`)
  source = source.replace(before, after)
}
replaceOnce('  await page.goto(url)', '  await page.goto(`${url}?traceRendererWorker=1`)')
replaceOnce(
  '    const page = await context.newPage()',
  `
    await context.addInitScript(() => {
      const entries = []
      globalThis.___receivedMessages = entries
      const record = (type, payload) => {
        if (entries.length >= 20000) return
        try { entries.push({ sequence: entries.length, timestamp: performance.now(), type, payload: JSON.parse(JSON.stringify(payload)) }) } catch {}
      }
      const describe = (node) => node instanceof Element ? { tag: node.tagName, id: node.id, className: node.className, text: node.textContent?.slice(0, 100) } : null
      for (const type of ['keydown', 'keyup', 'click', 'focusin', 'focusout']) {
        document.addEventListener(type, (event) => record(type, { key: event.key, target: describe(event.target), active: describe(document.activeElement) }), true)
      }
      // Observe the existing receiver callbacks without starting ports or changing dispatch.
      for (const prototype of [Worker.prototype, MessagePort.prototype]) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, 'onmessage')
        if (descriptor?.set) Object.defineProperty(prototype, 'onmessage', {
          ...descriptor,
          set(listener) {
            descriptor.set.call(this, typeof listener === 'function' ? function(event) {
              record('received', event.data)
              return listener.call(this, event)
            } : listener)
          },
        })
      }
      new MutationObserver((mutations) => {
        const relevant = mutations.filter((mutation) => mutation.target instanceof Element && (mutation.target.closest('.TitleBar, .Menu, [role="dialog"]') || [...mutation.addedNodes, ...mutation.removedNodes].some((node) => node instanceof Element && node.matches('.Menu, [role="dialog"]'))))
        for (const mutation of relevant) record('dom', { attribute: mutation.attributeName, target: describe(mutation.target), active: describe(document.activeElement) })
      }).observe(document, { subtree: true, childList: true, attributes: true })
    })
    const page = await context.newPage()
    const errors = []
    page.on('console', (event) => errors.push({ timestamp: Date.now(), console: event.text() }))
    page.on('pageerror', (error) => errors.push(String(error)))
    page.on('requestfailed', (request) => errors.push({ url: request.url(), failure: request.failure() }))
    await context.tracing.start({ screenshots: true, snapshots: true, sources: true })
    context.__diagnosticPage = page
    context.__diagnosticErrors = errors
`,
)
replaceOnce(
  '      await context?.close()',
  `
      if (context?.__diagnosticPage) {
        const artifactDir = join(__dirname, '..', '.e2e-artifacts')
        await mkdir(artifactDir, { recursive: true })
        const page = context.__diagnosticPage
        const capture = await page.evaluate(() => ({ entries: globalThis.___receivedMessages || [], legacy: document.querySelector('script.RendererWorkerTrace')?.textContent, html: document.body.outerHTML })).catch((error) => ({ captureError: String(error) }))
        await writeFile(join(artifactDir, 'allmessages-help-about-' + process.env.DIAGNOSTIC_ATTEMPT + '.json'), JSON.stringify({ ...capture, errors: context.__diagnosticErrors }, null, 2))
        await page.screenshot({ path: join(artifactDir, 'final.png') }).catch(() => {})
        await context.tracing.stop({ path: join(artifactDir, 'playwright.zip') })
      }
      await context?.close()
`,
)
await writeFile(target, source)
console.info(`Instrumented disposable runner: ${target}`)

const testPath = resolve(process.argv[2], 'packages/extension-host-worker-tests/src/viewlet.title-bar-menu-help-about-closes-menu.js')
const testSource = await readFile(testPath, 'utf8')
const instrumented = testSource
  .split('\n')
  .flatMap((line, index) => {
    if (!line.trim().startsWith('await ')) return [line]
    return [`  console.info('diagnostic step ${index + 1} before')`, line, `  console.info('diagnostic step ${index + 1} after')`]
  })
  .join('\n')
await writeFile(testPath, instrumented)

const patchApplication = async (relativePath, before, after) => {
  const path = resolve(process.argv[2], relativePath)
  const source = await readFile(path, 'utf8')
  if (source.split(before).length !== 2) throw new Error(`Expected one application fragment in ${path}: ${before}`)
  await writeFile(path, source.replace(before, after))
}
await patchApplication(
  'packages/renderer-worker/src/parts/About/About.js',
  "  await AboutViewWorker.invoke('About.showAbout', Platform.getPlatform())",
  "  console.info('about parent start')\n  await AboutViewWorker.invoke('About.showAbout', Platform.getPlatform())\n  console.info('about parent end')",
)
await patchApplication(
  'packages/renderer-worker/src/parts/Viewlet/Viewlet.js',
  "  await RendererProcess.invoke('Viewlet.executeCommands', commands)",
  "  console.info('widget render start', moduleId, childUid)\n  await RendererProcess.invoke('Viewlet.executeCommands', commands)\n  console.info('widget render end', moduleId, childUid)",
)
await patchApplication(
  'node_modules/@lvce-editor/about-view/dist/aboutWorkerMain.js',
  '  await openWidget(About$1);',
  "  console.info('about worker start');\n  await openWidget(About$1);\n  console.info('about worker end');",
)
