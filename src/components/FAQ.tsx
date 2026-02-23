const faqs = [
  { q: "Cloud oder Lokal?", a: "Cloud = Abo, Zugriff von überall. Lokal = Einmalig, kein Abo. Du entscheidest, was besser passt." },
  { q: "Brauche ich Internet?", a: "Nein. Deine Screens laufen auch offline stabil weiter. Internet ist nur für Updates nötig." },
  { q: "Liefert ihr die Hardware?", a: "Ja. Profi-Displays (AG Neovo) und Player. Alles vorkonfiguriert. Du kannst aber auch eigene Hardware nutzen." },
  { q: "Montiert ihr auch?", a: "Ja. Wir montieren schweizweit. Egal ob Wand, Decke oder Standfuss." },
  { q: "Habe ich einen Ansprechpartner?", a: "Ja. Persönlicher Support in der Schweiz. Kein Callcenter." },
  { q: "Wie schnell geht das?", a: "In der Regel sind wir in 2 Wochen startklar. Lagerware sofort verfügbar." },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-12 scroll-mt-24">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <h2 className="mb-4 text-3xl font-black">FAQ</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map(f => (
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
