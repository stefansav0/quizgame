import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/ideas", label: "Quiz & Game Ideas" },
  { href: "/feedback", label: "Feedback" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        {/* COPYRIGHT — LEFT */}
        <span className="text-center sm:text-left">
          © {currentYear} GetKnowify. All rights reserved.
        </span>

        {/* LINKS — RIGHT */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}