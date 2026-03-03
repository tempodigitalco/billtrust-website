import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

const fallbackPosts: Record<string, {
  title: string;
  excerpt: string;
  publishedAt: string;
  author: { name: string };
  categories: { title: string }[];
  bodyText: string;
}> = {
  "ai-transforming-accounts-receivable": {
    title: "How AI is Transforming Accounts Receivable",
    excerpt:
      "Discover how artificial intelligence and machine learning are revolutionizing the way businesses manage their accounts receivable processes.",
    publishedAt: "2024-12-15T00:00:00Z",
    author: { name: "Sarah Johnson" },
    categories: [{ title: "AI & Innovation" }],
    bodyText:
      "Artificial intelligence is reshaping the accounts receivable landscape. From automated cash application to predictive analytics for collections, AI-powered solutions are helping finance teams work smarter and faster. In this article, we explore the key areas where AI is making the biggest impact on AR operations and what the future holds for intelligent automation in finance.",
  },
  "5-strategies-reduce-dso": {
    title: "5 Strategies to Reduce Your DSO",
    excerpt:
      "Learn proven strategies that leading finance teams use to reduce Days Sales Outstanding and improve cash flow.",
    publishedAt: "2024-12-10T00:00:00Z",
    author: { name: "Michael Chen" },
    categories: [{ title: "Best Practices" }],
    bodyText:
      "Days Sales Outstanding (DSO) is one of the most critical metrics for any finance organization. A high DSO means your cash is tied up in receivables, impacting your ability to invest and grow. Here are five proven strategies that the best finance teams use to keep their DSO low and their cash flow healthy.",
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(postSlugsQuery);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return Object.keys(fallbackPosts).map((slug) => ({ slug }));
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch {
    // Use fallback
  }

  const fallback = fallbackPosts[slug];
  if (!post && !fallback) {
    notFound();
  }

  const title = post?.title || fallback?.title || "Blog Post";
  const excerpt = post?.excerpt || fallback?.excerpt || "";
  const publishedAt = post?.publishedAt || fallback?.publishedAt || "";
  const author = post?.author || fallback?.author;
  const categories = post?.categories || fallback?.categories || [];
  const body = post?.body;
  const bodyText = fallback?.bodyText;

  return (
    <>
      {/* Post Header */}
      <section className="bg-[#001821] text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            {categories.map((cat: { title: string }, i: number) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white"
              >
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-6 text-lg text-gray-300">{excerpt}</p>

          <div className="mt-8 flex items-center gap-4">
            {post?.author?.image && (
              <Image
                src={urlForImage(post.author.image).width(48).height(48).url()}
                alt={author?.name || ""}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              {author && (
                <p className="text-sm font-medium text-white">
                  {author.name}
                </p>
              )}
              {publishedAt && (
                <p className="text-sm text-gray-400">
                  {formatDate(publishedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Post Image */}
      {post?.mainImage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8">
          <Image
            src={urlForImage(post.mainImage).width(900).height(500).url()}
            alt={title}
            width={900}
            height={500}
            className="rounded-2xl object-cover w-full"
          />
        </div>
      )}

      {/* Post Content */}
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {body ? (
            <div className="prose prose-lg max-w-none prose-headings:text-[#001821] prose-a:text-[#4935BA]">
              <PortableText value={body} />
            </div>
          ) : bodyText ? (
            <div className="prose prose-lg max-w-none prose-headings:text-[#001821]">
              <p>{bodyText}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">
              Content coming soon. Connect Sanity CMS to add rich blog content.
            </p>
          )}
        </div>
      </article>

      {/* Back to Blog CTA */}
      <section className="py-12 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#4935BA] font-medium hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </section>
    </>
  );
}
