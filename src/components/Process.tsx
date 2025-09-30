export default function Process(){
  const steps = [
    {t:"1. Bedarfsanalyse",d:"Displays, Standorte, Inhalte, Zuständigkeiten, Netz."},
    {t:"2. Konzept & Angebot",d:"Paketwahl, Hardware-Sizing, Vorlagen, Zeitplan."},
    {t:"3. Installation",d:"CMS/Hosting einrichten, Player registrieren, Tests."},
    {t:"4. Content & Einführung",d:"Vorlagen befüllen, Feindaten übernehmen, Redaktion einweisen."},
    {t:"5. Go-Live & Erweiterung",d:"Abnahme, Doku, optional Monitoring/Support, Ausbau."},
  ];
  return (
    <section id="prozess" className="py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <h2 className="mb-4 text-3xl font-black">So laufen Projekte ab</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s)=>(
            <div key={s.t} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
              <h3 className="m-0 text-[16px] font-extrabold text-emerald-900">{s.t}</h3>
              <p className="m-0 mt-1 text-[15px] text-emerald-900/80">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
