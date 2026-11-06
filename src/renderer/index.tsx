import React from 'react';
import { createRoot } from 'react-dom/client';
// import axios from 'axios';
import App from './App';
import axiosConfig from '../config/axios-config';

axiosConfig.setup();

// axios
//   .get('movie/76341')
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));

// axios
//   .get(
//     'discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1'
//   )
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));
// axios
//   .get(
//     'discover/tv?language=en-US&sort_by=popularity.desc&include_adult=false&page=1'
//   )
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));

const container = document.getElementById('root');
if (!container) {
  throw new Error('The root element was not found');
}
createRoot(container).render(<App />);
