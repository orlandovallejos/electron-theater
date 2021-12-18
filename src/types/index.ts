declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        getEnvVars(): {
          API_URL: string;
          APP_TOKEN: string;
        };
      };
    };
  }
}

export type Movie = {
  id: string;
  title: string;
};

export {};
