// const SIZES = {
//   SM: 'small',
//   MD: 'medium',
//   LG: 'large',
//   ORIGINAL: 'original',
// };

let baseURL = '';
// let backdropSizes = [];
// let posterSizes = [];

type SetBaseURLParam = {
  url: string;
  // backdropSizes: string[];
  // posterSizes: string[];
};
const setBaseURL = (params: SetBaseURLParam) => {
  baseURL = params.url;
  // backdropSizes = params.backdropSizes;
  // posterSizes = params.posterSizes;
};

const getBackdropImage = (path: string): string => {
  // 0: "w300"
  // 1: "w780"
  // 2: "w1280"
  // 3: "original"
  const size = 'w1280';
  return `${baseURL}${size}${path}`;
};
const getPosterImage = (path: string): string => {
  // 0: "w92"
  // 1: "w154"
  // 2: "w185"
  // 3: "w342"
  // 4: "w500"
  // 5: "w780"
  // 6: "original"
  const size = 'w780';
  return `${baseURL}${size}${path}`;
};

export default {
  // SIZES,
  setBaseURL,
  getBackdropImage,
  getPosterImage,
};
