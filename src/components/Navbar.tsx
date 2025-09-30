"use client";

import Link from "next/link";
import AnchorLink from "@/components/AnchorLink"; // neu: unsere smarte Anchor-Komponente

// Navigationselemente
const nav = [
  { label: "Vorteile", href: "#vorteile" },
  { label: "Anwendungsfälle", href: "#anwendungsfaelle" },
  { label: "Pakete", href: "#pakete" },
  { label: "Technik", href: "#technik" },
  { label: "Ablauf", href: "#prozess" },
  { label: "FAQ", href: "#faq" },
  { label: "Kostenrechner", href: "/rechner" },
  { label: "Whitepaper", href: "/whitepaper/index.html", external: true },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        
        {/* Logo */}
        <Link href="/" aria-label="InfraOne Startseite" className="flex items-center gap-3">
          <img src="/logo.png" alt="InfraOne Logo" className="h-9 w-auto md:h-10" />
          <span className="sr-only">InfraOne</span>
        </Link>

        {/* Haupt-Navigation */}
        <div className="hidden items-center gap-5 text-[15px] font-semibold text-slate-700 md:flex">
          {nav.map((n) => {
            if (n.external) {
              // externe Links (z. B. Whitepaper)
              return (
                <a
                  key={n.label}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900"
                >
                  {n.label}
                </a>
              );
            }

            if (n.href.startsWith("#")) {
              // interne Abschnitts-Links (über AnchorLink)
              return (
                <AnchorLink key={n.label} to={n.href.substring(1)} className="hover:text-slate-900">
                  {n.label}
                </AnchorLink>
              );
            }

            // normale Seiten-Links (z. B. /rechner, /displays)
            return (
              <Link key={n.label} href={n.href} className="hover:text-slate-900">
                {n.label}
              </Link>
            );
          })}
        </div>

        {/* Rechts: große Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/displays" className="btn btn-secondary">
            Bildschirme
          </Link>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-consult"));
            }}
            className="btn btn-primary"
          >
            Beratung buchen
          </a>
        </div>
      </div>
    </nav>
  );
}
