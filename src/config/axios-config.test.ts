/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios, { AxiosAdapter, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://api.example.com/3/';

// The module reads the env vars when it is imported, so they must exist first.
jest.mock('../helpers/electron', () => ({
  __esModule: true,
  default: {
    getEnvVars: () => ({
      API_URL: 'https://api.example.com/3/',
      APP_TOKEN: 'test-token',
    }),
  },
}));

describe('axios config', () => {
  let sentConfig: InternalAxiosRequestConfig | undefined;
  const originalAdapter = axios.defaults.adapter;

  beforeAll(async () => {
    // Imported here so the mock above is in place.
    const axiosConfig = (await import('./axios-config')).default;
    axiosConfig.setup();

    // Replaces the network: records the final request config and returns a fake response.
    const fakeAdapter: AxiosAdapter = (config) => {
      sentConfig = config;
      return Promise.resolve({
        data: { ok: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    };
    axios.defaults.adapter = fakeAdapter;
  });

  afterAll(() => {
    axios.defaults.adapter = originalAdapter;
  });

  it('uses the API url as the base url', async () => {
    await axios.get('movie/1');

    expect(sentConfig?.baseURL).toBe(BASE_URL);
  });

  it('sends the token as a bearer Authorization header', async () => {
    await axios.get('movie/1');

    expect(sentConfig?.headers.get('Authorization')).toBe('Bearer test-token');
    expect(sentConfig?.headers.get('Content-Type')).toBe(
      'application/json;charset=utf-8'
    );
  });

  it('returns only the response data', async () => {
    const response = await axios.get('movie/1');

    expect(response).toEqual({ ok: true });
  });
});
