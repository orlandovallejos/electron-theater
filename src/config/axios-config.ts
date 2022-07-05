/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import axios from 'axios';
import _get from 'lodash/get';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import electronHelper from 'helpers/electron';

// Get environment variables:
const envVars = electronHelper.getEnvVars();
const apiURL = envVars.API_URL;
const myToken = envVars.APP_TOKEN;

const setup = () => {
  // Setup base url:
  axios.defaults.baseURL = apiURL;

  // Request interceptor:
  axios.interceptors.request.use(
    (config) => {
      try {
        // To avoid mutate the object.
        const clonedConfig = { ...config };

        // To cancel a request:
        // https://stackoverflow.com/questions/44852054/cant-cancel-axios-post-request-via-canceltoken
        if (!clonedConfig.url) {
          clonedConfig.cancelToken = new axios.CancelToken((cancel) =>
            cancel('Cancel repeated request')
          );
        }
        if (myToken) {
          clonedConfig.headers = {
            Authorization: `Bearer ${myToken}`,
            'Content-Type': 'application/json;charset=utf-8',
          };
        }

        return clonedConfig;
      } catch (catchedError) {
        return Promise.reject(catchedError);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const errorResponse = _get(error, 'response');

      return Promise.reject(errorResponse);
    }
  );
};

export default {
  setup,
};
