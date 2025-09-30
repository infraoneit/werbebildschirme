"use client";
export default function Stepper({ steps, active, goto }:{
  steps:string[]; active:number; goto?:(n:number)=>void;
}){
  return (
    <div className="stepper">
      {steps.map((s,i)=>{
        const n=i+1, isActive=n===active;
        return (
          <button
            key={s}
            type="button"
            onClick={()=> goto?.(n)}
            className={`step ${isActive ? "is-active" : ""}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border">{n}</span>
            <span className="font-semibold">{s}</span>
          </button>
        );
      })}
    </div>
  );
}
