# CLAUDE.md — Smart Playground (practice repo)

This is a small slice of the **Smart Playground** web app, set up for interns to practice an
AI-assisted build workflow. Read this file before doing anything; it explains how the code is
organized and the rules to follow.

## What this project is

Smart Playground is a research project: kids play with handheld "wand" modules on a playground,
and a teacher/researcher drives them from a phone web app. The app is a chat-like remote control —
you pick a game ("command") and send it to all the wands at once.

This repo contains just the **command palette** part of that app: the row of game buttons you tap
to choose what to send.

## How to run it

- `npm install` — install dev dependencies (Jest).
- `npm run dev` — serve the app at <http://localhost:8000>. Open `index.html` there.
  (It must be served over http, not opened as a `file://` — the app fetches `commands.json`.)
- `npm test` — run the Jest test suite.

`index.html` is a **standalone harness**, not the real app. The real app talks to an ESP32 hub
over USB (PyScript + Web Serial), which needs the physical hardware. The harness imports the real
command-palette component and renders it with fake callbacks so you can see and click the buttons
in a normal browser.

## Architecture

Vanilla JavaScript, ES modules, **no framework and no build step**. Files are served as-is.

```
js/
  utils/
    commands.json   ← SINGLE SOURCE OF TRUTH for every game button (id, label, color, icon, description)
    constants.js    ← loads commands.json; helpers like getFilteredCommands()
  state/
    store.js        ← reactive app state + setState(); components re-render on change
  components/
    common/icons.js                      ← builds icon elements (uses Lucide icon names)
    messaging/messageInput.js            ← THE COMMAND PALETTE — builds the game buttons
    overlays/commandInfoOverlay.js       ← the "info" popup describing a game
reference/
  wand_bell_choir.py   ← read-only example of wand firmware (MicroPython). Context only — do not edit.
tests/
  commands.test.js     ← guards the shape of commands.json
```

### Key idea: data vs. presentation

- **What games exist** and their color/icon/description lives in `commands.json`.
- **How a game button looks** lives in `messageInput.js` (and `icons.js` for the icon chip).

When you change the buttons, decide for each change: is it *data* (belongs in `commands.json`) or
*presentation* (belongs in the component)? Colors and icons per game are data; layout, shape,
spacing, and selected-state styling are presentation.

### How the palette renders

`createMessageInput(...)` in `messageInput.js` builds the DOM for the palette. It calls
`getFilteredCommands()` to get the list, then for each command creates a button with an icon chip
(`getCommandIcon`) and a label. Lucide turns `<i data-lucide="name">` placeholders into SVGs —
after building new icon markup you must let `lucide.createIcons()` run (the harness already calls it
on every render).

## Conventions

- Plain ES modules with relative imports ending in `.js`. No bundler, no TypeScript.
- Tailwind utility classes for styling (loaded from CDN). Inline `style` only for dynamic values
  like a per-game background color.
- Icons are [Lucide](https://lucide.dev) icon names. If you reference a new icon, use a real Lucide
  name or it will render blank.
- Keep components as pure functions that build and return a DOM node — no global side effects.
- Match the style of the surrounding code (naming, comment density, formatting).

## Verifying your work

Two kinds of checks, and you should use both:

1. **Automated:** `npm test` must pass. If you change the *shape* of the data (new fields, new
   invariants the design requires), add or update a test in `tests/commands.test.js` to cover it.
2. **Visual:** `npm run dev`, open the page, and compare against the design reference
   (`design/Command Buttons Design Reference.html`, open it in a browser). Click a button to
   confirm the selected/staged state works and the send button reacts.

A change isn't done until both pass. Don't claim it works without actually running it.
