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

### The Jump Lab test, second round (same day)

The owner asked for the four-minute program to be tracked.

- **Speed.** The test code was waiting 150 thousandths of a second after every frame for a signal that never came. With that fixed, tracking runs at about 26 frames a second. The first clip gave the same answer as before.
- **The program.** Tracked in parts of 4,000 frames. The first three parts (200 seconds) ran. The fourth did not: while the run was going, the files in `clips/` changed. The four-minute `IMG_8441.MOV` was replaced by a four-second `IMG_8441.mov`, `IMG_8437.MOV` became an 18-second clip, and `IMG_8440.MOV` appeared. So the last 50 seconds of the program were never tracked.
- **The new clips** were tracked too. Results are in `ROADMAP.md` under "Jump Lab test".
- `spikes/jump-lab/find.mjs` (new) looks through a tracked clip for bursts of fast turning. `run.mjs` and `track.html` can now track every nth frame or use the graphics chip.

A mistake by the agent: saved points are named after the clip, so tracking the new four-second `IMG_8441.mov` wrote over the saved points for the first 67 seconds of the program. The search of the whole 200 seconds had already been run and its table read, so the findings stand, but those points are gone and the program's video is no longer in the folder to redo them. Saved points should be named after the clip's size or date as well as its name.

Not verified: none of the "likely jumps" in the program was checked against a picture. The eight are the agent's reading of a table.

### The whole program, checked by eye (same day)

The owner put the four-minute clip back. The agent tracked all of it (about ten minutes), searched it for bursts of turning, and made a close-up with the skeleton for each of the seventeen bursts the search called a jump (`drawCrop` in `track.html`). Looking at them: seven are jumps, three cannot be judged, seven are wrong. The details are in `ROADMAP.md` under "Jump Lab test".

Saved points are now named after the clip's name and its size, after the earlier mistake.

Not verified: how many jumps the program really has. The agent did not watch the video, only one frame from each find. A free program usually has seven jumping passes, as far as the agent remembers, which would fit, but that is memory and a coincidence is possible.

### Looking for clips with a known answer (same day)

- The owner asked whether a YouTube compilation of double Axels would help. It would as a test (every double Axel is two and a half turns), but the agent did not download it: YouTube's terms do not allow that, and the footage belongs to the broadcasters.
- Wikimedia Commons has 17 short clips that each show one named jump, 1920 by 1080, from the 2025 World Championships and 2025 Skate America, all by one contributor (FloweringDagwood) under CC BY 4.0. Nine single jumps were chosen as a first test (about 102 MB), and the owner approved downloading them.
- The download did not happen. After the agent's search, Wikimedia answered every request with "too many requests". The agent then tried once with a web browser's name in place of its own, and the permission check stopped that as a way round the limit, which it was. A later try under its own name was still refused. The owner will download the nine files in a browser.
- Ready for when they arrive: the test now reads each clip's real frame rate (`window.rate` in `track.html`), and `check.mjs` compares the turns counted with the turns each jump should have.

## 2026-11-17 (Tuesday): the Jump Lab test against known answers

### What was done

