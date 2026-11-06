/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios from 'axios';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { MovieItem, MovieViewItem } from '../types';
import transforms from './tmdbTransforms';

type TmdbOptions = {
  apiUrl: string;
  token: string;
};

type Video = { site?: string; type?: string; key?: string };

const findTrailerKey = (data: { results?: Video[] }): string => {
  const trailer = (data.results || []).find(
    (item) => item.site === 'YouTube' && item.type === 'Trailer'
  );
  return trailer?.key ?? '';
};

/**
 * TMDB client. It lives in the main process, so the token never reaches the renderer.
 */
export const createTmdbClient = ({ apiUrl, token }: TmdbOptions) => {
  const http = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const get = async (url: string) => (await http.get(url)).data;

  return {
    getConfiguration: (): Promise<{ images: { base_url: string } }> =>
      get('configuration'),

    getTopMovies: async (): Promise<{ results: MovieItem[] }> => {
      const data = await get(
        'discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
      );
      return { ...data, results: data.results.map(transforms.transformMovie) };
    },

    getTopSeries: async (): Promise<{ results: MovieItem[] }> => {
      const data = await get(
        'discover/tv?language=en-US&with_original_language=en&sort_by=popularity.desc&include_adult=false&page=1'
      );
      return { ...data, results: data.results.map(transforms.transformSerie) };
    },

    getMovie: (movieId: string): Promise<MovieViewItem> =>
      get(
        `movie/${encodeURIComponent(
          movieId
        )}?append_to_response=credits,keywords,similar`
      ),

    getMovieTrailer: async (movieId: string): Promise<string> =>
      findTrailerKey(await get(`movie/${encodeURIComponent(movieId)}/videos`)),

    getSerie: async (serieId: string): Promise<MovieViewItem> => {
      const data = await get(
        `tv/${encodeURIComponent(
          serieId
        )}?append_to_response=credits,keywords,similar`
      );
      return {
        id: data.id,
        title: data.name,
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path,
        vote_average: data.vote_average,
        release_date: data.first_air_date,
        tagline: data.tagline,
        overview: data.overview,
        original_language: data.original_language,
        budget: data.budget,
        revenue: data.revenue,
      } as MovieViewItem;
    },

    getSerieTrailer: async (serieId: string): Promise<string> =>
      findTrailerKey(await get(`tv/${encodeURIComponent(serieId)}/videos`)),
  };
};

export type TmdbClient = ReturnType<typeof createTmdbClient>;
