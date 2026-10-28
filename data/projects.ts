export type Screenshot = {
  // Path on the live site, shown in the browser frame's address bar.
  page: string;
  caption: string;
};

export type Project = {
  // Screenshots live at public/media/projects/<slug>/<1|2|3>.webp, with a
  // 640px-wide <n>-sm.webp beside each for the folder cards. Missing files
  // render as a placeholder naming the path. A <n>-before.webp of the
  // same page on the old site adds Before / After buttons to that
  // screenshot. A <n>-concept.webp of a design concept adds a third,
  // giving Before / My concept / Live now.
  slug: string;
  name: string;
  role: string;
  liveUrl: string;
  repoUrl?: string;
  description: string;
  screenshots: [Screenshot, Screenshot, Screenshot];
  // What the old site was, used in the compare hint and Before alt text.
  before?: string;
  placeholder?: boolean;
};

// Only list projects that are actually deployed and live.
// Add a new entry here once a project is live — remove the
// placeholders as real ones replace them.
export const projects: Project[] = [
  {
    slug: "baguley-athletic",
    name: "Baguley Athletic FC",
    role: "Volunteer rebuild",
    liveUrl: "https://www.baguleyathletic.co.uk",
    before: "Wix site",
    description:
      "Volunteer rebuild of a football club's site: migrated off Wix/Ionos to a static Cloudflare Pages build, cutting projected annual hosting cost from ~£118 to ~£10, and integrated FA Full-Time fixture and results feeds so match data updates automatically.",
    screenshots: [
      { page: "/", caption: "Home" },
      { page: "/fixtures", caption: "Fixtures from the FA Full-Time feed" },
      { page: "/story", caption: "Club story" },
    ],
  },
  {
    slug: "chetacare",
    name: "Chetacare",
    role: "Frontend build",
    liveUrl: "https://chetacare.com",
    description:
      "Frontend build for a Nigerian nonprofit, translating Figma designs into modular React components with Next.js and Tailwind CSS, with cross-browser and mobile-first testing to catch visual bugs before release.",
    screenshots: [
      { page: "/", caption: "Home" },
      { page: "/about", caption: "About" },
      { page: "/blog", caption: "Blog" },
    ],
  },
  {
    slug: "obuyisi",
    name: "Obuyisi bw'Omu Initiative",
    role: "Volunteer frontend",
    liveUrl: "https://obuyisibwomuinitiative.org",
    before: "WordPress site",
    description:
      "Volunteer frontend work for a Ugandan nonprofit: built a new page and entry form for their story competition, standardised formatting across existing pages, and fixed broken donation and social links.",
    screenshots: [
      { page: "/", caption: "Home" },
      { page: "/support-a-project/", caption: "Support a project" },
      { page: "/donate/", caption: "Donate" },
    ],
  },
  {
    // Shown with the owner's written permission (25 Oct 2026): design only,
    // the live site's code and content are his. Don't name him on the site.
    slug: "salsa-souls",
    name: "Salsa Souls",
    role: "Volunteer design concept",
    liveUrl: "https://www.salsasouls.co.uk",
    before: "old site",
    description:
      "Volunteer design concept for a Bristol salsa school, September 2026. I designed a new look for the school's website as a working demo, using its existing content. The owner chose to keep WordPress and later updated his site himself, using some ideas from the concept. I did the design only; the live site's code and content are his.",
    screenshots: [
      { page: "/", caption: "Home page" },
      { page: "/", caption: "Class times and venues" },
      { page: "/beginner-salsa-classes/", caption: "New beginners" },
    ],
  },
];

// A small "just for fun" card under the project folders, not a case study.
export const sideProject = {
  name: "Dino Escape",
  liveUrl: "https://uob-comsm0166.github.io/2025-group-13",
  thumb: "/media/projects/dino-escape/1-sm.webp",
  description: "A retro browser game I built with my university group in plain JavaScript.",
};
