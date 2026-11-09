// ESLint settings for React code that runs in a browser (the renderer). Use together with ./base.mjs.
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import compat from 'eslint-plugin-compat';

const reactConfig = [
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  compat.configs['flat/recommended'],

  {
    plugins: { 'react-hooks': reactHooks },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

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
];

export default reactConfig;
