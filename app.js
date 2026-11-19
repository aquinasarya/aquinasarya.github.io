(() => {
  const D = window.DATA, { esc, reduce, cover, player, reveal } = window.TA, $ = (s, r = document) => r.querySelector(s);

  // ── Loader: dots gather into "Thomas Arya" (Arya heavier), a striped bar fills, then the dots burst.
  const loader = $('#loader');
  let seen = false; try { seen = sessionStorage.getItem('ta-seen') === '1'; } catch (e) {}
  const endLoader = () => { loader.classList.add('out'); document.body.classList.remove('is-loading'); setTimeout(() => loader.remove(), 900); try { sessionStorage.setItem('ta-seen', '1'); } catch (e) {} };
  if (reduce || (seen && !/[?&]intro/.test(location.search))) { loader.remove(); document.body.classList.remove('is-loading'); }
  else (async () => {
    const cv = $('#loaderCanvas'), W = 900, H = 240, dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const safety = setTimeout(endLoader, 6000);
    try { await Promise.race([Promise.all([document.fonts.load('400 150px Inter'), document.fonts.load('800 150px Inter')]), new Promise((r) => setTimeout(r, 1500))]); } catch (e) {}
    const o = document.createElement('canvas'); o.width = W; o.height = H;
    const g = o.getContext('2d', { willReadFrequently: true }); g.textBaseline = 'middle'; g.fillStyle = '#fff';
    let fs = 150; const fam = 'Inter, system-ui, sans-serif';
    const measure = () => { g.font = `400 ${fs}px ${fam}`; const a = g.measureText('Thomas ').width; g.font = `800 ${fs}px ${fam}`; return [a, g.measureText('Arya').width]; };
    let [a, b] = measure(); fs = Math.floor(fs * Math.min(1, 860 / (a + b))); [a, b] = measure();
    const x0 = (W - a - b) / 2;
    g.font = `400 ${fs}px ${fam}`; g.fillText('Thomas', x0, H / 2 + 6);
    g.font = `800 ${fs}px ${fam}`; g.fillText('Arya', x0 + a, H / 2 + 6);
    const px = g.getImageData(0, 0, W, H).data, dots = [], step = 4;
    for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) if (px[(y * W + x) * 4 + 3] > 110) {
      const ang = Math.random() * 6.283, rad = 260 + Math.random() * 260;
      dots.push({ hx: x, hy: y, x: W / 2 + Math.cos(ang) * rad, y: H / 2 + Math.sin(ang) * rad * 0.5, vx: 0, vy: 0, bold: x >= x0 + a - 2, d: Math.random() * 14 });
    }
    const c = cv.getContext('2d'); let frame = 0, raf = 0, free = false;
    const tick = () => {
      frame++; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
      for (const p of dots) {
        if (!free && frame > p.d) { p.vx = (p.vx + (p.hx - p.x) * 0.055) * 0.82; p.vy = (p.vy + (p.hy - p.y) * 0.055) * 0.82; }
        p.x += p.vx; p.y += p.vy;
        const sp = Math.hypot(p.vx, p.vy), s = Math.min(2.6, 1 + sp * 0.12), rot = Math.atan2(p.vy, p.vx);
        c.fillStyle = p.bold ? '#FFFFFF' : '#8FA0D0';
        c.beginPath(); c.ellipse(p.x, p.y, 1.55 * s, 1.55 / Math.sqrt(s), rot, 0, 6.283); c.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    setTimeout(() => {
      clearTimeout(safety); free = true;
      for (const p of dots) { const dx = p.x - W / 2, dy = p.y - H / 2, dd = Math.hypot(dx, dy) || 1; const f = 6 + Math.random() * 16; p.vx = (dx / dd) * f; p.vy = (dy / dd) * f * 0.7; }
      setTimeout(() => { endLoader(); setTimeout(() => cancelAnimationFrame(raf), 900); }, 260);
    }, 2400);
  })();

  // ── Marquee
  const names = D.partners.map((p) => `<img src="img/logos/${p[1]}.png" alt="${esc(p[0])}" style="height:${p[2] || 48}px">`).join('');
  $('#marquee').innerHTML = names + names;

  // ── Work cards: each opens its own page
  $('#workGrid').innerHTML = D.projects.map((p, i) => `
    <a class="wcard reveal" href="work.html?k=${p.id}">
      ${cover(p)}<span class="wtag">${esc(p.type)}</span>
      <span class="wcap"><span><b>${esc(p.name)}</b><small>${esc(p.sub)}</small></span><i aria-hidden="true">↗</i></span>
      <span class="wnum">${String(i + 1).padStart(2, '0')}</span>
    </a>`).join('');

  // ── Services, experience
  $('#services-rows').innerHTML = D.services.map((s, i) => `<div class="reveal"><small>0${i + 1}</small><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><div class="pills">${s[2].map((x) => `<span>${esc(x)}</span>`).join('')}</div></div>`).join('');
  $('#xp').innerHTML = D.xp.map((x, i) => `<li class="reveal"><span class="n">${i + 1})</span><div><small>${esc(x[0])}</small><h3>${esc(x[1])} <i>at</i> <b>${esc(x[2])}</b></h3><p>${esc(x[3])}</p></div></li>`).join('');
  $('#talkPlayer').innerHTML = player('8dJPfvxFz30', 7075, 'Starts at 1:57:55');

  // ── More work: first 7 rows, the rest behind "See more"; rows with a preview open a modal
  const SHOW = 7, chev = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 6 5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  $('#more-lists').innerHTML = D.more.map((g, gi) => {
    const rows = g[1].map((r, i) => {
      const inner = `<b>${esc(r[0])}</b><small>${esc(r[1])}</small>`;
      const el = r[3] ? `<button type="button" data-g="${gi}" data-i="${i}" aria-haspopup="dialog">${inner}</button>` : r[2] ? `<a href="${esc(r[2])}" target="_blank" rel="noopener">${inner}</a>` : `<div>${inner}</div>`;
      return `<li${i >= SHOW ? ' class="extra"' : ''}>${el}</li>`;
    }).join('');
    const more = g[1].length > SHOW ? `<button class="seemore" type="button" aria-expanded="false"><span>See ${g[1].length - SHOW} more</span>${chev}</button>` : '';
    return `<div class="reveal"><h3>${esc(g[0])}</h3><ul>${rows}</ul>${more}</div>`;
  }).join('');

  // ── Modal: event snippet, deck preview, CV preview
  const dlg = $('#modal'), body = $('#modalBody');
  const show = (html, wide) => { body.innerHTML = html; dlg.classList.toggle('wide', !!wide); dlg.showModal(); dlg.scrollTop = 0; };
  const frame = (title, src, note) => `<div class="frame-wrap"><h3 id="modalTitle">${esc(title)}</h3><iframe src="${esc(src)}" title="${esc(title)}" loading="lazy" allowfullscreen></iframe></div><p class="frame-note">${note}</p>`;
  $('#more-lists').addEventListener('click', (e) => {
    const sm = e.target.closest('.seemore');
    if (sm) { const col = sm.parentElement, open = col.classList.toggle('open'); sm.setAttribute('aria-expanded', open); sm.firstElementChild.textContent = open ? 'See less' : `See ${col.querySelectorAll('.extra').length} more`; return; }
    const b = e.target.closest('button[data-g]'); if (!b) return;
    const r = D.more[+b.dataset.g][1][+b.dataset.i], m = r[3];
    if (m.deck) return show(frame(r[0], m.deck, 'Preview mode. If it asks you to sign in, the deck is private: <a href="mailto:aquinasarya@gmail.com?subject=' + encodeURIComponent('Deck request: ' + r[0]) + '">ask me for access</a>.'), true);
    show(`<div class="snip">
      <div class="snip-media">${m.img ? `<img src="img/${m.img}.jpg" alt="${esc(r[0])}">` : `${window.TA.FX}<div class="ph">${esc(m.ph || r[0])}</div>`}</div>
      <div class="snip-body"><p class="kick" style="margin:0">${esc(r[1])}</p><h3 id="modalTitle">${esc(r[0])}</h3><p>${esc(m.text)}</p>
        <ul class="facts">${m.facts.map((f) => `<li><span>${esc(f[0])}</span><b>${esc(f[1])}</b></li>`).join('')}</ul>
        ${m.link ? `<a class="btn btn-ink" href="${esc(m.link[1])}"><span>${esc(m.link[0])}</span><i aria-hidden="true">→</i></a>` : ''}</div></div>`);
  });
  $('#cvPreview').addEventListener('click', () => show(frame('Thomas Arya · CV', 'media/Thomas-Arya-Product-Designer-CV.pdf#view=FitH', 'Cannot see the preview? <a href="media/Thomas-Arya-Product-Designer-CV.pdf" target="_blank" rel="noopener">Open the PDF in a new tab</a>.'), true));
  $('.modal-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { body.innerHTML = ''; });

  reveal();

  // ── Dock appears after the hero
  const dock = $('#dock'), hero = $('.hero');
  const onScroll = () => dock.classList.toggle('show', scrollY > hero.offsetHeight * 0.6);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ── Draggable photo card that springs back
  const card = $('#idcard');
  if (card && !reduce) {
    let sx = 0, sy = 0, on = false;
    card.addEventListener('pointerdown', (e) => { on = true; sx = e.clientX; sy = e.clientY; card.classList.add('drag'); card.setPointerCapture(e.pointerId); });
    card.addEventListener('pointermove', (e) => { if (!on) return; const dx = e.clientX - sx, dy = e.clientY - sy; card.style.transform = `translate(${dx}px, ${dy}px) rotate(${-8 + dx / 18}deg) scale(1.05)`; });
    const end = () => { if (!on) return; on = false; card.classList.remove('drag'); card.style.transform = ''; };
    card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
  }
})();
