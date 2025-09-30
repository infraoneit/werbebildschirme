"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent } from "react";

/**
 * Einheitlicher Anchor-Link für Navbar/Footer.
 * - Wenn wir schon auf "/" sind: smooth scroll zu #id
 * - Sonst: navigiere zu "/#id"
 *
 * Usage:
 * <AnchorLink to="usecases" className="...">Use Cases</AnchorLink>
 */
export default function AnchorLink({
  to,                // z.B. "usecases" (ohne #)
  children,
  className,
  prefetch = false,  // Anker brauchen kein Prefetch
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const hash = `#${to}`;

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Wenn wir auf der Startseite sind, smooth scroll
    if (pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Option: Hash in URL aktualisieren (ohne Neuladen)
        history.replaceState(null, "", hash);
      }
      return;
    }
    // Sonst zur Startseite mit Hash navigieren
    // (Next scrollt dort automatisch zum Anker)
    e.preventDefault();
    router.push(`/${hash}`);
  }

  // Fallback-Href (falls JS disabled): immer absolute Variante
  return (
    <Link href={`/${hash}`} prefetch={prefetch} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
