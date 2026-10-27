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
      if (!reduced) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = FW + 10; else if (p.x > FW + 10) p.x = -10;
        if (p.y < -10) p.y = FH + 10; else if (p.y > FH + 10) p.y = -10;
      }
      const x = p.x + ox * p.z, y = p.y + oy * p.z;
      const tw = reduced ? .7 : .55 + .45 * Math.sin(t * .0012 + p.p);
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
    if (!S.drag && !reduced) { S.ax += .00016 * dt + S.vx; S.ay += .00026 * dt + S.vy; S.vx *= .94; S.vy *= .94; }
    if (!coarse) { S.tx += ((mouse.y - .5) * .45 - S.tx) * .04; S.ty += ((mouse.x - .5) * .45 - S.ty) * .04; }
    const cx = SW / 2, cy = SW / 2, R = SW * .36;
    const br = .5 + .5 * Math.sin(t * .0006), g = pal.gold;
    const grad = sx.createRadialGradient(cx, cy, R * .2, cx, cy, R * 1.5);
    grad.addColorStop(0, 'rgba(' + g.r + ',' + g.g + ',' + g.b + ',' + ((pal.light ? .09 : .13) * br + .04).toFixed(3) + ')');
    grad.addColorStop(1, 'rgba(' + g.r + ',' + g.g + ',' + g.b + ',0)');
    sx.fillStyle = grad; sx.fillRect(0, 0, SW, SW);
    if (!reduced && S.nxt < 0 && !S.drag && t - S.lastSwitch > 9000) switchSolid();
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

  /* ---------- Reveal on scroll ---------- */
  const revIO = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); } }); }, { threshold: .12 });
  const onScreen = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight * .95 && r.bottom > 0; };
  $$('.reveal').forEach(el => {
    const sib = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
    el.style.transitionDelay = (sib.indexOf(el) * 110) + 'ms';
    // Anything already on screen is shown at once (the rect read above forces a style pass, so it still fades in).
    if (onScreen(el)) el.classList.add('in'); else revIO.observe(el);
  });
  // Safety net: never leave something on screen invisible.
  setTimeout(() => $$('.reveal:not(.in)').forEach(el => { if (onScreen(el)) el.classList.add('in'); }), 2500);

  /* ---------- Counting numbers ---------- */
  const cntIO = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      cntIO.unobserve(e.target);
      const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1600;
      if (reduced) { el.textContent = to + suf; return; }
      (function step(t) {
        const p = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
        el.textContent = v + suf;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(el => cntIO.observe(el));

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
    if (!A.visible || reduced || t < A.hold) { placeRunner(); return; }
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

  /* ---------- The shelf ---------- */
  const shelfCap = $('#shelf-cap');
  $$('.book').forEach(b => b.addEventListener('click', () => {
    $$('.book').forEach(o => o.classList.toggle('is-on', o === b));
    shelfCap.classList.add('swap');
    setTimeout(() => { shelfCap.textContent = b.dataset.cap; shelfCap.classList.remove('swap'); }, 200);
  }));

  /* ---------- The constellation ---------- */
  const NODES = [
    { id: 'plato', x: 400, y: 250, r: 9, big: true, label: 'Plato',
      body: 'The centre of the map. My PhD, <em>Ainigma</em>, read Plato’s esotericism in its historical context: what he wrote, what he withheld, and why.',
      links: [['Ainigma: Plato’s Esotericism in Context (PhD, 2023)', 'https://repository.up.ac.za/handle/2263/89290']] },
    { id: 'aristotle', x: 235, y: 160, r: 6, label: 'Aristotle',
      body: 'My MA, <em>Symphonia</em>, argued that Aristotle stays in harmony with Plato on the separable, immortal soul. The argument became a journal article in 2017.',
      links: [['Aristotle’s harmony with Plato on separable and immortal soul (SAJP, 2017)', 'https://doi.org/10.1080/02580136.2017.1385951'], ['Symphonia: Aristotle versus Plato Critiqued (MA, 2016)', 'https://repository.up.ac.za/handle/2263/57175']] },
    { id: 'neo', x: 575, y: 160, r: 7, label: 'Neoplatonism',
      body: 'Plotinus, Iamblichus, Proclus. A member of the International Society for Neoplatonic Studies since 2017. In 2026 I designed and taught the honours course <em>Philosophy as a Rite of Rebirth: From Ancient Egypt to Neoplatonism</em>.' },
    { id: 'theurgy', x: 690, y: 85, r: 5, label: 'Theurgy',
      body: 'Ritual as philosophy in late Platonism. Conference paper: <em>The Curious Case of Neoplatonic Ritual Magic</em>, PSSA, University of KwaZulu-Natal, 2020.' },
    { id: 'egypt', x: 700, y: 260, r: 5, label: 'Ancient Egypt',
      body: 'Where the rite of rebirth begins. The opening movement of the honours course <em>Philosophy as a Rite of Rebirth</em> (FIL710/810, 2026).' },
    { id: 'eso', x: 520, y: 370, r: 7, label: 'Esotericism',
      body: 'Hidden teachings, and how to read them. Honours course: <em>The (Secret) History of Thought</em> (2024, 2025). Paper: <em>Reflexive Esotericism: Insights from Literary and Theological Hermeneutics</em>, PSSA, 2025.' },
    { id: 'african', x: 672, y: 440, r: 6, label: 'African esotericism',
      body: 'Postdoctoral Research Fellow at the University of Johannesburg, 2024 to 2026: <em>Platonic and African Esotericism</em>, with an eye on decolonial curricula.' },
    { id: 'life', x: 285, y: 385, r: 6, label: 'A way of life',
      body: 'Philosophy as practice, not only doctrine. Designed and taught <em>The Good Life</em> (FIL220, 2024).' },
    { id: 'nature', x: 150, y: 470, r: 5, label: 'Animism & nature',
      body: '<em>Animism, Consilience and the Rights of Nature</em>, co-presented at the South African Society for Environmental Philosophy, North-West University, 2025.' },
    { id: 'rorty', x: 115, y: 285, r: 4.5, label: 'Rorty',
      body: 'An early article: <em>Contingency, irony and morality: a critical review of Rorty’s notion of the liberal utopia</em>, Humanities, 2013.',
      links: [['Read the article', 'https://doi.org/10.3390/h2020313']] },
    { id: 'meta', x: 420, y: 485, r: 5, label: 'Metacrisis',
      body: '<em>Is Philosophy A(gnostic)? Post-disciplinary Interventions in the Time of Metacrisis</em>, PSSA Annual Conference, University of Cape Town, 2026, with Mitchell Black.' }
  ];
  const EDGES = [['plato', 'aristotle'], ['plato', 'neo'], ['plato', 'eso'], ['plato', 'life'], ['plato', 'rorty'], ['neo', 'theurgy'], ['neo', 'egypt'], ['theurgy', 'egypt'], ['eso', 'african'], ['eso', 'neo'], ['eso', 'meta'], ['life', 'nature'], ['life', 'meta'], ['nature', 'meta'], ['african', 'egypt']];
  const sky = $('#sky'), NS = 'http://www.w3.org/2000/svg';
  const mk = (n, a) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const byId = {}; NODES.forEach(n => { byId[n.id] = n; });
  const edgeEls = EDGES.map(([a, b]) => { const l = mk('line', { x1: byId[a].x, y1: byId[a].y, x2: byId[b].x, y2: byId[b].y }); l.dataset.a = a; l.dataset.b = b; sky.appendChild(l); return l; });
  const nodeEls = {};
  const panel = $('#panel'), pTitle = $('#panel-title'), pBody = $('#panel-body'), pLinks = $('#panel-links');
  function openPanel(n) {
    pTitle.textContent = n.label; pBody.innerHTML = n.body;
    pLinks.innerHTML = (n.links || []).map(l => '<li><a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + '</a></li>').join('');
    panel.hidden = false; panel.classList.remove('rise'); void panel.offsetWidth; panel.classList.add('rise');
    Object.keys(nodeEls).forEach(k => nodeEls[k].classList.toggle('sel', k === n.id));
  }
  function closePanel() { panel.hidden = true; Object.keys(nodeEls).forEach(k => nodeEls[k].classList.remove('sel')); }
  $('.panel .close').addEventListener('click', closePanel);
  // On a phone the sky is wider than the screen: start it centred on Plato.
  const skyWrap = $('.sky');
  function centreSky() { if (skyWrap.scrollWidth > skyWrap.clientWidth + 4) skyWrap.scrollLeft = (skyWrap.scrollWidth - skyWrap.clientWidth) / 2; }
  centreSky(); window.addEventListener('resize', centreSky);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  NODES.forEach(n => {
    const g = mk('g', { class: 'node' + (n.big ? ' big' : ''), tabindex: '0', role: 'button', 'aria-label': n.label });
    g.appendChild(mk('circle', { class: 'hit', cx: n.x, cy: n.y, r: 28 }));
    g.appendChild(mk('circle', { class: 'glow', cx: n.x, cy: n.y, r: n.r * 2.4 }));
    const d = mk('circle', { class: 'dot', cx: n.x, cy: n.y, r: n.r }); d.style.animationDelay = (-Math.random() * 5).toFixed(2) + 's'; g.appendChild(d);
    const tx = mk('text', { x: n.x, y: n.y + n.r + 22, 'text-anchor': 'middle' }); tx.textContent = n.label; g.appendChild(tx);
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
    g.addEventListener('click', () => openPanel(n));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPanel(n); } });
  });

  /* ---------- Tools: open and close ---------- */
  $$('.tool').forEach(tool => {
    const b = $('.t-head', tool);
    b.addEventListener('click', () => { const open = tool.classList.toggle('open'); b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
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
    if (reduced) { typer.textContent = PAIRS[0][1]; return; }
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
  if (!reduced) setInterval(() => { lk = (lk + 1) % LAYOUTS.length; layout(lk); }, 2800);

  /* ---------- The marking tool ---------- */
  const ranges = ['#r1', '#r2', '#r3'].map(s => $(s)), gfg = $('#gfg'), gTotal = $('#g-total'), gBand = $('#g-band');
  const band = t => t >= 27 ? 'Distinction' : t >= 21 ? 'Strong' : t >= 15 ? 'Sound' : t >= 9 ? 'Developing' : 'Not yet';
  function rubric() {
    let t = 0;
    ranges.forEach(r => { t += +r.value; r.nextElementSibling.textContent = r.value; });
    gTotal.textContent = t; gBand.textContent = band(t);
    gfg.style.strokeDashoffset = 100 - (t / 30) * 100;
  }
  ranges.forEach(r => r.addEventListener('input', rubric)); rubric();

  /* ---------- The years ---------- */
  const track = $('#track'), trackCap = $('#track-cap'), evs = $$('.ev');
  let td = null, dragged = false;
  track.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') return; td = { x: e.clientX, sl: track.scrollLeft, moved: 0 }; dragged = false; track.classList.add('dragging'); track.setPointerCapture(e.pointerId); });
  track.addEventListener('pointermove', e => { if (!td) return; const dx = e.clientX - td.x; td.moved += Math.abs(dx); if (td.moved > 6) dragged = true; track.scrollLeft = td.sl - dx; });
  const tEnd = () => { if (!td) return; td = null; track.classList.remove('dragging'); setTimeout(() => { dragged = false; }, 50); };
  track.addEventListener('pointerup', tEnd); track.addEventListener('pointercancel', tEnd);
  function pickYear(li) {
    evs.forEach(o => o.classList.toggle('is-on', o === li));
    trackCap.classList.add('swap');
    setTimeout(() => { trackCap.textContent = $('button', li).dataset.cap; trackCap.classList.remove('swap'); }, 200);
  }
  evs.forEach(li => $('button', li).addEventListener('click', () => { if (dragged) return; pickYear(li); }));
  // Start the story at the latest year, scrolled into view.
  new IntersectionObserver(es => { if (es[0].isIntersecting) { pickYear(evs[evs.length - 1]); track.scrollLeft = track.scrollWidth; } }, { threshold: .3 }).observe(track);

  /* ---------- Main loop ---------- */
  function loop(t) {
    if (pageVisible) { drawField(t); if (heroVisible) drawSolid(t); arcTick(t); }
    requestAnimationFrame(loop);
  }
  sizeField(); sizeSolid();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sizeField(); sizeSolid(); if (reduced) { drawField(0); drawSolid(performance.now()); } }, 120); });
  if (reduced) { drawField(0); drawSolid(performance.now()); placeRunner(); }
  else requestAnimationFrame(loop);
})();
