# Component inventory

What exists today, what the next screens need (M6 Likes and your own lists, M7 connections and matches), and
where each component lives. Build from this list before inventing a new component.

**Where components live** ([ADR 5](../adr/0005-styling-and-design-tokens.md), option A):

- **Shared:** desktop and web use the same DOM component, in `packages/ui` from M5 (in
  `apps/desktop/src/renderer/common` until then). Mobile writes a twin with React Native primitives and the
  same Tailwind classes (NativeWind): it looks the same but isn't the same code.
- **Shared, mobile differs:** desktop and web share the component, but mobile uses its own platform pattern
  for the same job (a bottom sheet instead of a dialog, for example).
- **Per app:** each app has its own, because it's tied to the app's frame or router.
- **Desktop only:** depends on Electron.

**Clients:** D = desktop, W = web (M8), M = mobile (M9).

## Rules for a shared component

1. **Data in through props, events out through callbacks.** It doesn't fetch, read the router or call
   `window.electron`. Screens do that and pass the result down.
2. **Variants, not one-off props.** `variant="primary" | "secondary" | "ghost"`, not `blueBackground`.
3. **Every state is listed below** and has a story (#131). Disabled, loading and error states count.
4. **Tokens only**, so a theme change reaches it ([principle 6](principles.md#6-tokens-only)).
5. **Accessible by default:** a name, keyboard support and a visible focus style, without the caller having to
   remember.

## What exists today

| Component                                     | Purpose                                                              | States                                                                           | Clients | Where                                    | Notes                                                                                                                                                                      |
| --------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AppBar**                                    | Draggable title bar with the close, minimize and full-screen buttons | transparent, blurred (after scrolling 100 px); buttons: idle, hover (icons show) | D       | Desktop only                             | Uses `window.electron`. Web and mobile have no window controls.                                                                                                            |
| **Layout**                                    | Page frame: app bar, content area, routes                            | (none)                                                                           | D, W    | Per app                                  | Each app has its own router and frame; the screens inside are shared from M5.                                                                                              |
| **Button**                                    | The main action on a screen, and quieter actions next to it          | variants: primary, secondary, outlined; hover. Missing: focus, disabled, loading | D, W, M | Shared                                   | Rename `types` to `variant`; replace the gradient with the primary token; add an icon slot.                                                                                |
| **IconButton** (today **GoBackButton**)       | An action shown only as an icon: back, close, more                   | idle, hover. Missing: focus, disabled                                            | D, W, M | Shared                                   | GoBackButton becomes an IconButton with a required `label`; navigation stays in the screen.                                                                                |
| **Icon**                                      | An ionicon, sized and colored like text                              | (none)                                                                           | D, W, M | Shared (mobile uses the same icon names) | Outline icons render as black circles today ([audit](audit.md#screenshots-before)).                                                                                        |
| **PosterItem**                                | A title in a grid: poster, name, rating, year; opens the detail view | loading (no image yet), loaded, no poster, hover (lift and poster tint)          | D, W, M | Shared                                   | The hover tint is a runtime color (white in development until #142); it rotates around the poster in #143. Gets the HeartToggle in M6. Mobile has no hover: press instead. |
| **Section** (today **Home/Content/Section**)  | A heading and a grid or row of PosterItems                           | loading, loaded, empty                                                           | D, W, M | Shared                                   | Used by Home, Likes, your own lists and match lists.                                                                                                                       |
| **Hero**                                      | The large featured title at the top of Home                          | loaded; missing: loading                                                         | D, W    | Shared                                   | One primary action ([principle 3](principles.md#3-one-obvious-action-per-screen)). Mobile: a smaller card.                                                                 |
| **DetailHeader** (today **MovieView/header**) | Backdrop, poster, title, tagline, date, rating, trailer, overview    | loaded with tint, loaded with fallback; missing: loading                         | D, W, M | Shared                                   | Text color must follow the tint ([audit](audit.md#accessibility-gaps)).                                                                                                    |
| **RatingRing** (today Joy's CircularProgress) | The vote average as a number in a ring                               | low, medium, high                                                                | D, W, M | Shared                                   | Becomes a small SVG component (ADR 5). Color is not the only cue: the number is always shown.                                                                              |
| **InfoList** (today **MovieView/content**)    | Facts about a title: status, language, budget, revenue               | loaded, value missing                                                            | D, W, M | Shared                                   | Should be a `<dl>`.                                                                                                                                                        |
| **TrailerDialog** (today Joy's Modal)         | Plays the YouTube trailer over the page                              | closed, open                                                                     | D, W    | Shared, mobile differs (built on Dialog) | Mobile opens the trailer in the YouTube app or a web view instead.                                                                                                         |

## What the next screens need

| Component          | Purpose                                                                         | States                                                                                                   | Clients | Where                  | Needed by |
| ------------------ | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------- | ---------------------- | --------- |
| **HeartToggle**    | Like or unlike a title (adds it to your private Likes)                          | not liked, liked, saving, failed (back to the previous state, with a message); disabled while signed out | D, W, M | Shared                 | M6 (#132) |
| **PrivateBadge**   | The "Only you" cue with a lock on Likes and your own lists                      | (none)                                                                                                   | D, W, M | Shared                 | M6 (#132) |
| **EmptyState**     | What to do when a list or screen has nothing yet                                | with an action, without one                                                                              | D, W, M | Shared                 | M6 (#132) |
| **Skeleton**       | Placeholder shapes while posters and text load                                  | (none; shapes: poster, line, circle)                                                                     | D, W, M | Shared                 | M6 (#132) |
| **ListCard**       | One of your own lists: name, count, a few posters; opens the list               | default, hover/pressed, empty list                                                                       | D, W, M | Shared                 | M6 (#133) |
| **AddToListSheet** | Pick which of your lists a title goes in, or create a new one                   | closed, open, list checked/unchecked, saving, failed                                                     | D, W, M | Shared, mobile differs | M6 (#133) |
| **TextField**      | Type a list name, a name to invite, a search                                    | empty, filled, focused, invalid (with message), disabled                                                 | D, W, M | Shared                 | M6 (#133) |
| **Dialog**         | A modal question or form: confirm deleting a list, ending a connection          | closed, open; with one or two actions; destructive action                                                | D, W, M | Shared, mobile differs | M6 (#133) |
| **Avatar**         | A connected person: photo or initials                                           | photo, initials (no photo), loading                                                                      | D, W, M | Shared                 | M7 (#133) |
| **ConnectionCard** | A person you're connected to or invited, with their shared match list           | connected, invite sent (pending), invite received (accept, decline)                                      | D, W, M | Shared                 | M7 (#133) |
| **MatchBadge**     | Marks a new match on a poster or a match list                                   | new, seen (hidden)                                                                                       | D, W, M | Shared                 | M7 (#133) |
| **Toast**          | A short message that goes away: "New match with Sam", "Couldn't save your like" | info, success, error; with or without an action; announced to screen readers                             | D, W, M | Shared, mobile differs | M7 (#133) |

**Why the sheet, the dialog and the toast differ on mobile:** each platform has its own pattern for them. A
phone uses a bottom sheet and a full-screen modal, where a desktop or web page uses a popover or a native
`<dialog>`. What they show is the same; how they open is not. Everything else has the same layout on every
client.

## Keeping this list current

Add a component here (and to Storybook, #131) in the same PR that creates it. If a screen needs something close
to an existing component, extend that component with a variant before making a new one.
