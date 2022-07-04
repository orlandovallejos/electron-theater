const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    getEnvVars() {
      return ipcRenderer.sendSync('get-env-vars', 'ping');
    },
    closeApp() {
      return ipcRenderer.send('close-app');
    },
    maximizeApp() {
      return ipcRenderer.send('maximize-app');
    },
    minimizeApp() {
      return ipcRenderer.send('minimize-app');
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
