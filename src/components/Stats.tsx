export default function Stats() {
  const items = [
    { k: "> 99.9%", t: "Uptime CMS/Hosting (CH)" },
    { k: "≤ 15 Min.", t: "bis zur ersten Anzeige" },
    { k: "24 M.", t: "klare Laufzeit im Mietmodell" },
    { k: "100+", t: "Displays pro Kunde möglich" },
  ];
  return (
    <section className="py-8">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-4 px-6 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.t} className="rounded-2xl border bg-white p-5 text-center shadow-sm">
            <div className="text-3xl font-black text-[--infra-green]">{it.k}</div>
            <div className="mt-1 text-sm text-slate-600">{it.t}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
