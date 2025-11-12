import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import filenamesPlugin from 'eslint-plugin-filenames';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const config = [
  {
    ignores: ['node_modules/', '.github/', 'Docker/', 'build/', 'public/', 'dist/', '**/*.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      import: importPlugin,
      filenames: filenamesPlugin,
      'no-relative-import-paths': noRelativeImportPaths,
      'unused-imports': unusedImports,
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error'],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      // 'filenames/match-regex': ['error', '^[a-zA-Z0-9_.-]+$'],
      'no-unused-vars': 'off',
      'no-empty': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-unused-modules': 'error',
      'no-irregular-whitespace': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'unknown'],
          'newlines-between': 'never',
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: false, rootDir: 'src', prefix: '@' },
      ],
      eqeqeq: 'error',
      curly: 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },
];

export default config;
