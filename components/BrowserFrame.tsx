import type { ResolvedScreenshot } from "@/lib/media";

// A screenshot in a minimal browser window. `fill` lets the image stretch
// to the height of its grid cell instead of keeping a 16:10 box.
export default function BrowserFrame({
  shot,
  tone,
  fill = false,
}: {
  shot: ResolvedScreenshot;
  tone: "light" | "dark";
  fill?: boolean;
}) {
  const dark = tone === "dark";

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
        {shot.ready ? (
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
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-iron/80 px-3 py-1 text-xs font-semibold text-on-iron backdrop-blur-sm">
          {shot.caption}
        </figcaption>
      </div>
    </figure>
  );
}
