# Profile and settings

Stories for your profile, every setting, and the About section. Conventions (IDs, fields, the **Privacy:**
line) are in the [requirements](../requirements.md#3-conventions).

The rules behind these stories, from the [decisions](../requirements.md#6-decisions):

- There's no public profile. Your profile is a screen only you see; connections see only your name and photo
  (decision 5).
- Dark is the default theme, and Light and System are designed from the start (decision 9).
- The interface is in English; TMDB content follows the language and region settings (decision 10).

Every setting has a **default**, the **clients** that show it, and where it's **stored**:

- **Account:** saved on the server, the same on every device, from M7. Before M7 these are stored on the
  device, and they aren't moved to the account (decision 2).
- **Device:** saved on this device only, because it depends on the device (a theme that follows the phone's
  system, push permission).

Unless a story says otherwise, it ships in M7 on desktop, M8 on the web and M9 on the phone.

**Contents:** [Profile](#your-profile) · [Settings](#settings) · [Account](#account) ·
[Notifications](#notifications) · [Content](#content) · [Appearance](#appearance) · [About](#about) ·
[All settings](#all-settings-at-a-glance) · [Later](#later)

---

## Your profile

### PROFILE-1 · See your profile

As someone using the app, I want a page about my account, so that I can see what I've built up and change my
name or photo.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Photo, name and email address at the top, with **Edit profile**
- [ ] Counts that open their screens: Likes, your lists, connections, matches (all shared lists together)
- [ ] A lock and "Only you see this page" under the header
- [ ] A link to Settings
- [ ] **Privacy:** P4 in [matching](matching.md#privacy-rules). Nobody else can open this page, and the counts
      are never shown to anyone else.

### PROFILE-2 · Change your name

As someone whose name came out wrong from Google, I want to change it, so that my connections recognize me.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] First set during onboarding (ONBOARD-1), from Google or Apple when they give one
- [ ] 1 to 40 characters, trimmed; any script or emoji is allowed
- [ ] The new name shows to your connections the next time their app updates, and on invites you send after
      the change
- [ ] Stored on the account

### PROFILE-3 · Add or change your photo

As someone with a common name, I want a photo, so that my person knows the invite is really from me.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Starts as the Google photo when there is one, otherwise your initials on a color picked from your name
- [ ] **Change photo:** choose a file (desktop and web) or the photo library or camera (phone), then crop to a
      circle
- [ ] JPEG, PNG or HEIC up to 10 MB; it's resized to a small square before upload
- [ ] **Remove photo** goes back to initials
- [ ] A failed upload keeps the old photo and says "Couldn't upload your photo" with **Try again**

### PROFILE-4 · See what your connections see

As someone careful about privacy, I want to check what my connections can see about me, so that I trust the
app.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] On **Edit profile**: "Your connections see only your name and photo, and the matches you share."
      with a preview of how you appear on their screen
- [ ] **Privacy:** the preview shows exactly what a connection gets from the server, and nothing else

## Settings

### SET-1 · Find a setting

As someone who wants to change one thing, I want settings grouped by topic, so that I find it without
scrolling through everything.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] Groups in this order: **Account**, **Notifications**, **Content**, **Appearance**, **Desktop app**
      (desktop only, later), **About**
- [ ] Desktop and web: groups in a side list with the group's settings next to it. Phone: one list of groups,
      each opening its own screen.
- [ ] Changes apply at once; there's no Save button
- [ ] Before M7 (no accounts), only Content, Appearance and About exist

## Account

### SET-2 · Account settings

As someone managing my account, I want how I sign in and the account actions in one place, so that I can
find them when I need them.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **Email:** shown, read only (changing it is AUTH-16, later)
- [ ] **Sign-in methods:** the ones used so far (email link, Google, Apple), read only (AUTH-10)
- [ ] **Sign out** (AUTH-13)
- [ ] **Download my data** (AUTH-15, from M11)
- [ ] **Delete account** (AUTH-14), last, as a destructive action

## Notifications

### SET-3 · Choose your notifications

As someone who wants to hear about matches but not be interrupted, I want to choose what notifies me and
how, so that the app fits my day.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **What:** New matches (on), Accepted invites (on). Stored on the account.
- [ ] **How**, for this device: **Desktop notifications** (desktop, on), **Push notifications** (phone, on
      once permission is given), **In-app messages** (web, on). Stored on the device.
- [ ] When the system has notifications turned off for the app, the switch says so and links to the system
      settings, instead of pretending to be on
- [ ] **Muted connections:** the list of muted connections, each with **Unmute** (CONN-2)
- [ ] Turning everything off keeps the notification list in the app (NOTIF-5)

## Content

### SET-4 · Language and region for titles

As someone who reads in Spanish and lives in Spain, I want titles, descriptions and where-to-watch in my
language and country, so that the information fits me.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] **Language for titles and descriptions:** the languages TMDB supports. Default: the system language if
      TMDB has it, otherwise English.
- [ ] **Region:** a country list. Default: the system region, otherwise United States. Used for where to watch
      (TITLE-4), release dates, age ratings and "Popular in your region".
- [ ] A line under both: "The app itself is in English for now." (decision 10)
- [ ] Changing either reloads what's on screen in the new language or region
- [ ] Stored on the account (on the device before M7)

### SET-5 · Hide adult titles

As someone who doesn't want explicit titles in search and rows, I want them hidden, so that I don't come
across them.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] **Hide adult titles**, on by default, using TMDB's adult flag
- [ ] Applies to Home, search, related titles, person pages and onboarding picks
- [ ] Stored on the account (on the device before M7)

### SET-6 · Change your genres

As someone whose taste changed since onboarding, I want to change my genres, so that Home shows other rows.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] The same chips as ONBOARD-2, with the current picks selected
- [ ] Home uses the new picks the next time it opens (HOME-3)
- [ ] Stored on the account

