"use client";

import AnchorLink from "@/components/AnchorLink";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-[#0A0A0A] py-12 text-white border-t border-slate-800">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">

          {/* Firma */}
          <div>
            <h4 className="mb-4 text-lg font-extrabold">InfraOne IT Solutions GmbH</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Cloud-Telefonanlagen, IT-Netzwerke & Betrieb für KMU in der Schweiz. Aktiv in Winterthur, Schaffhausen, Thurgau & gesamter Deutschschweiz.
            </p>
            <div className="text-slate-300 text-sm space-y-1">
              <a className="block hover:text-white transition-colors" href="tel:0522221818">
                Tel. 052 222 18 18
              </a>
              <a className="block hover:text-white transition-colors" href="mailto:info@infraone.ch">
                info@infraone.ch
              </a>
            </div>
            <div className="mt-4 flex flex-col items-start gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-consult"));
                }}
                className="inline-block rounded bg-[#3D9646] px-4 py-2 text-sm font-bold text-white hover:bg-[#2e7d36] transition-colors"
              >
                Kontaktformular öffnen
              </a>

            </div>
          </div>

          {/* Standorte */}
          <div>
            <h4 className="mb-4 text-lg font-extrabold">Standorte</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>
                <a href="https://maps.app.goo.gl/example" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <strong>Winterthur (Hauptstandort)</strong>
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/example" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Schaffhausen
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/example" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Tägerwilen
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/example" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Kleinandelfingen
                </a>
              </li>
            </ul>
          </div>

          {/* Websites & Projekte */}
          <div>
            <h4 className="mb-4 text-lg font-extrabold">Websites & Projekte</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>
                <a href="https://infraone.ch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  infraone.ch
                </a>
              </li>
              <li>
                <a href="https://cloud-telefonanlagen.ch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  cloud-telefonanlagen.ch
                </a>
              </li>
              <li>
                <a href="https://informatik-schweiz.ch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  informatik-schweiz.ch
                </a>
              </li>
              <li>
                <a href="https://informatik-support.ch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  informatik-support.ch
                </a>
              </li>
              <li>
                <Link href="/" className="text-white font-semibold">
                  werbebildschirme.ch
                </Link>
              </li>
            </ul>
          </div>

          {/* Rechtliches & Copyright */}
          <div>
            <h4 className="mb-4 text-lg font-extrabold">Rechtliches</h4>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li>
                <a href="https://www.infraone.ch/agb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  AGB
                </a>
              </li>
              <li>
                <a href="https://www.infraone.ch/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="https://www.infraone.ch/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Datenschutz
                </a>
              </li>
            </ul>
            <div className="text-slate-400 text-xs">
              <p className="mb-1">© 2025 – InfraOne IT Solutions GmbH</p>
              <p>Webdesign & Realisation: InfraOne IT Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