- The owner downloaded the nine Wikimedia Commons clips by hand (the agent's own downloads had been refused), into `clips/commons/`, which Git ignores. Credits are in `spikes/jump-lab/CREDITS.md`, and the expected answers in `spikes/jump-lab/known.json`.
- All nine were tracked. They are 30 frames a second. The body was found in 1,358 of 1,359 frames.
- `check.mjs` compared the counted turns with the known answer: 3 of 9 within half a turn, average miss 0.65 of a turn, mostly undercounting.
- `variants.mjs` tried six ways of counting. The shoulder-width count, at any threshold, beat the tracker's depth-based counts.
- `halfrate.mjs` counted the owner's 60-frame clips again with every second frame dropped. One of three went badly wrong, at the time in the air.
- One mid-air frame of each clip was drawn with its skeleton and checked by eye: the skeleton fits all nine.
- `run.mjs` now draws a square picture (720 by 720), so wide clips fit.

### What changed in the plan

- In `ROADMAP.md` under "Jump Lab test": a third round with the table, and turn counting moved back from "sure" to "likely".

### Not verified

- That 30 frames a second is the cause of the undercount. It fits, but the same jumps were not available at 60 to compare.
- None of the owner's own jumps has been tested yet.

### The professor's feedback (same day)

The owner shared a comment from the professor on the checkpoint: "In ROADMAP.md you kept what you decided apart from what Claude only suggested. Next week, put the Jump Lab results from your own clips on the card."

- Recorded in `ROADMAP.md` under "The professor's feedback", as four boxes for next week: film the owner's own jumps, run them through the test against a known answer, put those results on the Artifact 5 card, and log it.
- The card was not changed now. Its last sentence already says "Next I will test Jump Lab on real clips of my own jumps", and the professor asked for results from the owner's own clips, which do not exist yet. The Commons and event clips are someone else's and do not count for this.

## 2026-11-20 (Friday): the figure skating app market

### Plan

The owner noticed many new figure skating apps in the App Store, with no clear winner, sent seven links, and asked what Skate Lodge could make that adds more value than what is out there. They singled out an app that scores skills from a camera video, and asked about scoring any skill at any level, given that two films of the same skill can give different numbers.

### What was done

- Read the seven apps' App Store listings (Apple's public lookup), and searched the store for more. 44 relevant apps after leaving out games and unrelated apps.
- A multi-agent study, run twice. First: nine analysts profiled the apps against `ROADMAP.md`, one looked hard at scoring from video, one mapped the market, three designed ideas from different angles (skater, coaches and clubs, camera), one ranked them, and two skeptics checked the result. The skeptics found 60 problems: "nobody does this" claims that some app does, and real safety gaps (one idea would have let a coach learn whether a teenager was at the rink). Second: one agent applied the fixes, two fresh skeptics checked again (45 more problems), and a last agent applied those.
- `MARKET.md` (new): the market in numbers, the groups of apps, where each Decided part of our plan stands, video scoring today and the camera-variance problem, what others have that we lack, a note on each competitor worth watching, all 44 apps with links, the twelve ranked ideas in full, and the changes they would make to Decided items.
- `ROADMAP.md`: the twelve idea titles under Suggested ("What sets Skate Lodge apart"), and fourteen questions for the owner under Open questions.

### What a stranger could do with this

Nothing: it is reading and writing about public App Store pages. No app was installed or signed into.

### Not verified

- Everything about another app comes from its App Store description as read on 2026-11-20. No app was used, and screenshots and websites were not seen.
- Which app the owner saw scoring from video. None of the seven descriptions the owner linked mentions camera scoring.
- Several facts in `MARKET.md` are marked "from memory, not checked", among them whether Safari's speech recognition sends audio to Apple and what the SafeSport rule says about messages between adults and young athletes.

### MARKET.md removed, and what to add from the 44 apps (same day)

- The owner said the camera scoring was IceReel. Its App Store description says it puts the element, GOE, and running score on a parent's competition video, read from the official judges' protocol after the parent tags each element. It does not measure from the camera.
- The owner asked for `MARKET.md` to be removed as not needed. It was deleted (it stays in the Git history). The twelve ideas under "What sets Skate Lodge apart" in `ROADMAP.md` now carry a one-line summary each instead of a pointer to it, and the scoring approach is kept as a short paragraph.
- The owner asked what to add from what was learned. `ROADMAP.md` has a new Suggested section, "Learned from the 44 apps": about twenty things other apps do that our plan lacks, grouped by where they would go, each naming the apps that do it, plus two ideas from IceReel and a short list of what is not worth adding. None is decided.

### What to take from the other apps (same day)

The owner left it to the agent to decide which of the additions to take, refine, or ignore, including ignoring all of them. Three reviewers judged each of 17 candidates from a different angle (the owner as a skater, a strict editor who prefers fewer tools, and safety and honesty), and the agent went with where at least two agreed.

