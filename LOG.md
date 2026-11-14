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
