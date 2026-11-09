/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios from 'axios';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { createTmdbClient, toTmdbError } from './tmdb';

jest.mock('axios');

const mockGet = jest.fn();

describe('TMDB client', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
  });

  it('should authenticate every request with the token', () => {
    createTmdbClient({ apiUrl: 'https://api.test/', token: 'secret' });

    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://api.test/',
        headers: expect.objectContaining({ Authorization: 'Bearer secret' }),
      })
    );
  });

  it('should get the config', async () => {
    mockGet.mockResolvedValueOnce({
      data: { images: { secure_base_url: 'www.test.com/' } },
    });

    const config = await createTmdbClient({
      apiUrl: 'x',
      token: 'y',
    }).getConfiguration();

    expect(config.images.secure_base_url).toBe('www.test.com/');
    expect(mockGet).toHaveBeenCalledWith('configuration');
  });

  it('should get the top movies transformed', async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        page: 1,
        results: [
          {
            id: 'movie01',
            title: 'Spiderman',
            backdrop_path: '/backdrop.png',
            poster_path: 'poster.jpg',
            vote_average: 7.6,
            release_date: '2022-01-15',
          },
        ],
      },
    });

    const data = await createTmdbClient({
      apiUrl: 'x',
      token: 'y',
    }).getTopMovies();

    expect(data.results).toEqual([
      {
        id: 'movie01',
        title: 'Spiderman',
        backdropPath: '/backdrop.png',
        posterPath: 'poster.jpg',
        voteAverage: 7.6,
        releaseDate: '2022-01-15',
      },
    ]);
  });

  it('should get the top series transformed', async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 'serie01',
            name: 'Game of Thrones',
            backdrop_path: '/backdrop.png',
            poster_path: 'poster.jpg',
            vote_average: 8,
            first_air_date: '2015-04-23',
          },
        ],
      },
    });

    const data = await createTmdbClient({
      apiUrl: 'x',
      token: 'y',
    }).getTopSeries();

    expect(data.results[0]).toMatchObject({
      id: 'serie01',
      title: 'Game of Thrones',
      releaseDate: '2015-04-23',
    });
  });

  it('should return the YouTube trailer key, or an empty string', async () => {
    const client = createTmdbClient({ apiUrl: 'x', token: 'y' });
    mockGet.mockResolvedValueOnce({
      data: {
        results: [
          { site: 'Vimeo', type: 'Trailer', key: 'no' },
          { site: 'YouTube', type: 'Trailer', key: 'abc' },
        ],
      },
    });
    expect(await client.getMovieTrailer('1')).toBe('abc');

    mockGet.mockResolvedValueOnce({ data: { results: [] } });
    expect(await client.getSerieTrailer('2')).toBe('');
  });

  it('should map a TV show to the detail shape and encode the id', async () => {
    mockGet.mockResolvedValueOnce({
      data: { id: 5, name: 'Show', first_air_date: '2020-01-01' },
    });

    const serie = await createTmdbClient({
      apiUrl: 'x',
      token: 'y',
    }).getSerie('5/../x');

    expect(serie).toMatchObject({ id: 5, title: 'Show' });
    expect(mockGet).toHaveBeenCalledWith(expect.stringContaining('5%2F..%2Fx'));
  });

  it('should reject with a plain error that does not carry the token', async () => {
    // The shape of an axios error: the request config holds the Authorization header.
    mockGet.mockRejectedValueOnce({
      message: 'Request failed with status code 401',
      config: { headers: { Authorization: 'Bearer secret' } },
      response: {
        status: 401,
        data: { status_message: 'Invalid API key' },
      },
    });

    const error = (await createTmdbClient({ apiUrl: 'x', token: 'secret' })
      .getConfiguration()
      .catch((e: Error) => e)) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(
      'TMDB request "configuration" failed with status 401: Invalid API key'
    );
    expect(JSON.stringify(error)).not.toContain('secret');
    expect(Object.keys(error)).toEqual([]);
  });

  it('should describe a request that failed without a response', () => {
    expect(toTmdbError('movie/1', new Error('socket hang up')).message).toBe(
      'TMDB request "movie/1" failed: socket hang up'
    );
    expect(toTmdbError('movie/1', undefined).message).toBe(
      'TMDB request "movie/1" failed: unknown error'
    );
  });
});
