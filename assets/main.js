/* ==========================================================
   Wehan Coombs · site behaviour
   Plain JavaScript, no libraries. Everything degrades gracefully.
   ========================================================== */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const root = document.documentElement, body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(hover: none), (pointer: coarse)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  const TAU = Math.PI * 2;
  $$('a[href$=".pdf"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
  const CH_LABEL = { threshold: 'Begin', start: 'Start here', teach: 'Teach', think: 'Think', make: 'Make', sofar: 'So far', write: 'Contact' };

  /* ---------- Colours (read from the CSS so both themes just work) ---------- */
  function cssVar(name, el) { return getComputedStyle(el || body).getPropertyValue(name).trim(); }
  function rgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const pal = {
    light: false, text: rgb('#ECE4D6'), gold: rgb('#C9A24D'),
    accent: rgb('#C9A24D'), target: rgb('#C9A24D'),
    refresh() {
      this.light = root.getAttribute('data-theme') === 'light';
      this.text = rgb(cssVar('--text'));
      this.gold = rgb(cssVar('--gold'));
      this.target = rgb(cssVar('--accent'));
    }
  };
  pal.refresh();

  /* ---------- Theme toggle ---------- */
  const themeBtn = $('#theme');
  const isLight = () => root.getAttribute('data-theme') === 'light';
  function paintTheme() {
    themeBtn.innerHTML = isLight() ? '☾<span class="lbl"> Dark</span>' : '☀<span class="lbl"> Light</span>';
    pal.refresh();
  }
  themeBtn.addEventListener('click', () => {
    body.classList.add('theming');
    if (isLight()) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
    try { localStorage.setItem('theme', isLight() ? 'light' : 'dark'); } catch (e) {}
    paintTheme();
    if (reduced) { pal.accent = Object.assign({}, pal.target); drawField(0); drawSolid(performance.now()); }
    setTimeout(() => body.classList.remove('theming'), 1000);
  });
  paintTheme();

  /* ---------- The CVs in the top bar: a dropdown on narrow screens ---------- */
  const cvs = $('#cvs'), cvsBtn = $('#cvs-btn');
  function closeCvs() { if (!cvs.classList.contains('on')) return; cvs.classList.remove('on'); cvsBtn.setAttribute('aria-expanded', 'false'); }
  cvsBtn.addEventListener('click', e => { e.stopPropagation(); const on = cvs.classList.toggle('on'); cvsBtn.setAttribute('aria-expanded', on ? 'true' : 'false'); });
  document.addEventListener('click', closeCvs);

  /* ---------- Background field: drifting stars joined by faint lines ---------- */
  const field = $('#field'), fx = field.getContext('2d');
  let FW = 0, FH = 0, parts = [];
  const mouse = { x: .5, y: .5, tx: .5, ty: .5 };
  function sizeField() {
    FW = innerWidth; FH = innerHeight;
    field.width = Math.round(FW * DPR); field.height = Math.round(FH * DPR);
    fx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.min(Math.round(FW * FH / 9000), coarse ? 70 : 170);
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * FW, y: Math.random() * FH, z: .3 + Math.random() * .7,
      vx: (Math.random() - .5) * .14, vy: (Math.random() - .5) * .14,
      r: .6 + Math.random() * 1.3, p: Math.random() * TAU
    }));
  }
  const lantern = $('#lantern');
  window.addEventListener('mousemove', e => {
    mouse.tx = e.clientX / FW; mouse.ty = e.clientY / FH;
    if (!coarse) { lantern.style.transform = 'translate(' + (e.clientX - 320) + 'px,' + (e.clientY - 320) + 'px)'; body.classList.add('lit'); }
  }, { passive: true });
  document.addEventListener('mouseleave', () => body.classList.remove('lit'));
  let pageVisible = true;
  document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; });

  function drawField(t) {
    fx.clearRect(0, 0, FW, FH);
    const a = pal.accent, k = reduced ? 1 : .04;
    a.r += (pal.target.r - a.r) * k; a.g += (pal.target.g - a.g) * k; a.b += (pal.target.b - a.b) * k;
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    const ox = (mouse.x - .5) * 50, oy = (mouse.y - .5) * 50;
    const light = pal.light, tc = pal.text, pts = [];
    for (const p of parts) {
      {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = FW + 10; else if (p.x > FW + 10) p.x = -10;
        if (p.y < -10) p.y = FH + 10; else if (p.y > FH + 10) p.y = -10;
      }
      const x = p.x + ox * p.z, y = p.y + oy * p.z;
      const tw = .55 + .45 * Math.sin(t * .0012 + p.p);
      pts.push({ x, y });
      fx.beginPath(); fx.arc(x, y, p.r * p.z + .3, 0, TAU);
      fx.fillStyle = 'rgba(' + tc.r + ',' + tc.g + ',' + tc.b + ',' + ((light ? .3 : .75) * tw).toFixed(3) + ')';
      fx.fill();
    }
    const R = 120, R2 = R * R, base = light ? .18 : .2;
    const col = (a.r | 0) + ',' + (a.g | 0) + ',' + (a.b | 0);
    fx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          fx.strokeStyle = 'rgba(' + col + ',' + ((1 - Math.sqrt(d2) / R) * base).toFixed(3) + ')';
          fx.beginPath(); fx.moveTo(pts[i].x, pts[i].y); fx.lineTo(pts[j].x, pts[j].y); fx.stroke();
        }
      }
    }
  }

  /* ---------- The Platonic solids (after Timaeus) ---------- */
  const PHI = (1 + Math.sqrt(5)) / 2;
  function cubeV() { const v = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) v.push([x, y, z]); return v; }
  function icoV() { const v = []; for (const a of [-1, 1]) for (const b of [-1, 1]) { v.push([0, a, b * PHI]); v.push([a, b * PHI, 0]); v.push([a * PHI, 0, b]); } return v; }
  function dodV() { const v = cubeV(); for (const a of [-1, 1]) for (const b of [-1, 1]) { v.push([0, a / PHI, b * PHI]); v.push([a / PHI, b * PHI, 0]); v.push([a * PHI, 0, b / PHI]); } return v; }
  function build(name, el, verts) {
    const v = verts.map(p => { const l = Math.hypot(p[0], p[1], p[2]); return [p[0] / l, p[1] / l, p[2] / l]; });
    let min = 1e9;
    for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) {
      const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]); if (d < min) min = d;
    }
    const e = [];
    for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) {
      const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]); if (Math.abs(d - min) < 1e-4) e.push([i, j]);
    }
    return { name, el, v, e };
  }
  const SOLIDS = [
    build('Tetrahedron', 'Fire', [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]),
    build('Cube', 'Earth', cubeV()),
    build('Octahedron', 'Air', [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]),
    build('Icosahedron', 'Water', icoV()),
    build('Dodecahedron', 'The cosmos', dodV())
  ];
  const sc = $('#solid'), sx = sc.getContext('2d');
  let SW = 0;
  function sizeSolid() {
    SW = sc.getBoundingClientRect().width || 300;
    sc.width = Math.round(SW * DPR); sc.height = Math.round(SW * DPR);
    sx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  const S = { cur: 4, nxt: -1, mix: 0, ax: .55, ay: .35, vx: 0, vy: 0, tx: 0, ty: 0, drag: null, last: performance.now(), lastSwitch: performance.now(), labelDone: false };
  const elLabel = $('#solid-el'), nameLabel = $('#solid-name');
  function setLabel(i) { elLabel.textContent = SOLIDS[i].el; nameLabel.textContent = SOLIDS[i].name; }
  function switchSolid() { if (S.nxt >= 0) return; S.nxt = (S.cur + 1) % SOLIDS.length; S.mix = 0; S.labelDone = false; }
  function rot(p, ax, ay) {
    const cy = Math.cos(ax), sy = Math.sin(ax);
    const y1 = p[1] * cy - p[2] * sy, z1 = p[1] * sy + p[2] * cy;
    const cx = Math.cos(ay), sxx = Math.sin(ay);
    return [p[0] * cx + z1 * sxx, y1, -p[0] * sxx + z1 * cx];
  }
  function drawOne(s, alpha, scale, cx, cy, R) {
    const col = pal.gold, tc = pal.text, ax = S.ax + S.tx, ay = S.ay + S.ty;
    const pts = s.v.map(p => { const q = rot(p, ax, ay); const f = 3.4 / (3.4 - q[2] * scale); return { x: cx + q[0] * scale * R * f, y: cy + q[1] * scale * R * f, z: q[2] }; });
    for (const e of s.e) {
      const A = pts[e[0]], B = pts[e[1]], z = (A.z + B.z) / 2, dep = (z + 1) / 2;
      sx.strokeStyle = 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',' + (alpha * (.2 + .6 * dep)).toFixed(3) + ')';
      sx.lineWidth = .8 + .8 * dep;
      sx.beginPath(); sx.moveTo(A.x, A.y); sx.lineTo(B.x, B.y); sx.stroke();
    }
    for (const p of pts) {
      const dep = (p.z + 1) / 2, al = alpha * (.3 + .7 * dep);
      sx.fillStyle = 'rgba(' + col.r + ',' + col.g + ',' + col.b + ',' + (al * .28).toFixed(3) + ')';
      sx.beginPath(); sx.arc(p.x, p.y, 6.5, 0, TAU); sx.fill();
      sx.fillStyle = 'rgba(' + tc.r + ',' + tc.g + ',' + tc.b + ',' + al.toFixed(3) + ')';
      sx.beginPath(); sx.arc(p.x, p.y, 2.2, 0, TAU); sx.fill();
    }
  }
  function drawSolid(t) {
    const dt = Math.min(50, t - S.last); S.last = t;
    sx.clearRect(0, 0, SW, SW);
    if (!S.drag) { S.ax += .00016 * dt + S.vx; S.ay += .00026 * dt + S.vy; S.vx *= .94; S.vy *= .94; }
    if (!coarse) { S.tx += ((mouse.y - .5) * .45 - S.tx) * .04; S.ty += ((mouse.x - .5) * .45 - S.ty) * .04; }
    const cx = SW / 2, cy = SW / 2, R = SW * .36;
    const br = .5 + .5 * Math.sin(t * .0006), g = pal.gold;
    const grad = sx.createRadialGradient(cx, cy, R * .2, cx, cy, R * 1.5);
    grad.addColorStop(0, 'rgba(' + g.r + ',' + g.g + ',' + g.b + ',' + ((pal.light ? .09 : .13) * br + .04).toFixed(3) + ')');
    grad.addColorStop(1, 'rgba(' + g.r + ',' + g.g + ',' + g.b + ',0)');
    sx.fillStyle = grad; sx.fillRect(0, 0, SW, SW);
    if (S.nxt < 0 && !S.drag && t - S.lastSwitch > 9000) switchSolid();
    if (S.nxt >= 0) {
      S.mix = Math.min(1, S.mix + dt / 1500);
      const m = S.mix < .5 ? 2 * S.mix * S.mix : 1 - Math.pow(-2 * S.mix + 2, 2) / 2;
      drawOne(SOLIDS[S.cur], 1 - m, 1 + .14 * m, cx, cy, R);
      drawOne(SOLIDS[S.nxt], m, .86 + .14 * m, cx, cy, R);
      if (!S.labelDone && m > .5) { setLabel(S.nxt); S.labelDone = true; }
      if (S.mix >= 1) { S.cur = S.nxt; S.nxt = -1; S.lastSwitch = t; }
    } else {
      drawOne(SOLIDS[S.cur], 1, 1, cx, cy, R);
    }
  }
  sc.addEventListener('pointerdown', e => { S.drag = { x: e.clientX, y: e.clientY, moved: 0 }; sc.setPointerCapture(e.pointerId); sc.classList.add('dragging'); });
  sc.addEventListener('pointermove', e => {
    if (!S.drag) return;
    const dx = e.clientX - S.drag.x, dy = e.clientY - S.drag.y;
    S.drag.x = e.clientX; S.drag.y = e.clientY; S.drag.moved += Math.abs(dx) + Math.abs(dy);
    S.ay += dx * .008; S.ax -= dy * .008; S.vy = dx * .0012; S.vx = -dy * .0012;
  });
  function endDrag() { if (!S.drag) return; const tap = S.drag.moved < 6; S.drag = null; sc.classList.remove('dragging'); if (tap) switchSolid(); }
  sc.addEventListener('pointerup', endDrag); sc.addEventListener('pointercancel', endDrag);
  sc.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchSolid(); } });
  let heroVisible = true;
  new IntersectionObserver(es => { heroVisible = es[0].isIntersecting; }, { threshold: 0 }).observe(sc);

  /* ---------- Which chapter are we in? (dots, accent colour) ---------- */
  const chapters = $$('.chapter'), dots = $$('.dots a');
  const chapIO = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      body.dataset.chapter = e.target.id;
      dots.forEach(d => { if (d.getAttribute('href') === '#' + e.target.id) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      pal.refresh();
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  chapters.forEach(c => chapIO.observe(c));

  /* ---------- Settle on a whole chapter ---------- */
  // You scroll freely. When you stop, the page eases to the nearest place where one chapter fills the screen.
  // A chapter taller than the screen scrolls freely inside itself; the foot of the page is a resting place too.
  // Phones and tablets (touch screens, or anything up to 1024px wide) are left alone: their own momentum scrolling fights it.
  let settleTimer = null;
  function settle() {
    if (body.classList.contains('locked')) return;
    if (coarse || innerWidth <= 1024) return; // phones and tablets scroll freely
    const y = scrollY, vh = innerHeight, max = Math.max(0, document.documentElement.scrollHeight - vh);
    const targets = [max];
    for (const c of chapters) {
      const top = Math.round(c.getBoundingClientRect().top + y), h = c.offsetHeight;
      if (top <= y + 2 && top + h >= y + vh - 2) return; // one chapter already fills the screen
      targets.push(top);
      if (h > vh) targets.push(top + h - vh);
    }
    let best = -1, bd = Infinity;
    for (const t of targets) { const d = Math.abs(t - y); if (d < bd) { bd = d; best = t; } }
    if (best < 0 || bd < 2 || bd > vh * .3) return;
    window.scrollTo({ top: best, behavior: reduced ? 'auto' : 'smooth' });
  }
  window.addEventListener('scroll', () => { clearTimeout(settleTimer); settleTimer = setTimeout(settle, 450); }, { passive: true });

  // The scroll cue on the first screen goes once the visitor starts scrolling.
  const cue = $('.cue');
  if (cue) {
    const hideCue = () => { if (scrollY > 40) { cue.classList.add('gone'); window.removeEventListener('scroll', hideCue); } };
    window.addEventListener('scroll', hideCue, { passive: true });
    hideCue();
  }

  /* ---------- Reveal on scroll ---------- */
  const revIO = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); } }); }, { threshold: .12 });
  const onScreen = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight * .95 && r.bottom > 0; };
  $$('.reveal').forEach(el => {
    if (onScreen(el)) { el.classList.add('in'); return; }
    const sib = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
    el.style.transitionDelay = (sib.indexOf(el) * 110) + 'ms';
    revIO.observe(el);
  });
  setTimeout(() => $$('.reveal').forEach(el => { if (onScreen(el) && !el.classList.contains('in')) { el.style.transition = 'none'; el.classList.add('in'); } }), 2500);

  /* ---------- Counting numbers and the star rating ---------- */
  const cntIO = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      cntIO.unobserve(e.target);
      const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '', dec = +(el.dataset.decimals || 0), group = !!el.dataset.group, t0 = performance.now(), dur = 1600;
      const fmt = v => (dec ? v.toFixed(dec) : (group ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)))) + suf;
      if (reduced) { el.textContent = fmt(to); return; }
      (function step(t) {
        const p = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - p, 3));
        el.textContent = fmt(v);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(el => cntIO.observe(el));
  const starIO = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      starIO.unobserve(e.target);
      const r = +e.target.dataset.rating || 0;
      requestAnimationFrame(() => { $('.stars-fg', e.target).style.width = (r / 5 * 100).toFixed(1) + '%'; });
    });
  }, { threshold: .6 });
  $$('.stars').forEach(el => starIO.observe(el));

  /* ---------- The library, the sheet and the map ---------- */
  const library = {};
  $$('#library article').forEach(a => { library[a.id.replace(/^s-/, '')] = { title: a.dataset.title, ch: a.dataset.ch, html: a.innerHTML }; });
  library.evaluations = library.said = library.testimonials; // old links still open the testimonials

  /* ---------- Request sheets: a drafted message you can send from your email app, from Gmail, or copy ---------- */
  const EMAIL = 'wehancoombs@gmail.com';
  // Paste a booking link here (a Google Calendar appointment page, or Calendly) and every request sheet gets a "Book a call" button. Empty hides it.
  const BOOKING_URL = '';
  const REQUESTS = {
    tutoring: { ch: 'make', title: 'Request tutoring', subject: 'Tutoring request', intro: 'Tell me the subject, the level and when suits you. I reply with a plan, a rate and a start date.', body: 'Hi Wehan,\n\nI’d like to ask about tutoring.\n\nSubject and grade or level: \nWhen and how often: \nIn person or online: \n\nThanks,\n' },
    editing: { ch: 'make', title: 'Request editing', subject: 'Editing request', intro: 'Tell me what the document is and when you need it back. I reply with a rate and a date.', body: 'Hi Wehan,\n\nI’d like to ask about editing.\n\nWhat the document is and roughly how long: \nWhen I need it back: \n\nThanks,\n' },
    design: { ch: 'make', title: 'Request learning design', subject: 'Learning design request', intro: 'Tell me what you need built and who it is for. I reply with a plan, a rate and a timeline.', body: 'Hi Wehan,\n\nI’d like to ask about learning design.\n\nWhat I need built: \nWho it is for: \nWhen I need it: \n\nThanks,\n' },
    consulting: { ch: 'make', title: 'Request consulting', subject: 'Consulting request', intro: 'Tell me the question and who it is for. I reply with a proposal and a rate.', body: 'Hi Wehan,\n\nI’d like to talk about philosophical and AI consulting.\n\nFor me personally, or for a school, team or organisation: \nThe question or situation: \nA talk, a workshop, a written brief, or a conversation: \n\nThanks,\n' },
    any: { ch: 'write', title: 'Write to me', subject: 'Hello', intro: 'For anything else: a post, a reference, a question, a hello.', body: 'Hi Wehan,\n\n\n\nThanks,\n' }
  };
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  Object.keys(REQUESTS).forEach(k => {
    const r = REQUESTS[k];
    library['request-' + k] = { title: r.title, ch: r.ch, html:
      '<p class="when">' + r.intro + '</p>' +
      '<div class="req" data-kind="' + k + '">' +
        '<label class="req-label" for="req-body">Your message <small>change anything you like</small></label>' +
        '<textarea id="req-body" class="req-body" rows="9" spellcheck="false">' + esc(r.body) + '</textarea>' +
        '<div class="req-actions">' +
          '<button class="btn solid" type="button" data-send="mail">Send from my email app</button>' +
          '<button class="btn" type="button" data-send="gmail">Send from Gmail</button>' +
          '<button class="btn" type="button" data-send="copy">Copy the message</button>' +
        '</div>' +
        '<p class="req-to">To <button type="button" class="inline" data-copy="' + EMAIL + '">' + EMAIL + '</button> · subject: ' + r.subject + '</p>' +
        (BOOKING_URL ? '<p class="more"><a class="btn" href="' + BOOKING_URL + '" target="_blank" rel="noopener">Book a call instead ↗</a></p>' : '') +
      '</div>' };
  });
  function copyText(t) {
    const legacy = () => new Promise((res, rej) => {
      const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); ok ? res() : rej();
    });
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t).catch(legacy);
    return legacy();
  }
  function flash(btn, msg) { const old = btn.textContent; btn.textContent = msg; btn.disabled = true; setTimeout(() => { btn.textContent = old; btn.disabled = false; }, 1800); }
  function activateRequest(container) {
    const form = $('.req', container); if (!form) return;
    const r = REQUESTS[form.dataset.kind], ta = $('.req-body', form);
    form.addEventListener('click', e => {
      const b = e.target.closest('[data-send]'); if (!b) return;
      const text = ta.value;
      if (b.dataset.send === 'mail') location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(r.subject) + '&body=' + encodeURIComponent(text);
      else if (b.dataset.send === 'gmail') window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(EMAIL) + '&su=' + encodeURIComponent(r.subject) + '&body=' + encodeURIComponent(text), '_blank', 'noopener');
      else copyText('To: ' + EMAIL + '\nSubject: ' + r.subject + '\n\n' + text).then(() => flash(b, 'Copied ✓'), () => flash(b, 'Could not copy'));
    });
  }
  const ORDER = {};
  $$('.map-group').forEach(g => { ORDER[g.dataset.ch] = $$('[data-sheet]', g).map(b => b.dataset.sheet); });

  const scrim = $('#scrim'), sheet = $('#sheet'), sheetCh = $('#sheet-ch'), sheetTitle = $('#sheet-title'), sheetBody = $('#sheet-body'), sheetWhere = $('#sheet-where');
  const map = $('#map'), mapBtn = $('#map-btn');
  let openId = null, lastFocus = null, sheetTimer = null, mapTimer = null;

  function showScrim() { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('on')); }
  function hideScrimIfIdle() { if (sheet.classList.contains('on') || map.classList.contains('on') || welcomeOpen) return; scrim.classList.remove('on'); setTimeout(() => { if (!scrim.classList.contains('on')) scrim.hidden = true; }, 360); }
  function lock() { body.classList.add('locked'); }
  function unlockIfIdle() { if (!sheet.classList.contains('on') && !map.classList.contains('on')) body.classList.remove('locked'); }

  function activateEmbeds(container) {
    $$('.embed', container).forEach(e => {
      if (e.querySelector('iframe')) return;
      const f = document.createElement('iframe');
      f.src = e.dataset.src; f.loading = 'lazy'; f.setAttribute('allow', 'autoplay; fullscreen'); f.setAttribute('allowfullscreen', '');
      f.title = sheetTitle.textContent;
      e.appendChild(f);
    });
  }

  function openSheet(id) {
    const item = library[id];
    if (!item) return;
    clearTimeout(sheetTimer);
    closeWelcome(true);
    if (map.classList.contains('on')) closeMap(true);
    if (!sheet.classList.contains('on')) lastFocus = document.activeElement;
    openId = id;
    sheet.dataset.ch = item.ch;
    sheetCh.textContent = CH_LABEL[item.ch] || '';
    sheetTitle.textContent = item.title;
    sheetBody.innerHTML = item.html;
    sheetBody.scrollTop = 0;
    activateEmbeds(sheetBody); activateRequest(sheetBody);
    const order = ORDER[item.ch] || [], i = order.indexOf(id);
    $('#sheet-prev').disabled = !(i > 0); $('#sheet-next').disabled = !(i >= 0 && i < order.length - 1);
    sheetWhere.textContent = i >= 0 ? (i + 1) + ' of ' + order.length + ' · ' + (CH_LABEL[item.ch] || '') : '';
    sheet.hidden = false; showScrim(); lock();
    requestAnimationFrame(() => { sheet.classList.add('on'); sheetTitle.focus({ preventScroll: true }); });
    try { history.replaceState(null, '', '#s-' + id); } catch (e) {}
  }
  function closeSheet() {
    if (!sheet.classList.contains('on')) return;
    sheet.classList.remove('on'); openId = null;
    sheetTimer = setTimeout(() => { sheet.hidden = true; sheetBody.innerHTML = ''; }, 460);
    unlockIfIdle(); hideScrimIfIdle();
    try { history.replaceState(null, '', location.pathname + (body.dataset.chapter ? '#' + body.dataset.chapter : '')); } catch (e) {}
    if (lastFocus && lastFocus.focus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; }
  }
  function stepSheet(d) {
    if (!openId) return;
    const order = ORDER[library[openId].ch] || [], i = order.indexOf(openId);
    if (i < 0) return;
    const n = order[i + d];
    if (n) openSheet(n);
  }
  $('#sheet-close').addEventListener('click', closeSheet);
  $('#sheet-prev').addEventListener('click', () => stepSheet(-1));
  $('#sheet-next').addEventListener('click', () => stepSheet(1));

  function openMap() {
    clearTimeout(mapTimer);
    if (sheet.classList.contains('on')) closeSheet();
    lastFocus = document.activeElement;
    map.hidden = false; showScrim(); lock();
    mapBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => { map.classList.add('on'); $('#map-close').focus({ preventScroll: true }); });
  }
  function closeMap(keepLock) {
    if (!map.classList.contains('on')) return;
    map.classList.remove('on');
    mapBtn.setAttribute('aria-expanded', 'false');
    mapTimer = setTimeout(() => { map.hidden = true; }, 460);
    if (!keepLock) { unlockIfIdle(); hideScrimIfIdle(); if (lastFocus && lastFocus.focus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; } }
  }
  mapBtn.addEventListener('click', () => { if (map.classList.contains('on')) closeMap(); else openMap(); });
  $('#map-close').addEventListener('click', () => closeMap());
  scrim.addEventListener('click', () => { closeSheet(); closeMap(); closeWelcome(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSheet(); closeMap(); closeCvs(); closeWelcome(); } });

  /* ---------- Welcome: a card on the first visit of a session ---------- */
  const welcome = $('#welcome');
  let welcomeOpen = false;
  function closeWelcome(keep) {
    if (!welcomeOpen) return;
    welcomeOpen = false; welcome.classList.remove('on');
    setTimeout(() => { welcome.hidden = true; }, 480);
    if (!keep) { unlockIfIdle(); hideScrimIfIdle(); }
  }
  function openWelcome() {
    welcomeOpen = true; welcome.hidden = false; showScrim(); lock();
    requestAnimationFrame(() => { welcome.classList.add('on'); $('#welcome-go').focus({ preventScroll: true }); });
  }
  $('#welcome-close').addEventListener('click', () => closeWelcome());
  $('#welcome-go').addEventListener('click', () => closeWelcome());
  (function () {
    let seen = false; try { seen = sessionStorage.getItem('welcomed') === '1'; } catch (e) {}
    if (seen || location.hash.startsWith('#s-')) return;
    try { sessionStorage.setItem('welcomed', '1'); } catch (e) {}
    setTimeout(openWelcome, 700);
  })();

  function goTo(sel) {
    const el = $(sel);
    if (!el) return;
    closeSheet(); closeMap(); closeWelcome();
    body.classList.remove('locked');
    setTimeout(() => el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }), 60);
  }

  // One listener for every "open this" button on the page, in the map and inside sheets.
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-copy]');
    if (c) { e.preventDefault(); copyText(c.dataset.copy).then(() => flash(c, 'Copied ✓'), () => flash(c, 'Could not copy')); return; }
    const s = e.target.closest('[data-sheet]');
    if (s) { e.preventDefault(); const id = s.dataset.sheet, ch = library[id] && library[id].ch; const sec = ch && $('#' + ch); if (sec && map.classList.contains('on') && body.dataset.chapter !== ch) { sec.scrollIntoView({ behavior: 'auto', block: 'start' }); } openSheet(id); return; }
    const g = e.target.closest('[data-goto]');
    if (g) { e.preventDefault(); goTo(g.dataset.goto); return; }
  });
  function openFromHash() {
    const h = location.hash || '';
    if (h.startsWith('#s-')) { const id = h.slice(3); if (library[id]) { const ch = library[id].ch, sec = $('#' + ch); if (sec) sec.scrollIntoView({ behavior: 'auto', block: 'start' }); openSheet(id); } }
  }
  window.addEventListener('hashchange', openFromHash);

  /* ---------- Voices: what students, mentors and colleagues say, one at a time ---------- */
  const VOICES = {
    teach: { more: 'testimonials', items: [
      ['Excellent knowledge and innovative way of using media.', 'University of Pretoria mentor lecturer · observed Grade 11 poetry lesson, 2026 · 98 out of 100'],
      ['Enhanced the learners’ vocabulary through scaffolding.', 'Mentor teacher, Abbotts College Pretoria East · formal assessment, 2026 · 95 out of 100'],
      ['Dr Coombs was in total control of the material and guided and facilitated student learning actively by successfully engaging students in learning.', 'Prof Emma Ruttkamp-Bloem · lecture observation, University of Pretoria'],
      ['He is friendly but also firm in terms of discipline.', 'Prof Emma Ruttkamp-Bloem · peer evaluation report, 2026'],
      ['Mr Coombs does an incredible job at grabbing our attention and forcing us to truly think and be present.', 'A first-year student, 2023']
    ] },
    think: { more: 'testimonials', items: [
      ['In 2019 I noted that Dr Coombs had the potential to become a brilliant lecturer. In the years since, he has more than fulfilled that potential, and I recommend him without reservation.', 'Prof Emma Ruttkamp-Bloem · Head of Philosophy, University of Pretoria, 2026'],
      ['His dissertation was a careful, scholarly, deep investigation into the Platonic method.', 'Prof John F. Finamore · Emeritus Professor of Classics, University of Iowa, 2026'],
      ['This is an exceptional thesis. I recommend this thesis receive a PhD without reservation.', 'PhD examiner · Ainigma, 2023'],
      ['A creative and rigorous scholar, and among the most capable early-career philosophers I have worked with.', 'Dr Mitchell-Ron Black · research collaborator, 2026'],
      ['Without exaggeration, those seminars changed the way I write and engage with the tradition in which I am trained.', 'Dr Mitchell-Ron Black · on the honours seminars, 2026'],
      ['Wehan is an excellent teacher and researcher who knows Plato’s philosophy well.', 'Prof John F. Finamore · Emeritus Professor of Classics, University of Iowa, 2026'],
      ['Mr Coombs is a fantastic lecturer who manages to explain deep philosophical topics in a manner that is easy to grasp.', 'A first-year student, 2020'],
      ['The content was by far the most complex and difficult material I have encountered in my academic career so far, but the way in which seminars were presented made it much easier to grapple with.', 'An honours student, 2024'],
      ['It is needless to say this course has been my favorite in honours so far.', 'An honours student, 2025']
    ] },
    make: { more: 'testimonials', items: [
      ['One-on-one consultations were especially useful for receiving advice and insights for essays and assignments. Additionally, assignment feedback was always helpful and detailed.', 'An honours student, 2024'],
      ['Dr. Coombs is passionate and knowledgeable in his field, he has the ability to simplify complex ideas, which is helpful as a student.', 'An honours student, 2024'],
      ['Professor Coombs is able to explain abstract concepts in a way that makes it easy to understand.', 'A first-year student, 2023'],
      ['He moves between close readings of Plato and present concerns without flattening either, bringing out the best in the people he works with as he goes along.', 'Dr Mitchell-Ron Black · research collaborator, 2026'],
      ['Students describe the seminars as challenging but highly interactive, and comment on his command of the material, his ability to make complex ideas accessible, his availability for consultation and the good organisation of his modules.', 'Prof Emma Ruttkamp-Bloem · peer evaluation report, 2026']
    ] }
  };
  $$('.voices[data-set]').forEach(box => {
    const set = VOICES[box.dataset.set]; if (!set) return;
    let i = 0, timer = null, visible = false;
    box.innerHTML = '<figure class="voice"><p></p><figcaption></figcaption></figure><div class="voices-nav">' +
      set.items.map((_, k) => '<button type="button" aria-label="Quotation ' + (k + 1) + ' of ' + set.items.length + '"></button>').join('') +
      '<button class="textlink" type="button" data-sheet="' + set.more + '">More →</button></div>';
    const fig = $('.voice', box), p = $('p', fig), cap = $('figcaption', fig), dots = $$('.voices-nav button:not(.textlink)', box);
    function show(k, instant) {
      i = (k + set.items.length) % set.items.length;
      const go = () => { p.textContent = set.items[i][0]; cap.textContent = set.items[i][1]; fig.classList.remove('swap'); dots.forEach((d, n) => { if (n === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); }); };
      if (instant || reduced) go(); else { fig.classList.add('swap'); setTimeout(go, 360); }
    }
    function arm() { clearTimeout(timer); if (!visible) return; timer = setTimeout(() => { show(i + 1); arm(); }, 8000); }
    dots.forEach((d, k) => d.addEventListener('click', () => { show(k); arm(); }));
    box.addEventListener('mouseenter', () => clearTimeout(timer));
    box.addEventListener('mouseleave', arm);
    new IntersectionObserver(es => { visible = es[0].isIntersecting; arm(); }, { threshold: .3 }).observe(box);
    show(0, true);
  });

  /* ---------- The arc of a lesson ---------- */
  const arcPath = $('#arcpath'), runner = $('.runner'), arcNodes = $$('.arc .node'), arcText = $('#arc-text');
  const arcLen = arcPath.getTotalLength();
  function fracAt(x, y) {
    let best = 0, bd = 1e12;
    for (let i = 0; i <= 300; i++) { const p = arcPath.getPointAtLength(arcLen * i / 300); const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; best = i / 300; } }
    return best;
  }
  const fr = arcNodes.map(n => fracAt(+n.dataset.x, +n.dataset.y));
  fr[0] = 0; fr[fr.length - 1] = 1;
  const A = { phase: 0, hold: performance.now() + 3000, last: performance.now(), idx: -1, visible: false };
  new IntersectionObserver(es => { A.visible = es[0].isIntersecting; }, { threshold: .2 }).observe($('.arc'));
  function setArc(i) {
    if (A.idx === i) return;
    A.idx = i;
    arcNodes.forEach((n, k) => { n.classList.toggle('is-on', k === i); n.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
    arcText.classList.add('swap');
    setTimeout(() => { arcText.textContent = arcNodes[i].dataset.text; arcText.classList.remove('swap'); }, 200);
  }
  function placeRunner() { const p = arcPath.getPointAtLength(A.phase * arcLen); runner.setAttribute('cx', p.x); runner.setAttribute('cy', p.y); }
  function arcTick(t) {
    const dt = Math.min(60, t - A.last); A.last = t;
    if (!A.visible || t < A.hold) { placeRunner(); return; }
    const prev = A.phase;
    if (A.idx === 2 && prev >= 1) { A.phase = 0; A.hold = t + 3000; setArc(0); placeRunner(); return; }
    let ph = prev + dt / 12000;
    for (let k = 1; k < fr.length; k++) { if (prev < fr[k] && ph >= fr[k]) { ph = fr[k]; A.hold = t + 3200; setArc(k); break; } }
    A.phase = ph; placeRunner();
  }
  setArc(0);
  arcNodes.forEach((n, i) => {
    const go = () => { A.phase = fr[i]; A.hold = performance.now() + 7000; setArc(i); placeRunner(); };
    n.addEventListener('click', go);
    n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });

  /* ---------- The shelf: what I taught in 2026 ---------- */
  const SHELF = {
    macbeth: { cap: '<strong>Macbeth.</strong> Grade 10 Home Language, three classes, August. Whose fault is the murder, a banquet with an empty chair, and a revision sheet of my own.', sheet: 'macbeth' },
    tempest: { cap: '<strong>The Tempest.</strong> Grade 11 Home Language, five classes. A scene a day through Act 3, staged with desks, sweets and thunder; then the RSC.', sheet: 'tempest' },
    grammar: { cap: '<strong>Grammar.</strong> Grade 10 First Additional Language at Hoërskool Garsfontein, May. Conditionals and prepositions, taught inside real situations.', sheet: 'grammar' },
    film: { cap: '<strong>Film study.</strong> Grade 11: the language of film, then a pub quiz on shots and angles. Grade 10: Spirited Away and Howl’s Moving Castle, with a method called FRAME.', sheet: 'film' },
    enrichment: { cap: '<strong>Philosophy for teenagers.</strong> Grade 11 enrichment, September. Prove your neighbour exists, trolley problems, an ask-me-anything, and English as the meta-skill.', sheet: 'enrichment' }
  };
  const POEMS = [
    { id: 'poem-words', title: 'Too Many Words', poet: 'Bernard Levinson', where: 'Gr 10 · Garsfontein' },
    { id: 'poem-clothes', title: 'The Clothes', poet: 'Mongane Wally Serote', where: 'Gr 10 · Garsfontein' },
    { id: 'poem-oompiet', title: 'For Oom Piet', poet: 'Finuala Dowling', where: 'Gr 11 · Abbotts' },
    { id: 'poem-herb', title: 'The Herb Garden', poet: 'Stephen Gray', where: 'Gr 11 · Abbotts' },
    { id: 'poem-poet', title: 'The Poet', poet: 'Shakespeare, A Midsummer Night’s Dream', where: 'Gr 11 · Abbotts' }
  ];
  const shelfDetail = $('#shelf-detail'), spines = $$('.shelf [data-item]');
  function showShelf(item) {
    spines.forEach(b => { const on = b.dataset.item === item; b.classList.toggle('is-on', on); if (b.dataset.item === 'poems') b.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    if (item === 'poems') {
      shelfDetail.innerHTML = '<div class="fan" role="group" aria-label="The five poems I taught">' + POEMS.map((p, i) =>
        '<button class="poem-card" type="button" data-sheet="' + p.id + '" style="animation-delay:' + (i * 90) + 'ms"><span class="p-title">' + p.title + '</span><span class="p-poet">' + p.poet + '</span><span class="p-where">' + p.where + '</span></button>').join('') + '</div>';
    } else {
      const d = SHELF[item];
      shelfDetail.innerHTML = '<p class="caption">' + d.cap + ' <button class="textlink" type="button" data-sheet="' + d.sheet + '">Open →</button></p>';
    }
  }
  spines.forEach(b => b.addEventListener('click', () => showShelf(b.dataset.item)));

  /* ---------- The constellation ---------- */
  const NODES = [
    { id: 'plato', x: 520, y: 225, r: 10, big: true, label: 'Plato',
      body: 'The centre of the map. My PhD, <em>Ainigma</em>, read Plato’s esotericism in its historical context: what he wrote, what he withheld, and why.',
      links: [['Ainigma: Plato’s Esotericism in Context (PhD, 2023)', 'https://repository.up.ac.za/handle/2263/89290']] },
    { id: 'aristotle', x: 205, y: 150, r: 6.5, label: 'Aristotle',
      body: 'My MA, <em>Symphonia</em>, argued that Aristotle stays in harmony with Plato on the separable, immortal soul. The argument became a journal article in 2017.',
      links: [['Aristotle’s harmony with Plato on separable and immortal soul (SAJP, 2017)', 'https://doi.org/10.1080/02580136.2017.1385951'], ['Symphonia: Aristotle versus Plato Critiqued (MA, 2016)', 'https://repository.up.ac.za/handle/2263/57175']] },
    { id: 'neo', x: 755, y: 148, r: 7.5, label: 'Neoplatonism',
      body: 'Plotinus, Iamblichus, Proclus. A member of the International Society for Neoplatonic Studies since 2017. In 2026 I designed and taught the honours course <em>Philosophy as a Rite of Rebirth: From Ancient Egypt to Neoplatonism</em>.', more: 'guide-c5' },
    { id: 'theurgy', x: 925, y: 55, r: 5.5, label: 'Theurgy',
      body: 'Ritual as philosophy in late Platonism. Conference paper: <em>The Curious Case of Neoplatonic Ritual Magic</em>, PSSA, University of KwaZulu-Natal, 2020.', more: 'papers' },
    { id: 'egypt', x: 965, y: 240, r: 5.5, label: 'Ancient Egypt',
      body: 'Where the rite of rebirth begins. The opening movement of the honours course <em>Philosophy as a Rite of Rebirth</em> (FIL710/810, 2026).', more: 'guide-c5' },
    { id: 'eso', x: 670, y: 335, r: 7.5, label: 'Esotericism',
      body: 'Hidden teachings, and how to read them. Honours course: <em>The (Secret) History of Thought</em> (2024, 2025). Paper: <em>Reflexive Esotericism: Insights from Literary and Theological Hermeneutics</em>, PSSA, 2025.', more: 'guide-c3' },
    { id: 'african', x: 880, y: 405, r: 6.5, label: 'African esotericism',
      body: 'Postdoctoral Research Fellow at the University of Johannesburg, 2024 to 2026: <em>Platonic and African Esotericism</em>, with an eye on decolonial curricula.', more: 'posts' },
    { id: 'life', x: 265, y: 325, r: 6.5, label: 'A way of life',
      body: 'Philosophy as practice, not only doctrine. Designed and taught <em>The Good Life</em> (FIL220, 2024).', more: 'guide-c4' },
    { id: 'nature', x: 115, y: 400, r: 5.5, label: 'Animism & nature',
      body: '<em>Animism, Consilience and the Rights of Nature</em>, co-presented at the South African Society for Environmental Philosophy, North-West University, 2025.', more: 'papers' },
    { id: 'rorty', x: 75, y: 250, r: 5, label: 'Rorty',
      body: 'An early article: <em>Contingency, irony and morality: a critical review of Rorty’s notion of the liberal utopia</em>, Humanities, 2013.',
      links: [['Read the article', 'https://doi.org/10.3390/h2020313']] },
    { id: 'meta', x: 450, y: 405, r: 5.5, label: 'Metacrisis',
      body: '<em>Is Philosophy A(gnostic)? Post-disciplinary Interventions in the Time of Metacrisis</em>, PSSA Annual Conference, University of Cape Town, 2026, with Mitchell Black.', more: 'papers' },
    { id: 'ai', x: 340, y: 55, r: 6.5, label: 'AI & the humanities',
      body: 'What is human teaching for, once a machine can write the essay? My current project, <em>Socratic Pedagogy beyond the AI Horizon</em>, reads Plato’s <em>Phaedrus</em> as a guide to what cannot be automated in learning, and to how teaching should be built around it. Proposed as a 2027 fellowship at the University of Pretoria.', more: 'ai' }
  ];
  const EDGES = [['plato', 'aristotle'], ['plato', 'neo'], ['plato', 'eso'], ['plato', 'life'], ['plato', 'rorty'], ['neo', 'theurgy'], ['neo', 'egypt'], ['theurgy', 'egypt'], ['eso', 'african'], ['eso', 'neo'], ['eso', 'meta'], ['life', 'nature'], ['life', 'meta'], ['nature', 'meta'], ['african', 'egypt'], ['plato', 'ai'], ['ai', 'life']];
  NODES.forEach(n => {
    const links = (n.links || []).map(l => '<li><a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + '</a></li>').join('');
    library['star-' + n.id] = { title: n.label, ch: 'think', html: '<p class="when">A star in my research</p><p>' + n.body + '</p>' + (links ? '<ul class="list">' + links + '</ul>' : '') + '<p class="more">' + (n.more ? '<button type="button" data-sheet="' + n.more + '">Go further →</button> ' : '') + '<button type="button" data-sheet="publications">Research and publications →</button></p>' };
  });
  const sky = $('#sky'), NS = 'http://www.w3.org/2000/svg';
  const mk = (n, a) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const byId = {}; NODES.forEach(n => { byId[n.id] = n; });
  const edgeEls = EDGES.map(([a, b]) => { const l = mk('line', { x1: byId[a].x, y1: byId[a].y, x2: byId[b].x, y2: byId[b].y }); l.dataset.a = a; l.dataset.b = b; sky.appendChild(l); return l; });
  const nodeEls = {};
  NODES.forEach(n => {
    const g = mk('g', { class: 'node' + (n.big ? ' big' : ''), tabindex: '0', role: 'button', 'aria-label': n.label });
    g.appendChild(mk('circle', { class: 'hit', cx: n.x, cy: n.y, r: 28 }));
    g.appendChild(mk('circle', { class: 'glow', cx: n.x, cy: n.y, r: n.r * 2.4 }));
    const d = mk('circle', { class: 'dot', cx: n.x, cy: n.y, r: n.r }); d.style.animationDelay = (-Math.random() * 5).toFixed(2) + 's'; g.appendChild(d);
    const tx = mk('text', { x: n.x, y: n.y + n.r + 24, 'text-anchor': 'middle' }); tx.textContent = n.label; g.appendChild(tx);
    sky.appendChild(g); nodeEls[n.id] = g;
    const lit = on => {
      g.classList.toggle('lit', on);
      edgeEls.forEach(l => {
        if (l.dataset.a !== n.id && l.dataset.b !== n.id) return;
        l.classList.toggle('lit', on);
        const o = l.dataset.a === n.id ? l.dataset.b : l.dataset.a;
        if (nodeEls[o]) nodeEls[o].classList.toggle('near', on);
      });
    };
    g.addEventListener('mouseenter', () => lit(true)); g.addEventListener('mouseleave', () => lit(false));
    g.addEventListener('focus', () => lit(true)); g.addEventListener('blur', () => lit(false));
    g.addEventListener('click', () => openSheet('star-' + n.id));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSheet('star-' + n.id); } });
  });
  const skyWrap = $('.sky');
  function centreSky() { if (skyWrap.scrollWidth > skyWrap.clientWidth + 4) skyWrap.scrollLeft = (skyWrap.scrollWidth - skyWrap.clientWidth) / 2; }
  centreSky(); window.addEventListener('resize', centreSky);

  /* ---------- The study guides, folded away until asked for ---------- */
  const gBtn = $('.guides-toggle'), gWrap = $('#guides');
  if (gBtn) gBtn.addEventListener('click', () => { const open = gWrap.hidden; gWrap.hidden = !open; gBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); });

  /* ---------- Lectures: the player loads when you press play ---------- */
  $$('.lecture').forEach(l => {
    $('.play', l).addEventListener('click', () => {
      if (l.classList.contains('playing')) return;
      const f = document.createElement('iframe');
      f.src = l.dataset.src; f.setAttribute('allow', 'autoplay; fullscreen'); f.setAttribute('allowfullscreen', ''); f.title = $('.l-cap strong', l).textContent;
      l.appendChild(f); l.classList.add('playing');
    });
  });

  /* ---------- The editing typewriter ---------- */
  const typer = $('#typer .txt');
  const PAIRS = [
    ['In order to write well, one must first read closely.', 'To write well, read closely.'],
    ['This essay will attempt to discuss the question of whether...', 'This essay argues that...'],
    ['It is a very unique and quite interesting argument.', 'It is a striking argument.'],
    ['Due to the fact that Macbeth is ambitious, he kills the king.', 'Ambition drives Macbeth to kill the king.']
  ];
  const wait = ms => new Promise(r => setTimeout(r, ms));
  (async function runTyper() {
    let i = 0;
    for (;;) {
      const a = PAIRS[i % PAIRS.length][0], b = PAIRS[i % PAIRS.length][1]; i++;
      for (let k = 1; k <= a.length; k++) { typer.textContent = a.slice(0, k); await wait(26); }
      await wait(1400);
      for (let k = a.length; k >= 0; k--) { typer.textContent = a.slice(0, k); await wait(11); }
      await wait(260);
      for (let k = 1; k <= b.length; k++) { typer.textContent = b.slice(0, k); await wait(38); }
      await wait(3000);
      for (let k = b.length; k >= 0; k--) { typer.textContent = b.slice(0, k); await wait(9); }
      await wait(500);
    }
  })();

  /* ---------- The design blocks ---------- */
  const blocks = $$('.blocks i');
  const LAYOUTS = [
    [[0, 0, 140, 26], [0, 32, 66, 26], [74, 32, 66, 26], [0, 64, 42, 26], [49, 64, 42, 26], [98, 64, 42, 26]],
    [[0, 0, 40, 90], [48, 0, 92, 20], [48, 26, 44, 28], [96, 26, 44, 28], [48, 60, 92, 12], [48, 76, 60, 14]],
    [[0, 0, 66, 42], [74, 0, 66, 42], [0, 48, 66, 42], [74, 48, 30, 42], [110, 48, 30, 20], [110, 72, 30, 18]],
    [[0, 0, 140, 16], [0, 20, 140, 16], [0, 40, 140, 16], [0, 60, 140, 16], [0, 80, 100, 10], [108, 80, 32, 10]]
  ];
  function layout(k) { LAYOUTS[k].forEach((r, i) => { const b = blocks[i]; b.style.transform = 'translate(' + r[0] + 'px,' + r[1] + 'px)'; b.style.width = r[2] + 'px'; b.style.height = r[3] + 'px'; }); }
  let lk = 0; layout(0);
  setInterval(() => { lk = (lk + 1) % LAYOUTS.length; layout(lk); }, 2800);

  /* ---------- The years: hover to peek, tap to open ---------- */
  const track = $('#track'), trackCap = $('#track-cap'), evs = $$('.ev');
  ORDER.sofar = [];
  evs.forEach(li => {
    const b = $('button', li), id = 'year-' + b.dataset.year;
    ORDER.sofar.push(id);
    library[id] = { title: b.dataset.year + ' · ' + b.dataset.label, ch: 'sofar', html: '<p>' + b.dataset.cap + '</p>' + (b.dataset.more && library[b.dataset.more] ? '<p class="more"><button type="button" data-sheet="' + b.dataset.more + '">Go further →</button></p>' : '') };
    b.dataset.sheet = id;
    li.addEventListener('mouseenter', () => { trackCap.classList.add('swap'); setTimeout(() => { trackCap.textContent = b.dataset.cap; trackCap.classList.remove('swap'); }, 150); });
  });
  // Drag the strip with a mouse. The pointer is captured only once you have actually moved, so a plain click on a year still opens it.
  let td = null, dragged = false;
  track.addEventListener('pointerdown', e => { if (e.pointerType === 'touch' || e.button !== 0) return; td = { x: e.clientX, sl: track.scrollLeft, id: e.pointerId }; dragged = false; });
  track.addEventListener('pointermove', e => {
    if (!td) return;
    const dx = e.clientX - td.x;
    if (!dragged && Math.abs(dx) > 6) { dragged = true; track.classList.add('dragging'); try { track.setPointerCapture(td.id); } catch (err) {} }
    if (dragged) track.scrollLeft = td.sl - dx;
  });
  const tEnd = () => { if (!td) return; td = null; track.classList.remove('dragging'); setTimeout(() => { dragged = false; }, 50); };
  track.addEventListener('pointerup', tEnd); track.addEventListener('pointercancel', tEnd);
  track.addEventListener('click', e => { if (dragged) { e.stopPropagation(); e.preventDefault(); } }, true);
  new IntersectionObserver(es => { if (es[0].isIntersecting) { track.scrollLeft = track.scrollWidth; } }, { threshold: .3 }).observe(track);

  /* ---------- Main loop ---------- */
  function loop(t) {
    if (pageVisible) { drawField(t); if (heroVisible) drawSolid(t); arcTick(t); }
    requestAnimationFrame(loop);
  }
  sizeField(); sizeSolid();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sizeField(); sizeSolid(); if (reduced) { drawField(0); drawSolid(performance.now()); } }, 120); });
  requestAnimationFrame(loop);
  if ('ResizeObserver' in window) new ResizeObserver(() => sizeSolid()).observe(sc);
  openFromHash();
})();
