import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annual maintenance — Mahesh Nanavare",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnnualMaintenance() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
      <h1 className="type-display text-[clamp(2.25rem,6vw,4rem)] text-ink mb-4">
        Annual maintenance
      </h1>
      <p className="type-wide text-3xl font-extrabold text-ink mb-8">
        <span className="bg-signal px-2">£395 / year</span>
      </p>

      <p className="text-ink-muted max-w-[58ch] mb-6">
        Ongoing support for a site I&apos;ve built or taken over: content
        updates, bug fixes, and new pages as you need them, billed once a year
        instead of monthly.
      </p>

      <ul className="space-y-2 mb-8">
        {[
          "Content and copy updates",
          "Bug fixes",
          "New pages added as needed",
          "Direct contact for changes and questions",
        ].map((item) => (
          <li
            key={item}
            className="flex gap-3 text-ink-muted before:mt-2.5 before:size-2 before:shrink-0 before:bg-signal before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>

      <a
        href="mailto:hello@maheshnanavare.co.uk?subject=Annual%20maintenance%20enquiry"
        className="inline-block rounded-full bg-signal px-6 py-3 font-semibold text-iron hover:bg-iron hover:text-on-iron transition-colors"
      >
        Email me about maintenance
      </a>
    </div>
  );
}
