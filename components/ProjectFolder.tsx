import type { Project } from "@/data/projects";
import type { ResolvedScreenshot } from "@/lib/media";

// A folder holding three screenshots that fan out on hover. Links down
// to the project's own section on the page.
export default function ProjectFolder({
  project,
  shots,
  index,
}: {
  project: Project;
  shots: ResolvedScreenshot[];
  index: number;
}) {
  const [left, right, front] = shots;

  return (
    <a
      href={`#project-${project.slug}`}
      className="group block rounded-2xl"
      aria-label={`${project.name}, ${project.role}. See three pages from the live site.`}
    >
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[22rem] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2">
        <FolderShape className="fill-iron-raised stroke-iron-rule" />

        <div aria-hidden className="absolute inset-x-[10%] top-[20%] bottom-[18%]">
          <Sheet
            shot={left}
            className="left-0 top-[16%] w-[58%] -rotate-[8deg] group-hover:-translate-x-[12%] group-hover:-translate-y-[10%] group-hover:-rotate-[15deg] group-focus-visible:-translate-x-[12%] group-focus-visible:-rotate-[15deg]"
          />
          <Sheet
            shot={right}
            className="right-0 top-[16%] w-[58%] rotate-[8deg] group-hover:translate-x-[12%] group-hover:-translate-y-[10%] group-hover:rotate-[15deg] group-focus-visible:translate-x-[12%] group-focus-visible:rotate-[15deg]"
          />
          <Sheet
            shot={front}
            className="left-1/2 top-0 z-10 w-[64%] -translate-x-1/2 group-hover:-translate-y-[22%] group-focus-visible:-translate-y-[22%]"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex h-[44%] flex-col justify-end rounded-2xl border border-white/10 bg-iron/60 p-4 backdrop-blur-md sm:p-5">
          <span className="text-xs text-on-iron-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="type-wide mt-1 text-lg leading-tight font-extrabold text-on-iron">
            {project.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-2 text-sm text-on-iron-muted">
            <span className="size-1.5 bg-signal" />
            {project.role}
          </p>
        </div>
      </div>
    </a>
  );
}

// The folder after the last project: empty, drawn in outline, waiting for
// the next site. Links down to the build offer, and keeps the grid whole.
export function OpenFolder() {
  return (
    <a
      href="#builds"
      className="group block rounded-2xl"
      aria-label="This folder could hold your organisation's site. See the £3.95 website offer."
    >
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[22rem] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2">
        <FolderShape
          dashed
          className="fill-transparent stroke-on-iron-muted/45 transition-colors group-hover:stroke-signal group-focus-visible:stroke-signal"
        />

        <div aria-hidden className="absolute inset-x-[10%] top-[20%] bottom-[18%]">
          <div className="absolute left-1/2 top-0 aspect-[16/10] w-[64%] -translate-x-1/2 rounded-md border border-dashed border-on-iron-muted/35 transition-transform duration-500 ease-out group-hover:-translate-y-[22%] group-focus-visible:-translate-y-[22%]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex h-[44%] flex-col justify-end p-4 sm:p-5">
          <h3 className="type-wide text-lg leading-tight font-extrabold text-on-iron">
            Your organisation&apos;s site
          </h3>
          <p className="mt-0.5 flex items-center gap-2 text-sm text-on-iron-muted">
            <span className="size-1.5 bg-signal" />
            Built for £3.95
          </p>
        </div>
      </div>
    </a>
  );
}

function FolderShape({ className, dashed = false }: { className: string; dashed?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 150"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d="M0 14a14 14 0 0 1 14-14h50a14 14 0 0 1 12 7l6 11h104a14 14 0 0 1 14 14v104a14 14 0 0 1-14 14H14A14 14 0 0 1 0 136Z"
        className={className}
        strokeWidth="1.5"
        strokeDasharray={dashed ? "6 5" : undefined}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Sheet({ shot, className }: { shot: ResolvedScreenshot; className: string }) {
  return (
    <div
      className={`absolute aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-iron shadow-[0_12px_30px_-10px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-out ${className}`}
    >
      {shot.ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shot.thumb}
          alt=""
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="media-hatch h-full w-full" />
      )}
    </div>
  );
}
