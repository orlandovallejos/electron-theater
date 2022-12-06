const getFormattedDate = (date: string): string => {
  const dateObject = new Date(date);

  return `${
    dateObject.getMonth() + 1
  }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
};

export default {
  getFormattedDate,
};
