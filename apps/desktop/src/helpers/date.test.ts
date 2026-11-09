import dateHelper from './date';

describe('Date helper', () => {
  it('should format a date as month/day/year', () => {
    expect(dateHelper.getFormattedDate('2018-05-15T12:00:00')).toBe(
      '5/15/2018'
    );
  });

  it('should turn a locale into a language name', () => {
    expect(dateHelper.getLanguageFromLocale('en')).toBe('English');
    expect(dateHelper.getLanguageFromLocale('es')).toBe('Spanish');
  });
});
