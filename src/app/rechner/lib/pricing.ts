import { DisplayKey } from "./types";

/** Cloud-Modelle (Hardware Kaufpreise für Cloud-Kalkulator) */
export const CLOUD_MODELS: { key: DisplayKey; label: string; priceBuy: number; }[] = [
  // Indoor
  { key: "indoor43", label: "Indoor 43″", priceBuy: 660 },
  { key: "indoor55", label: "Indoor 55″", priceBuy: 890 },
  { key: "indoor65", label: "Indoor 65″", priceBuy: 1190 },
  // Outdoor
  { key: "outdoor43", label: "Outdoor 43″", priceBuy: 1800 },
  { key: "outdoor55", label: "Outdoor 55″", priceBuy: 2400 },
  { key: "outdoor75", label: "Outdoor 75″", priceBuy: 3500 },
  // Weitere
  { key: "stretched37", label: "Stretched 37″", priceBuy: 1600 },
  { key: "videowall55", label: "Videowall 2×2/55″", priceBuy: 8900 },
  { key: "totem55", label: "Infotafel/Totem 55″", priceBuy: 2200 },
];

/** gleiche 9 Modelle zum Kauf (für lokalen Rechner) */
export const BUY_MODELS: { key: DisplayKey; label: string; priceBuy: number; }[] = [
  { key: "indoor43", label: "Indoor 43″", priceBuy: 660 },
  { key: "indoor55", label: "Indoor 55″", priceBuy: 890 },
  { key: "indoor65", label: "Indoor 65″", priceBuy: 1190 },
  { key: "outdoor43", label: "Outdoor 43″", priceBuy: 1800 },
  { key: "outdoor55", label: "Outdoor 55″", priceBuy: 2400 },
  { key: "outdoor75", label: "Outdoor 75″", priceBuy: 3500 },
  { key: "stretched37", label: "Stretched 37″", priceBuy: 1600 },
  { key: "videowall55", label: "Videowall 2×2/55″", priceBuy: 8900 },
  { key: "totem55", label: "Infotafel/Totem 55″", priceBuy: 2200 },
];

/** Preise/Regeln */
export const PRICE_SIM_MONTH = 10;
export const PRICE_CMS_MONTH = 19;   // Cloud: CMS-Abo pro Player/Monat
export const PRICE_PLAYER_CLOUD = 0;  // Cloud: Player integriert
export const PRICE_PLAYER_LOCAL = 0;  // Lokal: Player integriert
export const PRICE_SERVER_UNIT = 590;  // Lokal: Mini-Server (einmalig)
export const STARTER_FIX = 990;  // Lokal: Starter-Paket (Server + 1 Player + Setup)
export const YEARLY_DISCOUNT = 0.05; // 5% Rabatt bei jährlicher Zahlung (Cloud)
export const YEARLY_FACTOR = 1 - YEARLY_DISCOUNT;

export const chf = (n: number) => `CHF ${n.toLocaleString("de-CH")}`;

/** Platzhalter-Bilder — du ersetzt nur die Dateien im public/images */
export const MODEL_IMAGES: Record<DisplayKey, string> = {
  indoor43: "/images/previews/nsd-4303.webp",
  indoor55: "/images/previews/nsd-5503.webp",
  indoor65: "/images/previews/nsd-6503.webp",
  outdoor43: "/images/previews/po-5502.webp", // Use 55" image as fallback
  outdoor55: "/images/previews/po-5502.webp",
  outdoor75: "/images/previews/po-5502.webp", // Use 55" image as fallback
  stretched37: "/images/screen11.webp", // Keep for now
  videowall55: "/images/previews/pn-55d3.webp",
  totem55: "/images/previews/pf-55h.webp",
};

/** PDF-Datenblätter für die Displays */
export const MODEL_PDFS: Record<DisplayKey, string> = {
  indoor43: "/pdf/NSD-4303_DS_V010_20240318.pdf",
  indoor55: "/pdf/NSD-5503_DS_V010_20240318.pdf",
  indoor65: "/pdf/NSD-6503_DS_V010_20240318.pdf",
  outdoor43: "", // Kein PDF vorhanden
  outdoor55: "/pdf/PO-5502_EB_V021_20211123.pdf",
  outdoor75: "", // Kein PDF vorhanden
  stretched37: "", // Kein PDF vorhanden
  videowall55: "/pdf/PN-55D3_DS_V010_20220124.pdf",
  totem55: "/pdf/PF-55H_DS_PF5H00_V013_20150731.pdf",
};
