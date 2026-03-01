"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopBar } from "./top-bar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();

  const footerLinks = [
    { href: "/learn", label: "Learn" },
    { href: "/examples", label: "Examples" },
    { href: "/tools", label: "Tools" },
    { href: "/insights", label: "Insights" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Shared Top Bar - identical to homepage */}
      <TopBar />

      {/* Main content */}
      <main id="main-content" className="flex-1 max-w-2xl mx-auto px-4 py-16 w-full">
        {children}
      </main>

      {/* Footer - dark frame */}
      <footer className="mt-auto bg-topbar border-t border-topbar-accent transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <p className="text-sm text-topbar-muted mb-6 text-center sm:text-left font-sans">
            TimeMeaning does not store the text you paste.
          </p>

          <nav className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm font-sans">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-topbar-foreground underline underline-offset-4"
                    : "text-topbar-foreground/80 hover:text-topbar-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
