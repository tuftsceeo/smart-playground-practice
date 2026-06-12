# Smart Playground — Command Buttons practice repo

A small practice project for summer interns. You'll take a real slice of the **Smart Playground**
web app and implement a new button design that came out of **Claude Design**, using a professional
AI-assisted workflow in **Claude Code**.

This repo is intentionally small so you can read all of it in a few minutes.

## What's the app?

Smart Playground lets kids play games on handheld "wand" modules on a playground. A teacher or
researcher drives the wands from a phone web app that works like a group chat: you pick a game and
send it to all the wands at once. This repo is just the part where you **pick a game** — the row of
command buttons.

## Setup

You'll need [Node.js](https://nodejs.org) and Python 3 (for the dev server) installed.

```bash
npm install      # install Jest
npm run dev      # serve at http://localhost:8000  → open that in your browser
npm test         # run the tests
```

`index.html` (served at <http://localhost:8000>) is a practice harness that renders the real
command palette in your browser. The actual app needs a USB-connected hub, so this stand-in lets
you see and click your changes without any hardware.

## Your task

See **[SPEC.md](SPEC.md)**. In short: a designer redesigned the command buttons into a colorful
"sticker tray," and you'll implement it. The spec walks you through the workflow we want you to
practice:

1. **Explore before building** — have Claude Code read the code and explain it first.
2. **Plan with Opus** — switch to Opus, have it write a plan *and* spell out how you'll verify the
   result. No code yet.
3. **Execute with Sonnet** — switch to Sonnet, have it carry out the plan, then run the tests and
   the page and check the result yourself.

## Map of the repo

| Path | What it is |
| --- | --- |
| `index.html` | Practice harness — renders the command palette in a browser |
| `design/Command Buttons Design Reference.html` | The button design from **Claude Design** — open in a browser; this is what you're implementing |
| `js/utils/commands.json` | The list of games and each one's color, icon, and description |
| `js/components/messaging/messageInput.js` | The command palette component (the buttons) |
| `js/components/common/icons.js` | Builds the icon chips |
| `js/state/store.js` | App state |
| `tests/commands.test.js` | Tests for the command data |
| `reference/wand_bell_choir.py` | Example wand firmware — **read-only context**, don't edit |
| `CLAUDE.md` | Conventions Claude Code reads automatically |

## Note on the wand reference

`reference/wand_bell_choir.py` is real firmware that runs *on a wand* (MicroPython on an ESP32). It
won't run on your laptop and isn't part of the task — it's there so you can see what the device on
the other end of a command actually does. Good thing to point Claude Code at if you're curious.
