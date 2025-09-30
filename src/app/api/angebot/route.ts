// src/app/api/angebot/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Beispiel-Daten aus deinem Rechner
  const { customer, type, interval, qty, pricing } = body;

  if (!customer?.name || !customer?.email) {
    return new Response(JSON.stringify({ error: "Missing customer data" }), { status: 400 });
  }

  // 📨 E-Mail-Inhalt zusammenbauen
  const html = `
    <h2>Neue Anfrage von werbebildschirme.ch</h2>
    <p><b>Name:</b> ${customer.name}</p>
    <p><b>E-Mail:</b> ${customer.email}</p>
    ${customer.phone ? `<p><b>Telefon:</b> ${customer.phone}</p>` : ""}
    ${customer.company ? `<p><b>Firma:</b> ${customer.company}</p>` : ""}
    <hr/>
    <p><b>Modell:</b> ${type === "miete" ? "Miete" : "Lokal"} (${interval ?? "-"})</p>
    <pre>${JSON.stringify(qty, null, 2)}</pre>
    <h3>Summen</h3>
    <pre>${JSON.stringify(pricing, null, 2)}</pre>
  `;

  // 🚨 Hier rufen wir deine bestehende Netlify Function auf,
  // die über Microsoft Graph E-Mails versendet.
  // Einfach per Fetch an /.netlify/functions/order schicken:
  await fetch(`${process.env.SITE_BASE_URL}/.netlify/functions/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
