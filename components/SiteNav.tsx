import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Writing" },
];

export default function SiteNav() {
  return (
    <header className="surface-iron sticky top-0 z-50 w-full border-b border-iron-rule">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="type-wide text-base font-extrabold tracking-tight text-on-iron hover:text-signal transition-colors sm:text-lg"
        >
          Mahesh Nanavare
        </Link>
        <nav className="flex items-center gap-5 text-sm text-on-iron-muted sm:gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden hover:text-on-iron transition-colors sm:inline"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/blog" className="hover:text-on-iron transition-colors sm:hidden">
            Writing
          </Link>
          <a
            href="mailto:hello@maheshnanavare.co.uk"
            className="rounded-full bg-signal px-4 py-1.5 font-semibold text-iron hover:bg-on-iron transition-colors"
          >
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