## Appearance

### SET-7 · Choose a theme

As someone who watches in the dark and works in the daylight, I want to choose the theme, so that the app is
comfortable in both.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] **Dark** (the default), **Light**, **System** (follows the device's light or dark mode, and changes
      when it does)
- [ ] Applies at once, without a restart, and the window frame on desktop follows it
- [ ] Stored on the device: a phone that follows its system and a desktop that stays dark are both normal
- [ ] The welcome screen follows the device's choice too, before anyone signs in
- [ ] Both themes pass the contrast checks in the [non-functional requirements](../non-functional.md)

### SET-8 · Motion and text size follow the system

As someone who gets dizzy from animation, or who needs larger text, I want the app to respect my system
settings, so that I don't have to set them twice.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] When the system asks for reduced motion, animations (the heart, page transitions, the hero) are replaced
      with simple fades or nothing
- [ ] Text follows the system or browser text size, up to 200%, without cutting anything off
- [ ] There's no separate setting for either in the app: the system's is the one that counts

## About

### SET-9 · About Movie Mates

As someone curious about the app, or who found a problem, I want to see its version, its sources and its
rules, so that I know what I'm using and where to report problems.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

- [ ] **Version** and build number, with **Copy** for bug reports
- [ ] **TMDB attribution** (TITLE-4 and SET-10)
- [ ] **Open source licenses:** the libraries the app uses and their licenses, generated at build time
- [ ] **Source code:** a link to the GitHub repository
- [ ] **Report a problem:** opens a new GitHub issue in the browser with the version and platform filled in,
      and nothing else about you
- [ ] **Privacy policy** and **Terms** (from M11): open the documents in `docs/legal/` (#154) as pages in the
      browser

### SET-10 · Credit TMDB as its terms require

As the people who build Movie Mates, we want to credit TMDB as its terms require, so that we can keep using its
data and people know where it comes from.

**Clients:** D W M · **Release:** first version · **Milestone:** M5 (D), M8 (W), M9 (M)

TMDB's [API terms of use](https://www.themoviedb.org/api-terms-of-use) (section 3) and its
[logos and attribution](https://www.themoviedb.org/about/logos-attribution) page ask for this; the watch
provider data has its own rule in the
[API reference](https://developer.themoviedb.org/reference/movie-watch-providers).

- [ ] The About section shows the TMDB logo (one of the official ones, unchanged) and the notice: "This
      application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB."
- [ ] The TMDB logo is less prominent than the Movie Mates name and logo wherever both appear
- [ ] The welcome screen (AUTH-1) shows the notice in small print, so it's visible without signing in
- [ ] Where to watch (TITLE-4) says the data comes from JustWatch, as the watch-providers reference requires
- [ ] The same text appears on every client, and in the store listings in M11

## All settings at a glance

| Setting                              | Group         | Default                                | Clients | Stored                     | Milestone |
| ------------------------------------ | ------------- | -------------------------------------- | ------- | -------------------------- | --------- |
| Name, photo                          | Profile       | From Google or Apple, or typed         | D W M   | Account                    | M7        |
| New matches, accepted invites        | Notifications | On, on                                 | D W M   | Account                    | M7        |
| Desktop notifications                | Notifications | On                                     | D       | Device                     | M7        |
| Push notifications                   | Notifications | On once permission is given            | M       | Device                     | M9        |
| In-app messages                      | Notifications | On                                     | W       | Device                     | M8        |
| Muted connections                    | Notifications | None                                   | D W M   | Account                    | M7        |
| Language for titles and descriptions | Content       | System language, otherwise English     | D W M   | Account (device before M7) | M5        |
| Region                               | Content       | System region, otherwise United States | D W M   | Account (device before M7) | M5        |
| Hide adult titles                    | Content       | On                                     | D W M   | Account (device before M7) | M5        |
| Genres you like                      | Content       | From onboarding                        | D W M   | Account                    | M7        |
| Theme                                | Appearance    | Dark                                   | D W M   | Device                     | M5        |
| Sort and filters on Likes and lists  | (on screen)   | Date liked or added, All               | D W M   | Device                     | M6        |
| Filters on a shared list             | (on screen)   | None                                   | D W M   | Device                     | M7        |

- [ ] Signing out removes the account's data from the device (AUTH-13) but keeps the device settings, such as
      the theme
- [ ] **Privacy:** no setting is ever visible to a connection

## Later

After the first version. IDs are reserved so the wireframes can leave room for them.

### SET-11 · Your streaming services

As someone with two subscriptions, I want to tell the app which services I have, so that it can show what I
can watch now.

**Clients:** D W M · **Release:** later

- [ ] Pick services from TMDB's list for your region; used by MATCH-9 once the open question is answered
- [ ] **Privacy:** never shown to connections, even when used to filter a shared list

### SET-12 · Desktop app settings

As a desktop user, I want to choose whether the app starts with my computer and how it updates, so that it
behaves like my other apps.

**Clients:** D · **Release:** later

- [ ] **Open at login** (off) and **Install updates automatically** (on), stored on the device
- [ ] **Check for updates** shows the current version and whether a newer one exists

### SET-13 · Email notifications

As someone who prefers email, I want to turn on a daily summary, so that I see matches without opening the
app.

**Clients:** D W M · **Release:** later

- [ ] A switch in Notifications, off by default, stored on the account (NOTIF-6)
