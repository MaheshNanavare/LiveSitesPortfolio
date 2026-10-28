export type Job = {
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  dates: string;
  stack: string[];
  points: string[];
};

// Newest first. Shown in the Experience section on the homepage.
export const experience: Job[] = [
  {
    role: "Junior Developer",
    company: "Occasia",
    companyUrl: "https://www.occasia.io",
    location: "London, UK",
    dates: "Oct 2026 to present",
    stack: ["React", "TypeScript", "Python", "AWS Lambda", "API Gateway", "PostgreSQL"],
    points: [
      "Work on a live B2B SaaS booking platform that connects event organisers with small venues. Report to the founder and work with the lead engineer and product designer.",
      "Building an internal analytics tool on AWS: Lambdas behind API Gateway log product events to PostgreSQL, scheduled jobs summarise them, and a React and TypeScript dashboard shows feature use and booking drop-off.",
      "Audited the live web app, fixed the UI bugs I found in React and TypeScript, and wrote a 20+ case regression test plan for bookings, add-ons and pricing.",
    ],
  },
];
