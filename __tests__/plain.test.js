import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('Plain format', () => {
  test('should format flat JSON files in plain format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFile('expected-plain-flat.txt');

    const result = genDiff(file1, file2, 'plain');
    expect(result).toEqual(expected.trim());
  });

  test('should format nested JSON files in plain format', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const expected = readFile('expected-plain-nested.txt');

    const result = genDiff(file1, file2, 'plain');
    expect(result).toEqual(expected.trim());
  });

  test('should format nested YAML files in plain format', () => {
    const file1 = getFixturePath('nested1.yml');
    const file2 = getFixturePath('nested2.yml');
    const expected = readFile('expected-plain-nested.txt');

    const result = genDiff(file1, file2, 'plain');
    expect(result).toEqual(expected.trim());
  });
});
