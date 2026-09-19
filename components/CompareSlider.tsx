"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

// A screenshot of the live site with the same page on the old site laid
// over its left part. Dragging the handle moves the split. A mouse can
// grab anywhere on the image, but touch only drags from the handle, so
// swiping the row of screenshots on a phone still scrolls. A visually
// hidden range input carries the keyboard and screen reader control.
export default function CompareSlider({
  src,
  before,
  alt,
  beforeAlt,
  beforeLabel,
}: {
  src: string;
  before: string;
  alt: string;
  beforeAlt: string;
  beforeLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);

  const moveTo = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const pct = ((clientX - box.left) / box.width) * 100;
    setSplit(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const onHandle = (e.target as Element).closest("[data-handle]");
    if (e.pointerType !== "mouse" && !onHandle) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    moveTo(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) moveTo(e.clientX);
  };

  const stop = () => setDragging(false);

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      style={{ "--split": `${split}%` } as CSSProperties}
      className={`absolute inset-0 select-none ${dragging ? "cursor-grabbing" : "md:cursor-ew-resize"}`}
    >
      {/* Static export: next/image optimisation is off, a plain img is equivalent. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt={beforeAlt}
        width={1440}
        height={900}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-top [clip-path:inset(0_calc(100%-var(--split))_0_0)]"
      />

      <span
        aria-hidden
        style={{ opacity: split < 18 ? 0 : 1 }}
        className="pointer-events-none absolute top-3 left-3 rounded-full bg-iron/80 px-3 py-1 text-xs font-semibold text-on-iron backdrop-blur-sm transition-opacity"
      >
        Before · {beforeLabel}
      </span>
      <span
        aria-hidden
        style={{ opacity: split > 82 ? 0 : 1 }}
        className="pointer-events-none absolute top-3 right-3 rounded-full bg-signal px-3 py-1 text-xs font-semibold text-iron transition-opacity"
      >
        Now
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(split)}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label={`Compare with the ${beforeLabel}: higher shows more of the old page`}
        className="peer sr-only"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[var(--split)] w-0.5 -translate-x-1/2 bg-signal shadow-[0_0_0_1px_rgb(4_10_13/0.25)]"
      />
      <div
        aria-hidden
        data-handle
        className="absolute top-1/2 left-[var(--split)] flex size-10 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center rounded-full border-2 border-signal bg-iron text-signal shadow-lg cursor-grab peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal"
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="currentColor">
          <path d="M7 5 2 10l5 5V5Zm6 0v10l5-5-5-5Z" />
        </svg>
      </div>
    </div>
  );
}
