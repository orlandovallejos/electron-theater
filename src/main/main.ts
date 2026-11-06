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
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import dotenv from 'dotenv';
// import Store from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
// Constants
import appEventsConstants from '../constants/appEvents.cjs';
import { createTmdbClient } from './tmdb';

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
ipcMain.handle(appEventsConstants.TMDB_GET_CONFIGURATION, () =>
  tmdb.getConfiguration()
);
ipcMain.handle(appEventsConstants.TMDB_GET_TOP_MOVIES, () =>
  tmdb.getTopMovies()
);
ipcMain.handle(appEventsConstants.TMDB_GET_TOP_SERIES, () =>
  tmdb.getTopSeries()
);
ipcMain.handle(appEventsConstants.TMDB_GET_MOVIE, (_e, id) =>
  tmdb.getMovie(requireId(id))
);
ipcMain.handle(appEventsConstants.TMDB_GET_MOVIE_TRAILER, (_e, id) =>
  tmdb.getMovieTrailer(requireId(id))
);
ipcMain.handle(appEventsConstants.TMDB_GET_SERIE, (_e, id) =>
  tmdb.getSerie(requireId(id))
);
ipcMain.handle(appEventsConstants.TMDB_GET_SERIE_TRAILER, (_e, id) =>
  tmdb.getSerieTrailer(requireId(id))
);
ipcMain.on(appEventsConstants.CLOSE_APP, () => {
  app.quit();
});
ipcMain.on(appEventsConstants.FULL_SCREEN_APP, () => {
  if (mainWindow) {
    const isFullScreen = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFullScreen);
  }
});
ipcMain.on(appEventsConstants.MINIMIZE_APP, () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});
let windowSize = [0, 0];
let windowPosition = [0, 0];
ipcMain.on(appEventsConstants.MAXIMIZE_APP, () => {
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

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Electron 20+ sandboxes renderers by default, but the preload script loads
      // a local file with require(). Keep the old behavior; tightening it is part of M2.
      sandbox: false,
      webSecurity: false,
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

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
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
