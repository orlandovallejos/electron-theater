import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import App from './App';
import axiosConfig from '../config/axios-config';

axiosConfig.setup();

axios
  .get('movie/76341')
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

render(<App />, document.getElementById('root'));
