"use client";

import { useEffect, useRef, type ReactNode } from "react";

// How far a panel recedes while the next one slides over it.
const SCALE_DROP = 0.07;
const DIM = 0.5;
const CORNER_PX = 28;

const clamp = (n: number) => Math.min(1, Math.max(0, n));

// Direct children marked data-panel stick once they've scrolled into
// place, so the next panel slides over them while they shrink, dim and
// round their corners. A panel taller than the viewport sticks only when
// its bottom reaches the bottom of the screen, so all of it is seen
// before it's covered. Elements marked data-reveal (inside any panel)
// animate in when they enter the viewport.
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
    const nav = document.querySelector("header");
    let navHeight = 0;
    let stuckBottoms: number[] = [];
    let covers: number[] = [];
    let raf = 0;

    const measure = () => {
      navHeight = nav?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
      const vh = window.innerHeight;

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
    };

    const render = () => {
      raf = 0;
      panels.forEach((panel, i) => {
        const next = panels[i + 1];
        const travel = stuckBottoms[i] - navHeight;
        const cover =
          next && travel > 0
            ? clamp((stuckBottoms[i] - next.getBoundingClientRect().top) / travel)
            : 0;
        const rounded = Math.round(cover * 1000) / 1000;
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
    };
  }, []);

  return (
    <div ref={ref} className="sticky-stack">
      {children}
    </div>
  );
}
