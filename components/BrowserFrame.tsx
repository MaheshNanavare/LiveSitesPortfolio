import CompareTabs, { type Version } from "@/components/CompareTabs";
import type { ResolvedScreenshot } from "@/lib/media";

// A screenshot in a minimal browser window. `fill` lets the image stretch
// to the height of its grid cell instead of keeping a 16:10 box. When the
// shot has a before image of the old site, buttons switch between Before
// and After (or Before, My concept and Live now when there's a concept).
export default function BrowserFrame({
  shot,
  tone,
  fill = false,
  beforeLabel = "old site",
}: {
  shot: ResolvedScreenshot;
  tone: "light" | "dark";
  fill?: boolean;
  beforeLabel?: string;
}) {
  const dark = tone === "dark";

  // Oldest first, opening on the newest version I made: the concept when
  // there is one, otherwise the live site.
  const versions: Version[] | null =
    shot.ready && shot.before
      ? [
          {
            label: "Before",
            src: shot.before,
            alt: `${shot.caption} on the ${beforeLabel}, before the rebuild`,
          },
          ...(shot.concept
            ? [{ label: "My concept", src: shot.concept, alt: `${shot.caption} in my design concept` }]
            : []),
          {
            label: shot.concept ? "Live now" : "After",
            src: shot.src,
            alt: `${shot.caption}, ${shot.url}`,
          },
        ]
      : null;

  return (
    <figure
      className={`flex h-full flex-col overflow-hidden rounded-xl border shadow-[0_30px_60px_-30px_rgb(4_10_13/0.55)] ${
        dark ? "border-iron-rule bg-iron-raised" : "border-rule bg-stone"
      }`}
    >
      <div
        className={`flex items-center gap-3 border-b px-3 py-2 ${
          dark ? "border-iron-rule text-on-iron-muted" : "border-rule text-ink-muted"
        }`}
      >
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-current opacity-35" />
          <span className="size-2.5 rounded-full bg-current opacity-35" />
          <span className="size-2.5 rounded-full bg-current opacity-35" />
        </span>
        <span
          className={`min-w-0 truncate rounded-full px-3 py-0.5 text-xs ${
            dark ? "bg-iron" : "bg-stone-deep"
          }`}
        >
          {shot.url}
        </span>
      </div>

      <div
        className={`relative aspect-[16/10] overflow-hidden ${fill ? "md:aspect-auto md:flex-1" : ""}`}
      >
        {versions ? (
          <CompareTabs versions={versions} initial={shot.concept ? 1 : versions.length - 1} />
        ) : shot.ready ? (
          // Static export: next/image optimisation is off, a plain img is equivalent.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.src}
            alt={`${shot.caption}, ${shot.url}`}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="media-hatch absolute inset-0 flex items-end p-4 text-xs text-on-iron-muted">
            <span className="break-all">public{shot.src}</span>
          </div>
        )}
        <figcaption className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-iron/80 px-3 py-1 text-xs font-semibold text-on-iron backdrop-blur-sm">
          {shot.caption}
        </figcaption>
      </div>
    </figure>
  );
}
