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
/** Where the app window is loaded from: the dev server in development, a local file otherwise. */
const appUrl = resolveHtmlPath('index.html');

/**
 * Tells whether an IPC message was sent by the app's own page.
 * Any other page or frame that ends up in the window (for example the YouTube trailer iframe)
 * must not be able to call the handlers below.
 *
 * @param event - The IPC event Electron passes to every `ipcMain` listener.
 * @returns `true` only when the frame that sent the message is the app page.
 */
const isFromApp = (event: IpcMainEvent | IpcMainInvokeEvent) =>
  isAppUrl(event.senderFrame?.url, appUrl);

/**
 * Registers a request/response IPC handler (the renderer calls it with `ipcRenderer.invoke`).
 * It works like `ipcMain.handle`, plus the sender check: a message from an untrusted
 * frame is rejected, so the renderer's promise fails and the listener never runs.
 *
 * @param channel - The channel name, taken from `appEvents.cjs`.
 * @param listener - Does the work. It receives only the arguments, never the raw event,
 *   and its return value (or the value its promise resolves to) is sent back to the renderer.
 */
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

/**
 * Registers a fire-and-forget IPC listener (the renderer calls it with `ipcRenderer.send`),
 * used by the window buttons (close, minimize, maximize, full screen).
 * It works like `ipcMain.on`, plus the sender check: a message from an untrusted frame
 * is silently ignored.
 *
 * @param channel - The channel name, taken from `appEvents.cjs`.
 * @param listener - Runs when the message comes from the app page. It receives no arguments.
 */
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
/**
 * Checks an id received from the renderer before it is used in a TMDB request path.
 * TMDB ids are plain numbers, so anything else (a path, a query string, a non-string)
 * is refused.
 *
 * @param id - The value the renderer sent.
 * @returns The same id, once it is known to be digits only.
 * @throws If the id is not a string made only of digits.
 */
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
      // The script that runs before the page and builds the `window.electron` API. It is the
      // only bridge between the page and the main process (see webpack.config.preload.ts).
      preload: preloadPath,
      // Runs the page in Chromium's sandbox: it has no access to Node.js or the operating
      // system, even if a malicious script gets into the page. Possible because the preload
      // is bundled into one file. (Web security, the same-origin policy, is on by default.)
      sandbox: true,
      // Keeps the preload's code and the page's code in separate JavaScript worlds, so the
      // page cannot tamper with the preload or reach Electron through it.
      contextIsolation: true,
      // Never gives the page `require`, `process` or other Node.js APIs. The page can only
      // use what the preload exposes with `contextBridge`.
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
