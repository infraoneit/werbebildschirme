"use client";
import { useState } from "react";
import Counter from "./Counter";
import Lightbox from "./Lightbox";

export default function ModelCard({
  title, price, qty, setQty, imgSrc
}:{
  title:string; price:string; qty:number; setQty:(n:number)=>void; imgSrc?:string;
}){
  const [open, setOpen] = useState(false);
  return (
    <div className="card">
      {imgSrc && (
        <button type="button" onClick={()=> setOpen(true)} className="w-full">
          <img src={imgSrc} alt={title} className="w-full h-32 object-cover rounded-t-[18px]" />
        </button>
      )}
      <div className="p-4">
        <h4 className="m-0 text-base font-extrabold">{title}</h4>
        <div className="text-slate-600 text-sm mt-0.5">Preis: <strong>{price}</strong></div>
        <div className="mt-3"><Counter value={qty} onChange={setQty} /></div>
      </div>
      <Lightbox src={imgSrc||""} alt={title} open={open} onClose={()=> setOpen(false)} />
    </div>
  );
}
