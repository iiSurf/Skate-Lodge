# MySkate moonshot log

What was planned and what changed, oldest first. One entry per working session or meaningful change.

## 2026-11-14 (Saturday): choosing the moonshot

### Plan

Pick the Artifact 5 moonshot and plan it. No building this weekend. The owner wants a well thought out plan, and above all a written record of everything decided so it is not forgotten.

### What was considered

The owner came in with two ideas: grow MySkate (Artifact 2) into something big, or make a figure skating video game. Four directions were weighed: Jump Lab (measure a jump from video), a game, MySkate for clubs (accounts, sync, a coach view), and an AI coach. The owner liked all four, so they became one platform: clubs are the base, Jump Lab is the headline, the game keeps people coming back, and the AI coach explains the numbers.

### Decisions

- The moonshot is MySkate grown into a platform for skaters, coaches, and clubs. The full list is in `ROADMAP.md` under Decided.
- Solo. A website, not an App Store app.
- A new repository with its own log. MySkate and MySkate Coach are reused, not changed.
- Supabase for the database, because the data needs a schema.
- Accounts with a username, an email, and a password. Apple sign-in is wanted.
- Jump Lab needs 60 frames a second and says so in a pop-up.
- The game is played off the ice: hatches, a deeper XP and badge system, a level road that shows what is ahead, off-ice challenges, and more XP for a coach's tasks.
- The rink passport starts with location as proof of a visit.
- Club chat is in channels made by admins, and its text is encrypted.
- A privacy policy page.
- Animation and fun color throughout: the passport tilts with the phone, stamps are animated in, and a notifications button sits at the top of every page.
- The owner keeps the full scope, knowing the risk of thin tools.

### Set aside

- A game played while skating (phones do not belong on the ice).
- An App Store app (no developer account).
- Proving a visit through a rink's ticket sales (later, if a rink wants to partner).
- MongoDB (Supabase chosen).

### What changed

- Made this folder, beside MySkate, with the working name MySkate-Moonshot. It is a plain folder, not yet a Git repository.
- `ROADMAP.md`: everything decided, everything suggested and still waiting for an answer, the open questions, and what was set aside.
- `design/sneak-peek.html`: a first look at the passport, the buddies, the level road, and Jump Lab. For inspiration only. The numbers and names in it are made up.

### Not verified

These came from the agent's memory during planning and were not checked against a source. Check each before relying on it.

- That Apple sign-in on a website needs the paid developer account.
- That an app called OOFSkate already measures jump height and rotation speed for elite skaters, and that there is published research on jump analysis from video.
- That iPhones flatten slow-motion clips to 30 frames a second when a website picks them from Photos.
- That the body-tracking model (MediaPipe) runs well in Safari on an iPhone.
- That Supabase encrypts stored data without extra setup, and its free limits.
- The exact wording of the U.S. Center for SafeSport rule on messages between adults and child athletes.
- That alerts from a website work on an iPhone only after it is added to the Home Screen.

### Name search (same day)

The owner found that "MySkate" is already a skateboarding app, so the platform needs a new name. Nine names from skating were suggested and the top three (Tracings, Toe Pick, Twizzle) were checked, then four runners-up. Results are in `ROADMAP.md` under Name search. Tracings and Twizzle are out. Soakers is the cleanest, and Toe Pick is usable. No name is chosen yet.

One item above is now checked: OOFSkate is real. U.S. Figure Skating announced a partnership with it in December 2025, and it reports jump height and rotation speed from video. So Jump Lab is not the first of its kind. What sets it apart is that it is free, runs in a browser, and feeds a practice log for skaters who are still learning.

### The name and the world (same day)

The owner asked for names with "skate" and a theme. Eighteen were checked. The owner chose **Skate Lodge**, and liked Skate Pond's theme so much that both themes are kept: the app is a cozy winter village (the lodge), and each skater has a frozen pond of their own where their buddies live, which they can decorate and friends can visit. Live multiplayer is probably not wanted. "MySkate" was dropped because a skateboarding app already uses it. The details are in `ROADMAP.md` under The name and the world.

### The pond and the character (same day)

Decided: decorating a pond works like a sticker book (place anything anywhere, floating allowed, no gravity physics); skaters get a customizable character; the character shows on ponds and possibly in Jump Lab with the skeleton drawn on it, with a toggle back to the skeleton alone; and the rink screens stay clean while the rest is a cozy village. `design/sneak-peek-2.html` shows these: the village, a pond to decorate, the character, Jump Lab with the toggle, and a plain rink screen.

### The repository (same day)

The owner needs a GitHub link to turn in for the weekly checkpoint, and reminded the agent that this stage is about tools, features, and good UX practice, not about whether the village looks right. The folder became a Git repository with a `CLAUDE.md`, a `README.md`, and a `.gitignore`, and a first commit of the plan. The GitHub command-line tool is not installed on this computer, so the repository on GitHub has to be made on the website before the first push.

### Next

- The owner: film three to five jump clips (side-on, 60 frames a second, some propped and some followed), and ask one coach what they would want to see about a student between lessons.
- Answer the open questions in `ROADMAP.md`, starting with the name.
- Then: turn the folder into a repository, write `CLAUDE.md`, break the plan into pieces, and run the one-day Jump Lab test on the real clips.

### The Portfolio card and the push (same day)

The Artifact 5 card in the Portfolio (`../Portfolio/cards.js`) now says Skate Lodge, links to this repository, and describes where the plan stands. Its status stays "idea" because nothing is built. It is committed in the Portfolio but not pushed.

