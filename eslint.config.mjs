// ESLint flat config. Replaces .eslintrc.js, .eslintignore and the eslint-config-erb / Airbnb preset.
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import promise from 'eslint-plugin-promise';
import jest from 'eslint-plugin-jest';
import compat from 'eslint-plugin-compat';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'coverage/',
      'release/app/dist/',
      'release/build/',
      // ESLint 7 skipped dot-folders, so the build scripts were never linted. Kept that way.
      '.erb/',
      '**/*.css.d.ts',
      '**/*.sass.d.ts',
      '**/*.scss.d.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  promise.configs['flat/recommended'],
  compat.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'react-hooks': reactHooks },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
        node: {},
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Same relaxations the old eslint-config-erb preset had.
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { caughtErrors: 'none', ignoreRestSiblings: true },
      ],
      // Only the dev dependencies are installed at the root.
      'import/no-extraneous-dependencies': 'off',
    },
  },

  // Rules the old Airbnb-based preset enforced that the presets above do not.
  // They are written out here so this project owns them instead of depending on an
  // unmaintained shared config.
  {
    rules: {
      // Possible problems and best practices
      'array-callback-return': [
        'error',
        { allowImplicit: true, checkForEach: false },
      ],
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      'default-case': ['error', { commentPattern: '^no default$' }],
      'dot-notation': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'guard-for-in': 'error',
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      'no-alert': 'warn',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': 'warn',
      'no-continue': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-inner-declarations': 'error',
      'no-label-var': 'error',
      'no-multi-str': 'error',
      'no-octal-escape': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-multi-assign': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': 'error',
      'no-proto': 'error',
      'no-restricted-globals': [
        'error',
        { name: 'isFinite', message: 'Use Number.isFinite instead.' },
        { name: 'isNaN', message: 'Use Number.isNaN instead.' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in iterates the whole prototype chain. Use Object.keys/values/entries.',
        },
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO and make code hard to follow.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode.',
        },
      ],
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: true, object: false },
        },
        { enforceForRenamedProperties: false },
      ],
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
      'prefer-template': 'error',
      radix: 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          line: { exceptions: ['-', '+'], markers: ['=', '!', '/'] },
          // The `/*-----*/` banners used in this codebase need the "-" exception.
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!', ':', '::'],
            balanced: true,
          },
        },
      ],
      'symbol-description': 'error',
      yoda: 'error',
      'func-names': 'warn',
      'max-classes-per-file': ['error', 1],

      // TypeScript
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['arrowFunctions', 'functions', 'methods'] },
      ],
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],

      // Imports
      'import/extensions': [
        'error',
        'ignorePackages',
        { js: 'never', mjs: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'error',
      'import/no-amd': 'error',
      'import/no-cycle': 'error',
      // False positives for namespace-style default exports such as axios and typescript-eslint.
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-dynamic-require': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': ['error', { commonjs: true }],
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'error',
        { groups: [['builtin', 'external', 'internal']] },
      ],
      'import/prefer-default-export': 'error',

      // React (function components only, so the class component rules are not carried over)
      'react/button-has-type': 'error',
      'react/destructuring-assignment': ['error', 'always'],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-bind': [
        'error',
        {
          ignoreRefs: true,
          allowArrowFunctions: true,
          ignoreDOMComponents: true,
        },
      ],
      'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
      'react/jsx-props-no-spreading': 'error',
      'react/no-array-index-key': 'error',
      'react/no-danger': 'warn',
      'react/no-typos': 'error',
      'react/no-unused-prop-types': ['error', { skipShapeProps: true }],
      'react/require-default-props': [
        'error',
        { forbidDefaultForRequired: true },
      ],
      'react/self-closing-comp': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',

      // Accessibility
      'jsx-a11y/control-has-associated-label': [
        'error',
        {
          ignoreElements: [
            'audio',
            'canvas',
            'embed',
            'input',
            'textarea',
            'tr',
            'video',
          ],
        },
      ],
      'jsx-a11y/lang': 'error',
    },
  },

  {
    files: ['**/*.test.{ts,tsx}', 'src/setupTests.ts'],
    ...jest.configs['flat/recommended'],
    languageOptions: { globals: { ...globals.jest } },
  },

  // Must stay last: turns off the rules that Prettier handles and runs Prettier as a rule.
  prettierRecommended
);
