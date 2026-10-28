import type { CSSProperties } from "react";
import BridgeBackdrop from "@/components/BridgeBackdrop";
import MediaSlot from "@/components/MediaSlot";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import ProjectFolder from "@/components/ProjectFolder";
import StickyStack from "@/components/StickyStack";
import { experience } from "@/data/experience";
import { projects, sideProject } from "@/data/projects";
import { heroMedia } from "@/data/hero";
import { resolveMedia, resolveScreenshots } from "@/lib/media";

const stack = [
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { group: "Backend", items: ["Python", "Java", "Spring Boot", "PostgreSQL"] },
  { group: "Cloud", items: ["AWS Lambda", "API Gateway", "Cloudflare", "Vercel"] },
  { group: "Testing", items: ["Jest", "JUnit", "Cypress", "Playwright"] },
];

const delay = (i: number) => ({ "--reveal-i": i }) as CSSProperties;

export default function Home() {
  const work = projects.map((project) => ({
    project,
    shots: resolveScreenshots(project),
  }));

  return (
    <StickyStack>
      <section data-panel className="panel surface-iron dots-dark w-full">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 pt-14 pb-16 sm:px-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-12 md:pt-20 md:pb-24">
          <div>
            <p className="text-on-iron-muted">Hi, I&apos;m Mahesh, based in Bristol, UK</p>
            <h1 className="type-display mt-5 text-[clamp(2.75rem,7.2vw,5rem)] text-on-iron">
              Full-stack developer, from React to AWS
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-on-iron-muted">
              I build React and TypeScript front ends and serverless back ends
              on AWS, backed by PostgreSQL. I have an MSc in Computer Science
              from the University of Bristol, and I&apos;ve built and deployed
              live websites for nonprofits and a football club.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-signal px-6 py-3 font-semibold text-iron hover:bg-on-iron transition-colors"
              >
                See my work
              </a>
              <a
                href="#experience"
                className="rounded-full border border-iron-rule px-6 py-3 font-semibold text-on-iron hover:border-on-iron-muted transition-colors"
              >
                Experience
              </a>
            </div>
          </div>

          {/* Same shape as the portrait (960×1259), so none of its crop is lost */}
          <div className="mx-auto aspect-[960/1259] w-full max-w-md overflow-hidden rounded-lg border border-iron-rule md:max-w-none">
            <MediaSlot media={resolveMedia(heroMedia)} />
          </div>
        </div>
      </section>

      <span id="experience" className="stack-anchor" />
      <section data-panel aria-labelledby="experience-heading" className="panel bg-stone dots-light w-full">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[14rem_minmax(0,1fr)] md:py-20">
          <h2 id="experience-heading" data-reveal className="type-display text-3xl text-ink">
            Experience
          </h2>
          <div className="grid gap-12">
            {experience.map((job, i) => (
              <article key={job.company} data-reveal style={delay(i + 1)} className="border-t-4 border-ink pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="type-wide text-xl font-extrabold text-ink">
                    {job.role},{" "}
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-signal decoration-2 underline-offset-4 hover:text-ink-muted transition-colors"
                    >
                      {job.company}
                      <span aria-hidden> ↗</span>
                    </a>
                  </h3>
                  <p className="text-ink-muted tabular-nums">
                    {job.location} · {job.dates}
                  </p>
                </div>
                <ul aria-label="Tools used" className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((item) => (
                    <li key={item} className="rounded-full border border-rule px-3 py-0.5 text-sm text-ink-muted">
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 grid gap-3">
                  {job.points.map((point) => (
                    <li key={point} className="flex max-w-[70ch] gap-4 text-ink">
                      <span aria-hidden className="mt-2.5 size-2 shrink-0 bg-signal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-panel aria-labelledby="stack-heading" className="panel bg-stone-deep dots-light w-full">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[14rem_minmax(0,1fr)] md:py-20">
          <h2 id="stack-heading" data-reveal className="type-display text-3xl text-ink">
            Stack
          </h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
            {stack.map(({ group, items }, i) => (
              <div
                key={group}
                data-reveal
                style={delay(i)}
                className="border-t-4 border-ink pt-3"
              >
                <dt className="font-semibold text-ink">{group}</dt>
                {items.map((item) => (
                  <dd key={item} className="mt-1 text-ink-muted">
                    {item}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <span id="work" className="stack-anchor" />
      <section data-panel aria-labelledby="work-heading" className="panel surface-iron dots-dark w-full">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-end md:gap-10">
            <h2
              id="work-heading"
              data-reveal
              className="type-display text-[clamp(2.25rem,5.5vw,4.5rem)] text-on-iron"
            >
              Projects
            </h2>
            <p data-reveal style={delay(1)} className="max-w-[52ch] text-lg text-on-iron-muted">
              Live sites I built or designed for real organisations. Open a
              folder for three pages from each one.
            </p>
          </div>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-20">
            {work.map(({ project, shots }, i) => (
              <li key={project.slug} data-reveal style={delay(i)}>
                <ProjectFolder project={project} shots={shots} index={i} />
              </li>
            ))}
          </ul>

          <a
            href={sideProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group mt-16 flex max-w-md items-center gap-4 rounded-xl border border-iron-rule p-3 transition-colors hover:border-on-iron-muted md:ml-auto"
          >
            {/* Static export: next/image optimisation is off, a plain img is equivalent. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sideProject.thumb}
              alt=""
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-28 shrink-0 rounded-md object-cover object-top"
            />
            <span className="min-w-0">
              <span className="block text-xs text-on-iron-muted">Just for fun</span>
              <span className="type-wide block font-extrabold text-on-iron">
                {sideProject.name}
              </span>
              <span className="block text-sm text-on-iron-muted">{sideProject.description}</span>
              <span className="mt-1 block text-sm font-semibold text-signal group-hover:underline">
                Play it <span aria-hidden>↗</span>
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* One panel for all the case studies: their content scrolls over a
          shared background that stays put, darkens step by step from the
          first case study to the last, and builds the bridge. The panel only sticks once its end is on
          screen, so links from above it (the project folders) can target
          the case studies' own ids. */}
      <div data-panel className="panel scene-panel relative w-full">
        <BridgeBackdrop scenes={work.length} />
        {work.map(({ project, shots }, i) => (
          <ProjectCaseStudy
            key={project.slug}
            project={project}
            shots={shots}
            index={i}
            total={work.length}
            shade={work.length > 1 ? i / (work.length - 1) : 0}
          />
        ))}
      </div>
    </StickyStack>
  );
}
