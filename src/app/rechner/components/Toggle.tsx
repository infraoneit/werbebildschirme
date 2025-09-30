"use client";
export default function Toggle({ label, checked, onChange }:{
  label:string; checked:boolean; onChange:()=>void;
}){
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <span className="font-semibold">{label}</span>
      <span
        role="switch" aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex w-12 h-7 rounded-full transition border
          ${checked ? "bg-emerald-600 border-emerald-700" : "bg-slate-200 border-slate-300"}`}
      >
        <span className={`absolute top-0.5 transition ${checked ? "translate-x-5" : "translate-x-0.5"} inline-block w-6 h-6 bg-white rounded-full shadow`}/>
      </span>
    </label>
  );
}
