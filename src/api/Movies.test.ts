/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios from 'axios';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import moviesApi from './Movies';

jest.mock('axios');

describe('<App />', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should get the config', async () => {
    const mockedResponse = {
      images: {
        base_url: 'www.test.com/',
      },
    };
    axios.get = jest.fn().mockResolvedValueOnce(mockedResponse);

    const config = await moviesApi.getConfiguration();
    expect(config.images.base_url).toBe(mockedResponse.images.base_url);
  });

  it('should get the top movies', async () => {
    const mockedResponse = {
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
    };
    axios.get = jest.fn().mockResolvedValueOnce(mockedResponse);

    const config = await moviesApi.getTopMovies();
    expect(config.results.length).toBe(1);
    expect(config.results[0].id).toBe('movie01');
  });

  it('should get the top series', async () => {
    const mockedResponse = {
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
    };
    axios.get = jest.fn().mockResolvedValueOnce(mockedResponse);

    const config = await moviesApi.getTopSeries();
    expect(config.results.length).toBe(1);
    expect(config.results[0].id).toBe('serie01');
  });
});
