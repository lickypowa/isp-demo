import React from 'react';
import { ViewMode } from '../types';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  Landmark,
  Briefcase,
  FlaskConical,
  Cpu,
  Leaf,
  Rocket,
  Wrench,
  Compass,
  Globe2,
  MapPin,
  Users,
  CheckCircle2
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAmmissibilita: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenAmmissibilita }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 border-b border-[#D3E0FF] bg-gradient-to-b from-[#F7FAFF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F299C] uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#1F299C]"></span>
                <span>OSSERVATORIO NAZIONALE &amp; FINANZA AGEVOLATA</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0045] tracking-tight leading-[1.15] mb-6">
                Consulenza su finanza agevolata e ricerca bandi per la crescita della tua impresa
              </h1>

              <p className="text-base sm:text-lg text-[#364349] leading-relaxed max-w-2xl mb-8">
                Soluzioni operative, conformità e rendicontazione su misura per Imprese &amp; Startup, Enti Pubblici e Studi Professionali. Presidio operativo integrato dalle sedi direzionali di Milano e Brindisi.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('bandi')}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Ricerca bandi</span>
                </button>
                <button
                  onClick={() => onNavigate('chi-siamo')}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#D3E0FF] bg-white hover:bg-[#F7FAFF] text-[#283759] font-medium text-sm transition-colors cursor-pointer"
                >
                  <span>Contatti</span>
                  <ArrowRight className="w-4 h-4 text-[#767684]" />
                </button>
              </div>
            </div>

            {/* Right Column / Live Monitor Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-[#D3E0FF] p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#D3E0FF] pb-4 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A0045]">
                    QUADRO MONITORAGGIO
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live 2025
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3.5 bg-[#F7FAFF] rounded-xl border border-[#D3E0FF]">
                    <div className="text-[11px] text-[#767684] font-semibold uppercase">
                      Bandi Attivi
                    </div>
                    <div className="text-2xl font-extrabold text-[#0A0045] tabular-nums mt-1">
                      924
                    </div>
                    <div className="text-[10px] text-[#364349] mt-0.5">
                      UE, PNRR, Regioni
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#F7FAFF] rounded-xl border border-[#D3E0FF]">
                    <div className="text-[11px] text-[#767684] font-semibold uppercase">
                      Plafond Aperto
                    </div>
                    <div className="text-2xl font-extrabold text-[#1F299C] tabular-nums mt-1">
                      €3.4Mld
                    </div>
                    <div className="text-[10px] text-[#364349] mt-0.5">
                      MIMIT &amp; SIMEST
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenAmmissibilita}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-blue-50/70 border border-[#D3E0FF] hover:bg-blue-50 transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#1F299C]" />
                    <span className="text-xs font-bold text-[#1F299C]">
                      Audit di ammissibilità rapido
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#1F299C] group-hover:translate-x-1 transition-transform">
                    Accedi →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aree di intervento dedicate */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#D3E0FF]">
        <div className="mb-8">
          <div className="text-xs font-bold text-[#1F299C] uppercase tracking-wider mb-1">
            AREE DI INTERVENTO DEDICATE
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#0A0045]">
            Competenze mirate per ciascuna realtà
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-[#D3E0FF] bg-white hover:border-[#719CFF] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF] flex items-center justify-center text-[#1F299C] mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-2">
                Imprese &amp; Startup
              </h3>
              <p className="text-xs text-[#364349] leading-relaxed mb-6">
                Accesso mirato a contributi a fondo perduto, crediti d&apos;imposta per R&amp;S e piani di finanziamento agevolato conformi agli investimenti strategici 4.0/5.0.
              </p>
            </div>
            <button
              onClick={() => onNavigate('bandi')}
              className="text-xs font-semibold text-[#1F299C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Soluzioni per imprese →
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-[#D3E0FF] bg-white hover:border-[#719CFF] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF] flex items-center justify-center text-[#1F299C] mb-4">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-2">
                Enti Pubblici
              </h3>
              <p className="text-xs text-[#364349] leading-relaxed mb-6">
                Supporto strategico, assistenza tecnica e conformità procedurale per bandi territoriali, assi di coesione europea e gestione dossier PNRR.
              </p>
            </div>
            <button
              onClick={() => onNavigate('piani')}
              className="text-xs font-semibold text-[#1F299C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Programmi per la PA →
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-[#D3E0FF] bg-white hover:border-[#719CFF] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF] flex items-center justify-center text-[#1F299C] mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-2">
                Partner &amp; Commercialisti
              </h3>
              <p className="text-xs text-[#364349] leading-relaxed mb-6">
                Opportunità in co-working, canali riservati di finanza integrata e strumenti digitali avanzati a supporto della clientela di studio.
              </p>
            </div>
            <button
              onClick={() => onNavigate('chi-siamo')}
              className="text-xs font-semibold text-[#1F299C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Network professionale →
            </button>
          </div>
        </div>
      </section>

      {/* Categorie di finanziamento attive */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#D3E0FF]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#1F299C] uppercase tracking-wider mb-1">
              CLASSIFICAZIONE UFFICIALE
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#0A0045]">
              Categorie di finanziamento attive
            </h2>
          </div>
          <button
            onClick={() => onNavigate('bandi')}
            className="text-xs font-semibold text-[#1F299C] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Consulta l&apos;intero registro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'Innovazione & Ricerca', count: '182 bandi', icon: FlaskConical, view: 'categoria-innovazione' as ViewMode },
            { name: 'Digitale & AI', count: '147 bandi', icon: Cpu, view: 'bandi' as ViewMode },
            { name: 'Green & Transizione', count: '210 bandi', icon: Leaf, view: 'bandi' as ViewMode },
            { name: 'Startup & Nuove Imprese', count: '96 bandi', icon: Rocket, view: 'bandi' as ViewMode },
            { name: 'Beni Strumentali', count: '124 bandi', icon: Wrench, view: 'bandi' as ViewMode },
            { name: 'Mezzogiorno & ZES', count: '85 bandi', icon: Compass, view: 'bandi' as ViewMode },
            { name: 'Export & SIMEST', count: '80 bandi', icon: Globe2, view: 'bandi' as ViewMode },
          ].map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(cat.view)}
                className="p-4 rounded-xl border border-[#D3E0FF] bg-white hover:bg-[#F7FAFF] hover:border-[#719CFF] transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F7FAFF] flex items-center justify-center text-[#1F299C] mb-3 group-hover:scale-110 transition-transform">
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-[#0A0045] group-hover:text-[#1F299C] transition-colors">
                  {cat.name}
                </div>
                <div className="text-[11px] text-[#767684] mt-0.5">
                  {cat.count}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#D3E0FF]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F7FAFF] border border-[#D3E0FF] flex items-center justify-center text-[#1F299C] flex-shrink-0">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-[#0A0045]">Oltre 900</div>
              <div className="text-xs font-semibold text-[#1F299C] uppercase tracking-wider mb-1">
                BANDI MONITORATI ATTIVI
              </div>
              <p className="text-xs text-[#364349] leading-relaxed">
                Aggiornamento quotidiano dei repertori camerali, regionali e comunitari.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F7FAFF] border border-[#D3E0FF] flex items-center justify-center text-[#1F299C] flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-[#0A0045]">Milano e Brindisi</div>
              <div className="text-xs font-semibold text-[#1F299C] uppercase tracking-wider mb-1">
                SEDI OPERATIVE STABILI
              </div>
              <p className="text-xs text-[#364349] leading-relaxed">
                Due poli territoriali a supporto dell&apos;ecosistema produttivo da Nord a Sud.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F7FAFF] border border-[#D3E0FF] flex items-center justify-center text-[#1F299C] flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-[#0A0045]">Team qualificato</div>
              <div className="text-xs font-semibold text-[#1F299C] uppercase tracking-wider mb-1">
                CONSULENTI DI FINANZA AGEVOLATA
              </div>
              <p className="text-xs text-[#364349] leading-relaxed">
                Valutazione di fattibilità, redazione tecnica e rendicontazione certificata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Navy CTA Banner */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0A0045] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold text-[#A5C2FF] uppercase tracking-widest mb-2">
              VERIFICA PREVENTIVA
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2">
              Richiedi una mappatura preliminare dei bandi applicabili alla tua organizzazione
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Un consulente specializzato analizzerà requisiti dimensionali, codice ATECO e programmi di investimento.
            </p>
          </div>
          <button
            onClick={() => onNavigate('chi-siamo')}
            className="flex-shrink-0 px-6 py-3 rounded-lg bg-[#E8590C] hover:bg-[#CF4D07] text-white font-semibold text-sm shadow-lg transition-colors cursor-pointer"
          >
            Richiedi consulenza
          </button>
        </div>
      </section>
    </div>
  );
};
