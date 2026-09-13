export type Screenshot = {
  // Path on the live site, shown in the browser frame's address bar.
  page: string;
  caption: string;
};

export type Project = {
  // Screenshots live at public/media/projects/<slug>/<1|2|3>.webp, with a
  // 640px-wide <n>-sm.webp beside each for the folder cards. Missing files
  // render as a placeholder naming the path.
  slug: string;
  name: string;
  role: string;
  liveUrl: string;
  repoUrl?: string;
  description: string;
  screenshots: [Screenshot, Screenshot, Screenshot];
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
    liveUrl: "https://baguley-athletic.vercel.app",
    description:
      "Volunteer rebuild of a football club's site: migrated off Wix/Ionos to a static Cloudflare Pages build, cutting projected annual hosting cost from ~£118 to ~£10, and integrated FA Full-Time fixture and results feeds so match data updates automatically.",
    screenshots: [
      { page: "/index.html", caption: "Home" },
      { page: "/fixtures.html", caption: "Fixtures from the FA Full-Time feed" },
      { page: "/story.html", caption: "Club story" },
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
      { page: "/partner", caption: "Partner with Chetacare" },
    ],
  },
  {
    slug: "obuyisi",
    name: "Obuyisi bw'Omu Initiative",
    role: "Volunteer frontend",
    liveUrl: "https://obuyisibwomuinitiative.org",
    description:
      "Volunteer frontend work for a Ugandan nonprofit: built a new page and entry form for their story competition, standardised formatting across existing pages, and fixed broken donation and social links.",
    screenshots: [
      { page: "/", caption: "Home" },
      { page: "/storycompetition/", caption: "Story competition page" },
      { page: "/storycompetition/", caption: "Competition entry form" },
    ],
  },
  {
    slug: "dino-escape",
    name: "Dino Escape",
    role: "University group game",
    liveUrl: "https://uob-comsm0166.github.io/2025-group-13",
    description:
      "Cross-platform HTML5 retro game with character movement physics, menus and game loops in vanilla JavaScript, user-acceptance tested across 32 physical and emulated devices.",
    screenshots: [
      { page: "/2025-group-13/", caption: "Title screen" },
      { page: "/2025-group-13/", caption: "Level instructions" },
      { page: "/2025-group-13/", caption: "Level 1, Lava Rush" },
    ],
  },
  {
    slug: "bristol-cafe",
    name: "Bristol Cafe",
    role: "Full-stack app",
    liveUrl: "https://cafe-service-dqh6.onrender.com",
    description:
      "Customer management system with a Spring Boot REST API backed by PostgreSQL, and live-updating data grids and forms via the Fetch API for frictionless, no-refresh updates.",
    screenshots: [
      { page: "/", caption: "Customer records" },
      { page: "/", caption: "Stats panel" },
      { page: "/", caption: "Editing a record" },
    ],
  },
];
