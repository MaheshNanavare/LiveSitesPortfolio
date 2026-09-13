import type { CSSProperties } from "react";

// Renders of the Clifton Suspension Bridge going up, earliest stage first,
// at public/media/bridge/<n>.webp (1920px wide) with <n>-sm.webp (960px)
// beside each. All stages share one camera, so they line up when stacked.
const BRIDGE_STAGES = 5;

const srcSet = (n: number) => `/media/bridge/${n}-sm.webp 960w, /media/bridge/${n}.webp 1920w`;

// The fixed background behind the case studies: a frame that sticks to the
// viewport while the case studies scroll over it. It crossfades from one
// stage to the next with the panel's --scene (set by StickyStack), so
// scrolling through the projects builds the bridge, and holds the finished
// bridge from the last stage on.
export default function BridgeBackdrop() {
  // Latest stage first in the DOM, so earlier stages sit on top.
  const stages = Array.from({ length: BRIDGE_STAGES }, (_, i) => BRIDGE_STAGES - i);

  return (
    <div aria-hidden className="bridge-backdrop">
      <div className="bridge-backdrop-frame">
        <div className="bridge-stages">
          {stages.map((n) => (
            // Static export: next/image optimisation is off, a plain img is equivalent.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={n}
              src={`/media/bridge/${n}.webp`}
              srcSet={srcSet(n)}
              sizes="100vw"
              alt=""
              loading="lazy"
              decoding="async"
              style={{ "--stage": n - 1 } as CSSProperties}
              className={`bridge-stage ${n === BRIDGE_STAGES ? "bridge-stage-last" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
