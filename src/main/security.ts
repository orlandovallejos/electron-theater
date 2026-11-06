/**
 * Pure helpers for the main process security checks, so they can be unit tested without Electron.
 */

// Hosts the app may open in the user's browser. Everything else is denied.
export const ALLOWED_EXTERNAL_HOSTS: readonly string[] = [
  'www.themoviedb.org',
  'www.youtube.com',
  'youtu.be',
];

const parse = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

/** True when `url` is an https URL on an allow-listed host (no credentials in the URL). */
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
 * True when `url` is the app's own page. `appUrl` is where the window was loaded from: the dev
 * server in development, a local file in production. Query and hash are ignored (client routing).
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
