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
  vote_average: number;
  release_date: string;
};
export type Serie = {
  id: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
};

export {};
