# Progress log: wehancoombs.github.io

Plain-words record of where the website stands. Newest entries at the bottom.

## What the site is for

One clear site for three audiences:

1. **Schools** hiring an English Home Language teacher (FET Phase).
2. **Universities** hiring a philosophy lecturer (Plato, Neoplatonism, esotericism).
3. **Freelance clients** for tutoring, TEFL, editing and learning design.

Feel: warm, scholarly, uncluttered. Plain static files (HTML + CSS), hosted on GitHub Pages. Must work well on phones.

## How to preview and publish

- **Preview on your computer:** open the folder `wehan-site` in File Explorer and double-click `index.html`. It opens in your browser. Nothing goes online.
- **Publish:** only when you say yes. Pushing to GitHub updates the live site at https://wehancoombs.github.io within about a minute.
- **The CV PDFs** are built from the HTML files in the sibling folder `wehan-cvs/cv-bundle` (see its README). Edit there, re-render, then copy the PDFs into `wehan-site/cv/`.

---

## 2026-10-27 (morning, VS Code session): first version

**Done**
- Single-page site (`index.html`) in a dark navy palette with sections: About, Teaching, Academic, Freelance, CVs, Contact.
- Headshot (`headshot.jpg`) and three two-page CV PDFs in `cv/`.
- Pushed to GitHub. The site is **live** at https://wehancoombs.github.io.

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

Wehan asked for a bold, visual, interactive portfolio with very few words, that can be explored to reveal everything. Built, previewed on desktop and phone, committed. **Not pushed yet.**

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
- `profile.html` is gone. All of its content, plus the whole teaching portfolio from the full resume (teaching philosophy, curriculum design, assessment, student support, evaluations, referees), now lives in 30 "sheets": panels that slide in from the right. Each has a title, the chapter colour, Previous/Next within its chapter, and a Map button. Escape or the × closes it. Opening a sheet puts `#s-name` in the address bar, so a sheet can be linked to directly (for example `wehancoombs.github.io/#s-courses`).
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

**Not pushed yet.**

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

**Not pushed yet** (two commits ahead of the live site once this one lands).

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

Wehan's fourth list, all done; committed, not pushed.

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

**Later the same night:** the welcome card now says "Hi, I’m Wehan.", and leaving it through "What I offer" no longer leaves the blurred backdrop behind (that route closed the card without clearing the scrim). Committed, not pushed.

---

## 2026-10-29: round five, the compact chapters

Wehan: "are you sure you can't make Teach, Think and Make a bit more compact? ... Keep what's crucial on the screen, let the rest be discoverable. Ideally a normal monitor shouldn't need awkward scrolling within the sections."

- **Teach, Think and Make each fit one screen** now, measured at 1366x768 and 1920x1080 (every chapter is exactly the height of the screen at both sizes). The blurb lines are gone; the rotating testimonial sits under the chapter title instead. Stats and a small CV seal sit to the right of the title. Headings, the shelf, the arc, the constellation and the service cards all scale with the height of the screen.
- **Teach:** the arc and the shelf side by side, both shorter; the poem fan still bursts out of the shelf.
- **Think:** the constellation beside the two lecture tiles; the study-guides bar sits under the tiles and opens to three columns of cards. The "Students say" and "Colleagues say" entries are one "Testimonials" sheet (students with the ratings, then colleagues and referees, then the school mentors); the old links still open it.
- **Make:** four compact cards. Each shows its little animation; hover (or keyboard focus) swaps it for the three deliverables, and Details opens the sheet. On phones the deliverables are simply listed. The "working with me" card is gone (the sheet remains, in the index line); the Freelance seal sits beside the title.
- Start here and Write also tightened so they fit a 1080-tall monitor and a 768-tall laptop respectively (the Start heading was wrapping to four lines on a big monitor).
- Checked at 1366x768, 1920x1080 and 375 wide; no console errors. Committed, not pushed.

**Later:** the 4.5 stat is gone from Think (the stars and the Testimonials sheet carry the ratings). Teach and Make now grow with the height of the screen: the shelf, the arc, the service cards and their visuals scale by a steeper rule than the screen itself, and on screens wider than 1700px the column widens to 1340px. Measured at 1366x768, 1920x1080 and 2560x1440: every chapter is exactly one screen tall. Committed, not pushed.
