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
6. **Friends and the rink map:** find friends by username, and see on a map drawn from above who is skating where right now.

Around these sit the things that make it fun to come back to: a scoreboard when you save a session, jump cards that show how each jump is done, a dress studio, friends on the same ice, and more (see Fun and coming back under Decided).

It serves three audiences: the skater, the coach, and the club.

## Decided

### Foundations

- [ ] Its own new repository, separate from MySkate (Artifact 2 stays as it was submitted).
- [ ] A log kept from the start, like the other four artifacts, plus a `CLAUDE.md` and a plan in pieces.
- [ ] Build on what exists: MySkate (Artifact 2, `../MySkate`) and MySkate Coach (Artifact 3, `../MySkate-Coach`).
- [ ] A website, not an App Store app. It must work well on an iPhone.
- [ ] A big platform with many tools. The owner accepts the risk of thin tools and believes there is time and skill to avoid it.
- [ ] Mostly adults. The owner first said the youngest skater is 18, then that a skater of 14, 15, 16, or 17 may sometimes use it, and that this is fine (2026-11-16). No younger children are expected. Earlier parts of this plan were written with young children in mind, and those parts were reworked the same day.
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
- [ ] Google sign-in beside email and password (in the adopted `SECURITY.md` section 2, 2026-11-16).
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
- [ ] Rinks that publish their schedule as a public Google Calendar (Kent Valley, Bremerton) are read through Google's official Calendar API, with an API key of our own kept on the server (the owner, 2026-11-22). Not through the calendar's public address: Google's robots file disallows automated reading there. Google's API terms are read before it is switched on.
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

- [ ] Who is on the ice. On a session you picked, see which clubmates picked it too. Skating the same session (both checked in by location) earns both a bonus. Clubmates only, and only skaters who have turned it on for themselves.
- [ ] Buddy visits. Send one of your buddies to a friend's pond. It is there when they open the app, and it comes home the next day with a sticker from them. No typing anywhere.
- [ ] The swap shelf. A club's board for outgrown dresses and skates: a kind, a size, and a picture of the item, approved by a club admin before it shows. Families need this every season.
- [ ] Cue cards. After a lesson the coach taps a few cues from a list or adds their own ("more knee bend on the landing"). The skater sees their coach's three cues before the next practice.

At home, off the ice:

