import moviesApi from './Movies';

describe('Movies api', () => {
  const tmdb = {
    getConfiguration: jest.fn(),
    getTopMovies: jest.fn(),
    getTopSeries: jest.fn(),
    getMovie: jest.fn(),
    getMovieTrailer: jest.fn(),
    getSerie: jest.fn(),
    getSerieTrailer: jest.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(window, 'electron', {
      value: { tmdb },
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([['getConfiguration'], ['getTopMovies'], ['getTopSeries']] as const)(
    'should call %s on the preload api',
    async (name) => {
      tmdb[name].mockResolvedValue({ ok: name });

      await expect(moviesApi[name]()).resolves.toEqual({ ok: name });
      expect(tmdb[name]).toHaveBeenCalledWith();
    }
  );

  it.each([
    ['getMovie'],
    ['getMovieTrailer'],
    ['getSerie'],
    ['getSerieTrailer'],
  ] as const)('should call %s with the id', async (name) => {
    tmdb[name].mockResolvedValue({ ok: name });

    await expect(moviesApi[name]('42')).resolves.toEqual({ ok: name });
    expect(tmdb[name]).toHaveBeenCalledWith('42');
  });
});
