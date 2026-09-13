import type { ResolvedMedia } from "@/lib/media";

export default function MediaSlot({
  media,
  className = "",
}: {
  media: ResolvedMedia;
  className?: string;
}) {
  if (media.ready && media.kind === "video") {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        src={media.src}
        poster={media.posterReady ? media.poster : undefined}
        aria-label={media.alt}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  if (media.ready) {
    // Static export: next/image optimisation is off, a plain img is equivalent.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`h-full w-full object-cover ${className}`}
        src={media.src}
        alt={media.alt}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder for ${media.kind}: ${media.alt}`}
      className={`media-hatch flex h-full w-full flex-col justify-end gap-2 p-5 text-on-iron-muted ${className}`}
    >
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-iron-rule px-3 py-1 text-xs text-on-iron">
        <span
          aria-hidden
          className={
            media.kind === "video"
              ? "size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-signal"
              : "size-2 bg-signal"
          }
        />
        {media.kind === "video" ? "Video to come" : "Photo to come"}
      </span>
      <span className="max-w-[40ch] text-sm leading-snug text-on-iron">
        {media.alt}
      </span>
      <code className="font-mono text-[11px] break-all">public{media.src}</code>
    </div>
  );
}
