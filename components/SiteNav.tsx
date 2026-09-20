import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  // Writing link hidden until the first blog post is published:
  // { href: "/blog", label: "Writing" },
];

export default function SiteNav() {
  return (
    <header className="surface-iron sticky top-0 z-50 w-full border-b border-iron-rule">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="type-wide text-[15px] font-extrabold tracking-tight whitespace-nowrap text-on-iron hover:text-signal transition-colors min-[400px]:text-base sm:text-lg"
        >
          Mahesh Nanavare
        </Link>
        <nav className="flex items-center gap-3 text-sm whitespace-nowrap text-on-iron-muted min-[360px]:gap-4 min-[400px]:gap-5 sm:gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden py-1.5 hover:text-on-iron transition-colors sm:inline"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:mpnanavare@gmail.com"
            className="rounded-full bg-signal px-3 py-1.5 font-semibold min-[360px]:px-3.5 min-[400px]:px-4 text-iron hover:bg-on-iron transition-colors"
          >
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
