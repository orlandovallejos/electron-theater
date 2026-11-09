import { execSync } from 'child_process';
import fs from 'fs';
import { dependencies } from '../../release/app/package.json';
import webpackPaths from '../configs/webpack.paths';

if (
  Object.keys(dependencies || {}).length > 0 &&
  fs.existsSync(webpackPaths.appNodeModulesPath)
) {
  // npx finds the binary in the hoisted workspace node_modules, wherever that is. It runs from the
  // desktop app's folder, and --module-dir points it at the packaged app's dependencies.
  execSync(
    'npx --no -- electron-rebuild --parallel --force --types prod,dev,optional --module-dir release/app',
    {
      cwd: webpackPaths.rootPath,
      stdio: 'inherit',
    }
  );
}