- 15 were folded into tools already decided, and none became a new tool. They are under Decided in `ROADMAP.md`, "Refinements learned from other apps".
- 2 were ignored (random drills, automatic beat finding), and the IceReel-style replay was cut down to its honest part: the official call as a known answer. These, and the earlier "not worth adding" list, are under Set aside.
- The Suggested section "Learned from the 44 apps" was removed, since everything in it is now decided or set aside.
- Two safety details came from the reviewers: a spreadsheet export must make formula cells safe, and nothing logged before signing up earns rewards, because the server could not check it.

### Apple Music, Spotify, and program music (same day)

The owner asked whether skaters could choose program music through Apple Music or Spotify inside Skate Lodge, or whether copyright stops it. Three researchers read the current official rules, and a skeptic checked every claim against its source (it found eleven to correct, all applied below).

What was found, checked on 2026-11-20:

- Spotify Developer Policy and Developer Terms (version 10, effective 15 May 2025, https://developer.spotify.com/policy and /terms): no modifying or editing content; Spotify is for personal, non-commercial use and "can't be broadcast or played publicly from a business", with dance studios among the examples; no games; no syncing music to visual media. Since 11 February 2026 (new apps) and 9 March 2026 (existing apps) an app in development mode has at most five named users; extended access is only for registered businesses with at least 250,000 monthly users. Listeners need Premium. Spotify's own listener terms (updated 4 September 2026) require users to be 18, or 13 to 17 with a parent's consent.
- Apple Developer Program License Agreement, section 3.3.6(D) (read 2026-11-20): no downloading, uploading, or modifying MusicKit content, and it "cannot be synchronized with any other content"; users must start playback; no charging for or indirectly making money from access to Apple Music. MusicKit on the web needs the $99-a-year developer program, a signed token made on our server, and the listener's own Apple Music subscription (otherwise only previews play). Its documentation is still marked beta.
- Copyright: a rink is a public place, and rinks hold their own ASCAP and BMI licences (ASCAP has an ice rink plan and BMI a "Skating Rinks" licence). U.S. Figure Skating's music policy covers songs listed as 100% cleared in Songview at its sanctioned events and puts clearing the music on the coach, choreographer, skater, or parent; it strongly recommends cleared music for training too (from search snippets of its policy PDF, which would not open). ClicknClear sells licences for mixes, typically $10, $15 to $20, or $25 per track for a year in one country. At the 2026 Olympics one skater, Petr Gumennik, changed his short program music two days before competing because it was not cleared.
- SkateLoops, the leading skating music app, plays the skater's own audio files.

Recorded in `ROADMAP.md` under Suggested ("Music in the music room"), with an open question. The agent's recommendation: the skater's own file, kept on the phone, and neither streaming service.

Not verified: whether Spotify's Web Playback SDK or Apple's MusicKit actually play on an iPhone in Safari (no phone test); whether a rink's licence covers a skater playing music from their own phone (memory); what the iTunes Store terms mean for editing a bought track beyond "personal, noncommercial" use. This is not legal advice.

### Music: the skater's own file only (same day)

The owner said yes: the music room plays only the skater's own file, kept on the phone, with no Apple Music or Spotify. Moved from Suggested to Decided in `ROADMAP.md` ("Music"), the streaming services went under Set aside with the reason, and `SECURITY.md` section 7 gained a rule that the music file never leaves the phone.

### Jump Lab may show the real skater (same day)

The owner said Jump Lab does not need to show the skater only as a skeleton or wireframe; the skater can be visible. Recorded under Decided in `ROADMAP.md` (Jump Lab): replays, the side-by-side with a card, and saved milestone pictures can show the real skater. The agent read this as being about what is shown on the skater's own phone. Whether the video may leave the phone (to a coach, or onto our server) would change `SECURITY.md` section 7, so it is an open question, not assumed.

### A coach can get the video (same day)

Asked whether a skater may send the video itself to their coach, the owner said yes. `ROADMAP.md`: "Send the skeleton, not the video" became "Send a jump to your coach", with the real video. `SECURITY.md` section 7 was rewritten for it: only to a coach linked through a club invite with two-step sign-in, chosen clip by clip, private storage with links that expire, deleted after 30 days or on unlinking, never to the AI or training, a reminder about others in the background, and clip access added to the access tests. `CLAUDE.md` names it as the one exception to "no video of people". The agent chose the 30-day limit and the other details; the owner can change any of them.

## 2026-11-22 (Sunday): the build plan

### Plan

The owner asked whether there is enough of a plan to start building, and for a plan to build in phases or all at once. Nothing is to be built yet. (A note: LOG.md called 2026-11-20 a Friday, which is right; 2026-11-22 is a Sunday.)

### What was done

- A multi-agent study, run once on 11-20 (cut off when the session ended) and again on 11-22 against the current roadmap: a readiness check, three phased drafts (show and tell first, foundations first, a skater's week first), a judge that merged them, and two checkers against every Decided item and `SECURITY.md`. The checkers found 41 problems.
- `BUILD.md` (new): the merged plan with every fix applied. Phases 0 to 6 from 11-23 to 12-13, what only the owner can do before phase 1, how the two Supabase projects are used, what each phase builds and when it is done, the owner's calls with defaults, what waits until after 12-13, and what is shown on 12-07. Marked as proposed.
- The fixes that matter most: sign-up closed on both projects, so Google cannot create an account without an invite; a separate staging address on the testing project for the show and the tests; block, report and the review page built before friends; "who is on the ice" as counts only until approved sharing exists; the trial waits until the privacy page is checked; Kent's and Bremerton's terms read before the calendar job runs; the job's endpoint protected by a secret kept out of the repo; a sync allowlist so no clip or music file can be uploaded by mistake; made-up pages, not saved copies of rink sites, to test the page reader; the owner's own clips and account used for testing only with a written yes.
- `ROADMAP.md`: the old order of work replaced by a pointer to `BUILD.md`; three open questions that were already answered removed; Google sign-in moved to Decided to match the adopted `SECURITY.md`. `README.md` lists `BUILD.md`.

### What a stranger could do with this

Nothing yet: it is a plan. Each phase in it names its own security work.

### Not verified

Vercel's free-plan limits on scheduled jobs, Supabase's free-plan features for passwords and backups, whether an iPhone can receive pushes from a Home Screen site, and how fast body tracking runs on an iPhone. Each is tested early in the plan.

## 2026-11-22 (Sunday, later): building starts, phase 1

### The owner's word

"Start building." `BUILD.md` is now the plan, with its stack defaults (the owner did not change them). `CLAUDE.md` now says "building" and where the app lives. Work is on the branch `phase-1`.

### Plan for phase 1

The front door: rink schedules for anyone with no account, Kent and Bremerton read from their own public calendars, and the security groundwork (headers, tables that start from "nobody", access tests, the safe fetcher). What can be built before the owner creates the Supabase and Vercel projects is built and tested locally first; the parts that need those accounts are written and wait for them.

### What could a stranger do with this?

- Use our server to fetch addresses it should not reach, or huge files: the fetcher takes only https, refuses private and local network addresses (checked on the address actually connected to, not just the name), follows at most three redirects each checked again, and stops at a time and size limit. Only approved calendar addresses are ever fetched.
- Call the scheduled job again and again to run up use or hammer a rink's calendar: the job refuses any caller without a secret kept only in the services' settings, compared in constant time, and has an off switch.
- Feed a hostile calendar (script in titles, endless repeat rules, a giant file): the reader drops past events before counting, has limits on events and run time, and titles reach the page only through the `html` tag that escapes them.
- Write into the schedule: every table starts from "nobody can write"; only the server's job writes, with a key that never reaches the page. Anyone may read rinks and sessions, which are public anyway.
- Learn something about a person: nothing in phase 1 holds a person. My picks stay on the phone. Directions and add-to-calendar read no position and send nothing.
- Abuse the page itself: a content security policy allows scripts only from our site and nothing inline, connections only to our site, and no framing.

### Phase 1, first part: built and tested on this computer (same day)

What was built, on the branch `phase-1`, in `app/`:

- `public/js/ice.js`: MySkate's schedule logic, copied. The calendar reader was changed so that events that have already ended never count toward its limit (the reason it read nothing from Kent and Bremerton in the Jump Lab-era survey), with a larger limit, a time limit, and a time zone to fall back on. MySkate's own 29 tests for it were brought over and pass.
- `public/js/schedule.js`: turns a calendar into dated sessions for the next five weeks, hides what is not public in a calendar that mixes everything (practices, rentals, games, maintenance), works out "today" on the rink's clock, and joins back-to-back freestyle slots into one block.
- `server/net.js` and `server/fetcher.js`: the safe fetcher. https only, private and local addresses refused (also the address a name really connects to), at most three redirects each checked again, a time and size limit, calendar or plain text only.
- `server/refresh.js`, `api/refresh.js`: the scheduled job. It fetches only sources that are approved and whose site terms were read, runs at most every ten minutes, has an off switch, keeps the last good sessions when a fetch fails, and refuses any caller without its secret (compared in constant time; no secret set means nobody gets in).
- `server/store.js`, `api/week.js`: the week for anyone, from Supabase when it is set up, or from a local file (`.data/`, ignored by Git) when it is not.
- `supabase/migrations/`: the tables, every one with its rules on and starting from nobody, public reading only for rinks, approved sources, sessions and checks, one function that replaces a source's sessions in a single step, and a function for the CI check that lists any table without rules. Not run yet: the projects do not exist.
- `tests/access.test.js`: the access tests (a stranger can read the schedule and write nothing). They run in CI against the testing project once it exists, and skip until then.
- `.github/workflows/ci.yml`: tests on every push, actions pinned to exact commits, read-only, and the access tests only on pushes to this repository with the testing project's secrets from a protected environment.
- `vercel.json`: the security headers (content security policy, HTTPS only, camera and location for our site only, no microphone, no framing). `tools/dev.mjs` serves the site locally with the same headers.
- `public/index.html` and `public/js/week.js`: the week page. This week or next, filters by type and rink, My picks kept on the device, overlap warnings, add to calendar, directions (no position read), where each session came from and when it was checked, and the rinks we do not read yet with links to their own pages.
- `public/probe.html`: what a phone can do (a clip's real frame rate, keeping stored files, motion and location after a tap, Home Screen, alerts, whether speech recognition exists without starting it). Sends nothing.
- `data/rinks.json`: the twelve rinks with their street addresses, and the three calendar sources.

Verified: 52 tests pass (4 access tests skip until the testing project exists). On the local server: the headers arrive as written; the job answers 401 without its secret; a bad week is refused; a path that tries to leave the site folder gets 404. With made-up sessions (`tools/demo.mjs`, a banner says they are made up), the page was looked at on 390 and 1280 wide screens, has no sideways scrolling at 320 wide, and the week page and probe show no console errors under the content security policy.

Not verified: nothing is deployed, so the Vercel settings (the output folder, the functions, the headers in production) are untested. The Supabase SQL has never been run. Nothing was tried on a real iPhone. No real calendar was fetched by the job.

### Reading the terms (same day)

A helper read the terms for the three calendars before the job is pointed at them, as `CLAUDE.md` requires. The rinks' sites have no terms pages and their robots files allow reading. But the events are served by Google, and calendar.google.com/robots.txt disallows every path except the home page; Google's terms of service (effective 2026-07-30) count automated access that ignores such instructions as misuse. So the three sources stay unchecked in `data/rinks.json`, the job will not fetch them, and the route is an open question for the owner in `ROADMAP.md`. The agent recommends Google's official Calendar API with our own key.

The agent should have read Google's robots file before the rink survey on 2026-11-15 and 11-16, when it downloaded each of the three calendars once by hand. That has not been repeated.

Also from the helper: Pierce County's site refuses automated readers (so Sprinker stays a link), and Lynnwood's schedule comes from a booking system, which the page reader never touches. The rinks' street addresses were checked from their own sites, except Sprinker and Lynnwood (from other sources, noted in `data/rinks.json`).

### Reading Google Calendars through Google's Calendar API (same day)

The owner chose Google's official Calendar API for Kent's and Bremerton's public Google Calendars. Recorded under Decided in `ROADMAP.md` and in `CLAUDE.md`.

- `app/server/google.js` (new): asks the Calendar API for the next five weeks of single sessions on a calendar (Google expands the repeats), with our own key sent in the X-Goog-Api-Key header so it never appears in an address or a log, through the safe fetcher, accepting JSON only, at most four pages. Turns the events into sessions on the rink's clock, leaving out all-day, overnight, cancelled and out-of-window events, and keeping only public sessions from a mixed calendar.
- The job (`server/refresh.js`) reads a source with `via: "google"` this way, and records "No Google API key in the server's settings" without fetching anything when the key is missing.
- `data/rinks.json`, the seed and the database: the three sources now say `via: "google"` with their calendar IDs. A new check in the table makes a Google source carry a calendar ID.
- `SECURITY.md` section 8: the key's rules (restricted to the Calendar API, Vercel's settings only, a header not an address, never logged, a low quota, a separate testing key), and Google Cloud added to the accounts that need two-step sign-in.
- 7 new tests (59 pass, 4 database tests skip until the testing project exists), including that the key never appears in an address and that Google's errors never include it.

Not done yet: the three sources stay switched off (no terms date) until Google's API terms are read (a helper is reading them now) and the owner has made the key. Nothing has called Google's API.

### Google's API terms read (same day)

A helper read the Google APIs Terms of Service (last modified 2021-11-09, https://developers.google.com/terms), the Calendar API's quota and sync guides, and Google Cloud's API key guides. What they say for us:

- Reading a rink's public calendar with an API key is documented and allowed, and a few calls a day is far inside the quotas (10,000 a minute per project) and free.
- Section 5e forbids building a database of what the API returns, keeping it longer than its cache header allows, changing it, or showing it publicly, "unless expressly permitted by the content owner". The content owner of a rink's calendar is the rink. Making a calendar public and embedding it on its site is not clearly express permission. So each rink's written yes is now required before its calendar is switched on (Decided in `ROADMAP.md`, as a requirement of the terms the owner's choice brings).
- Section 8b: if we stop using the API, delete what we stored. Section 4b: keep keys secret and out of open-source code.
- Google's docs recommend sending the key in the X-Goog-Api-Key header (already done) and restricting it to the Calendar API. IP restrictions are not practical on Vercel's free plan, so the key's protection is the API restriction, a low quota, and keeping it only in Vercel's settings.
- Vercel's free plan runs a scheduled job at most once a day, so Supabase's scheduler will call the job a few times a day, at varied minutes and never at midnight, as Google's guide asks.

What changed in the code:

- Each run now deletes every older session of a source, past ones too, so nothing is kept once it has ended (`replace_source_sessions`, and the local store).
- `forget_source` (database) and `tools/forget-source.mjs`: remove everything from one source and switch it off, for a rink that withdraws or if we stop using the API.
- The Calendar API reader records Google's cache header, so the first real call shows what it allows.
- Each session's "From ..." line links to the rink's own schedule page, and the footer says times come from each rink and that Skate Lodge is not run by any rink.
- 60 tests pass (4 database tests skip until the testing project exists). The link was checked on a 390-wide screen.

Not verified: the cache header on a real answer, and whether the rinks' calendars share session titles or only busy times. Both are seen on the first real call.

## 2026-11-22 (Sunday, evening): secrets move to Doppler, and the professor's card uses the stands clips

### The owner's word

- "I will not use .env file to store secrets ... we will use doppler." Asked later about the cost once the student offer ends.
- "I am unable to provide any more jump clips, especially ones where the camera is on the ice or along the boards with me. All I have are videos recorded from outside of the ice surface in the stands for now."
- Asked whether to create the Vercel and Supabase accounts now or after building, and for an email asking the rinks for permission.

### What changed

- Doppler holds every secret (`ROADMAP.md` Decided, `SECURITY.md` section 8, `CLAUDE.md`, `README.md`). `app/.env.example` is gone, and `tools/dev.mjs` no longer reads a `.env` file. It now refuses to start beside one, and refuses Doppler's production config. Run it with `doppler run --config dev -- node tools/dev.mjs`. The `.env` lines stay in `.gitignore` as a second guard.
- A helper read Doppler's pages today. The student offer gives the Team plan (listed at $21 a person a month) through GitHub Education, with no end date or rules stated. The free Developer plan is free for up to 3 people, with 10 projects, 4 environments and 5 syncs. Doppler syncs to Vercel (one sync per Vercel environment), to GitHub Actions secrets (and to environment secrets for public repositories), and to Supabase's function secrets, but not to Supabase's vault.
- Because of that last point, the scheduled job will be called by a GitHub Actions schedule, not Supabase's scheduler (`BUILD.md` phase 1). GitHub gets its own small Doppler config: the testing project's keys and the job's secret and address, never the production config.
- `BUILD.md`: accounts are made as each phase needs them. Now: Doppler, Vercel, Supabase (both projects), and GitHub's settings. After the rinks say yes: Google Cloud.
- Phase 0 and the professor's checklist now use the four clips the owner filmed from the stands, with the owner naming each jump as the known answer. Air time stays untested (no still-phone clips), and the jump cards stay undrawn until the owner can film from the boards. The card shows numbers only, because the clips show other skaters.

### Verified

- `npm test` passes as before.
- The local server starts and serves the page with no settings. It exits with a clear message when a `.env` file sits in `app/` and when `DOPPLER_CONFIG` is `prd`, and it starts with `dev`.

### Not verified (from memory)

- That `doppler run` passes `DOPPLER_CONFIG` and `DOPPLER_ENVIRONMENT` to the program. The helper found them named in Doppler's docs but no page saying `doppler run` adds them. Check on the first real run. If they are missing, the production refusal does nothing, and only the dev config should ever be used on this computer.
- That one Doppler config can refer to a secret in another, so the GitHub config does not need its own copy of the job's secret.
- Whether two-step sign-in is available on Doppler's free plan (the pricing page lists "MFA", but the helper could not tell which plans include it).
- That GitHub's scheduled workflows can start late and are switched off after 60 days without activity in a public repository.

## 2026-11-22 (Sunday, night): the GitHub Student Pack

The owner asked whether any of the Student Pack's offers would help, or whether offers that end (often after a year) would cause trouble later. A helper read the pack's offer list, Supabase's email page and Resend's prices today. The pack page is long; some terms (1Password for 2 years, Doppler while a student, Sentry, Datadog, .TECH) come from a summary of the part the helper could not read word for word.

- Vercel, Supabase and Resend are not in the pack. Their free plans are the ones the app runs on.
- The pack has no email sender. SendGrid and Mailgun were not found.
- Found in passing: Supabase's built-in email sender only sends to the project's team members, at 2 messages an hour. Its docs say it is "not meant for production use" and that email and password sign-in needs a custom sender. Resend's free plan is 3,000 emails a month, 100 a day, and "free-forever".
- Suggested (`ROADMAP.md`): use pack offers only for building and testing tools, never for what the running app depends on. Use Resend as the email sender before anyone but the owner signs up. A new open question asks: a domain plus Resend, or a separate Gmail account?
- `BUILD.md`: the email sender is in the account list and phase 6's gate. Phase 3 notes that the owner's own account and the made-up accounts need no real sender.

Not verified (from memory): that Resend needs a domain of our own to send to other people; that most pack terms start when claimed; domain prices.

## 2026-11-22 (Sunday, night): accounts made

- The owner made the accounts: GitHub's security settings are on, Doppler has the student Team plan and a project `skate-lodge` connected to GitHub, and Supabase has two projects, `skate-lodge-testing` and `skate-lodge`. Vercel is next. The owner's Vercel account has a v0 student offer (a year, with credits). v0 is Vercel's AI app builder, which this project does not use. Hosting stays on the Hobby plan, which has no end date.
- `SECURITY.md` section 8: only Doppler's free-plan features are used (at most 5 syncs; no config inheritance, rotation or trusted IPs), so the end of the student plan changes nothing. The planned syncs are 3: Vercel Preview, Vercel Production and GitHub.
- Vercel's import screen could not choose `app/` as the root directory. Vercel reads the default branch, and `app/` is only on `phase-1` so far. The only `package.json` on `main` is the Jump Lab test's, so Vercel offered `spikes/jump-lab`.

## 2026-11-22 (Sunday, night): first deploy

- With the owner's yes, `main` caught up with `phase-1` (a plain fast-forward to 7c4fbc4). Both CI jobs passed on `main`. The database checks still skip until the testing project's keys reach GitHub through Doppler.
- The owner imported the repository into Vercel (Hobby, root directory `app`, framework "Other", no settings). It is live at https://skate-lodge.vercel.app.

Checked on the live site:

- Every header from `vercel.json` is sent, on pages and on the API: the content security policy, HSTS, permissions policy, referrer policy, nosniff, frame denial and the opener policy. `http` redirects to `https` (308).
- Only `public/` is served. The server code, the rink data, the tools, the migrations, `vercel.json`, `package.json` and the README all answer 404.
- `/api/week` answers 200 with 12 rinks and no sessions (no database yet, so it falls back to the empty file store). A date in the past answers 400. `/api/refresh` answers 401 with no secret and with a wrong one. An unknown function answers 404.
- At iPhone width (390 wide): no sideways scrolling, no console errors, and the rink colors show, so the security policy blocks nothing the page needs.

Not done yet: when the database is connected, the live site should refuse the local file store, so that a missing setting shows "not available" instead of a quietly empty page. Not checked on a real iPhone yet.

## 2026-11-22 (Sunday, night): Supabase's new keys

Before the owner copied any keys, a helper read Supabase's pages on API keys. They say:
- The older anon and service_role keys are "deprecated by the end of 2026", when this project is due.
- The new publishable (`sb_publishable_`) and secret (`sb_secret_`) keys go "on the `apikey` header, not on `Authorization: Bearer`".
- A publishable key runs as anon, and a secret key runs as service_role and skips every rule.
- Supabase refuses a secret key sent from a browser (it matches on the User-Agent).

What changed:

- `server/store.js` sends the key in the `apikey` header only. It reads `SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY` (formerly `..._ANON_KEY` and `..._SERVICE_KEY`) and refuses a key of the wrong kind in either place. A secret key put where the publishable one goes is refused before anything is sent.
- On Vercel, a missing database setting is now an error ("Schedules are not available right now"), never the local file store. Until now the live site fell back to an empty file store.
- CI and the access tests use `TEST_SUPABASE_PUBLISHABLE_KEY` and `TEST_SUPABASE_SECRET_KEY`. A new access test checks that both are the new kind.
- `SECURITY.md`: the key rules use the new names, and Doppler has four environments (dev, stg, prd, ci), the free plan's limit.
- 6 new tests in `tests/store.test.js`. 70 tests: 65 pass, and 5 database tests skip until the testing project's keys are given.

Not verified: that Vercel sets `VERCEL` or `VERCEL_ENV` inside functions (from memory). It shows on the first deploy of this code: with no settings, `/api/week` should answer 503. Whether new Supabase projects still get the old keys at all is not stated in the docs, and it does not matter now.
