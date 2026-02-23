import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download } from "lucide-react";

export const metadata = {
    title: "Whitepaper: Digital Signage für KMU | InfraOne",
    description: "Laden Sie unser kostenloses Whitepaper herunter und erfahren Sie, wie Digital Signage Ihr Unternehmen voranbringt.",
};

export default function WhitepaperPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="p-8 md:p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                                <FileText size={32} />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                                Whitepaper: Digital Signage für KMU
                            </h1>

                            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Erfahren Sie in unserem kompakten Leitfaden, wie Sie mit modernen Werbebildschirmen Ihre Kundenkommunikation revolutionieren.
                                Von der Hardware-Auswahl bis zur Content-Strategie – alles, was Sie wissen müssen.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="/pdf/whitepaper-infraone-digitalsignage.pdf"
                                    download
                                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                                >
                                    <Download size={20} />
                                    Jetzt kostenlos herunterladen
                                </a>

                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-8 rounded-xl transition-colors"
                                >
                                    Zurück zur Startseite
                                </Link>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-8 border-t border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Inhalt des Whitepapers</h3>
                            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-sm text-slate-600">
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        Vorteile von Digital Signage gegenüber Print
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        Hardware-Guide: Indoor vs. Outdoor
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        Software & CMS: Cloud vs. Lokal
                                    </li>
                                </ul>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        Content-Strategien für mehr Aufmerksamkeit
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        Kosten & ROI Berechnung
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        Checkliste für die Einführung
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
