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
  // The small label at the top of each pop-up, and the cabinet each kind of pop-up belongs to.
  const CH_LABEL = { threshold: 'Begin', teach: 'For schools', think: 'For universities', make: 'My services', write: 'Contact' };
  const CH_PLACE = { threshold: '#threshold', make: '#services', teach: '#about', think: '#about' };

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

  /* ---------- Light and dark: light, until the switch is used; the switch is remembered. The visitor's system setting is not followed. ---------- */
  const themeBtn = $('#theme');
  const isLight = () => root.getAttribute('data-theme') === 'light';
  function setTheme(light) { if (light) root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme'); }
  function paintTheme() {
    themeBtn.innerHTML = isLight() ? '☾<span class="lbl"> Dark</span>' : '☀<span class="lbl"> Light</span>';
    pal.refresh();
    const m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', cssVar('--bg'));
  }
  const repaintStill = () => { if (reduced) { pal.accent = Object.assign({}, pal.target); drawField(0); drawSolid(performance.now()); } };
  themeBtn.addEventListener('click', () => {
    body.classList.add('theming');
    setTheme(!isLight());
    try { localStorage.setItem('theme', isLight() ? 'light' : 'dark'); } catch (e) {}
    paintTheme(); repaintStill();
    setTimeout(() => body.classList.remove('theming'), 1000);
  });
  paintTheme();

  /* ---------- The CVs in the top bar: one dropdown, at every width ---------- */
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
  // The small word under the sentence changes with the solid: ainigma first, then ten more, each in its own script with a line about it.
  // The lines are his (chat of 2026-11-16).
  const RIDDLES = [
    ['αἴνιγμα', '<em>Ainigma</em>: a riddle. The title of my PhD on Plato, and a fair description of teaching.'],
    ['νοῦς', '<em>Nous</em>: mind, the eye of the soul. What teaching tries to wake.'],
    ['ψυχή', '<em>Psychē</em>: soul, breath. The whole person who comes to a lesson, not only the intellect.'],
    ['ἀπορία', '<em>Aporia</em>: being at a loss. The honest moment of not knowing, where learning starts.'],
    ['συμπαιδεία', '<em>Sympaideia</em>: learning together. My own word for teaching built on rapport and mutual curiosity.'],
    ['𓆄', '<em>Maat</em>: truth, balance, right order. The feather the heart was weighed against.'],
    ['ज्ञान', '<em>Jñāna</em>: knowledge that changes the knower, kin to the Greek <em>gnōsis</em>.'],
    ['חכמה', '<em>Ḥokhmah</em>: wisdom, knowing how to live, not only what is true.'],
    ['schola', '<em>Schola</em>: the leisure required to think.'],
    ['道', '<em>Dào</em>: the way. Chinese, for a path that is learnt by walking it.'],
    ['ubuntu', '<em>Ubuntu</em>: <em>umuntu ngumuntu ngabantu</em>, a person is a person through other people.']
  ];
  const riddleBtn = $('.ainigma'), riddleTip = $('#ainigma-tip'); let riddleAt = 0;
  function setLabel(i) {
    elLabel.textContent = SOLIDS[i].el; nameLabel.textContent = SOLIDS[i].name;
    if (!riddleBtn) return;
    riddleAt = (riddleAt + 1) % RIDDLES.length;
    riddleBtn.textContent = RIDDLES[riddleAt][0]; riddleTip.innerHTML = RIDDLES[riddleAt][1];
  }
  // Between one solid and the next, a testimonial (all five are on the site already, in VOICES).
  const voiceBox = $('.solid-box'), voiceEl = $('#solid-voice'); let voiceOn = false, voiceAt = 0, voiceN = -1;
  const LANDING_VOICES = [['think', 6], ['teach', 0], ['think', 1], ['think', 4], ['teach', 4]];
  function showVoice(t) {
    voiceN = (voiceN + 1) % LANDING_VOICES.length; const v = VOICES[LANDING_VOICES[voiceN][0]].items[LANDING_VOICES[voiceN][1]];
    $('p', voiceEl).textContent = v[0]; $('small', voiceEl).textContent = v[1];
    voiceOn = true; voiceAt = t; voiceBox.classList.add('voiced'); voiceEl.setAttribute('aria-hidden', 'false');
  }
  function hideVoice() { voiceOn = false; voiceBox.classList.remove('voiced'); voiceEl.setAttribute('aria-hidden', 'true'); }
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
    if (S.drag && voiceOn) hideVoice();
    if (S.nxt < 0 && !S.drag && t - S.lastSwitch > 9000) { if (!voiceBox) switchSolid(); else if (!voiceOn) showVoice(t); else if (t - voiceAt > 8000) { hideVoice(); switchSolid(); } }
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
  function endDrag() { if (!S.drag) return; const tap = S.drag.moved < 6; S.drag = null; sc.classList.remove('dragging'); if (tap) { if (voiceOn) hideVoice(); switchSolid(); } }
  sc.addEventListener('pointerup', endDrag); sc.addEventListener('pointercancel', endDrag);
  sc.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchSolid(); } });
  let heroVisible = true;
  new IntersectionObserver(es => { heroVisible = es[0].isIntersecting; }, { threshold: 0 }).observe(sc);

  /* ---------- Named clicks, counted only once a counter script is on the page ---------- */
  function track(name) { try { if (window.goatcounter && goatcounter.count) goatcounter.count({ path: name, title: name, event: true }); } catch (e) {} }
  document.addEventListener('click', e => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

  /* ---------- The cabinets: a vertical stack of full-screen panes, one on screen at a time ---------- */
  const strip = $('main'), panes = $$('main .pane'), dots = $$('.dots a');
  const prevBtn = $('#pane-prev'), nextBtn = $('#pane-next');
  let cur = 0;
  function paintPager() { prevBtn.disabled = cur === 0; nextBtn.disabled = cur === panes.length - 1; }
  function markPane(i) {
    const ch = panes[i].closest('section').id;
    if (i !== cur) track('see-' + ch);   // counted: a visitor arrives at this pane, by a button or by scrolling
    cur = i;
    body.dataset.chapter = ch;
    dots.forEach(d => { if (d.getAttribute('href') === '#' + ch) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    paintPager();
    pal.refresh();
  }
  // The pane that fills more than half the screen is the one we are in.
  const paneIO = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) markPane(panes.indexOf(e.target)); }); }, { root: strip, threshold: .55 });
  panes.forEach(p => paneIO.observe(p));
  function showPane(i, instant) {
    i = Math.max(0, Math.min(panes.length - 1, i));
    if (i !== cur) panes[i].scrollTop = 0;
    const top = panes[i].getBoundingClientRect().top - strip.getBoundingClientRect().top + strip.scrollTop;
    strip.scrollTo({ top: top, behavior: instant || reduced ? 'instant' : 'smooth' });
    if (instant) markPane(i);
  }
  // Addresses from the earlier versions of the site still lead somewhere: the old Teach and Make cabinets to My services,
  // the old Think cabinet and the old side rooms to About me, and #write to the contact panel.
  const ALIAS = {
    '#top': ['#threshold'], '#board': ['#services'], '#teach': ['#services', 'board', 'teach'], '#design': ['#services', 'board', 'design'], '#consult': ['#services', 'board', 'consult'], '#make': ['#services'], '#make-detail': ['#services'],
    '#think': ['#about'], '#think-detail': ['#about'], '#teach-detail': ['#about']
  };
  function showTarget(sel, instant) {
    if (sel === '#write') { openPanel(); return true; }
    const a = ALIAS[sel];
    if (a && a[1]) openTab($('#' + a[1]), a[2]);
    let el = null; try { el = $(a ? a[0] : sel); } catch (e) {}
    if (!el) return false;
    const p = el.classList.contains('pane') ? el : el.closest('main .pane') || $('.pane', el);
    if (!p || panes.indexOf(p) < 0) return false;
    showPane(panes.indexOf(p), instant);
    return true;
  }
  const isPlace = sel => { if (sel === '#write' || ALIAS[sel]) return true; let el = null; try { el = $(sel); } catch (e) {} return !!el && (el.classList.contains('chapter') || panes.indexOf(el) >= 0); };
  prevBtn.addEventListener('click', () => showPane(cur - 1));
  nextBtn.addEventListener('click', () => showPane(cur + 1));
  const overlayOpen = () => body.classList.contains('locked');
  document.addEventListener('keydown', e => {
    if (overlayOpen() || e.altKey || e.ctrlKey || e.metaKey) return;
    const a = document.activeElement;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.id === 'solid' || a.id === 'tetra') return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); showPane(cur + 1); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); showPane(cur - 1); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const b = $('.bb', panes[cur]); if (b) { e.preventDefault(); stepTab(b, e.key === 'ArrowRight' ? 1 : -1); } }   // left and right change the tab
  });
  // The mouse wheel: one turn is one cabinet. Anything inside the cabinet that scrolls takes the wheel first.
  let wheelUntil = 0;
  strip.addEventListener('wheel', e => {
    if (overlayOpen() || e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const p = panes[cur], down = e.deltaY > 0, now = performance.now();
    for (let n = e.target; n && n !== p && n !== strip; n = n.parentElement) {   // the details laid over the object keep the wheel while the pointer is over them
      if (n.scrollHeight > n.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(n).overflowY)) { wheelUntil = now + 400; return; }
    }
    if (down ? p.scrollTop + p.clientHeight < p.scrollHeight - 2 : p.scrollTop > 2) { wheelUntil = now + 400; return; }
    e.preventDefault();
    if (now < wheelUntil) { wheelUntil = now + 250; return; } // the tail of the same turn of the wheel
    if (Math.abs(e.deltaY) < 8) return;
    wheelUntil = now + 700;
    showPane(cur + (down ? 1 : -1));
  }, { passive: false });
  window.addEventListener('resize', () => showPane(cur, true));
  markPane(0);

  /* ---------- The star rating: filled as soon as the page loads; nothing on this page waits for a scroll ---------- */
  $$('.stars').forEach(el => { $('.stars-fg', el).style.width = ((+el.dataset.rating || 0) / 5 * 100).toFixed(1) + '%'; });

  /* ---------- The library, the sheet and the map ---------- */
  // A large faint drawing in each pop-up's header, named by data-art on the pop-up
  const ART = {
    quill: '<path d="M8 40c6-2 10-6 14-12 4-6 8-10 18-16-4 10-8 14-14 18-6 4-10 6-18 10z"/><path d="M8 40l10-10"/>',
    scroll: '<path d="M10 8h24l6 6v26H10z"/><path d="M34 8v6h6"/><path d="M16 20h16M16 26h16M16 32h10"/>',
    school: '<path d="M6 40V20l10-8 10 8v20"/><path d="M26 40V24l8-6 8 6v16"/><path d="M6 40h36"/>',
    lamp: '<path d="M18 34c-6-3-9-8-9-14a15 15 0 0 1 30 0c0 6-3 11-9 14"/><path d="M18 34v4h12v-4M20 42h8"/>',
    book: '<path d="M8 10h14a4 4 0 0 1 4 4v26a4 4 0 0 0-4-4H8z"/><path d="M40 10H26a4 4 0 0 0-4 4v26a4 4 0 0 1 4-4h14z"/>',
    quote: '<path d="M10 28a8 8 0 0 1 8-8v-8a16 16 0 0 0-16 16v12h16V28z"/><path d="M28 28a8 8 0 0 1 8-8v-8a16 16 0 0 0-16 16v12h16V28z"/>',
    person: '<circle cx="24" cy="16" r="8"/><path d="M8 42c0-10 7-16 16-16s16 6 16 16"/>',
    people: '<circle cx="17" cy="16" r="6"/><circle cx="33" cy="18" r="5"/><path d="M5 40c0-8 5-13 12-13s12 5 12 13M30 28c7-1 13 4 13 12"/>',
    compass: '<circle cx="24" cy="24" r="17"/><path d="M31 17l-4 10-10 4 4-10z"/>',
    crown: '<path d="M10 36L7 16l10 9 7-13 7 13 10-9-3 20z"/><path d="M10 41h28"/>',
    ship: '<path d="M24 6v20M24 9l12 14H24M24 13l-9 10h9"/><path d="M6 31c4-4 8-4 12 0s8 4 12 0 8-4 12 0M6 39c4-4 8-4 12 0s8 4 12 0 8-4 12 0"/>',
    bubble: '<path d="M8 10h32v22H22l-8 8v-8H8z"/><path d="M14 18h20M14 24h12"/>',
    shirt: '<path d="M16 8L6 16l5 7 5-3v20h16V20l5 3 5-7-10-8c-1 4-4 6-8 6s-7-2-8-6z"/>',
    leaf: '<path d="M10 38C10 20 22 10 40 8c-2 18-12 30-30 30z"/><path d="M10 38l16-16M18 30h8M20 22v6"/>',
    pilcrow: '<path d="M30 8v32M22 8v32M36 8H20a9 9 0 0 0 0 18h2"/>',
    film: '<path d="M6 10h36v28H6zM12 10v28M36 10v28M6 17h6M6 24h6M6 31h6M36 17h6M36 24h6M36 31h6"/><path d="M21 18l8 6-8 6z"/>',
    temple: '<path d="M6 16L24 6l18 10zM10 16v20M19 16v20M29 16v20M38 16v20M8 36h32M6 41h36"/>',
    spark: '<path d="M22 8c1 9 6 14 15 15-9 1-14 6-15 15-1-9-6-14-15-15 9-1 14-6 15-15z"/><path d="M38 6c0 4 2 6 6 6-4 0-6 2-6 6 0-4-2-6-6-6 4 0 6-2 6-6z"/>',
    cap: '<path d="M4 18l20-9 20 9-20 9z"/><path d="M12 22v10c3 4 8 6 12 6s9-2 12-6V22M44 18v12"/>',
    board: '<path d="M6 8h36v24H6zM24 32v8M16 40h16M12 16h14M12 22h8"/>',
    play: '<circle cx="24" cy="24" r="17"/><path d="M20 16l12 8-12 8z"/>',
    mic: '<path d="M18 8h12v18a6 6 0 0 1-12 0z"/><path d="M12 24a12 12 0 0 0 24 0M24 36v6M16 42h16"/>',
    blocks: '<path d="M6 26h14v14H6zM22 26h20v14H22zM6 8h22v14H6zM30 8h12v14H30z"/>',
    check: '<path d="M10 6h28v36H10z"/><path d="M16 16l3 3 5-6M28 16h6M16 28l3 3 5-6M28 28h6"/>',
    heart: '<path d="M24 40S6 29 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z"/>',
    calendar: '<path d="M8 12h32v28H8zM8 20h32M16 6v10M32 6v10"/><path d="M19 30l4 4 7-8"/>',
    edit: '<path d="M8 12h26M8 20h18M8 28h10"/><path d="M40 18L24 34l-6 2 2-6 16-16z"/>',
    dots: '<circle cx="24" cy="9" r="2.6"/><circle cx="19" cy="19" r="2.6"/><circle cx="29" cy="19" r="2.6"/><circle cx="14" cy="29" r="2.6"/><circle cx="24" cy="29" r="2.6"/><circle cx="34" cy="29" r="2.6"/><circle cx="9" cy="39" r="2.6"/><circle cx="19" cy="39" r="2.6"/><circle cx="29" cy="39" r="2.6"/><circle cx="39" cy="39" r="2.6"/>',
    envelope: '<path d="M6 12h36v26H6z"/><path d="M6 12l18 14 18-14"/>',
    star: '<path d="M24 6l5 13h13l-10.5 8 4 13L24 32l-11.5 8 4-13L6 19h13z"/>'
  };
  const library = {};
  $$('#library article').forEach(a => { library[a.id.replace(/^s-/, '')] = { title: a.dataset.title, ch: a.dataset.ch, html: a.innerHTML, read: a.hasAttribute('data-read'), art: a.dataset.art, tone: a.dataset.tone }; });
  library.evaluations = library.said = library.testimonials; // old links still open the testimonials

  /* ---------- Request sheets: a drafted message you can send from your email app, from Gmail, or copy ---------- */
  const EMAIL = 'wehancoombs@gmail.com';
  // Paste a booking link here (a Google Calendar appointment page, or Calendly) and every request sheet gets a "Book a call" button. Empty hides it.
  const BOOKING_URL = 'https://calendar.app.google/LnQHr42n4ykTqa4ZA', FORM_URL = 'https://formspree.io/f/xnppyzon';
  const REQUESTS = {
    tutoring: { ch: 'make', title: 'Request tutoring', subject: 'Tutoring request', intro: 'Tell me the subject, the level and when suits you. I reply with a plan, a rate and a start date.', body: 'Hi Wehan,\n\nI’d like to ask about tutoring.\n\nSubject and grade or level: \nWhen and how often: \nIn person or online: \n\nThanks,\n' },
    editing: { ch: 'make', title: 'Request writing support', subject: 'Writing support request', intro: 'Tell me what the document is and when you need it back. I reply with a rate and a date.', body: 'Hi Wehan,\n\nI’d like to ask about writing support.\n\nWhat the document is and roughly how long: \nWhen I need it back: \n\nThanks,\n' },
    design: { ch: 'make', title: 'Request learning design', subject: 'Learning design request', intro: 'Tell me what you need built and who it is for. I reply with a plan, a rate and a timeline.', body: 'Hi Wehan,\n\nI’d like to ask about learning design.\n\nWhat I need built: \nWho it is for: \nWhen I need it: \n\nThanks,\n' },
    consulting: { ch: 'make', title: 'Request consulting', subject: 'Consulting request', intro: 'Tell me the question and who it is for. I reply with a proposal and a rate.', body: 'Hi Wehan,\n\nI’d like to talk about philosophical and AI consulting.\n\nThe question or situation: \n\nThanks,\n' },
    institution: { ch: 'make', title: 'Request consulting', subject: 'Consulting request', intro: 'Tell me the question and who it is for. I reply with a proposal and a rate.', body: 'Hi Wehan,\n\nI’d like to talk about consulting.\n\nSchool or university, and department: \nWhat you need (an AI policy, a staff workshop, or an AI review): \nHow many staff, modules or departments: \nWhen you need it by: \n\nThanks,\n' },
    any: { ch: 'write', title: 'Write to me', subject: 'Hello', intro: 'For anything else: a post, a reference, a question, a hello.', body: 'Hi Wehan,\n\n\n\nThanks,\n' }
  };
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  Object.keys(REQUESTS).forEach(k => {
    const r = REQUESTS[k];
    library['request-' + k] = { title: r.title, ch: r.ch, tone: { tutoring: 'c-teach', editing: 'c-teach', consulting: 'c-consult', institution: 'c-consult' }[k], html:
      '<p class="when">' + r.intro + '</p>' +
      '<div class="req" data-kind="' + k + '">' +
        '<label class="req-label" for="req-from">Your email <small>so that I can reply</small></label>' +
        '<input id="req-from" class="req-from" type="email" autocomplete="email" placeholder="you@example.com">' +
        '<input class="req-trap" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<label class="req-label" for="req-body">Your message <small>change anything you like</small></label>' +
        '<textarea id="req-body" class="req-body" rows="9" spellcheck="false">' + esc(r.body) + '</textarea>' +
        '<div class="req-actions">' +
          '<button class="btn solid" type="button" data-send="here">Send from here</button>' +
          '<button class="btn" type="button" data-send="mail">Send from my email app</button>' +
          '<button class="btn" type="button" data-send="gmail">Send from Gmail</button>' +
          '<button class="btn" type="button" data-send="copy">Copy the message</button>' +
        '</div>' +
        '<p class="req-to">To <button type="button" class="inline" data-copy="' + EMAIL + '">' + EMAIL + '</button> · subject: ' + r.subject + '</p>' +
        '<p class="note">Send from here goes through Formspree, which stores messages on servers abroad; I reply from Gmail. The other buttons use your own email.</p>' +
        (k !== 'any' ? '<p class="more"><button type="button" data-sheet="book">Book a free intro call instead →</button></p>' : '') +
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
      track('send-' + form.dataset.kind + '-' + b.dataset.send);
      if (b.dataset.send === 'here') {
        const from = $('.req-from', form), trap = $('.req-trap', form);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from.value)) { from.focus(); flash(b, 'Add your email first'); return; }
        if (text.trim().length < 10) { ta.focus(); flash(b, 'Write a message first'); return; }
        b.disabled = true; b.textContent = 'Sending…';
        fetch(FORM_URL, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: from.value, message: text, _subject: r.subject, _gotcha: trap.value }) })
          .then(res => { if (!res.ok) throw new Error(res.status); b.textContent = 'Sent ✓ I will reply by email'; track('sent-' + form.dataset.kind); })
          .catch(() => { b.disabled = false; b.textContent = 'Could not send. Try the email buttons'; setTimeout(() => { b.textContent = 'Send from here'; }, 3000); });
        return;
      }
      if (b.dataset.send === 'mail') location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(r.subject) + '&body=' + encodeURIComponent(text);
      else if (b.dataset.send === 'gmail') window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(EMAIL) + '&su=' + encodeURIComponent(r.subject) + '&body=' + encodeURIComponent(text), '_blank', 'noopener');
      else copyText('To: ' + EMAIL + '\nSubject: ' + r.subject + '\n\n' + text).then(() => flash(b, 'Copied ✓'), () => flash(b, 'Could not copy'));
    });
  }
  const ORDER = {};
  // The order of the pop-ups within each group, for the arrows inside a pop-up and its "3 of 7".
  Object.assign(ORDER, { threshold: ['about', 'qualifications'], make: ['tutoring', 'editing', 'classes', 'design', 'consulting', 'working', 'book'],
    teach: ['approach', 'abbotts', 'garsfontein', 'macbeth', 'tempest', 'poems', 'grammar', 'film', 'enrichment', 'ai'],
    think: ['posts', 'courses', 'guides', 'lectures', 'testimonials', 'publications', 'curriculum'], write: ['resume'] });

  const scrim = $('#scrim'), sheet = $('#sheet'), sheetCh = $('#sheet-ch'), sheetTitle = $('#sheet-title'), sheetBody = $('#sheet-body'), sheetWhere = $('#sheet-where'), sheetArt = $('#sheet-art');
  const map = $('#map'), mapBtn = $('#map-btn');
  let openId = null, lastFocus = null, sheetTimer = null, mapTimer = null;

  function showScrim() { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('on')); }
  function hideScrimIfIdle() { if (sheet.classList.contains('on') || map.classList.contains('on')) return; scrim.classList.remove('on'); setTimeout(() => { if (!scrim.classList.contains('on')) scrim.hidden = true; }, 360); }
  function lock() { body.classList.add('locked'); }
  function unlockIfIdle() { if (!sheet.classList.contains('on') && !map.classList.contains('on')) body.classList.remove('locked'); }

  function activateEmbeds(container) {
    $$('.embed', container).forEach(e => {
      if (e.querySelector('iframe, video')) return;
      if (e.dataset.video) {
        const v = document.createElement('video');
        v.src = e.dataset.video; v.controls = true; v.preload = 'metadata'; v.playsInline = true;
        e.appendChild(v); return;
      }
      const f = document.createElement('iframe');
      f.src = e.dataset.src; f.loading = 'lazy'; f.setAttribute('allow', 'autoplay; fullscreen'); f.setAttribute('allowfullscreen', '');
      f.title = sheetTitle.textContent;
      e.appendChild(f);
    });
  }

  // The long pieces (data-read) open as a centred page with a contents line; everything else stays a drawer.
  function addContents(container) {
    const heads = $$('h4', container);
    if (heads.length < 3) return;
    const nav = document.createElement('nav');
    nav.className = 'contents'; nav.setAttribute('aria-label', 'Contents');
    heads.forEach((h, i) => {
      h.id = 'read-' + i;
      const b = document.createElement('button'); b.type = 'button'; b.textContent = h.textContent; b.dataset.jump = h.id;
      nav.appendChild(b);
    });
    container.prepend(nav);
  }
  sheetBody.addEventListener('click', e => {
    const j = e.target.closest('[data-jump]');
    if (!j) return;
    const t = $('#' + j.dataset.jump, sheetBody);
    if (t) sheetBody.scrollTo({ top: t.getBoundingClientRect().top - sheetBody.getBoundingClientRect().top + sheetBody.scrollTop - 12, behavior: 'smooth' });
  });
  // Dressing at open time, so the HTML stays plain: the date line becomes chips, the opening paragraph a lede.
  function dressSheet(container) {
    const when = $(':scope > .when', container);
    if (when && when.innerHTML.includes(' \u00b7 ')) {
      const parts = when.innerHTML.split(' \u00b7 ');
      if (parts.length >= 2 && parts.length <= 6) { when.innerHTML = parts.map(p => '<span>' + p.trim() + '</span>').join(''); when.classList.add('chips'); }
    }
    const lede = $$(':scope > *', container).slice(0, 4).find(k => k.tagName === 'P' && !k.className);
    if (lede && lede.textContent.length > 80) lede.classList.add('lede');
    // Links that leave the pop-up (a file, a Drive document) become cards, in the link's own words
    $$('.more', container).forEach(more => {
      const links = $$('a[href]:not(.btn)', more);
      if (!links.length) return;
      const cards = document.createElement('div'); cards.className = 'dl-cards';
      links.forEach(a => {
        const href = a.getAttribute('href'), words = a.textContent.replace(/\s*\u2197\s*$/, '').trim();
        const local = !/^https?:/.test(href);
        const kind = /\.pdf$/i.test(href) ? 'PDF' : /drive\.google/.test(href) ? 'Google Drive' : /docs\.google/.test(href) ? 'Google Docs' : '';
        const said = kind && new RegExp(kind.split(' ').pop(), 'i').test(words);
        a.className = 'dl';
        a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (local ? '<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>' : '<path d="M6 3h9l5 5v13H6z"/><path d="M15 3v5h5M9 13h6M9 17h6"/>') + '</svg><b></b>' + (kind && !said ? '<span>' + kind + '</span>' : '');
        a.querySelector('b').textContent = words;
        cards.appendChild(a);
      });
      more.parentNode.insertBefore(cards, more);
      if (!more.textContent.trim()) more.remove();
    });
    let lastYear = null;
    $$('.timeline li', container).forEach(li => {
      const b = $('b', li);
      if (!b) return;
      if (b.textContent === lastYear) b.classList.add('again');
      lastYear = b.textContent;
      if (li.querySelector('.t-title')) return;
      const rest = li.innerHTML.slice(li.innerHTML.indexOf('</b>') + 4).trim();
      const k = rest.indexOf(' \u00b7 ');
      li.innerHTML = b.outerHTML + '<span class="t-title">' + (k < 0 ? rest : rest.slice(0, k)) + '</span>' + (k < 0 ? '' : '<span class="t-where">' + rest.slice(k + 3) + '</span>');
    });
  }
  // Student ratings draw themselves as bars, scaled out of five.
  function activateRatings(container) {
    const rows = $$('.ratings li', container);
    if (!rows.length) return;
    requestAnimationFrame(() => requestAnimationFrame(() => rows.forEach(li => {
      const b = li.querySelector('b'), v = b && parseFloat(b.textContent);
      if (v) li.style.setProperty('--v', (v / 5).toFixed(3));
    })));
  }
  // The lesson at a glance: tap a stage in the bar and read that stage.
  function initStages(container) {
    $$('.lesson-bar', container).forEach(bar => {
      const steps = bar.parentElement.querySelector('ol.steps'); if (!steps) return;
      const segs = $$('span', bar), items = $$('li', steps);
      bar.classList.add('staged'); steps.classList.add('staged');
      const pick = i => { segs.forEach((s, k) => { s.classList.toggle('on', k === i); s.setAttribute('aria-pressed', k === i ? 'true' : 'false'); }); items.forEach((li, k) => { li.dataset.n = k + 1; li.classList.toggle('on', k === i); }); };
      segs.forEach((s, i) => { s.setAttribute('role', 'button'); s.setAttribute('tabindex', '0'); s.addEventListener('click', () => pick(i)); s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } }); });
      pick(0);
    });
  }
  function openSheet(id) {
    const item = library[id];
    if (!item) return;
    track('open-' + id);
    clearTimeout(sheetTimer);
    if (map.classList.contains('on')) closeMap(true);
    closePanel();
    if (!sheet.classList.contains('on')) lastFocus = document.activeElement;
    openId = id;
    sheet.dataset.ch = item.ch;
    if (item.tone) sheet.dataset.tone = item.tone; else delete sheet.dataset.tone;
    const art = item.art || (id.indexOf('request-') === 0 ? 'envelope' : id.indexOf('star-') === 0 ? 'star' : '');
    sheetArt.innerHTML = ART[art] ? '<svg viewBox="0 0 48 48">' + ART[art] + '</svg>' : '';
    sheetCh.textContent = CH_LABEL[item.ch] || '';
    sheetTitle.textContent = item.title;
    sheetBody.innerHTML = item.html;
    sheetBody.scrollTop = 0;
    sheet.classList.toggle('read', !!item.read);
    dressSheet(sheetBody);
    if (item.read) addContents(sheetBody);
    activateEmbeds(sheetBody); activateRequest(sheetBody); activateRatings(sheetBody); initStages(sheetBody);
    if (sheetBody.querySelector('.blocks')) layout(lk); // the design blocks, laid out in the copy that just opened
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
    closePanel();
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
  scrim.addEventListener('click', () => { closeSheet(); closeMap(); });
  // Escape closes the topmost thing: a pop-up, the Map, the contact panel, then the details on the board.
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (sheet.classList.contains('on')) closeSheet(); else if (map.classList.contains('on')) closeMap(); else if (panel.classList.contains('on')) closePanel(true); else closeDetail();
    closeCvs();
  });

  function goTo(sel) {
    if (!isPlace(sel)) return;
    closeSheet(); closeMap();
    body.classList.remove('locked');
    setTimeout(() => showTarget(sel), 60);
  }

  // One listener for every "open this" button on the page, in the map and inside sheets.
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-copy]');
    if (c) { e.preventDefault(); track('copy-address'); copyText(c.dataset.copy).then(() => flash(c, 'Copied ✓'), () => flash(c, 'Could not copy')); return; }
    const s = e.target.closest('[data-sheet]');
    if (s) { e.preventDefault(); const id = s.dataset.sheet, place = library[id] && CH_PLACE[library[id].ch]; if (place && map.classList.contains('on') && body.dataset.chapter !== place.slice(1)) showTarget(place, true); openSheet(id);
      if (s.dataset.at) { const to = $('[data-anchor="' + s.dataset.at + '"]', sheet); if (to) requestAnimationFrame(() => to.scrollIntoView({ block: 'start' })); }   // a button may open a pop-up at one of its sections
      if (s.closest('#board') && library[id] && !library[id].tone) sheet.dataset.tone = 'c-' + svcBoard.dataset.open;   // a pop-up opened from the board keeps the colour of its tab
      return; }
    const dt = e.target.closest('[data-detail]');
    if (dt) { e.preventDefault(); openDetail(dt.dataset.detail); return; }
    const sv = e.target.closest('[data-svc]');
    if (sv) { e.preventDefault(); const it = $('.item-btn[data-detail="' + sv.dataset.svc + '"]'); if (!it) return;
      closeSheet(); closeMap(); body.classList.remove('locked');
      setTimeout(() => { showTarget('#services', true); openTab(svcBoard, it.closest('.items').dataset.col); openDetail(sv.dataset.svc); }, 60); return; }
    const g = e.target.closest('[data-goto]');
    if (g) { e.preventDefault(); goTo(g.dataset.goto); return; }
    // Any other link to a place on this page (the dots, the W in the top bar) slides to that cabinet.
    const a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href').length > 1 && !a.getAttribute('href').startsWith('#s-') && isPlace(a.getAttribute('href'))) { e.preventDefault(); goTo(a.getAttribute('href')); }
  });
  function openFromHash() {
    const h = location.hash || '';
    if (h.startsWith('#s-')) { const id = h.slice(3); if (library[id]) { const place = CH_PLACE[library[id].ch]; if (place) showTarget(place, true); openSheet(id); } }
    else if (h.length > 1) showTarget(h, true); // an address ending in #services or #about (or an old one: #teach, #think, #make, #write) opens in that place
  }
  window.addEventListener('hashchange', openFromHash);

  /* ---------- Tabs: the services board and the About board each show one of three sides at a time ---------- */
  const svcBoard = $('#board'), svcStage = $('.stage');
  function openTab(board, k) {
    if (!board || board.dataset.open === k) return;
    board.dataset.open = k;
    pal.refresh();   // the cabinet takes the colour of the open tab, and the stars behind it follow
    $$('.tabs [data-tab]', board).forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === k ? 'true' : 'false'));
    if (board === svcBoard) { closeDetail(); showShapes(k); }
    track('tab-' + board.id + '-' + k);
  }
  function stepTab(board, d) { const ks = $$('.tabs [data-tab]', board).map(b => b.dataset.tab), k = ks[ks.indexOf(board.dataset.open) + d]; if (k) openTab(board, k); }
  // A tab opens its side of the board. Pressed while a details card is open on that same side, it brings the list back.
  $$('.bb .tabs [data-tab]').forEach(b => b.addEventListener('click', () => { const bd = b.closest('.bb'); if (bd.dataset.open === b.dataset.tab) closeDetail(); else openTab(bd, b.dataset.tab); }));
  // Pointing at a service on the list brings up its own shape.
  $$('.bb-menu [data-shape]').forEach(li => li.addEventListener('pointerenter', () => showShapes(svcBoard.dataset.open, +li.dataset.shape)));

  /* ---------- Details: a box that is pressed opens over the others and fills the board, in place of a pop-up ---------- */
  const bbDetail = $('#bb-detail'), bbChev = $('#bb-chev'), stash = $('#stash'), arcFig = $('.arc');
  let detailFocus = null;
  // What each item shows when Details is pressed. Nothing here is new wording: the name, line and rate are read from the item itself,
  // and the rest is lifted from the pop-ups, the arc of a lesson and the quotations already on the page.
  const part = (id, sel) => { const d = document.createElement('div'); d.innerHTML = library[id].html; return $$(sel, d).map(e => e.innerHTML); };
  const DETAILS = {
    tutoring: { lines: () => part('tutoring', '.svc-summary .deliv li'), quote: () => VOICES.make.items[2], request: 'tutoring', more: 'tutoring' },
    writing: { line: true, lines: () => part('editing', '.svc-summary .deliv li'), quote: () => VOICES.make.items[0], request: 'editing', more: 'editing' },
    classes: { line: true, inline: true, quote: () => VOICES.teach.items[0],
      extra: () => '<p class="eyebrow">What I taught in 2026 · tap a spine</p>' + SHELF_HTML + '<div class="shelf-detail" aria-live="polite"><p class="caption">Each spine opens a lesson.</p></div>' +
        // The PGCE micro lesson, a mock FET English lesson (his word, 2026-11-17)
        '<p class="eyebrow">Watch me teach</p><div class="lectures solo"><div class="lecture" data-src="https://www.youtube-nocookie.com/embed/peBkDshxgYs?autoplay=1&amp;rel=0">' +
        '<button class="play" type="button" aria-label="Play: English micro lesson on adjectives, PGCE, 2026"><span></span></button><p class="l-cap"><strong>English micro lesson on adjectives</strong>PGCE · 2026</p></div></div>' +
        '<p class="deck-watch"><a href="https://youtu.be/peBkDshxgYs" target="_blank" rel="noopener" data-track="watch-youtube">Watch on YouTube ↗</a></p>' },
    // Lectures: the two recordings, large, one in front of the other; the chevron beside them brings the other forward.
    lectures: { line: true, inline: true, wide: true, quote: () => VOICES.think.items[6], more: 'courses',
      extra: () => '<p class="eyebrow">Watch me teach · <span class="deck-n">1 of 2</span></p><div class="deck">' + LECT_HTML +
        '<button class="deck-next" type="button" aria-label="Show the next recording"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>' +
        '<p class="deck-watch"><a href="https://youtu.be/3yu_p7YIFhc" target="_blank" rel="noopener" data-track="watch-youtube">Watch on YouTube ↗</a></p>' },
    lesson: { line: true, inline: true, arc: true, extra: () => '<div class="bb-arc-slot"></div>', quote: () => ['The lesson plans were well crafted and engaged learners, allowing them to partake and ask questions.', 'Mentor teacher, Hoërskool Garsfontein · formal assessment, 2026'], request: 'design', more: 'approach' },
    // A module: what a module comes with, the modules he has designed (the paragraph that used to sit under A curriculum), and the study guides.
    module: { line: true, inline: true, text: () => part('design', 'h4 + p')[0], quote: () => VOICES.make.items[4], request: 'design', more: 'design',
      extra: () => '<p class="eyebrow">Study guides I wrote · tap one to read it</p>' + GUIDES_HTML },
    // A curriculum: his own lines (chat of 2026-11-15).
    curriculum: { line: true, text: () => 'A curriculum is a set of modules in an order that makes sense, so that each one prepares for the next. At the University of Pretoria I designed first- and second-year philosophy modules to fit what came before and after them, and helped plan that order with the department.', quote: () => VOICES.think.items[8], request: 'design', more: 'curriculum' },
    person: { line: true, text: () => part('consulting', 'h4 + p')[0], quote: () => ['…he has been a guide and mentor to me there as much as in the academy.', 'Dr Mitchell-Ron Black · research collaborator, 2026'], request: 'consulting', more: 'consulting' },
    // A school: his own list of what the school receives (chat of 2026-11-16), in place of the three general consulting points.
    school: { line: true, long: true, head: 'What you receive',
      lines: () => ['An AI policy written for your school, or your current one revised', 'A workshop for your staff, at the school or online', 'A follow-up meeting to see how the policy is working'],
      quote: () => VOICES.teach.items[4], request: 'institution', more: 'consulting' },
    // A university: his own lines (chat of 2026-11-15). What the university receives, on the left; his research and how he assessed his own module, on the right, above the quotation.
    university: { line: true, long: true, head: 'What you receive',
      lines: () => ['A written review of the module’s assessments: which ones a machine can now complete, and which still test the student', 'The weak assessments redesigned, ready to use', 'A meeting with your staff to talk it through'],
      side: () => '<p class="bb-para">My research is on teaching in the age of AI: what part of learning cannot be automated, and how to build teaching around it.</p><ul class="bb-lines long"><li>My 2026 honours module was assessed through video essays, podcasts and written work</li><li>Its last assessment was a sit-down essay on an unseen question: the role of philosophy in a world of AI</li></ul>',
      quote: () => ['I find his account of what cannot be automated in learning more persuasive than most of what I read on the subject.', 'Dr Mitchell-Ron Black, 2026'], request: 'institution', more: 'ai' }
  };
  const DETAIL_ART = { tutoring: 'quill', writing: 'edit', classes: 'people', lectures: 'cap', lesson: 'compass', module: 'blocks', curriculum: 'book', person: 'person', school: 'school', university: 'temple' };
  // What each box shows at a glance under its one-line description: two points. Those for Writing are read from its details card;
  // the other nine pairs are his own lines (chats of 2026-11-16). The text export reads the eight from here, so keep one service to a line.
  const PEEK = { writing: () => DETAILS.writing.lines().slice(0, 2),
    tutoring: () => ['School English, Grades 10 to 12', 'Home Language and First Additional Language'],
    classes: () => ['At your school or venue, or live online', 'One session or a short series'],
    lectures: () => ['In person, live online or recorded', 'One lecture or a whole module'],
    lesson: () => ['Fitted to CAPS or your own curriculum', 'Plan, slides and worksheets as the lesson needs'],
    module: () => ['For a university, school or private course', 'Lesson schedule, materials and assessments'],
    curriculum: () => ['From your existing modules, or from scratch', 'Planned with your staff, if you like'],
    person: () => ['In person in Pretoria East, or online', 'A conversation, not therapy'],
    school: () => ['A new policy, or your current one revised', 'The workshop at your school, or online'],
    university: () => ['A written report and redesigned assessments', 'A meeting with your staff to talk it through'] };
  Object.keys(PEEK).forEach(id => { const el = $('[data-detail="' + id + '"] .item-pts'); if (el) el.innerHTML = PEEK[id]().map(l => '<span>' + l + '</span>').join(''); });
  function openDetail(id) {
    const d = DETAILS[id], from = $('[data-detail="' + id + '"]');
    if (!d || !from) return;
    stash.appendChild(arcFig);   // the arc goes back to its shelf before the card is redrawn
    const it = from.closest('.item'), q = d.quote();
    const btn = (cls, sheet, label, what) => '<button' + (cls ? ' class="' + cls + '"' : '') + ' type="button" data-sheet="' + sheet + '" data-track="' + what + '-' + id + '">' + label + '</button> ';   // counted by service: request-lesson, book-school, more-tutoring
    const ul = d.lines ? '<ul class="bb-lines' + (d.long ? ' long' : '') + '">' + d.lines().map(l => '<li>' + l + '</li>').join('') + '</ul>' : '';
    detailFocus = document.activeElement;
    bbDetail.innerHTML = '<button class="close" type="button" data-detail-close aria-label="Close">×</button>' +
      '<div class="bb-head"><span class="bb-icon" aria-hidden="true"><svg viewBox="0 0 48 48">' + ART[DETAIL_ART[id]] + '</svg></span><div><h3 class="bb-title" id="bb-title" tabindex="-1"></h3><button class="bb-rate" type="button" data-sheet="' + (d.request ? 'request-' + d.request : 'book') + '" data-track="rate-' + id + '">' + $('.item-rate', it).innerHTML + '</button></div></div>' +   // the price is a button: it opens this service's form, or the booking pop-up where there is no form
      '<div class="sheet-body bb-text"><div class="bb-short' + (d.wide ? ' wide' : '') + '"><div>' +
        (d.line ? '<p class="bb-line">' + $('.item-line', it).innerHTML + '</p>' : '') +
        (d.head ? '<p class="eyebrow bb-sub">' + d.head + '</p>' : '') +
        (d.lines && !d.linesLast ? ul : '') +
        (d.text ? '<p class="bb-para">' + d.text() + '</p>' : '') +
        (d.lines && d.linesLast ? ul : '') +
        (d.extra && d.inline ? '<div class="bb-extra compact room">' + d.extra() + '</div>' : '') +
      '</div>' + (d.side ? '<div class="bb-side">' + d.side() : '') + '<blockquote class="bb-proof"><p>' + q[0] + '</p><small>' + q[1] + '</small></blockquote>' + (d.side ? '</div>' : '') + '</div>' +
      (d.extra && !d.inline ? '<div class="bb-extra compact room">' + d.extra() + '</div>' : '') +
      '<p class="more">' + (d.request ? btn('btn solid', 'request-' + d.request, 'Request', 'request') : '') + btn(d.request ? 'btn' : 'btn solid', 'book', 'Book a free intro call', 'book') + (d.more ? btn('', d.more, 'More →', 'more') : '') + '</p></div>';
    const title = $('.bb-title', bbDetail);
    title.textContent = $('.item-name', it).textContent;
    if (d.arc) $('.bb-arc-slot', bbDetail).appendChild(arcFig);   // the real drawing is moved in, so that it keeps running
    $$('.deck .lecture', bbDetail).forEach((l, i) => { l.classList.toggle('front', i === 0); l.classList.toggle('later', i > 1); });
    bbDetail.hidden = false; bbDetail.scrollTop = 0;
    svcStage.classList.add('detail-open');
    // The card grows out of the box that was pressed, until it covers the others.
    const a = from.getBoundingClientRect(), b = bbDetail.getBoundingClientRect();
    if (!reduced && bbDetail.animate && a.width && b.width) bbDetail.animate([
      { clipPath: 'inset(' + [a.top - b.top, b.right - a.right, b.bottom - a.bottom, a.left - b.left].map(v => Math.max(0, Math.round(v)) + 'px').join(' ') + ' round 14px)' },
      { clipPath: 'inset(0px 0px 0px 0px round 0px)' }], { duration: 460, easing: 'cubic-bezier(.2, .7, .2, 1)' });
    if (b.top < 100 || b.top > innerHeight * .6) bbDetail.scrollIntoView({ block: 'start' });   // on a phone, a box far down the page still opens with its title in sight, under the tabs
    title.focus({ preventScroll: true });
    track('detail-' + id);
  }
  function closeDetail() {
    if (!svcStage.classList.contains('detail-open')) return;
    stash.appendChild(arcFig);
    svcStage.classList.remove('detail-open'); bbDetail.hidden = true; bbDetail.innerHTML = '';
    if (detailFocus && detailFocus.focus && detailFocus.offsetParent) detailFocus.focus({ preventScroll: true });
    detailFocus = null;
  }
  bbChev.addEventListener('click', closeDetail);
  bbDetail.addEventListener('click', e => {
    if (e.target.closest('[data-detail-close]')) { closeDetail(); return; }
    if (!e.target.closest('.deck-next')) return;
    // The other recording comes to the front. One that was playing stops, so that nothing plays out of sight.
    const ls = $$('.deck .lecture', bbDetail), to = (ls.findIndex(l => l.classList.contains('front')) + 1) % ls.length;
    ls.forEach((l, i) => {
      l.classList.toggle('front', i === to); l.classList.toggle('later', i !== to && i !== (to + 1) % ls.length);
      if (i !== to && l.classList.contains('playing')) { const f = $('iframe', l); if (f) f.remove(); l.classList.remove('playing'); }
    });
    $('.deck-n', bbDetail).textContent = (to + 1) + ' of ' + ls.length;
    const w = $('.deck-watch a', bbDetail); if (w && ls[to].dataset.watch) w.href = ls[to].dataset.watch;   // the link follows the recording in front
  });

  /* ---------- The coin beside "About me": pressed, it spins, and as it spins its W flickers through five signs and back,
     almost too fast to be sure of: phi, the unicursal hexagram, Om, yin and yang, the eye of Ra ---------- */
  const abSeal = $('#ab-seal');
  if (abSeal) {
    const letter = $('.seal-letter', abSeal), SIGNS = ['Φ', 'hex', 'ॐ', '☯︎', '𓂀', 'W']; let coinTimers = [];
    const showSign = s => { abSeal.classList.toggle('hex', s === 'hex'); if (s !== 'hex') letter.textContent = s; };
    abSeal.addEventListener('click', () => {
      if (reduced) return;
      coinTimers.forEach(clearTimeout); showSign('W');
      abSeal.classList.remove('spin'); void abSeal.offsetWidth;   // so that a second press starts it again
      abSeal.classList.add('spin');
      coinTimers = SIGNS.map((s, i) => setTimeout(() => showSign(s), 260 + i * 200));   // a fifth of a second for each sign
      coinTimers.push(setTimeout(() => abSeal.classList.remove('spin'), 1750));
      track('coin');
    });
  }

  /* ---------- The sketch fades in the first time the services cabinet comes into view, on a first visit only ---------- */
  const meEl = $('.me');
  if (meEl) new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { meEl.classList.add('in'); io.disconnect(); } }, { threshold: .3 }).observe(meEl);

  /* ---------- The contact panel: the form, opened from the bar at the bottom ---------- */
  const panel = $('#panel'), panelBody = $('#panel-body'), panelBtns = [$('#bar-write'), $('#bar-one')];
  let panelTimer = null, panelFocus = null;
  function openPanel() {
    if (panel.classList.contains('on')) return;
    clearTimeout(panelTimer); closeSheet(); closeMap(); closeCvs();
    panelFocus = document.activeElement;
    if (!panelBody.firstChild) { panelBody.innerHTML = library['request-any'].html; activateRequest(panelBody); }   // filled once, so a half-written message survives closing the panel
    panel.hidden = false; panelBtns.forEach(b => b.setAttribute('aria-expanded', 'true'));
    void panel.offsetWidth;   // lay it out where it starts, so that it slides up instead of jumping
    panel.classList.add('on'); $('#panel-title').focus({ preventScroll: true });
  }
  function closePanel(refocus) {
    if (!panel.classList.contains('on')) return;
    panel.classList.remove('on'); panelBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
    panelTimer = setTimeout(() => { panel.hidden = true; }, 320);
    if (refocus && panelFocus && panelFocus.focus) panelFocus.focus({ preventScroll: true });
    panelFocus = null;
  }
  panelBtns.forEach(b => b.addEventListener('click', e => { e.stopPropagation(); if (panel.classList.contains('on')) closePanel(true); else { openPanel(); track(b.dataset.track); } }));   // counted here: the click is stopped before the page's own counter sees it
  $('#panel-close').addEventListener('click', () => closePanel(true));
  document.addEventListener('click', e => { if (panel.classList.contains('on') && !e.target.closest('#panel')) closePanel(); });

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
    const extra = box.nextElementSibling;
    if (extra && extra.classList.contains('voices-extra')) { $('.voices-nav', box).append(...extra.children); extra.remove(); }
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
  // Every shelf of lesson spines on the page (About me, and the Classes details) works the same way: a spine shows its line in the box under its own shelf.
  const SHELF_HTML = $('.shelf').outerHTML;
  function showShelf(shelf, item) {
    const shelfDetail = shelf.parentElement.querySelector('.shelf-detail'), spines = $$('[data-item]', shelf);
    spines.forEach(b => { const on = b.dataset.item === item; b.classList.toggle('is-on', on); if (b.dataset.item === 'poems') b.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    if (item === 'poems') {
      shelfDetail.innerHTML = '<div class="fan" role="group" aria-label="The five poems I taught">' + POEMS.map((p, i) =>
        '<button class="poem-card" type="button" data-sheet="' + p.id + '" style="animation-delay:' + (i * 90) + 'ms"><span class="p-title">' + p.title + '</span><span class="p-poet">' + p.poet + '</span><span class="p-where">' + p.where + '</span></button>').join('') + '</div>';
    } else {
      const d = SHELF[item];
      shelfDetail.innerHTML = '<p class="caption">' + d.cap + ' <button class="textlink" type="button" data-sheet="' + d.sheet + '">Open →</button></p>';
    }
  }
  document.addEventListener('click', e => { const b = e.target.closest('.shelf [data-item]'); if (b) showShelf(b.closest('.shelf'), b.dataset.item); });

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
    { id: 'life', x: 255, y: 342, r: 6.5, label: 'A way of life',
      body: 'Philosophy as practice, not only doctrine. Designed and taught <em>The Good Life</em> (FIL220, 2024).', more: 'guide-c4' },
    { id: 'nature', x: 115, y: 400, r: 5.5, label: 'Animism & nature',
      body: '<em>Animism, Consilience and the Rights of Nature</em>, co-presented at the South African Society for Environmental Philosophy, North-West University, 2025.', more: 'papers' },
    { id: 'rorty', x: 96, y: 246, r: 5.5, label: 'Ethics & politics',
      body: 'An early article, <em>Contingency, irony and morality: a critical review of Rorty’s notion of the liberal utopia</em> (Humanities, 2013). In 2018 I redesigned <em>Introduction to Moral and Political Philosophy</em> for business students.',
      links: [['Read the article', 'https://doi.org/10.3390/h2020313']] },
    { id: 'meta', x: 450, y: 405, r: 5.5, label: 'Metacrisis',
      body: '<em>Is Philosophy A(gnostic)? Post-disciplinary Interventions in the Time of Metacrisis</em>, PSSA Annual Conference, University of Cape Town, 2026, with Mitchell Black.', more: 'papers' },
    { id: 'ai', x: 340, y: 55, r: 6.5, label: 'AI & the humanities',
      body: 'What is human teaching for, once a machine can write the essay? My current project, <em>Socratic Pedagogy beyond the AI Horizon</em>, reads Plato’s <em>Phaedrus</em> as a guide to what cannot be automated in learning, and to how teaching should be built around it.', more: 'ai' },
    { id: 'soul', x: 592, y: 60, r: 6, label: 'The soul',
      body: 'What is embodied, and what survives. Two papers in 2017: <em>Immortal and Separable Soul in Aristotle</em> (PSSA, Rhodes University) and <em>Embodiment in Bloom, Plotinus and Iamblichus</em> (University of the Western Cape).', more: 'papers' },
    { id: 'hidden', x: 500, y: 310, r: 5.5, label: 'Reading hidden texts',
      body: 'How to read a text that holds something back. Paper: <em>Reflexive Esotericism: Insights from Literary and Theological Hermeneutics</em>, PSSA, 2025.', more: 'papers' },
    { id: 'decol', x: 668, y: 406, r: 6, label: 'Decolonial curricula',
      body: 'An introduction to philosophy that follows it around the globe, not only through the West. I created <em>Introduction to Metaphysics and Epistemology</em> in 2019, and it is still in use at the University of Pretoria in 2026.', more: 'guide-c2' }
  ];
  const EDGES = [['plato', 'aristotle'], ['plato', 'neo'], ['plato', 'eso'], ['plato', 'life'], ['neo', 'theurgy'], ['neo', 'egypt'], ['theurgy', 'egypt'], ['eso', 'african'], ['eso', 'neo'], ['eso', 'meta'], ['life', 'nature'], ['life', 'meta'], ['nature', 'meta'], ['african', 'egypt'], ['plato', 'ai'], ['ai', 'life'],
    ['plato', 'rorty'], ['rorty', 'life'], ['rorty', 'meta'], ['soul', 'plato'], ['soul', 'aristotle'], ['soul', 'neo'], ['hidden', 'eso'], ['hidden', 'plato'], ['decol', 'african'], ['decol', 'egypt'], ['decol', 'life'], ['rorty', 'aristotle']];
  NODES.forEach(n => {
    const links = (n.links || []).map(l => '<li><a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + '</a></li>').join('');
    library['star-' + n.id] = { title: n.label, ch: 'think', html: '<p class="when">A star in my research</p><p>' + n.body + '</p>' + (links ? '<ul class="list">' + links + '</ul>' : '') + '<p class="more">' + (n.more === 'papers' ? '<button type="button" data-sheet="publications" data-at="papers">Conference papers →</button> ' : n.more ? '<button type="button" data-sheet="' + n.more + '">Go further →</button> ' : '') + '<button type="button" data-sheet="publications">Research and publications →</button></p>' };
  });
  const sky = $('#sky'), NS = 'http://www.w3.org/2000/svg';
  const mk = (n, a) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const put = (e, a) => { for (const k in a) e.setAttribute(k, a[k]); };
  // On a phone the same twelve stars are laid out again in a tall frame, so that every star and every name fits the screen with no sideways scrolling.
  const TALL = { ai: [100, 38], theurgy: [304, 44], aristotle: [56, 126], soul: [184, 112], neo: [282, 130], rorty: [68, 220], plato: [182, 214], egypt: [314, 214], life: [64, 318], hidden: [172, 304], eso: [276, 322],
    meta: [140, 404], decol: [262, 402], nature: [74, 484], african: [238, 500] };
  const byId = {}; NODES.forEach(n => { byId[n.id] = n; });
  const edgeEls = EDGES.map(([a, b]) => { const l = mk('line', {}); l.dataset.a = a; l.dataset.b = b; sky.appendChild(l); return l; });
  const nodeEls = {};
  NODES.forEach(n => {
    const g = mk('g', { class: 'node' + (n.big ? ' big' : ''), tabindex: '0', role: 'button', 'aria-label': n.label });
    n.hit = mk('circle', { class: 'hit' }); n.glow = mk('circle', { class: 'glow' }); n.dot = mk('circle', { class: 'dot' }); n.tx = mk('text', { 'text-anchor': 'middle' });
    n.dot.style.animationDelay = (-Math.random() * 5).toFixed(2) + 's'; n.tx.textContent = n.label;
    g.append(n.hit, n.glow, n.dot, n.tx);
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
  const narrowSky = matchMedia('(max-width: 640px)');
  function placeSky() {
    const tall = narrowSky.matches, k = tall ? .72 : 1, at = n => tall ? TALL[n.id] : [n.x, n.y];
    sky.setAttribute('viewBox', tall ? '0 0 360 548' : '0 0 1040 450'); sky.classList.toggle('tall', tall);
    NODES.forEach(n => { n.home = at(n); n.rr = n.r * k; n.lift = tall ? 17 : 24; n.hr = tall ? 24 : 28; if (!n.off) { n.off = [0, 0]; n.v = [0, 0]; } });
    sky.reach = tall ? 46 : 72;
    drawSky();
  }
  // Every star is drawn at its place plus how far it has been pulled (off); the lines follow their stars.
  function drawSky() {
    NODES.forEach(n => {
      const x = n.home[0] + n.off[0], y = n.home[1] + n.off[1], r = n.rr;
      put(n.hit, { cx: x, cy: y, r: n.hr }); put(n.glow, { cx: x, cy: y, r: r * 2.4 }); put(n.dot, { cx: x, cy: y, r: r }); put(n.tx, { x: x, y: y + r + n.lift });
    });
    edgeEls.forEach(l => { const a = byId[l.dataset.a], b = byId[l.dataset.b]; put(l, { x1: a.home[0] + a.off[0], y1: a.home[1] + a.off[1], x2: b.home[0] + b.off[0], y2: b.home[1] + b.off[1] }); });
  }
  placeSky();
  // The web gives a little: a star can be pulled a short way (it stretches like elastic, never far), the stars tied to it are drawn along,
  // and when it is let go everything wobbles back into place. Each star is held to its place by a spring, and each line is a spring too.
  // A tap still opens the star's note; only a real pull does not. Left out for anyone who asks their device for less motion.
  (() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const K_HOME = 38, K_EDGE = 68, DAMP = 5.5, STEP = 1 / 120;
    let held = null, from = null, base = null, pulled = false, justPulled = false, raf = 0, last = 0;
    const toSky = e => { const m = sky.getScreenCTM(); if (!m) return null; const q = sky.createSVGPoint(); q.x = e.clientX; q.y = e.clientY; const r = q.matrixTransform(m.inverse()); return [r.x, r.y]; };
    function step(dt) {
      NODES.forEach(n => { n.f = [-K_HOME * n.off[0], -K_HOME * n.off[1]]; });
      EDGES.forEach(([a, b]) => { const A = byId[a], B = byId[b], dx = B.off[0] - A.off[0], dy = B.off[1] - A.off[1];
        A.f[0] += K_EDGE * dx; A.f[1] += K_EDGE * dy; B.f[0] -= K_EDGE * dx; B.f[1] -= K_EDGE * dy; });
      NODES.forEach(n => {
        if (n === held && pulled) { n.v = [0, 0]; return; }
        const m = n.r / 6;   // the bigger stars are a little heavier
        for (let i = 0; i < 2; i++) { n.v[i] += (n.f[i] / m - DAMP * n.v[i]) * dt; n.off[i] += n.v[i] * dt; }
      });
    }
    function frame(t) {
      let dt = Math.min(.05, (t - (last || t)) / 1000); last = t;
      while (dt > 0) { step(Math.min(STEP, dt)); dt -= STEP; }
      drawSky();
      const moving = held || NODES.some(n => Math.abs(n.off[0]) + Math.abs(n.off[1]) > .04 || Math.abs(n.v[0]) + Math.abs(n.v[1]) > .04);
      if (moving) raf = requestAnimationFrame(frame);
      else { NODES.forEach(n => { n.off = [0, 0]; n.v = [0, 0]; }); drawSky(); raf = 0; last = 0; }
    }
    const go = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
    sky.addEventListener('pointerdown', e => {
      const g = e.target.closest('.node'); justPulled = false;
      if (!g || (e.pointerType === 'mouse' && e.button !== 0)) return;
      const n = NODES.find(x => nodeEls[x.id] === g), p = toSky(e); if (!n || !p) return;
      held = n; from = p; base = n.off.slice(); pulled = false;
    });
    window.addEventListener('pointermove', e => {
      if (!held) return;
      const p = toSky(e); if (!p) return;
      const dx = p[0] - from[0], dy = p[1] - from[1], len = Math.hypot(dx, dy);
      if (!pulled) { if (len < 7) return; pulled = true; sky.classList.add('pulling'); }
      const R = sky.reach, tx = base[0] + dx, ty = base[1] + dy, tl = Math.hypot(tx, ty), f = tl ? R * Math.tanh(tl / R) / tl : 0;   // elastic: the further, the harder
      held.off = [tx * f, ty * f]; go();
    });
    const letGo = () => { if (!held) return; if (pulled) { justPulled = true; sky.classList.remove('pulling'); } held = null; pulled = false; go(); };
    window.addEventListener('pointerup', letGo); window.addEventListener('pointercancel', letGo);
    sky.addEventListener('click', e => { if (justPulled) { justPulled = false; e.stopPropagation(); e.preventDefault(); } }, true);   // a pull is not a tap
  })();
  if (narrowSky.addEventListener) narrowSky.addEventListener('change', placeSky); else if (narrowSky.addListener) narrowSky.addListener(placeSky);

  /* ---------- Lectures: the player loads when you press play ---------- */
  const LECT_HTML = $('.lectures').outerHTML, GUIDES_HTML = $('.guide-shelf').outerHTML;   // kept as they are when the page opens, for the Lectures details
  document.addEventListener('click', e => {
    const b = e.target.closest('.lecture .play');
    if (!b) return;
    const l = b.closest('.lecture');
    if (l.classList.contains('playing')) return;
    const f = document.createElement('iframe');
    f.src = l.dataset.src; f.setAttribute('allow', 'autoplay; fullscreen'); f.setAttribute('allowfullscreen', ''); f.title = $('.l-cap strong', l).textContent;
    l.appendChild(f); l.classList.add('playing');
  });

  /* ---------- The editing typewriter ---------- */
  const typeTo = s => $$('.typer .txt').forEach(el => { el.textContent = s; });
  const PAIRS = [
    ['In order to write well, one must first read closely.', 'To write well, read closely.'],
    ['This essay will attempt to discuss the question of whether...', 'This essay argues that...'],
    ['It is a very unique and quite interesting argument.', 'It is a striking argument.'],
    ['Due to the fact that Macbeth is ambitious, he kills the king.', 'Ambition drives Macbeth to kill the king.']
  ];
  const wait = ms => new Promise(r => setTimeout(r, ms));
  // At rest the card shows one finished sentence. The typing runs only while the pointer is over the card, or focus is inside it.
  let typing = 0;
  async function runTyper(id) {
    const live = () => typing === id;
    for (let i = 0; live(); i++) {
      const a = PAIRS[i % PAIRS.length][0], b = PAIRS[i % PAIRS.length][1];
      for (let k = 1; k <= a.length && live(); k++) { typeTo(a.slice(0, k)); await wait(26); }
      if (live()) await wait(1400);
      for (let k = a.length; k >= 0 && live(); k--) { typeTo(a.slice(0, k)); await wait(11); }
      if (live()) await wait(260);
      for (let k = 1; k <= b.length && live(); k++) { typeTo(b.slice(0, k)); await wait(38); }
      if (live()) await wait(3000);
      for (let k = b.length; k >= 0 && live(); k--) { typeTo(b.slice(0, k)); await wait(9); }
      if (live()) await wait(500);
    }
  }
  const restTyper = () => typeTo(PAIRS[0][1]);
  restTyper();
  // Run fn(true) while the pointer is over a card or focus is inside it, fn(false) when both have left.
  function whileOver(card, fn) {
    if (!card) return;
    let over = false, within = false, on = false;
    const set = () => { const now = over || within; if (now !== on) { on = now; fn(on); } };
    card.addEventListener('pointerenter', () => { over = true; set(); });
    card.addEventListener('pointerleave', () => { over = false; set(); });
    card.addEventListener('focusin', () => { within = true; set(); });
    card.addEventListener('focusout', () => { within = false; set(); });
  }
  const typerEl = $('.typer');
  whileOver(typerEl && typerEl.closest('.svc'), on => { typing++; if (on) runTyper(typing); else restTyper(); });

  /* ---------- The design blocks ---------- */
  const LAYOUTS = [
    [[0, 0, 140, 26], [0, 32, 66, 26], [74, 32, 66, 26], [0, 64, 42, 26], [49, 64, 42, 26], [98, 64, 42, 26]],
    [[0, 0, 40, 90], [48, 0, 92, 20], [48, 26, 44, 28], [96, 26, 44, 28], [48, 60, 92, 12], [48, 76, 60, 14]],
    [[0, 0, 66, 42], [74, 0, 66, 42], [0, 48, 66, 42], [74, 48, 30, 42], [110, 48, 30, 20], [110, 72, 30, 18]],
    [[0, 0, 140, 16], [0, 20, 140, 16], [0, 40, 140, 16], [0, 60, 140, 16], [0, 80, 100, 10], [108, 80, 32, 10]]
  ];
  function layout(k) { $$('.blocks').forEach(box => { const bs = $$('i', box); LAYOUTS[k].forEach((r, i) => { const b = bs[i]; if (!b) return; b.style.transform = 'translate(' + r[0] + 'px,' + r[1] + 'px)'; b.style.width = r[2] + 'px'; b.style.height = r[3] + 'px'; }); }); }
  let lk = 0; layout(0);
  // The blocks rearrange themselves only while their card is pointed at; at rest they hold the first layout.
  let blocksTimer = null;
  const blocksEl = $('.blocks');
  whileOver(blocksEl && blocksEl.closest('.svc'), on => {
    clearInterval(blocksTimer); blocksTimer = null;
    if (on) { const step = () => { lk = (lk + 1) % LAYOUTS.length; layout(lk); }; step(); blocksTimer = setInterval(step, 1800); }
    else { lk = 0; layout(0); }
  });

  /* ---------- The shapes on the blackboard of My services: one wireframe for each kind of work, each morphing into the next ---------- */
  // Tutoring is two quills writing together; Editing is a sentence gathering itself out of a cloud of words; Learning design is a lesson
  // as a puzzle box of four layers that twist; Consulting is the tetraktys, ten points in a pyramid, with points that light and dim.
  // A drag turns the shape. Each tab of the board has its own: Teach the quills and the words (a tap, or Enter, changes between them),
  // Design the lesson stages, Consult the tetraktys.
  const tc = $('#tetra');
  let drawTetra = () => {}, sizeTetra = () => {}, showShapes = () => {};
  if (tc) {
    const tx = tc.getContext('2d'), nameEl = $('#maker-name'), whatEl = $('#maker-what'), hintEl = $('#maker-hint');
    const mixv = (p, q, m) => p + (q - p) * m, clamp01 = v => Math.max(0, Math.min(1, v));
    const ease = v => v < .5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2;
    // A pulse that is 0, rises to 1, holds, and falls back to 0, once every `period` milliseconds.
    const pulse = (t, period, up, hold, down) => { const s = t % period, r = period * .16; return s < up ? 0 : s < up + r ? ease((s - up) / r) : s < up + r + hold ? 1 : s < up + r + hold + r ? 1 - ease((s - up - r - hold) / r) : 0; };
    let TW = 0;

    /* 1. Tutoring: two quills writing together. The larger leads round the page in curls; the smaller follows half a turn behind
       and writes over the same line just as the first one's ink fades. */
    const QUILL = (() => {   // one quill with its nib at the origin, leaning to the right: a spine, a vane on either side that curls a little out of the page, a nib
      const pts = [], links = [], N = 11, nx = -.819, ny = .573;
      const spine = t => [.1 + 1.0 * t + .12 * Math.sin(t * Math.PI), .16 + 1.45 * t - .1 * Math.sin(t * Math.PI), .1 * Math.sin(t * Math.PI * 1.5)];
      for (let i = 0; i <= N; i++) { pts.push({ p: spine(i / N), r: 0 }); if (i) links.push([i - 1, i, 1]); }
      // The vanes begin a little way up the shaft, are widest below the middle and come to a point at the tip.
      [1, -1].forEach(side => {
        const base = pts.length;
        for (let i = 2; i < N; i++) {
          const t = i / N, u = (t - 2 / N) / (1 - 2 / N), w = .36 * Math.pow(Math.sin(Math.PI * Math.pow(u, .75)), .8) * (side > 0 ? 1 : .72), s = spine(t);
          pts.push({ p: [s[0] + nx * w * side - .05 * u, s[1] + ny * w * side - .1 * w, s[2] + .22 * w * side], r: .38 });
          links.push([i, base + i - 2, .4]);
          if (i > 2) links.push([base + i - 3, base + i - 2, 1]);
        }
        links.push([1, base, 1]); links.push([N, base + N - 3, 1]);
      });
      pts.push({ p: [0, 0, 0], r: .62 }); links.push([0, pts.length - 1, 1]);   // the nib
      return { pts, links };
    })();
    const PAGE = -.74, ORBIT = .46, CURL = .11, LOOPS = 7, TRAIL = 46, SPAN = Math.PI * .92;
    const nibAt = th => [ORBIT * Math.cos(th) + CURL * Math.cos(LOOPS * th), ORBIT * Math.sin(th) + CURL * Math.sin(LOOPS * th)];   // a nib goes round the middle of the page, curling as it goes
    function quill(t) {
      const pts = [], links = [], turn = t * .00045;   // once round the page in about fourteen seconds
      [[.86, 0, 1], [.56, Math.PI, .8]].forEach(([s, lag, dot]) => {
        const th = turn - lag, n = nibAt(th), base = pts.length;
        // Each quill trails behind its nib like a pen being drawn along, and rocks a little with every curl.
        const yaw = Math.atan2(Math.cos(th), Math.sin(th)) + .3 * Math.sin(LOOPS * th), rock = .1 * Math.cos(LOOPS * th);
        const cy = Math.cos(yaw), sy = Math.sin(yaw), cr = Math.cos(rock), sr = Math.sin(rock);
        QUILL.pts.forEach(q => {
          const x1 = q.p[0] * cr - q.p[1] * sr, y1 = q.p[0] * sr + q.p[1] * cr, z = q.p[2];
          pts.push({ p: [n[0] + s * (x1 * cy + z * sy), PAGE + s * y1, n[1] + s * (-x1 * sy + z * cy)], r: q.r * dot });
        });
        QUILL.links.forEach(l => links.push([base + l[0], base + l[1], l[2]]));
        // The ink it has just laid down, fading the further back it goes.
        for (let k = 0; k <= TRAIL; k++) {
          const p = nibAt(th - k / TRAIL * SPAN);
          pts.push({ p: [p[0], PAGE, p[1]], r: 0 });
          if (k) links.push([pts.length - 2, pts.length - 1, 1.5 * (1 - k / TRAIL)]);
        }
      });
      return { pts, links, labels: [] };
    }

    /* 2. Editing: the words of a sentence drift in a cloud, then the ones worth keeping gather into the shorter sentence. */
    const WORDS = PAIRS[0][0].split(' '), KEEP = PAIRS[0][1].split(' ');   // "In order to write well, one must first read closely." becomes "To write well, read closely."
    const keepAt = WORDS.map(w => KEEP.findIndex(k => k.toLowerCase() === w.toLowerCase()));
    const cloud = WORDS.map((w, i) => { const y = 1 - 2 * (i + .5) / WORDS.length, r = Math.sqrt(1 - y * y), th = i * 2.399963; return [Math.cos(th) * r * .9, y * .9, Math.sin(th) * r * .9]; });
    function words(t) {
      const a = pulse(t, 11000, 3200, 3000), size = TW * .058, swap = clamp01((a - .35) / .3);
      tx.font = '500 ' + (size * 1.075).toFixed(1) + 'px "EB Garamond", Georgia, serif';   // the size the words are drawn at once they reach the line
      const widths = KEEP.map(k => tx.measureText(k).width), gap = size * .32, total = widths.reduce((s, w) => s + w, 0) + gap * (KEEP.length - 1);
      let x = -total / 2;
      const lineX = widths.map(w => { const c = x + w / 2; x += w + gap; return c; });
      const pts = WORDS.map((w, i) => {
        const k = keepAt[i], bob = Math.sin(t * .0009 + i * 1.7) * .04;
        return { p: [cloud[i][0], cloud[i][1] + bob, cloud[i][2]], r: 0, f: k >= 0 ? [lineX[k], 0] : null, a: k >= 0 ? a : 0 };
      });
      const links = WORDS.map((w, i) => [i, (i + 1) % WORDS.length, .28 * (1 - a)]);
      const labels = [];
      WORDS.forEach((w, i) => {
        const k = keepAt[i];
        if (k < 0) labels.push({ i, text: w, size, serif: true, alpha: 1 - .82 * a });
        else if (KEEP[k] === w) labels.push({ i, text: w, size, serif: true, alpha: 1 });
        else { labels.push({ i, text: w, size, serif: true, alpha: 1 - swap }); labels.push({ i, text: KEEP[k], size, serif: true, alpha: swap }); }   // "to" fades into "To"
      });
      return { pts, links, labels };
    }

    /* 3. Learning design: a lesson as a puzzle box. Four layers, one for each stage of my lesson plans and as tall as its minutes,
       with the stage's name on every side. The layers twist a quarter turn one after another, slide apart like drawers, and close again. */
    const STAGES = [['Hook', 5], ['Introduction', 10], ['Body', 20], ['Consolidation', 5]];   // a 40-minute lesson
    const BOX = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    const EDGES = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    const FACES = [[4, 5, 6, 7], [1, 2, 6, 5], [0, 1, 2, 3], [0, 3, 7, 4], [3, 2, 6, 7], [0, 1, 5, 4]];
    const SIDE = 1.04, TALL = 1.5, MINUTES = STAGES.reduce((s, st) => s + st[1], 0);
    function blocks(t) {
      const PERIOD = 9000, cyc = Math.floor(t / PERIOD), s = t % PERIOD, hs = SIDE / 2;
      const open = s < 3400 ? 0 : s < 4500 ? ease((s - 3400) / 1100) : s < 6200 ? 1 : s < 7300 ? 1 - ease((s - 6200) / 1100) : 0;
      const gap = .03 + .1 * open, size = Math.max(10, TW * .03), pts = [], links = [], labels = [], quads = [];
      let top = (TALL + gap * (STAGES.length - 1)) / 2;
      STAGES.forEach((st, n) => {
        const h = st[1] / MINUTES * TALL, dir = n % 2 ? 1 : -1, cy = top - h / 2, cx = dir * .16 * open; top -= h + gap;
        const th = dir * Math.PI / 2 * (cyc + ease(clamp01((s - 400 - n * 380) / 1300))), c = Math.cos(th), sn = Math.sin(th), base = pts.length;
        BOX.forEach(q => { const x = q[0] * hs, z = q[2] * hs; pts.push({ p: [cx + x * c + z * sn, cy + q[1] * h / 2, -x * sn + z * c], r: .3 }); });
        EDGES.forEach(e => links.push([base + e[0], base + e[1], 1]));
        FACES.forEach(f => quads.push(f.map(k => base + k)));
        const text = st[0] + ' · ' + st[1] + ' min';
        for (let k = 0; k < 4; k++) {   // the middle of each side, a point to its right and a point above it: enough to lay the name flat on the side
          const ph = th + k * Math.PI / 2, nx = Math.sin(ph), nz = Math.cos(ph), o = pts.length;
          pts.push({ p: [cx + nx * hs, cy, nz * hs], r: 0 }, { p: [cx + (nx + nz) * hs, cy, (nz - nx) * hs], r: 0 }, { p: [cx + nx * hs, cy + h / 2, nz * hs], r: 0 });
          labels.push({ face: [o, o + 1, o + 2], hx: hs, hy: h / 2, text, size, serif: false, alpha: 1 });
        }
      });
      return { pts, links, labels, quads };
    }

    /* 4. Consulting: the tetraktys. Four corners of a tetrahedron and the middle of each edge: ten points, in layers of one, three and six. */
    const R3 = Math.sqrt(8 / 9), V = [[0, 1, 0], [R3, -1 / 3, 0], [-R3 / 2, -1 / 3, R3 * Math.sqrt(3) / 2], [-R3 / 2, -1 / 3, -R3 * Math.sqrt(3) / 2]];
    const P = V.slice();
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) P.push(V[a].map((v, n) => (v + V[b][n]) / 2));
    const gap3 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]), nearest = gap3(P[0], P[4]);
    const TLINKS = [];
    for (let a = 0; a < P.length; a++) for (let b = a + 1; b < P.length; b++) if (Math.abs(gap3(P[a], P[b]) - nearest) < 1e-6) TLINKS.push([a, b, 1]);
    const glow = P.map(() => 0); let lastSpark = 0;
    // Now and then the ten points flicker into ones and noughts, and back.
    const K = { phase: 0, from: 0, at: 0, flip: 0, bits: P.map((p, i) => i % 2 ? '1' : '0') };
    function stepTerms() { K.from = K.phase; K.phase = (K.phase + 1) % 2; K.at = performance.now(); }
    function tetraktys(t) {
      const n = performance.now();
      if (!reduced && t - lastSpark > 520) { lastSpark = t; glow[Math.floor(Math.random() * glow.length)] = 1; }   // now and then one point lights
      for (let i = 0; i < glow.length; i++) glow[i] *= .965;                                                          // and slowly dims
      if (T.cur !== 3 || T.mixing) { K.phase = K.from = 0; K.at = n - 900; }                                          // it always arrives as points
      else if (!reduced && n - K.at > (K.phase ? 4500 : 9000)) stepTerms();
      if (K.phase === 1 && n - K.flip > 130) { K.flip = n; K.bits[Math.floor(Math.random() * K.bits.length)] = Math.random() < .5 ? '0' : '1'; }
      const m = clamp01((n - K.at) / 900), w = ph => K.phase === K.from ? (ph === K.phase ? 1 : 0) : ph === K.phase ? m : ph === K.from ? 1 - m : 0;
      const size = TW * .052, labels = [];
      P.forEach((p, i) => {
        if (w(1) > .02) labels.push({ i, text: K.bits[i], size: size * 1.7, serif: false, alpha: w(1) });
      });
      return { pts: P.map((p, i) => ({ p: [p[0], p[1] - .12, p[2]], r: (1 + glow[i] * .9) * (.22 + .78 * w(0)), g: glow[i] })), links: TLINKS, labels };
    }

    /* A person: a small planet with an aura. The core is solid and shaded; the aura swells and fades, and a ring of light leaves it now and then.
       Its one point is its centre, which is where the other shapes gather when they change into it. */
    // It answers a touch: pressed, it sends out a ring and wobbles; dragged, it is pulled along and swings back; a pointer passing over it is enough to stir it.
    const ORB = { kick: 0, x: 0, y: 0, vx: 0, vy: 0, rings: [], last: 0, px: 0, py: 0 };
    const orbOn = () => T.cur === 8 && !T.mixing && !reduced;
    // It is water, not jelly: everything it does is slow, and it settles without bouncing.
    const RING_MS = 3200;
    function orbPoke(by, gap) { const n = performance.now(); ORB.kick = Math.min(1, ORB.kick + by); if (n - ORB.last > gap) { ORB.last = n; ORB.rings.push(n); } }
    tc.addEventListener('pointerdown', e => { ORB.px = e.clientX; ORB.py = e.clientY; if (orbOn()) orbPoke(.55, 500); });
    tc.addEventListener('pointermove', e => {
      const dx = e.clientX - ORB.px, dy = e.clientY - ORB.py, far = Math.abs(dx) + Math.abs(dy); ORB.px = e.clientX; ORB.py = e.clientY;
      if (!orbOn() || far < 1 || far > 90) return;
      if (T.drag) { ORB.vx += dx * .0005; ORB.vy += dy * .0005; orbPoke(.05, 1100); } else orbPoke(.012, 2600);
    });
    function person(t) {
      ORB.vx = (ORB.vx - ORB.x * .012) * .86; ORB.vy = (ORB.vy - ORB.y * .012) * .86;   // it drifts back to the middle, and does not overshoot
      ORB.x = Math.max(-.22, Math.min(.22, ORB.x + ORB.vx)); ORB.y = Math.max(-.22, Math.min(.22, ORB.y + ORB.vy)); ORB.kick *= .988;
      const n = performance.now(); ORB.rings = ORB.rings.filter(s => n - s < RING_MS);
      return { pts: [{ p: [0, 0, 0], r: 0 }], links: [], labels: [], orb: { r: .33, pulse: .5 + .5 * Math.sin(t * .0011), wave: (t % 6000) / 6000,
        dx: ORB.x, dy: ORB.y, kick: ORB.kick, wob: t * .0026, rip: t / 5200, rings: ORB.rings.map(s => (n - s) / RING_MS) } };
    }

    /* A university: a star tetrahedron, two tetrahedra through one another, its points lighting and dimming in turn. */
    const STAR = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(v => v.map(x => x * .58)), STAR8 = STAR.concat(STAR.map(v => v.map(x => -x)));
    const SP = STAR8.map(p => ({ p, r: 1 })), SLINKS = [], mids = [];
    for (let h = 0; h < 2; h++) for (let a = 0; a < 4; a++) for (let c = a + 1; c < 4; c++) {   // three small nodes along every edge
      let prev = h * 4 + a; const A = STAR8[h * 4 + a], B = STAR8[h * 4 + c];
      for (let k = 1; k < 4; k++) { SP.push({ p: A.map((v, n) => v + (B[n] - v) * k / 4), r: k === 2 ? .7 : .42 }); SLINKS.push([prev, SP.length - 1, 1]); prev = SP.length - 1; if (k === 2) mids.push(prev); }
      SLINKS.push([prev, h * 4 + c, 1]);
    }
    // Where the two tetrahedra cross they mark out an octahedron: its edges are drawn too, each with one node of its own.
    const sd = (i, k) => Math.hypot(SP[i].p[0] - SP[k].p[0], SP[i].p[1] - SP[k].p[1], SP[i].p[2] - SP[k].p[2]);
    const core = mids.filter((m, n) => !mids.slice(0, n).some(o => sd(m, o) < 1e-6)), near = Math.min(...core.slice(1).map(m => sd(core[0], m)));
    for (let a = 0; a < core.length; a++) for (let c = a + 1; c < core.length; c++) if (Math.abs(sd(core[a], core[c]) - near) < 1e-6) {
      const A = SP[core[a]].p, B = SP[core[c]].p;
      SP.push({ p: A.map((v, n) => (v + B[n]) / 2), r: .34 }); SLINKS.push([core[a], SP.length - 1, .6], [SP.length - 1, core[c], .6]);
    }
    const sglow = SP.map(() => 0); let sSpark = 0;
    function merkaba(t) {
      if (!reduced && t - sSpark > 150) { sSpark = t; sglow[Math.floor(Math.random() * SP.length)] = 1; }
      for (let i = 0; i < sglow.length; i++) sglow[i] *= .95;
      return { pts: SP.map((q, i) => ({ p: q.p, r: q.r * (1 + sglow[i] * 1.3), g: sglow[i] })), links: SLINKS, labels: [] };
    }

    /* 5. Classes: a ring of seats, one of them the teacher's. Talk crosses the ring between seats, not only to and from the front. */
    function classes(t) {
      const N = 13, pts = [], links = [], beat = t / 1700, s = Math.floor(beat), a = Math.sin(Math.PI * (beat % 1));
      const lit = new Array(N).fill(0);
      for (let k = 0; k < 4; k++) { const x = (s * 5 + k * 3) % N, y = (s * 11 + k * 7 + 4) % N; if (x !== y) { links.push([x, y, .95 * a]); lit[x] = lit[y] = a; } }
      for (let i = 0; i < N; i++) {
        const th = i / N * TAU;
        pts.push({ p: [.82 * Math.sin(th), -.3 + (i ? 0 : .16), .82 * Math.cos(th)], r: (i ? .75 : 1.5) + .5 * lit[i], g: lit[i] });
        links.push([i, (i + 1) % N, .3]);
      }
      return { pts, links, labels: [] };
    }

    /* 6. Lectures: a lectern, and a raked hall of rows fanning out in front of it. A wave passes back through the rows. */
    function lectures(t) {
      const pts = [{ p: [0, -.05, .8], r: 1.6, g: .4 }, { p: [0, -.6, .8], r: 0 }], links = [[0, 1, 1]];
      for (let row = 0; row < 4; row++) {
        const n = 5 + row, R = .55 + .3 * row, g = Math.max(0, Math.sin(t * .0022 - row * .95));
        for (let k = 0; k < n; k++) {
          const th = (k / (n - 1) - .5) * 1.75;
          pts.push({ p: [R * Math.sin(th), -.6 + .2 * row, .8 - R * Math.cos(th)], r: .6 + .55 * g, g: g * .8 });
          if (k) links.push([pts.length - 2, pts.length - 1, .3 + .4 * g]);
        }
      }
      return { pts, links, labels: [] };
    }

    /* 7. A module: a run of lessons. Each is a small copy of the lesson box, with its four layers and no words, and each is of its own size.
       Their layers twist a quarter turn, one lesson after another. */
    const RUN = [.8, 1.04, .9, 1.18, .72, .96], RUN_GAP = .085, RUN_W = RUN.reduce((s, k) => s + .27 * k, 0) + RUN_GAP * (RUN.length - 1);   // six lessons in a row
    function moduleShelf(t) {
      const pts = [], links = [], quads = [], PERIOD = 9000, FLOOR = -.4;
      let x = -RUN_W / 2;
      RUN.forEach((k, b) => {
        const hs = .135 * k, tall = .66 * k, gap = .014 * k, cx = x + hs, tb = t + (RUN.length - b) * 650, cyc = Math.floor(tb / PERIOD), s = tb % PERIOD;
        let top = FLOOR + tall + gap * (STAGES.length - 1); x += 2 * hs + RUN_GAP;
        STAGES.forEach((st, n) => {
          const h = st[1] / MINUTES * tall, dir = n % 2 ? 1 : -1, cy = top - h / 2; top -= h + gap;
          const th = dir * Math.PI / 2 * (cyc + ease(clamp01((s - 400 - n * 380) / 1300))), cs = Math.cos(th), sn = Math.sin(th), base = pts.length;
          BOX.forEach(q => { const u = q[0] * hs, z = q[2] * hs; pts.push({ p: [cx + u * cs + z * sn, cy + q[1] * h / 2, -u * sn + z * cs], r: .15 }); });
          EDGES.forEach(e => links.push([base + e[0], base + e[1], .9]));
          FACES.forEach(f => quads.push(f.map(i => base + i)));
        });
      });
      pts.push({ p: [-RUN_W / 2 - .08, FLOOR, 0], r: 0 }, { p: [RUN_W / 2 + .08, FLOOR, 0], r: 0 }); links.push([pts.length - 2, pts.length - 1, .5]);   // the line they stand on
      return { pts, links, labels: [], quads };
    }

    /* 8. A curriculum: a spiral stair, and every step of it is a module: a row of lessons laid flat, from the post outwards.
       The same ground comes round again, one level higher each time; a light climbs it, a module at a time. */
    const STEP = [.9, 1.16, .78, 1.06, .86];   // five lessons to a step
    function curriculum(t) {
      const N = 12, pts = [], links = [], quads = [], at = (t * .0016) % (N + 5) - 2.5;
      for (let i = 0; i < N; i++) {
        const th = i * .56, y = -.88 + i * 1.6 / (N - 1), g = Math.max(0, 1 - Math.abs(i - at) / 2), sn = Math.sin(th), cs = Math.cos(th);
        let r = .13;
        for (let b = 0; b < STEP.length; b++) {
          const k = STEP[(b + i) % STEP.length], s = .056 * k, w = .1 * k, rc = r + s, base = pts.length; r += 2 * s + .016;   // each lesson lies flat: a tile, as long and as wide as its size
          BOX.forEach(q => { const u = rc + q[0] * s, v = q[2] * w; pts.push({ p: [u * sn + v * cs, y + q[1] * .014, u * cs - v * sn], r: 0 }); });
          EDGES.forEach(e => links.push([base + e[0], base + e[1], .5 + .5 * g]));
          FACES.forEach(f => { const q = f.map(n => base + n); q.a = 1 + 5 * g; quads.push(q); });
        }
        pts.push({ p: [r * sn, y, r * cs], r: .2 + .4 * g, g: .8 * g });   // the end of the step, where the light on the stair shows
      }
      pts.push({ p: [0, -.94, 0], r: 0 }, { p: [0, .94, 0], r: 0 }); links.push([pts.length - 2, pts.length - 1, .4]);   // the post the stair turns about
      return { pts, links, labels: [], quads };
    }

    const SHAPES = [
      { key: 'tutoring', title: 'Tutoring', what: 'Quills', frame: quill },
      { key: 'editing', title: 'Editing', what: 'Words', frame: words },
      { key: 'design', title: 'Learning design', what: 'Lesson stages', frame: blocks },
      { key: 'consulting', title: 'Philosophical & AI consulting', what: 'Tetraktys', frame: tetraktys },
      { key: 'classes', what: 'Seats', frame: classes },
      { key: 'courses', what: 'Hall', frame: lectures },
      { key: 'design', what: 'Shelf', frame: moduleShelf },
      { key: 'design', what: 'Stair', frame: curriculum },
      { key: 'consulting', what: 'Centres', frame: person },
      { key: 'consulting', what: 'Star', frame: merkaba }
    ];
    const SETS = { teach: [0, 1, 4, 5], design: [2, 6, 7], consult: [8, 3, 9] }, TAB_NAME = { teach: 'Teach', design: 'Design', consult: 'Consult' };
    const T = { ax: .3, ay: -.35, vy: reduced ? 0 : .0035, drag: null, seen: false, col: null, theme: '', cur: 0, nxt: 0, mix: 0, mixing: false, since: performance.now(), set: 'teach', want: 0, named: 0 };
    const NAMES = ['Tutoring', 'Writing', 'Lessons', 'For Your School', 'Classes', 'Lectures', 'Modules', 'Curricula', 'For You', 'For Your University'];
    function caption(i) { T.named = i; nameEl.textContent = NAMES[i]; hintEl.textContent = 'drag to turn · tap to change'; }
    function tapShape() { nextShape(); }
    // Ask for a shape. If one is already changing, the new one follows as soon as that change is done.
    function goShape(i) {
      T.want = i; T.since = performance.now();
      if (T.mixing || i === T.cur) return;
      T.nxt = i;
      if (reduced) { T.cur = i; caption(i); return; }
      T.mixing = true; T.mix = 0;
    }
    function nextShape() { const set = SETS[T.set]; goShape(set[(set.indexOf(T.want) + 1) % set.length]); }
    showShapes = (tab, i) => { if (tab !== T.set) T.col = null;   // a new tab, a new colour for the object
      T.set = tab; goShape(i === undefined ? SETS[tab][0] : i); };
    caption(0);

    // Words are drawn once, large, onto their own small canvases and then placed as pictures: a picture glides between pixels, where type would step.
    const sprites = new Map();
    function sprite(text, serif, px, color) {
      const key = (serif ? 's' : 'n') + px.toFixed(1) + color + text;
      let sp = sprites.get(key);
      if (!sp) {
        const K = DPR * 2, c = document.createElement('canvas'), g = c.getContext('2d'), font = (serif ? '500 ' : '600 ') + px.toFixed(1) + 'px ' + (serif ? '"EB Garamond", Georgia, serif' : '"Source Sans 3", system-ui, sans-serif');
        g.font = font;
        const w = Math.ceil(g.measureText(text).width) + 8, h = Math.ceil(px * 1.5);
        c.width = Math.ceil(w * K); c.height = Math.ceil(h * K);
        g.setTransform(K, 0, 0, K, 0, 0); g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = 'rgb(' + color + ')'; g.fillText(text, w / 2, h / 2);
        sp = { c, w, h }; sprites.set(key, sp);
      }
      return sp;
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => sprites.clear());   // redraw the words once the real typefaces have arrived
    sizeTetra = () => { TW = tc.getBoundingClientRect().width || 300; tc.width = tc.height = Math.round(TW * DPR); tx.setTransform(DPR, 0, 0, DPR, 0, 0); tx.imageSmoothingQuality = 'high'; sprites.clear(); };
    new IntersectionObserver(es => { const now = es[0].isIntersecting; if (now && !T.seen) T.since = performance.now(); T.seen = now; }, { threshold: 0 }).observe(tc);   // the wait for the next shape starts when the cabinet comes into view
    tc.addEventListener('pointerdown', e => { if (e.button) return; T.drag = { x: e.clientX, y: e.clientY, moved: 0 }; tc.classList.add('dragging'); try { tc.setPointerCapture(e.pointerId); } catch (err) {} });
    tc.addEventListener('pointermove', e => {
      if (!T.drag) return;
      const dx = e.clientX - T.drag.x, dy = e.clientY - T.drag.y; T.drag.x = e.clientX; T.drag.y = e.clientY; T.drag.moved += Math.abs(dx) + Math.abs(dy);
      T.ay += dx * .008; T.ax = Math.max(-1.2, Math.min(1.2, T.ax + dy * .008)); T.vy = dx * .0012;
    });
    tc.addEventListener('pointerup', () => { if (!T.drag) return; const tap = T.drag.moved < 6; T.drag = null; tc.classList.remove('dragging'); if (tap) tapShape(); });
    tc.addEventListener('pointercancel', () => { T.drag = null; tc.classList.remove('dragging'); });
    tc.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { T.ay -= .2; e.preventDefault(); }
      else if (e.key === 'ArrowRight') { T.ay += .2; e.preventDefault(); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tapShape(); }
    });

    drawTetra = t => {
      if (!T.seen || !TW) return;
      const theme = root.getAttribute('data-theme') || 'dark';
      if (theme !== T.theme || !T.col) { T.theme = theme; T.col = rgb(cssVar('--accent', tc) || '#C9A24D'); sprites.clear(); }
      if (!T.drag) { T.ay += T.vy; T.vy += ((reduced ? 0 : .0035) - T.vy) * .02; T.ax += (.3 - T.ax) * .012; }
      if (T.mixing) { T.mix += Math.min(400, t - (T.last || t)) / 1150; if (T.mix >= .5 && T.named !== T.nxt) caption(T.nxt); if (T.mix >= 1) { T.mixing = false; T.cur = T.nxt; if (T.want !== T.cur) goShape(T.want); } }
      else if (!reduced && !T.drag && SETS[T.set].length > 1 && t - T.since > 13000) nextShape();   // left alone on the Teach tab, it moves between the quills and the words by itself
      T.last = t;   // a change of shape takes the same time whatever the frame rate of the screen
      const tt = reduced ? 0 : t;   // with reduced motion the shapes hold still
      const m = T.mixing ? ease(clamp01(T.mix)) : 0, A = SHAPES[T.cur].frame(tt), B = T.mixing ? SHAPES[T.nxt].frame(tt) : null;
      const ca = Math.cos(T.ax), sa = Math.sin(T.ax), cb = Math.cos(T.ay), sb = Math.sin(T.ay), sc = TW * .4;
      const place = q => {
        const p = q.p, x = p[0] * cb + p[2] * sb, z0 = -p[0] * sb + p[2] * cb, y = p[1] * ca - z0 * sa, z = p[1] * sa + z0 * ca, f = 3.4 / (3.4 - z);
        const o = { x: TW / 2 + x * f * sc, y: TW / 2 - y * f * sc, d: clamp01((z + 1) / 2) };
        if (q.a && q.f) { o.x = mixv(o.x, TW / 2 + q.f[0], q.a); o.y = mixv(o.y, TW / 2 + q.f[1], q.a); o.d = mixv(o.d, .85, q.a); }   // words that have left the cloud for the line
        return o;
      };
      const PA = A.pts.map(place), PB = B ? B.pts.map(place) : null;
      const blend = (p, q) => ({ x: mixv(p.x, q.x, m), y: mixv(p.y, q.y, m), d: mixv(p.d, q.d, m) });
      const posA = i => PB ? blend(PA[i], PB[i % PB.length]) : PA[i], posB = i => blend(PA[i % PA.length], PB[i]);
      const col = T.col.r + ',' + T.col.g + ',' + T.col.b, tcol = pal.text.r + ',' + pal.text.g + ',' + pal.text.b;
      tx.clearRect(0, 0, TW, TW);
      // A soft light behind the shape, breathing slowly, as behind the solid on the first screen.
      const br = reduced ? .5 : .5 + .5 * Math.sin(t * .0006), grad = tx.createRadialGradient(TW / 2, TW / 2, sc * .2, TW / 2, TW / 2, sc * 1.25);
      grad.addColorStop(0, 'rgba(' + col + ',' + ((pal.light ? .08 : .12) * br + .035).toFixed(3) + ')'); grad.addColorStop(1, 'rgba(' + col + ',0)');
      tx.fillStyle = grad; tx.fillRect(0, 0, TW, TW);
      const paint = (S, pos, fade) => {
        if (fade <= .01) return;
        if (S.orb) {   // a planet and its aura
          const p0 = pos(0), o = S.orb, c = { x: p0.x + o.dx * sc * fade, y: p0.y + o.dy * sc * fade }, R = sc * o.r * (.35 + .65 * fade), A = R * (2.05 + .4 * o.pulse + .3 * o.kick), L = pal.light, k = L ? 1.35 : 1;
          const mixc = (to, m) => [T.col.r, T.col.g, T.col.b].map(v => Math.round(v + (to - v) * m)).join(','), rg = (x, y, r0, r1) => tx.createRadialGradient(x, y, r0, c.x, c.y, r1);
          let g = rg(c.x, c.y, R * .92, A);   // the aura: densest against the planet, gone at its edge; it swells and fades
          g.addColorStop(0, 'rgba(' + col + ',' + Math.min(1, (.5 - .16 * o.pulse) * k * fade).toFixed(3) + ')'); g.addColorStop(.4, 'rgba(' + col + ',' + (.17 * k * fade).toFixed(3) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
          tx.fillStyle = g; tx.beginPath(); tx.arc(c.x, c.y, A, 0, TAU); tx.fill();
          const W = R * (1.05 + 1.5 * o.wave);   // a ring of light leaving it
          tx.lineWidth = 1.6; tx.strokeStyle = 'rgba(' + col + ',' + (.55 * k * (1 - o.wave) * fade).toFixed(3) + ')'; tx.beginPath(); tx.arc(c.x, c.y, W, 0, TAU); tx.stroke();
          for (const ph of o.rings) {   // the rings a touch sends out
            const e = 1 - (1 - ph) * (1 - ph);   // a ring slows as it spreads, as on a pond
            tx.lineWidth = .6 + 1.3 * (1 - ph); tx.strokeStyle = 'rgba(' + col + ',' + (.5 * k * (1 - ph) * (1 - ph) * fade).toFixed(3) + ')'; tx.beginPath(); tx.arc(c.x, c.y, R * (1 + 1.9 * e), 0, TAU); tx.stroke();
          }
          const wb = .03 * o.kick * Math.sin(o.wob);   // touched, the core gives a little, slowly, and settles
          tx.save(); tx.translate(c.x, c.y); tx.rotate(o.wob * .21); tx.scale(1 + wb, 1 - wb); tx.rotate(-o.wob * .21);
          g = tx.createRadialGradient(-R * .38, -R * .42, R * .04, 0, 0, R);   // the core: lit from the upper left, in shadow at the lower right
          g.addColorStop(0, 'rgba(' + mixc(255, L ? .5 : .82) + ',' + fade.toFixed(3) + ')'); g.addColorStop(.45, 'rgba(' + col + ',' + fade.toFixed(3) + ')'); g.addColorStop(1, 'rgba(' + mixc(0, L ? .45 : .62) + ',' + fade.toFixed(3) + ')');
          tx.fillStyle = g; tx.beginPath(); tx.arc(0, 0, R, 0, TAU); tx.fill();
          if (o.kick > .03) {   // and ripples cross its face
            tx.save(); tx.clip(); tx.lineWidth = 1.1;
            for (let i = 0; i < 2; i++) { const q = (o.rip + i / 2) % 1; tx.strokeStyle = 'rgba(' + mixc(255, L ? .55 : .85) + ',' + (.32 * Math.min(1, o.kick * 1.6) * Math.sin(Math.PI * q) * fade).toFixed(3) + ')'; tx.beginPath(); tx.arc(-R * .38, -R * .42, R * 1.9 * q, 0, TAU); tx.stroke(); }
            tx.restore();
          }
          tx.lineWidth = 1.2; tx.strokeStyle = 'rgba(' + mixc(255, L ? .2 : .5) + ',' + (.7 * fade).toFixed(3) + ')'; tx.beginPath(); tx.arc(0, 0, R, 0, TAU); tx.stroke();
          tx.restore();
        }
        if (S.quads) {   // the sides of the box, faintly glazed; a side can be lit more than the rest
          for (const q of S.quads) { tx.fillStyle = 'rgba(' + col + ',' + (.05 * (q.a || 1) * fade).toFixed(3) + ')'; tx.beginPath(); q.forEach((i, k) => { const p = pos(i); if (k) tx.lineTo(p.x, p.y); else tx.moveTo(p.x, p.y); }); tx.closePath(); tx.fill(); }
        }
        for (const l of S.links) {
          const a = pos(l[0]), b = pos(l[1]), dep = (a.d + b.d) / 2, al = (.2 + .6 * dep) * l[2] * fade;
          if (al < .01) continue;
          tx.lineWidth = .9 + .9 * dep;
          tx.strokeStyle = 'rgba(' + col + ',' + al.toFixed(3) + ')';
          tx.beginPath(); tx.moveTo(a.x, a.y); tx.lineTo(b.x, b.y); tx.stroke();
        }
        S.pts.forEach((q, i) => {
          if (!q.r) return;
          const p = pos(i), r = TW * (.011 + .013 * p.d) * q.r, g = q.g || 0;
          tx.fillStyle = 'rgba(' + col + ',' + ((.16 + .2 * p.d + .4 * g) * fade).toFixed(3) + ')';
          tx.beginPath(); tx.arc(p.x, p.y, r * (2.4 + 1.2 * g), 0, TAU); tx.fill();
          tx.fillStyle = 'rgba(' + tcol + ',' + ((.55 + .45 * Math.max(p.d, g)) * fade).toFixed(3) + ')';
          tx.beginPath(); tx.arc(p.x, p.y, r, 0, TAU); tx.fill();
        });
        for (const L of S.labels) {
          const sp = sprite(L.text, L.serif, L.serif ? L.size * 1.12 : L.size, tcol);
          if (L.face) {   // a name lying flat on the side of a block, shown only while that side faces us
            const O = pos(L.face[0]), X = pos(L.face[1]), Y = pos(L.face[2]), wx = L.hx * sc, wy = L.hy * sc;
            const facing = -((X.x - O.x) * (Y.y - O.y) - (X.y - O.y) * (Y.x - O.x)) / (wx * wy), al = L.alpha * clamp01((facing - .15) / .4) * fade;
            if (al < .02) continue;
            const k = Math.min(1, 2 * wx * .86 / sp.w, 2 * wy * .72 / sp.h);
            tx.setTransform(DPR * (X.x - O.x) / wx, DPR * (X.y - O.y) / wx, DPR * (O.x - Y.x) / wy, DPR * (O.y - Y.y) / wy, DPR * O.x, DPR * O.y);
            tx.globalAlpha = al; tx.drawImage(sp.c, -sp.w * k / 2, -sp.h * k / 2, sp.w * k, sp.h * k);
          } else {   // a word in the cloud, a little larger as it comes nearer
            const p = pos(L.i), al = L.alpha * (.5 + .5 * p.d) * fade;
            if (al < .02) continue;
            const k = (.82 + .3 * p.d) / 1.12;
            tx.setTransform(DPR * k, 0, 0, DPR * k, DPR * p.x, DPR * p.y);
            tx.globalAlpha = al; tx.drawImage(sp.c, -sp.w / 2, -sp.h / 2, sp.w, sp.h);
          }
        }
        tx.setTransform(DPR, 0, 0, DPR, 0, 0); tx.globalAlpha = 1;
      };
      paint(A, posA, 1 - m);
      if (B) paint(B, posB, m);
    };
    if ('ResizeObserver' in window) new ResizeObserver(() => sizeTetra()).observe(tc);
  }

  /* ---------- Main loop ---------- */
  function loop(t) {
    if (pageVisible) { drawField(t); if (heroVisible) drawSolid(t); arcTick(t); drawTetra(t); }
    requestAnimationFrame(loop);
  }
  sizeField(); sizeSolid(); sizeTetra();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sizeField(); sizeSolid(); sizeTetra(); if (reduced) { drawField(0); drawSolid(performance.now()); } }, 120); });
  requestAnimationFrame(loop);
  if ('ResizeObserver' in window) new ResizeObserver(() => sizeSolid()).observe(sc);
  openFromHash();
})();
