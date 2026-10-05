import graphqlPlugin from '@graphql-eslint/eslint-plugin';
import nxEslintPlugin from '@nx/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import nimbusCleanPlugin from 'eslint-plugin-nimbus-clean';
import globals from 'globals';

const nimbusRecommendedConfigs = Array.isArray(nimbusCleanPlugin.configs.recommended)
  ? nimbusCleanPlugin.configs.recommended
  : [nimbusCleanPlugin.configs.recommended];
const disabledPerfectionistRules = Object.fromEntries(
  [...new Set(nimbusRecommendedConfigs.flatMap((preset) => Object.keys(preset.rules ?? {})))]
    .filter((rule) => rule.startsWith('perfectionist/'))
    .map((rule) => [rule, 'off'])
);

const config = [
  {
    ignores: ['**/dist', '.husky', '.idea', '**/coverage', '**/generated'],
  },
  { plugins: { '@nx': nxEslintPlugin } },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.es6, ...globals.browser, ...globals.node },
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          jsx: true,
          modules: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
        },
        typescript: {},
      },
      react: {
        fragment: 'Fragment',
        pragma: 'React',
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [
            {
              onlyDependOnLibsWithTags: ['*'],
              sourceTag: '*',
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
    },
  },
  ...nimbusCleanPlugin.configs.recommended,
  {
    rules: {
      'prettier/prettier': 'off',
      'react-refresh/only-export-components': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'unicorn/prefer-logical-operator-over-ternary': 'off',
      'unicorn/prevent-abbreviations': 'off',
      ...disabledPerfectionistRules,
    },
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@graphql-eslint/match-document-filename': [
        'error',
        {
          query: 'PascalCase',
        },
      ],
    },
  },
];

export default config;
