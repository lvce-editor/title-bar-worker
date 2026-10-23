import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { chromium, expect } from '@playwright/test'

const application = resolve(process.argv[2] || resolve(import.meta.dirname, '../../..'))
const staticRoot = resolve(application, 'packages/build/.tmp/export-test/dist')
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
}
const app = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url || '/', 'http://localhost').pathname
    const relativePath = pathname === '/' ? '/index.html' : pathname.startsWith('/test/') ? pathname.slice(5) : pathname
    let filePath = resolve(staticRoot, `.${decodeURIComponent(relativePath)}`)
    if (filePath !== staticRoot && !filePath.startsWith(staticRoot + sep)) {
      response.writeHead(403).end()
      return
    }
    if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, 'index.html')
    const content = await readFile(filePath)
    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
    })
    response.end(content)
  } catch {
    response.writeHead(404).end()
  }
})

const server = app.listen(0, '127.0.0.1')
await new Promise((resolve, reject) => {
  server.once('listening', resolve)
  server.once('error', reject)
})

const address = server.address()
if (!address || typeof address === 'string') {
  throw new Error('Expected the test server to listen on a TCP port')
}

const browser = await chromium.launch({ headless: true })
try {
  const page = await browser.newPage()
  await page.addInitScript(() => {
    Object.defineProperty(window, 'showDirectoryPicker', {
      configurable: true,
      value: undefined,
    })
  })
  await page.goto(`http://127.0.0.1:${address.port}/index.html`)

  const fileMenuItem = page.locator('.TitleBarTopLevelEntry', { hasText: 'File' })
  await fileMenuItem.click()
  const openFolderItem = page.locator('#Menu-0 .MenuItem', { hasText: 'Open Folder' })
  await openFolderItem.click()
  const dialog = page.locator('.DialogContent')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('.DialogHeading')).toHaveText('Opening Local Folders is Unsupported')
  await expect(dialog.locator('.DialogMessage')).toHaveText("Your browser doesn't support opening local folders.")

  await page.reload()
  const helpMenuItem = page.locator('.TitleBarTopLevelEntry', { hasText: 'Help' })
  await helpMenuItem.click()

  const menu = page.locator('#Menu-0')
  await expect(menu).toBeVisible()

  const viewLicenseItem = page.locator('#Menu-0 .MenuItem', { hasText: 'View License' })
  await viewLicenseItem.hover()
  await expect(viewLicenseItem).toHaveClass(/MenuItemFocused/)

  const aboutItem = page.locator('#Menu-0 .MenuItem', { hasText: 'About' })
  await aboutItem.hover()
  const [aboutBackground, viewLicenseBackground] = await Promise.all([
    aboutItem.evaluate((element) => getComputedStyle(element).backgroundColor),
    viewLicenseItem.evaluate((element) => getComputedStyle(element).backgroundColor),
  ])
  assert.notEqual(aboutBackground, 'rgba(0, 0, 0, 0)')
  assert.equal(viewLicenseBackground, 'rgba(0, 0, 0, 0)')
  await expect(aboutItem).toHaveClass(/MenuItemFocused/)

  await page.locator('.Main').hover()
  await expect(menu).toBeVisible()
  await expect(page.locator('.MenuItemFocused')).toHaveCount(0)

  await aboutItem.hover()
  await expect(aboutItem).toHaveClass(/MenuItemFocused/)
} finally {
  await browser.close()
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
}
