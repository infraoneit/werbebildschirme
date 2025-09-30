"use client";
import { useEffect } from "react";

export default function ConfirmDialog({
  open, title="Sind Sie sicher?",
  message, onConfirm, onCancel
}:{
  open:boolean; title?:string; message:string;
  onConfirm:()=>void; onCancel:()=>void;
}){
  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      if(!open) return;
      if(e.key==="Escape") onCancel();
      if(e.key==="Enter") onConfirm();
    }
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  },[open,onCancel,onConfirm]);

  if(!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="border-b px-4 py-3">
          <h3 className="m-0 text-lg font-extrabold">{title}</h3>
        </div>
        <div className="px-4 py-4 text-slate-700">{message}</div>
        <div className="flex justify-end gap-2 px-4 py-3 border-t bg-slate-50">
          <button onClick={onCancel} className="rounded-lg border px-4 py-2">Abbrechen</button>
          <button onClick={onConfirm} className="rounded-lg bg-emerald-600 text-white px-5 py-2 font-bold">OK</button>
        </div>
      </div>
    </div>
  );
}
