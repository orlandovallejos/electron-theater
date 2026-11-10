# 5. One styling system, shared tokens, and how much UI the clients share

- **Status:** Accepted
- **Date:** 2026-11-09

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
- **NativeWind** (MIT) runs Tailwind classes on React Native. The stable 4.2 line uses Tailwind 3; version 5
  (release candidate since September 2026) uses Tailwind 4 and the same CSS-first theme.
- **react-native-web 0.21** (MIT) runs React Native components in the browser. UI kits built on it,
  such as gluestack-ui 5 and react-native-reusables, are maintained and use NativeWind for styling.
- [ADR 4](0004-monorepo-layout.md) plans a DOM-only `packages/ui` shared by desktop and web, with mobile writing
  its own UI on the same tokens, and puts the tokens in `core`.
- The roadmap's first principle: only free, maintained tools.

## Decision

### 1. The styling system: Tailwind CSS

We will style desktop and web with **Tailwind CSS 4**, and mobile with **NativeWind** (version 5, the
Tailwind 4 line), so all three clients use the same class names and the same theme.

Components use token classes only (`bg-surface`, `text-muted`, `p-4`). Arbitrary values such as
`bg-[#123456]` are not allowed; the lint rule in #130 enforces it. Values computed at runtime (the poster
tints from `node-vibrant`) are passed as CSS variables in a `style` attribute, with a comment, and the
classes read them (`bg-(--poster-tint)`).

Conditional classes use `clsx`. A component with variants (Button: primary, secondary, outlined) maps each
variant to its classes in a plain object. We add `tailwind-merge` or `class-variance-authority` only if that
gets hard to read.

### 2. What happens to each current library

| Library                                                                | Decision    | Why                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| styled-components                                                      | **Removed** | In maintenance mode, v5 is unmaintained, and it injects styles at runtime. Tailwind replaces all of it.                                                                                                                                                                                                                    |
| `@mui/joy`, `@emotion/react`, `@emotion/styled`                        | **Removed** | Joy is an on-hold beta used for two components, and it brings a second CSS-in-JS runtime with its own theme. The rating circle becomes a small SVG component; the modal becomes a native `<dialog>` opened with `showModal()` (the rest of the page becomes inert, Escape closes it, and `::backdrop` styles the overlay). |
| `sass`, `sass-loader`, `@teamsupercell/typings-for-css-modules-loader` | **Removed** | Nothing uses them. The webpack rules go too.                                                                                                                                                                                                                                                                               |
| `polished`                                                             | **Removed** | CSS does the same now: `color-mix(in srgb, var(--poster-tint) 50%, transparent)` replaces `transparentize`, and Tailwind's opacity modifiers (`bg-surface/80`) cover the static cases.                                                                                                                                     |
| `themes/default.ts`, `types/styled.d.ts`, `App.global.css`             | **Removed** | Replaced by the tokens and Tailwind's base layer.                                                                                                                                                                                                                                                                          |
| `node-vibrant`, `ionicons`                                             | Kept        | Not styling libraries: one reads colors from posters, the other is the icon set.                                                                                                                                                                                                                                           |

The removal itself is #129, after the screens are migrated.

When a component needs behavior that's hard to get right (a menu, a combobox, a toast that screen readers
announce), we use a **headless** library that brings behavior and accessibility but no styles, so Tailwind
stays the only way to style. The default choice is React Aria Components (Apache 2.0, Adobe, active); the
choice is made in the issue that first needs it, not up front.

### 3. How much UI the clients share: option A

We will keep the plan from ADR 4 (**option A**):

- **Tokens and class names** are shared by all three clients.
- **Desktop and web share DOM components** (`packages/ui`, extracted in M5) and screens (`packages/screens`).
- **Mobile writes its own components** with React Native primitives and the same classes through NativeWind.

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
  (dark is the default, selected by an attribute on the root element). Desktop and web import it, and so can
  NativeWind 5.
- a NativeWind preset in JavaScript, only if mobile ends up on NativeWind 4 (Tailwind 3 needs a JavaScript
  config instead of `@theme`).

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

If Tailwind doesn't work out (for example, NativeWind 5 isn't stable by M9 and version 4 can't share the
theme), the tokens still stand: they generate CSS variables, and components can use **CSS Modules** with
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
- Mobile depends on NativeWind 5 becoming stable before M9. If it doesn't, the fallback above applies, and
  the generator gains the JavaScript preset.
- ADR 4 is amended: tokens live in `packages/tokens`, not in `core`. The roadmap's package list is updated to
  match.
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
- **Tokens in `core`** (ADR 4's plan): one package fewer. But it mixes generated CSS and a generator into the
  package that the backend and the agent use for types and logic.
- **Tokens as JSON with Style Dictionary:** the standard format, readable by design tools. It adds a
  dependency and a config for a handful of tokens that only our own code reads. It's the fallback format.
