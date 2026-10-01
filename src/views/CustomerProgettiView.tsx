import React, { useState } from 'react';
import { Progetto, ViewMode } from '../types';
import { initialProgetti } from '../data/mockData';
import {
  Folder,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Wallet,
  Download,
  AlertTriangle,
  Building,
  FileText
} from 'lucide-react';

interface CustomerProgettiViewProps {
  progetti?: Progetto[];
  onSelectProgetto: (progetto: Progetto) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenAmmissibilita: () => void;
}

export const CustomerProgettiView: React.FC<CustomerProgettiViewProps> = ({
  progetti = initialProgetti,
  onSelectProgetto,
  onNavigate,
  onOpenAmmissibilita
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  // New Practice Form State
  const [newTitle, setNewTitle] = useState('');
  const [newBando, setNewBando] = useState('Bando Transizione Digitale e Green PMI 2025');
  const [newImporto, setNewImporto] = useState('250.000 €');

  const filteredProgetti = progetti.filter((p) => {
    const matchesStatus =
      filterStatus === 'tutti' ||
      (filterStatus === 'lavorazione' && p.stato.includes('Lavorazione')) ||
      (filterStatus === 'graduatoria' && p.stato.includes('graduatoria')) ||
      (filterStatus === 'sal' && p.stato.includes('SAL')) ||
      (filterStatus === 'completato' && p.stato.includes('Completato'));

    const matchesQuery =
      p.codiceFascicolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.misura.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.enteGestore.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleCreatePractice = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Nuovo fascicolo "${newTitle || newBando}" creato con successo! Il desk ISP è stato notificato.`);
    setShowNewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-[#0A0045]">
            I Miei Progetti &amp; Fascicoli Bandi
          </h1>
          <p className="text-xs text-[#5C6E82] mt-1">
            Monitoraggio centralizzato delle domande di contributo, SAL e perizie asseverate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAmmissibilita()}
            className="px-3.5 py-2 rounded-lg border border-[#1F299C] bg-white hover:bg-[#F7FAFF] text-[#1F299C] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Audit Ammissibilità</span>
          </button>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 rounded-lg bg-[#E8590C] hover:bg-[#CF4D07] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuova Pratica</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6E82] mb-1">
            <span>Fascicoli Attivi</span>
            <Folder className="w-4 h-4 text-[#1F299C]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0A0045] font-heading">
            {progetti.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Tutti i fascicoli in regola
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6E82] mb-1">
            <span>Contributo Richiesto</span>
            <Wallet className="w-4 h-4 text-[#E8590C]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0A0045] font-heading">
            € 1.480.000
          </div>
          <div className="text-[11px] text-[#5C6E82] mt-1">
            4 bandi ministeriali e regionali
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6E82] mb-1">
            <span>Già Concesso / Erogato</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-heading">
            € 620.000
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">
            Con decreti esecutivi MIMIT
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#5C6E82] mb-1">
            <span>Prossima Scadenza SAL</span>
            <Clock className="w-4 h-4 text-[#1F299C]" />
          </div>
          <div className="text-lg font-extrabold text-[#0A0045] font-heading">
            28 Mar 2025
          </div>
          <div className="text-[11px] text-[#E8590C] font-semibold mt-1">
            Fascicolo ISP-2024-001 (1° SAL)
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tabs for quick filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {[
            { id: 'tutti', label: 'Tutti i Progetti' },
            { id: 'lavorazione', label: 'In Lavorazione' },
            { id: 'graduatoria', label: 'In attesa graduatoria' },
            { id: 'sal', label: 'Invio SAL' },
            { id: 'completato', label: 'Erogati' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#1F299C] text-white shadow-xs'
                  : 'bg-[#F7FAFF] text-[#283759] hover:bg-[#D3E0FF]/40 border border-[#D3E0FF]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8FA3BF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca fascicolo o ente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-[#D3E0FF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAFF] border-b border-[#D3E0FF]">
              <tr>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Fascicolo &amp; Misura</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Ente Gestore</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Importo Agevolabile</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Desk Assegnato</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Scadenza</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Stato</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D3E0FF]/60 text-[#364349]">
              {filteredProgetti.map((prog) => {
                const getStatusBadge = (stato: string) => {
                  if (stato.includes('Completato')) {
                    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  }
                  if (stato.includes('Lavorazione')) {
                    return 'bg-blue-50 text-[#1F299C] border-[#1F299C]/20';
                  }
                  if (stato.includes('SAL')) {
                    return 'bg-amber-50 text-amber-800 border-amber-200';
                  }
                  return 'bg-purple-50 text-purple-700 border-purple-200';
                };

                return (
                  <tr
                    key={prog.id}
                    onClick={() => {
                      onSelectProgetto(prog);
                      onNavigate('customer-progetto-detail');
                    }}
                    className="hover:bg-[#F7FAFF]/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-[11px] font-bold text-[#1F299C]">
                        {prog.codiceFascicolo}
                      </div>
                      <div className="font-bold text-[#0A0045] text-xs mt-0.5 group-hover:text-[#1F299C] transition-colors">
                        {prog.titolo}
                      </div>
                      <div className="text-[11px] text-[#5C6E82] truncate max-w-xs">
                        {prog.misura}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#0A0045] bg-[#F7FAFF] px-2 py-0.5 rounded border border-[#D3E0FF]/60">
                        {prog.enteGestore}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0A0045]">{prog.importoAgevolabile}</div>
                      <div className="text-[10px] text-[#5C6E82]">{prog.tipoContributo}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#0A0045]">{prog.deskIsp}</div>
                      <div className="text-[10px] text-emerald-600">Disponibile</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[#0A0045] font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#E8590C]" />
                        <span>{prog.prossimaScadenza}</span>
                      </div>
                      {prog.scadenzaNote && (
                        <div className="text-[10px] text-[#5C6E82]">{prog.scadenzaNote}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                          prog.stato
                        )}`}
                      >
                        {prog.stato}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProgetto(prog);
                          onNavigate('customer-progetto-detail');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1F299C]/10 hover:bg-[#1F299C] text-[#1F299C] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <span>Apri</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Nuova Pratica */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#D3E0FF]">
              <h3 className="font-heading text-lg font-bold text-[#0A0045]">
                Apertura Nuovo Fascicolo Pratica
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-[#0A0045] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePractice} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Titolo Interno del Progetto *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Es. Efficientamento Linea Robotica 2025"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Bando o Misura di Riferimento *
                </label>
                <select
                  value={newBando}
                  onChange={(e) => setNewBando(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                >
                  <option value="Bando Transizione Digitale e Green PMI 2025">
                    Bando Transizione Digitale e Green PMI 2025 (MIMIT)
                  </option>
                  <option value="SIMEST - Fiere Internazionali e Transizione Ecologica">
                    SIMEST - Fiere Internazionali e Transizione Ecologica
                  </option>
                  <option value="Bando Innovazione e Ricerca Industriale Regione Lombardia">
                    Bando Innovazione e Ricerca Industriale Regione Lombardia
                  </option>
                  <option value="Smart&Start Italia - Startup Innovative">
                    Smart&amp;Start Italia - Startup Innovative (Invitalia)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Budget Stimato Investimento
                  </label>
                  <input
                    type="text"
                    value={newImporto}
                    onChange={(e) => setNewImporto(e.target.value)}
                    placeholder="250.000 €"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Consulente ISP Richiesto
                  </label>
                  <div className="px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#5C6E82]">
                    Assegnazione Automatica Desk
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                Nota: Alla creazione del fascicolo verrà generato un codice univoco e un consulente ISP verificherà la completezza dei dati preliminari.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#D3E0FF] text-[#283759] text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Crea Fascicolo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
