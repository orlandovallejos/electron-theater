import axios from 'axios';
import { Movie } from '../../types';

type GetTopMoviesResponse = {
  results: Movie[];
};

const getTopMovies = (): Promise<GetTopMoviesResponse> => {
  return axios.get(
    'discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
  );
};

export default { getTopMovies };
