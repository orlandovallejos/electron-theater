const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const convertBigNumberToReadable = (labelValue: string | number) => {
  const bigNumber = Math.abs(Number(labelValue));

  if (bigNumber >= 1.0e9) {
    return `${(bigNumber / 1.0e9).toFixed(2)} B`;
  }
  if (bigNumber >= 1.0e6) {
    return `${(bigNumber / 1.0e6).toFixed(2)} M`;
  }
  if (bigNumber >= 1.0e3) {
    return `${(bigNumber / 1.0e3).toFixed(2)} K`;
  }

  return bigNumber;
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default {
  randomIntFromInterval,
  convertBigNumberToReadable,
};
