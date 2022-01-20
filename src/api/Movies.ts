/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios from 'axios';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { MovieItem } from '../types';
import apiHelper from './helper';

type GetConfigurationResponse = {
  images: {
    base_url: string;
  };
};
const getConfiguration = (): Promise<GetConfigurationResponse> => {
  return axios.get('configuration');
};

type GetTopMoviesResponse = {
  results: MovieItem[];
};
const getTopMovies = (): Promise<GetTopMoviesResponse> => {
  return axios.get(
    'discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1',
    {
      transformResponse: [
        (data) => {
          const dataJSON = JSON.parse(data);
          const items: MovieItem[] = [];
          const { results } = dataJSON;

          for (let index = 0; index < results.length; index += 1) {
            const element = results[index];
            items.push(apiHelper.transformMovie(element));
          }
          return {
            ...dataJSON,
            results: items,
          };
        },
      ],
    }
  );
};

type GetTopSeriesResponse = {
  results: MovieItem[];
};
const getTopSeries = (): Promise<GetTopSeriesResponse> => {
  return axios.get(
    'discover/tv?language=en-US&sort_by=popularity.desc&include_adult=false&page=1',
    {
      transformResponse: [
        (data) => {
          const dataJSON = JSON.parse(data);
          const items: MovieItem[] = [];
          const { results } = dataJSON;

          for (let index = 0; index < results.length; index += 1) {
            const element = results[index];
            items.push(apiHelper.transformSerie(element));
          }
          return {
            ...dataJSON,
            results: items,
          };
        },
      ],
    }
  );
};

export default {
  getConfiguration,
  getTopMovies,
  getTopSeries,
};
