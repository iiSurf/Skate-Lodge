# Skate Lodge

A platform for figure skaters, their coaches, and their clubs. It grows out of MySkate (a practice tracker) and adds accounts, clubs, Jump Lab (measurements from a video of a jump), and a game played off the ice. The owner (GitHub: iiSurf) is a figure skater at Learn to Skate USA Pre-Free Skate and its first user.

This is Artifact 5 ("The Moonshot") for TCSS 490. Solo. Final show and tell is Monday 2026-12-07. Due Sunday 2026-12-13, 11:59pm. The Canvas submission is the Portfolio link, not this repo. The Portfolio card is the Artifact 5 entry in `cards.js` in github.com/iiSurf/Portfolio.

## Status: planning only

Nothing is built yet. Do not start building a feature until the owner says so. Until then the work is planning: features, tools, and good UX practice. Looks (the village, the pond, colors) are a question for later, so do not spend a session on them unless asked.

## Where things are

- `ROADMAP.md` is the source of truth for scope. It has four kinds of entry, and the difference matters:
  - **Decided:** the owner said yes or asked for it.
  - **Suggested:** the agent proposed it and the owner has not answered. Never build a suggested item as if it were decided. Ask.
  - **Open questions:** need an answer before the part they touch is built.
  - **Set aside:** chosen not to do, with the reason.
- `LOG.md` records what was planned, what was decided, what changed, and what was not verified, oldest first.
- `design/` holds sneak peeks: single pages drawn for inspiration. They are not the app, and every name and number in them is made up.

## What it builds on

- MySkate (Artifact 2) is in `../MySkate`. Live at https://iisurf.github.io/MySkate/. It stays as it was submitted: read it, reuse its ideas and code here, and never write into that folder.
- MySkate Coach (Artifact 3) is in `../MySkate-Coach`. Same rule. Its pattern is worth keeping: the model answers in a fixed shape and plain code checks the answer.
- The owner lets the agent work only inside `~/Documents/claude-workspace`.

## Decisions that shape everything

The full list is in `ROADMAP.md`. These few are the ones most likely to be broken by accident:

- A website, not an App Store app. It must work well on an iPhone.
- Supabase (hosted Postgres) is the database. Accounts have a username other people see, an email, and a password.
- Children use this. No private messages are planned, chat is in channels that club admins create, and nothing is ever sold as a mystery pack.
- Jump Lab needs clips at 60 frames a second.
- The screens used at the rink stay clean and easy to read. The cozy village belongs everywhere else.
- No phone use while skating. The game happens before and after.
- The page reader only opens a rink's schedule page the way a visitor's browser does. It never asks a booking system's data service directly, and never uses a key, even one left in plain view on a rink's page. Read a site's terms of use before pointing the reader at it.
- Shared rink schedules are made of choices, not typed text, and an update only goes live once someone else agrees or a coach or club admin makes it. Nothing a skater sends is trusted by the page alone: the server checks it.

## Working agreements

- Go big. The owner has said more than once that the size of an idea is not a reason to hold it back, and that this project calls for it. Do not warn about scope or hours, and do not suggest cutting one thing to make room for another unless the owner asks. Say what is hard or unknown about an idea, then plan it.
- Plan before building anything large. Keep changes small and commit after each working step with a clear message.
- Add a dated entry to `LOG.md` after each meaningful change: what was planned, what changed, what was verified, and what was not.
- When the owner decides something, record it in `ROADMAP.md` under Decided the same day. When the agent suggests something, record it under Suggested.
- Say plainly when a fact came from memory and was not checked. `LOG.md` keeps a list of these.
- Plain language in everything the owner or a skater reads.
- No secrets, tokens, or personal data in the repo. Made-up names only in examples and drawings.
- Never commit PDFs or other copyrighted source documents.
- Every animation has an off state for people who ask their phone to reduce motion.
- Our own look and our own characters. Other apps and games are inspiration for a feeling only.
- The owner judges looks from rendered pictures, not descriptions. Show a drawing before building a look.
