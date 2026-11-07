/**
 * Pure helpers for the main process security checks, so they can be unit tested without Electron.
 */

/**
 * Hosts the app may open in the user's browser; every other link is denied.
 * - `www.youtube.com` and `youtu.be`: links that the trailer player (a YouTube embed) may open,
 *   such as "Watch on YouTube" or sharing links.
 * - `www.themoviedb.org`: the data and artwork come from TMDB, which asks apps to credit it.
 *   The app has no link to TMDB yet, so this entry is only for when it gets one.
 * Hosts are matched exactly, so subdomains and look-alike domains are not allowed.
 */
export const ALLOWED_EXTERNAL_HOSTS: readonly string[] = [
  'www.themoviedb.org',
  'www.youtube.com',
  'youtu.be',
];

/**
 * Parses a URL without throwing.
 *
 * @param url - The text to parse.
 * @returns The parsed URL, or `null` when the text is not a valid absolute URL.
 */
const parse = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

/**
 * Tells whether a URL may be opened in the user's browser.
 * Only `https` URLs on a host from {@link ALLOWED_EXTERNAL_HOSTS} pass, and URLs that carry
 * a user name or password (`https://user:pass@host`) are refused.
 *
 * @param url - The URL the page asked to open (for example from `window.open`).
 * @returns `true` when it is safe to hand to `shell.openExternal`.
 */
export const isAllowedExternalUrl = (url: string): boolean => {
  const parsed = parse(url);
  return (
    parsed !== null &&
    parsed.protocol === 'https:' &&
    parsed.username === '' &&
    parsed.password === '' &&
    ALLOWED_EXTERNAL_HOSTS.includes(parsed.hostname)
  );
};

/**
 * Tells whether a URL is the app's own page.
 * In development that means the same origin as the dev server; in production it means the
 * exact same local file. The query string and hash are ignored, because the app changes them
 * when it navigates between screens.
 *
 * @param url - The URL to check (for example the page that sent an IPC message). May be
 *   missing, for instance when the sending frame no longer exists.
 * @param appUrl - Where the app window was loaded from.
 * @returns `true` only when `url` points at the app page.
 */
export const isAppUrl = (url: string | undefined, appUrl: string): boolean => {
  const candidate = url ? parse(url) : null;
  const app = parse(appUrl);
  if (!candidate || !app || candidate.protocol !== app.protocol) {
    return false;
  }
  return app.protocol === 'file:'
    ? candidate.pathname === app.pathname
    : candidate.origin === app.origin;
};
