/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Layout from './Layout';
// Styles
import './App.global.css';
// Api
import moviesApi from '../api/Movies';
// Helpers
import imageHelper from '../helpers/image';

const App = () => {
  const [isDone, setDone] = React.useState<boolean>(false);
  React.useEffect(() => {
    async function getConfiguration() {
      const data = await moviesApi.getConfiguration();
      imageHelper.setBaseURL({
        url: data.images.base_url,
      });

      setDone(true);
    }
    getConfiguration();
  }, []);

  if (!isDone) {
    return null;
  }
  return <Layout />;
};

export default App;
