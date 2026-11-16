# Skate Lodge roadmap

The record of what we have decided to build, so that neither the owner nor the agent forgets it. This is planning only: nothing is built yet. Update this file when a decision changes, and note the change in `LOG.md`.

The platform is called **Skate Lodge** (chosen 2026-11-14). The repository is github.com/iiSurf/Skate-Lodge, and the folder on the owner's computer is `Skate-Lodge`.

How to read it:

- **Decided** means the owner said yes or asked for it.
- **Suggested** means the agent proposed it and the owner has not said yes or no yet. Do not build a suggested item as if it were decided.
- **Open questions** need an answer before the part they touch is built.
- **Set aside** means we chose not to do it, with the reason.

## The assignment (TCSS 490, Artifact 5: The Moonshot)

- Build something much larger than anything built before. Grading rewards a genuine attempt, not a finished product.
- 40 to 60 hours, solo. The owner looked for a team and did not find one, so the result has to impress.
- Final show and tell: Monday 2026-12-07, in class. Due: Sunday 2026-12-13, 11:59pm, on Canvas (the Portfolio link).
- Checkpoints at the end of Weeks 6 to 9: the Portfolio link with the Artifact 5 card showing progress.
- Required: its own repository, a plan broken into pieces, a `CLAUDE.md`, a log of plans and changes in the repository, a deployment real people can reach, and the Artifact 5 card in the Portfolio (title, link, short reflection).
- Source: https://cfb3.github.io/TCSS490-26-AUTUMN/assignments/artifact-5/

## What it is

MySkate grown into a platform for figure skaters, their coaches, and their clubs. One product with these parts:

1. **The platform:** accounts, sync across devices, and clubs with a coach view.
2. **Jump Lab:** film a jump and get measurements from the video. This is the headline.
3. **The game:** rink time turned into a game, played off the ice.
4. **The AI coach:** carried over from Artifact 3 if we go that way.
5. **Rink schedules:** several rinks' schedules on one page, kept up to date by the rinks' own calendars and by skaters, with an alert when your ice time moves.

Around these sit the things that make it fun to come back to: a scoreboard when you save a session, jump cards that show how each jump is done, a dress studio, friends on the same ice, and more (see Fun and coming back under Decided).

It serves three audiences: the skater, the coach, and the club.

## Decided

### Foundations

- [ ] Its own new repository, separate from MySkate (Artifact 2 stays as it was submitted).
- [ ] A log kept from the start, like the other four artifacts, plus a `CLAUDE.md` and a plan in pieces.
- [ ] Build on what exists: MySkate (Artifact 2, `../MySkate`) and MySkate Coach (Artifact 3, `../MySkate-Coach`).
- [ ] A website, not an App Store app. It must work well on an iPhone.
- [ ] A big platform with many tools. The owner accepts the risk of thin tools and believes there is time and skill to avoid it.
- [ ] Go big. The size of an idea is not a reason to hold it back: this project calls for it, and building goes fast with the agent (the owner, 2026-11-15). Plan the hard parts of an idea; do not shrink it.
- [ ] A database with a schema: Supabase (hosted Postgres).
- [ ] Coaches and clubs the owner knows will be asked to try it.

### The name and the world

- [ ] The name is Skate Lodge.
- [ ] The whole app feels like staying in a cozy winter village, in the spirit of Whistler Village or the Chateau at Lake Louise. The feeling to aim for is community and coziness.
- [ ] Each skater has their own frozen pond. It is their personal space, where their buddies live and thaw.
- [ ] A skater can visit their pond, edit it, and decorate it.
- [ ] Friends can come and visit a pond. A friend's pond looks like another Lake Louise style scene, with their pond in it.
- [ ] A club is "your pond" too: the pond idea carries through to clubs.
- [ ] Probably not live multiplayer. Visiting does not need everyone online at once.
- [ ] Decorating works like a page in a sticker book: the skater places things anywhere they like. Floating decorations are allowed and can be fun, so no gravity physics is needed.
- [ ] Skaters get a customizable character of our own design.
- [ ] The character appears on ponds, the skater's own and friends'.
- [ ] Possibly in Jump Lab too: the character drawn in the video view with the skeleton's joints and lines. If that is too much, a toggle goes back to the skeleton alone.
- [ ] The village is fun and cozy, but the screens used at the rink stay clean and readable, so stats are easy to reach. How to have both is still to be worked out (see Suggested).

