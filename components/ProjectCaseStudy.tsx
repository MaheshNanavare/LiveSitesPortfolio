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
  tone,
}: {
  project: Project;
  shots: ResolvedScreenshot[];
  index: number;
  total: number;
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  const headingId = `project-${project.slug}-heading`;
  const [main, second, third] = shots;

  // A scene in the case-studies panel (see app/page.tsx). Once StickyStack
  // runs, its own background gives way to the panel's shared, fixed one, and
  // the wash fades the bridge behind the heading and description.
  return (
    <section
      id={`project-${project.slug}`}
      data-scene={dark ? 1 : 0}
      aria-labelledby={headingId}
      className={`scene relative w-full ${dark ? "surface-iron dots-dark" : "bg-stone-deep dots-light"}`}
    >
      <div aria-hidden className="scene-wash" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div
          data-reveal
          className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 text-sm ${
            dark ? "border-iron-rule text-on-iron-muted" : "border-rule text-ink-muted"
          }`}
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
            <p className={`max-w-[58ch] text-lg ${dark ? "text-on-iron-muted" : "text-ink-muted"}`}>
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
                  className={`underline underline-offset-4 ${
                    dark ? "text-on-iron-muted hover:text-on-iron" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  Source code
                </a>
              )}
            </div>
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
            <BrowserFrame shot={main} tone={tone} fill />
          </div>
          <div data-reveal="fan-right" style={delay(2)} className="w-[86%] shrink-0 snap-start sm:w-[70%] md:col-span-4 md:w-auto">
            <BrowserFrame shot={second} tone={tone} />
          </div>
          <div data-reveal="fan-right" style={delay(3)} className="w-[86%] shrink-0 snap-start sm:w-[70%] md:col-span-4 md:w-auto">
            <BrowserFrame shot={third} tone={tone} />
          </div>
        </div>
      </div>
    </section>
  );
}
