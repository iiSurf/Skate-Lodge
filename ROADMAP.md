# Skate Lodge roadmap

The record of what we have decided to build, so that neither the owner nor the agent forgets it. This is planning only: nothing is built yet. Update this file when a decision changes, and note the change in `LOG.md`.

The platform is called **Skate Lodge** (chosen 2026-11-14). The folder on the owner's computer is still named "MySkate-Moonshot". That is only a local name: the repository is Skate Lodge.

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

It serves three audiences: the skater, the coach, and the club.

## Decided

### Foundations

- [ ] Its own new repository, separate from MySkate (Artifact 2 stays as it was submitted).
- [ ] A log kept from the start, like the other four artifacts, plus a `CLAUDE.md` and a plan in pieces.
- [ ] Build on what exists: MySkate (Artifact 2, `../MySkate`) and MySkate Coach (Artifact 3, `../MySkate-Coach`).
- [ ] A website, not an App Store app. It must work well on an iPhone.
- [ ] A big platform with many tools. The owner accepts the risk of thin tools and believes there is time and skill to avoid it.
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

1. This weekend (Nov 14 to 15): the plan, the new repository, and a one-day test of Jump Lab on real clips.
2. Nov 16 to 22: accounts, sync, and Jump Lab's sure tier.
3. Nov 23 to 29: clubs and the coach view, then Jump Lab's likely tier.
4. Nov 30 to Dec 6: the AI explanation, quests, a trial with one real coach, and polish for the demo.
5. Dec 7 to 13: show it, fix what the trial found, write the reflection.

Design the XP and hatch rules early, because they touch every tool. The art can come later.

## Open questions

- Skate Lodge has not been checked against Google Play or trademarks. skatelodge.app and skatelodge.com looked free on 2026-11-14, which is not proof.
- Does a club have one shared pond that everyone's practice builds up?
- Apple sign-in needs Apple's paid developer account (about $99 a year), even on a website. Pay for it, or launch with email and Google?
- Private messages: the owner is unsure, and worries about bullying. The suggestion is none.
- Chat encryption: the kind only the people in a chat can read would stop admins from moderating. Which matters more?
- Who checks the privacy policy, above all the part about children?
- How is the hosted AI coach paid for?
- Is Vercel the host?
- Jump Lab: what do the owner's real clips show? This decides how much of the three tiers is realistic.
- What does a coach want to see about a student between lessons? (Ask one.)
- Partnering with rinks so a stamp is earned after buying a session, or redeemed at the front counter. How would that work?

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

- A video game you play while skating: nobody should use a phone on the ice.
- An App Store app: there is no Apple developer account, and a website is enough.
- Checking a ticket purchase through a rink's sales system: out of reach for now. Location first.
- MongoDB: Supabase was chosen, because clubs, coaches, skaters, and homework are related tables with rules about who can read each row.

## What the owner is bringing

- Three to five clips of their own jumps: side-on, at 60 frames a second, some with the phone propped and some with someone following.
- One coach's answer to: what would you want to see about a student between lessons?
