import { describe, it, expect } from '@jest/globals'
import { parseTitleTemplate } from '../src/parts/ParseTitleTemplate/ParseTitleTemplate.ts'

describe('ParseTitleTemplate', () => {
  it('should replace ${folderName} with the actual folder name', () => {
    const result = parseTitleTemplate('${folderName}', 'my-project', 'Lvce Editor')
    expect(result).toBe('my-project')
  })

  it('should replace ${appName} with the actual app name', () => {
    const result = parseTitleTemplate('${appName}', 'my-project', 'Lvce Editor')
    expect(result).toBe('Lvce Editor')
  })

  it('should replace both ${folderName} and ${appName}', () => {
    const result = parseTitleTemplate('${folderName} - ${appName}', 'my-project', 'Lvce Editor')
    expect(result).toBe('my-project - Lvce Editor')
  })

  it('should handle template with no variables', () => {
    const result = parseTitleTemplate('My Custom Title', 'my-project', 'Lvce Editor')
    expect(result).toBe('My Custom Title')
  })

  it('should handle empty template', () => {
    const result = parseTitleTemplate('', 'my-project', 'Lvce Editor')
    expect(result).toBe('')
  })

  it('should handle template with multiple occurrences of the same variable', () => {
    const result = parseTitleTemplate('${folderName} - ${folderName}', 'my-project', 'Lvce Editor')
    expect(result).toBe('my-project - my-project')
  })

  it('should handle template with special characters', () => {
    const result = parseTitleTemplate('${folderName} (v1.0)', 'my-project', 'Lvce Editor')
    expect(result).toBe('my-project (v1.0)')
  })

  it('should handle template with only folderName', () => {
    const result = parseTitleTemplate('${folderName}', 'test-folder', 'Lvce Editor')
    expect(result).toBe('test-folder')
  })

  it('should handle template with only appName', () => {
    const result = parseTitleTemplate('${appName}', 'test-folder', 'Lvce Editor')
    expect(result).toBe('Lvce Editor')
  })

  it('should handle template with folderName at the end', () => {
    const result = parseTitleTemplate('Editor - ${folderName}', 'my-project', 'Lvce Editor')
    expect(result).toBe('Editor - my-project')
  })

  it('should handle template with appName at the beginning', () => {
    const result = parseTitleTemplate('${appName} - ${folderName}', 'my-project', 'Lvce Editor')
    expect(result).toBe('Lvce Editor - my-project')
  })
})
