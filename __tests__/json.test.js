import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('JSON format', () => {
  test('should format flat JSON files in json format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    const result = genDiff(file1, file2, 'json');
    const parsedResult = JSON.parse(result);
    
    expect(parsedResult).toBeInstanceOf(Array);
    expect(parsedResult.length).toBeGreaterThan(0);
    expect(parsedResult[0]).toHaveProperty('key');
    expect(parsedResult[0]).toHaveProperty('status');
  });

  test('should format nested JSON files in json format', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');

    const result = genDiff(file1, file2, 'json');
    const parsedResult = JSON.parse(result);
    
    expect(parsedResult).toBeInstanceOf(Array);
    expect(parsedResult.some(item => item.status === 'nested')).toBe(true);
  });

  test('should format nested YAML files in json format', () => {
    const file1 = getFixturePath('nested1.yml');
    const file2 = getFixturePath('nested2.yml');

    const result = genDiff(file1, file2, 'json');
    const parsedResult = JSON.parse(result);
    
    expect(parsedResult).toBeInstanceOf(Array);
    expect(parsedResult.some(item => item.status === 'nested')).toBe(true);
  });
});
