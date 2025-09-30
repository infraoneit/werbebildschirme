import { NextRequest } from "next/server";
import { CalculatorInput, calc } from "@/lib/schemas";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = CalculatorInput.safeParse(body);
  if (!parsed.success) return new Response(JSON.stringify(parsed.error.format()), { status: 400 });

  const data = parsed.data; const totals = calc(data);
  const s = StyleSheet.create({
    page:{ padding:32, fontSize:12 },
    h1:{ fontSize:18, marginBottom:8 },
    row:{ flexDirection:"row", justifyContent:"space-between", marginBottom:4 },
    small:{ color:"#666", marginTop:12 }
  });

  const doc = (
    <Document>
      <Page size="A4" style={s.page}>
        <Text style={s.h1}>InfraOne – Angebot Digital Signage</Text>
        <Text>Modell: {data.model === "miete" ? "Miete" : "Lokal"}</Text>
        <View style={{ marginTop: 8 }}>
          {data.displays.map((d,i)=>(
            <View key={i} style={s.row}>
              <Text>{d.type === "high" ? "High-Brightness" : "Indoor"} {d.size}" × {d.qty}</Text>
              <Text>{data.model === "miete" ? `CHF ${d.monthly}/Monat` : `CHF ${d.once} einmalig`}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 12 }}>
          <View style={s.row}><Text>Summe einmalig</Text><Text>CHF {totals.once.toFixed(2)}</Text></View>
          <View style={s.row}><Text>Summe monatlich</Text><Text>CHF {totals.monthly.toFixed(2)}</Text></View>
        </View>
        <Text style={s.small}>Unverbindliche Richtofferte. Preisstand heute.</Text>
      </Page>
    </Document>
  );

  const buf = await pdf(doc).toBuffer();
  return new Response(buf, {
    headers: {
      "Content-Type":"application/pdf",
      "Content-Disposition":"attachment; filename=Angebot-InfraOne.pdf",
      "Cache-Control": "no-store"
    }
  });
}
