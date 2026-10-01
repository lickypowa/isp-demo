import React from 'react';
import { Bando } from '../types';
import { X, ExternalLink, Calendar, Wallet, FileText, Download, CheckCircle2 } from 'lucide-react';

interface BandoPreviewModalProps {
  bando: Bando | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenFullDetail: (bando: Bando) => void;
}

export const BandoPreviewModal: React.FC<BandoPreviewModalProps> = ({
  bando,
  isOpen,
  onClose,
  onOpenFullDetail
}) => {
  if (!isOpen || !bando) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0045]/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-[#D3E0FF] w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#D3E0FF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F299C]">
            <span className="w-2 h-2 rounded-full bg-[#1F299C]"></span>
            <span>ANTEPRIMA SINTETICA BANDO</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenFullDetail(bando);
              }}
              className="flex items-center gap-1 text-xs text-[#283759] hover:text-[#1F299C] px-2.5 py-1 rounded border border-[#D3E0FF] hover:bg-[#F7FAFF] transition-colors cursor-pointer"
            >
              <span>Apri in nuova scheda</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#767684] hover:text-[#0A0045] hover:bg-[#F7FAFF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Header Tags & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {bando.status}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-[#F7FAFF] text-[#283759] border border-[#D3E0FF]">
                {bando.code}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-[#1F299C] border border-[#D3E0FF]">
                {bando.programma}
              </span>
            </div>

            <div className="text-xs text-[#364349] font-medium mb-1">
              Ente erogatore: <span className="text-[#283759] font-semibold">{bando.ente}</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0A0045] leading-tight">
              {bando.title}
            </h2>
          </div>

          {/* Key Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#F7FAFF] border border-[#D3E0FF]">
            <div>
              <div className="text-[11px] font-semibold text-[#767684] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1F299C]" />
                DATA APERTURA
              </div>
              <div className="text-sm font-bold text-[#0A0045] tabular-nums">
                {bando.dataApertura}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-[#767684] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E8590C]" />
                TERMINE SCADENZA
              </div>
              <div className="text-sm font-bold text-[#E8590C] tabular-nums">
                {bando.termineScadenza}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-[#767684] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#1F299C]" />
                DOTAZIONE COMPLESSIVA
              </div>
              <div className="text-base font-extrabold text-[#1F299C] tabular-nums">
                {bando.dotazione}
              </div>
            </div>
          </div>

          {/* Forma Agevolazione & Finalità */}
          <div className="p-4 rounded-xl border border-[#D3E0FF] bg-white space-y-3">
            <div>
              <div className="text-[11px] font-semibold text-[#767684] uppercase tracking-wider mb-1">
                FORMA DI AGEVOLAZIONE
              </div>
              <div className="text-xs font-semibold text-[#1F299C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1F299C]"></span>
                {bando.formaAgevolazione}
              </div>
            </div>

            <div className="pt-2 border-t border-[#D3E0FF]/60">
              <div className="text-[11px] font-semibold text-[#767684] uppercase tracking-wider mb-1">
                FINALITÀ STRATEGICA
              </div>
              <p className="text-xs text-[#283759] leading-relaxed">
                {bando.finalita}
              </p>
            </div>
          </div>

          {/* Descrizione Sintetica */}
          <div>
            <h4 className="text-xs font-bold text-[#0A0045] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#1F299C]" />
              Descrizione sintetica
            </h4>
            <p className="text-xs text-[#364349] leading-relaxed bg-[#F7FAFF] p-3.5 rounded-lg border border-[#D3E0FF]">
              {bando.descrizione}
            </p>
          </div>

          {/* A Chi Si Rivolge */}
          <div>
            <h4 className="text-xs font-bold text-[#0A0045] uppercase tracking-wider mb-2">
              A chi si rivolge
            </h4>
            <div className="p-3.5 rounded-lg border border-[#D3E0FF] bg-white flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-[#283759] leading-relaxed">
                <span className="font-semibold">Soggetti Beneficiari: </span>
                {bando.soggetti}
              </div>
            </div>
          </div>

          {/* Allegati Ufficiali */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#0A0045] uppercase tracking-wider">
                Allegati ufficiali
              </h4>
              <span className="text-[11px] text-[#767684]">2 file disponibili</span>
            </div>
            <p className="text-[11px] text-[#767684] italic mb-2.5">
              Ulteriori informazioni disponibili sul link istituzionale o sugli allegati in basso
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] hover:bg-white transition-colors">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    PDF
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-medium text-[#283759] truncate">
                      Decreto_Direttoriale_Allegato_A.pdf
                    </div>
                    <div className="text-[10px] text-[#767684]">PDF • 1.4 MB</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Download simulato: Decreto_Direttoriale_Allegato_A.pdf')}
                  className="p-1.5 text-[#1F299C] hover:bg-[#D3E0FF]/40 rounded transition-colors cursor-pointer"
                  title="Scarica allegato"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] hover:bg-white transition-colors">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    PDF
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-medium text-[#283759] truncate">
                      Criteri_Valutazione_Griglia.pdf
                    </div>
                    <div className="text-[10px] text-[#767684]">PDF • 840 KB</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Download simulato: Criteri_Valutazione_Griglia.pdf')}
                  className="p-1.5 text-[#1F299C] hover:bg-[#D3E0FF]/40 rounded transition-colors cursor-pointer"
                  title="Scarica allegato"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F7FAFF] border-t border-[#D3E0FF] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#283759] hover:bg-white rounded-lg border border-[#D3E0FF] transition-colors cursor-pointer"
          >
            Chiudi anteprima
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenFullDetail(bando);
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#1F299C] hover:bg-[#161E75] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Apri scheda completa →
          </button>
        </div>
      </div>
    </div>
  );
};
