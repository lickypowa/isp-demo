import React, { useState } from 'react';
import { Bando, ViewMode } from '../types';
import {
  Cpu,
  ChevronRight,
  Search,
  Sparkles,
  ArrowRight,
  Eye,
  Calendar,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Filter
} from 'lucide-react';

interface CategoriaInnovazioneViewProps {
  bandi: Bando[];
  onOpenPreview: (bando: Bando) => void;
  onOpenDetail: (bando: Bando) => void;
  onOpenAmmissibilita: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const CategoriaInnovazioneView: React.FC<CategoriaInnovazioneViewProps> = ({
  bandi,
  onOpenPreview,
  onOpenDetail,
  onOpenAmmissibilita,
  onNavigate
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('tutti');
  const [onlyActive, setOnlyActive] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  // Category bandi:
  const categoryBandi = bandi.filter((b) => {
    const textMatch =
      b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.descrizione.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.settore.toLowerCase().includes(searchFilter.toLowerCase());

    const activeMatch = !onlyActive || b.status === 'Aperto' || b.status === 'In apertura';
    return textMatch && activeMatch;
  });

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
              Categorie Bandi
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#8FA3BF]" />
            <span className="text-[#0A0045] font-semibold">
              Innovazione Digitale &amp; Transizione 5.0
            </span>
          </div>
        </div>
      </div>

      {/* Hero Category Banner */}
      <div className="bg-gradient-to-r from-[#0A0045] via-[#1F299C] to-[#0A0045] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300">
                <Cpu className="w-3.5 h-3.5" />
                <span>SETTORE STRATEGICO NAZIONALE PNRR</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                Innovazione Digitale &amp; Transizione 5.0
              </h1>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                Tutte le misure, contributi a fondo perduto, crediti d&apos;imposta e finanziamenti agevolati per l&apos;adozione di tecnologie abilitanti 4.0, intelligenza artificiale, robotica avanzata, transizione ecologica ed efficientamento energetico delle imprese italiane.
              </p>
            </div>

            <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-center">
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                Fondi Totali Attivi
              </div>
              <div className="text-3xl font-extrabold text-amber-300 font-heading">
                € 480.000.000
              </div>
              <div className="text-xs text-white/80 mt-1">
                aggiornato al 2025
              </div>
              <button
                onClick={onOpenAmmissibilita}
                className="mt-4 w-full py-2.5 px-4 rounded-lg bg-[#E8590C] hover:bg-[#CF4D07] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Verifica Ammissibilità Rapida
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Sub-categories selector */}
        <div className="bg-white rounded-xl border border-[#D3E0FF] p-4 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
              <span className="text-xs font-bold text-[#5C6E82] uppercase mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Sottosettori:
              </span>
              {[
                { id: 'tutti', label: 'Tutti' },
                { id: 'software', label: 'Software & AI' },
                { id: 'robotica', label: 'Robotica & Macchinari 4.0' },
                { id: 'energia', label: 'Transizione Ecologica 5.0' },
                { id: 'cloud', label: 'Cloud & Cyber Security' },
                { id: 'ricerca', label: 'R&S Sperimentale' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedSubcategory === sub.id
                      ? 'bg-[#1F299C] text-white'
                      : 'bg-[#F7FAFF] text-[#283759] hover:bg-[#D3E0FF]/40 border border-[#D3E0FF]/60'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Quick Search inside category */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-[#8FA3BF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtra tra le misure..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-[#283759] shrink-0 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyActive}
                  onChange={(e) => setOnlyActive(e.target.checked)}
                  className="rounded text-[#1F299C] focus:ring-[#1F299C]"
                />
                <span>Solo bandi aperti</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#5C6E82]">
            <span>
              Trovati <strong className="text-[#0A0045] font-bold">{categoryBandi.length}</strong> bandi attivi in questa categoria
            </span>
            <button
              onClick={() => onNavigate('bandi')}
              className="text-[#1F299C] hover:underline font-semibold"
            >
              Vedi catalogo completo bandi &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBandi.map((bando) => (
              <div
                key={bando.id}
                className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs hover:border-[#1F299C] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1F299C] bg-[#1F299C]/10 px-2.5 py-0.5 rounded-full">
                      {bando.ente}
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {bando.status}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0A0045] line-clamp-2">
                    {bando.title}
                  </h3>

                  <p className="text-xs text-[#364349] line-clamp-3 leading-relaxed">
                    {bando.finalita}
                  </p>

                  <div className="pt-3 border-t border-[#D3E0FF]/60 space-y-2 text-xs text-[#5C6E82]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-[#1F299C]" /> Dotazione:
                      </span>
                      <strong className="text-[#0A0045]">{bando.dotazione}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E8590C]" /> Scadenza:
                      </span>
                      <strong className="text-[#0A0045]">{bando.termineScadenza}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Forma:
                      </span>
                      <span className="text-[#0A0045] truncate max-w-[150px]">{bando.formaAgevolazione}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#D3E0FF]/60 flex items-center gap-2">
                  <button
                    onClick={() => onOpenPreview(bando)}
                    className="flex-1 py-2 px-3 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] hover:bg-white text-[#283759] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#1F299C]" />
                    <span>Anteprima</span>
                  </button>

                  <button
                    onClick={() => onOpenDetail(bando)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Scheda Completa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informative Banner at Bottom */}
        <div className="mt-12 bg-white rounded-xl border border-[#D3E0FF] p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#1F299C]/10 text-[#1F299C] shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0A0045]">
                  Certificazione Transizione 5.0
                </h4>
                <p className="text-xs text-[#5C6E82] mt-1 leading-relaxed">
                  Perizie asseverate ex-ante ed ex-post redatte da ingegneri iscritti all&apos;albo certificatori del GSE.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#E8590C]/10 text-[#E8590C] shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0A0045]">
                  Cumulabilità dei Contributi
                </h4>
                <p className="text-xs text-[#5C6E82] mt-1 leading-relaxed">
                  Supporto all&apos;incrocio delle agevolazioni per massimizzare l&apos;intensità di aiuto nei limiti del quadro UE.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0A0045]">
                  Presidio Istruttorio Completo
                </h4>
                <p className="text-xs text-[#5C6E82] mt-1 leading-relaxed">
                  Dalla candidatura alla rendicontazione finale con codice CUP e fatturazione elettronica parlante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
