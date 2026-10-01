import React, { useState } from 'react';
import { ViewMode } from '../types';
import {
  Building,
  Mail,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Lock,
  Save,
  Plus,
  Trash2,
  MapPin,
  CreditCard
} from 'lucide-react';

interface CustomerProfiloViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const CustomerProfiloView: React.FC<CustomerProfiloViewProps> = ({ onNavigate }) => {
  const [saved, setSaved] = useState(false);
  const [atecoList, setAtecoList] = useState([
    '62.01 - Produzione di software non connesso all’edizione',
    '71.12 - Servizi di ingegneria e consulenza tecnica',
    '28.99 - Fabbricazione di altre macchine per impieghi speciali'
  ]);
  const [newAteco, setNewAteco] = useState('');

  const [companyData, setCompanyData] = useState({
    ragioneSociale: 'Studio Rossi & Partners S.r.l.',
    piva: '09876543211',
    pec: 'studiorossi@pec.it',
    sdi: 'M5UXCR1',
    sede: 'Via Monte Napoleone 8, 20121 Milano (MI)',
    referente: 'Dott. Mario Rossi',
    email: 'mario.rossi@studiorossi.it',
    telefono: '+39 02 87654321',
    notificheBandiNuovi: true,
    notificheScadenzeSAL: true,
    notificheDecreti: true,
    regioniInteresse: 'Lombardia, Puglia, Tutte le regioni ZES Mezzogiorno'
  });

  const handleAddAteco = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAteco.trim()) {
      setAtecoList([...atecoList, newAteco.trim()]);
      setNewAteco('');
    }
  };

  const handleRemoveAteco = (index: number) => {
    setAtecoList(atecoList.filter((_, idx) => idx !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-[#0A0045]">
            Profilo Impresa &amp; Radar Agevolazioni
          </h1>
          <p className="text-xs text-[#5C6E82] mt-1">
            Gestisci le anagrafiche aziendali, i codici ATECO per il radar bandi e le preferenze di notifica.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Salva Modifiche</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          Impostazioni e preferenze del profilo salvate correttamente!
        </div>
      )}

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dati Aziendali */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs">
            <h3 className="font-heading font-bold text-sm text-[#0A0045] mb-4 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#1F299C]" />
              Dati Anagrafici &amp; Fiscali
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Ragione Sociale
                </label>
                <input
                  type="text"
                  value={companyData.ragioneSociale}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, ragioneSociale: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Partita IVA / Codice Fiscale
                  </label>
                  <input
                    type="text"
                    value={companyData.piva}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, piva: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Codice Univoco SDI
                  </label>
                  <input
                    type="text"
                    value={companyData.sdi}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, sdi: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    PEC Aziendale
                  </label>
                  <input
                    type="email"
                    value={companyData.pec}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, pec: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={companyData.telefono}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, telefono: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Sede Legale &amp; Operativa
                </label>
                <input
                  type="text"
                  value={companyData.sede}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, sede: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Radar Bandi / Codici ATECO */}
          <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs">
            <h3 className="font-heading font-bold text-sm text-[#0A0045] mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#E8590C]" />
              Radar Bandi: Codici ATECO Monitorati
            </h3>
            <p className="text-xs text-[#5C6E82] mb-4">
              Ricevi tempestivamente una notifica appena viene pubblicato un bando compatibile con i tuoi settori di attività.
            </p>

            <form onSubmit={handleAddAteco} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newAteco}
                onChange={(e) => setNewAteco(e.target.value)}
                placeholder="Aggiungi codice ATECO (es. 63.11 - Hosting e portali)"
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-[#1F299C] text-white text-xs font-semibold hover:bg-[#161E75] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Aggiungi</span>
              </button>
            </form>

            <div className="space-y-2">
              {atecoList.map((ateco, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF]/60 text-xs"
                >
                  <span className="font-medium text-[#0A0045]">{ateco}</span>
                  <button
                    onClick={() => handleRemoveAteco(idx)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Piano Attivo & Notifiche */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subscription Status Card */}
          <div className="bg-gradient-to-br from-[#0A0045] to-[#1F299C] rounded-xl p-6 text-white shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                PIANO ATTIVO
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                Rinnovo 15/01/2026
              </span>
            </div>

            <h4 className="font-heading font-extrabold text-xl mb-1">
              Professional Growth
            </h4>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Desk Finanza Agevolata 2025, radar ATECO prioritario e convenzione perizie asseverate (-20%).
            </p>

            <button
              onClick={() => onNavigate('piani')}
              className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              Gestisci o Cambia Piano
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs space-y-4">
            <h4 className="font-heading font-bold text-sm text-[#0A0045]">
              Preferenze Notifiche
            </h4>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs text-[#364349] cursor-pointer">
                <span>Alert nuovi bandi ATECO</span>
                <input
                  type="checkbox"
                  checked={companyData.notificheBandiNuovi}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, notificheBandiNuovi: e.target.checked })
                  }
                  className="rounded text-[#1F299C] focus:ring-[#1F299C]"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-[#364349] cursor-pointer">
                <span>Promemoria scadenze SAL (7gg prima)</span>
                <input
                  type="checkbox"
                  checked={companyData.notificheScadenzeSAL}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, notificheScadenzeSAL: e.target.checked })
                  }
                  className="rounded text-[#1F299C] focus:ring-[#1F299C]"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-[#364349] cursor-pointer">
                <span>Avviso pubblicazione decreti graduatorie</span>
                <input
                  type="checkbox"
                  checked={companyData.notificheDecreti}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, notificheDecreti: e.target.checked })
                  }
                  className="rounded text-[#1F299C] focus:ring-[#1F299C]"
                />
              </label>
            </div>
          </div>

          {/* Security & 2FA */}
          <div className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#0A0045] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sicurezza &amp; Autenticazione
            </h4>
            <p className="text-xs text-[#5C6E82]">
              Accesso protetto con standard SPID / CIE e cifratura dati a riposo AES-256.
            </p>
            <div className="pt-2">
              <button
                onClick={() => alert('Modifica credenziali disponibile!')}
                className="text-xs text-[#1F299C] font-semibold hover:underline"
              >
                Cambia password di accesso &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
