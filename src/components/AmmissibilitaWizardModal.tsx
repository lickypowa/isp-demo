import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Building, Award } from 'lucide-react';

interface AmmissibilitaWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAsProject?: (projectData: { titolo: string; importo: string; misura: string }) => void;
}

export const AmmissibilitaWizardModal: React.FC<AmmissibilitaWizardModalProps> = ({
  isOpen,
  onClose,
  onSaveAsProject
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ragioneSociale, setRagioneSociale] = useState('Nexus Technologies S.r.l.');
  const [ateco, setAteco] = useState('62.01.00');
  const [dimensione, setDimensione] = useState<'PMI' | 'Micro' | 'Media' | 'Grande'>('PMI');
  const [regione, setRegione] = useState<'Mezzogiorno' | 'Lombardia' | 'Altre Regioni'>('Lombardia');
  const [importoInvestimento, setImportoInvestimento] = useState<number>(1250000);
  const [hasIsoCert, setHasIsoCert] = useState(true);
  const [risparmioEnergetico, setRisparmioEnergetico] = useState(8);

  if (!isOpen) return null;

  // Calculations
  const isMezzogiorno = regione === 'Mezzogiorno';
  const baseRate = 0.40;
  const extraSud = isMezzogiorno ? 0.10 : 0.0;
  const effectiveRate = baseRate + extraSud;
  const fondoPerdutoStimato = Math.round(importoInvestimento * effectiveRate);
  const finanziamentoAgevolato = Math.round(importoInvestimento * 0.40);

  const handleFinish = () => {
    if (onSaveAsProject) {
      onSaveAsProject({
        titolo: `Transizione 5.0 - ${ragioneSociale}`,
        importo: `${fondoPerdutoStimato.toLocaleString('it-IT')} €`,
        misura: 'Piano Nazionale Transizione 5.0 - PNRR'
      });
    }
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0045]/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-[#D3E0FF] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#D3E0FF] flex items-center justify-between bg-[#F7FAFF]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8590C]"></span>
            <span className="font-heading text-sm font-bold text-[#0A0045]">
              Motore di Scoring Pre-Ammissibilità Bandi &amp; Transizione 5.0
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#767684] hover:text-[#0A0045] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 pt-4 pb-2 border-b border-[#D3E0FF]/60 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#1F299C] font-semibold' : 'text-[#767684]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1F299C] text-white' : 'bg-gray-200'}`}>
              1
            </span>
            <span>Profilo Aziendale</span>
          </div>
          <div className="w-12 h-px bg-[#D3E0FF]"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#1F299C] font-semibold' : 'text-[#767684]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1F299C] text-white' : 'bg-gray-200'}`}>
              2
            </span>
            <span>Piano Investimenti</span>
          </div>
          <div className="w-12 h-px bg-[#D3E0FF]"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#E8590C] font-semibold' : 'text-[#767684]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#E8590C] text-white' : 'bg-gray-200'}`}>
              3
            </span>
            <span>Report Ammissibilità</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0A0045]">
                Dati anagrafici e inquadramento ATECO
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#283759] mb-1">
                  Ragione Sociale Impresa
                </label>
                <input
                  type="text"
                  value={ragioneSociale}
                  onChange={(e) => setRagioneSociale(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] focus:outline-none focus:border-[#719CFF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#283759] mb-1">
                    Codice ATECO Primario
                  </label>
                  <select
                    value={ateco}
                    onChange={(e) => setAteco(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] focus:outline-none focus:border-[#719CFF] bg-white"
                  >
                    <option value="62.01.00">62.01.00 - Produzione software</option>
                    <option value="10.00.00">10.00 - Manifattura e industria</option>
                    <option value="71.12.10">71.12.10 - Ingegneria integrata</option>
                    <option value="49.41.00">49.41 - Trasporto e logistica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#283759] mb-1">
                    Dimensione Impresa (Reg. UE 651/2014)
                  </label>
                  <select
                    value={dimensione}
                    onChange={(e) => setDimensione(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] focus:outline-none focus:border-[#719CFF] bg-white"
                  >
                    <option value="PMI">Piccola e Media Impresa (PMI)</option>
                    <option value="Micro">Micro Impresa (&lt; 10 addetti)</option>
                    <option value="Media">Media Impresa (&lt; 250 addetti)</option>
                    <option value="Grande">Grande Impresa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#283759] mb-1">
                  Localizzazione Unità Operativa
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Lombardia', 'Mezzogiorno', 'Altre Regioni'] as const).map((reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setRegione(reg)}
                      className={`p-2.5 text-xs rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                        regione === reg
                          ? 'border-[#1F299C] bg-[#1F299C]/5 text-[#1F299C] font-semibold'
                          : 'border-[#D3E0FF] hover:bg-[#F7FAFF] text-[#283759]'
                      }`}
                    >
                      {reg === 'Mezzogiorno' ? 'Sud & Isole (ZES)' : reg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0A0045]">
                Specifiche dell&apos;investimento Transizione 5.0
              </h3>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#283759]">
                    Budget Complessivo di Spesa Previsto (€)
                  </label>
                  <span className="text-xs font-bold text-[#1F299C] tabular-nums">
                    {importoInvestimento.toLocaleString('it-IT')} €
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2500000}
                  step={50000}
                  value={importoInvestimento}
                  onChange={(e) => setImportoInvestimento(Number(e.target.value))}
                  className="w-full accent-[#1F299C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#767684]">
                  <span>100.000 € (Minimo operativo)</span>
                  <span>1.500.000 € (Plafond ordinario)</span>
                  <span>2.500.000 € (Cap massimo)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#283759]">
                    Stima Risparmio Energetico Ex-Ante Previsto (%)
                  </label>
                  <span className="text-xs font-bold text-emerald-600 tabular-nums">
                    {risparmioEnergetico}% (Soglia minima &gt;3% struttura, &gt;5% processo)
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={20}
                  step={1}
                  value={risparmioEnergetico}
                  onChange={(e) => setRisparmioEnergetico(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#F7FAFF] rounded-lg border border-[#D3E0FF] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#283759]">
                  <input
                    type="checkbox"
                    checked={hasIsoCert}
                    onChange={(e) => setHasIsoCert(e.target.checked)}
                    className="rounded text-[#1F299C] focus:ring-0"
                  />
                  <span>L&apos;impresa possiede certificazione ambientale ISO 14001 o EMAS (priorità istruttoria)</span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {/* Result banner */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                    Esito Istruttoria Preliminare
                  </div>
                  <div className="text-base font-bold text-emerald-950">
                    100% AMMISSIBILE • Rating di Compatibilità AAA
                  </div>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    Il codice ATECO <strong className="tabular-nums">{ateco}</strong> e i requisiti dimensionali rispondono integralmente ai criteri di priorità MIMIT &amp; PNRR Transizione 5.0.
                  </p>
                </div>
              </div>

              {/* Financial Simulation Card */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#F7FAFF] rounded-xl border border-[#D3E0FF]">
                <div>
                  <div className="text-[11px] font-semibold text-[#767684] uppercase">
                    Contributo Fondo Perduto Stimato
                  </div>
                  <div className="text-lg font-extrabold text-[#1F299C] tabular-nums mt-0.5">
                    {fondoPerdutoStimato.toLocaleString('it-IT')} €
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    Aliquota applicabile: {(effectiveRate * 100).toFixed(0)}%
                    {isMezzogiorno && ' (inclusa premialità Mezzogiorno +10%)'}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-[#767684] uppercase">
                    Finanziamento Agevolato a Tasso Ridotto
                  </div>
                  <div className="text-lg font-extrabold text-[#0A0045] tabular-nums mt-0.5">
                    {finanziamentoAgevolato.toLocaleString('it-IT')} €
                  </div>
                  <div className="text-[10px] text-[#767684]">
                    Tasso Euribor 6m ridotto al 40%
                  </div>
                </div>
              </div>

              {/* Regulatory Checks */}
              <div className="space-y-1.5 text-xs text-[#283759]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Capienza De Minimis: Plafond triennale capiente (Reg. UE 2023/2831 fino a 300.000 €).</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Conformità DNSH: Progetto conforme a Do No Significant Harm (Scheda 1 e 2).</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Perizia Asseverata: Richiesta relazione tecnica ex-ante a firma EGE abilitato.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F7FAFF] border-t border-[#D3E0FF] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 text-xs font-medium text-[#283759] hover:bg-white rounded-lg border border-[#D3E0FF] transition-colors cursor-pointer"
            >
              Indietro
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#283759] hover:bg-white rounded-lg border border-[#D3E0FF] transition-colors cursor-pointer"
            >
              Annulla
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#1F299C] hover:bg-[#161E75] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Continua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#E8590C] hover:bg-[#CF4D07] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Salva Fascicolo nei Miei Progetti</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
