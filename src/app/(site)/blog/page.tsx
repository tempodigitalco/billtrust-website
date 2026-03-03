import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

/* eslint-disable @typescript-eslint/no-explicit-any */
const fallbackPosts: {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: { name: string; image?: any };
  categories: { title: string; slug: { current: string } }[];
  mainImage?: any;
}[] = [
  {
    _id: "1",
    title: "How AI is Transforming Accounts Receivable",
    slug: { current: "ai-transforming-accounts-receivable" },
    excerpt:
      "Discover how artificial intelligence and machine learning are revolutionizing the way businesses manage their accounts receivable processes.",
    publishedAt: "2024-12-15T00:00:00Z",
    author: { name: "Sarah Johnson" },
    categories: [{ title: "AI & Innovation", slug: { current: "ai" } }],
  },
  {
    _id: "2",
    title: "5 Strategies to Reduce Your DSO",
    slug: { current: "5-strategies-reduce-dso" },
    excerpt:
      "Learn proven strategies that leading finance teams use to reduce Days Sales Outstanding and improve cash flow.",
    publishedAt: "2024-12-10T00:00:00Z",
    author: { name: "Michael Chen" },
    categories: [
      { title: "Best Practices", slug: { current: "best-practices" } },
    ],
  },
  {
    _id: "3",
    title: "The Future of B2B Payments",
    slug: { current: "future-b2b-payments" },
    excerpt:
      "Explore the trends shaping the future of business-to-business payments, from virtual cards to real-time payments.",
    publishedAt: "2024-12-05T00:00:00Z",
    author: { name: "Lisa Park" },
    categories: [{ title: "Payments", slug: { current: "payments" } }],
  },
  {
    _id: "4",
    title: "Automating Cash Application: A Complete Guide",
    slug: { current: "automating-cash-application-guide" },
    excerpt:
      "Everything you need to know about automating your cash application process with AI and machine learning.",
    publishedAt: "2024-11-28T00:00:00Z",
    author: { name: "David Williams" },
    categories: [
      { title: "Cash Application", slug: { current: "cash-application" } },
    ],
  },
  {
    _id: "5",
    title: "Building a World-Class Collections Strategy",
    slug: { current: "world-class-collections-strategy" },
    excerpt:
      "How top-performing organizations are using technology and data to build more effective collections programs.",
    publishedAt: "2024-11-20T00:00:00Z",
    author: { name: "Jennifer Martinez" },
    categories: [
      { title: "Collections", slug: { current: "collections" } },
    ],
  },
  {
    _id: "6",
    title: "ERP Integration Best Practices for AR Automation",
    slug: { current: "erp-integration-best-practices" },
    excerpt:
      "Key considerations and best practices when integrating AR automation with your ERP system.",
    publishedAt: "2024-11-15T00:00:00Z",
    author: { name: "Robert Taylor" },
    categories: [
      { title: "Integration", slug: { current: "integration" } },
    ],
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  let posts = fallbackPosts;

  try {
    const sanityPosts = await client.fetch(allPostsQuery);
    if (sanityPosts?.length) posts = sanityPosts;
  } catch {
    // Use fallback
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      {/* Blog Header */}
      <section className="bg-[#001821] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Blog & Resources</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl">
            Insights, best practices, and thought leadership on accounts
            receivable automation and fintech innovation.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href={`/blog/${featuredPost.slug?.current}`}
              className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-[#4935BA]/10 to-[#8D82FF]/10 p-8 flex items-center justify-center min-h-[300px]">
                  {featuredPost.mainImage ? (
                    <Image
                      src={urlForImage(featuredPost.mainImage)
                        .width(600)
                        .height(400)
                        .url()}
                      alt={featuredPost.title}
                      width={600}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-[#4935BA]/20">
                      BT
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center rounded-full bg-[#4935BA]/10 px-3 py-1 text-xs font-medium text-[#4935BA]">
                      Featured
                    </span>
                    {featuredPost.categories?.[0] && (
                      <span className="text-sm text-gray-500">
                        {featuredPost.categories[0].title}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#001821] group-hover:text-[#4935BA] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-gray-600 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{featuredPost.author?.name}</span>
                      <span>&middot;</span>
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-[#4935BA]">
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug?.current}`}
                className="group block rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="bg-gradient-to-br from-[#4935BA]/5 to-[#8D82FF]/5 p-6 flex items-center justify-center h-48">
                  {post.mainImage ? (
                    <Image
                      src={urlForImage(post.mainImage)
                        .width(400)
                        .height(250)
                        .url()}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-[#4935BA]/15">
                      BT
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {post.categories?.[0] && (
                    <span className="inline-flex items-center rounded-full bg-[#4935BA]/10 px-3 py-1 text-xs font-medium text-[#4935BA] mb-3">
                      {post.categories[0].title}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-[#001821] group-hover:text-[#4935BA] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span>{post.author?.name}</span>
                    <span>&middot;</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
