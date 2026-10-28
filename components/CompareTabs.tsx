"use client";

import { useState } from "react";

export type Version = {
  label: string;
  src: string;
  alt: string;
};

// Two or more versions of the same page (the old site and the new one, and
// sometimes a design concept between them), stacked in one frame. Buttons
// at the top switch between them with a short crossfade. Every version stays
// loaded, so switching never waits on the network.
export default function CompareTabs({
  versions,
  initial,
}: {
  versions: Version[];
  initial: number;
}) {
  const [shown, setShown] = useState(initial);

  return (
    <div className="absolute inset-0">
      {versions.map((version, i) => (
        // Static export: next/image optimisation is off, a plain img is equivalent.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={version.src}
          src={version.src}
          alt={i === shown ? version.alt : ""}
          aria-hidden={i !== shown}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
            i === shown ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div
        role="group"
        aria-label="Show a version of this page"
        className="absolute top-3 left-3 flex rounded-full bg-iron/80 p-0.5 shadow-lg backdrop-blur-sm"
      >
        {versions.map((version, i) => (
          <button
            key={version.label}
            type="button"
            aria-pressed={i === shown}
            onClick={() => setShown(i)}
            className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-signal ${
              i === shown ? "bg-signal text-iron" : "text-on-iron hover:text-signal"
            }`}
          >
            {version.label}
          </button>
        ))}
      </div>
    </div>
  );
}
