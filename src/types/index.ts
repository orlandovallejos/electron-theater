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
  backdrop_path: string;
  poster_path: string;
};

export {};
