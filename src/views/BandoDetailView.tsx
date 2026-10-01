import React, { useState } from 'react';
import { Bando, ViewMode } from '../types';
import {
  ChevronRight,
  Download,
  Calendar,
  Wallet,
  Building,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  Share2,
  Bookmark,
  Sparkles,
  ShieldCheck,
  Clock,
  Printer
} from 'lucide-react';

interface BandoDetailViewProps {
  bando: Bando;
  onNavigate: (view: ViewMode) => void;
  onOpenAmmissibilita: () => void;
  onSelectBando?: (bando: Bando) => void;
}

export const BandoDetailView: React.FC<BandoDetailViewProps> = ({
  bando,
  onNavigate,
  onOpenAmmissibilita
}) => {
  const [activeTab, setActiveTab] = useState<'sintesi' | 'beneficiari' | 'spese' | 'documenti' | 'procedura'>('sintesi');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCopyNotice, setShowCopyNotice] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowCopyNotice(true);
    setTimeout(() => setShowCopyNotice(false), 2500);
  };

  return (
    <div className="bg-[#F7FAFF] min-h-screen pb-16">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#D3E0FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-xs sm:text-sm text-[#5C6E82] space-x-2">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#1F299C] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#8FA3BF]" />
            <button
              onClick={() => onNavigate('bandi')}
              className="hover:text-[#1F299C] transition-colors cursor-pointer"
            >
              Ricerca Bandi &amp; Agevolazioni
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#8FA3BF]" />
            <span className="text-[#0A0045] font-semibold truncate max-w-xs sm:max-w-md">
              {bando.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1F299C]/10 text-[#1F299C]">
                  {bando.ente}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  {bando.status}
                </span>
                <span className="text-xs font-mono text-[#5C6E82] bg-slate-100 px-2 py-0.5 rounded">
                  {bando.code}
                </span>
                {bando.programma && (
                  <span className="text-xs font-medium text-[#283759] bg-[#EBF1FF] px-2 py-0.5 rounded">
                    {bando.programma}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0A0045] leading-tight">
                {bando.title}
              </h1>

              <p className="text-sm sm:text-base text-[#364349] leading-relaxed max-w-4xl">
                {bando.finalita}
              </p>
            </div>

            {/* Quick Actions Right */}
            <div className="flex flex-row lg:flex-col gap-2 shrink-0">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isBookmarked
                    ? 'border-[#1F299C] bg-[#1F299C]/5 text-[#1F299C]'
                    : 'border-[#D3E0FF] bg-white text-[#283759] hover:bg-[#F7FAFF]'
                }`}
                title="Salva nei preferiti"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#1F299C]' : ''}`} />
                <span className="text-xs hidden sm:inline">
                  {isBookmarked ? 'Salvato' : 'Salva bando'}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-lg border border-[#D3E0FF] bg-white text-[#283759] hover:bg-[#F7FAFF] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                title="Condividi"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Condividi</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-lg border border-[#D3E0FF] bg-white text-[#283759] hover:bg-[#F7FAFF] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                title="Stampa scheda"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Stampa</span>
              </button>
            </div>
          </div>

          {showCopyNotice && (
            <div className="mt-3 text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Link alla scheda bando copiato negli appunti!
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#D3E0FF]/60">
            <div className="bg-[#F7FAFF] p-3.5 rounded-lg border border-[#D3E0FF]/50">
              <div className="flex items-center gap-2 text-xs text-[#5C6E82] mb-1">
                <Wallet className="w-3.5 h-3.5 text-[#1F299C]" />
                <span>Dotazione Complessiva</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0A0045]">
                {bando.dotazione}
              </div>
            </div>

            <div className="bg-[#F7FAFF] p-3.5 rounded-lg border border-[#D3E0FF]/50">
              <div className="flex items-center gap-2 text-xs text-[#5C6E82] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#E8590C]" />
                <span>Data Scadenza</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[#0A0045]">
                {bando.termineScadenza}
              </div>
            </div>

            <div className="bg-[#F7FAFF] p-3.5 rounded-lg border border-[#D3E0FF]/50">
              <div className="flex items-center gap-2 text-xs text-[#5C6E82] mb-1">
                <Building className="w-3.5 h-3.5 text-[#1F299C]" />
                <span>Beneficiari Target</span>
              </div>
              <div className="text-sm font-semibold text-[#0A0045] truncate">
                {bando.settore || 'PMI & Grandi Imprese'}
              </div>
            </div>

            <div className="bg-[#F7FAFF] p-3.5 rounded-lg border border-[#D3E0FF]/50">
              <div className="flex items-center gap-2 text-xs text-[#5C6E82] mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Forma Agevolazione</span>
              </div>
              <div className="text-sm font-semibold text-[#0A0045] truncate">
                {bando.formaAgevolazione}
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns (Content Tabs + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Tabs Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tab Navigation Buttons */}
            <div className="flex overflow-x-auto border-b border-[#D3E0FF] bg-white rounded-t-xl px-2 pt-2 scrollbar-none">
              <button
                onClick={() => setActiveTab('sintesi')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'sintesi'
                    ? 'border-[#1F299C] text-[#1F299C]'
                    : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
                }`}
              >
                1. Sintesi &amp; Obiettivi
              </button>
              <button
                onClick={() => setActiveTab('beneficiari')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'beneficiari'
                    ? 'border-[#1F299C] text-[#1F299C]'
                    : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
                }`}
              >
                2. Beneficiari &amp; ATECO
              </button>
              <button
                onClick={() => setActiveTab('spese')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'spese'
                    ? 'border-[#1F299C] text-[#1F299C]'
                    : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
                }`}
              >
                3. Spese Ammissibili &amp; DNSH
              </button>
              <button
                onClick={() => setActiveTab('documenti')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'documenti'
                    ? 'border-[#1F299C] text-[#1F299C]'
                    : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
                }`}
              >
                4. Documenti &amp; Allegati
              </button>
              <button
                onClick={() => setActiveTab('procedura')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'procedura'
                    ? 'border-[#1F299C] text-[#1F299C]'
                    : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
                }`}
              >
                5. Iter &amp; Domanda
              </button>
            </div>

            {/* Tab 1: Sintesi & Obiettivi */}
            {activeTab === 'sintesi' && (
              <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-3">
                    Descrizione Generale della Misura
                  </h3>
                  <p className="text-sm text-[#364349] leading-relaxed">
                    {bando.descrizione}
                  </p>
                </div>

                <div className="bg-[#F7FAFF] rounded-lg border border-[#D3E0FF] p-5">
                  <h4 className="text-sm font-bold text-[#0A0045] mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E8590C]" />
                    Premialità Istruttorie e Maggiorazioni
                  </h4>
                  <ul className="space-y-2 text-sm text-[#364349]">
                    {bando.premialita && bando.premialita.length > 0 ? (
                      bando.premialita.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>+10% a fondo perduto per progetti realizzati in aree ZES Unica Mezzogiorno.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Certificazione di parità di genere (UNI/PdR 125:2022): priorità nella graduatoria.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Possesso di rating di legalità con punteggio pari o superiore a due stellette.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-3">
                    Regime di Aiuto &amp; Intensità Massima
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-[#D3E0FF] rounded-lg p-4">
                      <div className="text-xs text-[#5C6E82] uppercase tracking-wider mb-1 font-semibold">Regime Normativo</div>
                      <div className="text-sm font-bold text-[#0A0045]">{bando.regimeAiuto || 'GBER / De Minimis'}</div>
                      <div className="text-xs text-[#5C6E82] mt-1">Regolamento (UE) 2023/2831 della Commissione Europea</div>
                    </div>
                    <div className="border border-[#D3E0FF] rounded-lg p-4">
                      <div className="text-xs text-[#5C6E82] uppercase tracking-wider mb-1 font-semibold">Intensità di Contributo</div>
                      <div className="text-sm font-bold text-[#0A0045]">Fino al 65% delle spese ammissibili</div>
                      <div className="text-xs text-[#5C6E82] mt-1">Combinabile con perizia Transizione 5.0</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Beneficiari & Requisiti ATECO */}
            {activeTab === 'beneficiari' && (
              <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-3">
                    Requisiti Soggettivi di Ammissibilità
                  </h3>
                  <p className="text-sm text-[#364349] leading-relaxed mb-4">
                    {bando.soggetti}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#0A0045] mb-3">
                    Codici ATECO 2007 (Aggiornamento 2022) Ammessi
                  </h4>
                  <div className="space-y-2">
                    {bando.codiciAteco && bando.codiciAteco.length > 0 ? (
                      bando.codiciAteco.map((ateco, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF]/60 text-xs sm:text-sm font-medium text-[#283759]">
                          <span className="w-2 h-2 rounded-full bg-[#1F299C]"></span>
                          <span>{ateco}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="p-3 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF]/60 text-xs sm:text-sm font-medium text-[#283759]">
                          Sezione C: Tutte le attività manifatturiere (Ateco 10.00 - 33.20)
                        </div>
                        <div className="p-3 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF]/60 text-xs sm:text-sm font-medium text-[#283759]">
                          Sezione J: Servizi di informazione e comunicazione (Ateco 62.01, 62.02, 63.11)
                        </div>
                        <div className="p-3 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF]/60 text-xs sm:text-sm font-medium text-[#283759]">
                          Sezione M: Attività professionali, scientifiche e tecniche (Ateco 71.12, 72.19)
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-amber-900">Cause di Esclusione</h5>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        Sono escluse imprese in stato di liquidazione giudiziale, concordato preventivo o che abbiano procedimenti pendenti per sanzioni interdittive ex D.Lgs. 231/2001. Il DURC deve essere regolarmente valido alla data di trasmissione della domanda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Spese Ammissibili & DNSH */}
            {activeTab === 'spese' && (
              <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-3">
                    Tipologia di Spese Agevolabili
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF]">
                      <div className="font-bold text-sm text-[#0A0045] mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Beni Strumentali Materiali 4.0
                      </div>
                      <p className="text-xs text-[#364349] leading-relaxed">
                        Macchinari, impianti, linee produttive robotizzate, sensori industriali interconnessi a sistemi di fabbrica (Allegato A, L. 232/2016).
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF]">
                      <div className="font-bold text-sm text-[#0A0045] mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Beni Immateriali Software &amp; Cloud
                      </div>
                      <p className="text-xs text-[#364349] leading-relaxed">
                        Software MES, SCADA, ERP di fabbrica, algoritmi di intelligenza artificiale per manutenzione predittiva e cyber-security industriale.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF]">
                      <div className="font-bold text-sm text-[#0A0045] mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Consulenze &amp; Perizie Asseverate
                      </div>
                      <p className="text-xs text-[#364349] leading-relaxed">
                        Spese per il rilascio di perizie giurate e certificazioni di conformità ex-ante/ex-post emesse da ingegneri o periti industriali iscritti all’albo.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF]">
                      <div className="font-bold text-sm text-[#0A0045] mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Formazione Competenze 5.0
                      </div>
                      <p className="text-xs text-[#364349] leading-relaxed">
                        Percorsi formativi qualificati per dipendenti e titolari sui protocolli di transizione ecologica ed efficientamento energetico (fino al 10% del totale).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="text-sm font-bold text-emerald-900 mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Principio DNSH (Do No Significant Harm)
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Tutti gli investimenti devono rispettare rigorosamente il principio di non arrecare danno significativo all&apos;ambiente, garantendo assenza di impiego di combustibili fossili diretti e conformità alle linee guida della Ragioneria Generale dello Stato (Circolare n. 33/2022).
                  </p>
                </div>
              </div>
            )}

            {/* Tab 4: Documenti & Allegati */}
            {activeTab === 'documenti' && (
              <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-lg font-bold text-[#0A0045]">
                    Documentazione Ufficiale Scaricabile
                  </h3>
                  <span className="text-xs text-[#5C6E82]">Verificato ISP Desk Legale</span>
                </div>

                {(bando.allegati || [
                  { name: 'Decreto_Direttoriale_Disposizioni_Operative.pdf', size: '2.4 MB' },
                  { name: 'Allegato_1_Format_Piano_Industriale_4.0.pdf', size: '890 KB' },
                  { name: 'Allegato_2_Tabella_Oneri_Ammissibili_DNSH.pdf', size: '1.1 MB' },
                  { name: 'Modello_Dichiarazione_De_Minimis.docx', size: '420 KB' }
                ]).map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-[#D3E0FF] hover:border-[#1F299C] transition-colors bg-[#F7FAFF]"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#1F299C] shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-[#0A0045] truncate max-w-xs sm:max-w-md">
                          {doc.name}
                        </div>
                        <div className="text-xs text-[#5C6E82]">Formato PDF/Documento • {doc.size}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Download avviato: ${doc.name}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D3E0FF] bg-white hover:bg-[#1F299C] hover:text-white text-[#283759] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Scarica</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 5: Iter & Domanda */}
            {activeTab === 'procedura' && (
              <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 sm:p-8 space-y-6">
                <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-2">
                  Fasi dell&apos;Iter Istruttorio e Presentazione
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#1F299C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        1
                      </div>
                      <div className="w-0.5 h-full bg-[#D3E0FF] my-1"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0045]">Audit di Pre-Fattibilità &amp; Perizia Ex-Ante</h4>
                      <p className="text-xs text-[#364349] mt-1 leading-relaxed">
                        Verifica dei codici Ateco aziendali, analisi dei bilanci dell’ultimo biennio e redazione del calcolo energetico preliminare di riduzione consumi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#1F299C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        2
                      </div>
                      <div className="w-0.5 h-full bg-[#D3E0FF] my-1"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0045]">Compilazione e Invio Telematico</h4>
                      <p className="text-xs text-[#364349] mt-1 leading-relaxed">
                        Accesso alla piattaforma dell&apos;ente erogatore tramite SPID/CIE di livello 2 del legale rappresentante con firma digitale CAD.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#1F299C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        3
                      </div>
                      <div className="w-0.5 h-full bg-[#D3E0FF] my-1"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0045]">Valutazione Istruttoria &amp; Concessione Decreto</h4>
                      <p className="text-xs text-[#364349] mt-1 leading-relaxed">
                        Esame di conformità da parte della commissione ministeriale entro 60 giorni solari dalla data di chiusura dello sportello o protocollazione.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        4
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0045]">Rendicontazione Spese (SAL) ed Erogazione</h4>
                      <p className="text-xs text-[#364349] mt-1 leading-relaxed">
                        Emissione bonifici parlanti con codice CUP/COR, perizia asseverata finale ex-post e accredito del contributo sul conto corrente dedicato.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar: Call to actions & Service Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box 1: Assistenza Dedicata ISP */}
            <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F299C] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#1F299C]" />
                <span>DESK ASSISTENZA DEDICATO</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0A0045] mb-2">
                Vuoi presentare domanda per questo bando?
              </h3>
              <p className="text-xs text-[#5C6E82] leading-relaxed mb-6">
                I nostri consulenti e ingegneri asseveratori certificati verificano la documentazione e gestiscono la pratica sino all&apos;erogazione del saldo.
              </p>

              <div className="space-y-3">
                <button
                  onClick={onOpenAmmissibilita}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#E8590C] hover:bg-[#CF4D07] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Verifica Ammissibilità Rapida</span>
                </button>

                <button
                  onClick={() => onNavigate('customer-progetti')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[#1F299C] bg-white hover:bg-[#F7FAFF] text-[#1F299C] font-semibold text-sm transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Crea Fascicolo Pratica</span>
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-[#D3E0FF]/60 flex items-center justify-between text-xs text-[#5C6E82]">
                <span>Tasso di successo ISP:</span>
                <span className="font-bold text-emerald-700">98.4% ammesse</span>
              </div>
            </div>

            {/* Box 2: Timeline Scadenze */}
            <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs">
              <h4 className="text-sm font-bold text-[#0A0045] mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1F299C]" />
                Promemoria Scadenze
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#D3E0FF]/50">
                  <span className="text-[#5C6E82]">Apertura Sportello:</span>
                  <span className="font-semibold text-[#0A0045]">{bando.dataApertura}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#D3E0FF]/50">
                  <span className="text-[#5C6E82]">Chiusura Domande:</span>
                  <span className="font-bold text-[#E8590C]">{bando.termineScadenza}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#5C6E82]">Modalità Sportello:</span>
                  <span className="font-semibold text-[#0A0045]">A graduatoria e valutazione</span>
                </div>
              </div>
            </div>

            {/* Box 3: Certificazioni & Asseverazioni */}
            <div className="bg-gradient-to-br from-[#0A0045] to-[#1F299C] rounded-xl p-6 text-white shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SERVIZIO CHIAVI IN MANO</span>
              </div>
              <h4 className="font-heading font-bold text-base mb-2">
                Perizia Asseverata Industria 5.0
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Richiedi il rilascio della certificazione con firma digitale perito accreditato per fruire subito del credito e contributo a fondo perduto.
              </p>
              <button
                onClick={() => onNavigate('piani')}
                className="w-full py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                Scopri Piani &amp; Tariffe Perizie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
