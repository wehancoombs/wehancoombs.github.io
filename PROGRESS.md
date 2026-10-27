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

**Next**
- Wehan reviews and reassesses. Then push, or change things first.
- Ideas not done yet: a short video or audio clip in Threshold; a photo somewhere (the headshot is currently only used for link previews); sample lesson or rubric downloads in Teach.
- Possible later additions: a short "Teaching portfolio" page or section with sample lesson plans; a proper 404 page; a dark-mode variant if wanted.

**Decisions**
- Keep the single-page layout (uncluttered; everything one scroll away) rather than many pages.
- Keep EB Garamond + Source Sans 3 so the site matches the CVs.
- Dark mode is the default, with a light toggle (Wehan's choice, 2026-10-27).
- Phone number stays off the public site (email and LinkedIn only) unless Wehan wants it on.
- Local preview uses port 8931 because port 8765 is taken by another app on this computer.
- A `.claude/` folder holds the preview-server settings for Claude Code; it is ignored by git and never goes online.
