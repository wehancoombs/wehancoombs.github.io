# Progress log: wehancoombs.com

Plain-words record of where the website stands. Newest entries at the bottom.

## What the site is for

One clear site for three audiences:

1. **Schools** hiring an English Home Language teacher (FET Phase).
2. **Universities** hiring a philosophy lecturer (Plato, Neoplatonism, esotericism).
3. **Freelance clients** for tutoring, TEFL, editing and learning design.

Feel: warm, scholarly, uncluttered. Plain static files (HTML + CSS), hosted on GitHub Pages. Must work well on phones.

## How to preview and publish

- **Preview on your computer:** open the folder `wehan-site` in File Explorer and double-click `index.html`. It opens in your browser. Nothing goes online.
- **Publish:** only when you say yes. Pushing to GitHub updates the live site at https://wehancoombs.com within about a minute.
- **The CV PDFs** are built from the HTML files in the sibling folder `wehan-cvs/cv-bundle` (see its README). Edit there, re-render, then copy the PDFs into `wehan-site/cv/`.

---

## 2026-10-27 (morning, VS Code session): first version

**Done**
- Single-page site (`index.html`) in a dark navy palette with sections: About, Teaching, Academic, Freelance, CVs, Contact.
- Headshot (`headshot.jpg`) and three two-page CV PDFs in `cv/`.
- Pushed to GitHub. The site is **live** at https://wehancoombs.com.

**Not done**
- No PROGRESS.md or notes were kept.
- No separate research section (research was folded into "Academic").
- No clear "which of the three are you?" entry points.
- Dark palette reads more "tech" than "warm, scholarly".
- Phone layout works but the menu scrolls sideways; no favicon; no social-preview image.

---

## 2026-10-27 (evening, Claude Code session): redesign begins

**Done**
- Read all files, git history and the three CVs. Confirmed the live site matches the local files.
- Started this PROGRESS.md.
- Rebuilt `index.html` from scratch:
  - Warm cream palette with navy headings and an oxblood accent; EB Garamond for headings, Source Sans 3 for body text (same fonts as the CVs).
  - Hero with portrait, then three "doors": For schools / For universities / For students and clients. Each jumps to its section.
  - Sections: About (with an at-a-glance list), Teaching English, Lecturing philosophy, Research (interests, publications, theses, funding, selected papers, ORCID and ResearchGate), Tutoring/editing/learning design (with a "How it works" card), CVs, Contact.
  - Each audience section ends with a download button for its CV.
  - Phone layout: a Menu button that opens a list and closes again after a tap; everything stacks in one column; checked at 375 px wide with no sideways scrolling.
  - Favicon (a navy "W"), page title and social-preview tags so links shared on WhatsApp or LinkedIn show the headshot and a description.
- Previewed on a local server at http://localhost:8931 (desktop and phone widths). All CV PDFs and the headshot load.
- Committed locally.

- Added a dark / light toggle in the top bar. **Dark is the default** (warm charcoal, not blue-black); the toggle switches to the cream version, and the visitor's choice is remembered in their own browser. On phones the toggle shrinks to a sun or moon icon.
- Fixed a bug found while testing: the phone menu would not open because a script variable was called `top`, a name browsers reserve. Renamed it.
- Wehan said yes to publishing. Pushed to GitHub; the live site now shows the new design.

**Next**
- Live site is current. Future edits: change `index.html`, preview, commit, push.

---

## 2026-10-27 (late evening): from brochure to experience

Wehan asked for a bold, visual, interactive portfolio with very few words, that can be explored to reveal everything. Built, previewed on desktop and phone, committed. **Pushed since.**

**What the new front page is**
- `index.html` is now a seven-chapter experience. The old words-only page lives on as `profile.html` ("Full profile" in the top bar, "The long version, in words" at the bottom), so recruiters who want the prose still have it.
- Files: `index.html` (structure), `assets/style.css` (look), `assets/main.js` (behaviour). No libraries, no build step. Still plain static files for GitHub Pages.

