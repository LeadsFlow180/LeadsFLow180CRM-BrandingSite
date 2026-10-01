(() => {
  const scenes = [...document.querySelectorAll('.scene')];
  const buttons = [...document.querySelectorAll('.rail button')];
  const world = document.getElementById('world');
  const hint = document.getElementById('hint');
  const hallwayMotion = document.getElementById('hallwayMotion');
  const hotspots = [...document.querySelectorAll('.hotspot')];
  let active = 0;
  let start = null;
  const step = () => Math.max(1, world.getBoundingClientRect().height);
  function show(index) {
    active = Math.max(0, Math.min(scenes.length - 1, index));
    scenes.forEach((scene, n) => {
      scene.classList.toggle('active', n === active);
      scene.setAttribute('aria-hidden', String(n !== active));
    });
    buttons.forEach((button, n) => {
      button.classList.toggle('active', n === active);
      button.setAttribute('aria-current', n === active ? 'step' : 'false');
    });
    hint.textContent = active === 0 ? 'Scroll to walk forward · choose a doorway' : 'Photo stop · ' + buttons[active].textContent;
  }
  function go(index) {
    show(index);
    // Immediate scroll keeps the page position and selected room in agreement.
    window.scrollTo({ top: active * step(), behavior: 'instant' });
  }
  buttons.forEach((button, n) => button.addEventListener('click', () => go(n)));
  function syncMotion() {
    const unit = step();
    const raw = scrollY / unit;
    const next = Math.max(0, Math.min(scenes.length - 1, Math.round(raw)));
    show(next);
    if (hallwayMotion && active === 0 && hallwayMotion.readyState >= 1) {
      const localProgress = Math.max(0, Math.min(1, raw));
      hallwayMotion.pause();
      hallwayMotion.currentTime = localProgress * (hallwayMotion.duration || 6);
    }
  }
  addEventListener('scroll', syncMotion, { passive: true });
  addEventListener('resize', () => go(active));
  addEventListener('keydown', event => {
    if (event.target.closest('button,a,input,textarea,select')) return;
    if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault(); go(active + 1);
    } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
      event.preventDefault(); go(active - 1);
    }
  });
  world.addEventListener('pointerdown', event => { start = { x: event.clientX, y: event.clientY }; });
  world.addEventListener('pointerup', event => {
    if (!start) return;
    if (event.target.closest('button,a')) { start = null; return; }
    const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    start = null;
    if (distance < 8) go((active + 1) % scenes.length);
  });
  world.addEventListener('pointercancel', () => { start = null; });
  hotspots.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.href) { window.location.href = button.dataset.href; return; }
    go(Number(button.dataset.jump));
  }));
  hallwayMotion?.addEventListener('loadedmetadata', syncMotion);
  syncMotion();
})();
