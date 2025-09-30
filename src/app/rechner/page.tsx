import Link from "next/link";
import "./rechner.css";

export default function Hub(){
  return (
    <main className="rechner">
      <div className="wrap">
        <div className="flex justify-between items-center gap-2 mb-6">
          <a href="/" className="btn btn-ghost">← Zurück zur Website</a>
          <Link href="/displays/" target="_blank" className="btn btn-ghost">Displays ansehen</Link>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 items-center">
          <div className="panel">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Infraone" width={120} height={40} />
              <span className="badge">Kostenrechner</span>
            </div>
            <h1 className="heading text-3xl font-black mt-2">Wähle deinen Rechner</h1>
            <p className="muted">Transparente Kalkulation – **Miete** mit 5 % Jahresrabatt auf Geräte/Player oder
              **lokale Kauf-Lösung** mit optionalen Displays. Ergebnisse kannst du direkt bestellen.</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/rechner/miete" className="btn btn-primary">Miet-Rechner öffnen</Link>
              <Link href="/rechner/lokal" className="btn btn-ghost">Lokaler Rechner öffnen</Link>
            </div>
          </div>

          <div className="panel">
            <h3 className="m-0 text-lg font-extrabold">Hinweise</h3>
            <ul className="muted mt-2" style={{paddingLeft:"1.1rem"}}>
              <li>SIM-Karten optional (monatlich) und separat ausgewiesen.</li>
              <li>Jahreszahlung: −5 % auf Geräte/Player (nicht auf SIM).</li>
              <li>Eigene Displays? Player-Abo CHF 25/Monat verfügbar.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
