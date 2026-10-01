import React, { useState } from 'react';
import { ViewMode } from '../types';
import {
  Check,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  Zap,
  Building,
  Sparkles,
  ArrowRight,
  Landmark,
  Briefcase
} from 'lucide-react';

interface PianiViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAmmissibilita: () => void;
}

export const PianiView: React.FC<PianiViewProps> = ({ onNavigate, onOpenAmmissibilita }) => {
  const [activeSegment, setActiveSegment] = useState<'imprese' | 'pa' | 'partner'>('imprese');
  const [billingCycle, setBillingCycle] = useState<'annuale' | 'mensile'>('annuale');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#F7FAFF] min-h-screen pb-20">
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
            <span className="text-[#0A0045] font-semibold">Piani e Tariffe</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F299C]/10 text-xs font-bold text-[#1F299C] mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>TRASPARENZA &amp; VALORE OPERATIVO</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0045] tracking-tight mb-4">
          Piani e Servizi per Imprese, PA e Professionisti
        </h1>
        <p className="text-base sm:text-lg text-[#364349] max-w-3xl mx-auto leading-relaxed">
          Scegli la modalità di presidio, monitoraggio continuo e supporto operativo specialistico più adatta alla dimensione della tua organizzazione.
        </p>

        {/* Audience Segment Switcher */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-white border border-[#D3E0FF] shadow-xs">
            <button
              onClick={() => setActiveSegment('imprese')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSegment === 'imprese'
                  ? 'bg-[#1F299C] text-white shadow-xs'
                  : 'text-[#5C6E82] hover:text-[#0A0045]'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Per Imprese &amp; PMI</span>
            </button>

            <button
              onClick={() => setActiveSegment('pa')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSegment === 'pa'
                  ? 'bg-[#1F299C] text-white shadow-xs'
                  : 'text-[#5C6E82] hover:text-[#0A0045]'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Pubbliche Amministrazioni</span>
            </button>

            <button
              onClick={() => setActiveSegment('partner')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSegment === 'partner'
                  ? 'bg-[#1F299C] text-white shadow-xs'
                  : 'text-[#5C6E82] hover:text-[#0A0045]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Commercialisti &amp; Periti</span>
            </button>
          </div>
        </div>

        {/* Billing cycle toggle */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold text-[#283759]">
          <span className={billingCycle === 'mensile' ? 'text-[#0A0045]' : 'text-[#5C6E82]'}>Fatturazione mensile</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'annuale' ? 'mensile' : 'annuale')}
            className="w-12 h-6 rounded-full bg-[#1F299C] p-1 flex items-center transition-colors cursor-pointer relative"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                billingCycle === 'annuale' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={billingCycle === 'annuale' ? 'text-[#0A0045]' : 'text-[#5C6E82]'}>
            Fatturazione annuale <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">-20% sconto</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Starter */}
          <div className="bg-white rounded-2xl border border-[#D3E0FF] p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#5C6E82] uppercase tracking-wider">
                  Accesso Libero
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  Starter
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-[#0A0045] mb-2">
                Consultazione Base
              </h3>
              <p className="text-xs text-[#5C6E82] mb-6 leading-relaxed">
                Ideale per microimprese ed aspiranti imprenditori che desiderano esplorare i bandi aperti.
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#0A0045] font-heading">€ 0</span>
                  <span className="text-xs text-[#5C6E82]">/ per sempre</span>
                </div>
                <div className="text-xs text-emerald-600 mt-1 font-medium">Nessuna carta di credito richiesta</div>
              </div>

              <div className="border-t border-[#D3E0FF]/60 pt-6 space-y-3">
                <div className="text-xs font-bold text-[#0A0045] uppercase">Cosa include:</div>
                {[
                  'Ricerca libera nel catalogo bandi ISP',
                  'Schede sintetiche con requisiti base',
                  'Verifica ammissibilità rapida (1 bando/mese)',
                  'Newsletter mensile con riassunto bandi PNRR',
                  'Accesso al glossario e guide normative'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#364349]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('register')}
                className="w-full py-3 px-4 rounded-xl border border-[#1F299C] bg-white hover:bg-[#F7FAFF] text-[#1F299C] font-bold text-sm transition-colors cursor-pointer text-center"
              >
                Registrati Gratuitamente
              </button>
            </div>
          </div>

          {/* Plan 2: Professional (Featured) */}
          <div className="bg-white rounded-2xl border-2 border-[#1F299C] p-8 shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1F299C] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Consigliato per PMI
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pt-1">
                <span className="text-xs font-bold text-[#1F299C] uppercase tracking-wider">
                  Presidio Completo
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1F299C]/10 text-[#1F299C]">
                  Professional Growth
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-[#0A0045] mb-2">
                Monitoraggio &amp; Istruttoria
              </h3>
              <p className="text-xs text-[#5C6E82] mb-6 leading-relaxed">
                Per imprese strutturate che desiderano cogliere ogni agevolazione con pre-valutazione documentale.
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#0A0045] font-heading">
                    {billingCycle === 'annuale' ? '€ 149' : '€ 185'}
                  </span>
                  <span className="text-xs text-[#5C6E82]">/ mese + IVA</span>
                </div>
                <div className="text-xs text-[#1F299C] mt-1 font-medium">
                  {billingCycle === 'annuale' ? 'Fatturato annualmente (€ 1.788/anno)' : 'Fatturazione mensile disdicibile in ogni momento'}
                </div>
              </div>

              <div className="border-t border-[#D3E0FF]/60 pt-6 space-y-3">
                <div className="text-xs font-bold text-[#0A0045] uppercase">Tutto dello Starter, più:</div>
                {[
                  'Alert radar in tempo reale su Codice ATECO aziendale',
                  'Download illimitato allegati, decreti e modelli ufficiali',
                  'Fino a 5 pratiche contemporaneamente monitorate nel portale',
                  'Desk ISP dedicato con consulente di riferimento',
                  'Audit di ammissibilità illimitati con calcolo DNSH',
                  'Sconto del 20% su perizie asseverate Industria 5.0',
                  'Report trimestrale opportunità di incentivo personalizzato'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#364349]">
                    <Check className="w-4 h-4 text-[#1F299C] shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('register')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1F299C] hover:bg-[#161E75] text-white font-bold text-sm shadow-md transition-all cursor-pointer text-center"
              >
                Attiva Piano Professional
              </button>
            </div>
          </div>

          {/* Plan 3: Enterprise / Custom */}
          <div className="bg-white rounded-2xl border border-[#D3E0FF] p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#5C6E82] uppercase tracking-wider">
                  End-to-End Chiavi in Mano
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
                  Enterprise
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-[#0A0045] mb-2">
                Corporate &amp; Grandi Progetti
              </h3>
              <p className="text-xs text-[#5C6E82] mb-6 leading-relaxed">
                Per gruppi aziendali, filiere produttive, enti territoriali e studi professionali ad alto volume.
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#0A0045] font-heading">Su Misura</span>
                </div>
                <div className="text-xs text-[#5C6E82] mt-1 font-medium">Contratti annuali o a successo (Success Fee)</div>
              </div>

              <div className="border-t border-[#D3E0FF]/60 pt-6 space-y-3">
                <div className="text-xs font-bold text-[#0A0045] uppercase">Tutto del Professional, più:</div>
                {[
                  'Presidio multi-societario illimitato (Gruppi e Reti)',
                  'Senior Key Account dedicato presso le sedi ISP (Milano/Brindisi)',
                  'Redazione completa del piano industriale e fascicolo telematico',
                  'Perizie asseverate ex-ante ed ex-post con perito in presenza',
                  'Gestione della rendicontazione SAL e interfaccia con i ministeri',
                  'Integrazione API con i sistemi gestionali / ERP aziendali',
                  'Accordo SLA garantito con tempi di risposta entro 4 ore'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#364349]">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onNavigate('chi-siamo')}
                className="w-full py-3 px-4 rounded-xl border border-[#283759] bg-[#0A0045] hover:bg-[#161E75] text-white font-bold text-sm transition-colors cursor-pointer text-center"
              >
                Richiedi Incontro Dedicato
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl border border-[#D3E0FF] p-6 sm:p-8 shadow-xs">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0A0045] mb-6 text-center">
            Matrice Comparativa delle Funzionalità
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D3E0FF] bg-[#F7FAFF]">
                  <th className="py-3 px-4 text-xs font-bold text-[#0A0045] uppercase">Funzionalità &amp; Servizi</th>
                  <th className="py-3 px-4 text-xs font-bold text-center text-[#5C6E82]">Starter</th>
                  <th className="py-3 px-4 text-xs font-bold text-center text-[#1F299C]">Professional</th>
                  <th className="py-3 px-4 text-xs font-bold text-center text-purple-700">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D3E0FF]/60 text-[#364349]">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A0045]">Accesso al catalogo nazionale bandi</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Illimitato</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Illimitato</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Illimitato</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A0045]">Radar notifiche su codici ATECO via email/SMS</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ 3 Codici ATECO</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Illimitati</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A0045]">Download bandi completi, decreti e allegati operativi</td>
                  <td className="py-3 px-4 text-center text-slate-400">Solo sintesi</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Download PDF illimitato</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Download + Format compilati</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A0045]">Consulente ISP dedicato &amp; Desk pratiche</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Ticket &amp; Chat (24h)</td>
                  <td className="py-3 px-4 text-center text-purple-700 font-bold">✓ Key Account dedicato &amp; Cellulare</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A0045]">Fascicoli istruttori contemporanei nel portale</td>
                  <td className="py-3 px-4 text-center text-slate-400">1</td>
                  <td className="py-3 px-4 text-center font-bold text-[#0A0045]">Fino a 5</td>
                  <td className="py-3 px-4 text-center font-bold text-purple-700">Illimitati</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A0045]">Perizia asseverata Industria 5.0 con firma digitale</td>
                  <td className="py-3 px-4 text-center text-slate-400">Tariffa piena</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">Sconto 20% convenzione</td>
                  <td className="py-3 px-4 text-center text-purple-700 font-bold">Inclusa o a forfait agevolato</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A0045]">Assistenza audit DNSH e rendicontazione SAL</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Checklist guidata</td>
                  <td className="py-3 px-4 text-center text-purple-700 font-bold">✓ Asseverazione documentale</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h3 className="font-heading text-2xl font-bold text-[#0A0045] text-center mb-8">
          Domande Frequenti sui Piani e Servizi
        </h3>

        <div className="space-y-4">
          {[
            {
              q: 'Come funziona la garanzia di ammissibilità della domanda?',
              a: 'Prima della trasmissione formale di qualsiasi bando, il team ISP esegue una doppia verifica tecnica e fiscale. Verifichiamo i requisiti di regolarità contributiva (DURC), il de minimis residuo nel Registro Nazionale Aiuti e la conformità DNSH.'
            },
            {
              q: 'Posso disdire o cambiare piano in qualsiasi momento?',
              a: 'Certamente. Nel piano mensile puoi disdire con un semplice clic dal tuo pannello di controllo. Se hai optato per la fatturazione annuale, il piano rimarrà attivo fino al termine del periodo pagato senza rinnovo automatico obbligatorio.'
            },
            {
              q: 'Chi rilascia le perizie asseverate Industria 5.0?',
              a: 'Le perizie vengono redatte ed asseverate esclusivamente da ingegneri e periti industriali iscritti agli albi professionali e certificatori abilitati ai sensi dei decreti interministeriali MIMIT e GSE.'
            },
            {
              q: 'Siete accreditati con ODCEC per i Dottori Commercialisti?',
              a: 'Sì, Innovation Smart Plaza ha accordi di collaborazione attiva con diversi Ordini territoriali dei Dottori Commercialisti ed Esperti Contabili, garantendo formazione e ripartizione provvigionale trasparente per gli studi partner.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#D3E0FF] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left font-semibold text-sm text-[#0A0045] flex items-center justify-between hover:bg-[#F7FAFF] cursor-pointer"
              >
                <span>{item.q}</span>
                <HelpCircle className="w-4 h-4 text-[#1F299C] shrink-0 ml-2" />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-[#364349] leading-relaxed border-t border-[#D3E0FF]/40 bg-[#F7FAFF]/50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
