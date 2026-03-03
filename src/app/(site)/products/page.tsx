import Link from "next/link";
import {
  FileText,
  CreditCard,
  Zap,
  TrendingUp,
  Shield,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/lib/queries";

const iconMap: Record<string, React.ReactNode> = {
  "file-text": <FileText className="h-8 w-8" />,
  "credit-card": <CreditCard className="h-8 w-8" />,
  zap: <Zap className="h-8 w-8" />,
  "trending-up": <TrendingUp className="h-8 w-8" />,
  shield: <Shield className="h-8 w-8" />,
  "bar-chart-3": <BarChart3 className="h-8 w-8" />,
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

export default async function ProductsPage() {
  let products = fallbackProducts;

  try {
    const sanityProducts = await client.fetch(allProductsQuery);
    if (sanityProducts?.length) products = sanityProducts;
  } catch {
    // Use fallback
  }

  return (
    <>
      <section className="bg-gradient-to-br from-[#001821] to-[#4935BA] text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              AR Solutions Built for the Enterprise
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Purpose-built products for every stage of the order-to-cash
              lifecycle, powered by AI and machine learning.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug?.current || product.slug}`}
                className="group block rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4935BA]/20 transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#4935BA]/10 text-[#4935BA] mb-5">
                  {iconMap[product.icon || "zap"] || (
                    <Zap className="h-8 w-8" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-[#001821] group-hover:text-[#4935BA] transition-colors">
                  {product.title}
                </h2>
                <p className="mt-3 text-gray-600">
                  {product.shortDescription}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-[#4935BA]">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
