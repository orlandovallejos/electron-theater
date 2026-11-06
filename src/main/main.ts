/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  IpcMainEvent,
  IpcMainInvokeEvent,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import dotenv from 'dotenv';
// import Store from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
// Constants
import appEventsConstants from '../constants/appEvents.cjs';
import { createTmdbClient } from './tmdb';
import { isAllowedExternalUrl, isAppUrl } from './security';

// Read variable from .env file:
dotenv.config();

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// Only the app's own page may talk to the main process: every handler checks who is calling.
const appUrl = resolveHtmlPath('index.html');
const isFromApp = (event: IpcMainEvent | IpcMainInvokeEvent) =>
  isAppUrl(event.senderFrame?.url, appUrl);
const handle = (
  channel: string,
  listener: (...args: unknown[]) => unknown
): void => {
  ipcMain.handle(channel, (event, ...args) => {
    if (!isFromApp(event)) {
      throw new Error('Untrusted sender');
    }
    return listener(...args);
  });
};
const listen = (channel: string, listener: () => void): void => {
  ipcMain.on(channel, (event) => {
    if (isFromApp(event)) {
      listener();
    }
  });
};

// The TMDB token stays in the main process: the renderer only gets the results.
const tmdb = createTmdbClient({
  apiUrl: process.env.API_URL || '',
  token: process.env.APP_TOKEN || '',
});
const requireId = (id: unknown): string => {
  if (typeof id !== 'string' || !/^\d+$/.test(id)) {
    throw new Error('Invalid id');
  }
  return id;
};
handle(appEventsConstants.TMDB_GET_CONFIGURATION, () =>
  tmdb.getConfiguration()
);
handle(appEventsConstants.TMDB_GET_TOP_MOVIES, () => tmdb.getTopMovies());
handle(appEventsConstants.TMDB_GET_TOP_SERIES, () => tmdb.getTopSeries());
handle(appEventsConstants.TMDB_GET_MOVIE, (id) => tmdb.getMovie(requireId(id)));
handle(appEventsConstants.TMDB_GET_MOVIE_TRAILER, (id) =>
  tmdb.getMovieTrailer(requireId(id))
);
handle(appEventsConstants.TMDB_GET_SERIE, (id) => tmdb.getSerie(requireId(id)));
handle(appEventsConstants.TMDB_GET_SERIE_TRAILER, (id) =>
  tmdb.getSerieTrailer(requireId(id))
);
listen(appEventsConstants.CLOSE_APP, () => {
  app.quit();
});
listen(appEventsConstants.FULL_SCREEN_APP, () => {
  if (mainWindow) {
    const isFullScreen = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFullScreen);
  }
});
listen(appEventsConstants.MINIMIZE_APP, () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});
let windowSize = [0, 0];
let windowPosition = [0, 0];
listen(appEventsConstants.MAXIMIZE_APP, () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.setPosition(windowPosition[0], windowPosition[1]);
      mainWindow.setSize(windowSize[0], windowSize[1]);
    } else {
      windowSize = mainWindow.getSize();
      windowPosition = mainWindow.getPosition();
      mainWindow.maximize();
    }
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  // electron-debug is ESM only, so the function is its default export.
  require('electron-debug').default();
}

const installExtensions = async () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  return installExtension(REACT_DEVELOPER_TOOLS, { forceDownload }).catch(
    console.log
  );
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  // In development main runs from src/main, while the bundled preload lives in the dist folder.
  const preloadPath =
    process.env.NODE_ENV === 'development'
      ? path.join(__dirname, '../../release/app/dist/main/preload.js')
      : path.join(__dirname, 'preload.js');

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    frame: false,
    webPreferences: {
      // The preload is a single bundled file (see webpack.config.preload.ts), so the
      // renderer can run sandboxed with web security on.
      preload: preloadPath,
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open allow-listed https urls in the user's browser, deny everything else
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedExternalUrl(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // The window never navigates away from the app page (client-side routing is not a navigation)
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isAppUrl(url, appUrl)) {
      event.preventDefault();
    }
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
