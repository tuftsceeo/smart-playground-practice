# SPEC — Redesign the command buttons

## The task

A designer mocked up a new look for the command palette in **Claude Design** and handed it off.
Your job is to implement the relevant parts of that design in this codebase.

**Design file:** [`design/Command Buttons Design Reference.html`](design/Command%20Buttons%20Design%20Reference.html)
— it's a self-contained page; just double-click it to open in your browser and view the mockup.

In Claude Code, paste this as your starting instruction:

> Read the design reference at `design/Command Buttons Design Reference.html` and implement the
> relevant aspects of the design.

## What the design asks for (summary)

The design turns the flat gray command buttons into a **colorful "sticker tray."** The big ideas:

1. **One distinct color per game.** Today several games reuse the same few colors (look at
   `bgColor` in `commands.json` — blues, oranges, and pinks repeat). The design gives each of the
   15 games its own hue, organized into color *families* by type of play
   (Color & Light, Music & Sound, Move & Play, Pretend Play, Tools, …).
2. **Full-color tiles, not gray buttons.** Each button is a rounded tile filled with the game's
   color, a white icon, and the label — picked like a sticker/emoji.
3. **Icons that match the play.** Several games currently share an icon; each should get its own.
4. **A clear "picked" (staged) state.** The selected sticker shows a checkmark and stands out; it
   stages in the compose bar with a send button.

> Open the design reference (`design/Command Buttons Design Reference.html`) in a browser and read it
> top to bottom for the exact colors, icons, sizes, and layout. The HTML shows three layout
> directions (A grid, B category trays, C die-cut). It marks **Direction A / the category
> trays as "Recommended."** If which direction to build is unclear, ask before implementing.

## Scope

- **In scope:** the command palette buttons in `messageInput.js`, the per-game color/icon data in
  `commands.json`, and the icon chip in `icons.js` if needed.
- **Out of scope:** the hub connection flow, the message history, anything in `reference/`.
  Don't refactor unrelated code.

## Definition of done (verification)

Your change is done when **all** of these hold — define the exact checks in your plan:

- `npm test` passes.
- Every game has a **unique color** (this is the heart of the design — there should be a test that
  proves it; add one if it isn't there yet).
- `npm run dev` shows colorful tiles, each game visually distinct, matching the design's intent.
- Clicking a button shows the picked/selected state; the send button reacts to a selection.
- No console errors; every icon renders (no blank icon chips → check Lucide icon names are real).

---

## How to work through this (the workflow we're practicing)

Do these as **three separate steps**, not one big ask. The point of the exercise is the workflow.

### 1. Explore first — *don't build yet*

Ask Claude Code to understand the code before changing it. For example:

> Read /js and explain how the command buttons are built and how a game's color and icon are
> decided. Don't write any code yet.

Read its answer. Make sure it matches your own reading of `CLAUDE.md` and the files.

### 2. Plan with Opus — and make it specify verification

Switch the model to **Opus** and ask it to **plan, not build**:

> Based on SPEC.md and the design reference (`design/Command Buttons Design Reference.html`), write a
> step-by-step implementation plan. List exactly which
> files change and why. Include the verification steps — what tests to add or run and what to check
> visually — so we can prove it's done. Do not write the implementation yet.

A good plan names the files, separates data changes (`commands.json`) from presentation changes
(`messageInput.js`), and lists concrete checks (e.g. "add a test asserting all 15 colors are
unique"). Review and tweak the plan before moving on.

### 3. Execute with Sonnet

Switch the model to **Sonnet** and have it carry out the approved plan:

> Implement the plan above. Then run `npm test` and tell me the result, and start the dev server so
> I can look at the page.

Then **verify yourself**: run `npm test`, open the page, click around, and compare to the design.
If something's off, that's normal — go back a step and refine.