**The chapters**
1. **Threshold.** A slowly turning wireframe Platonic solid (after Plato's *Timaeus*: fire, earth, air, water, the cosmos). Drag to turn, tap to change; it also changes by itself every nine seconds. Name, one line, and the word *αἴνιγμα* which explains itself on hover.
2. **Three paths.** Teach / Think / Make as three overlapping circles. Hover shows who each is for; click jumps to the chapter.
3. **Teach.** Counting numbers (95, 98, 7 weeks). "The arc of a lesson": a dot travels Known → Challenge → Own and the sentence changes with it; tap a node to jump. A shelf of three book spines (Macbeth, The Tempest, Poetry & grammar); tap one for where and when. Teaching CV seal.
4. **Think.** Counting numbers (15 years, 500+, 5 modules, 13 papers). A constellation of eleven research "stars" (Plato at the centre); hover lights the links, tap opens a short note with links to theses and articles. On phones the sky scrolls sideways and starts centred on Plato. Academic CV seal.
5. **Make.** Three tool cards (Tutor with a self-drawing quill, Edit with a typewriter that tightens sentences, Design with blocks that rearrange). Each opens to a short list. A working marking tool: three sliders, a gauge, a band. Freelance CV seal.
6. **So far.** A draggable timeline 2010 → 2026; tap a year for one sentence. Starts at 2026.
7. **Write.** Email, the three CV seals, links, and the link to the long version.

**Also**
- A background field of drifting stars joined by faint lines, tinted by the chapter you are in (gold, ember, lapis, verdigris). A soft lantern glow follows the mouse in dark mode.
- Chapter dots on the right edge; dark/light toggle kept, dark default.
- Everything works by keyboard and with reduced-motion settings (animations stop, content stays visible).
- Checked at desktop and at 375 px phone width; no sideways page scrolling; no console errors.

**Decisions**
- Words are kept to headings, one-line captions and numbers; detail is behind a tap. The full prose stays one click away on `profile.html`.
- Gold is the unifying colour; each path has its own hue (Teach ember, Think lapis, Make verdigris).
- Fonts unchanged (EB Garamond, Source Sans 3) so the site still matches the CVs.

**Next (at the time)**
- Wehan reviewed and asked for one overall change: see the next entry.

---

## 2026-10-28: one page, everything inside it

Wehan's brief: no separate "Full profile" page. Everything from it should be found by exploring the beautiful page, hidden until wanted, a couple of clicks away. A pop-out map. Real deliverables on show (a recorded class, study guides) without hurting the look.

**Done**
- `profile.html` is gone. All of its content, plus the whole teaching portfolio from the full resume (teaching philosophy, curriculum design, assessment, student support, evaluations, referees), now lives in 30 "sheets": panels that slide in from the right. Each has a title, the chapter colour, Previous/Next within its chapter, and a Map button. Escape or the × closes it. Opening a sheet puts `#s-name` in the address bar, so a sheet can be linked to directly (for example `wehancoombs.com/#s-courses`).
- **The map**: a "Map" button at the top left opens a drawer listing every sheet under its chapter (Begin, Teach, Think, Make, So far, Write), plus CV downloads and links. One click to open the map, one click to the thing. On phones it fills the screen.
- **Chapter index lines**: under each chapter heading, a short line of small labels (for example "Approach · Abbotts College · Hoërskool Garsfontein · Beyond the classroom") that open the sheets directly, so the map is never required.
- **Everything on the page now opens something**: the big numbers, the book spines ("More →"), the stars (each note now has "Go further →"), the tool cards, the years ("More →" under the caption), the footer motto (opens "Why I teach").
- **Deliverables, embedded**:
  - Think → "Watch me teach": the two recorded live online lectures from the resume (FIL110, 4 May 2021; FIL710, 21 February 2024), as tiles with a play button. The Google Drive player loads inside the tile when pressed.
  - Think → "Study guides I wrote": five document covers (FIL710/810, FIL710, FIL220, FIL110, FIL251). Tap one and the PDF opens inside a sheet, with a line about the course and an "Open in Google Drive" link.
  - "What students say": the ten-evaluation PDF embedded, the 4.81/5 rating, and a link to the peer evaluation report.
  - "The full resume": the Google Doc embedded in a sheet.
  - Make → "Things I have made": 5 study guides, 3 readers, 2 lectures, 1 marking tool, each opening the right place.
- Verified before building that all the Drive files and the resume doc open without sign-in and allow embedding on another site.
- Stylesheet and script links now carry `?v=3` so browsers fetch the new files after a change (bump the number when either file changes).

**Checked**
- Desktop (1280 wide) and phone (375 wide): map, sheets, study guide PDF inside a sheet, star notes, motto, Previous/Next, Escape, no sideways scrolling, no console errors.

**Decisions**
- Sheet content is written as plain HTML inside `index.html` under `<div id="library" hidden>`. To change a piece of text, edit it there.
- Order of Previous/Next follows the order of items in the map.
- The two lecture videos and the PDFs stay on Google Drive (already shared by Wehan for the resume); the site only embeds them. If sharing on Drive is ever switched off, the embeds go blank.
- Referees' names and emails are shown in the Referees sheet because they are already public in the CVs and the resume.

**Not done / ideas**
- Lesson plans and observation reports from the practicum exist on Drive but are not shared publicly and may contain learners' names, so they are not on the site.
- A photo of Wehan is still only used for link previews.
- Wehan reviewed it in the preview (after a hard refresh: the old preview server had let the browser cache yesterday's page) and said push. Pushed to GitHub on 2026-10-28; this is now the live site.
- The local preview server is now a tiny no-cache script in the ignored `.claude` folder, so a stale page cannot happen again. Start it from the site folder with `python -I .claude/serve.py 8931 .`
- Possible later additions: a short "Teaching portfolio" page or section with sample lesson plans; a proper 404 page; a dark-mode variant if wanted.

**Decisions**
- Keep the single-page layout (uncluttered; everything one scroll away) rather than many pages.
- Keep EB Garamond + Source Sans 3 so the site matches the CVs.
- Dark mode is the default, with a light toggle (Wehan's choice, 2026-10-27).
- Phone number stays off the public site (email and LinkedIn only) unless Wehan wants it on.
- Local preview uses port 8931 because port 8765 is taken by another app on this computer.
- A `.claude/` folder holds the preview-server settings for Claude Code; it is ignored by git and never goes online.

---

## 2026-10-28 (later): tweaks round one, and the CV routine

Wehan's list after the one-page version went live, all done:

**Teach**
- "10 weeks in charge of classes" (three at Garsfontein, seven at Abbotts).
- The shelf now has six spines: Macbeth, The Tempest, Poems, Grammar, a DVD-style case for Film study, and a slim Philosophy pamphlet. Tap Poems and five poem cards burst out of it (Too Many Words, The Clothes, For Oom Piet, The Herb Garden, The Poet); each opens its own sheet. The other spines show a one-line caption with an Open link.
- Every book sheet is written from the actual lesson plans in Drive (lessons 1 to 22 at Abbotts, 1 to 9 at Garsfontein), so they are different and specific: the blame vote and the empty chair for Banquo in Macbeth; the staged Act 3 of The Tempest with desks, fizzy sweets and thunder; conditionals and prepositions; FRAME and the two Miyazaki films; the philosophy enrichment unit (trolley problems, ask-me-anything, English as the meta-skill).
- Macbeth's sheet links to a real deliverable: `materials/macbeth-revision-sheet.pdf`, the one-page revision plan and quotation bank Wehan made for the Grade 10s (copied from Drive, 65 KB).

**Think**
- Stats are now: 15 years lecturing · 4,000+ students taught (an estimate, explained inside the Courses sheet: classes of 485 to 500 for first-years, about 300 for Philosophy of Medicine, 59 for The Good Life, from the evaluation PDF) · 5 self-designed modules · a five-star rating that fills to 4.81.
- The constellation has a label, "My research, star by star", and sits in a left column beside the two lecture tiles and the five study guides.

**Make**
- The "things I have made" numbers and the marking-tool demo are gone.
- Four service cards, each with three deliverable lines and a Request button that opens an email with the right questions already in it: Tutoring, Editing, Learning design, and new: Philosophical consulting (with its own sheet). The deliverable lines and the consulting text are drafted by Claude for Wehan to check.

**Elsewhere**
- Timeline: 2020 now reads "A paper on theurgy"; tapping any year opens a sheet (hover peeks at the caption); the "More" button is gone.
- The extra map buttons (Paths, Write, sheet footer) are gone; the Map lives top left only. The sheet footer now shows "n of m · chapter".
- Contact seals are coloured like their chapters (ember, lapis, verdigris) and the freelance seal says F.

**CVs**
- The three CVs now say "My website" instead of the address (sources in `../wehan-cvs/cv-bundle`, re-rendered with `render.py`, all pages overflow 0, copied into `cv/`). Note: on a printed copy the link text no longer shows the address; say the word to revert.
- **Standing routine:** whenever the CVs change, copy the three PDFs into the synced Google Drive folder `D:\Google Drive\WORK\xADMIN\CV` (Google Drive for Desktop syncs it), after copying the previous versions into its `2026 Archive` subfolder with a "(before <date>)" suffix. Done today; checksums match.

**Checked**
- Desktop (1280) and phone (375): shelf and poem burst, stars, think layout, services, year sheets, seals; no console errors; no sideways scroll. One thing to know: the app's phone emulation in the Browser pane reports a window wider than the page, which makes the pop-up sheet look cut off there; that is the test tool, not the site (the sheet is sized to the real screen on a phone).

**Pushed since.**

---

## 2026-10-28 (evening): tweaks round two

Wehan's second list, all done:

**Always on top**
- The three CVs and the full resume sit in the top bar beside the theme switch (T, Φ, F and ≡, coloured like their chapters). On screens narrower than 1100px they fold into a "CVs ▾" menu.

**Scrolling settles on a chapter**
- You scroll freely; when you stop, the page eases to the nearest place where one chapter fills the screen. Chapters taller than the screen (Teach, Think and Make on most laptops) scroll freely inside themselves, and the foot of the page is a resting place too. Done with a small script in main.js, not CSS scroll-snap, because the CSS version left gaps where the page could rest between two chapters.

**Start here (replaces "Choose yours")**
- A menu of five services, each with a Request button: Tutoring, Editing, Learning design, Philosophical counselling (new) and Philosophical consulting. Tapping a service name opens its sheet. Under the heading, a "Hiring instead?" line with the two CVs and "How working with me works".

**Request buttons that work for everyone**
- Every Request button now opens a sheet with the message already drafted (and editable), plus three ways to send it: "Send from my email app" (a mailto link), "Send from Gmail" (opens Gmail's compose window in a new tab) and "Copy the message". The old buttons were plain mailto links, which do nothing on a computer that has no mail app set up.
- A `BOOKING_URL` line near the request code in `assets/main.js`: paste a booking link there (a Google Calendar appointment schedule or Calendly) and every request sheet grows a "Book a call" button. Empty for now. No rates on the site yet.

**Teach**
- Film study corrected: the Grade 11s did the language of film and a pub quiz on shots (five classes); the Grade 10s did Spirited Away and Howl's Moving Castle with FRAME (three classes). The sheet, the shelf caption and the Abbotts sheet all say so.

**Think**
- "students taught" (no more "counted conservatively").
- The constellation runs the full width, relabelled "My research, constellated", with the stars laid out again for the wide band.
- Lectures and study guides share a row beneath it. The guides are bigger and pop out one after another as the row comes into view.

**Make**
- Six cards in three columns: the five services plus a "Working with me" card that carries the Freelance CV seal. Consulting now speaks to teams and organisations; counselling (new sheet) is one to one, and says plainly that it is not therapy. The counselling and consulting copy is drafted by Claude for Wehan to check.

**So far**
- Bug fixed: a real mouse click on a year did nothing, because the drag-to-scroll code grabbed the pointer on every press. Now a plain click opens the year and only an actual drag scrolls the strip.
- Workshops folded into the years they belong to: the 2017 Wits workshop and the 2024 publishing workshop with Prof Metz (the 2016 Aristotle Colloquium was already there).

**Write**
- A Copy button beside the address; "Request a service" opens a general request sheet. The map's "Email me" became "Write to me" and opens the same sheet.

**Checked**
- Desktop (1280) and phone (375): the top-bar CVs and the phone menu; scroll settling (five wheel ticks from the top land on Start here, a short scroll back returns, inside Teach it scrolls freely); the Start menu; request sheets on both sizes (the Gmail link is built correctly; copying falls back to the old method if the browser refuses); the film caption; the constellation; the guides; all six Make cards; a real click on 2024; the Write section; the top bar in light mode. No console errors, no sideways scroll.

**Pushed since.**

---

## 2026-10-28 (night): round three, pushed live

Wehan's third list, all done, and the first push since the one-page version went live (rounds one, two and three go up together).

**Header**
- The W monogram is now the headshot: 44px with a gold ring, 40px on a phone.
- A fifth link in the top bar, the new General CV (W). On a wide screen the bar reads CV · Teaching · Academic · Freelance · Resume; in the phone menu the full names come back.

**Think**
- The "4,000+ students" stat is now the student rating: **4.5 out of 5**, the plain average of the eight university courses that had a numerical evaluation, 2017 to 2026. Weighted by the number of respondents it is 4.3; both figures and the course-by-course list are in the "What students say" sheet. The star rating (4.81, the 2026 honours course) stays beside it.
- For next time, the per-course means in the evaluations PDF: 4.8 (FIL110 2017, 9 forms), 4.1 (FIL251 2018, 191), 4.6 (FIL110 2019, 147), 4.07 (FIL110 2020, 100 of 349), 4.35 (FIL110 2021, 272 of 485), 4.23 (FIL155 2023, 294 of 734), 4.71 (FIL220 2024, 7 of 59), 4.81 (FIL710/810 2026, 6 of 6).

**Voices (testimonials)**
- A rotating quotation under the index line of Teach, Think and Make, each chapter with its own set: a new one every eight seconds, dots to pick one, pauses on hover, "More →" opens the sheet. Sources: the student evaluations in Drive, Prof Emma Ruttkamp-Bloem's peer evaluation report (16 October 2026), and the two postdoc recommendation letters of 23 October 2026 by Prof John Finamore and Dr Mitchell-Ron Black, found in Drive and quoted, not linked. Students are quoted without names ("an honours student, 2024").
- A closing line from Prof Finamore in Write.
- New sheet "What colleagues say" (in the map and the Think index) with the longer passages, the PhD examiners' verdicts and the mentor teachers' marks. "What students say" rewritten: the average, the ratings course by course, seven student quotations, the evaluations document.

**General CV**
- New `general-cv.html` in `../wehan-cvs/cv-bundle`, warm charcoal and gold to match the site: profile, four skill groups, experience, highlights with Prof Ruttkamp-Bloem's line, publications, service, four referees. Rendered to `out/Wehan Coombs General CV.pdf`, copied to `cv/Wehan-Coombs-CV.pdf` and to the Drive CV folder as `Wehan Coombs General CV.pdf` (checksums match). Linked from the top bar, the map, the "Hiring instead?" line and a fourth seal in Write.
- `render.py` fix: its overflow check only looked inside each column and missed text spilling past the page edge, which is how the first draft of the general CV lost its last entries. It now measures the bottom of every block against the page. The three older CVs pass the stricter check as they are.

**Checked**
- Desktop (1280, 1180 and 1120 wide): the header fits with five pills; the voices in all three chapters; the stats; both new sheets; no console errors. Phone (375): the headshot, the CVs menu with full names, the voices inside the gutters, no sideways scroll. The Browser pane's phone screenshots were unreliable this time (it reported a 709px frame), so the phone checks were done by measuring the layout rather than by eye.

**Pushed live** on Wehan's instruction ("Then push all of it live").

---

## 2026-10-28 (late): round four

Wehan's fourth list, all done; committed and pushed live on 2026-10-28.

**Why the shapes and the Make animations were dead on the laptop**
- The site switched off every animation when the computer asked for "reduced motion", and Windows asks for that whenever Settings > Accessibility > Visual effects > Animation effects is off, which it often is on laptops. The Platonic solid then never turned, and the quill, typewriter, blocks and tetractys stood still. Now only the scroll settling and the fade-in reveals go instant in that mode; the gentle animations keep running. The solid's canvas also re-measures itself if its box changes.

**Scrolling**
- The settle-on-a-chapter behaviour is gentler: it waits 450ms after you stop and only pulls the page when a chapter edge is within 30% of the screen (was 160ms and 60%).

**Header and welcome**
- The headshot pops open to about 2.8 times its size on mouse-over (and keyboard focus) and shrinks back smoothly.
- A welcome card on the first visit of a browser session: the headshot, "Hello. I'm Wehan.", two lines on what the page is, and three buttons: Explore (close), What I offer (goes to Start here), Write to me (opens the request sheet). Escape, the backdrop and the × close it. It does not appear when a link opens a sheet directly (`#s-…`).

**PDFs** open in a new tab (every CV link, the Macbeth sheet, and anything added later, by a one-line script).

**Scaling to the screen** (Wehan: "pages seem a bit big for a standard screen")
- Headings, chapter padding, the hero solid, the stats, the service menu rows and the index lines now also scale with the height of the screen (vh), so Begin, Start here, So far and Write each fit a 1366×768 laptop screen. Teach, Think and Make are longer by nature and scroll inside themselves.

**AI, and counselling folded into consulting**
- New sheet "Teaching in the age of AI" (Teach and Think index lines, the map, the approach sheet): the argument from the UP postdoc proposal (Plato's Phaedrus on what cannot be automated), what it looks like in the classroom, the research project, and lines from Dr Black and Prof Finamore on it.
- Counselling is now the "for one person" option inside "Philosophical and AI consulting": one menu row in Start here, one card in Make (the working-with-me card now spans two columns), one sheet, one request kind. The map, the index lines and the working sheet follow.
- A new star in the constellation, "AI & the humanities", linked to Plato and to "A way of life". Two more Think voices on AI. Meta description updated.
- CVs: a line on teaching what cannot be automated (Teaching CV, with "AI-aware teaching and assessment" among the strengths), the current research direction (Academic CV, with "Socratic pedagogy in the age of AI" in the interests), a fourth service "Philosophical and AI consulting" plus a profile line (Freelance CV, tightened to fit), and a profile line (General CV). All four re-rendered with the stricter overflow check, copied into `cv/`, and into the Drive CV folder with the previous versions archived as "(before 2026-10-28 pm)".

**Think**
- The constellation (now 760×560, squarer) sits beside the two lecture tiles again; the study guides are folded into a bar underneath ("Study guides I wrote · Five of them, 2018 to 2026 ▾") that opens to the five cards.

**Checked**
- Laptop size (1366×768): welcome card, hero and Start here fit the screen, headshot pop, Think side by side, guides bar, Make cards, the AI and consulting sheets; no console errors. Phone (375): welcome card, Start here, Think stacked with the guides bar, no sideways scroll.

**Later the same night:** the welcome card now says "Hi, I’m Wehan.", and leaving it through "What I offer" no longer leaves the blurred backdrop behind (that route closed the card without clearing the scrim). Committed; pushed live on 2026-10-28 (night).

---

## 2026-10-29: round five, the compact chapters

Wehan: "are you sure you can't make Teach, Think and Make a bit more compact? ... Keep what's crucial on the screen, let the rest be discoverable. Ideally a normal monitor shouldn't need awkward scrolling within the sections."

- **Teach, Think and Make each fit one screen** now, measured at 1366x768 and 1920x1080 (every chapter is exactly the height of the screen at both sizes). The blurb lines are gone; the rotating testimonial sits under the chapter title instead. Stats and a small CV seal sit to the right of the title. Headings, the shelf, the arc, the constellation and the service cards all scale with the height of the screen.
- **Teach:** the arc and the shelf side by side, both shorter; the poem fan still bursts out of the shelf.
- **Think:** the constellation beside the two lecture tiles; the study-guides bar sits under the tiles and opens to three columns of cards. The "Students say" and "Colleagues say" entries are one "Testimonials" sheet (students with the ratings, then colleagues and referees, then the school mentors); the old links still open it.
- **Make:** four compact cards. Each shows its little animation; hover (or keyboard focus) swaps it for the three deliverables, and Details opens the sheet. On phones the deliverables are simply listed. The "working with me" card is gone (the sheet remains, in the index line); the Freelance seal sits beside the title.
- Start here and Write also tightened so they fit a 1080-tall monitor and a 768-tall laptop respectively (the Start heading was wrapping to four lines on a big monitor).
- Checked at 1366x768, 1920x1080 and 375 wide; no console errors. Committed; pushed live on 2026-10-28 (night).

**Later:** the 4.5 stat is gone from Think (the stars and the Testimonials sheet carry the ratings). Teach and Make now grow with the height of the screen: the shelf, the arc, the service cards and their visuals scale by a steeper rule than the screen itself, and on screens wider than 1700px the column widens to 1340px. Measured at 1366x768, 1920x1080 and 2560x1440: every chapter is exactly one screen tall. Committed; pushed live on 2026-10-28 (night).

---

## 2026-10-28 (evening): round six

Wehan's sixth list; committed and pushed live on 2026-10-28.

- **Start here is a landing page again.** Wehan: "Make and What do you need are entirely redundant." The four-service menu is gone; in its place three doors, Teach, Think and Make, each in its chapter's colour with a line on who it is for ("A teacher for your school", "A lecturer or a researcher", "A tutor, an editor, a designer, a consultant"), a sentence on what the chapter holds, and that chapter's CV as a pill. The row goes to the chapter. The left column keeps "What do you need?" with a new line and three skip-ahead links (General CV, Write to me, How working with me works). The services and their Request buttons live in Make only.
- **The glowing dot** in the middle of the ring behind the doors is gone; the slow dotted ring stays.
- **CV seals beside the numbers.** In Teach, Think and Make the mini seal sits in the same row as the stats (or the blurb, in Make), after a hairline, instead of under them.
- **So far:** 2020 is "A paper presented" and 2025 is "More papers".
- Assets at `?v=11`.

---

## 2026-10-28 (night): round seven

Wehan: "this seems basically perfect", three comments left. Committed; pushed live on 2026-10-28 (night).

- **The constellation breathes.** Its canvas is now wide and shallow (1040 by 450 instead of 760 by 560), the twelve stars are laid out across it, and the labels are a size up (22px, Plato 28px, in canvas units). At the same height on the page it now fills most of its column instead of a third of it; on tall monitors it fills the width.
- **Testimonials, one place each.** No quotation now rotates in more than one chapter. Teach has the classroom ones (the two practicum assessors, Prof Ruttkamp-Bloem on control of a class and on discipline, a first-year on attention); Think has the scholarly ones (her recommendation, Prof Finamore and the examiner on the thesis, Dr Black on the scholar and the seminars, three students on the lectures and the honours course); Make has the one-to-one ones (consultations and feedback, simplifying complex ideas, Dr Black on bringing out the best in people, Prof Ruttkamp-Bloem on availability and organisation). The two AI lines live in the AI sheet only; Prof Finamore's one line stays on Write. The Testimonials sheet keeps the full set, with the three student quotes from Make and the discipline line added so nothing is lost.
- **Stray sentences fixed.** The two "big red button" lines (enrichment lesson and the AI sheet) now say plainly that the closing debate was whether AI should be deleted forever; "Mastering English" no longer lists "solarpunk" and "cognitive anti-fragility" bare; the Macbeth line puts "in blood stepped in so far" in quotation marks; the shelf caption reads "The poems spine opens five" instead of "The poems open up". Everything else read through, chapter by chapter and sheet by sheet, and left as it was.
- Assets at `?v=12`.
- **Write is plainer.** The Finamore line under the contact links is gone; it rotates in Think instead (nine quotations there now). Assets at `?v=13`.

---

## 2026-10-29: mobile settling off, and "Contact"

- **No settling on phones and tablets.** The ease-to-the-nearest-chapter behaviour now stands down on touch screens and on any window up to 1024px wide; it fought the phone's own momentum scrolling. Desktops keep it.
- **"Contact" in the menus.** The chapter is called Contact in the side dots and in the Map; the heading on the page is still "Write to me." (Wehan: "in the menu it HAS to be called contact".)
- The phone preview inside the Claude app is not a faithful phone: it lays the page out as if the window were 769px wide and then shows only 375px of it, which leaves a blank strip on the right. Wehan's own phone fills the screen, which is the real test.
- Assets at `?v=14`. Pushed live on 2026-10-29.

---

## 2026-10-29 (afternoon): the imported list

Wehan's eleven-point list, imported from another chat. Pushed live on 2026-10-29, together with the CV repo.

- **Pop-ups fit a phone.** The real fault was not in the pop-ups. On phones the constellation (720px wide so it can scroll sideways) forced its grid column to 720px, the page became 768px wide, and the phone browser laid out every fixed layer (welcome card, sheets, top bar) at that width, hanging off the right edge. That was also the "blank strip on the right" of 2026-10-29 (morning), wrongly blamed on the preview. The stacked grids now use `minmax(0, 1fr)`, so a column can shrink below its content and the page is 390px wide on a 390px phone. On top of that: the welcome card has tighter padding, a smaller photo and three full-width buttons; close buttons are 44px on phones; long words wrap inside sheets; pictures and embeds never exceed the sheet. All 43 pop-ups were measured at 390px: none wider than the screen.
- **The scroll cue is an arrow.** The faint line at the foot of the first screen is now a small chevron that bobs gently, fixed at the bottom of the screen (centre on a desktop, bottom-right on a phone), and fades out once the visitor scrolls. It keeps still under reduced motion.
- **Shelf caption** reads "Each spine opens a lesson." The sentence about the poems spine is gone.
- **Tagline** unchanged; an HTML comment above it marks it as being rewritten.
- **CVs** (`../wehan-cvs/cv-bundle`, its own repo): no "Page 2" labels; the website row reads "Website: wehancoombs.com ↗", underlined in the accent colour and linked; all four re-rendered with `overflow: 0` on every page; copied into `cv/` and to Drive, old ones archived as "(before 2026-10-29)". The QR code was checked and left alone: it encodes the Full Resume link, the doc opens without a Google login, and it decodes from the PDFs rasterised at 96 and 150 dpi.
- **site-text.md** in the parent folder (`D:\Coding Projects\Personal Website\site-text.md`): every visible piece of text, page by page and pop-up by pop-up, for review in another chat. Made by a script, not by hand.
- Assets at `?v=15`.

---

## 2026-10-29 (evening): twelve wording changes

Find-and-replace edits from Wehan's text review in another chat, in `index.html` only. Pushed live on 2026-10-29.

- Tutoring and Editing "Why me" lines; the Consulting opener and its "For one person" paragraph rewritten.
- Teaching in the age of AI: the AI-in-class sentence and the assessment line.
- Grammar: a second-conditional bullet (the dictator-for-a-day decree) between the first and third.
- Philosophy for teenagers: the intro line and the "Ask me anything" ending.
- The Tempest Act 3 Scene 1 note; the Courses student count no longer says "honest".
- Link-preview description now reads "Philosopher working on Plato and esotericism".
- Not done: the Philosophy for teenagers header, because the text to find ("five classes · four lessons") is not on the page word for word; it reads "five classes · September 2026 · four lessons".
- `site-text.md` in the parent folder is now out of date for these lines.
- Later the same evening: the tagline on the first screen was rewritten ("I teach people to think for themselves…") and its TODO comment removed; site-text.md regenerated. Pushed live.
- And the Philosophy for teenagers header now reads "four lessons, taught to five classes" (change 8 done). Tagged as v1.0-stable: a known-good version to fall back to.

---

## 2026-11-04: round A of the pop-up redesign

Wehan found the pop-ups boring and text-heavy. Measured: 43 pop-ups, about 8,600 words, a 580px drawer on a laptop with nothing but text in it. A Red/Blue review settled the order: structure first, decoration later, and keep the Google Doc round trip. Pushed live on 2026-11-04.

- **A reading layer.** The five long pieces (Teaching philosophy, Curriculum and course development, Assessment practices, Student support, Testimonials) are marked `data-read` in the library. They open as a centred page (980px, full height, both sides bordered) instead of the right-hand drawer, with a bigger title, a larger first paragraph, serif section headings and a numbered contents line that jumps within the page. On a phone it fills the screen like before. Everything else is still a drawer.
- **Testimonials as cards.** Every quotation is a card in a grid (two columns on a laptop, one on a phone). The side notes that quoted people in passing (Prof Ruttkamp-Bloem's lecture observation, Dr Black's two remarks, the second examiner, the Abbotts mentor) are now cards of their own, with the attribution in the card. No words changed, no quotes dropped; Wehan will choose which to keep in the Google Doc.
- **Ratings as bars.** The eight student ratings draw a bar out of five, filled from the number already in the text (JavaScript sets a CSS variable; no HTML changed).
- The text exporter notes which pop-ups open as a full-page read. `site-text.md` regenerated; the Google Doc is left alone until Wehan's edits are in.
- Assets at `?v=16`. Checked at 1366 and 390 wide, dark and light, and the drawer-to-page switch via Next.

---

## 2026-11-04 (later): round B of the pop-up redesign

The drawer itself, reshaped. Pushed live on 2026-11-04.

- **Wider, roomier.** The drawer is 720px on a laptop (was 580px) with more padding; phones are unchanged.
- **Chips and a lede, added at open time.** When a pop-up opens, the script splits its date line (the italic line with middle dots) into small pills and makes the first plain paragraph a larger lede. The HTML is untouched, so the text export and the Google Doc see the same words as before.
- **Big figures** at the top of four pop-ups, every number taken from that pop-up's own text: Abbotts (95, 98, 7 weeks), Hoërskool Garsfontein (3 weeks, 2 poems, 8 hours), Courses designed (4,000+, 4, 1), Academic posts (2010, 500, 2024).
- **The board.** Six lesson pop-ups open with a blackboard panel showing the word the text says went on the board, or the method's name: XENIA (For Oom Piet), RESIDUE (The Herb Garden), POIESIS (The Poet), AMBITION → DECEPTION → GUILT (Macbeth), FRAME (Film study), and "If I were…", not "If I was…" (Grammar). The Tempest and Philosophy for teenagers have no board word in their text, so they have none.
- The exporter labels the figures and the board panels. Assets at `?v=17`. Checked at 1366 and 390 wide, dark and light.

---

## 2026-11-07: round C of the pop-up redesign, and the welcome card goes

Pushed live on 2026-11-07. Tagged v1.1-stable (the fallback version is now this one; v1.0-stable is the 29 October text-review version).

- **No more welcome card.** Wehan asked for it to go. The markup, its styles and its script are gone; the page opens straight on the first screen. (The text exporter no longer lists it.)
- **Covers from the PDFs.** The first page of each of the five study guides (fetched from the Drive links already on the site) and of the Macbeth revision sheet, rendered with PyMuPDF at 560px wide into `materials/covers/` (23 to 77 KB each). They appear on the guide cards on the Think shelf, as a row of five covers in the Study guides pop-up (replacing the plain list; the wording is unchanged), and as a thumbnail link to the PDF in the Macbeth pop-up.
- **Conference papers as a timeline.** Same twelve lines, now an ordered list down the years: a year in the margin (shown once per run, so 2025 appears once above its three papers), a rail with dots, the title in full and the venue in smaller grey type. The split happens at open time, like the chips; the HTML lines are untouched.
- **From the portfolio chat.** Wehan brought suggestions from the chat that built his PGCE portfolio (https://wehancoombs.com/ves310-portfolio/). Taken: the two sites now link (Teach chapter and the Abbotts pop-up point to the portfolio); the micro-lesson on adjectives for Grade 10 (10 min 53 s, hosted on the portfolio) plays inside the Teaching approach pop-up; the stat counters carry their real number in the HTML so search engines and readers without scripts see 95, not 0 (the script resets them to 0 only when it is about to count up); the year strip's hover caption no longer fires several swaps when the mouse crosses the strip quickly.
- Left alone, on purpose: the top bar's blur (small elements only), the brand image's empty alt (decorative, the name sits next to it), the shared `theme` key with the portfolio (same origin, and the same theme on both sites is a feature), print styles (the CVs are the printable things), and the quiz and icons (they live on the portfolio, which is now linked). The 22 quotes are Wehan's to cut in the Google Doc.
- Assets at `?v=18`. Checked at 1366 and 390 wide: no overflow, no console errors, the video loads (1280 by 720).

---

## 2026-11-07 (later): the funnel, push 2 of 3. The first screen is the funnel

A Red Team review of the site as a way to get hired and win clients (verdict: a beautiful proof annex, not yet a funnel) and a Blue Team plan settled three pushes: a counter first, then the first screen, then booking, form and rates. Push 1 waits for Wehan's GoatCounter code; this is push 2. Pushed live on 2026-11-07, with takes two and three, before the counter: Wehan chose to push.

- **The first screen.** Wehan's face, large, where the Platonic solid turned (the solid is now a 64px badge beside the riddle word, still draggable). Under the name and tagline, the three doors from the old "What do you need?" chapter, each with its "for you" line and two buttons: Teach (Teaching CV, Write to me), Think (Academic CV, ORCID), Make (Freelance CV, How it works; "Book a call" replaces How it works in push 3). About me, Qualifications and Why I teach sit under the face. The name is smaller in the hero so that everything fits a 1366 by 768 laptop without scrolling.
- **The Start chapter is gone.** Its doors moved up; its skip-ahead links already lived in Contact and Make. Five chapter dots remain: Begin, Teach, Think, Make, Contact.
- **So far is gone as a chapter.** Wehan found the strip unnecessary. Its thirteen years are now an "In brief" timeline at the foot of the About me pop-up, same words, year in the margin. The strip, its drag script, its year pop-ups, its dot and its Map group are removed.
- **Proof beside the asks.** Each Make card ends with a proof line under its Request button, from words already on the site: 98/100 and a first-year student's line (Tutoring); five guides, two readers, a course package and an honours student's line (Editing); 4.81 out of 5 and Prof Ruttkamp-Bloem's line (Learning design); fifteen years and Dr Black's line (Consulting). Wehan to confirm the picks.
- **Named clicks.** Every CV link, the three doors, ORCID and the request sends carry a name; a tiny `track()` reports them to GoatCounter once its script is on the page, and does nothing until then.
- **Take two, same day.** Wehan wanted the Platonic solid back at full size, so it is: the solid turns on the right as before. His face (150px, which the 300px headshot serves well) sits to the left of his name with a general Write to me button and the About me, Qualifications and Why I teach links under it. Write to me is no longer a Teach button; Teach has Teaching CV and Referees. Assets at `?v=20`.
- **Take three.** The face up to 210px on a laptop (150px on a phone). On tablets and phones the solid goes back above everything, as the first screen always had it, instead of dangling under the doors. The top-bar icon is a serif W in a circle again, since the face is on the first screen; its hover peek is gone. Assets at `?v=21`.
- **Still to come.** A larger photo would help at 210px, soft at this size, until Wehan sends the original or names one of the 2022 Drive photos. The exporter's JS constants (jstext.json) were trimmed by hand because the extractor script is gone. Assets at `?v=19`. Checked at 1366 and 390 wide: no overflow, no console errors.

---

## 2026-11-07 (evening): the funnel, pushes 1 and 3. A counter, a booking page, a form that leaves a trace, rates

Wehan set up the accounts in a Claude chat (the prompt pattern is now a standing rule) and brought back the details. Pushed live on 2026-11-07.

- **The counter (push 1).** GoatCounter, one script line before the closing body tag, code wehancoombs. The named clicks from push 2 now report to it: CV links, the doors, ORCID, the booking buttons and every request send. Dashboard: https://wehancoombs.goatcounter.com/
- **Booking.** A Google Calendar appointment schedule, Free 20-minute intro call, Tuesday to Thursday 09:00 to 12:00 and 14:00 to 16:00, Google Meet, no Google account needed. It lives in a new Make pop-up, Book a free intro call, with the calendar embedded and a link to the booking page. Buttons: the Make door (Book a call, replacing How it works), the Make index row, the Contact row, the Map, each request pop-up (Book a free intro call instead) and the Working with me list.
- **Send from here.** The request pop-ups gain an email field and a Send from here button that posts to Formspree (free tier, 50 a month, honeypot field against spam). The email-app, Gmail and copy buttons stay. A note under the form says Formspree stores messages abroad. Not yet tested with a real send; Wehan should send one after the push.
- **Rates and availability.** On each Make card and at the top of each service pop-up: tutoring from R350 an hour; editing from R0.30 a word or R450 an hour; learning design and consulting quoted per project after a free intro call; all with Taking new clients for 2027. Working with me has a Rates list.
- **Two tweaks after the push.** More air between the face and the Write to me button on the first screen. The booking calendar, a white Google page, has no dark setting of its own, so in dark mode its colours are inverted inside the frame (a CSS filter) and it sits dark in the dark drawer; in light mode it stays as Google made it. The filter inverted the small profile photo inside the frame too, so the real headshot is laid over that spot in dark mode; the frame is sized so that Google picks one layout per width (660px tall on a laptop, the two-column layout; 1130px on a phone, the stacked one) and needs no scrollbar of its own. The gap between the face and Write to me doubled twice. The overlay was then enlarged (42px on a laptop, 48px on a phone) so that it covers the spot with margin. Then nudged 4px to the right. Assets at `?v=26`. Pushed live on 2026-11-07.
- **Decided against.** No WhatsApp link and no phone number. The photo stays as it is; at 210px it holds.
- Assets at `?v=22`. Checked at 1366 and 390 wide: the calendar renders inside the pop-up, no overflow, no console errors.

---

## 2026-11-14: The Cabinet, push 1 of 3. Structure only

Wehan brought a three-push redesign brief from a chat. This push changes the structure and no wording. Built on the branch cabinet; the live site (main) is untouched and tagged before-cabinet (restore sentence: Restore the site to before-cabinet). Committed on cabinet, not published.

- **Links checked first.** Section links (#threshold, #teach, #think, #make, #write) are used only inside the site: the W in the top bar, the dots, the Map, the home doors and the scroll arrow. The four CVs, in source and PDF, link only to the home address. The portfolio has no links back. All five anchors are kept, and pop-up links (#s-name) still scroll to their section.
- **Cases.** A case (class cab) is a full-screen panel with one object, one title, one sentence and one way on. The home case: the dodecahedron, a small headshot beside the name, the tagline, the riddle word, three buttons (Teach, for schools; Think, for universities; Make, a tutor, an editor, a designer, a consultant) and a Write to me link that jumps to the Contact section. It fits without scrolling at 375 by 812 and 1280 by 800, headshot included. Teach, Think and Make each open with a case: the book spines (moved up whole, with their caption), the research constellation (moved up whole), and a plain dashed circle as a placeholder for Make. Each case has a More button that scrolls to the detail (new ids teach-detail, think-detail, make-detail). Cases follow the theme: near-black in dark mode, light in light mode.
- **Sentences in the cases.** Teach: the first sentence of the Teaching approach pop-up. Think: a sentence from the Teaching philosophy pop-up. Both are copies; the originals stay where they were. Make: the side note from the Make heading, moved.
- **Moved.** About me, Qualifications and Why I teach went from the home screen to the Contact section. The six small buttons on the home doors were dropped, as agreed; each exists elsewhere, except that the short label Book a call is gone (the booking buttons that remain say Book a free intro call and Book an intro call). The door labels A teacher for your school and A lecturer or a researcher were replaced by Wehan's labels.
- **Visible on load.** Removed: the fade-in on scroll (the reveal class and its script), the counters that counted up from 0, the star rating that filled on scroll, the pop-in of the study-guide cards, and the script that eased the page to the nearest full section.
- **Stars switch.** A button in the footer, Stars: on / off, hides the dots-and-lines canvas; on by default, remembered in the browser under the key stars, marked TEMPORARY in the HTML, CSS and script. The Think constellation is a separate drawing and stays.
- **Left for later pushes.** The detail under each case is as it was, so Teach has a gap where the spines were and Think shows only the lectures and guides. Old first-screen styles are still in the stylesheet, unused. The label More on the case buttons is new wording and wants Wehan's word.
- Assets at v=27. Checked at 375 by 812 and 1280 by 800, dark and light, stars on and off: no overflow, no console errors. A script compared every string with the live version; the differences are the ones listed here.

---

## 2026-11-14 (later): The Cabinet, take two. Cabinets side by side, not one long page

Wehan saw push 1 and called it worse: the brief had asked for one page with buttons that scroll down, and that is what it was, a longer scrolling page. What he wants is separate cabinets, with More sliding sideways. He also said to keep the stars permanently. Rebuilt on the branch cabinet; committed, not published.

- **A strip of eight panes.** The page itself no longer scrolls. The main element is a horizontal strip that snaps; each pane fills the screen. Order: home, Teach case, Teach detail, Think case, Think detail, Make case, Make detail, Write to me (with the footer inside it). A pane taller than the screen scrolls inside itself, which on a phone is every detail pane.
- **Getting about.** The three home buttons and Write to me slide to their cabinet. More slides one pane to the right, into the detail. A pager at the foot of the screen has Previous, the five chapter dots and Next; it replaces the dots on the right edge and the scroll-down arrow. Arrow keys and Page Up and Down work. A swipe works on touch screens because the strip is a native scroller. The mouse wheel scrolls inside a pane first, and at its top or foot turns to the next cabinet.
- **Addresses still work.** The five section ids are unchanged. An address ending in #teach, #think, #make or #write opens on that cabinet; a pop-up address such as #s-abbotts opens the pop-up over its cabinet; the Map, the W in the top bar and the dots all slide to the right pane.
- **Stars are permanent.** The footer switch, its script and its styles are gone, and so is the stars key.
- **More.** The case buttons now read More and an arrow to the right, the same words as the More button under the rotating quotations.
- Assets at v=28. Checked at 375 by 812 and 1280 by 800: the home case fits both without scrolling, headshot included; at 1280 by 800 all eight panes fit one screen; no sideways overflow, no console errors.

---

## 2026-11-14 (evening): The Cabinet, take three. A vertical stack, with details from the right

Wehan's correction to take two: the main cabinets should switch vertically, one per screen, and a detail should come in from the right when More is pressed. Rebuilt on the branch cabinet; committed, not published. This replaces the sideways strip of take two.

- **The stack.** The page itself does not scroll. The main element is a vertical stack of five full-screen cabinets that snaps: home, Teach, Think, Make, Write to me (with the footer inside it). The mouse wheel turns one cabinet per turn; a swipe does the same on a touch screen; Arrow Up and Down and Page Up and Down work. A pager on the right edge has Previous, the five chapter dots and Next.
- **The side rooms.** The three details moved out of the stack and sit after the main element as fixed panes with the class detail. More slides the stack away to the left and the detail in from the right. Each detail starts with a back button (an arrow and the chapter name); Escape, Arrow Left and, on a touch screen, a swipe from left to right also go back. Arrow Right on a cabinet opens its detail. A detail taller than the screen scrolls inside itself.
- **Addresses.** #threshold, #teach, #think, #make and #write open on that cabinet; #teach-detail, #think-detail and #make-detail open that side room; pop-up addresses such as #s-abbotts open the pop-up over its cabinet. The Map, the W in the top bar and the dots all work, and choosing another chapter closes an open side room.
- **Still to do, by Wehan's own word.** The detail pages are messy: they hold what was left when the spines and the constellation moved up into the cabinets. He is taking their design to a chat and will bring back a brief.
- Assets at v=29. Checked at 375 by 812 and 1280 by 800: the home cabinet fits both without scrolling, headshot included; all five cabinets fit one screen on a laptop; no sideways overflow, no console errors.

---

## 2026-11-14 (night): The detail pages, tidied

Brief from Wehan's chat. The structure is untouched (vertical stack, details from the right). The version before this is tagged before-details, on this PC only (restore sentence: Restore the site to before-details). Committed on the branch cabinet, not published.

- **Teach.** The cabinet's object is now The arc of a lesson, drawn large; the six spines moved to the detail. Detail, two columns on a laptop: spines with their label and caption (top left); the three figures in one row, then the rotating quotation (top right); Where I taught: Abbotts College, Hoërskool Garsfontein (lower left); How I work: Approach, Beyond the classroom, In the age of AI, How I plan a lesson, My PGCE portfolio (lower right); the Teaching CV seal, larger, last.
- **Think.** Watch me teach with the two lectures side by side, larger (top left); 15, 5 and 4.81 as three figures in one row, the star icons removed, then the quotation with More and Testimonials beside it (top right); Study guides I wrote as a shelf of five short spines, each opening its guide's pop-up, the label opening the Study guides pop-up (lower left); Teaching: Courses, Lectures, Teaching philosophy; Research: Research, Papers, Posts, The age of AI (lower right); the Academic CV seal, larger, last.
- **Make.** One line, Taking new clients for 2027; four slim cards in one row, each with its name (now a button that opens the service's pop-up), its rate, Request and Details; the quotation (bottom left); Book a free intro call as the one large button, with Working with me beside it and a smaller Freelance CV seal (bottom right). The dashed circle on the Make cabinet is left alone.
- **Where text moved.** From each service card into that service's pop-up, under its rate line: the small animation, the sub-line (for example English, Philosophy, TEFL), the three short points and the proof line. The typewriter and the blocks are driven by script, so the script now writes to every copy on the page and lays out the blocks when a pop-up opens. The two links under the arc (How I plan a lesson, My PGCE portfolio) went to How I work. The guide codes and years (FIL710 · 810, 2026 and so on) are now each spine's tooltip; the same facts are in the Study guides pop-up and each guide's own pop-up. The five cover images left the detail page; they were already in the Study guides pop-up.
- **Dropped as separate items, as the brief asked.** The Study guides link in Think; the Tutoring & TEFL, Editing, Learning design and AI & philosophical consulting links in Make (the card names open the same pop-ups); the fold-out arrow on the study guides.
- **New words, as allowed.** Where I taught, How I work, Teaching, Research.
- **Fit.** At 1280 by 800 all three details fit one screen with room to spare. Quotations on a laptop: all five in Teach are one or two lines; in Think two of nine run to three lines; in Make one of five does. On a phone the quotations are three or four lines. Tapping the Poems spine opens a fan of five cards, which makes the Teach detail taller than a laptop screen until another spine is tapped.
- Assets at v=30. Checked at 375 by 812 and 1280 by 800: no sideways overflow, no console errors; rates, booking link, form, counter, the four CVs and the CV menu unchanged.

---

## 2026-11-14 (late): Write to me tidied, the PGCE portfolio unlinked, and The Cabinet is published

Wehan's three instructions: Write to me is still messy; unlink the PGCE portfolio; then publish.

- **Write to me.** Same form as the other cabinets. Left: Contact, the title, the email address with Copy, and two buttons (Request a service, solid; Book an intro call, outline). Right: the four CV seals in a two-by-two grid, then one row of links (About me, Qualifications, Why I teach, Referees, The full resume), then LinkedIn, ORCID, ResearchGate and the full resume in Google Docs. The footer sits at the foot of the cabinet. It fits one screen at 1280 by 800 and at 375 by 812. No wording changed.
- **PGCE portfolio.** Both links to it are gone: the one under How I work in the Teach detail and the one at the foot of the Abbotts College pop-up. Still there, flagged to Wehan: the micro-lesson video in the Teaching approach pop-up plays from the portfolio's address, and its caption ends with the words from my PGCE portfolio.
- **Published.** The branch cabinet was merged into main and pushed on 2026-11-14, with the tags before-cabinet and before-details. Assets at v=31.
- **Next.** The Make cabinet still shows a dashed circle. The plan put to Wehan is a maker's desk: the four small drawings that used to sit on the service cards (quill, typewriter line, blocks, tetractys) set out on a desk, each opening its service.

---

## 2026-11-14 (last): video out, animations back on the Make cards

On main, committed, not pushed. The micro-lesson video and its caption are removed from the Teaching approach pop-up, so nothing on the site points at or plays from the PGCE portfolio any more. The four service animations (quill, typewriter line, blocks, ten dots) are back on the Make detail cards at Wehan's request; the service pop-ups keep the sub-line, the three points and the proof line. Assets at v=32. Wehan wants an interactive 3D object on the Make cabinet; which object is still open.

---

## 2026-11-14 (stopgap): a tetraktys on the Make cabinet, and card animations only on mouseover

Pushed live on 2026-11-14, straight to main, at Wehan's request, so that the live Make cabinet is not an empty dashed circle while the 3D desk is being built on the branch desk.

- **Tetraktys.** A canvas (id tetra) drawn by main.js with no library: the four corners of a tetrahedron and the middle of each of its six edges, ten points in layers of one, three and six, joined to their neighbours, in the Make colour. It turns slowly, a drag turns it, the left and right arrow keys turn it when it has focus, and vertical swipes still change cabinet. It will be replaced by the desk.
- **Make cards.** The quill, the typewriter line, the blocks and the ten dots now move only while the pointer is over their card or focus is inside it. At rest the quill is fully drawn, the typewriter shows To write well, read closely., the blocks hold their first layout and the dots are still.
- Assets at v=33.

---

## 2026-11-14 (night): the maker's shapes on the Make cabinet (step 1 of 3)

Committed on main, not pushed. Wehan liked the stopgap tetraktys and dropped the three.js desk (parked as a WIP commit on the branch desk; do not merge). The Make cabinet now carries one canvas object in the style of the home dodecahedron that morphs through four wireframes, one per service, with a title under it: Tutoring, a quill; Editing, the words of the first editing sentence drifting in a cloud, then the kept words gathering into the shorter sentence; Learning design, the four stages of the lesson on The Poet as blocks as long as their minutes, a row that reassembles into a staircase and back (it sways instead of spinning, so its names stay readable); Philosophical and AI consulting, the tetraktys with single points lighting and dimming. A drag turns it, a tap or Enter changes it, left alone it moves on every 13 seconds, and the title is a button that opens that service. With reduced motion the shapes hold still and change at once. New words under the object: Quill, Words, Lesson stages, Tetraktys, and the names and minutes of the four stages (from the portfolio). Assets at v=34.

Next, steps 2 and 3: the portfolio's lesson layout (badges, hook question, lesson-at-a-glance bar, download cards, reflection) for the lesson pop-ups, using the lesson plans in Drive under PGCE, WIL; then the header, badges and cards across the other pop-ups.

---

## 2026-11-14 (late night): the lesson at a glance (step 2 of 3, the two lessons with data)

Committed on main, not pushed. The Macbeth and The Poet pop-ups gain the portfolio's lesson-at-a-glance bar: four stages as wide as their minutes; tapping a stage shows its description; under it, one line of reflection. Every word is from the PGCE portfolio's two lesson pop-outs (The Poet: Hook 5, Device hunt 10, Poiesis 15, The dilemma 15; Macbeth: Hook 10, Ambition 10, The blame debate 20, PEEL 5). The script initStages runs when a pop-up opens. Assets at v=35.

The lesson plans in Drive (WORK, 0 - PGCE and TEACHING, Archive, WIL: 9 plans from Garsfontein, 22 from Abbotts, as filled-in PDF forms) record an introduction, a body and a consolidation for each lesson, and a 45-minute duration, but no minutes per stage and no stage names. So the timed bar exists only for the two lessons the portfolio already broke down. For The Tempest, For Oom Piet, The Herb Garden, Grammar, Film study and Philosophy for teenagers the choice is Wehan's: give stage names and minutes, or accept a three-part bar (Introduction, Body, Consolidation) in the plans' own words with no minutes.

Portfolio patterns still to carry over (step 3): a tinted header with a large faint icon per pop-up, download cards, a colour per lesson.

---

## 2026-11-15: timed bars for eight more lessons, from the WIL lesson plans

Steps 1 and 2 (the maker's shapes; the bars for Macbeth and The Poet) were pushed live on 2026-11-14. This entry was pushed live on Wehan's "Publish" (v=36, checked on the live site: ten lesson bars).

Wehan said the times are in the lesson plan form answers, and they are. The plans are flattened PDF forms; what he typed is 12pt Arial, and each plan has four timed stages named by the form: Hook, Introduction, Body, Consolidation. A script (scratchpad, lessonplans/extract.py) reads them by position. All 31 plans have times; one has no consolidation time.

The lesson at a glance now also appears in eight pop-ups, each for one lesson, with the date under the heading:

- The Tempest: Abbotts plan 18, Act 3 Scene 3, 4 September 2026 (5, 5, 25, 5)
- Too Many Words: Garsfontein plan 2, 11 May 2026 (5, 5, 15, 5)
- The Clothes: Garsfontein plan 7, 18 May 2026 (5, 5, 15, 5)
- For Oom Piet: Abbotts plan 2, 30 July 2026 (5, 10, 25, 5)
- The Herb Garden: Abbotts plan 5, 6 August 2026 (5, 10, 20, 5)
- Grammar: Garsfontein plan 1, conditionals, 11 May 2026 (5, 10, 15, 5)
- Film study: Abbotts plan 9, Spirited Away and FRAME, 20 August 2026 (15, 5, 20, 5)
- Philosophy for teenagers: Abbotts plan 13, 31 August 2026 (5, 10, 20, 5)

Each stage's description is what Wehan wrote in that part of the plan (the teacher's column; the SMART task notes are left out). Only spelling slips and quotation marks were tidied; nothing was reworded, so the register is that of a lesson plan and the tense varies. One fix: in the Grammar plan two form lines overlap, and a stray tail was removed from the Hook. The stage names for these eight are the form's four; Macbeth and The Poet keep the portfolio's own names. Each stage in a bar is now at least as wide as its name. Assets at v=36.

## 2026-11-15: the portfolio's pop-out look on every pop-up (step 3), and the maker's shapes, second pass

Pushed live on his "Publish" (v=38, checked on the live site). The tag `before-popouts` (also on GitHub) marks the version before both changes.

**Pop-ups.** Every pop-up now has the PGCE portfolio's header: a tint of the chapter colour and a large faint drawing (a crown for Macbeth, a ship for The Tempest, a leaf for The Herb Garden, and so on; 44 pop-ups, named by `data-art` on each `article`, drawings in `ART` in main.js; request and star pop-ups get an envelope and a star). Each lesson and each study guide has its own colour (`data-tone`, matching its spine on the shelf), which also colours its lesson bar. The date chips are tinted. Links that leave a pop-up (the Macbeth revision sheet, the study guides, the lectures, the evaluations, the full resume) are drawn as cards by `dressSheet` when the pop-up opens, in the link's own words. No wording was changed.

**The maker's shapes.** At Wehan's request: the whole object is larger (canvas up to 540px, shapes drawn at 0.4 of it) with a soft breathing glow behind it like the solid on the first screen; the quill now stands in an inkpot; the lesson is a puzzle box of four layers (Hook 5, Introduction 10, Body 20, Consolidation 5: the stage names of his lesson plans and the minutes of a 40-minute lesson), with each name on all four sides of its layer; the layers twist a quarter turn one after another, slide apart like drawers and close. "Poiesis" is gone from it. Words no longer stutter: every word is drawn once onto its own small canvas and placed as a picture, which glides between pixels where type stepped; "to" now fades into "To" instead of switching.

Not done: the caption under the quill still says "Quill" (no wording changed without his say).

## 2026-11-15: two quills instead of the quill and inkpot

Pushed live on his "Publish" (v=39, checked on the live site). The tag `before-quills` (also on GitHub) marks the version before.

Wehan found the quill "a bit off" and was not happy with the inkpot. The Tutoring shape is now a larger and a smaller quill writing together: both nibs go round a flat page in curls (about fourteen seconds a turn), each quill trailing behind its nib and rocking with every curl, each leaving a line of ink that fades; the smaller follows half a turn behind and writes over the same line as the larger one's ink fades. One quill is defined once (`QUILL`, nib at the origin) and placed twice by `quill(t)`. The caption under it changed from "Quill" to "Quills" (the one wording change, flagged to him).

## 2026-11-15: the Counsel direction tried and dropped; the site stays at stable-simple

Wehan briefed a sixth cabinet, Counsel, with the services re-sorted (Tutoring under Teach, Lesson plans under Make, consulting under Counsel). It was built and reviewed locally, never pushed. After two looks he decided against the direction and asked to go back to `stable-simple` (26f35a5, the five-cabinet site), bringing over only general upgrades that make sense.

- `main` was reset to `stable-simple`. The whole Counsel build is kept on the local branch `counsel-abandoned` (three commits), in case any of it is wanted later: the `makeStage` wireframe factory, a scene inside a pop-up, the gold 3D tetraktys with a 1s-and-0s state, the Counsel detail cards, the Amethyst colour. Tags `stable-simple` and `before-counsel` are on GitHub and point at the same commit.
- One general upgrade came over, pushed live on his "Publish" (v=40, checked on the live site): the Make object now starts its thirteen-second wait when the cabinet comes into view, so it no longer changes shape the moment you arrive.
- Not brought over, because each only made sense with Counsel: the fourth home button, the Tutoring row, the three-card Make detail, the pop-up chapter moves, the booking pop-up taking another cabinet's colour.
- `../site-text.md` has the Counsel material removed; its Teach and Make sections were rewritten by hand to match the site as it is.

What he said along the way, worth remembering: a detail page that is a list of text is "terrible, boring"; he wants them visual and alive. The tetraktys he likes is the 3D one.

## 2026-11-15: the services rebuild, started (branch `services`, nothing live)

Wehan briefed a rebuild as a plain services site: who he is, what he sells, what it costs, how to book. First screen: his name and one-sentence description, a line drawing of him pointing at a board of three columns (Teach, Design, Consult); About below it; contact as a slim bar fixed to the bottom of every screen. Light and dark follow the visitor's system setting.

- The live site is tagged `before-services` (f07bae5, on GitHub). To go back he says: "Restore the site to before-services".
- All new work is on the local branch `services`. `main` and the live site are untouched until he says "publish".
- His drawing is saved as supplied at `assets/wehan-drawing.webp` (1024 x 1536, black lines on white). A see-through version that takes the text colour is still to be made from it.
- The list of pieces worth keeping and a short plan were given to him, and he said go ahead with three changes (below).

## 2026-11-15: the services site built on `services` (v=41, not pushed, waiting for "publish")

His three changes to the plan: Classes gets its own small pop-up (the placeholder line, then links to the six lessons); Lectures opens "Courses designed and taught", with the two recorded lectures added to that pop-up; the pop-up links from the old Map menu sit in About under a few short headings.

What the page is now:

- It scrolls. The cabinets, the side rooms, the Map menu and the side dots are gone. The top bar is the name, the CV menu and the light/dark switch.
- First screen: his name and sentence, the line drawing, and the board (Teach, Design, Consult). Each item has a name, one line, a rate and a Details link. From 1100px wide and narrower the board is three tabs under a small drawing, Teach open.
- The drawing: `assets/wehan-line.webp` is made from his `assets/wehan-drawing.webp` (white made see-through, cropped). It is used as a CSS mask, so the lines take the text colour. It fades in on the first visit only (a `seen` flag in the browser's storage).
- The board's sizes hang off one unit (`--u`, the tighter of the screen's width and height), so the first screen fits from 1366 x 650 up to 1920 x 1080 without scrolling.
- About: headshot, the six figures, the constellation, the two lectures, the study guide spines, the lesson spines, the arc of a lesson, three sets of quotations, the four CVs, the placeholder line, the grouped links, the outside links, the motto.
- The constellation has a second, tall layout for phones (640px and narrower): all twelve stars and names fit, checked by measuring that no two names touch.
- Contact: a bar fixed to the bottom (booking button, email with Copy, "Write to me"); on screens 760px and narrower it is one button. "Write to me" opens a small panel holding the existing form. Booking link, form address and visit counter are unchanged.
- Light and dark follow the system setting until the switch is used; the switch is remembered. Dark keeps near-black and gold with a slate board; light is warm paper with a white board.
- Old addresses: `#teach`, `#make` (and `#make-detail`) go to the board, `#think` (and both other `-detail` addresses) go to About, `#write` opens the contact panel, `#s-…` still opens that pop-up.
- `?plain` on the address hides the three small heading animations, so that he can compare. Take it out once he has chosen.

Nine placeholder lines are tagged `DRAFT-WEHAN` in `index.html` and listed at the top of `../site-text.md`.

How it was built: `build_services.py` (in the session scratchpad) rebuilds `index.html`, `assets/main.js` and `assets/style.css` from the tag `before-services`, so nothing depends on hand edits. `style.css` still carries the old cabinet and room rules that nothing uses now; they can be pruned later. Preview pictures are in `.claude/services-preview/`, made by `.claude/shot.html` and headless Chrome.

Left off the page (all still in the tag `before-services`): the Platonic solids, the four Make shapes at full size (only the tetraktys survives, small), the four Make card drawings, the star background and the glow that follows the mouse, the Map menu's opening line, the side dots, the three cabinet sentences (Teach, Think, Make), "Taking new clients for 2027" as a line on the page (it is still in every service pop-up), the Request buttons on the cards (still inside each service pop-up), "How I plan a lesson →" (a second label for the Teaching approach pop-up).

Known rough edges: the small label at the top of each pop-up still says Begin, Teach, Think, Make or Contact; "Working with me" still says "Press a Request button anywhere on this page"; the tab title still reads "Teacher, philosopher, maker".

## 2026-11-15, later: the scrolling services page turned down; three cabinets in the earlier look (v=42, not pushed)

Wehan looked at the scrolling services page and said no: go back to the earlier look (starry background, cabinets), with three cabinets, the Map menu back, and a note that the sketch needs a proper white-on-black version for dark mode.

What the site is now (built by `build_cabinets.py` in the session scratchpad, again from the tag `before-services`; the styles are the old file plus one new block at the end):

- Cabinet 1, the landing page (`#threshold`): as it was, Platonic solids and all. The three doors are now two buttons down, My services and About me.
- Cabinet 2, My services (`#services`): a plain near-black board with a hairline round it and three tabs (Teach, Design, Consult). The list of services is on the board's far left; the turning shapes from the old Make cabinet are in the middle (Teach: the quills and the words; Design: the lesson stages; Consult: the tetraktys). The sketch stands bottom right, mirrored so that it points left at the shape. Details folds the list into a chevron and lays the details over the dimmed shape; the chevron, the cross or Escape brings the list back. On a narrow screen the shape and the sketch sit above the list and the chevron is at the bottom.
- Cabinet 3, About me (`#about`): headshot, title, the placeholder line, the four CVs and the old Contact links on the left; a second board with the same three tabs on the right. Teach: the two lectures, the six figures, the lesson spines, a quotation. Design: the study guide spines, the arc of a lesson, a quotation, four links. Consult: the constellation, a quotation, four links. This is a first take; he wants to talk it over (tabs, or dots to swipe between sections).
- The Map menu is back, adjusted: Begin, My services, About me for schools, About me for universities, Contact. The label at the top of each pop-up follows it (My services, For schools, For universities).
- Contact is still the bar fixed to the bottom, with the small panel for the form. `#write` opens the panel.
- Light and dark still follow the system setting until the switch is used.
- Old addresses: `#teach`, `#make` go to My services; `#think` and the old `-detail` addresses go to About me.
- A change of shape now takes the same time whatever the screen's frame rate.

To do, from him: a white-on-black version of the drawing for dark mode (the present one is the black drawing painted light, which reads as a negative). It is in his Todoist under Personal website. When he has it: save as `assets/wehan-drawing-dark.webp` and use it under dark mode only.

Pictures: `.claude/services-preview/`. The window-less Chrome used for them does not advance the shapes at laptop size, so the Design and Consult tab pictures at laptop size were taken from the preview pane.

Not on the page any more: the three old cabinet sentences (Teach, Think, Make), the four Make card drawings, the old Write to me cabinet (its parts are in About me and the bar).

## 2026-11-15, evening: his rounds on the three cabinets (v=51 on `services`, on the staging site, not live)

Staging: he asked for a separate live site to test on his phone. It is https://wehancoombs.com/site-preview/ (repo `wehancoombs/site-preview`, remote `preview`). After every change: copy `services` to a `preview` branch, add a noindex meta and take out the visit counter, force-push to `preview:main`. He said to treat it as the staging platform, so refresh it without asking. The live site still needs "publish".

What changed, at his word:

- Landing page: the "Write to me" link is gone (the bar has it). The small word under the sentence changes each time the solid changes: ainigma, then nous, psyche, aporia, sympaideia (his own word, rendered συμπαιδεία), maat (a feather hieroglyph), jñāna, ḥokhmah, schola, dào, ubuntu, each with one line. The ten new lines are drafts, marked DRAFT-WEHAN in `main.js`.
- My services: every item has its own object, named for the item. Teach: quills (Tutoring), words (Writing), a ring of seats (Classes), a raked hall (Lectures). Design: lesson stages (A lesson), a shelf of boxes (A module), a spiral stair (A curriculum). Consult: linked centres that gather into one sphere (A person), the tetraktys, which flickers to ones and noughts now and then (A school), a star tetrahedron with nodes all along its edges (A university). Pointing at an item brings up its object; a tap steps through the tab's objects.
- Details: each of the ten items opens its own short card over the board (the object is hidden while it is open): a drawing in a ring, the name, the rate as a tag, a few lines or a paragraph, one whole testimonial, then Request / Book a free intro call / More. Classes shows the lesson bookshelf; Lectures shows the two recordings side by side and the study-guide bookshelf; A lesson shows the arc of a lesson. All the words are lifted from the pop-ups and the quotations; the table that says what goes where is `DETAILS` in `main.js`.
- About me: slimmed to one screen so that it does not repeat the details. Left: headshot, title, the placeholder line, four CVs, bio links. Right: the six figures, the constellation, five links. The shelves, recordings and arc sit in a hidden `#stash` and are borrowed by the details cards.

Tried and taken out again: ten old words on the tetraktys points.

Still open: the white-on-black drawing (his Todoist); nine placeholder lines plus the ten word lines; `../site-text.md` describes the site as it was before this evening's rounds and needs redoing once the design settles; nothing here has been seen on a real phone by me.

## 2026-11-15, late: three colours, four boxes, one CVs menu (v=52 on `services`, on the staging site, not live)

- Colours, at his word: Teach green, Design orange, Consult purple (`--c-teach`, `--c-design`, `--c-consult` in `style.css`, a dark and a light value each). The open tab colours the board, its object, the details card, and the whole services cabinet with it (stars, contact bar, the W). The pop-ups and the CV seals keep the older colours (schools terracotta, universities blue, services teal).
- Landing page: four boxes, two by two: Teach, Design, Consult (each in its colour, each opening My services on that tab) and About me (gold). `#design` and `#consult` are new addresses beside `#teach`.
- Top bar: the CVs are one dropdown at every width (it used to fold only under 1100px).
- About me on a phone: one column in the order headshot, figures, CVs, links, motto, and then the constellation with a view to itself and the five research links under it. Nothing sits under the contact bar at 375x812.
- "Edit" taken out of his own words, since he has no editing experience: the landing sentence now says "writing support" (his own phrase, from "Editing and writing support"), the About pop-up says "give feedback on writing", and the share description lost "editor". Both sentences are marked DRAFT-WEHAN (eleven placeholders in `index.html` now).
- Left alone and flagged to him: the pop-up "Editing and writing support" (its title, "What I edit", "Request editing", "I edit for the argument first"), the Map entry "Editing & writing", and the rates list in "Working with me".

## 2026-11-15, night: his list of small fixes (v=53 on `services`, on the staging site, not live)

- Landing page: the headshot is larger (and gone from About me); the sentence is his own ("Thinking for ourselves is more critical now than ever. I specialise in bespoke educational solutions for individuals, schools, and universities."; he typed "specialize", set with an s to match the rest of the site); each of the four boxes names what is behind it in small type.
- Tab title "Wehan Coombs · Teaching and Learning Solutions" (the share title follows it). Search description is his placeholder, tagged DRAFT-WEHAN.
- Objects: A module is six small copies of the lesson box (four layers each, no words, each of its own size, three by two on a board); A curriculum is a spiral stair of planks whose lengths repeat the six lesson sizes, with a light climbing it; A person is one soft glowing sphere (`orb` in the shape, drawn in `paint`); A university has 56 points where it had 128.
- Details cards: the price pill under each name is larger. Lectures shows the two recordings large, one in front of the other, with a round chevron that brings the other forward (a recording that was playing stops when it goes behind). The study guides moved from Lectures to A module, which also took the paragraph about the modules he has designed. A curriculum now shows two sentences lifted whole from the pop-up "Curriculum and course development"; what that service is, is still open (he may settle it in a chat). A university no longer leans on the proposed fellowship: "My research focuses on teaching in the age of AI: ..." (DRAFT-WEHAN, in `main.js`). The same fellowship clause was taken out of the AI star's note and the pop-up "Teaching in the age of AI".
- The Classes shelf: spine names are set smaller there so that "The Tempest" stays on its spine; on a phone the shelf is tall enough for the spines.
- About me: no headshot, no CV coins, no "full resume" bullet, no "Full resume in Google Docs" link. The four bullets (About me, Qualifications, Why I teach, Referees) sit one to a line; LinkedIn, ORCID and ResearchGate have a row of their own. The CVs and the resume are still in the top bar's CVs menu and in the Map.
- The constellation on a wide screen: heavier lines, stars a third larger, larger names in the full text colour, and 58 small unnamed stars behind (`.dust`). The phone layout is as it was.
- "Edit" taken out of the writing pop-up (he answered "Sure" to the question): it is now "Writing support" (title, Map entry, the two labels in "Working with me", the request draft), with "What I work on", "I read for the argument first, then the sentence." The rates are untouched. "Tracked changes" is still there and flagged to him.
- "Working with me": "Open Details on any service, or book a free intro call." in place of "Press a Request button anywhere on this page." (his words). Classes and Lectures have no Request button (they never had one); the pop-up "Classes" gained the rate line.
- Site text: `../site-text.md` is written afresh from the built site by `.claude/export_text.py` (run it again after any change of wording: `python -I .claude/export_text.py "..\site-text.md"`); the old file is kept as `../site-text-live-site-2026-11-14.md` because it describes the site that is still live. A copy is in his Drive as the Google Doc "Site text – three-cabinet site (v53, 15 Nov 2026)", beside the older "Site text – wehancoombs.github.io".
- Twelve DRAFT-WEHAN placeholders in `index.html`, plus the university line and the ten landing-word lines in `main.js`.
- Still his to send: the white-on-black drawing for dark mode; the current one stays until then.

## 2026-11-15, late night: his second list (v=54 on `services`, on the staging site, not live)

- A person is a small planet with an aura: a solid, shaded core, a halo that swells and fades, and a ring of light that leaves it every few seconds. In light mode the core is the dark purple, so it no longer washes out.
- A module is a row again (six small lesson boxes side by side; the three-by-two block read as "a little city"). A curriculum is a spiral stair whose every step is such a row: five lesson boxes laid from the post outwards, twelve steps, a light climbing a module at a time.
- A curriculum, item line and card: new drafts from his own account of it ("modules stacked in an order that makes sense", done for first- and second-year modules at UP). He has no document that proves it; the wording is DRAFT-WEHAN.
- A university card: two lines added under the research sentence (how his 2026 honours module was assessed; facts from the pop-up "Curriculum and course development") and the quotation swapped for Dr Black's on what cannot be automated (from the pop-up "Teaching in the age of AI"). All DRAFT-WEHAN. `linesLast` in DETAILS puts the list under the paragraph.
- About me: a turning seal beside the title (the motto round a W; it opens "Why I teach", so the motto left the foot); the four bullets are buttons, two by two; LinkedIn, ORCID and ResearchGate are a dotted list; "The full resume" is large and underlined and opens the resume pop-up.
- The constellation's look is back as it was (the heavier lines and the small stars are gone). He meant more stars, not thicker ones: content, for a chat.
- One palette everywhere: `--teach`, `--think` and `--make` now point at the green, purple and orange, so the Map, the CVs menu and every pop-up follow. Service pop-ups carry `data-tone` (tutoring, writing, classes green; consulting and "Teaching in the age of AI" purple; design is orange by its chapter), request sheets likewise, and a pop-up opened from the board keeps the colour of the open tab. The lesson and study-guide pop-ups keep the colours of their spines.
- `../site-text.md` written again by `.claude/export_text.py`; the Google Doc is now "Site text – three-cabinet site (v54, 15 Nov 2026)" (the v53 one is renamed "OLD (replaced by v54) ..." and can be deleted).
- For a chat (prompt given to him): the curriculum wording and what could stand as proof; what a university gets from an AI review; which stars to add to the constellation; the fifteen drafts.

## 2026-11-15, last round of the night (v=55 on `services`, on the staging site, not live)

- The planet (A person) answers a touch: pressed, it sends out a ring and wobbles like a drop of water, with ripples crossing its face; dragged, it is pulled along and swings back; a pointer passing over it stirs it a little (`ORB` in `main.js`). Still with reduced motion.
- The stair (A curriculum): the lessons in each step lie flat, as tiles of their own length and width.
- About me: the motto is back in the foot beside the copyright line (the seal stays); the resume link reads "My full resume".
- Site text and Google Doc refreshed: "Site text – three-cabinet site (v55, 15 Nov 2026)". The v53 and v54 docs are renamed "OLD ..." for him to delete.
- His rule from this round: anything mentioned that has a link gets the link.

## 2026-11-15, one more (v=56 on `services`, on the staging site, not live)

- The planet is calmer ("more water and less jello"): the wobble is a quarter of what it was and four times slower, a touch sends one slow ring that eases out as on a pond, a drag pulls it gently and it drifts back without bouncing, and the ripples across its face are two slow ones.
- About me: "10 weeks in charge of classes" is out; "4,000+ students taught" is in, second in the row after "15 years lecturing" (the figure is the one explained in the pop-up "Courses designed and taught", which it opens). The six figures are one row. The ten weeks are still mentioned inside the pop-ups about the two schools.
- The Google Doc is now simply "Site text – three-cabinet site" (no version in the name); small changes are made in it with find-and-replace, so no new copy each time.

## 2026-11-15, his lines from the chat (v=57 on `services`, on the staging site, not live)

- Tag `draft-stable` (local): the site at v=56, saved at his word before these changes. To go back: "Restore the draft to draft-stable".
- A curriculum: his line ("Modules ordered so that each builds on the last.") and his card text. No longer drafts.
- A university: his card. Left: the line, "What you receive" and three points. Right: his research sentence, the two points about his 2026 honours module, and Dr Black's quotation under them (`head` and `side` in DETAILS). The one-line description is kept by him as it is.
- The constellation has fifteen stars. "Rorty" is "Ethics & politics" (joined to A way of life and Metacrisis; its old link to Plato is gone, since his list of connections did not include it). New: The soul, Reading hidden texts, Decolonial curricula, with his notes and connections; each has a "Go further" button like the other stars (papers, papers, the FIL110 study guide). A way of life moved a little on the wide layout to keep a line clear of it. The phone layout was laid out again in a slightly taller frame (360 by 548); a check in the preview found no name touching another name or star, at laptop or phone size.
- Writing: one rate, "From R450 an hour", on the board, the card, the pop-up and "Working with me". No "tracked changes" ("comments in the margin"), "comments on the sentences" for "the sentence-level pass", the study-guide and course-material lines and the digital PR line removed, and the small line reads "Essays · Theses".
- "Working with me", first bullet: "Open Details on any service and press Request. It drafts a message ..."
- The description shown when the link is shared is the same as the search description.
- Ten DRAFT-WEHAN placeholders in `index.html` now, plus the ten landing-word lines in `main.js`.
- Site text written again; fresh Google Doc "Site text – three-cabinet site (fresh, v57)". The earlier one is renamed "OLD ...".

## 2026-11-16: pop-ups folded in and removed (v=59 on `services`, on the staging site, not live)

- v=58: the line from Ethics & politics to Plato put back, at his word.
- From his chat notes: 38 pop-ups where there were 45.
  - Folded in: Conference papers is now a section of Research and publications (before Profiles); the two assessment paragraphs on first-years and on honours groups are now a section "Assessment" at the end of Curriculum and course development. The third assessment paragraph (school classroom, Kahoot) was not moved; the same lines are already in Teaching approach.
  - Removed: Teaching philosophy, Beyond the classroom, Funding and collaboration, Student support, Referees, with every button to them (Map, About me, and inside the pop-ups Why I teach, Hoërskool Garsfontein, Philosophy for teenagers, Testimonials, Research and publications).
  - New lines, his: "My full teaching philosophy is in my resume." at the end of Teaching approach; "Referees are listed in my full resume." under the resume link on About me and at the end of Testimonials, where the Referees buttons were.
  - About me has three buttons (About me, Qualifications, Why I teach) and four research links (Papers is gone, since the papers are inside Research). Five stars that had "Go further" to the papers now have only "Research and publications".
  - The build stops if anything on the page still asks for a removed pop-up.
- Site text written again; Google Doc "Site text – three-cabinet site (v59, 38 pop-ups)".

## 2026-11-16: the papers links come back (v=60 on `services`, on the staging site, not live)

- He was not happy to lose the Papers link under the constellation and the stars' button to the papers. Both are back and open Research and publications at its Conference papers section (`data-at="papers"` on the button, `data-anchor="papers"` on the heading; the click handler scrolls the pop-up there). On the five stars the button reads "Conference papers →".

## 2026-11-16: Why I teach becomes a quotation (v=61 on `services`, on the staging site, not live)

- The pop-up "Why I teach" is gone (37 pop-ups), with its Map entry, its About me button and the button to it inside the pop-up "About me". Its first and last sentences are a quotation under the title on About me; the middle sentence (fifteen years, collaborative spirit) was left out.
- The motto in the foot of About me has a tooltip: "Docendo discimus: by teaching, we learn. After Seneca, Letters to Lucilius, 7.8." (Seneca wrote "homines dum docent discunt"; the two-word motto is the later short form, hence "after".)
- The coin beside the title no longer opens anything: pressed, it spins and the whole page sways once (not with reduced motion).
- The About me box on the landing page reads "Qualifications · Research · Resume", since Referees is no longer a place.
- About me has two buttons: About me, Qualifications.
- Site text written again; Google Doc "Site text – three-cabinet site (v61, 37 pop-ups)".

## 2026-11-16: the coin's signs (v=62 on `services`, on the staging site, not live)

- The page sway is gone. While the coin spins, its W flickers through phi, the unicursal hexagram (drawn in the seal as a path), Om, yin and yang, the eye of Ra (the hieroglyph U+13080) and back to W, 135 ms each. "Ohm" was read as Om.

## 2026-11-16: the coin, a little fancier (v=63 on `services`, on the staging site, not live)

- Each sign on the coin shows for a fifth of a second (200 ms); the spin lasts 1.65 s to hold all six.
- The coin has a milled edge (a dashed ring), a face lit from the upper left (a radial gradient), a thin inner ring, a short highlight on the rim and a soft shadow. He asked for "a little 3d, textured ... dont overdo it".

## 2026-11-16: a thicker coin (v=64 on `services`, on the staging site, not live)

- The glint on the rim is gone and the face is lit less. The coin has thickness by a sleight: a second, darker disc six units below the face carries the milling, so the coin reads as seen slightly from above with its edge showing (`.coin-side`, `.coin-mill`, `.coin-back`). It is still a flat drawing; in the spin it turns as one piece.

## 2026-11-16: an older coin (v=65 on `services`, on the staging site, not live)

- No shine left on the coin: the face is one flat, dull colour. It is aged with two SVG noise filters (`#coin-wear` for worn patches, `#coin-pits` for fine pitting) and three small nicks in the rim; the lettering is a little duller. The thick milled edge stays.

## 2026-11-16: his final lines; no drafts left (v=66 on `services`, on the staging site, not live)

- Every DRAFT-WEHAN mark is gone (the build now requires none). His final lines from the chat: the search and shared description; the one-line descriptions of Writing, Classes, Lectures, A lesson and A school (and the Classes pop-up); the third paragraph of the About me pop-up; "I read for the argument first, then the style."; six of the landing-word notes (Nous, Maat, Jñāna, Ḥokhmah, Schola, Ubuntu). The rest he kept as they were.
- The coin: the nicks are gone; the wear and pitting are a little stronger.
- The cards have slightly less padding at the top and bottom on a laptop, so that the longer lines fit without scrolling (all ten fit at 1280 by 800).
- `.claude/export_text.py` lists drafts only if the site has any. Fresh Google Doc "Site text – three-cabinet site" (37 pop-ups, no drafts).

## 2026-11-16: pop-up text edits from his chat (v=68 on `services`, on the staging site, not live)

- Eighteen edits (`POPUP_EDITS` in the build script, each checked to be found once): Teaching approach, Hoërskool Garsfontein, Writing support, Learning design and tools, Philosophical and AI consulting, Working with me, Curriculum and course development. The School card on the board still shows three points; the new fourth point in the consulting pop-up is for universities.
- Four lesson fixes (`LESSON_EDITS`): The Herb Garden ("just asking", its four stage notes in the past tense); For Oom Piet (one sentence deleted); South African spelling (centre, analyse, analysing in The Tempest; emphasise in Philosophy for teenagers; also emphasising in The Herb Garden and summarised in a poem lesson); The Poet ("a square circle" both times).
- The cards have a little less padding at the top again, so that all ten still fit on a laptop.
- Fresh Google Doc "Site text – three-cabinet site".

## 2026-11-16: the services list as buttons (v=69 on `services`, on the staging site, not live)

- Tag `before-buttons` (local): the site at v=68, saved at his word before this change. To go back: "Restore the draft to before-buttons".
- A trial he asked to see: each service on the board is one large button (`.item-btn`) with its name, its price and "click for details" ("tap for details" on a touch screen) in place of the small Details link. The one-line description is no longer shown in the list; it is still in the page (hidden) because the details card reads it. With a pointer, a button swells a little on hover; on a phone the name and the hint share a line so that four buttons fit one screen.
- Consult names: For You, For Your School, For Your University (on the buttons, the card titles and under the objects). The Consult box on the landing page still reads "A person · A school · A university".
- Fresh Google Doc "Site text – three-cabinet site".

## 2026-11-16: the descriptions back as tooltips (v=70 on `services`, on the staging site, not live)

- He likes the buttons. Each service's one-line description is back as a tooltip that appears to the right of its button, over the board, on hover or keyboard focus. Only where there is a pointer and the screen is wider than 900px; on a phone it stays off (the line is on the card).

## 2026-11-16: a new landing sentence (v=71 on `services`, on the staging site, not live)

- His: "Philosopher and educator. I teach people to think for themselves by providing specialised educational support for individuals, schools and universities." He typed "school and universities"; set as "schools" and flagged to him.

## 2026-11-16: room at the top of the cards, Design names, stills, tabs (v=72 on `services`, on the staging site, not live)

- The details cards have more room above the title again (the study-guide shelf on the Modules card is a little shorter to pay for it; all ten fit at 1280 by 800).
- Design names: Lessons, Modules, Curricula (buttons, card titles, under the objects, and the Design box on the landing page). The Lessons line: "Lessons, with all their materials, ready to teach".
- The two recordings on the Lectures card show a still: Google Drive's own preview picture, loaded from drive.google.com/thumbnail by file id (not saved in the repo), darkened at the foot under the caption.
- A tab pressed while a details card is open on that same tab closes the card and brings the list back.
- Fresh Google Doc "Site text – three-cabinet site".

## 2026-11-16: the big-boxes board, muted colours (v=73 on `services`, on the staging site, not live)

His ask: "simplify even further, particularly by muting the colors a bit and then relegating the animated objects the left of the service boxes on the TDC page, and have those boxes dominate the 'whiteboard' space with most important details immediately visible, and then clicking one expands it over the others, showing the rest of the detail." The version before this is tagged `before-boxes` (v=72, local tag). To go back: "Restore the draft to before-boxes".

- **Layout.** The turning object is now small, in a narrow column on the far left of the board (it still follows the box under the pointer; "drag to turn · tap to change" is hidden on a computer). The rest of the board is the services as wide boxes, one under the other: four on Teach, three on Design and Consult.
- **A box shows** the name, the price and "click for details" on the left; on the right the one-line description (no longer a tooltip) and, where the details card has them, a point or two copied from that card (`PEEK` in main.js; no new wording): Tutoring and Writing two points each, Classes "What I taught in 2026", Lectures "Watch me teach", Lessons "The arc of a lesson", Modules "Study guides I wrote", For Your University two points. Curricula, For You and For Your School show the description only.
- **Opening.** A pressed box grows (a clip-path animation from the box's own outline) until its details card covers the whole board under the tabs, the object column included, so the ten cards keep the room they were fitted to (all ten fit without scrolling at 1280x800). The cross, the tab and Escape close it; on a phone the bar at the foot of the card does too, and the card is scrolled so its title sits under the tabs.
- **Colours.** The three colours are muted everywhere they are used (tabs, boxes, cards, pop-ups, landing boxes): dark theme sage #8FB79A, clay #D3A377, lavender #AA9FCC; light theme #426F53, #8E5C33, #675A8E.
- **Site text.** `.claude/export_text.py` now lists the points under each box.
- **Samples.** He wants a sample offering for each service. Present today: Classes (the lesson bookshelf), Lectures (two recordings), Lessons (the arc, and the lesson pop-ups), Modules (five study guides). Missing: Tutoring, Writing, Curricula, For You, For Your School, For Your University. He was given a chat prompt to brainstorm the six.
- Checked in the preview at 1280x800 (both themes), 1366x700 and 375x812. Not checked on a real phone.

## 2026-11-16: his own points on the boxes (v=74 on `services`, on the staging site, not live)

He kept the big boxes ("I really like the big boxes, keep them") but found the points weak, took them to a chat, and pasted back two points for each of eight services (Tutoring and Writing kept theirs). They are in `PEEK` in main.js, one service to a line; the text export reads them from there. For Your University now reads "An AI review of a module or a whole department"; its card ends "A meeting with your staff to talk it through"; the consulting pop-up bullet says the same.

## 2026-11-16: the dark-mode drawing, the hand over the board, About me tiles (v=75 on `services`, on the staging site, not live)

- **The drawing.** He supplied the white-on-black drawing (kept as he sent it in `assets/wehan-drawing-dark.webp`). It lines up with the light one to within a few pixels, so both share one frame (1004 x 1416, pointing right, mirrored by the page). `.me` is now two layers: `::before` is the figure's solid shape (`wehan-fill.webp`, `wehan-fill-dark.webp`) painted in the page colour, `::after` is the lines (`wehan-line.webp`, `wehan-line-dark.webp`) in the text colour. Because the figure is solid, the board's edge no longer shows through his hand, in either mode. The four masks are made by `draw_dark.py` (session scratchpad; it needs the path of his picture). The prerequisite he set for publishing ("we need the improved white on black image before pushing to the real site") is therefore met; publishing still waits for his word.
- **About me.** The six figures are outlined tiles with a small arrow after each label and lift under the pointer, so that they read as buttons. Under the constellation, "Papers" is gone and "Research" is "Research & publications".

## 2026-11-16: a trial, testimonials between the solids (v=76 on `services`, on the staging site, not live)

His ask: "should we maybe mix in some testimonials between the shapes on the landing page? let's see how it looks". After a solid has had its nine seconds it dims and one testimonial stands over it for eight seconds, then the next solid comes; a tap or a drag puts the words away. Five testimonials, all from `VOICES` (`LANDING_VOICES` in main.js): two first-year students, the UP mentor lecturer, Prof Finamore, Dr Black. Not shown where motion is reduced (the solid does not change by itself there). To take it out: undo `round76.py` (three blocks in the build script, one in `cabinets.css`), or check out commit 3ae79fe.

## 2026-11-16: his suggestions in the site text doc (v=77 on `services`, on the staging site, not live)

He marked the site text Google Doc (the v74 copy) with three suggestions and three comments. The suggestions are applied:

1. Landing sentence: "specialised educational support" is now "specialised teaching and learning support".
2. Tutoring box, first point: "A plan for the term, with marked practice" ("essays" cut). He marked only the box; the same line on the Tutoring details card and in the Tutoring pop-up still ends "practice essays" (asked whether to cut it there too).
3. The Map no longer opens with "Everything lives on this one page. Pick a place and it opens."

His three comments, answered in chat and not yet acted on: (a) Lessons card quotation ("Enhanced the learners' vocabulary through scaffolding"): "We sure we don't have a better one for this?"; (b) For You card quotation (Dr Black, "He moves between close readings of Plato and present concerns..."): "This is great but maybe more suited to a different section?"; (c) the Map from My services down: "I think all of this needs updating or streamlining?". A fourth suggestion thread, "Add space", could not be found in the text and carries no wording.

The text export now also lists the five landing testimonials of the trial.

## 2026-11-16: the Map rebuilt, two quotations, "essays" (v=78 on `services`, on the staging site, not live)

- **The Map** mirrors the site as it is: Begin; My services (Teach, Design and Consult side by side, each with its services, then Working with me and Book a free intro call); About me (About me, Qualifications, Research & publications, Posts, The age of AI, Testimonials, My full resume); CVs (the four PDFs); Contact (Write to me, LinkedIn). A service in the Map opens its details card (`data-svc`). The school and lesson pop-ups are no longer listed there; they are reached from the cards. The order of the pop-ups (for the arrows and "3 of 7" inside a pop-up) used to be read off the Map and is now written out in main.js (`ORDER`).
- **Lessons card quotation:** "The lesson plans were well crafted and engaged learners, allowing them to partake and ask questions." (Mentor teacher, Hoërskool Garsfontein · formal assessment, 2026). His chat read it from a handwritten, scanned form (Mentor Assessment 2, 27 May 2026) and said to check it against the original before it goes live.
- **For You card quotation:** "…he has been a guide and mentor to me there as much as in the academy." (Dr Mitchell-Ron Black · research collaborator, 2026). His chat advised asking Dr Black first; he said to use it without waiting. The earlier Black quotation is still in the Testimonials pop-up.
- **"essays"** is cut from "A plan for the term, with marked practice" at its source, so the box, the card and the Tutoring pop-up all match ("yes dropping the word 'essay' was deliberate").
- The landing testimonials stay ("keep testimonials").

## 2026-11-16: the final pass (v=79 on `services`, on the staging site, not live)

He asked for a final pass on the whole site, whether it funnels customers, and whether the visit counter works.

**Checked by script (`audit.py`, session scratchpad):** no duplicate ids, every pop-up a button names exists, no local file missing, every outside link answers (the 403/999 answers are sites refusing a script, not broken links), no placeholder, WhatsApp or phone number, no z-spellings in the text.

**The visit counter.** The live site loads GoatCounter's script and sends a count for each visit (seen in the browser: a request to `wehancoombs.goatcounter.com/count`). The dashboard needs his sign-in, so the recorded numbers were not seen. The staging copy leaves the counter out on purpose.

**Fixed without new wording:**
- Counting. "Write to me" on the bar and the single phone button "Book a free intro call · Write to me" were never counted (their click was stopped before the counter saw it); fixed. Newly counted: arriving at a pane (`see-services`, `see-about`), every pop-up opened (`open-<id>`), Request / Book / More on each card by service (`request-lesson`, `book-school`, `more-tutoring`), a message that was really sent (`sent-<kind>`), the address copied (`copy-address`). Tried in the preview with a stand-in counter.
- Booking pop-up: "Open the booking page" now sits above the calendar (it was under a tall frame, out of sight if the calendar is slow or blocked), and "write to me" in its note opens the form.
- The site text now shows the request form's own words (it used to leave the form out).

**An independent first-visitor review** (a second agent, four visitors: a parent, a postgraduate, a principal, a head of department) found the contact routes sound (the bar on every screen, four ways to send, about four clicks from landing to a sent message) but the information before contact uneven. Left for his decision, most valuable first:
1. ~~"Send from here" (Formspree) has never been confirmed with a real message.~~ Confirmed 2026-11-16: with his yes, one test message was sent through the form on the local preview (the browser would not open the staging address); the form said "Sent ✓" and Formspree's email reached his Gmail within a minute, subject "Hello", but under the **Updates** tab, not Primary. Not yet tried from a phone or from the staging address itself.
2. The Tutoring box and card do not say school English or grades until the pop-up; the lines exist there.
3. The For Your School card is vaguer than its box (general consulting bullets, a first-year student's quotation).
4. The consulting request form does not mention an AI policy, a review or a university, and a message does not say which card it came from.
5. The Lectures card gives an employer no way to write and no link to the Academic CV.
6. Not answered anywhere: how soon he replies, what "From R350" depends on, where in-person sessions happen, how to send a document and roughly what a chapter costs, a price for For You.
7. Old names: pop-up titles "Tutoring and TEFL", "Learning design and tools", "Philosophical and AI consulting"; the small labels "For schools" / "For universities" in pop-ups; "Working with me" lists the old names and says "Open Details".
8. Numbers that disagree: "5 self-designed modules" against "4 from scratch, 1 partly redesigned"; "15 years lecturing" against posts that start lecturing in 2014; "a class of about 300" against "294 of 734"; the headline 4.81 is six students.
9. The search title and description do not name what people search for.
10. "Taking new clients for 2027" may read as "not available now".

## 2026-11-16: his final text changes, the CVs, and PUBLISHED (v=80, live)

His word: "Final changes below then push to my LIVE SITE and fix all the CV's to wehancoombs.com".

**Text (from his chat, applied as given):**
1. Tutoring box points: "School English, Grades 10 to 12" and "Home Language and First Additional Language".
2. For Your School card: a "What you receive" list of three lines. It replaces the three general consulting points that were there (they are still in the consulting pop-up); with both, the card would not fit.
3. Request on the For Your School and For Your University cards opens a new message for institutions (`REQUESTS.institution`); For You keeps the old one less two lines.
4. "Working with me" has five more lines under How it works (reply within two working days; what R350 is for; where sessions are; how to send writing; For You is R450 an hour). For You shows "R450 an hour" on its box and card, and has its own line in Rates; the last Rates line now names "Classes and lectures, Design, For Your School, For Your University" so that it does not contradict it.
5. Pop-up titles: "Tutoring", "Lessons, modules and curricula", "Consulting: for you, your school, your university".
6. "15 years teaching at university"; Philosophy of Medicine is "a class of more than 700" (the About me pop-up and the note on the 4,000 figure). "5 self-designed modules" kept.
7. Search title and description: no change.
8. "Taking new clients now" in all seven places.

**The domain.** He had already added the `CNAME` file on GitHub (commit 852821f on `main`, "wehancoombs.com") and pointed the domain at GitHub Pages. wehancoombs.github.io now redirects to http://wehancoombs.com/. On 2026-11-16 the secure address (https) did not yet work: GitHub had not issued the certificate. There is no `www` record. The `CNAME` file lives on `main` only; `services` does not have it, so the staging copy is not affected. **When publishing, merge `services` into `main`; never replace `main` with `services`, or the CNAME file is lost and the domain stops working.**

**The CVs.** The website line in all five CVs (FET, PhD, Freelance, General, and the Afrikaans general one) reads "wehancoombs.com" and links to http://wehancoombs.com (http, because https did not work yet; with Enforce HTTPS on, it will redirect). Re-rendered, every page overflow 0; old copies archived in Drive as "(before 2026-11-16)"; the four English ones copied into `cv/` here. The QR codes point at the full resume Google Docs and needed no change.

**Published** by merging `services` into `main` (keeping `CNAME`) and pushing. The live site was v=40 (the five-cabinet site, tag `before-services`) until then.

## 2026-11-16, evening: four notes after the launch (v=81, PUBLISHED the same evening on his "Yes, publish")

1. **Phone: a details card would not scroll to its end**, so the quotation's attribution stayed under the contact bar. The card was a box that scrolled inside itself and kept the scroll to itself (`overscroll-behavior: contain`), so the page under it could not be moved from inside the card. On a phone the open card is now part of the page: the boxes and the object step aside (`display: none`), the card is in the flow, and the page scrolls to the end of the card and its back bar, clear of the contact bar. Checked at 375x812 on five cards. The laptop layout is unchanged (all ten cards still fit at 1280x800).
2. **The price on a details card is a button** (with a small arrow): it opens that service's request form; for Classes and Lectures, which have no form, the booking pop-up. Counted as `rate-<service>`.
3. **Landing page, Consult box:** "For You · For Your School · For Your University".
4. **Testimonials pop-up:** the sentence "Weighted by the number of students who answered it is 4.3; the large second-year ethics class of 2018 pulls it down." is removed. He wrote "from both"; it was on the site in this one place only.

## 2026-11-17: light by default, and no more brown (v=82 on `services`, on the staging site)

He sent a phone screenshot (Samsung Internet): the site was in light mode, but the browser's own dark mode had darkened the light page into a muddy brown. His word: "Ignore user theme and force light mode as default, always. Make the word dark/light clear ... make sure the horrible brown never shows up again."

- **Light for everyone.** A first visit opens in light mode whatever the visitor's system setting; the system setting is no longer followed. The switch still works and is remembered.
- **The brown.** The page now tells the browser that it has its own light and dark (`<meta name="color-scheme" content="light dark">`, and `color-scheme: only light` / `dark` in the styles), which is what stops a browser's forced dark mode from recolouring it. This could not be reproduced in the preview (it is the phone browser's own feature), so it needs his phone to confirm.
- **The switch shows its word on a phone too** ("Dark" when the page is light, "Light" when it is dark).

## 2026-11-17: the brown on a Samsung phone, rounds two and three (v=83, v=84 on `services`, on the staging site only)

v=82 (published) did not stop the brown: tested in a Secret mode tab of Samsung Internet on the phone that shows it ("Still brown in secret mode"). His own phone never showed it.

- **v=83** added a `prefers-color-scheme: dark` rule (head and stylesheet), the signal Samsung Internet is said to look for before darkening a page. Still brown.
- **v=84.** A page cannot switch a browser's own darkening off, so where a browser is going to darken it anyway the site now shows its own dark mode instead, which darkening leaves almost untouched, and hides the switch there (choosing light would bring the brown back). Detected in the first script in the head: Samsung Internet (`SamsungBrowser` in its name) reporting dark, or any browser that recolours the system colours. Everyone else still opens in light. The start-up code was tested against seven pretend browsers (`headtest.js`, session scratchpad): only the Samsung-in-dark and recolouring cases turn dark.
- **A check page** on the test copy only, https://wehancoombs.com/site-preview/check.html, shows what the phone reports (its browser name, whether it says it prefers dark, a system colour, and whether a plain white page is darkened). It is not on `services`, so the next staging refresh removes it.
- Not yet known: whether Samsung Internet on that phone reports "prefers dark" while its dark mode is on. If it does not, v=84 cannot tell it is being darkened, and the check page will show that.

## 2026-11-17: the Samsung brown, round four (v=85 on `services`, on the staging site only)

The check page on the affected phone (Samsung Internet 30, Secret mode): it darkened a plain white page while telling it "prefers light" (prefers dark: false; system colour white). So v=84 could not tell it was darkening, and stayed light and brown. His own phone (Chrome inside another app) reports prefers dark but does not darken pages, which is why he never saw it.

v=85: in Samsung Internet (known by `SamsungBrowser` in its name) the page always declares a dark colour scheme (`color-scheme` meta set to dark by the first script, and `color-scheme: dark` on the root), in its light look too. Chromium-based browsers leave alone a page that says its own scheme is dark. The light look itself does not change (checked in the preview with the Samsung class added: same background, same form colours). The v=84 guess (dark mode and no switch) is removed. Everyone else is unchanged. A second check page, https://wehancoombs.com/site-preview/check2.html, is white and cream but says dark: if Samsung leaves it white, the fix works. Not yet confirmed on the phone.

## 2026-11-17: the Samsung brown, round five (v=86, PUBLISHED the same morning on his "Publish, thank you")

v=85 did not help ("Still brown"): Samsung Internet 30 darkens every light page whatever colour scheme the page declares, and reports "prefers light" while doing it, so a page can neither detect it nor switch it off. Its darkening keeps the tint: the white check page turned neutral charcoal, the site's cream turned brown.

v=86: in Samsung Internet only (`html.samsung`, set by the first script from the browser's name), the light look uses neutral off-whites and greys instead of the creams (`--bg #F4F4F3`, `--bg-2`, `--surface`, `--bb`, lines and text greys). With that browser's dark mode off it looks like the light site in white; with it on it should turn charcoal, not brown. Accents, the drawing and everything else are unchanged; other browsers are unchanged. v=85's colour-scheme trick is removed. Checked in the preview with the class added (the background becomes #F4F4F3). Not yet seen on the Samsung phone. The check pages are dropped from the test copy.


## 2026-11-17: the web on About me gives a little (v=87 on `services`, on the staging site only)

His ask: join Ethics & politics to Aristotle, and give the whole web a slight jiggle. Now a star can be pulled a short way (it stretches like elastic and never goes far: about 72 units on a wide screen, 46 on a phone), the stars tied to it are drawn along, and when it is let go everything wobbles back into place. Each star is held to its place by a spring and each line is a spring; the bigger stars are a little heavier. A tap still opens the star's note; a real pull (more than a few pixels) does not. Left out for anyone whose device asks for less motion. On a phone, a finger that lands on a star pulls it instead of scrolling the page. Checked in the preview on a wide screen and at phone size: the pull, the settle back to the exact place, the tap, no sideways scroll. Not yet seen on his phone. Tags before it: v2.1-stable (live v=86).

## 2026-11-17: his own icons, and the share preview names the domain (v=88 on `services`, on the staging site only)

From his Claude chat. The six icon files he made (favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest: a cream W in a gold ring on #100F0D) are now in the repo and in the page head, in place of the inline icon. The links are relative (`favicon.ico`, not `/favicon.ico`), and so are the two icons named in the manifest, so they also work on the test copy in /site-preview/. The share preview (og:image, og:url) now names https://wehancoombs.com/ instead of github.io; there was no canonical or twitter tag. index.html is the only page. On his word every other github.io in these notes became wehancoombs.com, except two that would turn false: the name of an old Google Doc ("Site text – wehancoombs.github.io") and the sentence saying github.io redirects to the domain. The PGCE portfolio now opens at https://wehancoombs.com/ves310-portfolio/ (github.io redirects there). Publishing also carries v=87 (the web on About me), which is on `services` before it.

**Published 2026-11-17** on his "Publish both": v=87 and v=88 together (merge 1530ae5 on `main`). Checked on wehancoombs.com: v=88 served, the four icon files answer, og:image and og:url name wehancoombs.com, the domain file, the counter and no noindex.

## 2026-11-17: the FIL110 lecture on YouTube, and the micro lesson beside the lectures (v=89 on `services`, on the staging site only)

From his Claude chat. In the Recorded lectures pop-up, "Lecture one in Drive" became "Watch on YouTube ↗" (https://youtu.be/3yu_p7YIFhc); the FIL710 Drive link is unchanged. The PGCE micro lesson (https://youtu.be/peBkDshxgYs) joins the two lectures: a third recording in the Lectures card's "Watch me teach" deck (caption "English micro lesson on adjectives", "PGCE · 2026", its YouTube still, played from youtube-nocookie), and in the pop-up its heading "English micro lesson on adjectives · PGCE · 2026", the video and "Watch on YouTube ↗". The deck now reads "1 of 3"; only the next recording waits behind the front one. The two lecture players inside the pop-ups still play from Drive. The CVs in wehan-cvs never had the Drive link (nothing to change, no re-render), and his full resume doc already links the YouTube lecture.

## 2026-11-17: the FIL710 seminar on YouTube too (v=90 on `services`, on the staging site only)

From his Claude chat. In the Recorded lectures pop-up, "Lecture two in Drive" became "Watch on YouTube ↗" (https://youtu.be/A2ta75nJWTI), so the row reads "Watch on YouTube ↗ Watch on YouTube ↗" for the two lectures. The CVs in wehan-cvs never had this Drive link either: nothing to change, no re-render. His full resume doc still has the FIL710 Drive link (not changed; offered).

## 2026-11-17: the lectures play from YouTube (v=91 on `services`, on the staging site only)

He saw the Drive recordings still on the Lectures card (the YouTube links were only in the Recorded lectures pop-up). Now every lecture player plays the YouTube version: the three recordings in the Lectures card's deck (FIL110 3yu_p7YIFhc, FIL710 A2ta75nJWTI, the micro lesson peBkDshxgYs), and the players in the Courses and Recorded lectures pop-ups (youtube-nocookie, so no YouTube cookies until play). The deck shows his YouTube thumbnails instead of the Drive stills, and under the deck a "Watch on YouTube ↗" link follows the recording in front (counted as `watch-youtube`). No Drive video is left on the site.

**Published 2026-11-17** on his "Publish": v=89, v=90 and v=91 together (merge adc2fb4 on `main`). Checked on wehancoombs.com: v=91 served, the YouTube players, the domain file, the counter and no noindex. Site text regenerated: https://docs.google.com/document/d/1T5AMQ4EBMrJ-RyRwZpu5J-LDqzxIM-9_QrIPsW-aPX4/edit (the v81 doc renamed OLD).

## 2026-11-17: the micro lesson moves to Classes (v=92 on `services`, on the staging site only)

His word: the adjectives lesson is a mock FET English micro lesson, so it belongs with Classes, not Lectures. It leaves the Lectures deck (two recordings again, "1 of 2") and the Recorded lectures pop-up, and stands on the Classes card under the shelf of lessons: "Watch me teach", the recording (caption "English micro lesson on adjectives", "PGCE · 2026", his YouTube thumbnail, a larger play button) and "Watch on YouTube ↗".

## 2026-11-18: the whole site becomes one plain page (branch `one-page-site`, NOT published)

From his Claude chat (on his phone, built in the cloud, not on his PC). His word: the site has to match what he is actually selling for income, and the old one can go.

- **Saved first.** The site as it was on 17 Nov (v=92, the three cabinets) is kept whole on the branch `old-site`.
- **The new page.** One `index.html` with its styles inside it. No animations, no pop-ups, no dark mode. Cream #F7F2E8, navy #16243A, thin gold lines #A87C1F; EB Garamond headings, Source Sans 3 body; squared corners. Design reference: artboard A2 on his design canvas.
- **Top to bottom:** header (name, Coaching / Talks / About, "Book a free intro call"); the headline "A Doctor of Philosophy for your essay, your exam or your thesis." with the offer and the two rates (school English R400 an hour, university work R500); a strip with his photo and three facts (15 years, 4.5 out of 5, 98 out of 100); Coaching (three rows with prices, one student quotation); "Why a philosopher for English?"; How it works (three steps); Talks and staff sessions (Teach by Learning first, then the two priced sessions); About (photo, the head of department's quotation, the four CVs, the student evaluations); a last call to book; footer.
- **Kept as they were:** CNAME, the `cv` folder, the `materials` folder, the icon files and `site.webmanifest`, `headshot.jpg`, the visit counter (GoatCounter) with named clicks, the booking link, and the Samsung Internet fix (neutral off-whites in that browser only, so its dark mode does not turn the cream brown).
- **Removed from this branch:** the old `index.html` and the `assets` folder (styles, script, the six drawings). All of it is on `old-site`.
- **Added beyond his brief, all taken from the old site's own wording:** the three facts, the student quotation, the head of department's quotation, and the closing "Start with a free 20-minute call." band.
- **Still open before publishing:**
  1. His email address is not in the page. The "Ask about a session" button points to the About section and the contact line reads "Email address to be added". Both are marked in the HTML with `CONTACT TO ADD`.
- Checked at 320, 390, 820 and 1280 pixels wide: no sideways scrolling; every local link points to a file that exists.
- **To publish:** on his "publish", merge `one-page-site` into `main`. Then bring the site text Google Doc in line.

**Later the same night:** on his word the "Why a philosopher for English?" section is removed ("People will buy the pitch or they won't"). The page now runs: headline, facts, Coaching, How it works, Talks, About, last call. Still not published.

**Later still (his words):** it is "15 years teaching philosophy", not lecturing: he has only lectured since 2019. Changed in the facts and in About. A fourth fact joins the other three: "English: Literature and Philosophy, my first degree" (the word English set large). The facts now sit two by two.

## 2026-11-18 (near midnight): two pages, home and talks (branch `one-page-site`, NOT published)

His decision: the home page sells coaching only, and the talks get their own page at `wehancoombs.com/talks/`, because parents and schools arrive through different doors. The rule he agreed for what earns a page: someone has paid for it, or he is sending that link to someone this month. Everything else he can do stays in the CVs.

- **Home (`index.html`):** the Talks band is now a short navy pointer ("I also give talks and staff sessions for schools and universities, starting with Teach by Learning." and a "See the talks" button). The Talks link in the top bar opens the talks page.
- **Talks (`talks/index.html`):** heading "Talks and staff sessions" ("For schools and universities. Online now, in person from April 2027."); Teach by Learning on a navy band ("On request."); the two priced staff sessions; "Who is speaking" (photo, the head of department's quotation, the academic CV, the student evaluations); "Ask about a session" (a booking button; the email address is still to be added, marked `CONTACT TO ADD`).
- **Styles** moved out of the page into one shared file, `site.css` (linked as `site.css?v=1`; raise the number when the styles change so phones fetch the new file).
- Both pages carry the visit counter, the named clicks and the Samsung fix.
- Checked at 320, 390, 820 and 1280 pixels wide: no sideways scrolling; every local link on both pages points to a file that exists.
- **Still open before publishing:** his email address, on both pages.

## 2026-11-19: staged on the test site

On his word ("stage it as a new live GitHub site"), the two-page build from `one-page-site` was copied to the staging repo `wehancoombs/site-preview` (address: https://wehancoombs.com/site-preview/), as one new commit on its `main` (nothing force-pushed; the old test copy is still in that repo's history). The staging copy has no CNAME, carries a noindex tag, has the visit counter taken out, and its tab titles start with "Test copy:". After each change to `one-page-site`, copy it across the same way. Still NOT published to the real site.

He plans a proper build and push at his PC on Monday 23 Nov, continuing from `one-page-site`.

## 2026-11-19 (morning): the CVs come off the site

His decision after a review of the four CVs and the Full Resume: the CVs are for sending to specific places, not for the public site, because they carry his cell number and his referees' names and contact details.

- Both pages: the CV links are gone. The links list now holds the student evaluations and one quiet link, "Full resume and teaching portfolio" (the Google Doc).
- The `cv` folder is removed from this branch, so the PDFs stop being public once this is published. They are still on `old-site`, in the `wehan-cvs` project and in his Drive. If he has sent anyone a direct link to a PDF on the site, that link will stop working after publishing.
- In the Full Resume Google Doc, the six referees' email addresses were removed and a line added: "Contact details for all referees are available on request." Its date now reads November 2026. The CVs he sends keep the referees' details.
- On lecturing: he says his resume beats his memory. The resume has tutor 2010 to 2013, assistant lecturer from 2014, head lecturer from 2016. The site keeps "15 years teaching philosophy".
- For Monday at his PC (CV work, in `wehan-cvs`): retire the Freelance CV (it sells editing, philosophical counselling and web apps, all dropped); in the General CV change "a year in the high-school classroom" (the practicums were ten weeks) and trim the old spread of services.

## 2026-11-19 (later in the morning): his round of small changes (styles now `site.css?v=2`)

- Line under the headline, his wording: "One-to-one writing coaching, from high school to university. In person in Pretoria East, or online." The browser tab title still says "English and writing coaching", kept for people searching for an English tutor.
- Buttons: "Book a free 20-minute call" (headline, last band, talks page) and the shorter "Book a free call" in the top bar. The small line under the headline button is now "On Google Meet. No charge, no obligation."
- The strip under the headline: three large figures (15 years, 4.5 out of 5, 98 out of 100), each under a gold rule. His first degree moved out of the figures to sit under his name: "BA in English Literature and Philosophy".
- Coaching: two rows. "School English" (R400) and "University writing" (R500), which now takes in essays, dissertations and theses in any subject and philosophy tutoring. Under the rows: "Writing something else in English? Tell me about it on the call."
- New band, "What students and mentors say": one large quotation (the honours student on one-on-one consultations and feedback) and three smaller ones, all taken word for word from the old site. The quotation that sat under the coaching rows moved here.

## 2026-11-19 (mid-morning): less bland, on his word (styles now `site.css?v=3`)

- **The offer is now a free trial lesson.** Buttons: "Book a free trial lesson" (headline and last band) and "Book a free lesson" in the top bar. Under the headline button: "20 minutes on Google Meet. Bring an essay or a question. No charge, no obligation." How it works, step 1: "A free 20-minute trial lesson." The talks page keeps "Book a free 20-minute call". STILL TO DO BY HIM: the Google Calendar booking page is still titled as an intro call, and he has not confirmed the length (20 minutes is what the booking page offers now).
- **The strip under the headline** is a navy band: photo, name and the two degrees, then three gold rings side by side (15 years as fifteen segments; 4.5 with four and a half stars; 98 out of 100). The rings draw themselves once when they first come into view (a few lines of script at the foot of the page; skipped for people who ask their device for less motion). This is the one animation on the site.
- **Coaching: three rows.** School English (R400), University writing (R500, any subject, with help on philosophy itself), Other writing ("Rate agreed before we start", because he has not set a rate for it).
- **What students and mentors say:** one large quotation, then a row of seven cards to swipe through sideways (arrow buttons for a mouse). The two school mentors come first, each with its mark (98 and 95 out of 100). The head of department's quotation moved here from About. All wording is from the old site.
- **His email address is on both pages now** (About on the home page; "Ask about a session" on the talks page). Nothing is marked `CONTACT TO ADD` any more.

## 2026-11-19 (late morning): consultation wording, a glint on the rings, and the comments rebuilt from the sources (styles now `site.css?v=4`)

- **The offer is a free consultation** (his call: "trial lesson" only fits school learners). Buttons: "Book a free consultation" (headline, last band, talks page), "Free consultation" in the top bar. Under the headline button: "20 minutes on Google Meet. For school learners it can be a short trial lesson. No charge, no obligation." STILL TO DO: rename the Google Calendar booking page from an intro call to a free consultation (he asked Claude to remember this for when the site is published).
- **Rings:** a faint light now travels round each gold ring, one lap every nine seconds, the three out of step. It is switched off for people who ask their device for less motion.
- **Coaching:** "Other writing" is R500 an hour ("Same terms: I coach, you write."), Claude's suggestion, for him to confirm. University writing has a quiet second line: "My own subjects are philosophy and English literature, so there I can help with the content as well."
- **The row of comments has eight cards, rebuilt from the original documents in his Drive** (the two recommendation letters, the peer evaluation report, the student feedback emails of 2024 and 2025, the 58-page evaluations file, and the scanned school assessment forms). Short comments are now paired with a second comment from the same person. Order: UP mentor lecturer (98), Abbotts mentor teacher (95), Garsfontein mentor teacher, an honours student on writing, Dr Black on writing, a first-year (2021), a first-year (2020), Prof Ruttkamp-Bloem.
- **TO CHECK BEFORE PUBLISHING: the school mentors' comments were handwritten and reached Claude only as machine-read text.** He must compare these with the scans: (1) lecturer: "The student demonstrated excellent knowledge and innovative way of using media to deliver a successful lesson. Even when I could not see the learners, the student's ability to make and create a lively lesson were greatly demonstrated."; (2) Abbotts: "The student enhanced the learners' vocabulary through scaffolding. Language is precise and engaging." and "Wehan's communication style is extremely effective. He engages students very well."; (3) Garsfontein: "Excellent subject knowledge. The lesson plans were well crafted and engaged learners, allowing them to partake and ask questions." and "The student had a good relationship with the learners. They were comfortable with asking him questions."
- **Not used, but likely the best school comment of all:** the Abbotts mentor's handwritten note on the Tempest crit lesson of 7 Sept 2026 (94 out of 100). The machine reading is too broken to quote (it seems to say he continually delivers lessons to a very high standard, that the lessons are very engaging and well prepared, and that his subject knowledge is exceptional). He should type it out from the scan.
- Student comments were tidied only for capital letters and apostrophes; "[former student]" in Dr Black's second line is an added word in brackets.

## 2026-11-19 (09:40): three pieces brought over from the old site (styles now `site.css?v=5`)

- **Recorded lectures.** Talks page, under "Who is speaking": two links, the first-year metaphysics lecture of 4 May 2021 and the honours seminar on esotericism of 21 February 2024 (both on YouTube; links, not embedded players). Home page About: one link to the 2021 lecture.
- **The three-step lesson curve.** Talks page, in the Teach by Learning band: the old site's curve (Known, Challenge, Own) redrawn in gold, with his three sentences from the old site as a numbered list under it. It is a still drawing now; the old site's moving dot and tap-to-read are gone.
- **A sample for parents.** Home page, School English row: "See a sample: my lesson notes and quotation bank for a Macbeth essay" (the PDF already in `materials`; six pages, his own lesson notes for a Grade 10 revision lesson, not a learner handout, so it is labelled as notes).
- Left behind on purpose: the cabinets, the turning shapes, the coin, the constellation, the pop-ups, dark mode and the line drawing.

## 2026-11-19 (10:00): his five notes (styles now `site.css?v=6`)

- **The Macbeth sample is gone** from the School English row ("Unless you want to bring in the whole bookshelf, I don't really see the point"). The PDF is still in `materials`, unlinked.
- **The travelling light on the rings is gone** ("it looks out of place"). The rings still draw themselves once when they come into view; that was there before and he had called the strip "looking great". If he meant that too, remove the short script at the foot of `index.html` and the `.who.pre` rules.
- **Each service has a small picture:** a gold line drawing on a navy disc (book, graduate's cap, pencil on the home page; spark, chip, globe on the talks page).
- **Comments row:** the Garsfontein mentor's card now comes first.
- **Talks page rebuilt, simple** (his words: "either go simple or go all out, pick a lane"). Four blocks: the heading with one button; "Three sessions" as three rows in the same style as the coaching rows; one navy band with his photo, the head of department's quotation and three links (two lectures, the full resume); "Ask about a session". The three-step curve and its list are removed again; they belong on a full Teach by Learning page if that is ever built ("all out").

## 2026-11-19 (10:25): the line drawing in About (styles now `site.css?v=7`)

His one remaining issue was the headshot appearing twice on the home page. In About the photo is replaced by his line drawing (from the old site, redrawn in the site's navy as `assets/wehan-drawing.webp`, 640 pixels wide). He stands on the left and points at the sentence about him; the links and the email sit under it on a phone and beside the drawing on a wide screen. The photo stays in the navy strip under the headline and on the talks page. He called the talks page "perfect now".

## 2026-11-19 (10:40): About, his way (styles now `site.css?v=8`)

His notes: the figure should point at the examples under About, which can be squeezed or simplified to fit, and a line should cross the figure where it ends so the cut-off legs do not float. Now: the sentence about him comes first; under it the figure stands on a gold rule and points at three short links beside him ("Watch me teach", "Student evaluations", "Full resume"; the "Opens in…" notes are gone); the email and "Pretoria East, South Africa." sit under the rule.

## 2026-11-19 (10:50): comments as one scrolling band (styles now `site.css?v=9`)

His note: no main comment with the rest below it; one band, starting with the best one, then scroll; and make the section look better. Now: the heading, then one row of nine cards to swipe through, then the two arrow buttons with a count ("3 of 9"). The Garsfontein mentor comes first (his choice of the strongest), then the honours student on one-on-one consultations (the former large one), the lecturer (98), Abbotts (95), the honours student on writing, Dr Black, the two first-years, Prof Ruttkamp-Bloem. Each card: a gold opening quotation mark, the words in larger italic, a short gold rule above who said it, a gold line along the bottom. The two marks are small gold rings (98 and 95) in the card's corner, echoing the rings under the headline.

## 2026-11-19 (11:00): the comments put in order (styles now `site.css?v=10`)

His notes: the range and sequence felt random; the rings repeated numbers already shown; no square brackets in Dr Black's words. Now eight cards in three runs, each card labelled in its corner: three from school ("At school", "At school", "Teaching online"), three from one-to-one work and writing ("One to one", "On writing", "On writing"), then "On explaining" (the 2020 first-year) and "From my head of department". The 2021 first-year card is dropped (it said the same as the 2020 one). The rings are off the cards: the 98 is already in the strip under the headline, and the Abbotts 95 is now in that card's attribution. Dr Black's second line is replaced by two whole sentences from his letter ("He moves between close readings of Plato… My own writing is better for it."), so nothing is in brackets.

## 2026-11-19 (11:05): Dr Black's line put back; his AI line on the talks page (styles now `site.css?v=11`)

- Home, comments row: Dr Black's second line is his own sentence again, word for word and with nothing added: "I have yet to meet one who does not speak highly of him." The card's attribution now says it is about the honours seminars and his former students. (Claude had added "[former student]" in brackets earlier, then swapped the line; he said to revert.)
- Talks page, navy band: a second quotation beside the head of department's, from Dr Black: "I find his account of what cannot be automated in learning more persuasive than most of what I read on the subject." Attributed as "research collaborator, who works with AI systems daily" (his letter says so). Side by side on a wide screen, one under the other on a phone.
