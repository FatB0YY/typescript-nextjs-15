**English** | [Русский](./README.ru.md)

# Next.js 15 Starter Template

A starter template for Next.js 15 and React 19 projects: TypeScript throughout, Feature-Sliced Design as the architecture, and a code quality setup that enforces conventions rather than merely documenting them.

## Quick start

    npm install
    npm run dev

## Stack

- **Next.js 15** with **React 19**
- **TypeScript**
- **Feature-Sliced Design**
- **ESLint** (flat config), **Prettier**, **Stylelint**
- **Vitest** and **Storybook**
- **Husky** with **lint-staged**
- **JSDoc**

## Architecture

The project is organised along [Feature-Sliced Design](https://feature-sliced.design) lines, with two deliberate departures from the default conventions:

**No barrel files as public API.** Canonical FSD routes every cross-slice import through an `index.ts` re-export. This template forbids that. Barrel files defeat tree-shaking, slow down the bundler as the project grows, and are a common source of circular dependencies — costs that land hardest in a Next.js app, where bundle size directly affects delivery. Modules are imported from their concrete paths instead.

**Bounded import depth inside `shared`.** Reaching arbitrarily deep into `shared` erodes the boundary between a shared module's surface and its internals, so import depth is capped by a lint rule.

Path aliases (`@/`) are configured in both `tsconfig` and ESLint, so the editor and the linter agree on resolution.

## Code quality

ESLint runs on a flat config with `@typescript-eslint`, `react`, `jsx-a11y`, `jsdoc/recommended-typescript` and `prettier/recommended`.

### Enforced conventions

| Naming | Convention |
| --- | --- |
| Types | `T` prefix, `PascalCase` |
| Interfaces | `I` prefix, or a `Props` suffix |
| Enums | `E` prefix |

### Forbidden

- Default exports
- The `children` prop
- `dangerouslySetInnerHTML`
- Imports from `index.ts`
- Magic numbers, with a small allow-list

### Preferred

- Components as arrow functions
- Conditional rendering through the ternary operator
- Imports sorted by `simple-import-sort`
- JSDoc required on every file in `src` except `.tsx`

### Styles

Stylelint runs `stylelint-config-standard`, `stylelint-config-css-modules`, `stylelint-prettier/recommended` and `stylelint-config-recess-order` over all CSS, SCSS and SASS files. Class and keyframe names must be camelCase or kebab-case, properties are sorted automatically, and Tailwind at-rules are recognised.

## Git hooks

Hooks are wired through Husky and lint-staged.

**`pre-commit`** runs ESLint, Prettier and Stylelint against staged files only, so the check stays fast as the project grows.

**`commit-msg`** validates the commit message against a fixed pattern:

    [TASK-123] Feature. Module. Add new logic.
    [TASK-123] Bugfix. Checkout. Fix total.
    Hotfix. API. Fix critical bug.

## Editor setup

`.vscode/settings.json` ships with the template and configures format-on-save, ESLint and Stylelint validation, and Prettier as the formatter. Install the ESLint, Prettier and Stylelint extensions to get the full behaviour.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run analyze` | Analyse the production bundle |
| `npm run lint` / `lint:fix` | ESLint check and autofix |
| `npm run lint:styles` / `lint:styles:fix` | Stylelint check and autofix |
| `npm run format` | Format with Prettier |
| `npm run type-check` | TypeScript type check |
| `npm run test` | Run Vitest |
| `npm run storybook` | Run Storybook |
| `npm run build-storybook` | Build Storybook |
| `npm run prepare` | Install Husky hooks |

## Roadmap

- Sentry integration
- GitHub Actions CI

## Author

Rodion Ramazanov — [GitHub](https://github.com/FatB0YY) · [Telegram](https://t.me/iamrodionn)