### Accounts

- [ ] Accounts with a username (the part other people see), an email, and a password.
- [ ] Apple sign-in is wanted (see Open questions: Apple charges for it).
- [ ] Data is stored on the server wherever it is needed.

### Jump Lab

- [ ] Record a jump and measure it: air time, height, how many rotations, rotation speed, the landing, and where the skater's axis was.
- [ ] Label which jump it was.
- [ ] Show problem areas: what was done, and what to correct in body placement to complete the skill.
- [ ] Save each result to that skill's history.
- [ ] Require 60 frames a second. If the clip is not 60, a pop-up explains that the feature needs it for accurate numbers.
- [ ] Works best with the phone still, on a tripod or the boards.

### The game

- [ ] Rink time is the game. Nobody uses a phone while skating, so everything happens before and after.
- [ ] Sessions earn hatches: cute collectibles in the spirit of the animal and fruit soft guards skaters buy for their blades (working name: blade buddies).
- [ ] Buddies and stamps are enough kinds of collectible for now.
- [ ] A more sophisticated badge and XP system than MySkate has.
- [ ] Many more ways to earn XP.
- [ ] Every level unlocks something new.
- [ ] The skater can see the levels ahead and what each one will unlock.
- [ ] Off-ice training challenges (stretching, working out).
- [ ] Extra XP for finishing tasks a coach sent.

### Rink passport

- [ ] Skaters earn a stamp for each rink they visit, to encourage trying new rinks, local or while travelling.
- [ ] Stamps must look desirable at first glance.
- [ ] To start, being at the rink (by location) is what counts as a visit.

### Rink schedules

- [ ] Skaters see the schedules of several rinks on one page. The owner thinks this is vital, and that following each rink's Google Calendar on a phone is not efficient.
- [ ] A skater chooses rinks in their area, and can still add their own.
- [ ] An alert when a session the skater picked moves or is cancelled, so they know before a planned visit that their ice time got bumped. The owner called this huge.
- [ ] Shared updating. When a rink's schedule has to be updated by a person, one skater updates it and it is updated for everyone. It is a shared space in that way only. The point is less work for everyone else.
- [ ] Protect the shared schedules against anything malicious, inappropriate, or junk.
- [ ] The skater who helps everyone gets a thank-you: bonus experience points that they can use on a day they choose.
- [ ] A shared update is a proposal first, and it goes live only when someone else approves it. The owner: this is "exactly how a pull request works" on a software team. (In the app itself use plain words, such as "suggest a change" and "confirm".)
- [ ] A page reader, for rinks whose schedule is an open page with no calendar address (the owner said yes on 2026-11-15, choosing this over asking the rinks first). A job that runs a few times a day opens the page the way a visitor's browser does and reads the words on it. The AI turns those words into a draft of the sessions, and plain code checks the draft. Then the draft goes in as a proposal like anyone else's and is approved the same way: the reader is one more helper, not a way round the rules.
- [ ] The page reader's rules: it only opens the page a visitor sees. It never asks a booking system's data service directly and never uses a key. It goes slowly (a few visits a day), and every schedule links back to the rink's page. If a rink asks to be left out, the reader stops for that rink.
- [ ] Rinks do not need to be told when the reader only reads their open page, the same page any visitor reads (the owner, 2026-11-15). Ask a rink only when we want a direct way to get its calendar, such as a calendar address.
- [ ] Once a rink's page-reader drafts have been approved many times with no corrections, they go live on their own, without waiting for approval (the owner agreed, 2026-11-15).
- [ ] The thank-you is a Fresh Ice token. The owner left the details to the agent (2026-11-15), and these are them: a skater earns one token when an update of theirs is approved, at most two a week, and can hold three. They spend a token on a day they choose, and that day's practice earns double experience points. The helper is also told how many skaters their update reached, and there is a Rink Keeper badge at 1, 10, and 50 approved updates.

