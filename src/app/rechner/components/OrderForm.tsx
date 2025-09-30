"use client";
import { useState } from "react";

export default function OrderForm({
  intervalText, amountText, onSubmitPayload
}:{ intervalText:string; amountText:string; onSubmitPayload:(data:any)=>Promise<void> }){
  const [sameAddr,setSameAddr]=useState(true);
  const [sameMail,setSameMail]=useState(true);
  const [agree,setAgree]=useState(false);
  const [sending,setSending]=useState(false);

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!agree){ alert("Bitte AGB akzeptieren."); return; }
    const fd=new FormData(e.currentTarget);
    const obj=Object.fromEntries(fd.entries());
    setSending(true);
    try{ await onSubmitPayload({ ...obj, sameAddr, sameMail, intervalText, amountText }); }
    finally{ setSending(false); }
  }

  return (
    <form className="grid gap-3" onSubmit={submit}>
      <div className="panel">
        <div className="badge">Zusammenfassung</div>
        <div className="mt-2 text-sm text-slate-700">Abrechnung: <strong>{intervalText}</strong></div>
        <div className="text-xl sm:text-2xl font-black text-emerald-700">{amountText}</div>
      </div>

      {/* Kundendaten */}
      <div className="panel form-grid form-grid-2">
        <label> Name* <input name="name" required /></label>
        <label> Firma <input name="company" /></label>
        <label> E-Mail* <input type="email" name="email" required /></label>
        <label> Telefon <input name="phone" /></label>
      </div>

      {/* Checkbox-Reihe */}
      <div className="panel checkrow">
        <label className="checklabel">
          <input type="checkbox" checked={sameAddr} onChange={()=>setSameAddr(!sameAddr)} />
          <span>Rechnungsadresse = Lieferadresse</span>
        </label>
        <label className="checklabel">
          <input type="checkbox" checked={sameMail} onChange={()=>setSameMail(!sameMail)} />
          <span>Rechnungs-E-Mail = Bestell-E-Mail</span>
        </label>
      </div>

      {/* Adressen */}
      <div className="panel">
        <div className="form-grid form-grid-2">
          <label> Liefer-Strasse* <input name="ship_street" required /></label>
          <label> Liefer-PLZ/Ort* <input name="ship_city" required /></label>
          {!sameAddr && <>
            <label> Rechnungs-Strasse* <input name="bill_street" required /></label>
            <label> Rechnungs-PLZ/Ort* <input name="bill_city" required /></label>
          </>}
        </div>

        {!sameMail && (
          <div className="mt-3">
            <input type="email" name="bill_email" required placeholder="Rechnungs-E-Mail*" />
          </div>
        )}
      </div>

      <div className="panel">
        <h4 className="m-0 font-bold">Bemerkungen</h4>
        <textarea name="message" rows={6} className="mt-2" />
        <label className="agb mt-3">
          <input type="checkbox" checked={agree} onChange={()=>setAgree(!agree)} />
          <span>Ich akzeptiere die <a href="/agb" target="_blank" rel="noopener">AGB</a>.</span>
        </label>
      </div>

      <div className="flex justify-between items-center">
        <a href="/" className="btn btn-ghost">← Zurück zur Website</a>
        <button className="btn btn-primary" disabled={sending}>{sending?"Sendet…":"Bestellung absenden"}</button>
      </div>
    </form>
  );
}
