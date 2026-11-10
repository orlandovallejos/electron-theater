# Product requirements

What Movie Mates does, for whom, on which clients, and when each part ships. This is the entry point: the
user stories for each area are in [`features/`](#where-the-stories-are), and the wireframes and the M7 backend
are designed from them.

- The idea and the plan: [roadmap](../ROADMAP.md), in particular
  [How likes, lists and matches work](../ROADMAP.md#how-likes-lists-and-matches-work).
- How it looks: [design principles and component inventory](../design/README.md).
- Technical decisions: [ADRs](../adr/README.md). This document holds product decisions only.

**Contents**

1. [Who it's for](#1-who-its-for)
2. [Glossary](#2-glossary)
3. [Conventions](#3-conventions)
4. [Feature map](#4-feature-map)
5. [Not now](#5-not-now)
6. [Decisions](#6-decisions)
7. [Open questions](#7-open-questions)
8. [Where the stories are](#where-the-stories-are)

---

## 1. Who it's for

People who watch movies and shows with someone else and lose the evening choosing. Two scenarios guide every
design choice:

**Two people after dinner.** Sam and Alex live together. On Tuesday Sam sees a trailer on the bus and taps the
heart. On Thursday Alex likes the same film while scrolling at lunch. Neither knows about the other's Likes.
On Friday after dinner they open their shared list, see three titles they both want, and one of them taps
"pick one for us". They're watching in two minutes.

**A sibling in another city.** Jo and their brother watch the same series on different continents and talk
about it on the phone. Jo sends him an invite link in their usual chat app. He signs in with Google, accepts,
and their shared list fills in from what each of them has already liked. Jo's matches with Sam are on a
different list, and their brother never sees it.

What both scenarios need: liking is quick and private, connecting takes consent, and the shared list only
ever shows titles both people chose.

## 2. Glossary

Use these words, with these meanings, in stories, wireframes, issues and the interface.

| Term                  | Meaning                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Title**             | A movie or a TV show, as TMDB describes it. Not a season or an episode.                                                                    |
| **Like**              | Tapping the heart on a title. A Like is private: nobody else ever sees it.                                                                 |
| **Likes**             | Your one list of liked titles. The only list the app uses to find matches.                                                                 |
| **Your own list**     | A list you create and name ("Horror to watch alone"). Private, saved to your account, never used for matching. You can have many.          |
| **Connection**        | Two people who agreed to compare Likes. Made by an invite, ended by either person.                                                         |
| **Invite**            | A single-use link (and QR code on the phone) that asks someone to connect with you. Expires after 7 days.                                  |
| **Match**             | A title both people in a connection like. The only way one person learns about another's Like.                                             |
| **Shared match list** | The list of matches for one connection. Each connection has exactly one, and only its two people can see it. It has a **Watched** section. |
| **Watched together**  | A mark on a match that moves it to the Watched section of that shared list. It doesn't change anyone's Likes.                              |
| **Signed out**        | Not signed in to an account. The only screen is the welcome screen.                                                                        |
| **Client**            | One of the three apps: **D** desktop (Electron), **W** web (browser), **M** mobile (phone, Expo).                                          |
| **First version**     | Everything the M11 release ships. **Later** means after M11.                                                                               |

## 3. Conventions

### Story IDs

Every story has an ID: an area prefix and a number, such as `AUTH-3`. Wireframes, issues, pull requests and
tests refer to stories by ID, so:

- IDs are never reused or renumbered. A story that's dropped stays in its file, marked **Removed**, with the
  reason.
- New stories take the next free number in their area, wherever they go in the file.

| Prefix    | Area                                             | File                                                        |
| --------- | ------------------------------------------------ | ----------------------------------------------------------- |
| `AUTH`    | Welcome, sign-in, sign-out, account deletion     | [accounts.md](features/accounts.md)                         |
| `ONBOARD` | First sign-in: genres, first Likes, first invite | [accounts.md](features/accounts.md)                         |
| `HOME`    | Home screen                                      | [browse.md](features/browse.md)                             |
| `SEARCH`  | Search for titles and people                     | [browse.md](features/browse.md)                             |
| `TITLE`   | The title page and the trailer                   | [browse.md](features/browse.md)                             |
| `PERSON`  | The person page                                  | [browse.md](features/browse.md)                             |
| `LIKE`    | The heart and the Likes screen                   | [likes-and-lists.md](features/likes-and-lists.md)           |
| `LIST`    | Your own lists                                   | [likes-and-lists.md](features/likes-and-lists.md)           |
| `INVITE`  | Sending, accepting and declining invites         | [matching.md](features/matching.md)                         |
| `CONN`    | Connections                                      | [matching.md](features/matching.md)                         |
| `MATCH`   | Shared match lists                               | [matching.md](features/matching.md)                         |
| `NOTIF`   | Notifications                                    | [matching.md](features/matching.md)                         |
| `PROFILE` | Your profile                                     | [profile-and-settings.md](features/profile-and-settings.md) |
| `SET`     | Settings and About                               | [profile-and-settings.md](features/profile-and-settings.md) |

### Story format

Each story is a short heading, one sentence in the "As a …, I want …, so that …" form, a line of fields and a
checklist of acceptance criteria:

```markdown
### LIKE-1 · Like a title from its poster

As a signed-in person, I want to tap the heart on a poster, so that I can save a title without opening it.

**Clients:** D W M · **Release:** first version · **Milestone:** M6

- [ ] The heart fills at once, before the server answers
- [ ] If saving fails, the heart empties again and a message says why, with Retry
- [ ] **Privacy:** no other person sees anything change
```

- **Clients** lists the clients that have the story. If a client gets it later than the others, the milestone
  says so: `M7 (D), M8 (W), M9 (M)`.
- **Release** is `first version` or `later`.
- **Milestone** is the milestone that builds it first. Web and phone follow in M8 and M9 unless the story says
  otherwise.
- Acceptance criteria are things a person can check on screen or in a test. Vague words ("fast", "nice") go
  in the [non-functional requirements](non-functional.md) with a number instead.
- Any story that touches private data has a **Privacy:** criterion saying what must not be revealed.
- Each area file also lists its **states** (loading, empty, offline, TMDB down, failed), since
  [principle 4](../design/principles.md#4-every-state-is-designed-not-only-the-happy-one) asks for every state
  to be designed.

## 4. Feature map

One row per feature. **D W M** are the clients: ✓ in the first version, `later` after M11, a blank cell means
never. **Milestone** is where the feature is first built.

### Accounts and onboarding

| ID        | Feature                                                                | D     | W     | M     | Release       | Milestone |
| --------- | ---------------------------------------------------------------------- | ----- | ----- | ----- | ------------- | --------- |
| `AUTH`    | Welcome screen (the only signed-out screen)                            | ✓     | ✓     | ✓     | first version | M7        |
| `AUTH`    | Sign in or sign up with an email link, with a 6-digit code as fallback | ✓     | ✓     | ✓     | first version | M7        |
| `AUTH`    | Sign in with Google                                                    | ✓     | ✓     | ✓     | first version | M7        |
| `AUTH`    | Sign in with Apple (iOS)                                               |       |       | ✓     | first version | M9        |
| `AUTH`    | Sign out                                                               | ✓     | ✓     | ✓     | first version | M7        |
| `AUTH`    | Delete account                                                         | ✓     | ✓     | ✓     | first version | M7        |
| `AUTH`    | Download my data                                                       | ✓     | ✓     | ✓     | first version | M11       |
| `AUTH`    | Change email; sign out of every device                                 | later | later | later | later         | —         |
| `ONBOARD` | Onboarding: genres, first Likes (a movie and a TV show), invite        | ✓     | ✓     | ✓     | first version | M7        |

### Browsing

| ID       | Feature                                                      | D     | W     | M     | Release       | Milestone |
| -------- | ------------------------------------------------------------ | ----- | ----- | ----- | ------------- | --------- |
| `HOME`   | Home: hero and trending rows (exists today, fixed in M5)     | ✓     | ✓     | ✓     | first version | M5        |
| `HOME`   | Home rows from the genres picked in onboarding               | ✓     | ✓     | ✓     | first version | M7        |
| `SEARCH` | Search movies, TV shows and people, with results as you type | ✓     | ✓     | ✓     | first version | M5        |
| `SEARCH` | Recent searches                                              | later | later | later | later         | —         |
| `TITLE`  | Title page: details, cast, related titles, TV seasons        | ✓     | ✓     | ✓     | first version | M5        |
| `TITLE`  | Where to watch in your region (TMDB watch providers)         | ✓     | ✓     | ✓     | first version | M5        |
| `TITLE`  | Trailer                                                      | ✓     | ✓     | ✓     | first version | M5        |
| `PERSON` | Person page: photo, bio, known for                           | ✓     | ✓     | ✓     | first version | M5        |

### Likes and your own lists

| ID     | Feature                                                       | D     | W     | M     | Release       | Milestone |
| ------ | ------------------------------------------------------------- | ----- | ----- | ----- | ------------- | --------- |
| `LIKE` | The heart on posters, the hero and the title page             | ✓     | ✓     | ✓     | first version | M6        |
| `LIKE` | Likes screen: sort, filter by movie or TV, remove             | ✓     | ✓     | ✓     | first version | M6        |
| `LIKE` | Likes saved to your account instead of the device             | ✓     | ✓     | ✓     | first version | M7        |
| `LIKE` | Swipe deck: like or skip titles one card at a time            |       |       | later | later         | —         |
| `LIKE` | "Not interested": hide a title from picks and rows            | later | later | later | later         | —         |
| `LIST` | Your own lists: create, rename, delete, add and remove titles | ✓     | ✓     | ✓     | first version | M6        |
| `LIST` | Your own lists saved to your account (same on every device)   | ✓     | ✓     | ✓     | first version | M7        |
| `LIST` | Reorder titles in a list                                      | later | later | later | later         | —         |

### Connections, matches and notifications

| ID       | Feature                                                                  | D     | W     | M     | Release       | Milestone |
| -------- | ------------------------------------------------------------------------ | ----- | ----- | ----- | ------------- | --------- |
| `INVITE` | Create, share and revoke an invite link                                  | ✓     | ✓     | ✓     | first version | M7        |
| `INVITE` | Show an invite as a QR code, and scan one                                |       |       | ✓     | first version | M9        |
| `INVITE` | Accept or decline screen                                                 | ✓     | ✓     | ✓     | first version | M7        |
| `CONN`   | Connections: list, end a connection                                      | ✓     | ✓     | ✓     | first version | M7        |
| `CONN`   | Mute a connection's notifications                                        | ✓     | ✓     | ✓     | first version | M7        |
| `MATCH`  | Shared match list, newest first, with a Watched section                  | ✓     | ✓     | ✓     | first version | M7        |
| `MATCH`  | Filters: movie or TV, genre, runtime                                     | ✓     | ✓     | ✓     | first version | M7        |
| `MATCH`  | "Pick one for us"                                                        | ✓     | ✓     | ✓     | first version | M7        |
| `MATCH`  | Filter by the streaming services both people have                        | later | later | later | later         | —         |
| `NOTIF`  | Notification for a new match or an accepted invite, grouped when several | ✓     | ✓     | ✓     | first version | M7        |
| `NOTIF`  | Notification list in the app                                             | ✓     | ✓     | ✓     | first version | M7        |
| `NOTIF`  | Email notifications                                                      | later | later | later | later         | —         |

Notifications arrive as system notifications on desktop (M7), in the app on the web (M8) and as push on the
phone (M9).

### Profile and settings

| ID        | Feature                                                                  | D     | W     | M     | Release       | Milestone |
| --------- | ------------------------------------------------------------------------ | ----- | ----- | ----- | ------------- | --------- |
| `PROFILE` | Your profile: name, photo, connections, counts (only you see it)         | ✓     | ✓     | ✓     | first version | M7        |
| `SET`     | Appearance: Dark (default), Light, System                                | ✓     | ✓     | ✓     | first version | M5        |
| `SET`     | Content: language, region, hide adult titles (on the device until M7)    | ✓     | ✓     | ✓     | first version | M5        |
| `SET`     | Account and notification settings                                        | ✓     | ✓     | ✓     | first version | M7        |
| `SET`     | Your streaming services                                                  | later | later | later | later         | —         |
| `SET`     | Desktop: launch at login, update settings                                | later |       |       | later         | —         |
| `SET`     | About: version, TMDB attribution, open source licenses, report a problem | ✓     | ✓     | ✓     | first version | M5        |
| `SET`     | Privacy policy and terms                                                 | ✓     | ✓     | ✓     | first version | M11       |
| `SET`     | Interface in other languages                                             | later | later | later | later         | —         |

### Beyond these areas

| ID  | Feature                                      | D   | W   | M   | Release       | Milestone |
| --- | -------------------------------------------- | --- | --- | --- | ------------- | --------- |
| —   | "What should we watch tonight?" AI assistant | ✓   | ✓   | ✓   | first version | M10       |

The assistant's stories are written before M10, once the match list exists. The open question about what the
desktop app is for (see the [roadmap](../ROADMAP.md#open-question-what-is-the-desktop-app-for)) may add
desktop-only features later.

## 5. Not now

Ideas we decided not to build, with the reason, so they aren't proposed again every month. Each can be
reopened if the reason stops being true. "Later" features are in the map above, not here.

| Idea                                             | Why not                                                                                                                                                                          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Passwords (and forgot, reset, change password)   | Email links and Google cover sign-in without a secret to remember, reset or leak. See [decision 1](#6-decisions).                                                                |
| Browsing while signed out, or a guest mode       | Every feature beyond browsing needs an account, and two ways to use the app means two sets of states to design and test.                                                         |
| Searching for people, usernames, public profiles | Connecting is by invite only, so nobody can be found or contacted without being given a link.                                                                                    |
| Seeing a connection's Likes or your own lists    | It would break the one promise the app makes. Matches are the only overlap anyone sees.                                                                                          |
| Group lists (three or more people)               | One list per pair already covers a household. A group list raises rules nobody needs yet (must everyone like it, or most?) and every extra person is another way to infer Likes. |
| Chat or comments on a match                      | People already talk in their own messaging apps. Chat brings moderation, reporting and safety work that isn't the problem we're solving.                                         |
| Ratings, reviews, a feed of what others watch    | TMDB already has ratings, and a feed is the opposite of private Likes.                                                                                                           |
| Swiping together live, at the same time          | Liking happens whenever it suits each person; that's the point. See the roadmap's "No live session needed".                                                                      |
| Playing movies or shows in the app               | We don't have the rights. "Where to watch" sends you to the service that does. (Local video files may come back with the desktop question.)                                      |
| Moving M6's device-only Likes into the account   | M6 is before any release, so there are no real users to move. See [decision 2](#6-decisions).                                                                                    |
| Ads, tracking, selling data                      | The app holds private preferences. Collecting more than it needs would undermine the reason to trust it.                                                                         |

## 6. Decisions

Product decisions settled before the stories were written, each with its reason. A technical decision (which
auth provider, which database) goes in an ADR instead. To change one, edit it here in its own pull request
and say why in the description.

1. **No passwords.** Sign in with an email link, or the 6-digit code from the same email when the link opens on
   another device, or with Google. Apple sign-in is added for iOS in M9, because the App Store requires it when
   an app offers Google sign-in. _Why:_ there's no password to forget, reset or leak, and the same flow covers
   signing up and signing in.
2. **An account is needed to use the app.** The only signed-out screen is the welcome screen. Likes saved on
   the device in M6 aren't moved into the account. _Why:_ matching needs an account, and one way to use the
   app keeps the screens and states simple. M6 comes before any release, so there's nobody to migrate.
3. **Onboarding is full screen, on the first sign-in only.** Pick genres, like top titles from them (at least
   one movie and one TV show) or search for a favorite, then invite your person. _Why:_ a match needs Likes on
   both sides. An account with no Likes can't match, so the first Likes are part of signing up, not a tip.
4. **Invites are single-use links that expire after 7 days**, shown as a QR code on the phone. The person
   invited always sees an accept or decline screen. There's no searching for people. _Why:_ only someone
   you gave a link can connect, a forwarded or old link stops working, and nobody is connected without
   choosing to be.
5. **No public profile.** Connections see only your name and photo. _Why:_ there's nothing to browse about a
   person, so there's nothing to leak.
6. **Match lifecycle.** If either person removes the Like, the match leaves the shared list. If the connection
   ends, the shared list is deleted for both people, Watched section included. If they reconnect, the list is
   rebuilt from their current Likes. _Why:_ the list must always reflect what both people want now, and ending
   a connection must leave nothing behind.
7. **Watched together.** Marking a match as watched moves it to the Watched section of that shared list. It
   stays there even if someone later removes the Like, and it doesn't change either person's Likes. _Why:_
   Watched is a record of an evening, not a wish. Keeping Likes unchanged means the title still matches with
   your other connections.
8. **Your own lists are saved to your account**, so they're the same on every device, and they stay private.
   _Why:_ an account is required anyway (decision 2), and a list made on the phone should be there on desktop.
   This answers the question the roadmap left open.
9. **Theme: dark by default, with a light theme designed from the start.** Settings offer Dark, Light and
   System. _Why:_ dark suits posters and evenings, but a light theme added later means every screen is
   redesigned twice. The tokens have both modes from M4.
10. **Language: the interface is in English in the first version.** TMDB content (titles, descriptions, where
    to watch) follows the language and region setting. _Why:_ translating the interface is real work for every
    screen; TMDB already translates its content for free.
11. **Search ships in M5, before accounts.** _Why:_ onboarding (M7) lets you search for a favorite, and search
    only needs TMDB, so it belongs with the other browsing work.
12. **These extras are in the first version:** delete account and download my data, TMDB attribution, a short
    privacy policy and terms, muting a connection, a notification list, grouped notifications, "pick one for
    us", watched together and match-list filters. _Why:_ deletion and attribution are required by the app
    stores and TMDB, and the rest is what makes a match list useful on a Friday night.

## 7. Open questions

Questions the stories depend on but can't answer yet. Each says where it gets answered and which stories wait
for it.

| Question                                                                         | Answered in                                                            | Affects                  |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------ |
| How do we stop someone from finding another person's Likes by liking everything? | ADR before M7. Until then, stories assume a daily like limit.          | `LIKE`, `MATCH`, `NOTIF` |
| Should matches be filtered to the streaming services both people have?           | Before the "later" streaming-services features                         | `MATCH`, `SET`           |
| What is the desktop app for?                                                     | ADR after M8 and M9 (see the roadmap)                                  | Desktop-only stories     |
| How long does a sign-in link live, and how long do you stay signed in?           | [Non-functional requirements](non-functional.md), then the M7 auth ADR | `AUTH`                   |

## Where the stories are

| File                                                                                            | Areas                               | Issue |
| ----------------------------------------------------------------------------------------------- | ----------------------------------- | ----- |
| [features/accounts.md](features/accounts.md)                                                    | `AUTH`, `ONBOARD`                   | #148  |
| [features/browse.md](features/browse.md)                                                        | `HOME`, `SEARCH`, `TITLE`, `PERSON` | #149  |
| [features/likes-and-lists.md](features/likes-and-lists.md)                                      | `LIKE`, `LIST`                      | #150  |
| [features/matching.md](features/matching.md)                                                    | `INVITE`, `CONN`, `MATCH`, `NOTIF`  | #151  |
| [features/profile-and-settings.md](features/profile-and-settings.md)                            | `PROFILE`, `SET`                    | #152  |
| [navigation.md](navigation.md): screens, navigation, routes                                     | all                                 | #153  |
| [non-functional.md](non-functional.md): accessibility, privacy, offline, performance, platforms | all                                 | #154  |

The files are added by the issues above, one pull request each, so some links work only once those are merged.
