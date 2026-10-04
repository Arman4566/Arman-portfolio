import { useEffect, useRef } from 'react';

/* A draggable 3D word sphere built with CSS transforms. */
export default function SkillGlobe({ words }) {
  const stageRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = words.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = words.map((_, i) => {
      const y = 1 - ((i + 0.5) / n) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      return [Math.cos(th) * r, y, Math.sin(th) * r];
    });

    const state = { rotY: 0, rotX: 0.35, velY: 0, velX: 0, dragging: false, lx: 0, ly: 0 };
    const idleSpeed = reduceMotion ? 0 : 0.0028;
    let radius = 140;
    let raf = 0;

    const render = () => {
      const cy = Math.cos(state.rotY);
      const sy = Math.sin(state.rotY);
      const cx = Math.cos(state.rotX);
      const sx = Math.sin(state.rotX);
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const [x, y, z] = points[i];
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const depth = (z2 + 1) / 2;
        const scale = 0.62 + depth * 0.6;
        el.style.transform = `translate(-50%, -50%) translate3d(${(x1 * radius).toFixed(1)}px, ${(y2 * radius).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = (0.22 + depth * 0.78).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
      }
    };

    const resize = () => {
      radius = Math.min(stage.clientWidth, stage.clientHeight) / 2 - 36;
      render();
    };

    const loop = () => {
      if (!state.dragging) {
        state.velY += (idleSpeed - state.velY) * 0.04;
        state.velX *= 0.94;
      }
      state.rotY += state.velY;
      state.rotX = Math.max(-1.1, Math.min(1.1, state.rotX + state.velX));
      render();
      raf = requestAnimationFrame(loop);
    };

    const down = (e) => {
      state.dragging = true;
      state.lx = e.clientX;
      state.ly = e.clientY;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-dragging');
    };
    const move = (e) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lx;
      const dy = e.clientY - state.ly;
      state.lx = e.clientX;
      state.ly = e.clientY;
      state.velY = dx * 0.006;
      state.velX = dy * 0.004;
      if (reduceMotion) {
        state.rotY += state.velY;
        state.rotX = Math.max(-1.1, Math.min(1.1, state.rotX + state.velX));
        render();
      }
    };
    const up = (e) => {
      state.dragging = false;
      stage.classList.remove('is-dragging');
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();
    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
    };
  }, [words]);

  return (
    <div className="globe" ref={stageRef} aria-hidden="true">
      <div className="globe__core" />
      {words.map((w, i) => (
        <span key={w} className="globe__word" ref={(el) => (itemRefs.current[i] = el)}>
          {w}
        </span>
      ))}
    </div>
  );
}
