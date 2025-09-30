export default function CTASection(){
  return (
    <section id="demo" className="py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="rounded-2xl bg-gradient-to-br from-[--infra-green]/10 to-emerald-50 p-6 shadow">
          <div className="grid items-center gap-5 sm:grid-cols-2">
            <div>
              <h2 className="m-0 text-2xl font-black">Jetzt kostenlose Demo buchen</h2>
              <p className="m-0 text-slate-700">Live: Upload → Vorlage → Display. 15 Minuten reichen.</p>
              <div className="mt-3 text-sm text-slate-700">
                <strong>Weitere Dienstleistungen von InfraOne:</strong>
                <ul className="ml-5 list-disc">
                  <li>IT-Infrastruktur & Netzwerk (On-Prem & Cloud)</li>
                  <li>Sicherheit & Monitoring</li>
                  <li>WLAN, VPN & Standortvernetzung</li>
                  <li>Server, Storage & Virtualisierung</li>
                  <li>Managed Services & Support</li>
                  <li>Telefonie & Kommunikation</li>
                  <li>Kontrollraumlösungen</li>
                  <li>IT-Betreuung & Outsourcing</li>
                  <li>Webdesign</li>
                  <li>Videoüberwachung</li>
                  <li>Gebäudeautomation & IoT</li>
                </ul>
                <p className="mt-2">Mehr dazu auf unserer <a className="underline" href="https://www.infraone.ch/" target="_blank" rel="noreferrer">Hauptseite</a>.</p>
              </div>
            </div>
            <div className="sm:text-right">
              <a
                href="#"
                onClick={(e)=>{e.preventDefault();window.dispatchEvent(new CustomEvent("open-consult"));}}
                className="btn btn-primary"
              >
                Demo buchen
              </a>
              <a href="/whitepaper/index.html" target="_blank" rel="noreferrer" className="btn btn-secondary ml-2">
                Whitepaper
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
