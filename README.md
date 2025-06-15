# TypeScript Next.js 15 Starter Template

Готовый шаблон для быстрого старта проектов на Next.js 15 с поддержкой React 19, TypeScript, строгой архитектурой (Feature-Sliced Design) и полной системой контроля качества кода.

---

## 🚀 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

---

## Технологии

- **Next.js 15** + **React 19**
- **TypeScript**
- **Feature-Sliced Design (FSD)**
- **ESLint FlatConfig** + **Prettier** + **Stylelint**
- **JSDoc**
- **Husky + lint-staged** (git-hooks)
- **Storybook + Vitest**

---

## Архитектура и структура

- Организация по принципам [Feature-Sliced Design](https://feature-sliced.design/)
- Запреты на `index.ts` как публичный API в слоях `app`, `widgets`, `features`, `entities`, `shared`
- Ограничение глубины импортов в `shared`
- Алиасы `@/` настроены через `tsconfig` и ESLint

---

## Рекомендуемая конфигурация VSCode

Файл `.vscode/settings.json` уже присутствует:

- Автоформатирование на сохранение
- Проверка ESLint и Stylelint
- Форматирование через Prettier

Убедитесь, что установлены расширения:

- ESLint
- Prettier
- Stylelint

---

## Скрипты

| Скрипт                    | Описание                           |
| ------------------------- | ---------------------------------- |
| `npm run dev`             | Запуск проекта в режиме разработки |
| `npm run build`           | Сборка проекта для продакшена      |
| `npm run analyze`         | Анализ prod сборки                 |
| `npm run start`           | Запуск продакшен-сборки            |
| `npm run lint`            | Проверка ESLint                    |
| `npm run lint:fix`        | Автоисправление ESLint ошибок      |
| `npm run lint:styles`     | Проверка Stylelint                 |
| `npm run lint:styles:fix` | Автоисправление Stylelint ошибок   |
| `npm run format`          | Форматирование Prettier            |
| `npm run type-check`      | Проверка типов TypeScript          |
| `npm run prepare`         | Установка git-хуков (husky)        |
| `npm run test`            | Запуск тестов Vitest               |
| `npm run storybook`       | Запуск Storybook                   |
| `npm run build-storybook` | Запуск продакшен-сборки Storybook  |

---

## Git Hooks

Настроены через **Husky** и **lint-staged**.

### `pre-commit`

- Запускает `eslint`, `prettier`, `stylelint` на закоммиченных файлах

### `commit-msg`

- Проверяет формат commit-сообщений по паттернам:

```bash
[TASK-123] Feature. Module. Add new logic.
[TASK-123] Bugfix. Checkout. Fix total.
Hotfix. API. Fix critical bug.
```

---

## Качество кода: ESLint, Prettier, JSDoc

- Подключены:

  - `plugin:@typescript-eslint/recommended`
  - `plugin:react/recommended`
  - `plugin:jsx-a11y/recommended`
  - `plugin:jsdoc/recommended-typescript`
  - `plugin:prettier/recommended`

- Правила именования:

  - `T` префикс + `PascalCase` для типов
  - `I` префикс или `Props` постфикс для интерфейсов
  - `E` префикс для enum

- Запреты:

  - `default export`
  - `children` пропс
  - `dangerouslySetInnerHTML`
  - Импорты из `index.ts`
  - Запрет магических чисел (с исключениями)

- Поддержка JSDoc:

  - Обязателен для всех файлов в `src/`, кроме `.tsx`

- Импорты:

  - Упорядочены через `simple-import-sort`

- Предпочтения:

  - Все компоненты — стрелочные функции
  - Условный рендеринг через тернарный оператор

---

## Stylelint

Используются конфигурации:

- `stylelint-config-standard`
- `stylelint-config-css-modules`
- `stylelint-prettier/recommended`
- `stylelint-config-recess-order`

Проверяются все CSS/SCSS/SASS файлы. Приняты соглашения:

- camelCase или kebab-case классы и keyframes
- Автосортировка свойств
- Запрет неизвестных правил, поддержка Tailwind

---

## Планы на будущее

- ⏳ Подключение тестов (Vitest, RTL)
- ⏳ Storybook
- ⏳ Интеграция с Sentry
- ⏳ GitHub Actions для CI

---

> Готовый к продакшену стартовый шаблон для профессиональной разработки на Next.js 15 + FSD.
