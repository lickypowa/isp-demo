import React, { useState } from 'react';
import { Progetto, ViewMode } from '../types';
import {
  ChevronLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Upload,
  Download,
  AlertCircle,
  Building,
  User,
  Send,
  Video,
  ShieldCheck,
  Paperclip
} from 'lucide-react';

interface CustomerProgettoDetailViewProps {
  progetto: Progetto;
  onNavigate: (view: ViewMode) => void;
  onOpenAmmissibilita: () => void;
}

export const CustomerProgettoDetailView: React.FC<CustomerProgettoDetailViewProps> = ({
  progetto,
  onNavigate,
  onOpenAmmissibilita
}) => {
  const [activeTab, setActiveTab] = useState<'documenti' | 'messaggi' | 'checklist' | 'scadenze'>('documenti');
  const [messages, setMessages] = useState(progetto.messaggi || []);
  const [newMessageText, setNewMessageText] = useState('');
  const [documents, setDocuments] = useState(progetto.documenti || []);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'Tu (Referente Impresa)',
      senderRole: 'Referente Legale',
      text: newMessageText,
      time: 'Adesso',
      isClient: true
    };

    setMessages([...messages, newMsg]);
    setNewMessageText('');

    // Simulate quick auto-reply from desk
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-rep-${Date.now()}`,
          sender: progetto.deskIsp,
          senderRole: 'Desk Finanza Agevolata ISP',
          text: 'Messaggio ricevuto. Stiamo verificando il documento con il perito asseveratore per confermare l’invio al ministero.',
          time: 'Poco fa',
          isClient: false
        }
      ]);
    }, 1500);
  };

  const handleSimulateUpload = () => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: `Fattura_Quietanzata_SAL1_${Date.now().toString().slice(-4)}.pdf`,
      size: '1.4 MB',
      date: 'Oggi',
      type: 'pdf' as const
    };
    setDocuments([newDoc, ...documents]);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Back Navigation & Header */}
      <div>
        <button
          onClick={() => onNavigate('customer-progetti')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F299C] hover:text-[#0A0045] transition-colors mb-3 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Torna all&apos;elenco fascicoli</span>
        </button>

        <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#1F299C] bg-[#1F299C]/10 px-2.5 py-0.5 rounded-full">
                  FASCICOLO: {progetto.codiceFascicolo}
                </span>
                <span className="text-xs font-semibold text-[#0A0045] bg-[#F7FAFF] px-2 py-0.5 rounded border border-[#D3E0FF]">
                  Ente: {progetto.enteGestore}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {progetto.stato}
                </span>
              </div>

              <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0A0045]">
                {progetto.titolo}
              </h1>

              <div className="text-xs text-[#5C6E82]">
                Misura di finanziamento: <strong className="text-[#0A0045]">{progetto.misura}</strong>
              </div>
            </div>

            {/* Quick stats right */}
            <div className="flex items-center gap-4 bg-[#F7FAFF] p-4 rounded-xl border border-[#D3E0FF] shrink-0">
              <div>
                <div className="text-[11px] text-[#5C6E82] uppercase font-bold">Importo Agevolato</div>
                <div className="text-xl font-extrabold text-[#0A0045] font-heading">{progetto.importoAgevolabile}</div>
                <div className="text-[10px] text-emerald-600">{progetto.tipoContributo}</div>
              </div>
              <div className="h-10 w-px bg-[#D3E0FF]"></div>
              <div>
                <div className="text-[11px] text-[#5C6E82] uppercase font-bold">Desk ISP</div>
                <div className="text-xs font-bold text-[#0A0045]">{progetto.deskIsp}</div>
                <div className="text-[10px] text-[#1F299C]">Referente Assegnato</div>
              </div>
            </div>
          </div>

          {/* Workflow Progress Steps */}
          <div className="mt-8 pt-6 border-t border-[#D3E0FF]/60">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0045]">1. Domanda Inviata</div>
                  <div className="text-[10px] text-[#5C6E82]">Protocollata con successo</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0045]">2. Valutazione Istruttoria</div>
                  <div className="text-[10px] text-emerald-600 font-medium">Esito positivo</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0045]">3. Decreto Concessione</div>
                  <div className="text-[10px] text-[#5C6E82]">Codice CUP assegnato</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1F299C] text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                  4
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F299C]">4. Rendicontazione SAL</div>
                  <div className="text-[10px] text-[#E8590C] font-semibold">Scadenza: {progetto.prossimaScadenza}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto border-b border-[#D3E0FF] bg-white rounded-t-xl px-2 pt-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('documenti')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'documenti'
              ? 'border-[#1F299C] text-[#1F299C]'
              : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Fascicolo Documentale ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messaggi')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'messaggi'
              ? 'border-[#1F299C] text-[#1F299C]'
              : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Messaggi Desk &amp; Perito ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'checklist'
              ? 'border-[#1F299C] text-[#1F299C]'
              : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Checklist DNSH &amp; Oneri SAL</span>
        </button>

        <button
          onClick={() => setActiveTab('scadenze')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'scadenze'
              ? 'border-[#1F299C] text-[#1F299C]'
              : 'border-transparent text-[#5C6E82] hover:text-[#0A0045]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Scadenziario &amp; Allineamenti</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. DOCUMENTI */}
      {activeTab === 'documenti' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D3E0FF]/60">
            <div>
              <h3 className="font-heading font-bold text-sm text-[#0A0045]">
                Repository Documentale Ufficiale
              </h3>
              <p className="text-xs text-[#5C6E82]">
                Carica fatture quietanzate, bonifici parlanti con CUP e perizie asseverate firmate digitalmente.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateUpload}
                className="px-3.5 py-2 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Carica Documento SAL</span>
              </button>
            </div>
          </div>

          {uploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              Documento caricato con successo nel repository del fascicolo!
            </div>
          )}

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-[#D3E0FF] hover:border-[#1F299C] transition-colors bg-[#F7FAFF]"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#1F299C] shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-[#0A0045]">
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-[#5C6E82]">
                      Caricato: {doc.date} • Dimensione: {doc.size}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Asseverato
                  </span>
                  <button
                    onClick={() => alert(`Download: ${doc.name}`)}
                    className="p-1.5 rounded-lg border border-[#D3E0FF] hover:bg-white text-[#283759] cursor-pointer"
                    title="Scarica documento"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. MESSAGGI */}
      {activeTab === 'messaggi' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 shadow-xs flex flex-col h-[500px]">
          <div className="pb-3 border-b border-[#D3E0FF]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-[#0A0045]">
                Desk Finanza Agevolata ({progetto.deskIsp})
              </span>
            </div>
            <span className="text-[11px] text-[#5C6E82]">Canale sicuro conforme GDPR</span>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.isClient ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-[#5C6E82] mb-1">
                  <span className="font-semibold text-[#0A0045]">{m.sender}</span>
                  <span>({m.senderRole})</span>
                  <span>• {m.time}</span>
                </div>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.isClient
                      ? 'bg-[#1F299C] text-white rounded-br-xs'
                      : 'bg-[#F7FAFF] border border-[#D3E0FF] text-[#0A0045] rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#D3E0FF]/60 flex items-center gap-2">
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="Scrivi un messaggio al desk o al perito asseveratore..."
              className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Invia</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 3. CHECKLIST DNSH */}
      {activeTab === 'checklist' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-sm text-[#0A0045]">
            Checklist Conformità Spese &amp; Vincoli DNSH
          </h3>
          <p className="text-xs text-[#5C6E82]">
            Verifica punto per punto i requisiti necessari all&apos;accoglimento del primo Saldo di Avanzamento Lavori (SAL 1).
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                title: 'Codice Unico di Progetto (CUP) indicato su tutte le fatture elettroniche',
                desc: 'Tutte le fatture dei fornitori di beni 4.0 devono riportare il CUP nel campo 2.1.1.9 del file XML SDI.',
                status: true
              },
              {
                title: 'Bonifico parlante con riferimento alla L. 178/2020 e numero fattura',
                desc: 'I pagamenti devono risultare irrevocabili e tracciati su conto corrente aziendale dedicato.',
                status: true
              },
              {
                title: 'Perizia asseverata ex-ante con stima del risparmio energetico >= 5%',
                desc: 'Redatta e firmata con firma digitale qualificata da ingegnere o perito industriale abilitato.',
                status: true
              },
              {
                title: 'Dichiarazione DNSH di non arrecare danno significativo all’ambiente',
                desc: 'Assenza di acquisti legati a caldaie a combustione fossile e rispetto delle schede tecniche Ragioneria Stato.',
                status: true
              },
              {
                title: 'Attestazione di regolare interconnessione al sistema gestionale di fabbrica',
                desc: 'Verifica dello scambio dati bidirezionale tra macchinario e sistema MES/ERP.',
                status: false
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] flex items-start gap-3"
              >
                <div className="mt-0.5">
                  {item.status ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0045]">{item.title}</div>
                  <div className="text-[11px] text-[#5C6E82] mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SCADENZE & ALLINEAMENTI */}
      {activeTab === 'scadenze' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-[#D3E0FF] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-[#0A0045]">
              Calendario Adempimenti &amp; Videocall
            </h3>
            <button
              onClick={() => alert('Richiesta videocall inoltrata al perito incaricato!')}
              className="px-3.5 py-1.5 rounded-lg border border-[#1F299C] text-[#1F299C] hover:bg-[#1F299C]/5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Prenota Videocall di Allineamento</span>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {[
              {
                date: '28 Marzo 2025',
                title: 'Termine ultimo caricamento fatture 1° SAL',
                note: 'Invio telematico su piattaforma ministeriale con firma legale rappresentante.'
              },
              {
                date: '15 Aprile 2025',
                title: 'Sopralluogo perito tecnico in stabilimento',
                note: 'Ispezione interconnessione robot e redazione verbale perizia asseverata.'
              },
              {
                date: '30 Maggio 2025',
                title: 'Previsione erogazione prima quota contributo (40%)',
                note: 'Accredito diretto dal fondo ministeriale previa approvazione SAL.'
              }
            ].map((event, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-[#1F299C]/10 text-[#1F299C] font-bold text-center shrink-0 min-w-[70px]">
                  <Calendar className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[10px] block leading-tight">{event.date}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0045]">{event.title}</div>
                  <div className="text-[11px] text-[#5C6E82] mt-0.5">{event.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
