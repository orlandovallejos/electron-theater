# 5. One styling system, shared tokens, and how much UI the clients share

- **Status:** Accepted
- **Date:** 2026-11-09
- **Amended:** 2026-11-10, components start from shadcn/ui and react-native-reusables, on Radix primitives (#144).

## Context

M4 gives the app one look, defined once in design tokens. Web (M8) and mobile (M9) come later and must use the
same tokens, so that changing one token updates all three clients (the M12 proof). Before building tokens we
need one way to style things.

What the [UI audit](../design/audit.md) found in the desktop renderer:

- **styled-components 5** styles every component: 12 files, about 530 lines. v5 has had no release since May
  2023, and the maintainer put the project in maintenance mode in March 2025, advising against it for new
  projects.
- **Joy UI** (`@mui/joy`, on Emotion) draws two components in one file: the rating circle and the trailer
  modal. It is still a beta, its last release was March 2025, and MUI says it is on hold. Emotion is only
  installed because Joy needs it.
- **Sass** is installed and wired into webpack, but no `.scss` file exists.
- **`polished`** adds transparency to three runtime colors.
- A `themes/default.ts` with 6 values that no component reads through the theme provider, 17 hex colors and
  16 spacing values.

Facts about the options, checked on 2026-11-09:

- **Tailwind CSS 4.3** (MIT, released this week) generates a static CSS file at build time from the classes it
  finds in the source. Version 4 is configured in CSS: an `@theme` block defines the tokens, and each one
  becomes both a utility class (`bg-surface`) and a CSS variable (`--color-surface`). It plugs into webpack
  through `postcss-loader` and `@tailwindcss/postcss`.
- **Tailwind on React Native** needs a library that turns classes into React Native styles:
  - **NativeWind** (MIT, 8.1k GitHub stars, 2.7 million npm downloads a week). The stable 4.2 line needs
    Tailwind 3, so it can't read a Tailwind 4 theme. Version 5, which uses Tailwind 4, has been in preview or
    release candidate since September 2025 (rc.1 on 2026-11-02). Nearly all commits come from one maintainer.
  - **Uniwind** (MIT, 1.7k stars, 1.5 million downloads a week), from the team behind Unistyles. Stable since
    1.0 in November 2025, built for Tailwind 4's CSS-first theme, with the same `className` API as NativeWind.
    It is young (created July 2025) but active (74 commits since August 2026, 1 open issue). A paid Pro tier
    adds performance features we don't need.
  - Both need **React 19** and React Native 0.81 or later. The desktop app is on React 18; the upgrade is #99
    in M5.
- **Icons:** the app uses ionicons 8 (515 icons in 3 styles, web only, delivered as SVG strings). Its outline
  icons need CSS the app doesn't load, which is bug #140. **Lucide** (ISC, 25.7k stars, 2,046 icons, releases
  every few days) ships React and React Native packages from one repo with the same names, and has the icons
  the planned screens need: heart, popcorn, clapperboard, film, ticket, tv, list, lock, users, bell.
- **react-native-web 0.21** (MIT) runs React Native components in the browser. UI kits built on it,
  such as gluestack-ui 5 and react-native-reusables, are maintained and use NativeWind for styling.
