# Skate Lodge build plan

**Status: the plan.** Proposed by the agent on 2026-11-22; the owner said "start building" the same day, so building has started with phase 1. `ROADMAP.md` stays the source of truth for what we build; this file is the order we build it in. The stack defaults below were taken, since the owner did not change them.

How it was made: three planners drafted phased plans from different angles (the show and tell first, foundations and risk first, a skater's week first). A judge merged the best of them, and two checkers looked for gaps against every Decided item and against `SECURITY.md`. They found 41 problems; every fix is applied here.

## The short answer

- **Is there enough of a plan to start?** Yes, for phase 1. The open questions mostly block later phases, and each has a safe default below.
- **Phases or all at once?** Phases. Each phase ends with something working and online at the same address, so there is always something to show, and the security rules go in before any real person signs up. All at once would mean nothing works until the end.
- **The calendar:** today is Sunday 11-22. The show and tell is Monday 12-07 (code frozen the evening of Sunday 12-06). The artifact is due Sunday 12-13. Thanksgiving is Thursday 11-26.
- **The schedule has slipped:** the old order of work put accounts and the rink list in the week of 11-16, and none of it is built. This plan starts from today.

## Before phase 1: what only the owner can do

1. Say "start building".
2. Confirm the stack (each has a default if there is no answer):
   - Host: Vercel's free address, for the site and a few small server functions. The domain waits.
   - Front end: MySkate's plain HTML, CSS and JavaScript, with no framework and no build step. It keeps the `html` escaping tag, the clean rink look, the self-hosted font and the test tools.
   - Database and sign-in: Supabase, as two projects, one for testing and one for real.
   - Sign-in: email and password plus Google. Apple waits for the $99-a-year developer account.
   - The rink mode look for the working screens, and local first (the phone works without signal and syncs later). Both are only Suggested so far, and phase 1 is built on them.
3. Create accounts as each phase needs them, not all at once (the agent's advice, 2026-11-22). Turn on two-step sign-in on each as it is made. You put every key into Doppler yourself, so the agent never sees a service key, and Doppler copies it to the services.
   - **Now, for phase 1:** Doppler (the student offer through GitHub Education), Vercel (Hobby, signed in with GitHub), and Supabase with two projects (testing and real; the free plan allows two). Plus GitHub's security settings and a `testing` environment for the repository.
   - **After Kent Valley and Bremerton say yes:** a Google Cloud project with an API key restricted to the Calendar API.
   - **Before anyone but you signs up:** an email sender for sign-in emails, and probably a domain (see Open questions in `ROADMAP.md`).
   - **Later, only if a phase needs one:** an AI provider (phase 6, if you want AI at all).
   - **From the GitHub Student Pack:** only tools for building and testing, never something the running app depends on (Suggested in `ROADMAP.md`). Doppler is the exception, because its free plan covers the project.
4. Turn on secret scanning, push protection, Dependabot alerts and private vulnerability reporting for the repository.
5. A written yes that your own clips and your own account may be used to test (an exception to `SECURITY.md` section 14, which says test data is made up). They stay on the Mac, never in Git or CI.
6. Name the jumps in the clips you filmed from the stands (phase 0). New clips from the boards wait until you can film them.

## How the two Supabase projects are used

- **The real address** points at the real project. Sign-up is closed: accounts are made only from single-use invites, and a check in the database refuses any new account without one, Google sign-ins included. Only the owner has an account until the "Before real people use it" list in `SECURITY.md` holds.
- **A fixed staging address** points at the testing project, where the access tests and the show run. Sign-up is closed there too: test accounts are made by the test script, demo accounts by hand, all made up.
- Real details (the owner's check-ins at a real rink, the owner's clips sent to a coach) happen only on the real project. The testing project uses a made-up demo rink at the classroom and made-up or Commons clips.

## Phase 0: the professor's card (Mon 11-23 to Sun 11-29, alongside phases 1 and 2)

**Changed 2026-11-22:** you can't film from the ice or along the boards for now. The only clips you have are the four you filmed from the stands at an event (`clips/IMG_8434`, `IMG_8437`, `IMG_8440`, `IMG_8441`: two single jumps, an 18-second clip and a 4-minute program, all 60 frames a second, following the skater). So the card is built on those. They are your own clips in the sense the professor asked for, because you filmed them, but they show other skaters, and the card says so plainly.

**Goal:** the Artifact 5 card shows, in your words, what Jump Lab measured on the clips you filmed, what it got right against the known answer, and what it got wrong.

- No app code. The four clips go through the Jump Lab test (`spikes/jump-lab`) again, with your answers as the known answer:
  - For each single jump: which jump it was (a toe loop, a double Axel...), so the right number of turns is known.
  - For the program: roughly when each jump happens and what it was. Then the search's 17 alarms can be scored properly: how many real jumps it found, how many it missed, how many alarms were false.
- Two fixes to the counting, run beside the old way on these clips and on the nine Commons clips: throw out impossible speeds, and find the takeoff and landing from the blade and free leg instead of "feet together, legs long".
- For each clip: its frame rate, the skater's share of the picture, turns against the known answer. No air time: that needs a still phone, and none of these clips has one. The card says it is not measured yet.
- Numbers only on the card. No picture, no name, no event: the clips show other skaters, and they stay on the Mac, never in Git or CI.
- A "Fourth round" table in `ROADMAP.md`, the professor's boxes ticked, a log entry, and the card updated with wording you approve.

**From you:** the jump names and the program's jump times above, by Wednesday 11-25. If you don't know a jump, say so, and that clip is scored as "unknown" (the body tracking and the skeleton are still reported).

**Later, when you can:** clips of your own jumps, filmed with the phone still on the boards, side-on, at 60 frames a second, HDR off. They are the only way to test air time, and the jump cards in phase 4 are drawn from them. Until then those parts say "not measured yet" and "animation not drawn yet".

**If the answers don't come in time:** the card still goes up by 11-29 with what is already known (the body found in 99% of frames, the skeleton on the skater in mid-air, 7 real jumps among 17 alarms in the program) and says honestly that the turn counts are not checked against known answers yet.

## Phase 1: the front door, rink schedules for anyone (Mon 11-23 to Wed 11-25)

**Progress, 2026-11-22:** the parts that need no accounts are built and tested on the branch `phase-1` (see `LOG.md`). Waiting on the owner: the Supabase and Vercel projects and keys; a Google Cloud API key restricted to the Calendar API (the route the owner chose); and a written yes from Kent Valley and from Bremerton, which Google's API terms require before their sessions are stored and shown. Scheduling note: Vercel's free plan runs a scheduled job at most once a day, so something else must call the job a few times a day, at varied minutes, never at midnight. Changed 2026-11-22, with secrets in Doppler: a scheduled GitHub Actions workflow calls it, because Doppler can sync the job's secret to GitHub, while Supabase's scheduler would need the secret copied by hand into Supabase's vault. GitHub's scheduled runs can start late at busy times, which does not matter a few times a day.

**Goal:** anyone with the link, on an iPhone, with no account, sees this week's sessions at the surveyed rinks on one page. Kent and Bremerton are read from their own calendars. Every session says where it came from and when it was last checked, with add-to-calendar and directions buttons. Underneath, the security groundwork is already in place.

- The app folder, laid out like MySkate, deployed to both addresses.
- The full content security policy written once: scripts only from our site and nothing inline; connections only to our site and the right Supabase project; video, pictures and workers only from our site or the phone itself; no other site may frame ours. HTTPS only. Camera and location only for our site; no microphone.
- The first tables (rinks, schedule sources, sessions, checks, off switches), every one starting from "nobody can read or write". A check in CI fails if any table has no rules, and the access tests start here (a stranger and another skater).
- CI holds only the testing project's key, in a protected environment, never runs on outside pull requests, and never prints its settings. Secret scanning runs on every push.
- The safe fetcher: HTTPS only, private networks refused, at most three redirects each checked again, a time limit and a size limit big enough for Bremerton's 5.6 MB calendar.
- MySkate's calendar reader moved to the server and fixed (past events dropped before counting). Bremerton's mixed calendar sorted, with rentals, practices and maintenance hidden.
- **Before the scheduled job is turned on:** read Kent's and Bremerton's site terms and Google's terms for public calendar addresses, and record the result. The job then reads only those addresses, on a schedule, through a function that refuses any caller without a secret kept in the services' settings (never in the repository). Its own off switch.
- The twelve surveyed rinks entered by hand.
- The week page, from MySkate's Ice times: filters, freestyle slots joined into blocks, My picks on the phone, the overlap warning, add to calendar, directions (no position read). A rink of your own kept on the phone, as in MySkate.
- A probe page that sends nothing anywhere and tests what an iPhone can do: a clip's real frame rate, keeping stored files, motion and location only after a tap, installing to the Home Screen (a minimal manifest), and whether speech recognition exists (only checks; it never starts listening).

**Done when:** the live address shows real Kent and Bremerton sessions on your iPhone; the job has run on its own twice; tests pass for a huge and a hostile calendar and for every refused address; writing to any table with the public key is refused; a table without rules makes CI fail; calling the job without its secret is refused.

## Phase 2: Jump Lab and the practice log on the phone, no account (Wed 11-25 to Sun 11-29)

**Goal:** without signing up, a skater picks a clip and gets a slow replay of themselves with the skeleton drawn over them. The clip check says whether the clip is good enough. They label the jump, pick the outcome, and save it to their history on the phone. They can log a practice session and tonight's plan. Nothing leaves the phone.

- **From you first:** a yes to shipping the body-tracking files in the app (until now only in the test), which also widens the security policy for WebAssembly, written down.
- Body tracking served from our site with a hash check. Clips and skeletons stored on the phone, with a request that the browser keep them.
- Clip checks: real frame rate (under 60 refused or marked rough, with the pop-up), the skater at least a quarter of the picture, still or followed, steady points.
- Tap yourself in the first frame. Slow replay, step frame by frame, skeleton on or off over the real skater.
- Air time as a range on propped clips only (none tested yet: see phase 0). The turn count as a range, labelled "likely, being tested". Height, landing checks, axis and corrections show "not measured yet". Jump Lab never calls "under-rotated" on its own.
- The jump label, the six outcomes, the skill's history, your best as a ghost, and a milestone card saved as a picture (no rink, time or username unless turned on; a reminder about people in the background).
- The practice log as in MySkate, no account: tonight's plan with targets, skill lists as data with a federation field, the safe spreadsheet export.
- The phase 0 answers run as a test of the app's counting code, locally only (it skips itself when the clips are missing). Only numbers, never clips or points, are ever committed, and only with your yes.

**Done when:** one of the clips you filmed from the stands replays on your iPhone with the skeleton on the skater in mid-air (on your phone only; the show uses a Commons clip, because the stands clips show other skaters); a 30-frame clip gets the pop-up; the network panel shows no video sent anywhere; a changed tracking file is refused; a milestone card saves to Photos; tracking speed on the iPhone is measured and logged.

## Phase 3: accounts, sync, check-in, the passport, the kiss and cry (Sun 11-29 to Wed 12-02)

**Goal:** a skater signs up by invite, answers the one age question, and finds their picks and log on every device. After skating they tap outcomes and the busy and ice report, and the kiss and cry reveals XP worked out by the server. Checking in at a rink earns a stamp that animates into a passport.

- Sign-in with every rule in `SECURITY.md` section 2, the age question (14 to 17, or 18 and over), and username rules enforced in the database.
- What syncs is an allowlist: labels, outcomes, picks, plan lines, and measurements as numbers. Clips, skeleton frames, milestone pictures and music live in separate stores the sync code cannot read, with a test that proves it.
- Things logged before signing up move in and earn nothing.
- Session reports, and "usually quiet" only once enough reports exist.
- XP, levels, badges, the level road, off-ice challenges and the weekly streak with freezes, all worked out in the database with a daily ceiling.
- Check-in: location asked only at the tap, a yes or no for "at this rink", no coordinates kept, check-in rows gone after a few hours (needs your yes to the check-in rule; default yes).
- A plain avatar that is not a photo (a coloured disc with your first letter), shown to you as a drawing first. The character replaces it later with no change to the data.
- The passport: a drawing for your approval first, then the stamp animation and tilt (motion asked only after a tap), with reduced-motion off states.
- The bell with an inbox, installable to the Home Screen, download everything, delete my account, and a plain privacy page.
- Sign-in emails: Supabase's own sender reaches only the project's team members, 2 an hour. That covers your own account; the made-up accounts are made by script and need no email. A real sender comes before anyone else is invited (phase 6's gate).
- **Your call:** whether the log fills itself in from the session you picked ("the log that is already written" is only Suggested). Default: the plain MySkate log.

## Phase 4: clubs, the coach, friends, jump cards (Wed 12-02 to Fri 12-04)

**Goal:** a club admin (approved by you) invites a coach and skaters. The coach, with two-step sign-in, sees only the lines each skater turned on, gives homework and cue cards, and can receive a clip a skater chose to send. Friends are added by exact username. Jump cards show each jump's defining moment and turn gold on the first landing.

- **Built first, before anything else in this phase:** block and report, their access tests, and an owner-only review page for reports and "seems under 14" (close the account or dismiss). Friends, online status and club lists stay behind a switch until those tests pass.
- Clubs with your approval, single-use invites, roles, and a history of every admin and coach action.
- The coach view exactly as decided, homework as lines in tonight's plan, cue cards with the coach's own words under limits.
- Sending a clip to your coach, with every rule in `SECURITY.md` section 7, behind its own switch. If its separate review is not clean by Friday 12-04, it stays off for the show.
- Friends by exact username, requests, "who may ask", a daily limit, under-18 requests only from clubmates and friends of friends.
- Jump cards for waltz jump, toe loop and Salchow, animated from your own clean jumps. A card without one says "animation not drawn yet"; no one else's jump is borrowed.
- Access tests for a clubmate, a friend, and a coach from another club, on every table and on clip storage.

## Phase 5: when the ice moves, and the show build (Fri 12-04 to Sun 12-06)

**Goal:** when a picked session moves, is cancelled, or a new one appears, the skater gets an alert saying where it came from: the rink's calendar, or a change one stamp holder suggested and another (or a coach) confirmed. The helper earns a Fresh Ice token. The whole show runs on the live staging site.

- Comparing every calendar read with skaters' picks. The calendar wins where there is one.
- Shared updates made only of choices, checked in the database, suggested by stamp holders, coaches and admins, confirmed by someone else, with history, undo, "This is wrong", limits, and an off switch. Until confirmed, a session shows "may have changed" and nothing is cancelled.
- Alerts in the bell, and as a push on an iPhone with the site on the Home Screen if the probe showed that works.
- The Fresh Ice token, all on the server.
- "Who is on the ice" as counts only, never names, until approved sharing exists in phase 6. Included in this phase's separate review.
- **Your call:** the private calendar address for your picks is only Suggested. Default: wait.
- Update the Portfolio card with the live address and progress by Friday 12-04 (a checkpoint week). Rehearse on Sunday 12-06. Screen recordings of the app only, never of dashboards or settings.

## Phase 6: after the show (Tue 12-08 to Sun 12-13)

**Goal:** the rest of the skater's week, the rink map on the testing project, and submission.

- Fixes from the show.
- The rink map with approved sharing, statuses from the menu (defaulting from tonight's plan), and every rule in `SECURITY.md` section 1. The drawn map needs your yes and an approved drawing; without them it is a plain list of rinks with counts. Separate review before anyone but you sees it.
- The music room: your own file kept on the phone, the countdown, marks, repeats, run counts, and slowing it down.
- The skate bench in full (sharpenings and who did them, hollow, heat-moulding, fit notes, hours and the reminder), aches and rest (with "show your coach" when the same one keeps coming up), warm-up, the punch card, the season sheet.
- The page reader built and tested on made-up pages shaped like the real ones. It reads no live site until that site's terms are read.
- **Your calls:** plan my week without AI, ahead of the bench and punch card (the Decided "build these three first" order), or keep this order? Do you want the AI explanation in Jump Lab at all, and how is AI paid for? Default: no AI before 12-13.
- **The gate:** a real restore tried, the bad-day plan written, alerts for spikes, logs cleared after 30 days, the privacy page checked by someone you name, and a real sender for sign-in emails. Only then do the coach and club people you know get invites. If it doesn't hold by 12-13, the trial waits and the card says so.
- The reflection in your words, and the card with the live link, before 11:59pm Sunday 12-13.

If earlier phases run late, phase 6 gives way in this order: the page reader, the skate bench extras, the music room. The map, behind its switch, stays.

## After 12-13

- The pond, the village, the character, the dress studio and the fun colours. All are Decided, and each needs an approved drawing first.
- Blade buddies, the album, sticker packs, tracings, buddy visits, postcards. They depend on the character and the pond.
- Club channels (the encryption choice is still open), the swap shelf (its picture handling needs its own review).
- The page reader on live sites; say it, don't type it; plan my week with AI; your patterns. They wait on terms, an iPhone voice test, and AI payment.
- Jump Lab's reach tier (axis, naming the jump, corrections), height, landing checks, and spins, once there are enough known answers.
- Spin, turn and Learn to Skate cards beyond the first three jumps.
- The off-ice log (a port of MySkate) and the off-ice studio (new camera code with its own review); watch your program; the program builder's base value; rink guides; the trip finder; the competition and test board.
- The coach board, cheers, lodge hosts, the show board, lessons that move with the ice.
- Quests and the club quest bar, Apple sign-in, rink-partnered stamps, the domain, and opening to skaters beyond the people you know.

## What is shown on 12-07

On your iPhone from the Home Screen, plus a second phone, on the staging site with made-up accounts: several rinks on one page read from their own calendars; one of your jumps replayed with the skeleton on you and honest numbers; signing in, logging a session, the kiss and cry, and a stamp landing in the passport; a coach seeing only what a skater shared; and a moved session reaching a phone with where the change came from.
