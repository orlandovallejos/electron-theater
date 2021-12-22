import axios from 'axios';
import { Movie, Serie } from '../types';

type GetConfigurationResponse = {
  images: {
    base_url: string;
  };
};
const getConfiguration = (): Promise<GetConfigurationResponse> => {
  return axios.get('configuration');
};

type GetTopMoviesResponse = {
  results: Movie[];
};
const getTopMovies = (): Promise<GetTopMoviesResponse> => {
  return axios.get(
    'discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
  );
};

type GetTopSeriesResponse = {
  results: Serie[];
};
const getTopSeries = (): Promise<GetTopSeriesResponse> => {
  return axios.get(
    'discover/tv?language=en-US&sort_by=popularity.desc&include_adult=false&page=1'
  );
};

export default {
  getConfiguration,
  getTopMovies,
  getTopSeries,
};