Pushing from the agent did not work: the push waits forever at the Mac's keychain, and the SSH key on this computer is not accepted by GitHub. The owner has to run the two pushes (this repository and the Portfolio) from their own terminal.

### On GitHub (same day)

The owner pushed this repository to github.com/iiSurf/Skate-Lodge and renamed the folder on their computer from MySkate-Moonshot to Skate-Lodge. The Portfolio's Artifact 5 card is committed there but was still not pushed when checked, so the live Portfolio showed the old card.

## 2026-11-15 (Sunday): the Portfolio lobby, and a question about rink schedules

### The Portfolio

Not in this repository, but part of Artifact 5: the Artifact 5 shop in the Portfolio (`../Portfolio`) got a room of its own, the lobby of Skate Lodge (a stone fireplace, a front desk with a passport and room keys, a window onto a frozen pond with blade buddies on the ice). The owner asked for the innkeeper to look like the pair skater Daniel O'Shea. It is live, and the details are in the Portfolio's own `LOG.md`.

### Rink schedules

The owner asked how realistic it would be to add rink schedules: several rinks on one page, rinks chosen by area, and the option to add your own. The owner thinks this is vital and that following each rink's Google Calendar is not efficient.

The agent's answer: realistic, more than most of the plan, because MySkate already has the week view, the filters, and the calendar reader with tests, and the one thing that stopped it (no server to read a rink's calendar address) is gone in Skate Lodge. The shared list of rinks is also needed for the passport. The hard part is rinks that do not publish a calendar: those need a person to keep them up to date, or the AI to draft them from a page or a photo for a person to confirm. It would be a fifth big part in the same hours, so something else has to get smaller.

Recorded in `ROADMAP.md` under Suggested (Rink schedules), with two open questions. Not decided yet.

### Not verified

- That OpenStreetMap's list of ice rinks is good enough near the owner to seed "rinks near me".
- How any particular rink publishes its schedule. None was looked at.

### Rink schedules are in (same day)

The owner's answers:

- The alert when a picked session moves or is cancelled is "huge": a skater should know before a planned visit that their ice time got bumped.
- Updating by hand should be shared: one skater updates a rink's schedule and it is updated for everyone, a shared space in that way only, so everyone else has less work. It must be protected against malicious, inappropriate, and junk updates.
- The skater who helps gets a thank-you: bonus experience points to use on a day they choose.
- On the agent's warning that this is a fifth big part in the same hours: the owner disagreed. Working together it can be built quickly, and the project calls for going big, so the size of an idea should not hold it back. This is now a working agreement in `CLAUDE.md`, and the agent should stop raising it.

What changed:

- `ROADMAP.md`: Rink schedules moved to Decided (six items), and "Go big" joined the foundations. Under Suggested, the agent's design for keeping shared updates safe: updates are made of choices with nothing to upload and almost nothing to type; only skaters with that rink's passport stamp can update it; an update is a proposal until someone else agrees; plain code checks it; there is a history with a way back, a "This is wrong" button, and limits; and the server enforces all of it. Alerts only go out for confirmed changes, and the thank-you is only given once an update is confirmed. Three open questions were added.
- `CLAUDE.md`: the go-big agreement, and the rule that shared schedules are choices, confirmed by someone else, and checked by the server.
- `README.md`: rink schedules as the fifth part.

Still not looked at: how any real rink publishes its schedule.

### The rink survey (same day)

The owner approved the way shared updates work ("exactly how a pull request works"), left the thank-you token to the agent, and listed nine rink sites to look at, noting that one site often carries several schedules (public skating, freestyle, collegiate).

What the agent did:

- Read each site's home page and schedule pages, and worked out where each schedule lives. The table and what it means are in `ROADMAP.md` under Rink survey.
- Downloaded the three open Google Calendars (Kent's two and Bremerton's) and ran MySkate's own calendar reader on them. It found nothing at first, because it only looks at the first 300 events and these calendars go back to 2011 and 2016. With past events removed, it read 176, 52, and 286 coming sessions. So the reader works on real rink data after one change.
- Set the token: a Fresh Ice token, earned when an update is approved (two a week at most, three held at most), spent on a day the skater chooses for double experience points, with a Rink Keeper badge.

What was decided: the proposal-and-approval model, and the token. Both are in `ROADMAP.md` under Decided.

Not done, on purpose:

- No request was made to any booking system. The agent started one to DaySmart's data for the Kraken rink, to see whether it answers without signing in; the permission check stopped it as unauthorized access, and the agent did not try another way.
- One rink's page shows a key and secret for its booking system in its source. They were not used and are not written down anywhere in this repository.
- Pierce County's site refused the agent's automatic request, so Sprinker's calendar subscription was seen in a browser but not downloaded.

Not verified: each site was read once, today. Kent may have more calendars than the two found. What the all-day entries in Kent's calendars mean is unknown.

### A second look at six rinks (same day)

The owner sent the schedule page for each of the six rinks where no calendar address was found. The agent opened each in a browser as a visitor would, and read each site's robots file.

- All six show the schedule without a sign-in, none has a subscribe or export button, and no robots file forbids the schedule page. The sites' terms of use were not read.
- New in `ROADMAP.md`: the survey table and a "second look" list, and under Suggested a page reader (a job that opens the open page like a visitor, has the AI draft the sessions, and sends the draft through the same approval as a skater's update).
- Learned along the way: the Kraken rink has four kinds of freestyle, including collegiate; freestyle is sold in 30-minute slots that should be joined into blocks; Tacoma has members-only sessions; and the Lynnwood page also covers Olympicview Arena.

Not verified: the Everett page did not finish loading in the agent's browser. Whether a job on a free service can open these pages reliably has not been tried.
