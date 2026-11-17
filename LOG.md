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

### The page reader is in (same day)

The owner said yes to the page reader, choosing it over asking the rinks first. It moved to Decided in `ROADMAP.md` with its rules (only the page a visitor sees, never a booking system's data service, never a key, a few visits a day, a link back to the rink, and the rink is told and can ask to be left out). The same rule is now in `CLAUDE.md`, with a reminder to read a site's terms of use before the reader is pointed at it. That reading has not been done for any rink yet.

### Two more answers on the page reader (same day)

- The owner agreed that a rink's drafts go live on their own once they have been approved many times with no corrections. The agent's number for "many" (ten in a row, reset by one correction) is listed under Suggested.
- The owner does not think rinks need to be told when the reader only reads their open page, and would ask a rink only for a direct way to get its calendar. The rule "the rink is told" was taken out. What stays: if a rink asks to be left out, the reader stops for it, and a site's terms of use are read before the reader is pointed at it.

### More ideas (same day)

The owner asked what else would be fun to build and would make people want to come back. The agent suggested fifteen ideas, now in `ROADMAP.md` under Suggested ("More ideas for fun and for coming back"), in five groups: after you skate, with other skaters, at home, in Jump Lab, and the front door. The agent's top three: session reports (one tap for how busy and how good the ice was), who is on the ice, and a daily "Name that jump" puzzle. Nothing is decided.

### All fifteen ideas are in (same day)

The owner liked every one of the fifteen ideas and asked to add them all. They moved to Decided in `ROADMAP.md` under "Fun and coming back", each with the safety detail it was suggested with, and the order of work now places every one of them. `README.md` mentions them, and `CLAUDE.md` gained the rule they share: what skaters send each other is choices, stickers, or pictures of things, never typed messages and never pictures or video of a child.

### Jump cards in, the puzzle out (same day)

The owner took out the "Name that jump" puzzle and asked for something else in its place: a menu of cards, one for each jump, each showing the jump's name and a character caught at that jump's defining moment. Tapping a card shows an animation of how the jump is done, tips and tricks, and the mistakes skaters commonly make while learning it.

- `ROADMAP.md`: jump cards are under Decided (Fun and coming back), the puzzle is under Set aside with the owner's reason, and the agent's ideas for how the cards work are under Suggested (Jump cards). The main ones: a coach approves the tips before skaters see them, every card says it is not coaching, and the animation can come from a clean jump recorded in Jump Lab, keeping only the skeleton.
- The order of work and `README.md` name the cards where they named the puzzle.

### How the jump cards work (same day)

The owner approved the agent's list of how the cards work, and added one thing: the animation should be the skater with the skeleton and its joints, the same drawing used elsewhere. The whole list moved to Decided in `ROADMAP.md` under Jump cards: the defining moment on the front, the tie to the practice tracker, a coach approving the tips, the "not coaching" note, the skeleton animation with poses that can come from Jump Lab, slowing it down and turning it round, your attempt beside the card, the card turning gold when you land the jump, and cards for spins, turns, and Learn to Skate skills after the jumps.

## 2026-11-16 (Monday): security rules, before any building

### Plan

The owner asked what security practices could be set now, before building starts, so that every idea so far is safe from outside threats.

### What changed

- `SECURITY.md` (new): the agent went through every decided idea asking what an outsider could do with it, and wrote the rules as fourteen sections of boxes to tick: children first, signing in, who can see what, text from outside, the server fetching from the internet, the AI, video and pictures, keys, the browser's protections, other people's code, abuse and cheating, data and leaving, watching for trouble, and how we build. It is marked as proposed until the owner says yes.
- `ROADMAP.md`: a Security entry under Suggested pointing at the file, and an open question.
- `README.md`: lists the file.

### Risks found in ideas already decided

- "Who is on the ice" tells people where a child will be and when. The proposed rule: off until a parent or coach turns it on, names only to approved friends in the same club, a number for everyone else.
- The calendar reader and the page reader make our server visit addresses that people give it. The proposed rules: refuse addresses inside private networks, limit size and time, and give the page reader one key that can only add a proposal.
- A rink's page could contain words meant for the AI. The proposed rule: whatever the AI produces can only become a proposal made of choices.

### Not verified

Listed at the end of `SECURITY.md`: what Supabase, GitHub, and Vercel offer on the plans we would use, and what the law requires for children under 13.

### Adults only, friends, and the rink map (same day)

The owner answered the security draft with three things:

- **The audience is adults.** The owner does not believe children will use the app; the youngest skater is 18. The draft had been written around children, so it was reworked: parents' accounts, age bands, and a parent's yes are gone (now under Set aside), and the first worry in `SECURITY.md` became one person using the app to find or follow another.
- **Friends by username.** A skater can be found by username and sent a friend request, which keeps some privacy. This replaces the draft's "no searching for people".
- **A rink map.** A page with a map seen from above, each rink an arena with round avatars beside it when skaters are there. Filters: your friends (online, checked in recently, there now), or skaters who chose to share where they are with everyone, to meet new people. Tapping the avatars lists who is there. Each skater has a status from a menu, like Slack's, which can set itself from what they chose to work on.

What changed:

- `ROADMAP.md`: "Adults only" under Foundations; a new Decided section, Friends and the rink map; a sixth part under What it is; the order of work; three decided items reworded where they named children or parents; and the agent's safety ideas for the map under Suggested. Three open questions: whether friends may message, whether a pond visitor may write, and whether a skater must be sharing to see those who share with everyone.
- `SECURITY.md`: section 1 rewritten as "People first" (still proposed, not adopted).
- `CLAUDE.md` and `README.md`: adults only, and the map's core rules.

What the agent said plainly: an age rule on a sign-up page does not keep a 16-year-old out, and skating has many of them, so there is a way to report an account that seems under 18. And a map of where people are is the part most open to misuse, by someone following a person who does not want to be found. The safety ideas are aimed at that: off until turned on, chosen at each check-in, the rink and nothing finer, ending by itself, no list of past visits, and block and report on every avatar.

### Four more answers (same day)

- **Ages.** A skater of 14, 15, 16, or 17 may sometimes use the app, and the owner is fine with that. "Adults only" became "mostly adults" everywhere. Nobody under 14.
- **No messages between friends** for now: friends already text each other.
- **Ponds: stickers only.** The owner thought about letting visitors etch into the ice, with something to keep out bad words and drawings, and chose to keep it simple: stickers, with sticker packs in different themes and colors unlocked at certain levels. The agent added a suggestion that keeps the etched look with nothing to check: tracings (a figure eight, a three-turn, a heart) as stickers.
- **The map.** Only skaters who are sharing where they are can see the others who share with everyone, and what is shared is "I am here" at a rink, never an exact position.

What the agent raised: with skaters of 14 to 17 on it, the map's "everyone" side is where an adult could meet a teenager they do not know at a rink. The agent's suggestion, the strongest in this plan, is that skaters under 18 share with friends only, which needs one question about age at sign-up. It is under Suggested in `ROADMAP.md` and marked as not decided in `SECURITY.md`, and it is an open question for the owner.

Also open: whether a sharing skater sees the others at every rink or only at the rink they are at. The owner's words could mean either.

### Sharing with chosen people, and tracings (same day)

- The owner agreed that sharing with everyone that you are at a rink is for accounts of 18 and over only. So signing up asks one thing about age.
- The owner added a way of sharing for everyone, at any age: skaters share rink visits only with people they have approved, each approving the other, the way Apple's Find My works. The difference is that it is only about rinks (the current one, or ones nearby), never where someone is through the day, which this plan avoids.
- Tracings as stickers are in. The owner left that to the agent.

The agent's ideas for how approved sharing works are under Suggested in `ROADMAP.md`: being friends shares nothing by itself, the approval is a second yes that works both ways, it stays on but each check-in shows who will see it, and either skater can end it without the other being told. `SECURITY.md` and `CLAUDE.md` carry the new rules. Still open: whether a skater sharing with everyone sees the others at every rink or only at their own.

### Two answers on sharing (same day)

- Approved sharing always works both ways.
- A skater who is sharing with everyone sees the others at every rink. The agent had suggested only the rink they are at; the owner chose every rink. `SECURITY.md` notes that the other rules for that side of the map matter more because of it.

### The security rules are adopted (same day)

- The owner said yes to all five of the agent's ideas for approved sharing: it is a second yes on top of being friends; the approval stays on, with "just me this time" at each check-in; either skater can end it without the other being told; friends who are not approved show as online or away only; and a skater under 18 does not see the "everyone" side. All five are under Decided in `ROADMAP.md`.
- On the security rules the owner said: they should be the project's rules if the agent thinks they should be. The agent does, and adopted them. `SECURITY.md` now says so at the top, `ROADMAP.md` has a Security section under Decided, and `CLAUDE.md` tells any future session to read the rules before planning or building.

Why the agent adopted them: the plan now has accounts, a map of where people are, skaters of 14 to 17, a server that fetches addresses people give it, and an AI that reads other sites' pages. Each of those can hurt someone if it is built first and made safe afterward. Rules that exist before the first line of code cost nothing to follow.

Rules in the file that are the agent's own and that the owner has not looked at one by one. Any of them can be changed by the owner saying so:

- A skater under 18 can get friend requests only from clubmates and friends of friends.
- Username search finds an exact username only, with no browsing.
- Each skater chooses who may send them a friend request, and there is a daily limit on sending.
- A profile shows a username, the drawn character, a level, and badges, and nothing else.
- Coaches and club admins must use two-step sign-in.
- "Recently" on the map means the last two hours.
- Everything in sections 2 to 14 (signing in, the database, text from outside, fetching, the AI, video and pictures, keys, the browser, other people's code, abuse, data, watching for trouble, and how we build).

Still not verified: the list at the end of `SECURITY.md`.

### Sixteen more tools (same day)

The owner asked for at least fifteen more tools or features. The agent suggested sixteen, now in `ROADMAP.md` under Suggested ("Sixteen more tools"), in four groups: at the rink, planning, looking after yourself and your skates, and people. None is decided.

### All sixteen tools are in (same day)

The owner said yes to all sixteen. They moved to Decided in `ROADMAP.md` under More tools, and the order of work names them. Several of them take in typed or spoken words, pictures, or other people's time (the coach board, rink guides, say it don't type it), so each gets the "What could a stranger do with this?" answer before it is built, as `SECURITY.md` requires.

### The first three clips (same day)

The owner put three clips in `clips/` (a folder Git ignores). No body tracking has been run yet. What was checked, by opening each clip in headless Chrome on the owner's Mac:

- All three play. They are HEVC video with HDR (the owner forgot to turn HDR off), 1080 by 1920, filmed with the phone upright.
- All three are a true 60 frames a second: Chrome showed a new frame every 16.67 thousandths of a second.
- Two are short cuts (3.7 and 2.6 seconds, one jump each) and one is a whole program (4 minutes 10 seconds, 416 MB).
- They were filmed from the stands at an event, looking down at an angle and following the skater, who fills about a quarter to two fifths of the height of the picture. They show other skaters, not the owner.

What this means for the test:

- HDR and Chrome are not a problem on this Mac. Other browsers and a real iPhone are not checked.
- These are the hard case on purpose or by accident: followed, from above, small in the picture, and likely jumps with several turns. If the tracking holds on these, it will hold on a propped phone at the boards.
- They cannot stand in for the owner's own jumps, which are still wanted: single jumps, from the side, at ice level.
- They show other people, so they stay on this Mac, are never committed, and cannot become a jump card's animation without that skater agreeing (a rule already in the roadmap).

Next: run the body tracking on them. That needs two downloads the owner has not yet approved: Google's MediaPipe package from npm (`@mediapipe/tasks-vision` 1.2.3, about 31 MB unpacked, Apache 2.0 licence) and its pose model from Google's own storage (`pose_landmarker_full.task`, 9.4 MB).

### The Jump Lab test ran (same day)

The owner approved two downloads, and the agent ran body tracking on the two short clips.

- **A new dependency, for the test only** (`SECURITY.md` asks for this to be written down): `@mediapipe/tasks-vision` 1.2.3 from npm, Apache 2.0, pinned to that exact version with a lock file, installed without running its scripts. And Google's pose model `pose_landmarker_full.task`, 9,398,198 bytes, from Google's own storage; its SHA-256 starts `4eaa5eb7a98365221087693fcc286334`. Both sit in folders Git ignores. Neither is part of the app yet.
- **The test code** is in `spikes/jump-lab/`: `track.html` (tracks a clip frame by frame in the browser and draws the skeleton), `run.mjs` (opens it in headless Chrome, serving files on this computer only), and `analyze.mjs` (prints the signals and counts half turns).
- **The result** is in `ROADMAP.md` under "Jump Lab test". In short: the tracker found the skater in 379 of 380 frames and the skeleton fits; turns can be counted from the width of the shoulders (about 3.7 turns at 4.7 turns a second in the first clip); air time is only rough when the camera follows the skater, so no height was worked out; and it is slow on this Mac without the graphics chip.

What a stranger could do with this: nothing. The test runs on the owner's Mac, listens only on 127.0.0.1, and sends nothing out. The clips show other people, so they, the tracked points, and the pictures are in folders Git ignores.

Not verified: the long clip, a propped phone, the owner's own jumps, a real iPhone, Safari, and the agent's memory that a top skater's time in the air is about 0.6 to 0.7 seconds.