### Fun and coming back

The owner said yes to all fifteen of the agent's ideas on 2026-11-15, then took one out (the "Name that jump" puzzle, see Set aside) and put jump cards, the owner's own idea, in its place. Each idea keeps the safety detail it was suggested with.

After you skate:

- [ ] Session reports. When a session is saved, one tap for how busy it was (quiet, busy, packed) and one for the ice (fresh, fine, rough). The schedule page then shows "usually quiet" beside a session, which no rink's own site can tell you. Choices only, so nothing to moderate, and worth a little experience.
- [ ] The kiss and cry. Saving a session ends with a scoreboard that reveals the numbers one at a time (minutes, jumps landed, a personal best), the way scores come up after a program. A longer sheet at the end of each week and each season.
- [ ] Your patterns. The app finds things in your own log and tells you: "You land more waltz jumps in morning sessions", "Your best practices come after a rest day". A new one every week or two.

With other skaters, safely:

- [ ] Who is on the ice. On a session you picked, see which clubmates picked it too. Skating the same session (both checked in by location) earns both a bonus. Clubmates only, and only skaters whose parent or coach allows it.
- [ ] Buddy visits. Send one of your buddies to a friend's pond. It is there when they open the app, and it comes home the next day with a sticker from them. No typing anywhere.
- [ ] The swap shelf. A club's board for outgrown dresses and skates: a kind, a size, and a picture of the item, approved by a club admin before it shows. Families need this every season.
- [ ] Cue cards. After a lesson the coach taps a few cues from a list or adds their own ("more knee bend on the landing"). The skater sees their coach's three cues before the next practice. A parent can see them too.

At home, off the ice:

