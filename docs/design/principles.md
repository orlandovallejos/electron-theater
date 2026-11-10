# Design principles

Short rules for deciding how something should look and behave in Movie Mates. When two designs both "look
right", these break the tie. Each one has an example from the app, today or planned.

The product they serve: two people each like titles privately during the week, and later open the list of
titles they both liked and start watching. See
[How likes, lists and matches work](../ROADMAP.md#how-likes-lists-and-matches-work).

## 1. Posters are the content; the UI stays out of the way

People choose with their eyes. Artwork gets the space and the color; everything around it is dark and
neutral, so it doesn't compete.

- **Do:** a poster grid on a plain background, with the title and year small and muted underneath. On the
  detail view, the color comes from the poster itself (the `node-vibrant` tint).
- **Don't:** colored panels, gradients or borders on the chrome. Today's primary button gradient is the one
  place the UI shouts louder than the posters.

## 2. Private looks private, shared looks shared

Likes and your own lists are never seen by anyone else; a match list belongs to two people. Nobody should have
to wonder who can see something.

- **Do:** a small "Only you" cue with a lock on Likes and on your own lists; the other person's avatar on
  every shared match list. Private and shared screens never use the same header.
- **Don't:** explain privacy in a paragraph. One consistent cue, repeated, does it better.

## 3. One obvious action per screen

There is one thing most people want to do on each screen. It's the primary button; everything else is
quieter.

- **Do:** on a title, the heart is the main action; the trailer is secondary. On a match list, opening a title
  is the main action.
- **Don't:** two buttons of equal weight. Today the Home hero has "Trailer" and "Watchlist" side by side, and
  neither does anything yet.

## 4. Every state is designed, not only the happy one

The app starts empty (no Likes, no connections, no matches) and talks to the network. Empty, loading, saving
and failed states are part of the design, not an afterthought.

- **Do:** an empty state that says what to do next ("Tap the heart on anything you'd like to watch"), a
  skeleton while posters load, and a heart that shows it's saving and says so if it fails.
- **Don't:** a blank screen. Today the whole app renders nothing until the TMDB configuration loads.

## 5. Works with a keyboard and a screen reader

Everything you can click, you can reach with Tab, see focused, and hear named.

- **Do:** a visible focus ring from the `color.focus` token on every control; a label on every icon-only
  button ("Go back", "Like Dune"); `aria-pressed` on the heart.
- **Don't:** `outline: none` without a replacement. The [audit](audit.md#accessibility-gaps) found it on every
  button.

## 6. Tokens only

Every color, space, size, radius, shadow and duration comes from a design token, so changing a token changes
every client (the M12 proof).

- **Do:** `bg-surface p-4 text-muted rounded-md`.
- **Don't:** `#747474`, `padding: 26px`, or Tailwind's arbitrary values (`bg-[#123456]`). The one exception is a
  color computed at runtime from a poster, passed as a CSS variable with a comment
  ([ADR 5](../adr/0005-styling-and-design-tokens.md)).

## 7. Calm motion

Motion explains what happened (a title was liked, a sheet opened); it isn't decoration.

- **Do:** short transitions from the duration tokens, and none when the system asks for reduced motion.
- **Don't:** half-second transitions on every hover. Today's poster lift and button fades take 0.5 s and
  ignore `prefers-reduced-motion`.
