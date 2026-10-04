import { useRef } from 'react';

/* Tilts its child toward the pointer. Skipped when reduced motion is on. */
export default function Tilt({ children, max = 9, className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  return (
    <div className={`tilt ${className}`} ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
