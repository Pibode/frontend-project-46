# Gendiff - JSON и YAML Difference Generator

CLI утилита для сравнения двух JSON или YAML файлов конфигурации и отображения различий в разных форматах.

## Установка

\`\`\`bash
# Клонируйте репозиторий
git clone https://github.com/Pibode/frontend-project-46.git
cd frontend-project-46

# Установите зависимости
npm install

# Сделайте пакет доступным глобально
npm link
\`\`\`

## Использование

\`\`\`bash
gendiff [options] <filepath1> <filepath2>
\`\`\`

### Опции

- \`-V, --version\` - вывести номер версии
- \`-f, --format <type>\` - формат вывода (по умолчанию: "stylish")
- \`-h, --help\` - показать справку

### Поддерживаемые форматы файлов

- JSON (`.json`)
- YAML (`.yml`, `.yaml`)

### Поддерживаемые форматы вывода

- `stylish` (по умолчанию) - древовидный формат с отступами
- `plain` - плоский текстовый формат
- `json` - структурированный JSON формат для машинной обработки

### Примеры

Сравнить два JSON файла в формате stylish:
\`\`\`bash
gendiff file1.json file2.json
\`\`\`

Сравнить два YAML файла в формате stylish:
\`\`\`bash
gendiff file1.yml file2.yml
\`\`\`

Сравнить в формате plain:
\`\`\`bash
gendiff file1.json file2.json --format plain
\`\`\`

Сравнить в формате json:
\`\`\`bash
gendiff file1.json file2.json --format json
\`\`\`

Сравнить вложенные структуры в формате plain:
\`\`\`bash
gendiff nested1.json nested2.json --format plain
\`\`\`

Сравнить вложенные структуры в формате json:
\`\`\`bash
gendiff nested1.json nested2.json --format json
\`\`\`

## Пример вывода

### Формат stylish

\`\`\`bash
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
\`\`\`

### Формат plain

\`\`\`bash
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
\`\`\`

### Формат json

\`\`\`json
[
  {
    "key": "common",
    "status": "nested",
    "children": [
      {
        "key": "follow",
        "value": false,
        "status": "added"
      }
    ]
  }
]
\`\`\`

## Демонстрация

[![asciicast](https://asciinema.org/a/tn9IURY617wrnprTIDwF9XLvX.svg)](https://asciinema.org/a/tn9IURY617wrnprTIDwF9XLvX)

[![asciicast](https://asciinema.org/a/JbYjopU0n3NXMapKVv0SqjwXb.svg)](https://asciinema.org/a/JbYjopU0n3NXMapKVv0SqjwXb)

[![asciicast](https://asciinema.org/a/3hqjvTTQa0Yuk4ifwPVEo3VG6.svg)](https://asciinema.org/a/3hqjvTTQa0Yuk4ifwPVEo3VG6)

[![asciicast](https://asciinema.org/a/IJwrToPTGLLiIKaSfx0HOwQVq.svg)](https://asciinema.org/a/IJwrToPTGLLiIKaSfx0HOwQVq)

[![asciicast](https://asciinema.org/a/je0d4sQ3MgniA7f4xhBKap5oL.svg)](https://asciinema.org/a/je0d4sQ3MgniA7f4xhBKap5oL)


