import { expect, test } from '@jest/globals'
import * as GetTitle from '../src/parts/GetTitle/GetTitle.ts'

const APP_NAME = 'Lvce Editor'

test('getTitle - empty string', () => {
  const result: string = GetTitle.getTitle('', '${folderName}', APP_NAME)
  expect(result).toBe('Lvce Editor')
})

test('getTitle - no slashes', () => {
  const result: string = GetTitle.getTitle('workspace', '${folderName}', APP_NAME)
  expect(result).toBe('workspace')
})

test('getTitle - single slash at end', () => {
  const result: string = GetTitle.getTitle('/', '${folderName}', APP_NAME)
  expect(result).toBe('Lvce Editor')
})

test('getTitle - path with single slash', () => {
  const result: string = GetTitle.getTitle('/workspace', '${folderName}', APP_NAME)
  expect(result).toBe('workspace')
})

test('getTitle - path with multiple slashes', () => {
  const result: string = GetTitle.getTitle('/home/user/project', '${folderName}', APP_NAME)
  expect(result).toBe('project')
})

test('getTitle - path with trailing slash', () => {
  const result: string = GetTitle.getTitle('/home/user/project/', '${folderName}', APP_NAME)
  expect(result).toBe('project')
})

test('getTitle - file protocol uri with trailing slash', () => {
  const result: string = GetTitle.getTitle('file:///path/to/problems-view/', '${folderName}', APP_NAME)
  expect(result).toBe('problems-view')
})

test('getTitle - file protocol uri with multiple trailing slashes', () => {
  const result: string = GetTitle.getTitle('file:///path/to/problems-view///', '${folderName}', APP_NAME)
  expect(result).toBe('problems-view')
})

test('getTitle - file protocol uri', () => {
  const result: string = GetTitle.getTitle('file:///path/to/workspace', '${folderName}', APP_NAME)
  expect(result).toBe('workspace')
})

test('getTitle - decodes file protocol uri folder name', () => {
  const result: string = GetTitle.getTitle('file:///path/to/workspace%20%E2%80%93%20%C3%BC', '${folderName}', APP_NAME)
  expect(result).toBe('workspace – ü')
})

test('getTitle - windows path', () => {
  const result: string = GetTitle.getTitle('C:\\Users\\user\\project', '${folderName}', APP_NAME)
  expect(result).toBe('project')
})

test('getTitle - with titleTemplate containing appName', () => {
  const result: string = GetTitle.getTitle('/home/user/project', '${appName} - ${folderName}', APP_NAME)
  expect(result).toBe('Lvce Editor - project')
})

test('getTitle - with empty titleTemplate', () => {
  const result: string = GetTitle.getTitle('/home/user/project', '', APP_NAME)
  expect(result).toBe('project')
})

test('getTitle - with titleTemplate without variables', () => {
  const result: string = GetTitle.getTitle('/home/user/project', 'My Custom Title', APP_NAME)
  expect(result).toBe('My Custom Title')
})

test('getTitle - remote ssh workspace', () => {
  const result: string = GetTitle.getTitle('remote-ssh://example.com/home/user/project', '${folderName}', APP_NAME)
  expect(result).toBe('project [SSH: example.com]')
})

test('getTitle - remote ssh workspace with user and port', () => {
  const result: string = GetTitle.getTitle('remote-ssh://user@example.com:2222/home/user/project', '${folderName}', APP_NAME)
  expect(result).toBe('project [SSH: example.com]')
})

test('getTitle - remote ssh root workspace', () => {
  const result: string = GetTitle.getTitle('remote-ssh://example.com/', '${folderName}', APP_NAME)
  expect(result).toBe('[SSH: example.com]')
})

test('getTitle - remote ssh workspace with custom title', () => {
  const result: string = GetTitle.getTitle('remote-ssh://example.com/home/user/project', 'My Custom Title', APP_NAME)
  expect(result).toBe('My Custom Title [SSH: example.com]')
})

test('getTitle - malformed remote ssh workspace without host', () => {
  const result: string = GetTitle.getTitle('remote-ssh:///home/user/project', '${folderName}', APP_NAME)
  expect(result).toBe('project')
})

test('getTitle - devcontainer workspace', () => {
  const result: string = GetTitle.getTitle('/workspaces/about-view!', '${folderName}', APP_NAME)
  expect(result).toBe('about-view [devcontainer]')
})

test('getTitle - decodes devcontainer folder name', () => {
  const result: string = GetTitle.getTitle('devcontainers:///workspaces/about%20view!', '${folderName}', APP_NAME)
  expect(result).toBe('about view [devcontainer]')
})

test('getTitle - keeps a literal encoded exclamation mark in a devcontainer folder name', () => {
  const result: string = GetTitle.getTitle('devcontainers:///workspaces/about-view%21!', '${folderName}', APP_NAME)
  expect(result).toBe('about-view! [devcontainer]')
})

test('getTitle - adds devcontainer suffix for URI workspace', () => {
  const result: string = GetTitle.getTitle('devcontainers:///workspaces/about-view!', '${folderName}', APP_NAME)
  expect(result).toBe('about-view [devcontainer]')
})

test('getTitle - handles devcontainer URI without a marker', () => {
  const result: string = GetTitle.getTitle('devcontainers:///workspaces/about-view', '${folderName}', APP_NAME)
  expect(result).toBe('about-view [devcontainer]')
})

test('getTitle - displays devcontainer suffix for workspace without a folder name', () => {
  const result: string = GetTitle.getTitle('/!', '${folderName}', APP_NAME)
  expect(result).toBe('[devcontainer]')
})

test('getTitle - applies devcontainer suffix after custom title template', () => {
  const result: string = GetTitle.getTitle('devcontainers:///workspaces/about-view!', '${appName} - ${folderName}', APP_NAME)
  expect(result).toBe('Lvce Editor - about-view [devcontainer]')
})

test('getTitle - keeps malformed encoded devcontainer folder name visible', () => {
  const result: string = GetTitle.getTitle('devcontainers:///workspaces/project%XX!', '${folderName}', APP_NAME)
  expect(result).toBe('project%XX [devcontainer]')
})
