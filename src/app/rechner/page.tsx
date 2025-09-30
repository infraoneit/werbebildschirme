"use client";

import Link from "next/link";
import "../rechner.css";

export default function RechnerHub() {
  return (
    <main className="rechner">
      <div className="wrap">
        <div className="flex justify-between items-center mb-4 gap-2">
          {/* Fix: <a> → <Link> */}
          <Link href="/" className="btn btn-ghost">← Zurück zur Website</Link>
          <div className="flex items-center gap-2">
            <Link href="/displays/" target="_blank" rel="noopener" className="btn btn-ghost">
              Displays ansehen
            </Link>
          </div>
        </div>

        <h1 className="heading text-3xl font-black">Kostenrechner</h1>
        <p className="muted">Wähle dein Modell: Mietlösung oder lokale Kauf-Variante.</p>

        <section className="grid sm:grid-cols-2 gap-3 mt-4">
          <Link href="/rechner/miete" className="panel no-underline hover:ring-2 ring-emerald-600">
            <h2 className="m-0 text-xl font-extrabold">Miet-Rechner</h2>
            <p className="muted mt-1">
              Displays mieten oder eigene Displays nutzen – mit Player-Abo. Optional SIM.
            </p>
            <div className="mt-2">
              <span className="btn btn-primary">Öffnen</span>
            </div>
          </Link>

          <Link href="/rechner/lokal" className="panel no-underline hover:ring-2 ring-emerald-600">
            <h2 className="m-0 text-xl font-extrabold">Lokal-Rechner (Kauf)</h2>
            <p className="muted mt-1">
              Server &amp; Player einmalig kaufen, optional Displays. Optional SIM pro Player.
            </p>
            <div className="mt-2">
              <span className="btn btn-primary">Öffnen</span>
            </div>
          </Link>
        </section>

        <section className="grid gap-2 mt-6">
          <div className="panel">
            <strong>Hinweise</strong>
            <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
              <li>Bei jährlicher Zahlung im Mietmodell: 5&nbsp;% Rabatt auf Geräte/Player.</li>
              <li>SIM-Karten optional: CHF 10.– / Monat pro Player.</li>
              <li>Alle Preise in CHF, exkl. MwSt.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
