import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// TODO: Sentry
// TODO: Storybook
// TODO: Коммит
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    // Enforces Next.js' Core Web Vitals rules for better performance
    'next/core-web-vitals',
    // TypeScript-specific rules for Next.js applications
    'next/typescript',
    // Feature-Sliced Design architecture rules and conventions
    '@feature-sliced',
    // Recommended TypeScript-specific linting rules
    'plugin:@typescript-eslint/recommended',
    // Recommended React-specific linting rules
    'plugin:react/recommended',
    // Enforces React Hooks rules and best practices
    'plugin:react-hooks/recommended',
    // Accessibility rules for JSX elements
    'plugin:jsx-a11y/recommended',
    // Enforces consistent and complete JSDoc documentation with recommended rules for code documentation standards
    'plugin:jsdoc/recommended-typescript',
    // Integrates Prettier with ESLint and disables conflicting rules
    'plugin:prettier/recommended',
  ),
  ...compat.plugins('prettier', 'react-refresh', 'simple-import-sort'),
  {
    ignores: ['node_modules/**', 'build/**', '.next/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: await import('@typescript-eslint/parser'),
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // Prettier
      // 'prettier/prettier': [
      //   'warn',
      //   {
      //     endOfLine: 'auto',
      //   },
      // ],
      // Components with components are an anti-pattern since they lose state when their parent is re-rendered (not to mention poor readability).
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      // Prefer conditional rendering via ternary expressions - an easy win to avoid unexpected values being rendered from && or even crashes in rare cases.
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
      // Prefer arrow functions for named components
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      // Children prop is an anti-pattern since it can lead to unexpected behavior and is not type-safe.
      'react/no-children-prop': 'error',
      // Unused prop types
      'react/no-unused-prop-types': 'error',
      // Prevent usage of dangerouslySetInnerHTML
      'react/no-danger': 'error',
      // Warn about missing displayName for React components
      'react/display-name': 'warn',
      // Avoid using array indices as keys
      'react/no-array-index-key': 'warn',
      // Prevent multiple components in a single file
      'react/no-multi-comp': 'error',
      // Warns when something other than a component is exported from a tsx file, which negatively affects optimization
      'react-refresh/only-export-components': 'warn',
      // Disallow default exports
      'import/no-default-export': 'error',
      // Ignore import React from 'react';
      'react/react-in-jsx-scope': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            // We forbid import "React", because starting from version 17, this happens automatically
            {
              name: 'react',
              importNames: ['default'],
              message:
                'Starting with version 17.0 React, TSX transformer allows you not to import React into JSX/TSX files explicitly. Please import exactly what you need.',
            },
            // Banning public API files in layer roots
            {
              name: '@/app',
              message:
                'Public API (index.ts) files are forbidden in "app" layer. Import specific modules directly.',
            },
            {
              name: '@/widgets',
              message:
                'Public API (index.ts) files are forbidden in "widgets" layer. Import specific modules directly.',
            },
            {
              name: '@/features',
              message:
                'Public API (index.ts) files are forbidden in "features" layer. Import specific modules directly.',
            },
            {
              name: '@/entities',
              message:
                'Public API (index.ts) files are forbidden in "entities" layer. Import specific modules directly.',
            },
            {
              name: '@/shared',
              message:
                'Public API (index.ts) files are forbidden in "shared" layer. Import specific modules directly.',
            },
          ],
          patterns: [
            // Prohibiting imports from index files:
            // import { Input } from '@/shared/ui/index.ts'; Bad ❌
            // import { Input } from '@/shared/ui'; = Good ✅
            {
              group: ['@/*/index', '@/*/index.ts', '@/*/index.tsx'],
              message:
                'Importing from index files is forbidden. Import specific modules directly.',
            },
            {
              group: ['@/shared/*/**'],
              message:
                'Imports deeper than 2 levels in "shared" folder are forbidden.',
            },
          ],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        // Types should always be named in PascalCase and have the "Type" postfix
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: 'Type$',
            match: true,
          },
        },
        // Interfaces should always be named in PascalCase and have the prefix "I" or the postfix "Props"
        // TODO: To finalize the rules, the "Props" postfix should only be for interfaces that describe React parameters
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]|Props$',
            match: true,
          },
        },
        // Enums should always be named in PascalCase and have the prefix "E"
        {
          selector: 'enum',
          format: ['PascalCase'],
          prefix: ['E'],
        },
      ],
      // Ignore unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // Forbid magic numbers
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
      // Placing empty lines in the code
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'const', next: 'if' },
        { blankLine: 'always', prev: 'const', next: 'return' },
        { blankLine: 'always', prev: 'expression', next: 'return' },
        { blankLine: 'always', prev: 'multiline-expression', next: 'const' },
      ],
      // Forbid duplicate imports
      'no-duplicate-imports': 'error',
      // Disable import order
      'import/order': 'off',
      // Sort exports
      'simple-import-sort/exports': 'error',
      // Sort imports
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Feature Sliced Design
            ['^(@/widgets)(/.*|$)'],
            ['^(@/features)(/.*|$)'],
            ['^(@/entities)(/.*|$)'],
            ['^(@/shared)(/.*|$)'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },
  prettier,
  {
    files: [
      'src/app/**/page.tsx',
      'src/app/**/layout.tsx',
      'eslint.config.mjs',
      'next.config.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['src/**/*'],
    ignores: ['**/*.tsx'],
    rules: {
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
          exemptEmptyFunctions: true,
        },
      ],
    },
  },
];

export default eslintConfig;
