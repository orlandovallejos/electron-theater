import path from 'path';
import { rimrafSync } from 'rimraf';
import webpackPaths from '../configs/webpack.paths';

export default function deleteSourceMaps() {
  // glob: true because rimraf 4+ does not expand patterns by default
  rimrafSync(path.join(webpackPaths.distMainPath, '*.js.map'), { glob: true });
  rimrafSync(path.join(webpackPaths.distRendererPath, '*.js.map'), {
    glob: true,
  });
}
