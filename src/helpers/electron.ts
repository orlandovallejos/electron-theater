const getEnvVars = () => {
  return window.electron.ipcRenderer.getEnvVars();
};

const closeApp = () => {
  return window.electron.ipcRenderer.closeApp();
};

const maximizeApp = () => {
  return window.electron.ipcRenderer.maximizeApp();
};
const minimizeApp = () => {
  return window.electron.ipcRenderer.minimizeApp();
};

/*------------------------------------------------*/
/* EXPORT
/*------------------------------------------------*/
export default {
  getEnvVars,
  closeApp,
  maximizeApp,
  minimizeApp,
};
