[English](./README.md) | **Русский**

# Стартовый шаблон Next.js 15

Шаблон для быстрого старта проектов на Next.js 15 и React 19: TypeScript, архитектура Feature-Sliced Design и настройка качества кода, которая соглашения не описывает, а принуждает соблюдать.

## Быстрый старт

    npm install
    npm run dev

## Стек

- **Next.js 15** и **React 19**
- **TypeScript**
- **Feature-Sliced Design**
- **ESLint** (flat config), **Prettier**, **Stylelint**
- **Vitest** и **Storybook**
- **Husky** с **lint-staged**
- **JSDoc**

## Архитектура

Проект организован по принципам [Feature-Sliced Design](https://feature-sliced.design) с двумя осознанными отступлениями от стандартных соглашений:

**Никаких баррел-файлов в качестве публичного API.** Каноническая FSD пропускает все межслайсовые импорты через реэкспорт в `index.ts`. Этот шаблон так делать запрещает. Баррел-файлы ломают tree-shaking, замедляют сборщик по мере роста проекта и служат частым источником циклических зависимостей — а в Next.js эти издержки бьют сильнее всего, потому что размер бандла напрямую влияет на доставку. Вместо этого модули импортируются по конкретным путям.

**Ограниченная глубина импортов внутри `shared`.** Возможность залезть в `shared` на произвольную глубину размывает границу между публичной поверхностью модуля и его внутренностями, поэтому глубина импорта ограничена правилом линтера.

Алиасы путей (`@/`) настроены и в `tsconfig`, и в ESLint, поэтому редактор и линтер разрешают пути одинаково.

## Качество кода

ESLint работает на flat config с `@typescript-eslint`, `react`, `jsx-a11y`, `jsdoc/recommended-typescript` и `prettier/recommended`.

### Правила именования

| Сущность | Соглашение |
| --- | --- |
| Типы | Префикс `T`, `PascalCase` |
| Интерфейсы | Префикс `I` либо постфикс `Props` |
| Перечисления | Префикс `E` |

### Запрещено

- Экспорт по умолчанию
- Проп `children`
- `dangerouslySetInnerHTML`
- Импорты из `index.ts`
- Магические числа, с небольшим списком исключений

### Предпочтительно

- Компоненты — стрелочные функции
- Условный рендеринг через тернарный оператор
- Импорты отсортированы через `simple-import-sort`
- JSDoc обязателен для всех файлов в `src`, кроме `.tsx`

### Стили

Stylelint прогоняет `stylelint-config-standard`, `stylelint-config-css-modules`, `stylelint-prettier/recommended` и `stylelint-config-recess-order` по всем файлам CSS, SCSS и SASS. Имена классов и keyframes — camelCase или kebab-case, свойства сортируются автоматически, at-правила Tailwind распознаются.

## Git-хуки

Хуки настроены через Husky и lint-staged.

**`pre-commit`** запускает ESLint, Prettier и Stylelint только по проиндексированным файлам, поэтому проверка остаётся быстрой по мере роста проекта.

**`commit-msg`** проверяет сообщение коммита по фиксированному шаблону:

    [TASK-123] Feature. Module. Add new logic.
    [TASK-123] Bugfix. Checkout. Fix total.
    Hotfix. API. Fix critical bug.

## Настройка редактора

`.vscode/settings.json` идёт вместе с шаблоном и включает автоформатирование при сохранении, проверку ESLint и Stylelint и Prettier в роли форматтера. Для полноценной работы установите расширения ESLint, Prettier и Stylelint.

## Скрипты

| Скрипт | Назначение |
| --- | --- |
| `npm run dev` | Сервер разработки |
| `npm run build` | Продакшн-сборка |
| `npm run start` | Запуск продакшн-сборки |
| `npm run analyze` | Анализ продакшн-бандла |
| `npm run lint` / `lint:fix` | Проверка и автоисправление ESLint |
| `npm run lint:styles` / `lint:styles:fix` | Проверка и автоисправление Stylelint |
| `npm run format` | Форматирование Prettier |
| `npm run type-check` | Проверка типов TypeScript |
| `npm run test` | Запуск Vitest |
| `npm run storybook` | Запуск Storybook |
| `npm run build-storybook` | Сборка Storybook |
| `npm run prepare` | Установка хуков Husky |

## Планы

- Интеграция с Sentry
- CI на GitHub Actions

## Автор

Родион Рамазанов — [GitHub](https://github.com/FatB0YY) · [Telegram](https://t.me/iamrodionn)
