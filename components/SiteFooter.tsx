export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-iron w-full border-t border-iron-rule">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8">
        <p className="text-on-iron-muted">Say hello, or send me a brief.</p>
        <a
          href="mailto:hello@maheshnanavare.co.uk"
          className="type-display mt-3 inline-block text-[clamp(1.5rem,5.2vw,3.75rem)] break-all text-on-iron hover:text-signal transition-colors sm:break-normal"
        >
          hello@maheshnanavare.co.uk
        </a>
        <div className="mt-14 flex flex-col gap-2 border-t border-iron-rule pt-6 text-sm text-on-iron-muted sm:flex-row sm:justify-between">
          <p>&copy; {year} Mahesh Nanavare. Made in Bristol.</p>
          <p>Static site, hosted on Cloudflare Pages.</p>
        </div>
      </div>
    </footer>
  );
}
