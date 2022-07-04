const getEnvVars = () => {
  return window.electron.ipcRenderer.getEnvVars();
};

/*------------------------------------------------*/
/* EXPORT
/*------------------------------------------------*/
export default {
  getEnvVars,
};
