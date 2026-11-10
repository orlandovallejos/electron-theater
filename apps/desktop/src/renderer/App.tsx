/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { imageHelper } from '@movie-mates/core';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Layout from './Layout';
// Styles
import './App.global.css';
// Api
import moviesApi from '../api/Movies';
// Theme
import defaultTheme from './themes/default';

const App = () => {
  const [isDone, setDone] = React.useState<boolean>(false);
  React.useEffect(() => {
    async function getConfiguration() {
      const data = await moviesApi.getConfiguration();
      imageHelper.setBaseURL({
        url: data.images.secure_base_url,
      });

      setDone(true);
    }
    getConfiguration();
  }, []);

  if (!isDone) {
    return null;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Layout />
    </ThemeProvider>
  );
};

export default App;