- [ ] Jump cards (the owner's idea). They have their own section below.
- [ ] The off-ice studio. The phone's camera checks an exercise at home with the same body tracking as Jump Lab: how long a spiral position is held, balance on one foot, air turns on the floor. Holds and balance only; nothing about body size or weight.
- [ ] The dress studio. Design the dress or outfit your skater wears: the cut, the colors, where the sparkle goes. Levels unlock new pieces. Dresses are a big part of the sport, and a club could have its own jacket.
- [ ] Watch your program. MySkate's planner already lays a program out on a rink. Here your skater skates that path from above, in time with the music, with each element popping up as it comes.

In Jump Lab:

- [ ] Your best as a ghost. Play today's jump with the skeleton of your best one drawn faintly on top, so progress can be seen, not only read.
- [ ] Send a jump to your coach. A skater can send a Jump Lab clip, the real video with the skeleton and numbers, to their own coach, who draws on it and sends it back (the owner, 2026-11-20; this replaces "send the skeleton, not the video"). Sending only the skeleton stays a choice.
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

### Friends and the rink map

All of this is the owner's (2026-11-16).

- [ ] Friends are found by searching for a username, and added with a friend request that the other skater accepts. This keeps some privacy: nobody is a friend without saying yes.
- [ ] A page of its own with a map. On it you can see your friends: who is online, who checked in to a rink recently, and who is there skating now.
- [ ] A second filter shows skaters who have chosen to share where they are with everyone, with the rink they are at, so that people can make new friends and skate with new people.
- [ ] The map is seen from above. Each rink is an arena you look down on, with round avatars beside it when skaters are there.
- [ ] Tap the avatars and a list opens of the skaters who are there now.
- [ ] Each skater has a status, chosen from a menu and shown beside their username and avatar: for example, working on skills with a coach, or looking for someone to skate with. It works like the statuses in Slack (active, away, in a huddle).
- [ ] The status can be set by itself from what the skater chose to work on in their session.
- [ ] Only skaters who are sharing where they are, at a rink, can see the other skaters who are sharing with everyone. If you are not sharing, you do not see them.
- [ ] What is shared is "I am here" at a rink, never an exact position, and only while at a rink.
- [ ] No messages between friends for now. Friends already have an easy way to talk: they text each other.
- [ ] Visitors to a pond leave stickers, and that is all. Keep it simple.
- [ ] Sticker packs with different themes and colors, unlocked by reaching certain levels.
- [ ] Tracings as stickers: a figure eight, a three-turn, a heart, a star, a spiral, laid on the ice like marks a blade left. They give the look of etching into the pond with nothing to check, because every tracing is one we drew. (The agent's idea; the owner left adding it to the agent, 2026-11-16.)
- [ ] Sharing with everyone that you are at a rink is for accounts of 18 and over only. A skater under 18 does not have that choice.
- [ ] So signing up asks one thing about age: 14 to 17, or 18 and over.
- [ ] Sharing with chosen people, the way Apple's Find My works: two skaters each approve sharing rink visits with the other, and then each can see when the other is at a rink. Every skater can use this, at any age.
- [ ] Approved sharing always works both ways: you see a skater at a rink only if they see you (the owner, 2026-11-16).
- [ ] A skater who is sharing with everyone sees the others who are sharing with everyone at every rink, not only at the rink they are at (the owner, 2026-11-16; the agent had suggested their own rink only).
- [ ] Being friends does not share anything by itself. Sharing rink visits is a second yes, given person by person, on top of being friends.
- [ ] The approval stays on between visits, so there is nothing to decide each time. Every check-in shows who will see it, with one tap for "just me this time".
- [ ] Either skater can end the sharing at any moment, and the other is not told.
- [ ] Friends you have not approved show as online or away only, with no rink.
- [ ] A skater under 18 does not see the skaters who share with everyone, just as they are not shown to them.
- [ ] The difference from Find My: it is only about rinks, the one a skater is at now or the ones nearby. It never shares where someone is through the rest of the day. That is what this plan avoids.

### More tools

The owner said yes to all sixteen of these on 2026-11-16. They were the agent's ideas.

At the rink:

- [ ] Say it, don't type it. Step off the ice and say "waltz jump, eight out of ten, sit spin three stars". The AI fills in the session log for you to confirm.
- [ ] The music room. Keep your program music, mark where each element falls, slow it down to practise a section, and count clean run-throughs.
- [ ] The punch card. Track the passes and punch cards you have bought at each rink, and be told when one is nearly used up or about to run out.
- [ ] Rink guides. A page for each rink: parking, rental skates, the pro shop, lockers, and the rules for freestyle and music. Kept up to date the same way as schedules, by a suggestion that someone else confirms.
- [ ] Warm-up and cool-down. A short timed routine to follow off the ice before stepping on and after stepping off.

Planning:

- [ ] Plan my week. Give it your free time, your budget, and your goals, and it picks the sessions for the week, favouring the ones skaters report as quiet.
- [ ] The trip finder. Going somewhere? See the rinks near where you will be, with their sessions on your dates, and the stamps you could earn.
- [ ] The program builder's score. As you lay a program out, see what its elements add up to in base value, so you can weigh one layout against another.
- [ ] The competition and test board. Local competitions and test sessions with their entry deadlines, a reminder before each, and a packing list.

Looking after yourself and your skates:

- [ ] The skate bench. A record for each pair: sharpenings and who did them, the hollow you asked for, when the boots were heat-moulded or punched out, and notes on fit.
- [ ] Aches and rest. Note a sore spot after a session with two taps. If the same one keeps coming up, the app says so and suggests showing your coach, and a planned rest keeps your week whole.

People:

- [ ] The coach board. Coaches at each rink who are taking new skaters, what they teach, and their open lesson times. A skater asks for a time and the coach says yes or no.
- [ ] Cheers. One tap to cheer a friend's milestone: a first clean jump, a new level, a hundredth hour.
- [ ] Postcards. Earn a postcard at each rink you visit and send it to a friend's pond, where it sits on a shelf.
- [ ] Lodge hosts. An experienced skater who offers to welcome newcomers at their rink wears a host mark on the map. A newcomer can see who to say hello to.
- [ ] The show board. For a club's ice show or event: sign up, see your group and rehearsal times, and take a volunteer shift.

Build these three first (the agent's pick): say it, don't type it; plan my week; and the coach board.

### Refinements learned from other apps

From the study of 44 figure skating apps (2026-11-20). The owner left the call to the agent: add, fold in, or ignore, including ignoring all of them. The agent had three reviewers judge each candidate from different angles (the skater, a strict editor, and safety and honesty) and went with where at least two agreed. None of these is a new tool. Each sharpens something already decided.

- [ ] The practice log's outcomes grow from landed or missed to: landed, two-footed, stepped out, under-rotated, popped, fell (as in Inside Edge and IceNote). The same fixed list is used when saying it instead of typing, in a jump card's common mistakes, and as the skater's own label on a Jump Lab clip. Jump Lab never sets "under-rotated" itself: the tests missed by 0.65 of a turn on average, too far off for that call.
- [ ] Tonight's plan becomes a real list: the skills for the session, each with an optional target (for example 6 of 10 landed), set before skating and ticked off on the kiss and cry when the session is saved. Coach homework arrives as lines in it, and jump cards add to it.
- [ ] The download of everything held about a skater includes the practice log as a spreadsheet file, as MySkate already does. Cells that start with =, +, - or @ are made safe, so an opened file cannot run a formula.
- [ ] The practice log and Jump Lab work without an account, with everything kept on the phone, the way MySkate works today. Signing up moves the log into the account through the same cleaning as a restored backup. Nothing logged before signing up earns experience points, stamps, or badges, because the server could not check it. Nothing social, no map, and no club works without an account.
- [ ] The skate bench counts hours on each pair from the log since its last sharpening, and gives one reminder at a number of hours the skater sets (five apps have this).
- [ ] Every skill card shows "learn first" and "next" links to other skills, drafted and then approved by a coach like the tips, with the line that the order is a guide and to follow your own coach (as in SkatePath).
- [ ] Skill and level lists are stored as data with a federation field. Only Learn to Skate USA is filled in, so another federation can be added later without a rewrite.
- [ ] The streak is counted in weeks: a weekly goal ring the skater sets (for example 3 sessions), where off-ice training and planned rest count. A rest week, a sore week, or a week the rink cancelled uses a freeze by itself instead of breaking the streak. The server works it out.
- [ ] The coach sees only the lines and notes the skater turns on for them. Unlinking ends the coach's access at once in the database rules, and the skater keeps everything, including the coach's cue cards and homework.
- [ ] A plan can be printed or saved as a sheet made on the phone, to hand to a coach who has not joined. It holds skills and targets only, never a rink, session, or time. There is no public link.
- [ ] A second schedule alert the skater can turn on: a new session of a chosen kind (for example freestyle) has appeared at my rinks. Same bell, same rule that only confirmed changes or a rink's own calendar trigger it (as in Open Ice).
- [ ] Each picked session has an "add to my calendar" button, and each rink guide a "directions" link that opens the phone's own maps app with the rink's address. The app never reads or sends the skater's position for this.
- [ ] The music room has a countdown before the music starts, so the skater can put the phone on the boards and get into position (as in SkateLoops).
- [ ] A skater can add the official call for their own jump from a competition protocol (clean, under-rotated, downgraded, an edge call) to a clip of that jump, as a known answer for Jump Lab. Taken from IceReel, which puts official scores on competition video; the replay itself is left to IceReel.
- [ ] Jump Lab does not have to hide the skater behind a skeleton or wireframe. Replays, the side-by-side with a card, and saved pictures can show the real skater, with the skeleton drawn over them or toggled off (the owner, 2026-11-20). A skater may also send the video to their own coach (see "Send a jump to your coach").
- [ ] A milestone card can be saved as a picture: a frame of the skater or the skeleton, the jump's name, the date, and only measurements that passed the clip check, shown as ranges and marked "measured by a phone, not judged". No rink, time, or username unless the skater turns the username on. Never the video.

### Music

The owner said yes on 2026-11-20, after the agent checked Apple Music's and Spotify's rules (details in `LOG.md`).

- [ ] The music room plays only the skater's own file: the program cut they or their coach already have, loaded from their phone. No Apple Music and no Spotify.
- [ ] The file stays on that phone. It is never uploaded to our server, never passed to another skater, and never hosted by us.
- [ ] The countdown, element marks, section repeats, and run-through counts all work on that file.
- [ ] The music room asks the browser to keep its storage (Safari can delete a site's stored files after seven days without a tap), shows when a file is missing, and makes loading it again one tap.
- [ ] The countdown starts from a tap on "Start", because iPhones only play sound after a tap.
- [ ] A short note says the skater is responsible for their music being cleared for where they skate it. U.S. Figure Skating covers cleared songs at its sanctioned events, and ClicknClear sells licences for edited mixes.

### Security

- [ ] The rules in `SECURITY.md` are the project's security rules, set before any building (adopted 2026-11-16; the owner left the decision to the agent, who adopted them). Every feature is planned and built to them.
- [ ] Before any code for a feature, its plan answers one question: "What could a stranger do with this?"

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

- Host on Vercel: the site, plus one small server function that keeps the AI key secret.
- Start from MySkate's plain JavaScript code. Do not rewrite it into a framework.
- Local first: the phone keeps working with no signal at the rink and syncs when it can.
- Split the data: each skater's private things (notes, costs, colors, settings) saved as one bundle; only what is shared goes in tables (people, clubs, roles, which coach sees which skater, session summaries, skill ratings, homework, measurements, rinks and check-ins, quests). A coach can then never read a skater's private notes.
- Name one tool per audience that must be excellent: Jump Lab for the skater, the skater page for the coach, quests for the club.

### The lodge and the pond

- Each tool is a place in the village: Jump Lab is a room in the lodge, the passport is kept at the front desk, badges are in the trophy room, club channels are the lounge, announcements are on the notice board, homework comes from the coach's office, and the pond is out the back.
- A visit shows the pond as its owner last left it. Nothing is live, so there is no need for a server that keeps everyone connected.
- Decorations are earned: levels, badges, stamps, and quests unlock them, so the level road has plenty to give.
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

- Hatches are earned only, never bought. No paid mystery packs: they work the way gambling does, at any age.
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

### Friends and the rink map

The safety rules for the map are in `SECURITY.md` and are now the project's rules. What is left here are the agent's ideas about how it feels to use:

- A starting list of statuses: with my coach, working on jumps, working on spins, edges and skills, running my program, just skating, open to skating together, and heads down (please do not disturb).
- "Open to skating together" is the one that makes new friends: it puts a small mark on your avatar, and two skaters who skate the same session earn the skate-together bonus that is already planned.
- If you ask for it: a nudge when a skater you share with arrives at the rink you are at.
- The map is our own drawing of the region with each rink as a little arena, not a map from a map company. That keeps the lodge look and means no other company learns who looked at which rink. Rinks that are not on the drawing are in a list beside it.
- Online, away, and offline for friends, with a way to appear offline.

### What sets Skate Lodge apart (the agent, 2026-11-20)

The owner noticed many new figure skating apps and asked what would add more value than what is out there. The agent studied 44 apps from their App Store descriptions (read on 2026-11-20; no app was used). The short answer: be the app that knows the rink, and make Jump Lab win on honesty. None of these is decided.

One rule every idea below depends on: a check-in record (which session, what time) stays on the phone, or on the server for a few hours at most, then becomes counts or yes-or-no flags that are deleted once used. Only the stamp stays: the rink, the first visit, and a count.

1. The log that is already written. After skating, most of the session is filled in from the session picked and the check-in; the skater taps or says outcomes from a fixed list.
2. Filming marks at each rink. One to three agreed spots on the boards per rink, so everyone films the same skill the same way, and history compares like with like. Each mark keeps only plain numbers, never a picture.
3. The weekly test skate. The same three skills each week; the result is the middle reading of the attempts, shown with their spread.
4. Four steps to gold. Tried, landed (silver), steady, and passed by a coach (gold). This changes the Decided rule that a card turns gold on the first landing.
5. Lessons that move with the ice. A coach puts lessons on real sessions, sent as requests the student accepts, so when the ice moves, the lessons move with it.
6. The lesson card. Before a lesson the coach sees one card per student, built only from lines the skater turned on. Never the rink, start time, or session.
7. Tonight's plan fits tonight's ice. A packed public session leads with edges and spins; a quiet freestyle leads with jumps.
8. How sure are we. A page of plain counts of how often each measurement was right, starting with the owner's own clips.
9. The virtual camera bench. A research tool: film a card's 3D skeleton with a pretend camera from many places, to learn how much the camera alone moves a number.
10. The rink desk. A free account for a rink's front desk to confirm its week, fix a session, or post a same-day notice from a fixed list.
11. A year frozen into your pond. Each week skated freezes a ring into the pond; at the season's end the pond makes a season book on the phone.
12. Ice wanted. A club admin sees which sessions members pick and which empty times they would skate, as evidence when buying ice.

The scoring approach behind ideas 2, 3, and 8: keep "measured" (what the camera sees, as a range, with "not measured yet" when it cannot tell) apart from "graded" (a coach's call). Check every clip first: 60 frames a second, the skater a quarter of the picture or more, a still phone, steady points. Bring measurements in by evidence: turns per second in mid-air first; air time and held positions after the owner's propped clips are tested; spins later.

### Clubs and safety

- Channels only, no private messages. (This was suggested when children were expected. The owner's own worry was bullying, which adults do too. Whether friends can message each other is now an open question.)
- A report button and a block button, everywhere one skater can see another.
- Standard encryption (in transit and stored) with moderation, not the kind that hides messages from club admins.
- Build chat last, after announcements and comments on homework.
- Signing up means saying you are 14 or older, and the terms say so. Nobody can check an age on a web page, so there is also a way to report an account that seems to belong to someone younger, and such an account is closed.
- Join a club by an invite from its coach or admin only.

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
- It says what is collected and what never is, who can see what, who it is for (skaters of 14 and over), how the rink map and sharing where you are work, how chat is moderated, and how to export and delete your data.

### Order of work

Replaced on 2026-11-22 by the phased plan in `BUILD.md`. The owner said "start building" the same day, which made it the plan, with its stack defaults: Vercel, MySkate's plain JavaScript, two Supabase projects, email and Google sign-in, rink mode for the working screens, and local first. The old order put accounts and the rink list in the week of 11-16, and none of it was built.

## Open questions

- Skate Lodge has not been checked against Google Play or trademarks. skatelodge.app and skatelodge.com looked free on 2026-11-14, which is not proof.
- Does a club have one shared pond that everyone's practice builds up?
- Rink schedules: six of the rink sites looked at keep their schedule in a booking system with no calendar address, though each shows it on an open page (see the rink survey below). The page reader is in, and rinks are not told when it only reads their open page. Still open: the sites' terms of use have not been read, and that should happen before the reader runs against a real rink. Which rink do we ask first for a calendar address? The owner knows coaches and clubs who could ask.
- Shared updates: who may propose one (the suggestion is skaters with that rink's stamp), and is the helper's username shown to everyone?
- Is the rest of the safety list under Suggested approved, or only the proposal-and-approval part?
- Do you want four steps to gold (tried, landed in frost silver, steady, coach-passed in gold) in place of gold on the first landing?
- For cue cards, keep the coach's own words with a length limit, an admin-visible history, and report and block, or limit cues to the list only? And are you happy for homework and coach corrections to be picks from lists?
- Should the coach see only the lines a skater turns on, off by default, shown the next day or as weekly totals (weekly totals by default under 18), never rink, start time or session?
- Lessons would be the one place a coach sees a student's rink and time: only future lessons the student accepted, with past lessons kept only as a count. Is that exception to the past-visits rule acceptable?
- Voice through Safari may send audio to Apple, and our page's rules cannot stop that. After a test on a real iPhone, which do you want: speech recognition that runs on the phone (if it works), an exception, or tapping only?
- Should a second phone be able to film a test-skate try (recorded in the page, measured and thrown away, never saved, with its owner not stored)? Adults could let a friend approved both ways join. Under 18 it would be off until the SafeSport check, then only the linked coach or a friend also under 18. Is that acceptable, or should it be adults only, or left out?
- Do you agree to the one rule for check-ins: check-in records kept a few hours at most, then only counts or yes-or-no flags deleted once used, with the stamp kept as rink, first-visit date and a count?
- Can you ask the coach you know two things: what they want to see before a lesson, and whether they would put their lessons on rink sessions, sent as requests their students accept, so lessons move when the ice moves?
- Should the 'How sure are we' page be public, starting with raw counts from your own 3 to 5 propped clips and no rate until there are dozens of known answers, with per-rink and per-mark figures shown only to signed-in users?
- May adult skaters give single attempts (skeleton only, kept in a locked table in the real Supabase project, checked by a server job that returns totals only, never in the repo or CI) to grow the known answers, in return for XP and a thank-you sticker?
- Would the clubs and rinks you know want an 'ice wanted' page and a free rink desk account, and how should a rink prove it speaks for the rink?
- Should a rink desk's fixes and same-day notices wait for a coach or club admin of that rink to approve them, as planned, or go live at once? Going live at once would change the Decided rule that a shared update needs someone else's yes.
- Apple sign-in needs Apple's paid developer account (about $99 a year), even on a website. Pay for it, or launch with email and Google?
- Chat encryption: the kind only the people in a chat can read would stop admins from moderating. Which matters more?
- Who checks the privacy policy?
- How is the hosted AI coach paid for?
- Is Vercel the host?
- Jump Lab: what do the owner's real clips show? This decides how much of the three tiers is realistic.
- What does a coach want to see about a student between lessons? (Ask one.)
- Partnering with rinks so a stamp is earned after buying a session, or redeemed at the front counter. How would that work?

## Jump Lab test: body tracking on three real clips (2026-11-16)

A test, not the app. The code is in `spikes/jump-lab/`. The clips, the tracked points, and the pictures stay on the owner's Mac and are never committed, because they show other skaters.

The clips: three iPhone videos filmed from the stands at an event, looking down at an angle and following the skater, who fills a quarter to two fifths of the height of the picture. 60 frames a second, HDR, phone upright. Two are one jump each (3.7 and 2.6 seconds). The third, a whole program, has not been tracked yet.

What worked:

- The tracker (Google's MediaPipe pose model, running in Chrome) found a body in every frame of the first clip (223 of 223) and all but one of the second (156 of 157).
- The skeleton sits on the skater, also in mid-air while turning fast. The agent looked at twelve frames with the skeleton drawn over them.
- Turns can be counted. Seen from the camera, the width of the shoulders swings through zero twice in every turn. In the first clip that gave seven half turns in the air, evenly spaced: about 3.7 turns, 4.7 turns a second on average and 5.4 at the fastest. This was the part the agent had expected to be only "likely".
- HDR video and Chrome on the Mac are fine together.

What did not, or not yet:

- Air time is only rough when someone follows the skater with the phone. "Feet together and legs long" gave 0.83 and 0.85 seconds, which is probably too long by a few frames at each end. So no height was worked out: from those times it would come out near 85 cm, which is not believable.
- At the takeoff the picture blurs and the points jump about. In the second clip that added false half turns (it claimed 4.9 turns). The count is good in mid-air and poor at the edges.
- The tracker's own sense of depth, used to tell which way the shoulders face, counted too many turns. The simple width of the shoulders was better.
- It looked slow at first (a fifth of a second for each frame). That turned out to be the test code, not the tracker: see the second round below.

A second round, the same evening, on more clips:

- The slowness was the agent's own test code waiting too long between frames, not the tracker. Fixed, it tracks about 26 frames a second on this Mac without the graphics chip, with the same answers. The graphics chip made little difference.
- Two more single jumps gave clean readings: six evenly spaced half turns (about 3.3 turns, 5.9 turns a second, roughly 0.58 seconds in the air), and five (about 2.4 turns, 3.8 turns a second, roughly 0.65 seconds). The skeleton sat on the skater in mid-air in both.
- The size of the skater in the picture matters most. In the single-jump clips the skater fills a quarter to two fifths of the picture's height, and it works. In a whole program (200 seconds tracked) the skater fills about 18%, and in an 18-second clip about 14%. There the body is still "found" in over 95% of frames, but the points are loose: the search for bursts of turning raised about forty alarms in the program, most with speeds no person can turn at. About eight looked like real jumps (three to seven half turns at 3.3 to 5.1 turns a second, feet together). In a spin, with the skater small, the skeleton was simply wrong.
- So the rule of thumb so far: the skater should fill at least a quarter of the picture's height. That belongs in the filming guide, and the app should say so when a clip is too far away.
- The whole program, tracked again once the file was back (all 250 seconds, 15,029 frames, a body reported in 99.6%): the search marked seventeen bursts as jumps. The agent then drew a close-up of each and looked. Seven show a skater in the air with arms pulled in and feet together (at 0:24, 1:33, 2:09, 2:12, 2:14, 2:29, and 2:45). Three could not be judged because the tracker had lost the skater in that frame. Seven were wrong: the opening pose, a turn near the boards, one unclear, and four pieces of the spin that ends the program.
- So on a far-away, followed program the search finds real jumps but raises as many false alarms as true ones. It needs two things: to throw out bursts whose speed is impossible, and to treat a long run of turning as one spin.
- New weakness: words and logos painted on the ice. In one frame the skeleton was drawn along the letters, not the skater.

What this changes:

- Turn counting and rotation speed moved up to "sure" after this round, then back to "likely" after the third round below.
- Air time and height stay "sure" only for a propped phone, and that has not been tested, because none of these clips is propped. For followed clips they need a better way to find the takeoff and the landing.
- Still to do: the owner's own single jumps, from the side with the phone propped; the long clip; a real iPhone in Safari; and speed.

### Third round: nine jumps whose answer is known (2026-11-17)

Nine single jumps from Wikimedia Commons, each named in its title, so the right number of turns is known (credits in `spikes/jump-lab/CREDITS.md`). Filmed from the side at ice level, the skater filling a third to a half of the picture's height. All nine turned out to be 30 frames a second, not 60.

| Jump | Should be | Counted | Verdict |
| --- | --- | --- | --- |
| Triple Axel (Glenn, 01) | 3.5 | 3.5 | right |
| Triple Axel (Glenn, 02) | 3.5 | 2.6 | under by 0.9 |
| Triple flip (Brown) | 3 | 2.0 | under by 1.0 |
| Triple loop (Glenn) | 3 | 2.3 | under by 0.7 |
| Triple Lutz (Siao Him Fa) | 3 | 3.7 | over by 0.7 |
| Triple Salchow (Kim) | 3 | 2.6 | within half a turn |
| Triple toe loop (Andrews) | 3 | 3.2 | within half a turn |
| Quad toe loop (Siao Him Fa) | 4 | 2.9 | under by 1.1 |
| Quad Salchow (Tomono) | 4 | 3.0 | under by 1.0 |

- 3 of 9 within half a turn. The average miss is 0.65 of a turn, and the misses lean low: six of nine undercount.
- The skeleton sat on the skater in mid-air in all nine (one frame from each, looked at by eye). Finding the body is not the problem.
- The way of counting matters more than its settings. Counting from the width of the shoulders, at three different thresholds, gave the same answers. Counting from the tracker's own sense of depth was worse (2 of 9 at best).
- What 30 frames a second costs: the agent counted the owner's three 60-frame clips again using only every second frame. Two came out about the same; the third went from 3.3 turns to 5.0, because the time in the air was found wrongly. So a lower frame rate makes the takeoff and the landing harder to place, which is where the turns before and after the counted half turns are added.
- The likely reason for the undercount, not yet proven: at 30 frames a second a triple turns about one sixth of a turn between frames, so the moment of takeoff and of landing can each be a frame off, and part of a turn is lost at each end. A quad loses more.
- What it means for the plan: counting turns is right on some jumps but not reliable yet, so it moves back from "sure" to "likely". The 60-frame rule for Jump Lab is now backed by a test, not only a guess. The next fix is finding the takeoff and the landing from the blade and the free leg, not from "feet together, legs long".
- Still untested: the owner's own single jumps, filmed at 60 frames a second from the boards with the phone still.

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

- Apple Music and Spotify in the music room: neither can play an edited program cut, Spotify forbids playing music publicly from a business and caps small apps at five users, and Apple forbids editing or syncing its songs (2026-11-20).
- Random edge and turn drills (Edge Exercises): thin next to a plan a coach fills, and it puts the phone in the skater's hand between drills (2026-11-20).
- Finding the beats in program music automatically (Skate Plan): unreliable on free-tempo music, and marking elements by hand is already decided (2026-11-20).
- A competition replay with official scores drawn on the video (IceReel does it well): only the official call as a known answer for Jump Lab was kept (2026-11-20).
- Also from the study, not worth adding: Apple Watch and Lock Screen logging, a full score calculator, competition results, class payments, a public video feed, paid workout courses, blade condition from a photo, and comparing yourself with an Olympian as the main view (2026-11-20).
- Accounts for young children, parents' accounts, and the rules written for them (a parent's yes for sharing): the owner expects mostly adults, with a few skaters of 14 to 17 (2026-11-16).
- Messages between friends: not needed for now, because friends already text each other (the owner, 2026-11-16).
- Drawing freehand into the ice of a pond: it would need checking for bad words and drawings, perhaps with computer vision. The owner chose to keep it simple with stickers (2026-11-16).
- "Name that jump", a daily puzzle of guessing a jump from a slow skeleton clip: the owner does not think it is needed, and would rather have jump cards that teach each jump (2026-11-15).
- A video game you play while skating: nobody should use a phone on the ice.
- An App Store app: there is no Apple developer account, and a website is enough.
- Checking a ticket purchase through a rink's sales system: out of reach for now. Location first.
- MongoDB: Supabase was chosen, because clubs, coaches, skaters, and homework are related tables with rules about who can read each row.

## The professor's feedback

- Week of 2026-11-16, on the Artifact 5 checkpoint: "In ROADMAP.md you kept what you decided apart from what Claude only suggested. Next week, put the Jump Lab results from your own clips on the card."
- What that asks for, by the next checkpoint (end of the week of 2026-11-23):
  - [ ] Film three to five of the owner's own jumps: 60 frames a second, HDR off, the phone still on the boards, side-on, the skater filling at least a quarter of the picture's height, a jump the owner can name (so the right number of turns is known).
  - [ ] Run them through the Jump Lab test, and check each against its known answer, as was done for the Commons clips.
  - [ ] Put the results on the Artifact 5 card in the Portfolio (`cards.js`), in the owner's own words: what was measured, what was right, and what was not. Only results from the owner's own clips, not the Commons or event clips.
  - [ ] Log it here.

## What the owner is bringing

- Three to five clips of their own jumps: side-on, at 60 frames a second, some with the phone propped and some with someone following. This is now due: the professor asked for the Jump Lab results from the owner's own clips to be on the Portfolio card next week (see the checkpoint below).
- One coach's answer to: what would you want to see about a student between lessons?
- If the chance comes up: ask one rink that uses DaySmart (the Kraken rink or Sno-King) whether it has a calendar address it would share.
