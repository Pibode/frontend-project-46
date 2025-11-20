## Gendiff - JSON Difference Generator

CLI утилита для сравнения двух JSON файлов конфигурации и отображения различий в удобочитаемом формате.

### Установка

\`\`bash
### Клонируйте репозиторий
git clone https://github.com/Pibode/frontend-project-46.git
cd frontend-project-46

### Установите зависимости
npm install

### Сделайте пакет доступным глобально
npm link
\`\`

### Использование

\`\`bash
gendiff [options] <filepath1> <filepath2>
\`\`

### Опции

- \`-V, --version\` - вывести номер версии
- \`-f, --format <type>\` - формат вывода (по умолчанию: "stylish")
- \`-h, --help\` - показать справку

### Примеры

Сравнить два JSON файла:
\`\`bash
gendiff file1.json file2.json
\`\`

Сравнить с указанием формата:
\`\``bash
gendiff -f plain file1.json file2.json
\`\`

### Пример вывода

\`\`bash
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
\`\`

### Демонстрация

[![asciicast](https://asciinema.org/a/tn9IURY617wrnprTIDwF9XLvX.svg)](https://asciinema.org/a/tn9IURY617wrnprTIDwF9XLvX)

### Демонстрация работы с YAML
[![asciicast](https://asciinema.org/a/JbYjopU0n3NXMapKVv0SqjwXb.svg)](https://asciinema.org/a/JbYjopU0n3NXMapKVv0SqjwXb)