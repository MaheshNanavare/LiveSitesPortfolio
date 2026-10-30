"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type VersionKey = "before" | "concept" | "live";

export type Version = {
  key: VersionKey;
  src: string;
  alt: string;
};

const CompareContext = createContext<{
  shown: VersionKey;
  setShown: (key: VersionKey) => void;
}>({ shown: "live", setShown: () => {} });

// One choice of version (the old site, the new one, and sometimes a design
// concept between them) shared by every screenshot of a project, so a single
// set of buttons switches all of them together.
export function CompareGroup({
  initial,
  children,
}: {
  initial: VersionKey;
  children: ReactNode;
}) {
  const [shown, setShown] = useState(initial);
  return <CompareContext value={{ shown, setShown }}>{children}</CompareContext>;
}

export function CompareButtons({
  options,
  label,
}: {
  options: { key: VersionKey; label: string }[];
  label: string;
}) {
  const { shown, setShown } = useContext(CompareContext);

  return (
    <div role="group" aria-label={label} className="flex rounded-full bg-iron/80 p-0.5 shadow-lg">
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          aria-pressed={option.key === shown}
          onClick={() => setShown(option.key)}
          className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-signal ${
            option.key === shown ? "bg-signal text-iron" : "text-on-iron hover:text-signal"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// The versions of one page, stacked in its frame, showing whichever the
// group has chosen with a short crossfade. A page without that version
// shows the live site. Every version stays loaded, so switching never waits
// on the network.
export function CompareImages({ versions }: { versions: Version[] }) {
  const { shown } = useContext(CompareContext);
  const current = versions.some((version) => version.key === shown) ? shown : "live";

  return (
    <div className="absolute inset-0">
      {versions.map((version) => (
        // Static export: next/image optimisation is off, a plain img is equivalent.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={version.src}
          src={version.src}
          alt={version.key === current ? version.alt : ""}
          aria-hidden={version.key !== current}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
            version.key === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
