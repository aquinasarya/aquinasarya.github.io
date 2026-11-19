// Shared by index.html and work.html: covers, video player, reveal, texture markup.
window.TA = (() => {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const img = (n, alt) => `<img src="img/${n}.jpg" alt="${esc(alt || '')}" loading="lazy">`;
  const FX = '<div class="fx" aria-hidden="true"><i></i><i></i><i></i></div>';

  // One cover per project, each with its own composition.
  const covers = {
    influence: (p) => `${img('influence-1', p.name + ' earnings screen')}<span class="chip glass">Rates with a source</span>`,
    simako: (p) => `${img('simako-3', '')}${img('simako-4', '')}${img('simako-2', p.name + ' dashboard')}<span class="chip glass">14 museums, one record</span>`,
    avp: (p) => `${img('avp-2', '')}${img('avp-3', '')}${img('avp-1', p.name + ' redrawn coverage map, sample data')}<span class="w">18%</span><span class="chip glass lock">Redrawn · sample data</span>`,
    jalana: (p) => `${img('jalana-3', p.name + ' app screens')}<span class="w">Jalana</span>`,
    abhitek: (p) => `${img('abhitek-1', p.name + ' web console')}${img('abhitek-3', p.name + ' phone app')}<span class="chip">Office console + field app</span>`,
    muaraapp: (p) => `${[92, 72, 52].map((s) => `<i class="ring" style="width:${s}cqw;height:${s}cqw"></i>`).join('')}${img('muaraapp-1', p.name + ' AR modules')}`,
    repatriasi: (p) => `${img('sunting-1', '')}${img('nyala-1', '')}${img('repatriasi-1', p.name + ' kiosks and games')}<span class="w">Repatriasi</span>`,
    vinfast: (p) => `<span class="w">VF3<br>in AR</span>${img('vinfast-1', p.name)}<div class="sw">${['#F2C230', '#E94B3C', '#2F6BFF', '#1FA97A', '#F4F4F4', '#111'].map((c) => `<i style="background:${c}"></i>`).join('')}</div>`,
    albarsha: (p) => `<div class="flow"><span class="chip glass">Work</span><span class="chip glass">Capabilities</span><span class="chip glass">Network</span></div>${img('albarsha-2', '')}${img('albarsha-1', p.name + ' home page')}`,
    casanira: (p) => `<span class="w">Casa<br><em>Nira</em></span><span class="cap">Uluwatu, Bali</span>${img('casanira-2', p.name + ' website')}`
  };
  const cover = (p) => `<div class="cov c-${p.id}">${covers[p.id](p)}</div>`;

  const ytFrame = (id, start) => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?start=${start || 0}&autoplay=1&rel=0" title="Video player" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  const player = (id, start, label) => `<div class="player" data-id="${esc(id)}" data-start="${start || 0}"><button type="button" aria-label="Play video"><img src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy"><span class="play" aria-hidden="true"></span>${label ? `<span class="stamp">${esc(label)}</span>` : ''}</button></div>`;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.player button'); if (!b) return;
    const pl = b.parentElement; pl.innerHTML = ytFrame(pl.dataset.id, pl.dataset.start);
  });

  const reveal = () => {
    const els = [...document.querySelectorAll('.reveal:not(.in)')];
    if (reduce || !('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('in'));
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  };
  return { esc, reduce, cover, player, reveal, FX };
})();
