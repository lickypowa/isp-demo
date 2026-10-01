import React, { useState } from 'react';
import { Bando, ViewMode } from '../types';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Eye,
  CheckCircle2,
  Calendar,
  Wallet,
  Building,
  ChevronDown,
  X,
  ExternalLink,
  Bell,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface BandiViewProps {
  bandi: Bando[];
  onOpenPreview: (bando: Bando) => void;
  onOpenDetail: (bando: Bando) => void;
  onOpenAmmissibilita: () => void;
  isCategoryInnovationOnly?: boolean;
  onNavigate: (view: ViewMode) => void;
}

export const BandiView: React.FC<BandiViewProps> = ({
  bandi,
  onOpenPreview,
  onOpenDetail,
  onOpenAmmissibilita,
  isCategoryInnovationOnly = false,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState(isCategoryInnovationOnly ? 'Ricerca industriale e sperimentale' : '');
  const [showFilters, setShowFilters] = useState(true);
  const [tipologiaSoggetto, setTipologiaSoggetto] = useState('PMI');
  const [formaAgevolazione, setFormaAgevolazione] = useState('Tutte');
  const [statoFiltro, setStatoFiltro] = useState<'Tutti' | 'Aperto' | 'In apertura' | 'Scaduto'>('Aperto');
  const [ordinamento, setOrdinamento] = useState('Data scadenza più vicina');

  // Filtered bandi logic
  const filteredBandi = bandi.filter((b) => {
    if (isCategoryInnovationOnly) {
      if (!b.title.toLowerCase().includes('innovazione') &&
          !b.title.toLowerCase().includes('ricerca') &&
          !b.title.toLowerCase().includes('digitale') &&
          !b.title.toLowerCase().includes('start')) {
        return false;
      }
    }
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const match =
        b.title.toLowerCase().includes(q) ||
        b.ente.toLowerCase().includes(q) ||
        b.programma.toLowerCase().includes(q) ||
        b.finalita.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statoFiltro !== 'Tutti' && b.status !== statoFiltro) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="border-b border-[#D3E0FF] bg-[#F7FAFF]/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#364349]">
            <button onClick={() => onNavigate('home')} className="hover:text-[#1F299C]">
              Home
            </button>
            <span>/</span>
            {isCategoryInnovationOnly ? (
              <>
                <button onClick={() => onNavigate('bandi')} className="hover:text-[#1F299C]">
                  Categorie
                </button>
                <span>/</span>
                <span className="font-semibold text-[#0A0045]">Innovazione &amp; Ricerca</span>
              </>
            ) : (
              <span className="font-semibold text-[#0A0045]">Ricerca Bandi &amp; Agevolazioni</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[#364349]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Database aggiornato oggi, ore 08:30</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* If category view (Image 9) */}
        {isCategoryInnovationOnly && (
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F299C] mb-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1F299C] border border-[#D3E0FF]">
                AREA TEMATICA UFFICIALE
              </span>
              <span>• Database aggiornato ad oggi</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl font-extrabold text-[#0A0045] mb-2">
                  Innovazione &amp; Ricerca
                </h1>
                <p className="text-xs text-[#364349] max-w-2xl leading-relaxed">
                  Rassegna aggiornata di contributi a fondo perduto, crediti d&apos;imposta per R&amp;S e finanziamenti agevolati dedicati a progetti di ricerca industriale, sviluppo sperimentale e innovazione tecnologica su scala nazionale e regionale.
                </p>
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#F7FAFF] border border-[#D3E0FF] text-[#283759]">
                    🔬 Progetti di ricerca industriale
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F7FAFF] border border-[#D3E0FF] text-[#283759]">
                    ⚙️ Sviluppo sperimentale (TRL 4-8)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F7FAFF] border border-[#D3E0FF] text-[#283759]">
                    ⚡ Transizione Tecnologica 5.0
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#D3E0FF] bg-[#F7FAFF] min-w-[220px]">
                <div className="text-[11px] font-semibold text-[#767684] uppercase">
                  DOTAZIONE MONITORATA
                </div>
                <div className="text-2xl font-black text-[#0A0045] tabular-nums mt-0.5">
                  182 <span className="text-xs font-normal text-[#364349]">bandi attivi</span>
                </div>
                <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                  <span>⚡ +14 nuovi avvisi questo mese</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar Container */}
        <div className="bg-[#F7FAFF] p-4 rounded-xl border border-[#D3E0FF] mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#767684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Usa parole chiave per una ricerca più chiara e immediata (es. Transizione 5.0, SIMEST, MIMIT...)"
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg border border-[#D3E0FF] bg-white focus:outline-none focus:border-[#719CFF] focus:ring-2 focus:ring-[#719CFF]/20"
              />
            </div>
            <button
              onClick={() => {}}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#0A0045] text-white text-xs font-semibold hover:bg-[#161E75] transition-colors cursor-pointer"
            >
              Cerca
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#D3E0FF] bg-white text-xs font-semibold text-[#283759] hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1F299C]" />
              <span>{showFilters ? 'Nascondi filtri' : 'Mostra filtri'} (10)</span>
            </button>
          </div>

          {/* Filter Rack */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-[#D3E0FF] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#364349]">
                <span className="font-semibold uppercase text-[11px] tracking-wider text-[#1F299C]">
                  Parametri di Raffinamento Dossier
                </span>
                <button
                  onClick={() => {
                    setTipologiaSoggetto('PMI');
                    setStatoFiltro('Aperto');
                    setSearchTerm('');
                  }}
                  className="flex items-center gap-1 text-[#E8590C] hover:underline cursor-pointer text-xs"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ripristina tutti i filtri</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#767684] uppercase mb-1">
                    TIPOLOGIA SOGGETTO
                  </label>
                  <select
                    value={tipologiaSoggetto}
                    onChange={(e) => setTipologiaSoggetto(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E0FF] bg-white text-xs text-[#283759]"
                  >
                    <option value="PMI">PMI</option>
                    <option value="Grandi Imprese">PMI e Grandi Imprese</option>
                    <option value="Startup">Startup innovative</option>
                    <option value="Enti Pubblici">Enti Pubblici e PA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#767684] uppercase mb-1">
                    FORMA AGEVOLAZIONE
                  </label>
                  <select
                    value={formaAgevolazione}
                    onChange={(e) => setFormaAgevolazione(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E0FF] bg-white text-xs text-[#283759]"
                  >
                    <option value="Tutte">Tutte le agevolazioni</option>
                    <option value="Fondo Perduto">Fondo Perduto + Tasso Agevolato</option>
                    <option value="Credito Imposta">Credito d&apos;Imposta</option>
                    <option value="Voucher">Voucher a copertura diretta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#767684] uppercase mb-1">
                    SETTORE ATTIVITÀ
                  </label>
                  <select className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E0FF] bg-white text-xs text-[#283759]">
                    <option>Tutti i settori</option>
                    <option>Manifattura 4.0</option>
                    <option>ICT, Software e AI</option>
                    <option>Transizione Energetica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#767684] uppercase mb-1">
                    STATO APERTO/CHIUSO
                  </label>
                  <select
                    value={statoFiltro}
                    onChange={(e) => setStatoFiltro(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E0FF] bg-white text-xs text-[#283759]"
                  >
                    <option value="Tutti">Tutti gli stati</option>
                    <option value="Aperto">Aperto</option>
                    <option value="In apertura">In apertura</option>
                    <option value="Scaduto">Scaduto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#767684] uppercase mb-1">
                    ORDINAMENTO
                  </label>
                  <select
                    value={ordinamento}
                    onChange={(e) => setOrdinamento(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D3E0FF] bg-white text-xs text-[#283759]"
                  >
                    <option>Data scadenza più vicina</option>
                    <option>Dotazione finanziaria decrescente</option>
                    <option>Data pubblicazione recente</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[11px] text-[#767684] font-medium">Filtri attivi:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-[#1F299C] text-xs font-medium border border-[#D3E0FF]">
                  Soggetto: {tipologiaSoggetto}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setTipologiaSoggetto('PMI')} />
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-[#1F299C] text-xs font-medium border border-[#D3E0FF]">
                  Stato: {statoFiltro}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setStatoFiltro('Tutti')} />
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-[#1F299C] text-xs font-medium border border-[#D3E0FF]">
                  Ordinamento: {ordinamento}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results Count & Ordering */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <div>
            <span className="font-heading text-base font-bold text-[#0A0045]">
              {isCategoryInnovationOnly ? 'Innovazione & Ricerca' : 'Catalogo Bandi'}
            </span>{' '}
            <span className="text-[#767684] ml-2 px-2 py-0.5 rounded-full bg-[#F7FAFF] border border-[#D3E0FF]">
              {filteredBandi.length} bandi trovati nel catalogo
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#364349]">
            <span>Ordina per:</span>
            <span className="font-semibold text-[#1F299C]">{ordinamento}</span>
          </div>
        </div>

        {/* Bandi Cards List */}
        <div className="space-y-4">
          {filteredBandi.map((bando) => (
            <div
              key={bando.id}
              className="bg-white rounded-xl border border-[#D3E0FF] p-6 hover:border-[#719CFF] transition-all shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Content (8 cols) */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        bando.status === 'Aperto'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : bando.status === 'In apertura'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          bando.status === 'Aperto'
                            ? 'bg-emerald-500'
                            : bando.status === 'In apertura'
                            ? 'bg-amber-500'
                            : 'bg-gray-400'
                        }`}
                      ></span>
                      {bando.status}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[11px] bg-[#F7FAFF] text-[#364349] border border-[#D3E0FF]">
                      {bando.enteType}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[11px] text-[#767684]">
                      {bando.code}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenDetail(bando)}
                    className="font-heading text-lg font-bold text-[#0A0045] hover:text-[#1F299C] cursor-pointer transition-colors"
                  >
                    {bando.title}
                  </h3>

                  <div className="text-xs text-[#364349]">
                    <span className="font-semibold text-[#283759]">{bando.ente}</span>
                  </div>

                  <p className="text-xs text-[#364349] leading-relaxed line-clamp-2">
                    <strong className="text-[#283759]">Finalità: </strong>
                    {bando.finalita}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#767684]">
                    <span>Forma: {bando.formaAgevolazione}</span>
                    <span>•</span>
                    <span>Costi ammessi: {bando.settore}</span>
                    {bando.id === 'isp-2025-mimit-01' && (
                      <span className="text-[#1F299C] font-semibold">
                        • Agevolazione Cumulabile con Credito Industria 5.0
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action & Dotazione Box (4 cols) */}
                <div className="lg:col-span-4 p-4 rounded-xl bg-[#F7FAFF] border border-[#D3E0FF] flex flex-col justify-between h-full">
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold text-[#767684] uppercase">
                      DOTAZIONE FINANZIARIA
                    </div>
                    <div className="text-xl font-extrabold text-[#0A0045] tabular-nums mt-0.5">
                      {bando.dotazione}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#D3E0FF]/60 text-[11px]">
                      <div>
                        <span className="text-[#767684]">INIZIO:</span>
                        <div className="font-semibold text-[#283759] tabular-nums">
                          {bando.dataApertura}
                        </div>
                      </div>
                      <div>
                        <span className="text-[#767684]">SCADENZA:</span>
                        <div className="font-semibold text-[#E8590C] tabular-nums">
                          {bando.termineScadenza}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* Primary Button */}
                    <button
                      onClick={() => onOpenPreview(bando)}
                      className="w-full py-2 px-3 rounded-lg bg-[#0A0045] hover:bg-[#161E75] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Anteprima bando</span>
                    </button>

                    {/* Secondary Action */}
                    <button
                      onClick={onOpenAmmissibilita}
                      className="w-full text-center text-xs font-semibold text-[#E8590C] hover:underline cursor-pointer py-1"
                    >
                      Verifica requisiti gratuiti →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Footer Banner (from Image 9) */}
        {isCategoryInnovationOnly && (
          <div className="mt-8 p-6 rounded-xl bg-[#F7FAFF] border border-[#D3E0FF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-[#1F299C] uppercase tracking-wider mb-1">
                CONSULENZA TECNICO-ISTITUZIONALE R&amp;S
              </div>
              <h4 className="font-heading text-sm font-bold text-[#0A0045] mb-1">
                Hai un progetto complesso ad alto TRL o cerchi partner scientifici?
              </h4>
              <p className="text-xs text-[#364349]">
                I nostri ingegneri ed esperti di finanza agevolata convalidano l&apos;eleggibilità delle spese, calcolano in anticipo le aliquote di contributo a fondo perduto e preparano l&apos;intera perizia asseverata.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={onOpenAmmissibilita}
                className="px-4 py-2 rounded-lg bg-[#0A0045] text-white text-xs font-semibold hover:bg-[#161E75] cursor-pointer"
              >
                Richiedi audit preliminare
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="px-4 py-2 rounded-lg border border-[#D3E0FF] bg-white text-[#283759] text-xs font-medium hover:bg-gray-50 cursor-pointer"
              >
                Linee guida MIMIT 2025
              </button>
            </div>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="mt-8 pt-4 border-t border-[#D3E0FF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#767684]">
          <div>
            Mostrati 1-{filteredBandi.length} di {filteredBandi.length} bandi
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded border border-[#D3E0FF] bg-white hover:bg-[#F7FAFF] disabled:opacity-50">
              Precedente
            </button>
            <button className="px-3 py-1.5 rounded bg-[#0A0045] text-white font-bold">
              1
            </button>
            <button className="px-3 py-1.5 rounded border border-[#D3E0FF] bg-white hover:bg-[#F7FAFF]">
              2
            </button>
            <button className="px-3 py-1.5 rounded border border-[#D3E0FF] bg-white hover:bg-[#F7FAFF]">
              3
            </button>
            <button className="px-3 py-1.5 rounded border border-[#D3E0FF] bg-white hover:bg-[#F7FAFF]">
              Successiva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
