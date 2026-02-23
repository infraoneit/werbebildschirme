"use client";
import { useState } from "react";
import Counter from "./Counter";
import Lightbox from "./Lightbox";

export default function ModelCard({
  title, price, qty, setQty, imgSrc, pdf
}: {
  title: string; price: string; qty: number; setQty: (n: number) => void; imgSrc?: string; pdf?: string;
}) {
  const [open, setOpen] = useState(false);

  const handleImageClick = () => {
    if (pdf) {
      window.open(pdf, "_blank", "noopener,noreferrer");
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="card">
      {imgSrc && (
        pdf ? (
          <a href={pdf} target="_blank" rel="noopener noreferrer" className="block w-full group relative bg-white rounded-t-[18px] overflow-hidden">
            {/* Exact match to Displays page: h-72 md:h-80, p-3 */}
            <div className="h-72 md:h-80 w-full flex items-center justify-center p-3 bg-white">
              <img src={imgSrc} alt={title} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
              {/* Optional: Icon overlay */}
            </div>
          </a>
        ) : (
          <button type="button" onClick={() => setOpen(true)} className="w-full group relative bg-white rounded-t-[18px] overflow-hidden">
            <div className="h-72 md:h-80 w-full flex items-center justify-center p-3 bg-white">
              <img src={imgSrc} alt={title} className="max-h-full max-w-full object-contain" />
            </div>
          </button>
        )
      )}
      <div className="p-4">
        <h4 className="m-0 text-base font-extrabold">{title}</h4>
        <div className="text-slate-600 text-sm mt-0.5">Preis: <strong>{price}</strong></div>
        {pdf && (
          <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline block mt-1">
            Datenblatt (PDF)
          </a>
        )}
        <div className="mt-3"><Counter value={qty} onChange={setQty} /></div>
      </div>
      <Lightbox src={imgSrc || ""} alt={title} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
