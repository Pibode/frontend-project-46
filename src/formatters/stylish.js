import _ from 'lodash'

const formatValue = (value, depth) => {
  if (_.isObject(value) && !_.isArray(value)) {
    const indentSize = 4
    const currentIndent = ' '.repeat(depth * indentSize)
    const bracketIndent = ' '.repeat((depth - 1) * indentSize)

    const lines = Object.entries(value).map(([key, val]) => {
      return `${currentIndent}${key}: ${formatValue(val, depth + 1)}`
    })

    return `{\n${lines.join('\n')}\n${bracketIndent}}`
  }

  if (value === null) {
    return 'null'
  }

  if (value === '') {
    return ''
  }

  return value
}

const formatStylish = (diff, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize - 2)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  const lines = diff.map(item => {
    switch (item.status) {
    case 'added':
      return `${currentIndent}+ ${item.key}: ${formatValue(item.value, depth + 1)}`
    case 'deleted':
      return `${currentIndent}- ${item.key}: ${formatValue(item.value, depth + 1)}`
    case 'unchanged':
      return `${currentIndent}  ${item.key}: ${formatValue(item.value, depth + 1)}`
    case 'changed':
      return [
        `${currentIndent}- ${item.key}: ${formatValue(item.oldValue, depth + 1)}`,
        `${currentIndent}+ ${item.key}: ${formatValue(item.newValue, depth + 1)}`,
      ].join('\n')
    case 'nested':
      return `${currentIndent}  ${item.key}: ${formatStylish(item.children, depth + 1)}`
    default:
      return ''
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default formatStylish
