import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";
import {
  productBySlugQuery,
  productSlugsQuery,
} from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

// Fallback product data for when Sanity isn't connected
const fallbackProducts: Record<string, {
  title: string;
  shortDescription: string;
  features: { title: string; description: string }[];
}> = {
  invoicing: {
    title: "Invoicing",
    shortDescription:
      "Deliver invoices through your customers' preferred channels with automated, intelligent delivery and real-time tracking.",
    features: [
      {
        title: "Multi-Channel Delivery",
        description:
          "Send invoices via email, portal, EDI, AP networks, or print — automatically routed to each customer's preference.",
      },
      {
        title: "Real-Time Tracking",
        description:
          "Know exactly when invoices are delivered, opened, and viewed with complete delivery confirmation.",
      },
      {
        title: "Template Management",
        description:
          "Create branded invoice templates with dynamic fields and custom branding for different customer segments.",
      },
      {
        title: "Automated Workflows",
        description:
          "Set up rules-based automation for invoice generation, approval, and delivery scheduling.",
      },
    ],
  },
  payments: {
    title: "Payments",
    shortDescription:
      "Accept and process payments across all channels with a unified platform that simplifies reconciliation.",
    features: [
      {
        title: "Omni-Channel Acceptance",
        description:
          "Accept credit cards, ACH, wire transfers, virtual cards, and checks through a single platform.",
      },
      {
        title: "Payment Portal",
        description:
          "Branded self-service portal where customers can view invoices and make payments 24/7.",
      },
      {
        title: "Automatic Reconciliation",
        description:
          "Payments are automatically matched and reconciled, reducing manual effort and errors.",
      },
      {
        title: "PCI Compliance",
        description:
          "Enterprise-grade security with PCI DSS Level 1 compliance and tokenized payment data.",
      },
    ],
  },
  "cash-application": {
    title: "Cash Application",
    shortDescription:
      "AI-powered payment matching that automates your cash application process with machine learning.",
    features: [
      {
        title: "AI-Powered Matching",
        description:
          "Machine learning algorithms automatically match payments to open invoices with high accuracy.",
      },
      {
        title: "Remittance Capture",
        description:
          "Extract remittance data from any format — email, portal, EDI, or check stubs.",
      },
      {
        title: "Exception Handling",
        description:
          "Smart routing of exceptions with suggested resolutions based on historical patterns.",
      },
      {
        title: "Continuous Learning",
        description:
          "The AI model improves over time, learning from corrections to increase match rates.",
      },
    ],
  },
  collections: {
    title: "Collections",
    shortDescription:
      "Smart prioritization and automated workflows to accelerate collections and reduce DSO.",
    features: [
      {
        title: "AI-Driven Prioritization",
        description:
          "Intelligent worklists that prioritize accounts based on payment likelihood and impact.",
      },
      {
        title: "Automated Dunning",
        description:
          "Configure multi-step dunning strategies with escalation rules and personalized messaging.",
      },
      {
        title: "Collector Workspace",
        description:
          "Unified workspace with customer history, communication logs, and one-click actions.",
      },
      {
        title: "Performance Analytics",
        description:
          "Track collector performance, promise-to-pay conversion, and DSO trends in real time.",
      },
    ],
  },
  "credit-management": {
    title: "Credit Management",
    shortDescription:
      "Make faster, smarter credit decisions with automated workflows and real-time risk assessment.",
    features: [
      {
        title: "Automated Credit Scoring",
        description:
          "Combine bureau data, trade references, and financial statements for automated credit decisions.",
      },
      {
        title: "Risk Monitoring",
        description:
          "Continuous monitoring of customer credit health with alerts for changes in risk profile.",
      },
      {
        title: "Workflow Automation",
        description:
          "Streamline credit applications, reviews, and approvals with configurable workflows.",
      },
      {
        title: "Portfolio Analytics",
        description:
          "Comprehensive view of credit exposure, concentration risk, and portfolio health metrics.",
      },
    ],
  },
  "order-to-cash": {
    title: "Order to Cash",
    shortDescription:
      "Complete end-to-end platform connecting every step of the accounts receivable process.",
    features: [
      {
        title: "Unified Platform",
        description:
          "Single platform connecting invoicing, payments, cash application, collections, and credit.",
      },
      {
        title: "End-to-End Visibility",
        description:
          "Complete visibility across the entire order-to-cash cycle with real-time dashboards.",
      },
      {
        title: "ERP Integration",
        description:
          "Pre-built integrations with SAP, Oracle, Microsoft Dynamics, and other major ERPs.",
      },
      {
        title: "Predictive Analytics",
        description:
          "AI-powered forecasting for cash flow, payment behavior, and DSO predictions.",
      },
    ],
  },
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(productSlugsQuery);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return Object.keys(fallbackProducts).map((slug) => ({ slug }));
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product = null;
  try {
    product = await client.fetch(productBySlugQuery, { slug });
  } catch {
    // Use fallback
  }

  const fallback = fallbackProducts[slug];
  if (!product && !fallback) {
    notFound();
  }

  const title = product?.title || fallback?.title || "Product";
  const description =
    product?.shortDescription || fallback?.shortDescription || "";
  const features = product?.features || fallback?.features || [];

  return (
    <>
      {/* Product Hero */}
      <section className="bg-gradient-to-br from-[#001821] to-[#4935BA] text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Solutions
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="mt-6 text-xl text-gray-300">{description}</p>
            <div className="mt-10 flex gap-4">
              <Link
                href="#"
                className="inline-flex items-center rounded-full bg-white text-[#4935BA] px-8 py-3.5 text-base font-semibold hover:bg-gray-100 transition-colors"
              >
                Get a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#001821] mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map(
              (feature: { title: string; description: string }, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="h-6 w-6 text-[#4935BA] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#001821]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Rich Text Content from Sanity */}
      {product?.description && (
        <section className="py-16 bg-[#F4F8F8]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg">
            <PortableText value={product.description} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#4935BA]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started with {title}?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            See how Billtrust can transform your accounts receivable process.
          </p>
          <Link
            href="#"
            className="mt-8 inline-flex items-center rounded-full bg-white text-[#4935BA] px-8 py-3.5 text-base font-semibold hover:bg-gray-100 transition-colors"
          >
            Schedule a Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
