import { describe, expect, test } from '@jest/globals'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

describe('YAML support', () => {
  test('should compare flat YAML files', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')
    const expected = readFile('expected.txt')

    const result = genDiff(file1, file2)
    expect(result).toEqual(expected.trim())
  })

  test('should compare YAML and JSON files', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.yml')
    const expected = readFile('expected.txt')

    const result = genDiff(file1, file2)
    expect(result).toEqual(expected.trim())
  })
})