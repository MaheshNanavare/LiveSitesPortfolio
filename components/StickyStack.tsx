"use client";

import { useEffect, useRef, type ReactNode } from "react";

// How far a panel recedes while the next one slides over it.
const SCALE_DROP = 0.07;
const DIM = 0.5;
const CORNER_PX = 28;
// --scene-tone blends from one scene to the next while the boundary between
// them rises between these points (fractions of the screen height from the
// top), so the new tone is in place before the new scene reaches the middle.
const TONE_FROM = 0.85;
const TONE_TO = 0.55;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => t * t * (3 - 2 * t);
const round = (n: number) => Math.round(n * 1000) / 1000;

// Direct children marked data-panel stick once they've scrolled into
// place, so the next panel slides over them while they shrink, dim and
// round their corners. A panel taller than the viewport sticks only when
// its bottom reaches the bottom of the screen, so all of it is seen
// before it's covered. Elements marked data-reveal (inside any panel)
// animate in when they enter the viewport.
//
// Elements marked data-scene inside a panel are scenes that scroll over one
// shared, fixed background. The panel gets --scene, which is n when scene
// n's top (counting from 0) is at the middle of the screen and moves
// linearly between, and --scene-tone, the data-scene number of the scene
// in view (say 0 for light, 1 for dark), blended while each boundary
// rises through the lower part of the screen.
//
// Without JS, or with reduced motion, everything scrolls normally.
// Anchor targets should be zero-height siblings between panels (see
// .stack-anchor), because a stuck panel's own position isn't where it
// sits in the page.
export default function StickyStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>(":scope > [data-panel]"));
    const scenes = panels.map((panel) =>
      Array.from(panel.querySelectorAll<HTMLElement>("[data-scene]")),
    );
    const sceneTones = scenes.map((list) => list.map((el) => Number(el.dataset.scene) || 0));
    const nav = document.querySelector("header");
    let navHeight = 0;
    let viewportHeight = 0;
    let stuckBottoms: number[] = [];
    let covers: number[] = [];
    let scenePositions: number[] = [];
    let tones: number[] = [];
    let raf = 0;

    const measure = () => {
      navHeight = nav?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
      const vh = window.innerHeight;
      viewportHeight = vh;

      stuckBottoms = panels.map((panel) => {
        const height = panel.offsetHeight;
        const top = Math.min(navHeight, vh - height);
        panel.style.position = "sticky";
        panel.style.top = `${top}px`;
        // Recede towards the middle of the part that's on screen.
        const visibleMiddle = (Math.max(navHeight, top) + Math.min(vh, top + height)) / 2;
        panel.style.transformOrigin = `50% ${visibleMiddle - top}px`;
        return top + height;
      });
      covers = panels.map(() => -1);
      scenePositions = panels.map(() => -1);
      tones = panels.map(() => -1);
    };

    const render = () => {
      raf = 0;
      // Read every position before writing any styles.
      const tops = panels.map((panel) => panel.getBoundingClientRect().top);
      const sceneTops = scenes.map((list) => list.map((el) => el.getBoundingClientRect().top));
      const middle = viewportHeight / 2;
      const toneFrom = viewportHeight * TONE_FROM;
      const toneSpan = viewportHeight * (TONE_FROM - TONE_TO);

      panels.forEach((panel, i) => {
        const starts = sceneTops[i];
        if (starts.length) {
          const toneOf = sceneTones[i];
          let position = 0;
          let tone = toneOf[0];
          for (let n = 1; n < starts.length; n++) {
            position += clamp((middle - starts[n - 1]) / Math.max(1, starts[n] - starts[n - 1]));
            tone += (toneOf[n] - toneOf[n - 1]) * ease(clamp((toneFrom - starts[n]) / toneSpan));
          }
          position = round(position);
          tone = round(tone);
          if (position !== scenePositions[i]) {
            scenePositions[i] = position;
            panel.style.setProperty("--scene", String(position));
          }
          if (tone !== tones[i]) {
            tones[i] = tone;
            panel.style.setProperty("--scene-tone", String(tone));
          }
        }

        const hasNext = i + 1 < panels.length;
        const travel = stuckBottoms[i] - navHeight;
        const cover = hasNext && travel > 0 ? clamp((stuckBottoms[i] - tops[i + 1]) / travel) : 0;
        const rounded = round(cover);
        if (rounded === covers[i]) return;
        covers[i] = rounded;

        panel.style.transform = rounded ? `scale(${1 - SCALE_DROP * rounded})` : "";
        panel.style.filter = rounded ? `brightness(${1 - DIM * rounded})` : "";
        const radius = rounded ? `${CORNER_PX * rounded}px` : "";
        panel.style.borderBottomLeftRadius = radius;
        panel.style.borderBottomRightRadius = radius;
        if (i === 0) {
          panel.style.borderTopLeftRadius = radius;
          panel.style.borderTopRightRadius = radius;
        }
      });
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    measure();
    render();

    const resizeObserver = new ResizeObserver(remeasure);
    panels.forEach((panel) => resizeObserver.observe(panel));
    if (nav) resizeObserver.observe(nav);
    window.addEventListener("resize", remeasure);
    window.addEventListener("scroll", schedule, { passive: true });

    // Reveal: anything already on screen shows at once, the rest animates
    // in as it arrives.
    const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) el.classList.add("is-in");
    }
    root.classList.add("motion");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    reveals
      .filter((el) => !el.classList.contains("is-in"))
      .forEach((el) => revealObserver.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("scroll", schedule);
      document.documentElement.style.removeProperty("--nav-height");
      panels.forEach((panel) => {
        panel.style.removeProperty("--scene");
        panel.style.removeProperty("--scene-tone");
      });
    };
  }, []);

  return (
    <div ref={ref} className="sticky-stack">
      {children}
    </div>
  );
}
