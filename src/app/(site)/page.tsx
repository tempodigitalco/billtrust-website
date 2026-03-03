import Link from "next/link";
import {
  FileText,
  CreditCard,
  BarChart3,
  Users,
  Shield,
  ArrowRight,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { homePageQuery, allProductsQuery } from "@/sanity/lib/queries";

const iconMap: Record<string, React.ReactNode> = {
  "file-text": <FileText className="h-8 w-8" />,
  "credit-card": <CreditCard className="h-8 w-8" />,
  "bar-chart-3": <BarChart3 className="h-8 w-8" />,
  users: <Users className="h-8 w-8" />,
  shield: <Shield className="h-8 w-8" />,
  zap: <Zap className="h-8 w-8" />,
  "trending-up": <TrendingUp className="h-8 w-8" />,
  clock: <Clock className="h-8 w-8" />,
};

// Fallback data when Sanity isn't connected yet
const fallbackData = {
  heroHeading: "AI-Powered Accounts Receivable Software",
  heroSubheading:
    "Accelerate your order-to-cash cycle with intelligent automation. Reduce DSO, improve cash flow, and deliver a better customer experience.",
  heroCtaText: "Get a Demo",
  heroCtaLink: "#",
  featuresHeading: "End-to-End AR Automation",
  features: [
    {
      title: "Smart Invoicing",
      description:
        "Deliver invoices through your customers' preferred channels with automated, intelligent delivery.",
      icon: "file-text",
    },
    {
      title: "Integrated Payments",
      description:
        "Accept payments across all channels with a unified platform that simplifies reconciliation.",
      icon: "credit-card",
    },
    {
      title: "AI Cash Application",
      description:
        "Automatically match payments to invoices with AI-powered cash application that learns over time.",
      icon: "zap",
    },
    {
      title: "Intelligent Collections",
      description:
        "Prioritize collection efforts with AI-driven worklists and automated dunning strategies.",
      icon: "trending-up",
    },
    {
      title: "Credit Management",
      description:
        "Make faster, smarter credit decisions with automated workflows and real-time risk assessment.",
      icon: "shield",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Get complete visibility into your AR performance with dashboards and predictive insights.",
      icon: "bar-chart-3",
    },
  ],
  ctaSection: {
    heading: "Ready to Transform Your Accounts Receivable?",
    description:
      "Join thousands of companies that trust Billtrust to automate their order-to-cash process.",
    buttonText: "Schedule a Demo",
    buttonLink: "#",
  },
};

const fallbackProducts = [
  {
    _id: "1",
    title: "Invoicing",
    slug: { current: "invoicing" },
    shortDescription:
      "Automate invoice delivery across all channels with intelligent routing and tracking.",
    icon: "file-text",
  },
  {
    _id: "2",
    title: "Payments",
    slug: { current: "payments" },
    shortDescription:
      "Unified payment acceptance across credit, ACH, wire, and virtual card channels.",
    icon: "credit-card",
  },
  {
    _id: "3",
    title: "Cash Application",
    slug: { current: "cash-application" },
    shortDescription:
      "AI-powered payment matching that automates your cash application process.",
    icon: "zap",
  },
  {
    _id: "4",
    title: "Collections",
    slug: { current: "collections" },
    shortDescription:
      "Smart prioritization and automated workflows to accelerate collections.",
    icon: "trending-up",
  },
  {
    _id: "5",
    title: "Credit Management",
    slug: { current: "credit-management" },
    shortDescription:
      "Automated credit decisioning with real-time risk monitoring.",
    icon: "shield",
  },
  {
    _id: "6",
    title: "Order to Cash",
    slug: { current: "order-to-cash" },
    shortDescription:
      "Complete end-to-end platform connecting every step of the AR process.",
    icon: "bar-chart-3",
  },
];

export default async function HomePage() {
  let pageData = fallbackData;
  let products = fallbackProducts;

  try {
    const [sanityPage, sanityProducts] = await Promise.all([
      client.fetch(homePageQuery),
      client.fetch(allProductsQuery),
    ]);
    if (sanityPage) pageData = { ...fallbackData, ...sanityPage };
    if (sanityProducts?.length) products = sanityProducts;
  } catch {
    // Use fallback data if Sanity isn't configured yet
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001821] via-[#0a2940] to-[#4935BA] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0aDR2NEgzNnYtNHptMCAwaC00djRoNHYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {pageData.heroHeading}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl">
              {pageData.heroSubheading}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={pageData.heroCtaLink}
                className="inline-flex items-center justify-center rounded-full bg-white text-[#4935BA] px-8 py-3.5 text-base font-semibold hover:bg-gray-100 transition-colors"
              >
                {pageData.heroCtaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Logos Placeholder */}
      <section className="bg-[#F4F8F8] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 mb-8">
            TRUSTED BY LEADING ENTERPRISES
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-40">
            {["Enterprise 1", "Enterprise 2", "Enterprise 3", "Enterprise 4", "Enterprise 5"].map(
              (name) => (
                <div
                  key={name}
                  className="h-8 w-28 bg-gray-400 rounded"
                  title={name}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001821]">
              {pageData.featuresHeading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A unified platform that automates every step of the accounts
              receivable process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-[#4935BA]/20 transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#4935BA]/10 text-[#4935BA] mb-5 group-hover:bg-[#4935BA] group-hover:text-white transition-colors">
                  {iconMap[feature.icon || "zap"] || (
                    <Zap className="h-8 w-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[#001821] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-[#F4F8F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001821]">
              Our Solutions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Purpose-built products for every stage of the order-to-cash
              lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug?.current || product.slug}`}
                className="group block rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#4935BA]/20"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#4935BA]/10 text-[#4935BA] mb-4">
                  {iconMap[product.icon || "zap"] || (
                    <Zap className="h-6 w-6" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#001821] group-hover:text-[#4935BA] transition-colors">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {product.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-[#4935BA]">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#4935BA]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {pageData.ctaSection.heading}
          </h2>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            {pageData.ctaSection.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={pageData.ctaSection.buttonLink}
              className="inline-flex items-center justify-center rounded-full bg-white text-[#4935BA] px-8 py-3.5 text-base font-semibold hover:bg-gray-100 transition-colors"
            >
              {pageData.ctaSection.buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
