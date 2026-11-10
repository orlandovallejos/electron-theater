# Browsing

Stories for Home, search, the title page, the trailer and the person page: everything that shows TMDB
content. Conventions (IDs, fields, the **Privacy:** line) are in the
[requirements](../requirements.md#3-conventions).

Most of this exists in some form on desktop today (see the [UI audit](../../design/audit.md)), but nothing is
specified. These stories say what each screen shows, so M5 can fix, extend and restyle it.

Unless a story says otherwise, it ships in M5 on desktop, M8 on the web and M9 on the phone. Content follows
the **language** and **region** settings (SET), and titles marked adult by TMDB are hidden while **Hide adult
titles** is on (the default).

**Contents:** [Home](#home) · [Search](#search) · [Title page](#title-page) · [Trailer](#trailer) ·
[Person page](#person-page) · [What we don't show](#what-we-dont-show) · [States](#states) · [Later](#later)

---

## Home

### HOME-1 · A featured title at the top

As someone opening the app, I want one title shown large, so that there's something to react to right away.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] A trending title picked at random each time Home opens, with its backdrop, title, year, type (movie or
      TV show) and the first two lines of its description
- [ ] The heart is the main button (LIKE). **Trailer** is secondary and only appears when there is one
      (TITLE-8). **More info** opens the title page.
- [ ] Titles without a backdrop are never picked
- [ ] On the phone it's a shorter card, so the first row shows without scrolling

### HOME-2 · Rows of trending titles

As someone looking for ideas, I want rows of what's popular now, so that I can like things without searching.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] Rows: **Trending movies**, **Trending TV shows**, **Popular in your region**
- [ ] Each row scrolls sideways: with arrows on desktop and web, by swiping on the phone, and with the arrow
      keys once focused
- [ ] Each poster shows the title and year under it and opens the title page
- [ ] Each poster has the heart (HOME-4)

### HOME-3 · Rows from the genres you picked

As someone who picked genres in onboarding, I want rows for them, so that Home fits my taste.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] One row per picked genre ("Comedy", "Sci-Fi and Fantasy"), movies and TV mixed, after the trending rows
- [ ] At most five genre rows; with more picks, a different five each time Home opens
- [ ] Changing the genres in Settings changes the rows the next time Home opens
- [ ] Before M7 (no account yet) and for people who skipped the genre step, Home shows only HOME-1 and HOME-2

### HOME-4 · The heart on every poster

As someone browsing rows, I want to like a title from its poster, so that I don't have to open each one.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] Behaves as LIKE: fills at once, undoes itself if saving fails
- [ ] Titles already in your Likes show a filled heart wherever they appear
- [ ] On desktop and web the heart is always visible, not only on hover, so it works by touch and keyboard
- [ ] Tapping the heart never opens the title page

### HOME-5 · A card for what to do next

As a new member, I want Home to tell me the next step, so that I get to my first match.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] One card at the top, at most, the first one that applies:
  1. "Like your first titles" when the Likes have no movie or no TV show (ONBOARD-9)
  2. "Invite your person" when there are no connections and no pending invites (ONBOARD-5)
  3. "You have 3 new matches with Sam" when there are matches you haven't seen (MATCH)
- [ ] Cards 1 and 2 can be dismissed for 7 days; card 3 goes away once the matches are seen
- [ ] **Privacy:** card 3 counts only matches, never the other person's Likes

## Search

### SEARCH-1 · Open search from anywhere

As someone who knows what they want, I want search one step away, so that I don't scroll rows looking for it.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] In the navigation on every client (where exactly is in [navigation](../navigation.md))
- [ ] On desktop and web, ⌘K / Ctrl+K and `/` focus the search field from any screen
- [ ] Opening search focuses the field and shows the keyboard on the phone

### SEARCH-2 · Results as you type

As someone searching, I want results while I type, so that I can stop as soon as I see the title.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] Starts after 2 characters, and waits until typing pauses (about 300 ms) before asking TMDB
- [ ] Searches movies, TV shows and people together, with tabs or chips to narrow it: **All**, **Movies**,
      **TV shows**, **People**
- [ ] A title result shows its poster, title, year and type, and the heart. A person result shows the photo,
      name and what they're known for ("Acting · Dune, Lady Bird").
- [ ] Results are in TMDB's order (most relevant first); more load when you scroll to the end
- [ ] Choosing a result opens the title page or the person page. Back returns to the same results.
- [ ] Keyboard on desktop and web: ↓ and ↑ move through results, Enter opens, Esc clears the field
- [ ] Only the latest search's results are shown, even if an earlier request answers last

### SEARCH-3 · No results

As someone whose search found nothing, I want to know it worked and what to try, so that I don't think the
app is broken.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] "No results for "dnue"." with a hint: check the spelling, or try the original title
- [ ] When a filter is on, it offers to search **All** instead

## Title page

One page for movies and TV shows, with small differences listed in each story. Everything on it comes from
TMDB, in one request where possible, and the page is usable before every section has loaded.

### TITLE-1 · The header: what it is and the main action

As someone deciding whether to watch something, I want the essentials at the top, so that I can like it or
move on in seconds.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] Backdrop, poster, title, year, and the type
- [ ] Movie: runtime and age rating for your region. TV show: years running ("2019–2023", or "2019–" if still
      running) and the number of seasons.
- [ ] Genres, the TMDB rating as a ring with the number of votes, and the tagline when there is one
- [ ] The heart is the main action. **Add to list** (LIST) and **Trailer** (TITLE-8) are secondary.
- [ ] The poster's colors tint the page, as today
- [ ] **Back** returns to the previous screen at the same scroll position

### TITLE-2 · The description and the details

