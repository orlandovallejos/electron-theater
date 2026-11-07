/**
 * Webpack config for the preload script.
 *
 * The preload runs in a sandboxed renderer, where `require` can only load `electron` and a few
 * built-ins. Bundling it into one file (with the shared channel names inlined) makes that work in
 * both development and production.
 */

import path from 'path';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

const isProduction = process.env.NODE_ENV === 'production';

export default merge(baseConfig, {
  mode: isProduction ? 'production' : 'development',

  devtool: false,

  target: 'electron-preload',

  entry: {
    preload: path.join(webpackPaths.srcMainPath, 'preload.js'),
  },

  output: {
    path: webpackPaths.distMainPath,
    filename: '[name].js',
  },

  node: {
    __dirname: false,
    __filename: false,
  },
});
