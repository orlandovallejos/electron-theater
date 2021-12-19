import React from 'react';
import { render } from 'react-dom';
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

render(<App />, document.getElementById('root'));
