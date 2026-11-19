(() => {
  const D = window.DATA, $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Loader: "Thomas Arya" rises letter by letter (Arya bold), bar fills, overlay slides up.
  const loader = $('#loader'), ln = $('#loaderName');
  let seen = false; try { seen = sessionStorage.getItem('ta-seen') === '1'; } catch (e) {}
  const done = () => { loader.classList.add('out'); document.body.classList.remove('is-loading'); setTimeout(() => loader.remove(), 1000); try { sessionStorage.setItem('ta-seen', '1'); } catch (e) {} };
  if (reduce || seen) { loader.remove(); document.body.classList.remove('is-loading'); }
  else {
    let i = 0;
    ln.innerHTML = ['Thomas', ' ', 'Arya'].map((w, wi) => [...w].map((ch) => `<span class="${wi === 2 ? 'b' : ''}"><i style="animation-delay:${(i++ * 0.055).toFixed(3)}s">${ch === ' ' ? '&nbsp;' : ch}</i></span>`).join('')).join('');
    setTimeout(done, 2100);
  }

  // Marquee
  const names = D.partners.map((p) => `<span>${esc(p)}</span>`).join('');
  $('#marquee').innerHTML = names + names;

  // Work cards
  $('#workGrid').innerHTML = D.projects.map((p, i) => `
    <button class="wcard reveal" type="button" data-i="${i}" aria-haspopup="dialog">
      <div class="wthumb">${p.imgs[0] ? `<img src="img/${p.imgs[0]}.jpg" alt="${esc(p.name)}: ${esc(p.sub)}" loading="lazy">` : `<div class="poster"><span>${esc(p.poster[0])}</span><span>${esc(p.poster[1])}</span></div>`}
        <span class="tag">${esc(p.type)}</span><span class="open" aria-hidden="true">↗</span></div>
      <div class="wmeta"><h3>${esc(p.name)}</h3><span>${String(i + 1).padStart(2, '0')} / ${D.projects.length} · ${esc(p.year)}</span></div>
      <p class="wsub">${esc(p.sub)}</p>
    </button>`).join('');

  // Services, experience, more
  $('#services-rows').innerHTML = D.services.map((s, i) => `<div class="reveal"><small>0${i + 1}</small><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><div class="pills">${s[2].map((x) => `<span>${esc(x)}</span>`).join('')}</div></div>`).join('');
  $('#xp').innerHTML = D.xp.map((x, i) => `<li class="reveal"><span class="n">${i + 1})</span><div><small>${esc(x[0])}</small><h3>${esc(x[1])} <i>at</i> <b>${esc(x[2])}</b></h3><p>${esc(x[3])}</p></div></li>`).join('');
  $('#more-lists').innerHTML = D.more.map((g) => `<div class="reveal"><h3>${esc(g[0])}</h3><ul>${g[1].map((r) => `<li>${r[2] ? `<a href="${esc(r[2])}" target="_blank" rel="noopener">` : '<div>'}<b>${esc(r[0])}</b><small>${esc(r[1])}</small>${r[2] ? '</a>' : '</div>'}</li>`).join('')}</ul></div>`).join('');

  // YouTube click-to-load player
  const yt = (id, start) => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?start=${start || 0}&autoplay=1&rel=0" title="Video player" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.player button'); if (!b) return;
    const pl = b.parentElement; pl.innerHTML = yt(pl.dataset.id, pl.dataset.start);
  });

  // Case dialog
  const dlg = $('#case'), body = $('#caseBody');
  const openCase = (p) => {
    const media = [];
    if (p.yt) media.push(`<div class="player" data-id="${esc(p.yt)}" data-start="${p.ytStart || 0}"><button type="button" aria-label="Play video"><img src="https://i.ytimg.com/vi/${esc(p.yt)}/hqdefault.jpg" alt=""><span class="play" aria-hidden="true"></span></button></div>`);
    p.imgs.forEach((n) => media.push(`<img src="img/${n}.jpg" alt="${esc(p.name)} screen" loading="lazy">`));
    if (!p.imgs.length) media.push(`<div class="poster"><span>${esc(p.poster[0])}</span><span>${esc(p.poster[1])}</span><small>Client work under confidentiality. Screens, flows and the design system are shared in a private walkthrough.</small></div>`);
    body.innerHTML = `
      <div>
        <h3 id="caseTitle">${esc(p.name)}</h3>
        <p class="case-sub">${esc(p.sub)}</p>
        <div class="case-tags"><span>${esc(p.type)}</span><span>${esc(p.year)}</span></div>
        <p class="case-lab">About the project</p><p class="case-about">${esc(p.about)}</p>
        <div class="case-meta"><div><small>Role</small><b>${esc(p.role)}</b></div><div><small>Timeline</small><b>${esc(p.time)}</b></div><div><small>Field</small><b>${esc(p.field)}</b></div></div>
        <p class="case-lab">Impact</p>
        <ul class="case-imp">${p.impacts.map((x) => `<li><i class="dot"></i><div><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div></li>`).join('')}</ul>
        <div class="case-cta">
          ${p.url ? `<a class="btn btn-ink" href="${esc(p.url)}" target="_blank" rel="noopener"><span>${esc(p.cta)}</span><i aria-hidden="true">↗</i></a>` : `<a class="case-lock" href="mailto:aquinasarya@gmail.com?subject=${encodeURIComponent('Case study request: ' + p.name)}"><i class="dot"></i>${esc(p.cta)}</a>`}
          ${p.yt ? `<a class="btn" href="https://www.youtube.com/watch?v=${esc(p.yt)}" target="_blank" rel="noopener"><span>Watch the video</span><i aria-hidden="true">▶</i></a>` : ''}
        </div>
      </div>
      <div class="case-media">${media.join('')}</div>`;
    dlg.showModal(); dlg.scrollTop = 0;
  };
  $('#workGrid').addEventListener('click', (e) => { const c = e.target.closest('.wcard'); if (c) openCase(D.projects[+c.dataset.i]); });
  $('.case-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { body.innerHTML = ''; });

  // Reveal on scroll
  const els = [...document.querySelectorAll('.reveal')];
  if (reduce || !('IntersectionObserver' in window)) els.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  // Dock appears after the hero
  const dock = $('#dock'), hero = $('.hero');
  const onScroll = () => dock.classList.toggle('show', scrollY > hero.offsetHeight * 0.6);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Draggable ID card with a spring back
  const card = $('#idcard');
  if (card && !reduce) {
    let sx = 0, sy = 0, on = false;
    card.addEventListener('pointerdown', (e) => { on = true; sx = e.clientX; sy = e.clientY; card.classList.add('drag'); card.setPointerCapture(e.pointerId); });
    card.addEventListener('pointermove', (e) => { if (!on) return; const dx = e.clientX - sx, dy = e.clientY - sy; card.style.transform = `translate(${dx}px, ${dy}px) rotate(${-8 + dx / 18}deg) scale(1.05)`; });
    const end = () => { if (!on) return; on = false; card.classList.remove('drag'); card.style.transform = ''; };
    card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
  }
})();
