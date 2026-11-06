# electron-theater
How many times you sit on your couch and has no idea what to watch and end up scrolling Nexflix endlessly?

Well, scroll no more!

This app will let you mark your favorite movies and tv shows from your streaming subscription, and when your partner likes the same movie you will have a MATCH!
That will create a shared list with all the things you both like, and reduce the time to decide what to watch next time you both have some time to relax.

It's like a Tinder, but for movies!

![Matcher app](https://i.imgur.com/mrQ0Rd0.jpg)


## How to run it
1. Get the source
2. Install dependencies: `yarn install`
3. Create your environment file: `cp .env.example .env`, then set `APP_TOKEN` (see below)
4. Run the project: `yarn start`

## Environment variables
The app reads its settings from a `.env` file in the project root (git-ignored). `.env.example` lists every variable with an explanation:

| Variable | Required | Description |
|---|---|---|
| `API_URL` | yes | TMDB API base URL. The default in `.env.example` is correct. |
| `APP_TOKEN` | yes | Your TMDB **API Read Access Token**. [Get it here](https://www.themoviedb.org/settings/api) (free account). |

Without a valid token the app can't load movies. Restart `yarn start` after changing `.env`.

## Roadmap
The project is being revived. See [docs/ROADMAP.md](docs/ROADMAP.md) for the plan, milestones, and how work is organized.
