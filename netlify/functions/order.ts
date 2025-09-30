// netlify/functions/order.ts
import type { Handler } from "@netlify/functions";

const {
  TENANT_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  MAIL_FROM,
  MAIL_TO,
  SITE_BASE_URL,
} = process.env;

type OrderPayload = {
  type?: "miete" | "kauf";
  interval?: "month" | "year";
  rentKind?: string;
  qty?: any;        // kommt von deinem Rechner (JSON)
  pricing?: any;    // kommt von deinem Rechner (JSON)
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    address?: string;
    sameAddr?: boolean;
    sameMail?: boolean;
    notes?: string;
  };
};

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function assertEnv() {
  const miss: string[] = [];
  if (!TENANT_ID) miss.push("TENANT_ID");
  if (!CLIENT_ID) miss.push("CLIENT_ID");
  if (!CLIENT_SECRET) miss.push("CLIENT_SECRET");
  if (!MAIL_FROM) miss.push("MAIL_FROM");
  if (!MAIL_TO) miss.push("MAIL_TO");
  if (miss.length) throw new Error("Missing ENV: " + miss.join(", "));
}

async function getGraphToken(): Promise<string> {
  const body = new URLSearchParams({
    client_id: CLIENT_ID!,
    client_secret: CLIENT_SECRET!,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  }).toString();

  const res = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Token error ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.access_token as string;
}

async function sendMailGraph(fromAddress: string, to: string, subject: string, html: string) {
  const token = await getGraphToken();
  const payload = {
    message: {
      subject,
      body: { contentType: "HTML", content: html },
      toRecipients: [{ emailAddress: { address: to } }],
      from: { emailAddress: { address: fromAddress } },
    },
    saveToSentItems: true,
  };

  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromAddress)}/sendMail`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Graph sendMail failed ${res.status}: ${await res.text()}`);
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    assertEnv();

    const data = JSON.parse(event.body || "{}") as OrderPayload;
    const customer = data.customer || {};

    if (!customer.name || !customer.email) {
      return { statusCode: 400, body: "Missing customer name/email" };
    }

    const fromAddr = MAIL_FROM!.match(/<(.+?)>/)?.[1] || MAIL_FROM!;

    // Interne Mail (alle Details)
    const internalHtml = `
      <h2>Neue Bestellung</h2>
      <p><b>Typ:</b> ${esc(data.type)} ${data.rentKind ? "( " + esc(data.rentKind) + " )" : ""}</p>
      ${data.interval ? `<p><b>Abrechnung:</b> ${esc(data.interval)}</p>` : ""}

      <h3>Positionen</h3>
      <pre style="background:#f6f6f6;padding:12px;border-radius:8px;white-space:pre-wrap;">${esc(JSON.stringify(data.qty ?? {}, null, 2))}</pre>

      <h3>Summen</h3>
      <pre style="background:#f6f6f6;padding:12px;border-radius:8px;white-space:pre-wrap;">${esc(JSON.stringify(data.pricing ?? {}, null, 2))}</pre>

      <h3>Kunde</h3>
      <p><b>Name:</b> ${esc(customer.name)}</p>
      <p><b>E-Mail:</b> ${esc(customer.email)}</p>
      ${customer.phone ? `<p><b>Telefon:</b> ${esc(customer.phone)}</p>` : ""}
      ${customer.company ? `<p><b>Firma:</b> ${esc(customer.company)}</p>` : ""}
      ${customer.address ? `<p><b>Adresse:</b> ${esc(customer.address)}</p>` : ""}
      ${"sameAddr" in customer ? `<p><b>Rechnungsadresse = Lieferadresse:</b> ${customer.sameAddr ? "Ja" : "Nein"}</p>` : ""}
      ${"sameMail" in customer ? `<p><b>Rechnungs-E-Mail = Bestell-E-Mail:</b> ${customer.sameMail ? "Ja" : "Nein"}</p>` : ""}
      ${customer.notes ? `<p><b>Bemerkungen:</b> ${esc(customer.notes)}</p>` : ""}
      ${SITE_BASE_URL ? `<p><i>Quelle:</i> ${esc(SITE_BASE_URL)}</p>` : ""}
    `;

    await sendMailGraph(fromAddr, MAIL_TO!, `Neue Bestellung – ${String(data.type ?? "ORDER").toUpperCase()}${data.interval ? " / " + data.interval : ""}`, internalHtml);

    // Bestätigung an Kunde
    const customerHtml = `
      <p>Guten Tag ${esc(customer.name)},</p>
      <p>Vielen Dank für Ihre Bestellung bei <b>werbebildschirme.ch</b>.
      Wir prüfen die Angaben und melden uns zeitnah mit der Auftragsbestätigung oder Rückfragen.</p>
      <p>Freundliche Grüsse<br/>InfraOne IT Solutions GmbH</p>
    `;
    await sendMailGraph(fromAddr, customer.email!, "Bestellbestätigung – werbebildschirme.ch", customerHtml);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err: any) {
    console.error("order.ts error:", err?.message || err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: err?.message || "Server Error" }) };
  }
};

export default { handler };
