/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { Movie, Serie } from 'types';
import apiHelper from './helper';

describe('Api helper', () => {
  it('should receive a Movie and return a MovieItem', () => {
    const movie: Movie = {
      id: '1',
      title: 'My movie',
      backdrop_path: 'backdrop path',
      poster_path: 'poster path',
      vote_average: 4,
      release_date: '2020-05-16',
    };
    const movieItem = apiHelper.transformMovie(movie);

    expect(movieItem.backdropPath).toBe(movie.backdrop_path);
    expect(movieItem.posterPath).toBe(movie.poster_path);
  });

  it('should receive a Serie and return a MovieItem', () => {
    const serie: Serie = {
      id: '1',
      name: 'My TV show',
      backdrop_path: 'backdrop path',
      poster_path: 'poster path',
      vote_average: 4,
      first_air_date: '2020-05-16',
    };
    const movieItem = apiHelper.transformSerie(serie);

    expect(movieItem.backdropPath).toBe(serie.backdrop_path);
    expect(movieItem.posterPath).toBe(serie.poster_path);
    expect(movieItem.releaseDate).toBe(serie.first_air_date);
  });
});
