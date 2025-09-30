"use client";
export default function Lightbox({ src, alt, open, onClose }:{
  src:string; alt?:string; open:boolean; onClose:()=>void;
}){
  if(!open) return null;
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <img className="lb-img" src={src} alt={alt||""} />
    </div>
  );
}
