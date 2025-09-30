"use client";
export default function Counter({ value, onChange, min=0 }:{
  value:number; onChange:(n:number)=>void; min?:number;
}){
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-300 overflow-hidden">
      <button type="button" onClick={()=> onChange(Math.max(min, value-1))}
        className="px-3 py-2 bg-slate-50">–</button>
      <input value={value} readOnly className="w-14 text-center py-2" />
      <button type="button" onClick={()=> onChange(value+1)}
        className="px-3 py-2 bg-slate-50">+</button>
    </div>
  );
}
