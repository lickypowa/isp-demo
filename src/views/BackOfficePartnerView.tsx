import React, { useState } from 'react';
import { PartnerRichiesta, ViewMode } from '../types';
import { initialPartnerRichieste } from '../data/mockData';
import {
  Award,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  ShieldCheck,
  Building,
  User,
  ArrowRight,
  Filter,
  Check,
  AlertTriangle
} from 'lucide-react';

interface BackOfficePartnerViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const BackOfficePartnerView: React.FC<BackOfficePartnerViewProps> = ({ onNavigate }) => {
  const [partnerRequests, setPartnerRequests] = useState<PartnerRichiesta[]>(initialPartnerRichieste);
  const [selectedPartner, setSelectedPartner] = useState<PartnerRichiesta | null>(null);
  const [filterStato, setFilterStato] = useState('tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setPartnerRequests(
      partnerRequests.map((p) => (p.id === id ? { ...p, stato: 'Approvato' } : p))
    );
    if (selectedPartner?.id === id) {
      setSelectedPartner({ ...selectedPartner, stato: 'Approvato' });
    }
    setActionNotice('Convenzione partner approvata con successo! Contratto inviato per la firma digitale.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = (id: string) => {
    setPartnerRequests(
      partnerRequests.map((p) => (p.id === id ? { ...p, stato: 'Rifiutato' } : p))
    );
    if (selectedPartner?.id === id) {
      setSelectedPartner({ ...selectedPartner, stato: 'Rifiutato' });
    }
    setActionNotice('Richiesta archiviata con esito negativo.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const filtered = partnerRequests.filter((p) => {
    const matchesFilter =
      filterStato === 'tutti' ||
      (filterStato === 'attesa' && p.stato === 'In attesa') ||
      (filterStato === 'approvato' && p.stato === 'Approvato');

    const matchesSearch =
      p.studio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.referente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.albo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.codiceRichiesta.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-[#0A0045]">
            Accreditamento Partner &amp; Professionisti
          </h1>
          <p className="text-xs text-[#5C6E82] mt-1">
            Istruttoria delle richieste di convenzione per Commercialisti, Ingegneri Asseveratori 5.0 e Centri Studi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#1F299C] bg-[#1F299C]/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#1F299C]" />
            Convenzione ODCEC Attiva
          </span>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {actionNotice}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">In Attesa di Verifica</div>
          <div className="text-2xl font-extrabold text-[#E8590C] font-heading mt-1">
            {partnerRequests.filter((p) => p.stato === 'In attesa').length}
          </div>
          <div className="text-[11px] text-[#5C6E82] mt-1">Richieste recenti ricevute</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">Convenzioni Attive</div>
          <div className="text-2xl font-extrabold text-emerald-600 font-heading mt-1">
            42
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">Studi distribuiti in 14 regioni</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">Split Provvigionale</div>
          <div className="text-2xl font-extrabold text-[#1F299C] font-heading mt-1">
            20% - 30%
          </div>
          <div className="text-[11px] text-[#5C6E82] mt-1">Accordo quadro trasparente</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">Verifiche AML / Antiriciclaggio</div>
          <div className="text-2xl font-extrabold text-[#0A0045] font-heading mt-1">
            100%
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">Conformi D.Lgs. 231/2007</div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {[
            { id: 'tutti', label: 'Tutti i Partner' },
            { id: 'attesa', label: 'In attesa approvazione' },
            { id: 'approvato', label: 'Convenzionati' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStato(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterStato === tab.id
                  ? 'bg-[#1F299C] text-white shadow-xs'
                  : 'bg-[#F7FAFF] text-[#283759] hover:bg-[#D3E0FF]/40 border border-[#D3E0FF]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8FA3BF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca studio, albo o città..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#D3E0FF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAFF] border-b border-[#D3E0FF]">
              <tr>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Richiesta</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Studio &amp; Referente</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Albo / Ordine</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Sede &amp; P.IVA</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Convenzione</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Firma Digitale</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase">Stato</th>
                <th className="py-3.5 px-4 font-bold text-[#0A0045] uppercase text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D3E0FF]/60 text-[#364349]">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedPartner(item)}
                  className="hover:bg-[#F7FAFF]/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1F299C] text-[11px]">
                    {item.codiceRichiesta}
                    <div className="text-[10px] text-[#5C6E82] font-normal">{item.dataRichiesta}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0A0045] text-xs group-hover:text-[#1F299C] transition-colors">
                      {item.studio}
                    </div>
                    <div className="text-[11px] text-[#5C6E82]">{item.referente}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#0A0045] bg-[#F7FAFF] px-2 py-0.5 rounded border border-[#D3E0FF]/60">
                      {item.albo}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#0A0045]">{item.sede}</div>
                    <div className="text-[10px] text-[#5C6E82] font-mono">{item.piva}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#1F299C]">{item.splitProvvigionale}</div>
                    <div className="text-[10px] text-[#5C6E82]">{item.tipoConvenzione}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        item.firmaDigitale === 'Firmato'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {item.firmaDigitale}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        item.stato === 'Approvato'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.stato === 'Rifiutato'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {item.stato}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {item.stato === 'In attesa' && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                            title="Approva convenzione"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Rifiuta richiesta"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedPartner(item)}
                        className="px-2.5 py-1 rounded bg-[#F7FAFF] hover:bg-slate-200 text-[#283759] text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Dettagli
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Partner Detail & Audit */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl animate-fadeIn space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#D3E0FF]">
              <div>
                <span className="text-[11px] font-mono text-[#1F299C] font-bold">
                  {selectedPartner.codiceRichiesta}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#0A0045]">
                  {selectedPartner.studio}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-slate-400 hover:text-[#0A0045] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#F7FAFF] rounded-lg border border-[#D3E0FF]/60">
                <span className="text-[#5C6E82] block text-[10px] uppercase font-semibold">Referente</span>
                <strong className="text-[#0A0045] text-sm">{selectedPartner.referente}</strong>
              </div>

              <div className="p-3 bg-[#F7FAFF] rounded-lg border border-[#D3E0FF]/60">
                <span className="text-[#5C6E82] block text-[10px] uppercase font-semibold">Albo di Iscrizione</span>
                <strong className="text-[#0A0045] text-sm">{selectedPartner.albo}</strong>
              </div>

              <div className="p-3 bg-[#F7FAFF] rounded-lg border border-[#D3E0FF]/60">
                <span className="text-[#5C6E82] block text-[10px] uppercase font-semibold">Polizza RC Professionale</span>
                <strong className="text-emerald-700">{selectedPartner.polizzaRC || 'Valida e Verificata'}</strong>
              </div>

              <div className="p-3 bg-[#F7FAFF] rounded-lg border border-[#D3E0FF]/60">
                <span className="text-[#5C6E82] block text-[10px] uppercase font-semibold">Accordo Split</span>
                <strong className="text-[#1F299C] text-sm">{selectedPartner.splitProvvigionale}</strong>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Check Antiriciclaggio &amp; DURC Eseguito:</strong>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Tutti i controlli su banche dati camerali e registro ODCEC risultano superati con rating di piena conformità.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D3E0FF] flex items-center justify-between">
              <div className="text-xs text-[#5C6E82]">
                Stato attuale: <strong className="text-[#0A0045]">{selectedPartner.stato}</strong>
              </div>

              <div className="flex items-center gap-2">
                {selectedPartner.stato === 'In attesa' && (
                  <>
                    <button
                      onClick={() => handleReject(selectedPartner.id)}
                      className="px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                    >
                      Rifiuta
                    </button>
                    <button
                      onClick={() => handleApprove(selectedPartner.id)}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                    >
                      Approva Convenzione
                    </button>
                  </>
                )}
                {selectedPartner.stato !== 'In attesa' && (
                  <button
                    onClick={() => setSelectedPartner(null)}
                    className="px-4 py-2 rounded-lg bg-[#1F299C] text-white text-xs font-bold cursor-pointer"
                  >
                    Chiudi
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
