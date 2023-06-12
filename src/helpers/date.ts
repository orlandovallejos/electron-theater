const getFormattedDate = (date: string): string => {
  const dateObject = new Date(date);

  return `${
    dateObject.getMonth() + 1
  }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
};

const getLanguageFromLocale = (locale) => {
  const languageNames = new Intl.DisplayNames(['en'], {
    type: 'language',
  });

  return languageNames.of(locale);
};

export default {
  getFormattedDate,
  getLanguageFromLocale,
};
