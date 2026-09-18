import Link from "next/link";
import type { Metadata } from "next";
import { formatPostDate, getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing — Mahesh Nanavare",
  description: "Notes on working with small organisations and working in tech.",
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-end md:gap-10">
        <h1 className="type-display text-[clamp(2.75rem,7vw,5.5rem)] text-ink">
          Writing
        </h1>
        <p className="max-w-[52ch] text-ink-muted">
          Notes on building sites for small organisations, and on working in
          tech.
        </p>
      </div>

      {posts.length === 0 && (
        <p className="mt-12 text-ink-muted">
          Nothing published yet. The first post will appear here.
        </p>
      )}

      <div className="mt-12 border-b border-rule">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid gap-2 border-t border-rule py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10"
          >
            <time dateTime={post.date} className="pt-1 text-sm text-ink-muted tabular-nums">
              {formatPostDate(post.date)}
            </time>
            <div>
              <h2 className="type-wide text-2xl font-extrabold leading-tight text-ink underline decoration-transparent decoration-[3px] underline-offset-4 transition-colors group-hover:decoration-signal">
                {post.title}
              </h2>
              <p className="mt-2 max-w-[62ch] text-ink-muted">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
