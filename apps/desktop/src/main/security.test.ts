import { isAllowedExternalUrl, isAppUrl } from './security';

describe('isAllowedExternalUrl', () => {
  it.each([
    'https://www.themoviedb.org/movie/603',
    'https://www.youtube.com/watch?v=abc',
    'https://youtu.be/abc',
  ])('allows %s', (url) => {
    expect(isAllowedExternalUrl(url)).toBe(true);
  });

  it.each([
    'http://www.themoviedb.org/movie/603',
    'https://evil.example.com/',
    'https://www.themoviedb.org.evil.example.com/',
    'https://user:pass@www.themoviedb.org/',
    'file:///etc/passwd',
    // eslint-disable-next-line no-script-url
    'javascript:alert(1)',
    'ms-msdt:/id',
    'not a url',
    '',
  ])('denies %s', (url) => {
    expect(isAllowedExternalUrl(url)).toBe(false);
  });
});

describe('isAppUrl', () => {
  const devUrl = 'http://localhost:1212/index.html';
  const fileUrl = 'file:///Applications/Theater/dist/renderer/index.html';

  it('accepts the dev server origin, ignoring path, query and hash', () => {
    expect(isAppUrl('http://localhost:1212/index.html#/movie/1', devUrl)).toBe(
      true
    );
    expect(isAppUrl('http://localhost:1212/', devUrl)).toBe(true);
  });

  it('rejects other origins in development', () => {
    expect(isAppUrl('http://localhost:9999/index.html', devUrl)).toBe(false);
    expect(isAppUrl('https://localhost:1212/index.html', devUrl)).toBe(false);
  });

  it('accepts only the app page for file URLs, ignoring query and hash', () => {
    expect(isAppUrl(`${fileUrl}#/home`, fileUrl)).toBe(true);
    expect(isAppUrl(`${fileUrl}?x=1`, fileUrl)).toBe(true);
  });

  it('rejects other files and schemes', () => {
    expect(isAppUrl('file:///etc/passwd', fileUrl)).toBe(false);
    expect(isAppUrl('https://www.youtube-nocookie.com/embed/x', fileUrl)).toBe(
      false
    );
  });

  it('rejects missing or invalid URLs', () => {
    expect(isAppUrl(undefined, fileUrl)).toBe(false);
    expect(isAppUrl('', fileUrl)).toBe(false);
    expect(isAppUrl('nope', fileUrl)).toBe(false);
  });
});
