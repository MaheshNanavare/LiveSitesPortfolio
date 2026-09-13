import type { CSSProperties } from "react";
import OfferSection from "@/components/OfferSection";
import MediaSlot from "@/components/MediaSlot";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import ProjectFolder from "@/components/ProjectFolder";
import StickyStack from "@/components/StickyStack";
import { projects } from "@/data/projects";
import { heroMedia } from "@/data/hero";
import { resolveMedia, resolveScreenshots } from "@/lib/media";

const stack = [
  { group: "Backend", items: ["Java", "Spring Boot", "PostgreSQL", "Hibernate / JPA"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind"] },
  { group: "Infrastructure", items: ["Docker", "Kubernetes"] },
  { group: "Deployment", items: ["Cloudflare", "Render", "WordPress", "Vercel"] },
  { group: "Tooling", items: ["Jira", "Postman"] },
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
            <p className="text-on-iron-muted">Software engineer in Bristol</p>
            <h1 className="type-display mt-5 text-[clamp(2.75rem,7.2vw,6rem)] text-on-iron">
              I build web apps and put them live.
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-on-iron-muted">
              MSc Computer Science and Graduate Teacher at the University of
              Bristol. Mostly Java and Spring Boot on the backend, TypeScript
              and React on the front, deployed and looked after.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-signal px-6 py-3 font-semibold text-iron hover:bg-on-iron transition-colors"
              >
                See live projects
              </a>
              <a
                href="#builds"
                className="rounded-full border border-iron-rule px-6 py-3 font-semibold text-on-iron hover:border-on-iron-muted transition-colors"
              >
                Get a website built
              </a>
            </div>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-iron-rule md:aspect-[4/5]">
            <MediaSlot media={resolveMedia(heroMedia)} />
          </div>
        </div>
      </section>

      <section data-panel aria-labelledby="stack-heading" className="panel bg-stone dots-light w-full">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[14rem_minmax(0,1fr)] md:py-20">
          <h2 id="stack-heading" data-reveal className="type-display text-3xl text-ink">
            Stack
          </h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
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
              Live projects
            </h2>
            <p data-reveal style={delay(1)} className="max-w-[52ch] text-lg text-on-iron-muted">
              Only projects that are deployed and running today. Open a folder
              for three pages from each live site.
            </p>
          </div>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
            {work.map(({ project, shots }, i) => (
              <li key={project.slug} data-reveal style={delay(i)}>
                <ProjectFolder project={project} shots={shots} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {work.flatMap(({ project, shots }, i) => [
        <span key={`${project.slug}-anchor`} id={`project-${project.slug}`} className="stack-anchor" />,
        <ProjectCaseStudy
          key={project.slug}
          project={project}
          shots={shots}
          index={i}
          total={work.length}
          tone={i % 2 === 0 ? "light" : "dark"}
        />,
      ])}

      <span id="builds" className="stack-anchor" />
      <OfferSection />
    </StickyStack>
  );
}
