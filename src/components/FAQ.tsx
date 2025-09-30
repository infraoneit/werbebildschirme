const faqs = [
  {q:"Was sind die Vorteile einer Mietlösung?", a:"Planbare Monatskosten ab CHF 59.–, Display (Indoor/Outdoor) und Player inklusive, Hosting in der Schweiz, zentrale Verwaltung per Weboberfläche, klare Vertragslaufzeit (24 Monate)."},
  {q:"Brauche ich zwingend Internet?", a:"Lokal: Nein (Cache). Mietmodell: Internet bzw. SIM für Synchronisation/Updates empfohlen."},
  {q:"Wie viele Displays sind möglich?", a:"Nahezu unbegrenzt. Wir dimensionieren Server, Netzwerk und Player entsprechend."},
  {q:"Welche Player werden unterstützt?", a:"Empfohlen sind Android & Windows; zusätzlich je nach Projekt auch webOS, Tizen oder Linux."},
  {q:"Gibt es Vorlagen?", a:"Ja. InfraOne liefert personalisierte Anzeige-Vorlagen im eigenen Branding, die in Sekunden befüllt werden."},
  {q:"Support & Wartung?", a:"Optionaler Servicevertrag/SLA (Updates, Monitoring) – flexibel nach Bedarf."},
];

export default function FAQ(){
  return (
    <section id="faq" className="py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <h2 className="mb-4 text-3xl font-black">FAQ</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map(f=>(
            <details key={f.q} className="rounded-2xl bg-white p-4 shadow">
              <summary className="cursor-pointer text-base font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