- **Ready-made components:**
  - **shadcn/ui** (MIT, 128k GitHub stars, CLI at 17.8 million npm downloads a week, release on 2026-10-27) is
    not a package you install. Its CLI copies each component's source into your repo, where you own it. The
    components are written with Tailwind and Lucide, on top of a primitives library for behavior; Radix, Base
    UI and React Aria are all supported, with about 66 components each.
  - **react-native-reusables** (MIT, 8.7k stars, 17 open issues) is shadcn/ui for React Native: the same
    copy-in model, the same component names and props, styled with Uniwind or NativeWind, on `@rn-primitives`
    (a React Native port of Radix's API). It has about 30 components; Sheet, Toast, Sidebar and Empty aren't
    among them. It is quieter than shadcn (3 commits since August 2026).
- [ADR 4](0004-monorepo-layout.md) plans a DOM-only `packages/ui` shared by desktop and web, with mobile writing
  its own UI on the same tokens, and puts the tokens in `core`.
- The roadmap's first principle: only free, maintained tools.

## Decision

### 1. The styling system: Tailwind CSS

We will style desktop and web with **Tailwind CSS 4**, and mobile with a **Tailwind 4 library for React
Native**, so all three clients use the same class names and the same theme. The default is **Uniwind**, with
**NativeWind 5** as the fallback once it's stable. The final pick is made at the start of M9 with a one-day
spike (the token theme, a few components, Expo's current SDK), because both are moving fast and M9 is months
away. Either way the classes and the theme file are the same, so the choice doesn't touch the tokens or the
desktop and web code.

Components use token classes only (`bg-surface`, `text-muted`, `p-4`). Arbitrary values such as
`bg-[#123456]` are not allowed; the lint rule in #130 enforces it. Values computed at runtime (the poster
tints from `node-vibrant`) are passed as CSS variables in a `style` attribute, with a comment, and the
classes read them (`bg-(--poster-tint)`).

Conditional classes use shadcn's `cn()` helper (`clsx` plus `tailwind-merge`, so a class passed by the caller
wins over the component's own). Components with variants (Button: primary, secondary, ghost) define them
with `class-variance-authority`, as the shadcn components we copy already do.

### 2. What happens to each current library

| Library                                                                | Decision               | Why                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| styled-components                                                      | **Removed**            | In maintenance mode, v5 is unmaintained, and it injects styles at runtime. Tailwind replaces all of it.                                                                                                                                                                         |
| `@mui/joy`, `@emotion/react`, `@emotion/styled`                        | **Removed**            | Joy is an on-hold beta used for two components, and it brings a second CSS-in-JS runtime with its own theme. The rating circle becomes a small SVG component; the modal becomes shadcn's Dialog (see [Components](#components-start-from-shadcnui-and-react-native-reusables)). |
| `sass`, `sass-loader`, `@teamsupercell/typings-for-css-modules-loader` | **Removed**            | Nothing uses them. The webpack rules go too.                                                                                                                                                                                                                                    |
| `polished`                                                             | **Removed**            | CSS does the same now: `color-mix(in srgb, var(--poster-tint) 50%, transparent)` replaces `transparentize`, and Tailwind's opacity modifiers (`bg-surface/80`) cover the static cases.                                                                                          |
| `themes/default.ts`, `types/styled.d.ts`, `App.global.css`             | **Removed**            | Replaced by the tokens and Tailwind's base layer.                                                                                                                                                                                                                               |
| `ionicons`                                                             | **Replaced by Lucide** | See [Icons](#icons-lucide). Fixes #140 along the way.                                                                                                                                                                                                                           |
| `node-vibrant`                                                         | Kept                   | Not a styling library: it reads the colors from posters.                                                                                                                                                                                                                        |

The removal itself is #129, after the screens are migrated.

### Components: start from shadcn/ui and react-native-reusables

We won't write common components from scratch. Dialogs, sheets, menus, toasts and text fields are hard to get
right (focus, keyboard, screen readers), and these have been built, tested and used by many teams.

- **Desktop and web:** a component starts from **shadcn/ui**. Its CLI copies the source into our repo (the
  desktop app's `common/` until M5, then `packages/ui`), and we restyle it with our token classes. Copied code
  is ours: we can change it, and an upstream project slowing down can't break us.
- **Mobile:** its twin starts from **react-native-reusables**, with the same name and props, so a screen reads
  the same on both. Where reusables has no component (Sheet, Toast), we build the mobile one ourselves or pick
  a library in M9.
- **Behavior primitives: Radix** (`radix-ui`, MIT, 26.9 million downloads a week, release on 2026-10-12).
  Primitives are headless: they bring behavior and accessibility but no styles, so Tailwind stays the only way
  to style. We pick Radix because `@rn-primitives` copies its API, so the web and mobile versions of a
  component have the same structure (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`). If Radix stalls,
  shadcn offers the same components on Base UI (by Radix's original authors) and React Aria.
- **Ours from the start:** the components specific to Movie Mates (PosterItem, Hero, DetailHeader,
  RatingRing, HeartToggle, MatchBadge…), built from tokens and, where it helps, on top of a copied one (a
  HeartToggle on shadcn's Toggle).

The [component inventory](../design/components.md) says where each component starts from. Components are
copied when an issue first needs them, not all up front.

### Icons: Lucide

We will use **Lucide**: `lucide-react` on desktop and web, `lucide-react-native` on mobile, with the same icon
names everywhere. Each icon is a React component that takes its size and color from the text around it
(`currentColor`), so it follows the tokens like text does. The liked heart is the same `Heart` icon filled
(`fill="currentColor"`). Lucide replaces ionicons in #127, when `Icon` moves to Tailwind, which also fixes
#140. Only the icons we import end up in the bundle.

### 3. How much UI the clients share: option A

We will keep the plan from ADR 4 (**option A**):

- **Tokens and class names** are shared by all three clients.
- **Desktop and web share DOM components** (`packages/ui`, extracted in M5) and screens (`packages/screens`).
- **Mobile writes its own components** with React Native primitives and the same classes (through Uniwind or
  NativeWind, above).

Option B (one set of React Native components for every client, running on the web through
react-native-web) is described under [Alternatives](#alternatives-considered). We don't choose it now
because it would rewrite the desktop markup during M4 for a client that doesn't exist until M9, and the
amount that mobile could reuse is unknown until its screens are designed. We revisit it before M9, when the
mobile screens are known; that's the point where it is cheapest to change, because `packages/ui` will have a
few components and no mobile code will exist yet.

### 4. Where the tokens live: `packages/tokens`, written in TypeScript

The tokens get **their own package, `packages/tokens`**, instead of a folder in `core` as ADR 4 planned:

- Only UI clients need them; the backend and the agent import `core` and don't need colors.
- The package has a generator and generated files (below), which `core` doesn't have and shouldn't need.
- The M12 proof is "change one tokens file". A package with one job makes that file easy to find.

**Format:** the source is **plain TypeScript** objects (`as const`), in two layers (base values and named
roles; #124 defines them). TypeScript gives autocomplete and type errors for a missing role, and Jest can test
that every role points at a base value. JSON in the W3C design tokens format (with Style Dictionary) is the
fallback if a design tool ever needs to read or write the tokens.

**Outputs** (#125), generated by `npm run tokens`:

- `theme.css`: Tailwind's `@theme` block with the base values, plus the light and dark roles as CSS variables
  (dark is the default, selected by an attribute on the root element). Desktop and web import it, and so does
  mobile: Uniwind and NativeWind 5 both read Tailwind 4's `@theme`.
- a JavaScript preset, only if mobile ever has to use NativeWind 4 (Tailwind 3 needs a JavaScript config
  instead of `@theme`).

The generated files are **committed**, and CI regenerates them and fails if they differ. That keeps the
package source-only as ADR 4 asks: apps import the files and don't need to run a build step first.

### 5. The migration path

The app works at every step, and each step is one PR:

1. **#124, #125:** create the tokens and generate the Tailwind theme.
2. **#126:** add Tailwind to the webpack build next to styled-components, with Tailwind's reset (Preflight)
   **off**, so the current screens don't change. Convert `GoBackButton` as the proof.
3. **#127:** move Home and the shared components (`AppBar`, `Button`, `PosterItem`, `Icon`, `Layout`).
4. **#128:** move MovieView, replacing Joy's rating circle and modal.
5. **#129:** remove the libraries in the table, turn Preflight on, and move the font and base styles into
   Tailwind's base layer.

Each PR compares against the [audit's screenshots](../design/audit.md#screenshots-before) and lists any visible
change on purpose (for example a value that moves to the 4 px scale).

### Fallback

If Tailwind doesn't work out on mobile (for example, neither Uniwind nor NativeWind 5 works with the Expo SDK
of the day), the tokens still stand: they generate CSS variables, and components can use **CSS Modules** with
those variables on desktop and web (webpack already supports them), and `StyleSheet` objects built from the
same TypeScript tokens on mobile. Only the component styles would change, not the tokens or the M12 proof.

## Consequences

- One way to style. The next contributor reads classes in the markup instead of looking for a `style.ts`.
- No CSS-in-JS runtime: styles are one static file built at compile time. Once #129 removes Joy and
  styled-components, nothing injects `<style>` tags, so the packaged build's CSP may be able to drop
  `style-src 'unsafe-inline'` (React sets `style` props through the DOM, which that rule doesn't block; the dev
  server still injects `<style>` tags for hot reload). Check it in #129.
- The tokens reach every client through one generated file, which is what the M12 proof needs.
- Markup gets longer class lists. Long ones are a sign that a component should be split.
- Tailwind is new to the project, so M4 includes learning it. The token theme keeps the set of classes small.
- Mobile depends on a young library (Uniwind) or one whose Tailwind 4 version isn't stable yet (NativeWind 5).
  The M9 spike decides; the fallback above covers the case where neither works.
- **React 19 must land before M9.** Both mobile libraries need it, and two React versions in one monorepo
  would mean duplicate copies and type conflicts. The desktop upgrade (#99) is in M5.
- ADR 4 is amended: tokens live in `packages/tokens`, not in `core`. The roadmap's package list is updated to
  match.
- Copied components are ours to maintain: upstream fixes don't arrive on their own. Note the shadcn or
  reusables version in a comment at the top of each copied file, so it's clear what to compare against.
- shadcn's components use its own role names (`bg-background`, `text-muted-foreground`, `bg-primary`). The
  tokens in #124 either use the same role names or the copied components are renamed once when they're copied;
  #124 decides, and the lint rule (#130) catches leftovers.
- Follow-ups: the font is loaded from Google Fonts at startup; self-hosting it (for example with Fontsource)
  would remove a network call and two CSP entries. Decide it with the type tokens in #124.

## Alternatives considered

- **Stay on styled-components (and move to v6):** the least rewriting on desktop, and v6 is still released.
  But the project is in maintenance mode and advises against new adoption, it has no React Native story that
  shares output with the web, and it keeps a runtime that injects styles.
- **Stay on Joy UI (or move to Material UI):** a full component library with a theme. Joy is on hold;
  Material UI is maintained but brings Material's look, Emotion, and a theme format that React Native can't
  use. We would be styling against the library's design instead of our own.
- **CSS Modules or plain CSS with CSS variables:** no new dependency and very simple, and it is the fallback.
  But each component invents its own class names, nothing stops a hard-coded value except review, and mobile
  can't use it.
- **Option B: React Native components everywhere (react-native-web, with gluestack-ui or
  react-native-reusables):** one component set for all three clients, so fewer duplicates in M9. But it
  rewrites the desktop markup into React Native primitives (`View`, `Text`, `Pressable`) now, reverses ADR 4's
  DOM-only `ui` package, adds a runtime layer to desktop and web, and gives up web features that don't map to
  React Native (native `<dialog>`, CSS hover and grid layouts, the YouTube `<iframe>`). It's the better choice
  if the mobile screens turn out to be nearly the same as the web ones; that's why it is revisited before M9.
- **NativeWind as the only mobile option** (this ADR's first draft): the most used library, but its Tailwind 4
  version has been a release candidate for over a year, and it depends mostly on one maintainer.
- **Other icon sets:** Tabler Icons (MIT, 5,200+ icons, very active) has the most icons but no popcorn and a
  more technical style. Phosphor (MIT, 1,500 icons in 6 weights, including true filled versions) has the best
  liked/unliked pairs, but its React package hasn't had a release since May 2025. Keeping ionicons means
  keeping web-only SVG strings and adding its CSS by hand.
- **Ant Design:** a mature, well-maintained library for the web (100k stars), with **Ant Design Mobile**
  (for phone browsers, not React Native) and a separate **Ant Design React Native** (3.3k stars, last release
  August 2025). It brings its own CSS-in-JS runtime and theme format, which is what this ADR removes, an
  enterprise look that would compete with the posters, and a React Native version that is much smaller and
  looks different from the web one.
- **Writing every component ourselves:** full control and nothing to keep in sync, but slower, and focus
  handling, keyboard support and screen-reader behavior are easy to get wrong.
- **React Aria as the primitives** (this ADR's first draft): the strongest accessibility work, and shadcn
  supports it, but React Native has no matching port, so web and mobile components would be built differently.
- **Tokens in `core`** (ADR 4's plan): one package fewer. But it mixes generated CSS and a generator into the
  package that the backend and the agent use for types and logic.
- **Tokens as JSON with Style Dictionary:** the standard format, readable by design tools. It adds a
  dependency and a config for a handful of tokens that only our own code reads. It's the fallback format.
