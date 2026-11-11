# Connections, invites, matches and notifications

Stories for the core of the app: connecting with someone, the list of titles you both like, and being told
when it grows. Conventions (IDs, fields, the **Privacy:** line) are in the
[requirements](../requirements.md#3-conventions).

The rules behind these stories, from the [roadmap](../../ROADMAP.md#how-likes-lists-and-matches-work) and the
[decisions](../requirements.md#6-decisions):

- Connecting takes consent: an invite link, and an explicit accept. There's no searching for people.
- Each connection has one shared match list, which only its two people can see.
- Likes are private. A match is the only way anyone learns about someone else's Like.
- An unlike removes the match. Ending a connection deletes the shared list for both. Reconnecting rebuilds it
  from current Likes. Titles watched together stay in the Watched section (decisions 6 and 7).

Unless a story says otherwise, it's on every client and ships in M7 on desktop, M8 on the web and M9 on the
phone. Invite links work in any browser from M7, because M7 includes the web page that opens them.

**Contents:** [Privacy rules](#privacy-rules) · [Invites](#invites) · [Connections](#connections) ·
[Match lists](#match-lists) · [Match lifecycle](#match-lifecycle) · [Notifications](#notifications) ·
[States](#states) · [Later](#later)

---

## Privacy rules

These apply to every story below and to anything added later. A story's **Privacy:** line points at the rule
it depends on.

| Rule   | Nothing in the app, its notifications or its server responses may …                                                                                 |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P1** | … show, count or hint at a Like that isn't a match. No "Sam liked 40 titles this week", no "Sam has liked this", no counts of a connection's Likes. |
| **P2** | … say when the other person liked a matched title. A match shows the date it became a match, never the date of either Like.                         |
| **P3** | … tell an inviter that an invite was declined, or opened and not answered.                                                                          |
| **P4** | … show a connection more than your name and photo, plus the matches you share.                                                                      |
| **P5** | … announce that a connection ended, or why (ended, account deleted). It simply disappears.                                                          |
| **P6** | … answer a script faster than a person could use the app. There's no cap on Likes (decision 14); the M7 backend has ordinary API rate limits.       |

What can't be hidden, and is accepted: when a match appears, you learn that the other person likes that
title. When a match disappears and you didn't unlike it, you can tell they did. Both are the point of
matching between two people.

## Invites

### INVITE-1 · Create an invite link

As someone who wants to match with a person, I want a link to send them, so that they can connect with me.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **Invite someone** on the Connections screen, in onboarding (ONBOARD-5) and on the Home card (HOME-5)
- [ ] Creates a link like `…/invite/7Kp2xQ9m` with a long random code that can't be guessed
- [ ] Shows the link, when it expires ("Works once, until Nov 17") and **Copy link**
- [ ] **Share** opens the system share sheet (phone, and the web where the browser supports it) with a short
      message: "Let's find something to watch together on Movie Mates: …"
- [ ] At most 5 pending invites at a time; the sixth asks you to revoke one first
- [ ] **Privacy:** the link reveals only your name and photo to whoever opens it (P4)

### INVITE-2 · Show or scan an invite as a QR code

As someone sitting next to the person I'm inviting, I want them to scan a code, so that we skip sending a
link.

**Clients:** M · **Release:** first version · **Milestone:** M9

- [ ] **Show QR code** next to **Copy link** on the phone; the screen stays at full brightness while it's shown
- [ ] Scanning it with the phone's camera opens the same link (INVITE-4)
- [ ] **Scan a code** on the phone's Connections screen opens the camera inside the app

### INVITE-3 · Manage the invites you sent

As someone who sent an invite to the wrong chat, I want to cancel it, so that nobody else can use it.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] A **Pending invites** section on the Connections screen: when each was created, when it expires, **Copy
      link** and **Revoke**
- [ ] **Revoke** asks no confirmation and offers **Undo** for 5 seconds; after that the link stops working
- [ ] An invite leaves the list when it's accepted (it becomes a connection) or when it expires
- [ ] **Privacy:** a declined invite stays in this list as pending until it would have expired (P3)

### INVITE-4 · Accept or decline an invite

As someone who got an invite, I want to see who sent it and choose, so that I'm never connected without
agreeing.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Opening the link shows a screen with the inviter's photo and name: "Sam wants to find things to watch
      with you"
- [ ] One line on what accepting means: "You'll both see the titles you both like. Neither of you sees the
      rest of the other's Likes."
- [ ] **Accept** and **Decline**, equally easy to reach; neither is preselected
- [ ] Accept: the connection is made, the shared list is built from both people's current Likes, and it opens
      (empty or not, MATCH-8)
- [ ] Decline: the link stops working, and the screen says "Declined. Sam won't be told." then goes Home
- [ ] Signed out: sign in first, then this screen (ONBOARD-8)
- [ ] **Privacy:** P3 for a decline; the inviter learns about an accept (NOTIF-2)

### INVITE-5 · An invite that can't be used

As someone opening an invite that doesn't work, I want to know why, so that I can ask for a new one.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

| Case                            | What the screen says                                                                            |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| Expired                         | "This invite has expired. Ask for a new one."                                                   |
| Already used, revoked, or wrong | "This invite doesn't work anymore. Ask for a new one." (the same text, so it reveals nothing)   |
| Your own invite                 | "This is your invite. Send it to the person you want to connect with." with **Copy link**       |
| Already connected with them     | "You're already connected with Sam." with **Open your matches**                                 |
| You or they have 20 connections | "One of you has reached the limit of 20 connections." The invite stays usable until it expires. |

- [ ] Every case has a way forward (Home, or the action in the table), never a dead end
- [ ] **Privacy:** an invite from an account that was deleted reads as "doesn't work anymore" (P5)

### INVITE-6 · Invites waiting for your answer

As someone who opened an invite and closed the app before choosing, I want to find it again, so that I can
still answer.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] An **Invites for you** section at the top of the Connections screen, with the same Accept and Decline
      as INVITE-4, until the invite expires
- [ ] A dot on Connections in the navigation while one is waiting

## Connections

### CONN-1 · See your connections

As someone connected with a few people, I want them in one place, so that I can open a shared list or manage
a connection.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Each connection shows their photo, name, "Connected since March" and the number of matches
- [ ] Sections in this order: **Invites for you** (INVITE-6), **Connections**, **Pending invites** (INVITE-3)
- [ ] **Invite someone** at the top
- [ ] At most 20 connections; at the limit, **Invite someone** says so
- [ ] No connections: "Invite the person you watch with. You'll see what you both want to watch." with
      **Invite someone**
- [ ] **Privacy:** P4. No Likes count, no activity, no "last seen".

### CONN-2 · Mute a connection

As someone connected with a sibling who likes everything, I want to stop the notifications from our list,
so that I'm not interrupted all day.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **Mute** in the connection's menu; muted connections show a muted bell icon
- [ ] Muted: no system, push or in-app alerts for that connection, and its entries in the notification list
      don't count as unread. The shared list keeps updating.
- [ ] **Unmute** in the same place; Settings also lists muted connections (SET)
- [ ] **Privacy:** only you know you muted someone

### CONN-3 · End a connection

As someone who doesn't want to match with a person anymore, I want to end the connection, so that we stop
sharing a list.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **End connection** in the connection's menu, as a destructive action
- [ ] Asks first: "End your connection with Sam? Your shared list (12 matches, 3 watched) is deleted for both
      of you. Your Likes and your lists stay." with **End connection** and **Cancel**
- [ ] No undo: the list is deleted at once, for both people (decision 6)
- [ ] The other person's connection and list disappear the next time their app updates, with no notification
- [ ] Either person can invite the other again later (CONN-4)
- [ ] **Privacy:** P5

### CONN-4 · Reconnect with someone

As someone who ended a connection by mistake, I want to connect again, so that we get our list back.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Works like any new connection: an invite, then an accept
- [ ] The shared list is rebuilt from both people's current Likes; the old Watched section doesn't come back
- [ ] The rebuilt matches arrive as one grouped notification (NOTIF-3), not one per title

## Match lists

### MATCH-1 · A new match appears

As someone who just liked a title, I want to know straight away when it's a match, so that the moment feels
like something.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] When you like a title your connection already likes, it goes onto your shared list at once
- [ ] A short celebration appears over the screen, with an animation (a burst of hearts or stars around the
      poster): "It's a match with Sam!" ([decision 13](../requirements.md#6-decisions))
- [ ] A Like can match with several connections at once. The message lists every one of them, with their
      photos: "It's a match with Sam, Jo and Alex!"
- [ ] **See your matches** opens the shared list (with several people, the Matches screen), and **Keep
      browsing** closes it. It also closes by itself after a few seconds, or with Esc.
- [ ] With reduced motion on, the message appears without the animation
- [ ] The other people get a notification (NOTIF-1)
- [ ] The match is marked **New** on the list until each person has seen it
- [ ] **Privacy:** P2. Nothing says how long ago Sam liked it.

### MATCH-2 · See your matches

As someone with more than one connection, I want all my shared lists in one place, so that I open the right
one.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] A **Matches** screen with one row per connection: their photo, name, the number of matches and the
      number of new ones
- [ ] With exactly one connection, Matches opens that shared list directly
- [ ] No connections: the same empty state as CONN-1

### MATCH-3 · Open a shared match list

As two people deciding what to watch, we want the titles we both like, newest first, so that we pick from
things we already want.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] The header shows both photos, "You and Sam" and the number of matches, so it never looks like a private
      list ([principle 2](../../design/principles.md#2-private-looks-private-shared-looks-shared))
- [ ] A grid of posters, newest match first, with title, year, type and runtime (or seasons)
- [ ] Each poster opens the title page, which shows "Match with Sam" (TITLE-7)
- [ ] **Pick one for us** (MATCH-5) is the main action; filters (MATCH-4) are above the grid
- [ ] The **Watched** section is at the bottom (MATCH-7)
- [ ] Both people see the same list at the same time; a change by one shows for the other within seconds
- [ ] **Privacy:** P1, P2

### MATCH-4 · Filter the shared list

As two people with 60 matches and 90 minutes, we want to narrow the list, so that we only see what fits
tonight.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **Type:** All, Movies, TV shows
- [ ] **Genre:** pick one or more (matches any of them)
- [ ] **Runtime** for movies: Under 90 min, 90 to 120 min, Over 2 hours. TV shows aren't filtered by runtime.
- [ ] Filters combine; the count updates ("8 of 60"), and **Clear filters** appears when any is on
- [ ] No titles fit: "Nothing matches these filters." with **Clear filters**
- [ ] Filters are remembered on the device, for each list, and each person sets their own

### MATCH-5 · Pick one for us

As two people who can't choose even from our matches, we want the app to pick one, so that we start
watching.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Picks at random from the matches that fit the current filters, never from Watched
- [ ] Shows the pick large: poster, title, runtime, where to watch, **Trailer**, **Open** and **Pick
      another**
- [ ] **Pick another** doesn't repeat a title until every title that fits has been picked
- [ ] One title fits: "There's only one, and it's this one." No titles: the button is disabled with the
      reason
- [ ] **Mark as watched** on the pick (MATCH-6)
- [ ] The pick is shown only to the person who tapped; it isn't sent to the other person

### MATCH-6 · Mark a match as watched together

As two people who just watched a film, we want to mark it as watched, so that it stops showing up as
something to watch.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **Mark as watched** from the poster's menu on the shared list, from "pick one for us" and from the title
      page's match chip
- [ ] Either person can mark it, and it moves to the Watched section for both, with the date
- [ ] **Undo** for 5 seconds, and later **Move back to matches** from the Watched section
- [ ] It doesn't change anyone's Likes (decision 7)
- [ ] A title that matches with several connections is marked watched only on the list where you marked it

### MATCH-7 · The Watched section

As two people who've watched a few things together, we want to see what we've watched, so that we remember.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] At the bottom of the shared list, collapsed, with its count: "Watched together (3)"
- [ ] Most recently watched first, with the date watched
- [ ] Titles stay here even if someone removes the Like later (decision 7)
- [ ] Filters and "pick one for us" ignore this section

### MATCH-8 · No matches yet

As two people who just connected, we want the empty list to say what happens next, so that we don't think
it's broken.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] "No matches yet. Keep liking titles: when you both like the same one, it shows up here." with **Browse
      titles**
- [ ] **Privacy:** P1. It doesn't say how many titles either person has liked.

## Match lifecycle

What happens to a shared list in every case. MATCH stories and the M7 backend follow this table.

| Event                                              | On the shared list                                                                  | Notified                   |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| You like a title your connection likes             | Added, marked **New**                                                               | The other person (NOTIF-1) |
| You like a title your connection doesn't like      | Nothing                                                                             | Nobody (P1)                |
| Either person unlikes a matched title              | Removed, unless it's in Watched                                                     | Nobody                     |
| Undo of that unlike                                | Back, with its original match date                                                  | Nobody                     |
| A match is marked watched                          | Moved to Watched for both                                                           | Nobody                     |
| The title is removed from TMDB                     | Stays as a plain tile, "Not available anymore", and can be removed by either person | Nobody                     |
| The connection ends (or either account is deleted) | Deleted for both, Watched included                                                  | Nobody (P5)                |
| The two people connect again                       | Rebuilt from current Likes; Watched starts empty                                    | Both, grouped (NOTIF-3)    |
| An invite is accepted                              | Built from both people's current Likes                                              | The inviter (NOTIF-2)      |

## Notifications

### NOTIF-1 · A new match

As someone who liked a title days ago, I want to hear when my person likes it too, so that I know our list
grew.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] "New match with Sam: Dune" with the poster where the system allows it
- [ ] Opening it goes to that shared list with the title highlighted
- [ ] The person whose Like made the match isn't notified; they saw it on screen (MATCH-1)
- [ ] **Privacy:** P1, P2

### NOTIF-2 · An invite was accepted

As someone who sent an invite, I want to know when it's accepted, so that I can open our list.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] "Sam accepted your invite. You have 5 matches already." (or "Start liking titles to find matches.")
- [ ] Opening it goes to the new shared list
- [ ] **Privacy:** P3. There's no notification for a decline or an expired invite.

### NOTIF-3 · Several matches at once

As someone whose person liked a lot of titles in one evening, I want one notification, not ten, so that my
phone doesn't keep buzzing.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Matches with the same connection within 10 minutes of each other are grouped: "3 new matches with Sam:
      Dune, Past Lives and 1 more"
- [ ] A rebuilt list (CONN-4) or a new connection is always one notification
- [ ] Each connection is grouped on its own

### NOTIF-4 · Where notifications arrive

As someone using the app on several devices, I want notifications where I am, so that I don't miss a match.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] **Desktop:** system notifications while the app is running, including minimized. Clicking one brings
      the app to the front on the right screen.
- [ ] **Web:** in the app while a tab is open (a short message and the notification list); no browser push in
      the first version
- [ ] **Phone:** push notifications, even when the app is closed
- [ ] The phone asks for permission after your first invite is sent or accepted, with a line on why, never on
      first launch. Saying no only turns off push; the notification list still works.
- [ ] Follows the notification settings (SET) and mutes (CONN-2)
- [ ] A notification already read on one device doesn't stay unread on the others

### NOTIF-5 · The notification list

As someone who missed a notification, I want to see recent ones in the app, so that I can catch up.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] A bell in the navigation with the number of unread notifications (none shown for muted connections)
- [ ] The last 30 days, newest first, grouped as in NOTIF-3; unread ones are marked
- [ ] Opening one marks it read and goes where its notification would
- [ ] **Mark all as read**
- [ ] Empty: "Nothing yet. You'll see new matches and accepted invites here."
- [ ] Entries for a connection that ended are removed (P5)

## States

| Situation              | What the person sees                                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loading a shared list  | The header with both photos at once; poster skeletons in the grid                                                                                                             |
| Offline                | Lists open as last seen, with "You're offline. Matches may be out of date." Creating, accepting and revoking invites, and ending a connection, are disabled with that reason. |
| Real-time updates drop | The app reloads the list when it comes back to the front or the connection returns; nothing is lost                                                                           |
| TMDB down              | Shared lists show titles as plain tiles with title and year; filters by genre and runtime still work from saved data                                                          |
| The server is down     | "Matches aren't available right now" with **Try again**; Likes made meanwhile are kept (LIKE-3)                                                                               |

## Later

After the first version. IDs are reserved so the wireframes can leave room for them.

### NOTIF-6 · Email notifications

As someone who doesn't open the app every day, I want an email about new matches, so that I see them anyway.

**Clients:** D W M · **Release:** later

- [ ] At most one email a day, listing new matches per connection; off by default, turned on in Settings

### MATCH-9 · Tick the matches on your streaming services

As someone with two subscriptions, I want to see at a glance which matches I can stream tonight, without
losing the others, so that we can still rent or subscribe for the right one.

**Clients:** D W M · **Release:** later

- [ ] Uses the services you set in SET-11; a match on one of them gets a tick and the service's logo
- [ ] Nothing is hidden or filtered out because it's on another service
      ([decision 15](../requirements.md#6-decisions))
- [ ] The same tick appears on the title page's where to watch (TITLE-4) and in "pick one for us"
- [ ] **Privacy:** the ticks are for your services only. Your connection never sees which services you have.
