// src/app/api/angebot/route.ts
import { NextRequest } from "next/server";

type Customer = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  // optionale Zusatzfelder aus dem Formular:
  ship_street?: string;
  ship_city?: string;
  bill_street?: string;
  bill_city?: string;
  bill_email?: string;
  sameAddr?: boolean;
  sameMail?: boolean;
  message?: string;
};

type OrderBody = {
  type: "rent" | "local";
  interval?: "monthly" | "yearly";
  rentKind?: "rentDisplays" | "ownDisplays" | null;
  simQty?: number;
  playersOnly?: number;
  qty?: Record<string, number>;
  pricing?: Record<string, number>;
  customer: Customer;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<OrderBody>;

  // Minimal-Validierung
  if (!body?.customer?.name || !body?.customer?.email) {
    return new Response(JSON.stringify({ error: "Missing customer name/email" }), { status: 400 });
  }

  // → Übergib die Daten 1:1 an die Netlify-Function, die per MS Graph E-Mails sendet
  const res = await fetch(`${process.env.SITE_BASE_URL}/.netlify/functions/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // kurze Timeouts verhindern ewiges Hängen, wenn lokal getestet wird
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return new Response(JSON.stringify({ ok: false, error: text || `HTTP ${res.status}` }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
