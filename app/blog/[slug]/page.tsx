import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: `${post.title} — Mahesh Nanavare`,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
      <Link
        href="/blog"
        className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
      >
        All writing
      </Link>

      <time dateTime={post.date} className="mt-10 block text-sm text-ink-muted tabular-nums">
        {formatPostDate(post.date)}
      </time>
      <h1 className="type-display mt-3 text-[clamp(2.25rem,6vw,4rem)] text-ink">
        {post.title}
      </h1>

      <div
        className="prose-post mt-10 max-w-[65ch] text-[17px] leading-[1.75] text-ink"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
