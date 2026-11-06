const { contextBridge, ipcRenderer } = require('electron');
const appEventsConstants = require('../constants/appEvents.cjs');

contextBridge.exposeInMainWorld('electron', {
  tmdb: {
    getConfiguration: () =>
      ipcRenderer.invoke(appEventsConstants.TMDB_GET_CONFIGURATION),
    getTopMovies: () =>
      ipcRenderer.invoke(appEventsConstants.TMDB_GET_TOP_MOVIES),
    getTopSeries: () =>
      ipcRenderer.invoke(appEventsConstants.TMDB_GET_TOP_SERIES),
    getMovie: (id) => ipcRenderer.invoke(appEventsConstants.TMDB_GET_MOVIE, id),
    getMovieTrailer: (id) =>
      ipcRenderer.invoke(appEventsConstants.TMDB_GET_MOVIE_TRAILER, id),
    getSerie: (id) => ipcRenderer.invoke(appEventsConstants.TMDB_GET_SERIE, id),
    getSerieTrailer: (id) =>
      ipcRenderer.invoke(appEventsConstants.TMDB_GET_SERIE_TRAILER, id),
  },
  ipcRenderer: {
    closeApp() {
      return ipcRenderer.send(appEventsConstants.CLOSE_APP);
    },
    fullScreenApp() {
      return ipcRenderer.send(appEventsConstants.FULL_SCREEN_APP);
    },
    maximizeApp() {
      return ipcRenderer.send(appEventsConstants.MAXIMIZE_APP);
    },
    minimizeApp() {
      return ipcRenderer.send(appEventsConstants.MINIMIZE_APP);
    },
    on(channel, func) {
      const validChannels = ['get-env-vars-reply'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