As someone reading about a title, I want a short description and the facts that matter, so that I know what
I'd be watching.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] The overview, cut to about 5 lines with **More** when longer
- [ ] Movie: release date in your region, director, original language, and budget and revenue only when TMDB
      has a number above zero
- [ ] TV show: created by, network, status (Returning, Ended, Cancelled), and the next episode's date when
      one is announced
- [ ] Facts TMDB doesn't have are left out, not shown as "Unknown" or "0"

### TITLE-3 · The cast

As someone who picks by actor, I want to see who's in it, so that I can find more of their work.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] A sideways row of the first 15 cast members: photo, name and character
- [ ] Each opens the person page (PERSON-1)
- [ ] People without a photo show their initials
- [ ] No cast from TMDB: the section is hidden

### TITLE-4 · Where to watch

As someone who wants to watch it tonight, I want to know which of my services has it, so that I don't search
each app.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] Services for the region in Settings, from TMDB's watch providers, grouped as **Stream**, **Rent** and
      **Buy**, each with its logo and name
- [ ] Tapping a service opens TMDB's watch page for that title in the browser, where the links to each service
      are (TMDB doesn't give the links themselves)
- [ ] Says which region it's for, with a link to change it: "Where to watch in Spain · Change"
- [ ] No services in that region: "Not available to stream or buy in Spain right now"
- [ ] Shows the JustWatch attribution that TMDB's terms require for this data

### TITLE-5 · Related titles

As someone who liked this title, I want similar ones, so that I can like several in a row.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] A row of up to 20 posters from TMDB's recommendations, or its similar titles when there are no
      recommendations
- [ ] Each poster has the heart and opens its own title page
- [ ] Nothing related: the section is hidden

### TITLE-6 · Seasons of a TV show

As someone looking at a TV show, I want to see its seasons, so that I know how much there is to watch.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] A list of seasons: poster, name, year and number of episodes. Specials come last.
- [ ] The total number of episodes in the header of the section
- [ ] Seasons aren't liked separately: the heart is for the whole show (see the glossary's **Title**)

### TITLE-7 · Your match on a title

As someone with connections, I want to see when a title is already a match, so that I know we both want it.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] When the title is on a shared match list, a chip under the heart: "Match with Sam" (and "+1" for more
      connections), which opens that match list
- [ ] Watched together: "Watched with Sam"
- [ ] **Privacy:** the chip appears only for matches. A title a connection likes but you don't shows nothing.

## Trailer

### TITLE-8 · Watch the trailer

As someone unsure about a title, I want to watch its trailer without leaving the app, so that I can decide
quickly.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] Uses TMDB's official YouTube trailer in your language, then in English, then any YouTube trailer
- [ ] Desktop and web: plays in a dialog over the page, from YouTube's privacy-enhanced player
      (`youtube-nocookie.com`). Esc, the close button and a click outside close it, and focus goes back to
      the **Trailer** button.
- [ ] Phone: opens in the YouTube app if it's installed, and in an in-app browser otherwise
- [ ] Closing stops the video
- [ ] No trailer: the **Trailer** button isn't shown, here or on the Home hero
- [ ] Offline: the button stays, and tapping it says "You're offline"

## Person page

### PERSON-1 · Who someone is and what they're known for

As someone who liked a performance, I want to see the person's other work, so that I can like more of it.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] Photo, name, what they're known for (Acting, Directing, …), birth date and place, and death date when
      there is one
- [ ] The biography, cut to about 5 lines with **More**. TMDB has no biography in your language: show the
      English one, or nothing.
- [ ] **Known for:** a grid of their titles, most popular first, each with the heart, filterable by
      **Movies** and **TV shows**
- [ ] Crew work (directing, writing) appears in the same grid with the job under the title

## What we don't show

TMDB returns more than these screens use. Left out on purpose, so a screen has one job:

- **Keywords**, **production companies** and **TMDB popularity scores**: useful for search and
  recommendations, not for a person deciding.
- **Reviews**: ratings already summarize them, and reviews mean spoilers.
- **Full cast and crew**, **episodes of a season** and **image galleries**: later, if people ask for them.

The app still fetches what the [M10 agent](../requirements.md#4-feature-map) may need, such as keywords; it
just doesn't display it.

## States

| Situation                        | What the person sees                                                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Loading                          | The layout appears at once, with skeletons where posters, text and rows will be. No spinner over a blank page.         |
| One section fails                | That section says "Couldn't load the cast" with **Try again**; the rest of the page works.                             |
| TMDB down or the request fails   | The screen says "We can't reach the movie database right now" with **Try again**. Your Likes and lists still open.     |
| Offline                          | A notice at the top. Screens already loaded stay; new ones say "You're offline" with **Try again**.                    |
| Title or person not found        | "This title isn't available anymore" (or person), with **Go to Home**. If it's in your Likes, you can still remove it. |
| No poster                        | A plain tile with the title in text, the same size as a poster                                                         |
| No backdrop                      | The header uses the poster's colors as its background                                                                  |
| No description                   | "No description yet." in muted text                                                                                    |
| Content missing in your language | TMDB's English text, never an empty field                                                                              |

## Later

After the first version. IDs are reserved so the wireframes can leave room for them.

### SEARCH-4 · Recent searches

As someone who searches for the same things, I want my recent searches listed, so that I can repeat one with
a tap.

**Clients:** D W M · **Release:** later

- [ ] The last 10 searches, shown when the field is empty, each removable, plus **Clear all**
- [ ] **Privacy:** stored on the device only, and cleared on sign-out

### TITLE-9 · Share a title

As someone who found something good, I want to send its page to a friend, so that they can see it too.

**Clients:** D W M · **Release:** later

- [ ] **Share** gives a web link to the title page; the person opening it signs in first (decision 2)
- [ ] **Privacy:** the link says nothing about your Likes or matches
