import { readFileSync } from 'fs';
import path from 'path';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parseFile = (filepath) => {
  const content = getFileContent(filepath);
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
  case '.json':
    return JSON.parse(content);
  default:
    throw new Error(`Unsupported file format: ${extension}`);
  }
};

export { getFileContent, parseFile };
