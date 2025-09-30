"use client";

import { useEffect, useRef, useState } from "react";
// pdf.js
import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
} from "pdfjs-dist";

// Worker setzen (CDN wie bei dir)
GlobalWorkerOptions.workerSrc =
  typeof window !== "undefined"
    ? "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.js"
    : "";

type Props = {
  /** Pfad unter /public, z. B. "/pdf/datenblatt123.pdf" */
  src: string;
  alt: string;
  className?: string; // z.B. "h-48 w-full"
  /** Render-Skalierung, Standard 1.0 */
  scale?: number;
};

export default function PdfThumb({
  src,
  alt,
  className,
  scale = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  useEffect(() => {
    let mounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setState("loading");

    // pdf.js Laden
    const task = getDocument(src);
    task.promise
      .then(async (pdf: PDFDocumentProxy) => {
        if (!mounted) return;
        // Erste Seite
        const page = await pdf.getPage(1);
        if (!mounted) return;

        const viewport = page.getViewport({ scale });
        // Canvas Größe setzen (HiDPI)
        const ratio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const renderContext = {
          canvasContext: ctx,
          viewport: page.getViewport({ scale: scale * ratio }),
        };

        await page.render(renderContext as any).promise;
        if (mounted) setState("ok");
      })
      .catch(() => {
        if (mounted) setState("error");
      });

    return () => {
      mounted = false;
      // pdf.js selbst cleaned seine Worker/Tasks – hier kein extra Abort nötig
    };
  }, [src, scale]);

  if (state === "loading") {
    return (
      <div
        className={className}
        aria-busy="true"
        aria-label={`${alt} – lädt…`}
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "1.414 / 1", // grob A4
          background: "repeating-linear-gradient(45deg,#f5f5f5,#f5f5f5 10px,#eee 10px,#eee 20px)",
          borderRadius: 8,
        }}
      />
    );
  }

  if (state === "error") {
    return (
      <div
        className={className}
        role="img"
        aria-label={`${alt} – Vorschau nicht möglich`}
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          aspectRatio: "1.414 / 1",
          background: "#f8d7da",
          color: "#842029",
          borderRadius: 8,
          padding: 8,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        PDF-Vorschau konnte nicht geladen werden.
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
}
