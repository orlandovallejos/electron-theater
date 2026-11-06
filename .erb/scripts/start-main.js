/**
 * Development entry for the Electron main process.
 *
 * Electron 28+ loads a `.ts` entry file as an ES module before ts-node can compile it, so
 * `electron -r ts-node/register ./src/main/main.ts` fails. This CommonJS file registers
 * ts-node first and then requires the TypeScript main process, which ts-node compiles.
 */
require('ts-node/register/transpile-only');
require('../../src/main/main.ts');
