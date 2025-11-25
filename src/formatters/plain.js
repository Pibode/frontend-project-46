import _ from 'lodash'

const formatValue = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return value
}

const buildPlainLines = (diff, path = '') => {
  const lines = diff.flatMap((item) => {
    const currentPath = path ? `${path}.${item.key}` : item.key

    switch (item.status) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(item.value)}`
      case 'deleted':
        return `Property '${currentPath}' was removed`
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`
      case 'nested':
        return buildPlainLines(item.children, currentPath)
      case 'unchanged':
        return []
      default:
        return []
    }
  })

  return lines.filter(line => line !== '')
}

const formatPlain = (diff) => {
  const lines = buildPlainLines(diff)
  return lines.join('\n')
}

export default formatPlain
