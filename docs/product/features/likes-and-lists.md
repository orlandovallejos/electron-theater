# Likes and your own lists

Stories for the heart, the Likes screen and your own lists. Conventions (IDs, fields, the **Privacy:** line)
are in the [requirements](../requirements.md#3-conventions).

The rules behind these stories, from the
[roadmap](../../ROADMAP.md#how-likes-lists-and-matches-work) and the
[decisions](../requirements.md#6-decisions):

- **Likes** is one list per person, private, and the only list used for matching.
- **Your own lists** are as many as you want, private, and never used for matching. They're saved to your
  account, so they're the same on every device (decision 8).
- A title can be in your Likes, in any number of your own lists, in both or in neither. Adding a title to a
  list doesn't like it, and liking it doesn't add it to a list.

**Milestones.** M6 builds all of this on desktop with the data stored on the device. M7 moves it to the
account; the device's M6 data isn't moved (decision 2). Web and phone follow in M8 and M9.

**Contents:** [The heart](#the-heart) · [Likes screen](#likes-screen) · [Your own lists](#your-own-lists) ·
[Limits](#limits) · [Syncing](#syncing) · [States](#states) · [Later](#later)

---

## The heart

### LIKE-1 · Like a title

As someone browsing, I want to tap a heart to save a title I'd watch, so that it can match without any other
effort.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] On every poster, on the Home hero and on the title page, the same heart in the same place relative to
      the poster
- [ ] The heart fills at once, before the save finishes, with a short animation (none when the system asks
      for reduced motion)
- [ ] Screen readers hear "Like Dune" and the pressed state (`aria-pressed` on desktop and web)
- [ ] A tap while a save is still running is queued, not lost: the last tap wins
- [ ] **Privacy:** nothing changes for anyone else, unless the Like makes a match (MATCH). A Like that
      doesn't match is never shown, counted or notified to anyone.

### LIKE-2 · Unlike a title

As someone who changed their mind, I want to tap the heart again to remove the title, so that my Likes stay
honest.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] No confirmation. A short message offers **Undo** for 5 seconds: "Removed from your Likes. Undo"
- [ ] When the title is a match, the message says so: "Removed from your Likes and your matches with Sam.
      Undo". The match leaves the shared list (decision 6).
- [ ] A title watched together stays in that list's Watched section (decision 7)
- [ ] Undo puts the Like back with its original date, and the match comes back with it
- [ ] **Privacy:** the other person sees the match disappear from the shared list, with no notification and
      no message saying who removed it

### LIKE-3 · When saving fails

As someone whose connection dropped, I want to know a Like didn't save, so that I don't count on a match that
will never happen.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Offline: the Like is kept on the device and sent when the connection is back. The heart shows a small
      "not saved yet" mark until then.
- [ ] The server refuses it (an error, not a lost connection): the heart empties again and a message says
      "Couldn't save your Like" with **Try again**
- [ ] Unlikes follow the same rules
- [ ] In M6 there's no server: a failed write to the device shows the same message

### LIKE-4 · A daily limit on Likes

**Removed.** There's no limit on how many titles you can like
([decision 14](../requirements.md#6-decisions)): nobody liking by hand gets near "everything". Scripts are
slowed by the server's limit of 50 requests a second per client
([decision 16](../requirements.md#6-decisions)), which no person reaches. If a save is slowed, the heart
behaves as in LIKE-3: it stays filled and the app retries by itself.

## Likes screen

### LIKE-5 · See your Likes

As someone choosing what to watch alone, or checking what I've liked, I want all my Likes in one place, so
that I can browse them.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] A grid of posters with title and year, and the number of Likes in the header ("48 Likes"). It scrolls
      down: 20 titles, then **Show more** adds 30 ([decisions 17 and 18](../requirements.md#6-decisions)).
- [ ] A lock and "Only you can see your Likes" in the header, the same cue as on your own lists
      ([principle 2](../../design/principles.md#2-private-looks-private-shared-looks-shared))
- [ ] Each poster opens the title page and has the filled heart (tap to unlike, LIKE-2)
- [ ] Titles that are matches show a small badge with the connection's photo (from M7)
- [ ] **Privacy:** the badge appears for matches only. Nothing on this screen tells you anything about a
      connection's Likes beyond the matches.

### LIKE-6 · Sort and filter your Likes

As someone with many Likes, I want to sort and filter them, so that I can find the one I'm thinking of.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] Sort: **Date liked** (newest first, the default), **Title** (A to Z), **TMDB rating**, **Release date**
- [ ] Filter: **All**, **Movies**, **TV shows**
- [ ] The choice is remembered on the device
- [ ] With a filter that matches nothing: "No TV shows in your Likes yet" and **Show all**

### LIKE-7 · No Likes yet

As a new member, I want the empty Likes screen to tell me what to do, so that I start liking.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] "Tap the heart on anything you'd like to watch. Only you will see it." with **Browse titles** (Home)
- [ ] The privacy cue is shown here too

## Your own lists

### LIST-1 · Create a list

As someone who sorts titles by mood, I want to make a named list, so that I can keep "Horror to watch alone"
apart from the rest.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] **New list** on the Your lists screen and in the "Add to list" picker (LIST-2)
- [ ] A name of 1 to 50 characters, trimmed; two of your lists can't have the same name (ignoring case)
- [ ] Creating from the picker adds the title to the new list at the same time
- [ ] A new list shows its empty state (LIST-8)

### LIST-2 · Add a title to your lists

As someone looking at a title, I want to put it in one or more of my lists, so that I find it there later.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] **Add to list** on the title page, and from a poster's menu (right-click or the ⋯ button on desktop and
      web, a long press on the phone)
- [ ] A picker with every list and a checkbox each; ticking adds, unticking removes, at once, without a Save
      button. **New list** at the top.
- [ ] A message confirms: "Added to Horror to watch alone"
- [ ] Adding to a list doesn't like the title
- [ ] **Privacy:** your own lists are never used for matching and never shown to anyone

### LIST-3 · See your lists

As someone with several lists, I want them all on one screen, so that I can open the one I need.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] Each list shows its name, the number of titles and the first four posters as a small collage
- [ ] Ordered by the last change, newest first
- [ ] The same "Only you can see your lists" cue as on Likes
- [ ] No lists yet: "Make lists for any mood, like "Sunday films" or "Horror to watch alone". Only you see
      them." with **New list**

### LIST-4 · Open a list

As someone picking from one of my lists, I want to see its titles, so that I can choose one.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] The list's name, its number of titles and the privacy cue at the top
- [ ] A grid like Likes, with the same sort, filter and **Show more** (LIKE-5, LIKE-6). The default sort is
      **Date added**.
- [ ] Each poster opens the title page and shows the heart (its own Like state, not the list)

### LIST-5 · Remove a title from a list

As someone tidying a list, I want to take a title out of it, so that the list stays useful.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] From the poster's menu on the list page, or by unticking it in the picker (LIST-2)
- [ ] No confirmation. A message offers **Undo** for 5 seconds.
- [ ] The title stays in your Likes and your other lists

### LIST-6 · Rename a list

As someone whose list grew beyond its name, I want to rename it, so that the name still fits.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] From the list page's menu; the same rules as LIST-1 for the name
- [ ] Esc or **Cancel** keeps the old name

### LIST-7 · Delete a list

As someone who doesn't need a list anymore, I want to delete it, so that my lists stay short.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] From the list page's menu, as a destructive action
- [ ] A list with titles asks first: "Delete "Horror to watch alone"? Its 12 titles stay in your Likes and
      your other lists." with **Delete** and **Cancel**
- [ ] An empty list is deleted without asking, with **Undo** for 5 seconds
- [ ] After deleting, Your lists is shown

### LIST-8 · An empty list

As someone who just made a list, I want to know how to fill it, so that I don't stare at an empty screen.

**Clients:** D W M · **Release:** first version · **Milestone:** M6 (D), M8 (W), M9 (M)

- [ ] "Nothing here yet. Use **Add to list** on any title." with **Browse titles**

## Limits

Your own lists have limits high enough that nobody reaches them by normal use, low enough to protect the server
and the screens. Likes have none.

| What               | Limit         | At the limit                                                                 |
| ------------------ | ------------- | ---------------------------------------------------------------------------- |
| Likes              | None          | No limit ([decision 14](../requirements.md#6-decisions))                     |
| Your own lists     | 100           | **New list** is disabled with "You've reached 100 lists."                    |
| Titles in one list | 1,000         | That list is disabled in the picker with "This list is full (1,000 titles)." |
| List name          | 50 characters | The field stops accepting characters and shows the count                     |

Grids show 20 titles and add 30 with each **Show more** (decision 18), so a list of 1,000 titles opens as fast
as one of 20.

## Syncing

From M7, Likes and your own lists live on your account and every device shows the same thing (decision 8).

- [ ] A change on one device shows on your other open devices within a few seconds, without a reload
- [ ] Changes made offline are sent when the connection is back, in the order they were made
- [ ] When two devices change the same thing while offline, the latest change wins (by the time it was made),
      for each title and each list name separately. Adding different titles to the same list on two devices
      keeps both.
- [ ] Deleting a list on one device while another adds to it: the delete wins, and the other device says
      "This list was deleted on another device"
- [ ] **Privacy:** syncing is between your own devices only; nothing in it reaches a connection

## States

| Situation                    | What the person sees                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Loading Likes or a list      | Poster skeletons in the grid; the header with the count appears as soon as it's known                      |
| Offline                      | Likes and lists open from the device. Changes are kept and marked "not saved yet" (LIKE-3).                |
| Saving fails                 | LIKE-3 for the heart; the picker unticks the list again with "Couldn't add to the list" and **Try again**  |
| TMDB down                    | Grids show the saved title and year with plain tiles instead of posters; opening a title says TMDB is down |
| A title is no longer on TMDB | It stays in your Likes or list as a plain tile, "Not available anymore", and can be removed                |

## Later

After the first version. IDs are reserved so the wireframes can leave room for them.

### LIKE-8 · Swipe through titles on the phone

As someone with five minutes on the bus, I want to go through titles one card at a time, so that I like more
of them with less effort.

**Clients:** M · **Release:** later

- [ ] One large card at a time; swipe right to like, left to skip, and buttons for both
- [ ] Cards come from the same sources as Home (trending and your genres), never titles already liked or
      marked "Not interested"

### LIKE-9 · Mark a title "Not interested"

As someone who keeps seeing a title I'll never watch, I want to hide it, so that it stops coming back.

**Clients:** D W M · **Release:** later

- [ ] From a poster's menu; hides the title from Home, onboarding picks, the swipe deck and "pick one for
      us"
- [ ] A list of hidden titles in Settings to undo it
- [ ] **Privacy:** private, like Likes, and never used for matching

### LIST-9 · Reorder titles in a list

As someone who ranks a list, I want to put titles in my own order, so that the first one is the next to
watch.

**Clients:** D W M · **Release:** later

- [ ] A **Custom** sort, by drag and drop, and with the keyboard on desktop and web
