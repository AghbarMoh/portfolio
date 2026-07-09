'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

/**
 * Full-screen intro that plays once on load: the SVG strokes "draw in" and
 * fatten to cover the screen, then the whole overlay sweeps up to reveal the
 * page. Inspired by the SVG stroke page-transition effect, adapted to a
 * single-page site (an intro reveal rather than a page-to-page transition).
 */
export default function IntroTransition() {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const overlay = useAnimationControls();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];

      // Prime each path fully "undrawn" (offset === length).
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.transition = 'none';
      });

      // Let the browser paint the primed state, then animate the draw + fatten.
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      paths.forEach((path) => {
        path.style.transition =
          'stroke-dashoffset 1s cubic-bezier(0.45,0,0.55,1), stroke-width 1s cubic-bezier(0.45,0,0.55,1)';
        path.style.strokeDashoffset = '0';
        path.setAttribute('stroke-width', '700');
      });

      // Wait for the draw to finish, then sweep the overlay up to reveal.
      await new Promise((r) => setTimeout(r, 1100));
      if (cancelled) return;
      await overlay.start({
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      });
      if (!cancelled) setDone(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [overlay]);

  if (done) return null;

  return (
    <motion.div
      animate={overlay}
      initial={{ y: 0 }}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '150%', height: '150%' }}
      >
        <path
          ref={(el) => {
            pathRefs.current[0] = el;
          }}
          d="M0,500 C250,300 750,700 1000,500"
          stroke="#00f5d4"
          fill="none"
        />
        <path
          ref={(el) => {
            pathRefs.current[1] = el;
          }}
          d="M0,500 C250,700 750,300 1000,500"
          stroke="#7b61ff"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
