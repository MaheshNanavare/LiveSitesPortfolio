const terms = [
  "I build and deploy the site with the pages and features we agree up front.",
  "I test before handover and fix any bugs found within 2 weeks, free.",
  "If you're not happy, I refund the £3.95 — no questions asked.",
  "Hosting is free on Cloudflare Pages. You only pay for a domain, around £10/year — you can use one you already own.",
];

export default function OfferSection() {
  return (
    <section
      data-panel
      aria-labelledby="builds-heading"
      className="panel surface-iron dots-dark w-full"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16 md:py-28">
        <div>
          <h2
            id="builds-heading"
            className="type-display text-[clamp(2rem,4.2vw,3.25rem)] text-on-iron"
          >
            Websites for small organisations
          </h2>
          <p className="type-display mt-6 text-[clamp(4rem,11vw,8rem)] text-signal">
            £3.95
          </p>
          <p className="mt-2 text-on-iron-muted">per site, the price of a meal deal</p>
        </div>

        <div>
          <p className="max-w-[58ch] text-lg text-on-iron">
            For NGOs, grassroots football clubs and small businesses. Priced
            low on purpose — I&apos;m building a track record, not chasing
            money. Most small organisations overpay for Wix or WordPress when
            a static site on Cloudflare Pages costs nothing to run.
          </p>

          <ul className="mt-8 border-t border-iron-rule">
            {terms.map((term) => (
              <li
                key={term}
                className="flex gap-4 border-b border-iron-rule py-4 text-on-iron-muted"
              >
                <span aria-hidden className="mt-2.5 size-2 shrink-0 bg-signal" />
                {term}
              </li>
            ))}
          </ul>

          <a
            href="mailto:hello@maheshnanavare.co.uk?subject=Website%20build%20enquiry"
            className="mt-8 inline-block rounded-full bg-signal px-6 py-3 font-semibold text-iron hover:bg-on-iron transition-colors"
          >
            Ask about a build
          </a>
        </div>
      </div>
    </section>
  );
}
