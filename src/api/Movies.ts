/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios from 'axios';
import _get from 'lodash/get';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { MovieItem, MovieViewItem } from '../types';
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
    'discover/tv?language=en-US&with_original_language=en&sort_by=popularity.desc&include_adult=false&page=1',
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

const getMovie = (movieId: string): Promise<MovieViewItem> => {
  return axios.get(
    `movie/${movieId}?append_to_response=credits,keywords,similar`,
    {
      transformResponse: [
        (data) => {
          const dataJSON = JSON.parse(data);
          return dataJSON;
        },
      ],
    }
  );
};

const getMovieTrailer = (movieId: string): Promise<string> => {
  return axios.get(`movie/${movieId}/videos`, {
    transformResponse: [
      (data) => {
        const dataJSON = JSON.parse(data);
        const trailer = dataJSON.results.find(
          (item) =>
            _get(item, 'site') === 'YouTube' && _get(item, 'type') === 'Trailer'
        );
        return _get(trailer, 'key', '');
      },
    ],
  });
};

const getSerie = (serieId: string): Promise<MovieViewItem> => {
  return axios.get(
    `tv/${serieId}?append_to_response=credits,keywords,similar`,
    {
      transformResponse: [
        (data) => {
          const dataJSON = JSON.parse(data);
          return {
            id: dataJSON.id,
            title: dataJSON.name,
            backdrop_path: dataJSON.backdrop_path,
            poster_path: dataJSON.poster_path,
            vote_average: dataJSON.vote_average,
            release_date: dataJSON.first_air_date,
            tagline: dataJSON.tagline,
            overview: dataJSON.overview,
            original_language: dataJSON.original_language,
            budget: dataJSON.budget,
            revenue: dataJSON.revenue,
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
  getMovie,
  getMovieTrailer,
  getSerie,
};
