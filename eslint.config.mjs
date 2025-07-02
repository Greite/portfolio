// @ts-check
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import * as importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le répertoire actuel en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { resolve } = path;

export default defineConfig([
  // Base ESLint config
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.vercel/**',
      '**/.turbo/**',
    ],
  },
  // Global rules for all files
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      js,
    },
    extends: ['js/recommended'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // Handled by TypeScript
      'no-use-before-define': 'off', // Handled by TypeScript
      'no-shadow': 'off', // Handled by TypeScript
      'no-undef': 'off', // Handled by TypeScript
      'prefer-template': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-destructuring': 'warn',
      // 'prefer-arrow-callbacks': 'warn',
      'operator-assignment': 'warn',
      'no-useless-return': 'warn',
      'no-useless-rename': 'warn',
      'no-useless-computed-key': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-lonely-if': 'warn',
      'no-implicit-coercion': ['warn', { disallowTemplateShorthand: false }],
      'no-else-return': 'warn',
      'no-array-constructor': 'warn',
      eqeqeq: ['warn', 'always'],
      curly: ['warn', 'all'],
      'arrow-body-style': 'warn',
    },
  },
  // TypeScript config
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      // @ts-ignore
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: [
          resolve(__dirname, './tsconfig.json'),
          resolve(__dirname, './packages/*/tsconfig.json'),
          resolve(__dirname, './apps/*/tsconfig.json'),
        ],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
    },
  },
  // React config
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      // @ts-ignore
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'jsx-a11y/tabindex-no-positive': 'warn',
    },
  },
  // stylistic config
  {
    plugins: {
      '@stylistic': stylistic,
    },
    extends: ['@stylistic/recommended'],
    rules: {
      '@stylistic/arrow-parens': ['error', 'always', { requireForBlockBody: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          multilineDetection: 'brackets',
          overrides: {
            interface: {
              multiline: {
                delimiter: 'semi',
                requireLast: true,
              },
            },
          },
          singleline: {
            delimiter: 'semi',
          },
        },
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/semi': ['error', 'always'],
    },
  },
  // Import config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      // @ts-ignore
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
    },
  },
  // Prettier config (must be last, disable conflicting rules with Prettier)
  prettierConfig,
]);
