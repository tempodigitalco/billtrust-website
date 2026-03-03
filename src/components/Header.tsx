"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navigation = [
  {
    label: "Solutions",
    href: "/products",
    children: [
      { label: "Invoicing", href: "/products/invoicing" },
      { label: "Payments", href: "/products/payments" },
      { label: "Cash Application", href: "/products/cash-application" },
      { label: "Collections", href: "/products/collections" },
      { label: "Credit Management", href: "/products/credit-management" },
      { label: "Order to Cash", href: "/products/order-to-cash" },
    ],
  },
  { label: "Resources", href: "/blog" },
  { label: "Company", href: "#" },
  { label: "Partners", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#4935BA]">
              Billtrust
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-[#001821] hover:text-[#4935BA] transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-56 rounded-lg bg-white shadow-lg ring-1 ring-gray-100 p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-sm text-[#001821] hover:bg-[#F4F8F8] hover:text-[#4935BA] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-[#001821] hover:text-[#4935BA] transition-colors"
            >
              Login
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-full bg-[#4935BA] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3a2a95] transition-colors"
            >
              Get a Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#001821]" />
            ) : (
              <Menu className="h-6 w-6 text-[#001821]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium text-[#001821]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block py-1.5 pl-4 text-sm text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="#"
                className="text-center rounded-full bg-[#4935BA] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Get a Demo
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
