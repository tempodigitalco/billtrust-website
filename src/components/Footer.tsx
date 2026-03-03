import Link from "next/link";

const footerLinks = {
  Solutions: [
    { label: "Invoicing", href: "/products/invoicing" },
    { label: "Payments", href: "/products/payments" },
    { label: "Cash Application", href: "/products/cash-application" },
    { label: "Collections", href: "/products/collections" },
    { label: "Credit Management", href: "/products/credit-management" },
    { label: "Order to Cash", href: "/products/order-to-cash" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#001821] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              Billtrust
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              AI-powered accounts receivable automation that accelerates your
              order-to-cash process.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Billtrust. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              LinkedIn
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
