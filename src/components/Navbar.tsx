"use client";

import Link from "next/link";
import AnchorLink from "@/components/AnchorLink";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  action?: string;
  external?: boolean;
};

// Navigationselemente
const nav: NavItem[] = [
  { label: "Lösungen", href: "#loesungen" },
  { label: "Produkte", href: "/displays" },
  { label: "FAQ", href: "#faq" },
  { label: "Preise", href: "#preise" },
  { label: "Kontakt", href: "#kontakt", action: "open-consult" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-[#0A0A0A] border-slate-800 text-white transition-colors duration-300">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3 md:px-6">

        {/* Logo */}
        <Link href="/" aria-label="InfraOne Startseite" className="flex items-center gap-3">
          <img
            src="/infraone-logo-weiss.svg"
            alt="InfraOne Logo"
            className="h-9 w-auto md:h-10"
          />
          <span className="sr-only">InfraOne</span>
        </Link>

        {/* Haupt-Navigation */}
        <div className="hidden items-center gap-6 text-[15px] font-medium text-slate-300 md:flex">
          {nav.map((n) => {
            if (n.external) {
              return (
                <a
                  key={n.label}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {n.label}
                </a>
              );
            }

            if (n.action === "open-consult") {
              return (
                <button
                  key={n.label}
                  onClick={() => window.dispatchEvent(new CustomEvent("open-consult"))}
                  className="hover:text-white transition-colors"
                >
                  {n.label}
                </button>
              );
            }

            if (n.href.startsWith("#")) {
              return (
                <AnchorLink key={n.label} to={n.href.substring(1)} className="hover:text-white transition-colors">
                  {n.label}
                </AnchorLink>
              );
            }

            return (
              <Link key={n.label} href={n.href} className="hover:text-white transition-colors">
                {n.label}
              </Link>
            );
          })}
        </div>

        {/* Rechts: Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-consult"));
            }}
            className="btn btn-primary bg-[#3D9646] border-[#3D9646] hover:bg-[#2e7d36] text-white"
          >
            Beratung buchen
          </a>
        </div>
      </div>
    </nav>
  );
}
