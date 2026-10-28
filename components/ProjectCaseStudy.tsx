import type { CSSProperties } from "react";
import BrowserFrame from "@/components/BrowserFrame";
import type { Project } from "@/data/projects";
import type { ResolvedScreenshot } from "@/lib/media";

const delay = (i: number) => ({ "--reveal-i": i }) as CSSProperties;

export default function ProjectCaseStudy({
  project,
  shots,
  index,
  total,
  shade,
}: {
  project: Project;
  shots: ResolvedScreenshot[];
  index: number;
  total: number;
  // How dark this scene's ground is, from 0 (lightest) to 1 (darkest).
  shade: number;
}) {
  const dark = shade >= 0.5;
  const tone = dark ? "dark" : "light";
  // The muted text colours only have enough contrast on the lightest and
  // darkest grounds, so the greys in between use full-strength text.
  const mid = shade > 0 && shade < 1;
  const muted = dark ? (mid ? "text-on-iron" : "text-on-iron-muted") : mid ? "text-ink" : "text-ink-muted";
  const headingId = `project-${project.slug}-heading`;
  const [main, second, third] = shots;
  const compares = shots.some((shot) => shot.ready && shot.before);
  const hasConcept = shots.some((shot) => shot.ready && shot.before && shot.concept);

  // A scene in the case-studies panel (see app/page.tsx). Once StickyStack
  // runs, its own background gives way to the panel's shared, fixed one, and
  // the wash fades the bridge behind the heading and description.
  return (
    <section
      id={`project-${project.slug}`}
      data-scene={Math.round(shade * 1000) / 1000}
      aria-labelledby={headingId}
      style={{ "--own-tone": shade } as CSSProperties}
      className={`scene scene-own relative w-full ${dark ? "surface-iron dots-dark" : "dots-light"}`}
    >
      <div aria-hidden className="scene-wash" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div
          data-reveal
          className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 text-sm ${
            dark ? "border-iron-rule" : "border-rule"
          } ${muted}`}
        >
          <span className="tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-2 bg-signal" />
            {project.role}
            {project.placeholder && " (placeholder)"}
          </span>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end md:gap-12">
          <h3
            id={headingId}
            data-reveal
            style={delay(1)}
            className={`type-display text-[clamp(2.5rem,6.4vw,5.25rem)] ${dark ? "text-on-iron" : "text-ink"}`}
          >
            {project.name}
          </h3>
          <div data-reveal style={delay(2)}>
            <p className={`max-w-[58ch] text-lg ${muted}`}>
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full bg-signal px-5 py-2.5 font-semibold text-iron transition-colors ${
                  dark ? "hover:bg-on-iron" : "hover:bg-iron hover:text-on-iron"
                }`}
              >
                Visit live site <span aria-hidden>↗</span>
              </a>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline underline-offset-4 ${muted} ${dark ? "hover:text-on-iron" : "hover:text-ink"}`}
                >
                  Source code
                </a>
              )}
            </div>
            {compares && (
              <p className={`mt-5 flex items-center gap-2 text-sm ${muted}`}>
                <span aria-hidden className="size-2 rounded-full bg-signal" />
                {hasConcept
                  ? "Use the buttons on each screenshot to compare my concept with the old site and the live site now."
                  : `Use the buttons on each screenshot to compare with the ${project.before ?? "old site"}.`}
              </p>
            )}
          </div>
        </div>

        {/* On phones the three pages sit side by side in a row you swipe,
            with the next one peeking in, rather than a long stack. */}
        <div
          role="group"
          aria-label={`Three pages from ${project.name}`}
          className="shot-row -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-10 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          <div data-reveal="fan-left" style={delay(1)} className="w-[86%] shrink-0 snap-start sm:w-[70%] md:col-span-8 md:row-span-2 md:w-auto">
            <BrowserFrame shot={main} tone={tone} beforeLabel={project.before} fill />
          </div>
          <div data-reveal="fan-right" style={delay(2)} className="w-[86%] shrink-0 snap-start sm:w-[70%] md:col-span-4 md:w-auto">
            <BrowserFrame shot={second} tone={tone} beforeLabel={project.before} />
          </div>
          <div data-reveal="fan-right" style={delay(3)} className="w-[86%] shrink-0 snap-start sm:w-[70%] md:col-span-4 md:w-auto">
            <BrowserFrame shot={third} tone={tone} beforeLabel={project.before} />
          </div>
        </div>
      </div>
    </section>
  );
}
