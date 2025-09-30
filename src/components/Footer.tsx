"use client";

import AnchorLink from "@/components/AnchorLink";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-900 py-8 text-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-4">
          
          {/* Firma */}
          <div>
            <h4 className="m-0 text-lg font-extrabold">InfraOne IT Solutions GmbH</h4>
            <p className="m-0 text-slate-300">
              <a
                className="underline"
                href="https://www.infraone.ch/"
                target="_blank"
                rel="noreferrer"
              >
                infraone.ch
              </a>
              <br />
              <a className="underline" href="mailto:info@infraone.ch">
                info@infraone.ch
              </a>
            </p>
          </div>

          {/* Links (Abschnitte + Tools) */}
          <div>
            <h4 className="m-0 text-lg font-extrabold">Links</h4>
            <ul className="m-0 list-none p-0 space-y-1 text-slate-300">
              <li>
                <AnchorLink to="vorteile" className="underline">
                  Vorteile
                </AnchorLink>
              </li>
              <li>
                <AnchorLink to="anwendungsfaelle" className="underline">
                  Anwendungsfälle
                </AnchorLink>
              </li>
              <li>
                <AnchorLink to="pakete" className="underline">
                  Pakete
                </AnchorLink>
              </li>
              <li>
                <AnchorLink to="technik" className="underline">
                  Technik
                </AnchorLink>
              </li>
              <li>
                <AnchorLink to="prozess" className="underline">
                  Ablauf
                </AnchorLink>
              </li>
              <li>
                <AnchorLink to="faq" className="underline">
                  FAQ
                </AnchorLink>
              </li>
              <li>
                <Link className="underline" href="/rechner">
                  Kostenrechner
                </Link>
              </li>
              <li>
                <a
                  className="underline"
                  href="/whitepaper/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <Link className="underline" href="/displays">
                  Bildschirme
                </Link>
              </li>
            </ul>
          </div>

          {/* Standorte */}
          <div>
            <h4 className="m-0 text-lg font-extrabold">Standorte</h4>
            <ul className="m-0 list-none p-0 text-slate-300">
              <li className="mt-2">
                <strong>Winterthur</strong>
                <br />
                Rudolf-Diesel-Strasse 25, 8404 Winterthur
              </li>
              <li className="mt-2">
                <strong>Schaffhausen</strong>
                <br />
                Solenbergstrasse 35, 8207 Schaffhausen
              </li>
              <li className="mt-2">
                <strong>Tägerwilen</strong>
                <br />
                Bahnhofstrasse 17, 8274 Tägerwilen
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="m-0 text-lg font-extrabold">Rechtliches</h4>
            <ul className="m-0 list-none p-0 text-slate-300">
              <li>
                <a
                  className="underline"
                  href="https://www.infraone.ch/agb"
                  target="_blank"
                  rel="noreferrer"
                >
                  AGB
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.infraone.ch/impressum"
                  target="_blank"
                  rel="noreferrer"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.infraone.ch/datenschutz"
                  target="_blank"
                  rel="noreferrer"
                >
                  Datenschutz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-slate-400">
          <p className="m-0">
            werbebildschirme.ch ist eine Marke von InfraOne IT Solutions GmbH.
          </p>
          <p className="m-0">
            Alle Preise inkl. 8.1 % MwSt. Optional: Service/SLA nach Bedarf.
          </p>
        </div>
      </div>
    </footer>
  );
}
