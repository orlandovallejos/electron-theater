// ESLint flat config for the whole repo. The shared presets live in packages/config; this file only
// says which presets apply to which files, and what is specific to this repo.
import path from 'node:path';
import { base, prettier, tests } from '@electron-theater/config/eslint/base';
import reactConfig from '@electron-theater/config/eslint/react';

export default [
  {
    ignores: [
      'node_modules/',
      '**/coverage/',
      'apps/desktop/release/app/dist/',
      'apps/desktop/release/build/',
      // ESLint 7 skipped dot-folders, so the build scripts were never linted. Kept that way.
      'apps/desktop/.erb/',
      '**/*.css.d.ts',
      '**/*.sass.d.ts',
      '**/*.scss.d.ts',
    ],
  },

  ...base,
  ...reactConfig,

  {
    settings: {
      'import/resolver': {
        // Absolute, so it works whether ESLint runs from the root (lint-staged) or from the app.
        typescript: {
          project: path.join(import.meta.dirname, 'apps/desktop/tsconfig.json'),
        },
        node: {},
      },
    },
  },

  ...tests(['**/*.test.{ts,tsx}', 'apps/desktop/src/setupTests.ts']),

  // Must stay last: turns off the rules that Prettier handles and runs Prettier as a rule.
  prettier,
];
