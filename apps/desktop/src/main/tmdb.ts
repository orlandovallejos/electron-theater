/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios from 'axios';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { MovieItem, MovieViewItem, tmdbTransforms } from '@movie-mates/core';

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

type RequestError = {
  message?: string;
  response?: { status?: number; data?: { status_message?: string } };
};

/**
 * Turns a failed request into a plain error with only the path, the status and TMDB's message.
 * An axios error carries the request config, including the `Authorization` header, and Electron
 * prints the whole error when an IPC handler throws, so passing it on would log the token.
 */
export const toTmdbError = (url: string, error: unknown): Error => {
  const { message, response } = (error ?? {}) as RequestError;
  const status = response?.status ? ` with status ${response.status}` : '';
  const detail = response?.data?.status_message ?? message ?? 'unknown error';
  return new Error(`TMDB request "${url}" failed${status}: ${detail}`);
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
  const get = async (url: string) => {
    try {
      return (await http.get(url)).data;
    } catch (error) {
      throw toTmdbError(url, error);
    }
  };

  return {
    getConfiguration: (): Promise<{ images: { secure_base_url: string } }> =>
      get('configuration'),

    getTopMovies: async (): Promise<{ results: MovieItem[] }> => {
      const data = await get(
        'discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
      );
      return {
        ...data,
        results: data.results.map(tmdbTransforms.transformMovie),
      };
    },

    getTopSeries: async (): Promise<{ results: MovieItem[] }> => {
      const data = await get(
        'discover/tv?language=en-US&with_original_language=en&sort_by=popularity.desc&include_adult=false&page=1'
      );
      return {
        ...data,
        results: data.results.map(tmdbTransforms.transformSerie),
      };
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
