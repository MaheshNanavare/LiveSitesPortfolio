export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-iron w-full border-t border-iron-rule">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8">
        <p className="text-on-iron-muted">Say hello, or send me a brief.</p>
        <a
          href="mailto:mpnanavare@gmail.com"
          className="type-display mt-3 inline-block text-[clamp(1.375rem,6vw,2.5rem)] [overflow-wrap:anywhere] text-on-iron hover:text-signal transition-colors md:text-[clamp(2.5rem,5.2vw,3.75rem)]"
        >
          {/* When it can't fit one line, it breaks after the @ */}
          hello@<wbr />maheshnanavare.co.uk
        </a>
        <div className="mt-14 flex flex-col gap-2 border-t border-iron-rule pt-6 text-sm text-on-iron-muted sm:flex-row sm:justify-between">
          <p>&copy; {year} Mahesh Nanavare</p>
          <p>Made in Bristol, UK</p>
        </div>
      </div>
    </footer>
  );
}
