import type { CSSProperties } from "react";

// Renders of the Clifton Suspension Bridge going up, earliest stage first,
// at public/media/bridge/<n>.webp (1920px wide) with <n>-sm.webp (960px)
// beside each. All stages share one camera, so they line up when stacked.
const BRIDGE_STAGES = 5;

const srcSet = (n: number) => `/media/bridge/${n}-sm.webp 960w, /media/bridge/${n}.webp 1920w`;

// The fixed background behind the case studies: a frame that sticks to the
// viewport while the case studies scroll over it. It crossfades from one
// stage to the next with the panel's --scene (set by StickyStack), so
// scrolling through the projects builds the bridge. With fewer scenes than
// stages, it skips stages so the last scene still gets the finished bridge;
// with more, it holds the finished bridge from the last stage on.
export default function BridgeBackdrop({ scenes }: { scenes: number }) {
  const count = Math.max(1, Math.min(scenes, BRIDGE_STAGES));
  // shown[i] is the stage image for scene i, always ending on the last.
  const shown = Array.from({ length: count }, (_, i) =>
    count === 1 ? BRIDGE_STAGES : Math.round(1 + (i * (BRIDGE_STAGES - 1)) / (count - 1)),
  );

  return (
    <div aria-hidden className="bridge-backdrop">
      <div className="bridge-backdrop-frame">
        <div className="bridge-stages">
          {/* Latest stage first in the DOM, so earlier stages sit on top. */}
          {[...shown].reverse().map((n, j) => (
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
              style={{ "--stage": count - 1 - j } as CSSProperties}
              className={`bridge-stage ${j === 0 ? "bridge-stage-last" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
