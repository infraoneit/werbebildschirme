"use client";

export default function CostBox({
  label, amount, lines
}:{ label:string; amount:string; lines?: {k:string; v:string}[] }){
  return (
    <aside className="panel">
      <h3 className="m-0 text-base font-extrabold">Aktuelle Kosten</h3>
      <div className="mt-1 text-slate-700 text-sm">{label}</div>
      {lines?.length ? (
        <dl className="mt-2 text-sm">
          {lines.map(({k,v})=>(
            <div key={k} className="flex justify-between gap-3"><dt className="text-slate-600">{k}</dt><dd className="font-semibold">{v}</dd></div>
          ))}
        </dl>
      ):null}
      <div className="mt-2 text-2xl font-black text-emerald-700">{amount}</div>
    </aside>
  );
}
