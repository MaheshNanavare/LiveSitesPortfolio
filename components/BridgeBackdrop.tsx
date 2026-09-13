// Renders of the Clifton Suspension Bridge going up, earliest stage first,
// at public/media/bridge/<n>.webp (1920px wide) with <n>-sm.webp (960px)
// beside each. All stages share one camera, so they line up when stacked.
export const BRIDGE_STAGES = 5;

const srcSet = (n: number) => `/media/bridge/${n}-sm.webp 960w, /media/bridge/${n}.webp 1920w`;

// Background for a case-study panel. The frame sticks to the viewport while
// the panel is on screen. Stage `stage` sits on top of the next stage and
// fades out with the panel's --panel-progress (set by StickyStack on panels
// marked data-progress), so scrolling through the case studies builds the
// bridge. Past the last stage it shows the finished bridge on its own.
export default function BridgeBackdrop({
  stage,
  tone,
}: {
  stage: number;
  tone: "light" | "dark";
}) {
  const current = Math.min(stage, BRIDGE_STAGES);
  const next = current < BRIDGE_STAGES ? current + 1 : undefined;

  return (
    <div aria-hidden className={`bridge-backdrop bridge-backdrop-${tone}`}>
      <div className="bridge-backdrop-frame">
        {/* Static export: next/image optimisation is off, a plain img is equivalent. */}
        {next && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/media/bridge/${next}.webp`}
            srcSet={srcSet(next)}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="bridge-stage"
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/media/bridge/${current}.webp`}
          srcSet={srcSet(current)}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className={`bridge-stage ${next ? "bridge-stage-fading" : ""}`}
        />
      </div>
    </div>
  );
}
