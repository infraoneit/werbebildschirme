"use client";

import { useEffect, useRef, useState } from "react";

// pdfjs worker konfigurieren
import { GlobalWorkerOptions, getDocument, PDFDocumentProxy } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc =
  typeof window !== "undefined"
    ? `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.js`
    : "";

type Props = {
  src: string;          // /pdf/…pfad in public
  alt: string;
  className?: string;   // z.B. "h-48 w-full"
  scale?: number;       // optional, default 1
};

export default function PdfThumb({ src, alt, className, scale = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const loadingTask = getDocument(src);
        const pdf: PDFDocumentProxy = await loadingTask.promise;
        if (!mounted) return;

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.0 * scale });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Responsive Breite: wir passen die Breite der Card an
        // Canvasgröße auf Containerbreite skalieren
        const ratio = viewport.width / viewport.height;
        const width = canvas.parentElement?.clientWidth ?? viewport.width;
        const height = width / ratio;

        canvas.width = Math.floor(width);
        canvas.height = Math.floor(height);

        const renderViewport = page.getViewport({
          scale: (width / viewport.width) * scale,
        });

        await page.render({
          canvasContext: context,
          viewport: renderViewport,
        }).promise;
      } catch (e) {
        setError("Preview not available");
      }
    })();
    return () => { mounted = false; };
  }, [src, scale]);

  if (error) {
    return (
      <div className={`grid place-items-center bg-slate-100 text-slate-500 ${className ?? ""}`}>
        {alt}
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
