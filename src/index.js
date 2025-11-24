import { parseFile } from './parsers.js'
import _ from 'lodash'
import getFormatter from './formatters/index.js'

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy(_.union(keys1, keys2))

  return allKeys.map(key => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return {
        key,
        value: value2,
        status: 'added',
        children: _.isObject(value2) && !_.isArray(value2) ? buildDiff(value2, value2) : null,
      }
    }

    if (!_.has(data2, key)) {
      return {
        key,
        value: value1,
        status: 'deleted',
        children: _.isObject(value1) && !_.isArray(value1) ? buildDiff(value1, value1) : null,
      }
    }

    if (_.isObject(value1) && _.isObject(value2) && !_.isArray(value1) && !_.isArray(value2)) {
      return {
        key,
        status: 'nested',
        children: buildDiff(value1, value2),
      }
    }

    if (_.isEqual(value1, value2)) {
      return {
        key,
        value: value1,
        status: 'unchanged',
      }
    }

    return {
      key,
      oldValue: value1,
      newValue: value2,
      status: 'changed',
    }
  })
}

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  const format = getFormatter(formatName)
  return format(diff)
}
// comment
