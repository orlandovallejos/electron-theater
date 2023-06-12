const { contextBridge, ipcRenderer } = require('electron');
const appEventsConstants = require('../constants/appEvents.mts');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    getEnvVars() {
      return ipcRenderer.sendSync(appEventsConstants.GET_ENV_VARS, 'ping');
    },
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
