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
      return {
        key,
        value: value2,
        status: 'added',
        children: _.isObject(value2) && !_.isArray(value2) ? buildDiff(value2, value2) : null,
      };
    }

    if (!_.has(data2, key)) {
      return {
        key,
        value: value1,
        status: 'deleted',
        children: _.isObject(value1) && !_.isArray(value1) ? buildDiff(value1, value1) : null,
      };
    }

    if (_.isObject(value1) && _.isObject(value2) && !_.isArray(value1) && !_.isArray(value2)) {
      return {
        key,
        status: 'nested',
        children: buildDiff(value1, value2),
      };
    }

    if (_.isEqual(value1, value2)) {
      return {
        key,
        value: value1,
        status: 'unchanged',
      };
    }

    return {
      key,
      oldValue: value1,
      newValue: value2,
      status: 'changed',
    };
  });
};

const formatStylish = (diff, depth = 1) => {
  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize - 2);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  const lines = diff.map((item) => {
    switch (item.status) {
    case 'added':
      return `${currentIndent}+ ${item.key}: ${formatValue(item.value, depth + 1)}`;
    case 'deleted':
      return `${currentIndent}- ${item.key}: ${formatValue(item.value, depth + 1)}`;
    case 'unchanged':
      return `${currentIndent}  ${item.key}: ${formatValue(item.value, depth + 1)}`;
    case 'changed':
      return [
        `${currentIndent}- ${item.key}: ${formatValue(item.oldValue, depth + 1)}`,
        `${currentIndent}+ ${item.key}: ${formatValue(item.newValue, depth + 1)}`,
      ].join('\n');
    case 'nested':
      return `${currentIndent}  ${item.key}: ${formatStylish(item.children, depth + 1)}`;
    default:
      return '';
    }
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatValue = (value, depth) => {
  if (_.isObject(value) && !_.isArray(value)) {
    const indentSize = 4;
    const currentIndent = ' '.repeat(depth * indentSize);
    const bracketIndent = ' '.repeat((depth - 1) * indentSize);
    
    const lines = Object.entries(value).map(([key, val]) => {
      return `${currentIndent}${key}: ${formatValue(val, depth + 1)}`;
    });
    
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  }

  if (value === null) {
    return 'null';
  }

  if (value === '') {
    return '';
  }

  return value;
};

const formatDiff = (diff, format = 'stylish') => {
  switch (format) {
  case 'stylish':
    return formatStylish(diff);
  default:
    return formatStylish(diff);
  }
};

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);
  return formatDiff(diff, format);
}