- [ ] Jump cards (the owner's idea). They have their own section below.
- [ ] The off-ice studio. The phone's camera checks an exercise at home with the same body tracking as Jump Lab: how long a spiral position is held, balance on one foot, air turns on the floor. Holds and balance only; nothing about body size or weight.
- [ ] The dress studio. Design the dress or outfit your skater wears: the cut, the colors, where the sparkle goes. Levels unlock new pieces. Dresses are a big part of the sport, and a club could have its own jacket.
- [ ] Watch your program. MySkate's planner already lays a program out on a rink. Here your skater skates that path from above, in time with the music, with each element popping up as it comes.

In Jump Lab:

- [ ] Your best as a ghost. Play today's jump with the skeleton of your best one drawn faintly on top, so progress can be seen, not only read.
- [ ] Send the skeleton, not the video. A skater shares the skeleton replay with their coach, who draws on it and sends it back. No video of a child leaves the phone.
- [ ] Milestone cards. A keepsake card for a first: your first clean salchow, with the date and its numbers. Rare ones for the big firsts.

The front door:

- [ ] Anyone can look at rink schedules without an account. Signing in is for picking sessions and getting alerts. The schedule page is then the thing people share, and how a new skater finds Skate Lodge.

Build these three first (the agent's pick): session reports, who is on the ice, and the jump cards.

### Jump cards

The owner's idea, with the agent's list of how the cards work, which the owner approved on 2026-11-15.

- [ ] A menu of cards, one for each jump. A card shows the jump's name and a character caught at the moment that makes that jump what it is. Tap a card to see an animation of how the jump is done, tips and tricks for doing it, and the mistakes skaters commonly make while learning it.
- [ ] The moment on the front of each card is the one that tells that jump apart: the toe pick going in for a toe loop, the forward takeoff of a waltz jump or an Axel, the back outside edge of a loop.
- [ ] Each card is tied to the same jump in the practice tracker. From a practice plan, tap the jump to open its card. From the card, add the jump to tonight's plan.
- [ ] Tips and common mistakes are written like everything else that is shared: drafted (by the owner, a coach, or the AI), then approved by a coach before skaters see them. A card shows "checked by a coach" once it has been.
- [ ] Every card says it is a picture to learn from, not coaching, and to follow your own coach. A jump taught wrong can hurt someone.
- [ ] The animation is our skater drawn with the skeleton and its joints, the same drawing used in Jump Lab and elsewhere (the owner, 2026-11-15). The poses can come from a clean jump recorded in Jump Lab by a skater who agrees to it. Only the skeleton is kept, never the video.
- [ ] Slow the animation down, step through it, and turn the skater round to see it from the front, the side, and above.
- [ ] In Jump Lab, put your own attempt beside the card's animation, so the difference can be seen.
- [ ] When you land the jump for the first time, its card turns gold and becomes your milestone card for it.
- [ ] The same kind of card for spins, turns, and the Learn to Skate skills, after the jumps.

### Clubs

- [ ] Clubs have accounts and devices sync.
- [ ] A coach view: assign homework and see students' progress.
- [ ] Chat in channels. Club admins create the channels.
- [ ] Chat text is encrypted.

### Look and feel

- [ ] Animation wherever it helps, including the small things.
- [ ] The passport moves slightly as the phone tilts.
- [ ] A stamp is animated being added to the passport. It does not just appear.
- [ ] A notifications button at the top of every page, for a new stamp or collectible and the like.
- [ ] Fun color.

### Privacy

- [ ] A privacy policy page.

## Suggested (waiting for a yes or no)

### Foundations

- Google sign-in beside email and password. It is free; Apple is not.
- Host on Vercel: the site, plus one small server function that keeps the AI key secret.
- Start from MySkate's plain JavaScript code. Do not rewrite it into a framework.
- Local first: the phone keeps working with no signal at the rink and syncs when it can.
- Split the data: each skater's private things (notes, costs, colors, settings) saved as one bundle; only what is shared goes in tables (people, clubs, roles, which coach sees which skater, session summaries, skill ratings, homework, measurements, rinks and check-ins, quests). A coach can then never read a skater's private notes.
- Name one tool per audience that must be excellent: Jump Lab for the skater, the skater page for the coach, quests for the club.

### The lodge and the pond

- Each tool is a place in the village: Jump Lab is a room in the lodge, the passport is kept at the front desk, badges are in the trophy room, club channels are the lounge, announcements are on the notice board, homework comes from the coach's office, and the pond is out the back.
- A visit shows the pond as its owner last left it. Nothing is live, so there is no need for a server that keeps everyone connected.
- Decorations are earned: levels, badges, stamps, and quests unlock them, so the level road has plenty to give.
- Visitors leave a wave or a sticker from a fixed set, not typed words. This keeps ponds safe from unkind messages, the same worry as with private chat.
- Only friends and clubmates can visit. No pond is open to strangers.
- A way to have both: the village lives in the home screen, the pond, the rewards, and the names of places. Starting a session switches to a plain "rink mode" with big type and plain cards, and the village comes back when the session is saved.
- The character's default outfit is leggings and a top, with a dress as an option (the owner's choice in MySkate's roadmap).
- One character everywhere: change it once and it changes on the pond, in the village, and in Jump Lab.
- The pond and village need drawings. Build them from a small set of pieces (trees, cabins, lanterns, benches, snow) that can be arranged many ways.
- Our own look and our own characters. Other games are inspiration for the feeling only.

### Jump Lab

- The video never leaves the phone. Only the numbers are saved to the account.
- Three tiers, because the parts are not equally achievable. Sure: air time, height, slow replay with a skeleton drawn over the skater. Likely: rotation count, rotation speed, landing checks. Reach: axis lean, naming the jump automatically, corrections.
- The skater says which jump they tried. Automatic labelling is then a bonus check.
- Corrections are worded as things to show your coach, not instructions.
- Two filming modes: "propped" (still phone, every measurement) and "followed" (someone holds the phone, fewer measurements, marked approximate).
- A website cannot change the iPhone camera's frame rate. It can read a clip's frame rate, then refuse it or accept it and mark the numbers as rough.
- The skater taps themselves in the first frame, so the app does not follow the wrong person.
- A short filming guide (side-on, close enough).
- Spins as well as jumps: revolutions, speed, and how far the spin travels.

### The game

- Hatches are earned only, never bought. No paid mystery packs, because children use this.
- A buddy arrives frozen in an ice cube that thaws with minutes on the ice, so it is not a copy of an egg.
- An album with empty outlines for the buddies not yet found.
- Rarity, with rare buddies tied to real milestones.
- Buddies grow as the skater keeps practising.
- Sparkly special versions.
- Build many buddies from few drawings: a kind, a color, and an accessory.
- Later: sets with an end date (a winter set), and giving a duplicate to a clubmate.
- The level road: one long view of every level ahead and its reward.
- Rest counts: stretching and planned rest days keep a streak alive, so a sore skater is not pushed onto the ice.
- Club quests: everyone's sessions fill one bar ("the club skates 100 hours in December").

### Rink passport

- A QR poster at the owner's home rink as a pilot partnership, beside the location check.
- A foil shine on stamps and rare buddies that slides as the phone tilts.
- iPhones ask permission for motion, and only after a tap. So the passport has a "tilt me" tap, and falls back to dragging with a finger.

### Rink schedules

Where the schedules come from:

- MySkate already has most of the skater's side (`../MySkate/js/ice.js`, with tests): one week of sessions from all your rinks, filters by type and rink, My picks, a warning when picks overlap, and a reader for calendar files that handles repeats and cancelled dates.
- What stopped MySkate going further was having no server. Skate Lodge has one, so a rink's public calendar address can be read automatically, every few hours, with the same reader.
- One shared list of rinks (name, city, place on the map, a link to its schedule page, its calendar address if it has one, and the day its schedule was last confirmed). The rink passport needs this same list for its stamps, so build it once for both.
- "Rinks near me" needs a starting list. OpenStreetMap has ice rinks marked and could seed names and places (MySkate found its free servers unreliable, so copy the list once; do not depend on it live).
- A rink of your own that only you see stays possible, as in MySkate. Offering it to the shared list is a shared update like any other (see below).
- Always show where a schedule came from and when it was last checked, with a link to the rink's own page. A wrong time sends a skater to a closed rink.
- Give each skater a private calendar address for their picks, so their phone calendar can still follow along, with only the sessions they chose.
- Reach: point the app at a rink's schedule page, PDF, or a photo of the printed schedule, and the AI drafts the sessions for a person to check. The draft then goes through the same checks as any shared update. The photo is read and thrown away; nobody else ever sees it.
- Only read what a rink publishes openly. No reading behind a login, and no copying a booking system's pages against its rules.
- How many is "many times": ten approved drafts in a row for that rink. One correction, or one "This is wrong" report that turns out to be right, puts the rink back on approval until it has ten in a row again.
- A draft that goes live on its own is still marked as read from the rink's page, so a skater can tell it from one a person confirmed.

Keeping shared updates safe (the owner asked for protection against malicious, inappropriate, and junk updates):

- Nothing to upload and almost nothing to type. A shared update is made of choices: the kind of session from a fixed list, the day, the start and end time, and a price as a number. No free text, no links, no pictures. Inappropriate words have nowhere to go. A note, if wanted, comes from a short fixed list ("Holiday hours", "Cancelled this week", "Moved").
- The one place for typing is the name and city of a new rink. A new rink waits for a coach or club admin to approve it, and is matched against the map list first.
- Only skaters who have that rink's passport stamp can update it. The stamp means they were really there, which strangers and troublemakers were not.
- Who can approve a proposal: one other skater with that rink's stamp, or a coach or club admin. The skaters who picked that session are the ones asked "Is this right?".
- Coaches and club admins can update directly, because the club has vouched for them.
- Plain code checks every update before anyone sees it: real times, an end after the start, a sensible length, no copy of a session that is already there, and no date far in the future. Removing a large part of a rink's schedule at once always needs a coach or club admin.
- A limit on how many updates one skater can make in a day.
- Every change is kept in a history (who, what, when), and anyone trusted can put the last good version back with one tap.
- A "This is wrong" button on every session. Enough reports hide the change and put the old one back until someone trusted looks.
- Trust is earned and lost: updates that others confirm make a skater's next ones go through faster, and updates that get undone take the right to update away.
- Where a rink's own calendar is read automatically, the calendar wins. A skater can only report that the page differs.
- The server enforces all of this, in the database's own rules. The page in the browser is never trusted.

Alerts and the thank-you:

- An alert only goes out for a change that is confirmed or comes from the rink's own calendar. An unconfirmed proposal never cancels anyone's plans; at most the session shows "may have changed".
- The alert says where the change came from ("from the rink's calendar", "confirmed by a coach", "confirmed by 2 skaters").
- No token for changing something back and forth, and none for an update that is undone as wrong.

### Clubs and safety

- Channels only, no private messages. U.S. Center for SafeSport rules ask for messages between an adult and a child athlete to be open, with another adult included.
- A report button, and parents can see their child's channels.
- Standard encryption (in transit and stored) with moderation, not the kind that hides messages from club admins.
- Build chat last, after announcements and comments on homework.
- Accounts for ages 13 and over, or a parent's account for younger skaters. Join a club by a coach's invite only. No public profiles.

### Notifications

- The bell with an inbox on every page.
- Alerts when the site is closed work on an iPhone only if the site is added to the Home Screen, so make the site installable.
- Only tell the skater about things they earned or were sent. No "come back" messages.

### Look and feel

- Every animation has an off state for people who ask their phone to reduce motion (a MySkate rule).
- Keep MySkate's clean rink look as the base and add color through the collectibles.

### The AI coach

- Keep Artifact 3's pattern: the model answers in a fixed shape and plain code checks the answer.
- Artifact 3 runs on the owner's own Claude Code sign-in, which only works on the owner's computer. A hosted coach needs a paid key held on the server and a limit per skater.
- The coach's best new job is explaining Jump Lab's numbers.

### Privacy page

- Written in plain language, with a short terms page beside it.
- It says what is collected and what never is, who can see what, how children's accounts work, how chat is moderated, and how to export and delete your data.

### Order of work

1. The weekend of Nov 14 to 15: the plan, the new repository, and the rink survey. (Done. The one-day test of Jump Lab is waiting for the owner's clips.)
2. Nov 16 to 22: accounts and sync; the shared list of rinks, with Kent's and Bremerton's calendars read automatically and the week page from MySkate on top, open to anyone without an account; session reports and the kiss and cry when a session is saved; and Jump Lab's sure tier, with your best as a ghost.
3. Nov 23 to 29: clubs and the coach view, with cue cards and who is on the ice; shared updates with approval, and the alert when a picked session moves; Jump Lab's likely tier, sending the skeleton to a coach, and milestone cards; and the jump cards.
4. Nov 30 to Dec 6: the page reader; the AI explanation in Jump Lab and your patterns; the pond with buddy visits and the dress studio; the off-ice studio; the swap shelf; watch your program; quests and the Fresh Ice token; a trial with one real coach; and polish for the demo.
5. Dec 7 to 13: show it, fix what the trial found, write the reflection.

Design the XP and hatch rules early, because they touch every tool. The art can come later.

## Open questions

- Skate Lodge has not been checked against Google Play or trademarks. skatelodge.app and skatelodge.com looked free on 2026-11-14, which is not proof.
- Does a club have one shared pond that everyone's practice builds up?
- Rink schedules: six of the rink sites looked at keep their schedule in a booking system with no calendar address, though each shows it on an open page (see the rink survey below). The page reader is in, and rinks are not told when it only reads their open page. Still open: the sites' terms of use have not been read, and that should happen before the reader runs against a real rink. Which rink do we ask first for a calendar address? The owner knows coaches and clubs who could ask.
- Shared updates: who may propose one (the suggestion is skaters with that rink's stamp), and is the helper's username shown to everyone?
- Is the rest of the safety list under Suggested approved, or only the proposal-and-approval part?
- Apple sign-in needs Apple's paid developer account (about $99 a year), even on a website. Pay for it, or launch with email and Google?
- Private messages: the owner is unsure, and worries about bullying. The suggestion is none.
- Chat encryption: the kind only the people in a chat can read would stop admins from moderating. Which matters more?
- Who checks the privacy policy, above all the part about children?
- How is the hosted AI coach paid for?
- Is Vercel the host?
- Jump Lab: what do the owner's real clips show? This decides how much of the three tiers is realistic.
- What does a coach want to see about a student between lessons? (Ask one.)
- Partnering with rinks so a stamp is earned after buying a session, or redeemed at the front counter. How would that work?

## Rink survey: how nine rink sites near the owner publish their schedules (looked at 2026-11-15)

The owner listed nine rink sites around Puget Sound (eleven rinks, because Sno-King has three). The agent read each site's home page and schedule pages once, on one day. Systems change, so check again before building on any of this.

| Rink | Where the schedule lives | Can a server read it today? |
| --- | --- | --- |
| Kent Valley Ice Centre (Kent) | Google Calendar, one calendar for each kind of session (public skating, freestyle) | Yes. Both calendars were downloaded and read. |
| Bremerton Ice Center (Bremerton) | Google Calendar, one calendar holding everything; sign-up is in DaySmart | Yes. Downloaded and read. It needs sorting (see below). |
| Sprinker Recreation Center (Parkland) | Pierce County's website calendar, with a "Subscribe to iCalendar" link | Maybe. The county's site refused the agent's automatic request, so it may need the county's permission. |
| Kraken Community Iceplex (Seattle) | DaySmart, a booking system, shown on the rink's own pages: a public and drop-in calendar, and a separate monthly freestyle calendar. The freestyle season calendar is also a PDF. | No calendar address. The pages are open to any visitor. |
| Sno-King Ice Arenas (Renton, Snoqualmie, Kirkland) | DaySmart, shown as a week view on their own site, with a filter for the rink and for the kind of session | No calendar address. The page is open to any visitor. |
| Tacoma Twin Rinks (Tacoma) | LeagueApps bookings (open skate, the club's freestyles, pond hockey, speed skating, curling). The rink's own Events page only explains the sessions and links there. | No calendar address. The bookings page is open to any visitor. |
| Lynnwood Ice Center (Lynnwood) and Olympicview Arena (Mountlake Terrace) | RecTimes, a live schedule app. One page covers both rinks and shows everything on the ice. | No calendar address. The page is open to any visitor. |
| Everett Community Ice Rink (Everett) | Bond Sports schedule page | No calendar address. The page is open to any visitor, though it did not finish loading in the agent's browser. |
| Bellevue Ice Rink (Bellevue, seasonal) | A month calendar of opening hours on a Wix site | No calendar address. Open to any visitor. Its hours are mostly fixed for the season, so by hand is fine. |

What this means:

- Two of the nine can be automatic today, one might be, and six cannot without the rink's help. So the shared updates the owner asked for are not a side feature: most rinks will depend on them, or on the AI drafting a schedule for a person to approve.
- The same few systems keep coming up. DaySmart alone runs the Kraken rink and all three Sno-King rinks, and takes sign-ups for Bremerton. If one of those rinks agrees to share its schedule, the same work may serve the others.
- Booking systems are not to be read without permission. The agent made no request to any of them. One rink's page carries its own key for its booking system in plain view; that key is the rink's and must never be used.
- The owner was right that one site carries several schedules. Kent keeps a separate calendar for each kind of session. Bremerton puts everything in one: public sessions, stick and puck, freestyle, learn to skate, team practices, private rentals, and ice maintenance. Sno-King is one organisation with three rinks. So the shared list needs: an organisation, its rinks, and for each rink one or more schedule sources, each marked with its kind or as mixed.
- A mixed calendar needs sorting by its titles, and hiding what is not for the public (private rentals, team practices). MySkate's reader sorted Bremerton's 286 coming sessions into 56 stick and puck, 50 public skate, 22 freestyle, 15 learn to skate, and 143 it could not place, which were mostly practices, rentals, and maintenance.
- MySkate's reader needs one change before it can read a real rink's calendar. These calendars go back years (Bremerton's has 14,256 events since 2011, and the file is 5.6 MB). The reader only looks at the first 300 events in a file, which are the oldest, so it found nothing in all three. With the past events removed first, it read 176 public sessions and 52 freestyle sessions at Kent, and 286 sessions at Bremerton. The fix: drop what has ended before counting, and raise the limit on the server.
- Kinds of session seen: public skating, holiday public skating, sessions under black lights, freestyle, stick and puck, learn to skate, drop-in hockey, curling, ice maintenance, and closed days. The owner also named collegiate sessions.
- Not looked at: whether Kent has more calendars (hockey), what the all-day entries in Kent's calendars are, Sprinker's calendar subscription itself, and anything inside a booking system.

A second look, with the schedule pages the owner sent (same day). The agent opened each page in a browser, the way a visitor would:

- None of the six needs a sign-in to see the schedule. Each is a page that fills itself in after it loads (the Kraken page says to allow 10 to 15 seconds).
- None has a "subscribe" or "export" button, so there is still no calendar address to read.
- None of these sites' robots files (where a site says what automatic visitors may read) forbids its schedule page. That is a good sign, not permission: the sites' terms of use were not read.
- So there is a middle way between an open calendar and updating by hand: read the page itself, as a visitor's browser does. See "A page reader" under Suggested.
- What the pages show adds to the list of kinds. The Kraken rink has four kinds of freestyle (open, aspire, competitive, and collegiate or adult), tot play hour, and several kinds of public skate. Tacoma has sessions for members only. Freestyle at Sno-King and the Kraken rink is sold in 30-minute slots, so one morning can be six entries in a row: the page should join slots that touch into one block.
- The owner's Lynnwood link covers a second rink, Olympicview Arena, which makes twelve rinks on ten sites.

## Name search (checked 2026-11-14)

What was checked: Apple's U.S. App Store search, whether a web address has name servers, GitHub repository names, and one web search each. Not checked: Google Play, trademarks, other countries. "No name servers" suggests an address is free but does not prove it.

- **Tracings:** avoid. tracings.net has been a well-known figure skating results site since 2004, so skaters would confuse the two. tracings.com and tracings.app are registered. No App Store app has the name.
- **Toe Pick:** usable with a caveat. An app called ToePick (English test practice, released October 2026) is in the App Store. It has nothing to do with skating. toepick.app and toepick.io look free; toepick.com is registered.
- **Twizzle:** avoid. Several apps and games already use it, and the .com, .app, and .io addresses are registered.
- **Soakers:** the cleanest so far. No App Store app has the name, and soakers.app looks free (soakers.com is registered).
- **Kiss & Cry:** avoid. A sports app with this exact name is in the App Store.
- **Three Turn** and **Fresh Ice:** no app has the exact name, but the .com and .app addresses are registered.

### Names with "skate" and a theme (checked 2026-11-14, same limits as above)

The owner asked for names with "skate" in them and a theme attached. In the U.S. App Store, only Star Skate already exists among these. Every .app address looked free.

- .com also looks free: Skate Pond, Skate Lodge, Skate Nest, Thaw Skate, Aurora Skate, North Star Skate, Skate Passport, Skate Hatch, Frost Skate, Skate Bloom.
- .com is registered: Moon Skate, Skate Atlas, Skate Haven, Skate Den, Skate Folk, Skate Quest, Ever Skate.
- Avoid: Star Skate (an app has the name).

## Set aside

- "Name that jump", a daily puzzle of guessing a jump from a slow skeleton clip: the owner does not think it is needed, and would rather have jump cards that teach each jump (2026-11-15).
- A video game you play while skating: nobody should use a phone on the ice.
- An App Store app: there is no Apple developer account, and a website is enough.
- Checking a ticket purchase through a rink's sales system: out of reach for now. Location first.
- MongoDB: Supabase was chosen, because clubs, coaches, skaters, and homework are related tables with rules about who can read each row.

## What the owner is bringing

- Three to five clips of their own jumps: side-on, at 60 frames a second, some with the phone propped and some with someone following.
- One coach's answer to: what would you want to see about a student between lessons?
- If the chance comes up: ask one rink that uses DaySmart (the Kraken rink or Sno-King) whether it has a calendar address it would share.
