import { parseFile } from './parsers.js';
import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, value: value2, status: 'added' };
    }

    if (!_.has(data2, key)) {
      return { key, value: value1, status: 'deleted' };
    }

    if (_.isEqual(value1, value2)) {
      return { key, value: value1, status: 'unchanged' };
    }

    return {
      key,
      oldValue: value1,
      newValue: value2,
      status: 'changed',
    };
  });
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.status) {
    case 'added':
      return `  + ${item.key}: ${item.value}`;
    case 'deleted':
      return `  - ${item.key}: ${item.value}`;
    case 'unchanged':
      return `    ${item.key}: ${item.value}`;
    case 'changed':
      return [
        `  - ${item.key}: ${item.oldValue}`,
        `  + ${item.key}: ${item.newValue}`,
      ].join('\n');
    default:
      return '';
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
}
