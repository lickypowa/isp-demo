import React, { useState } from 'react';
import { ViewMode } from '../types';
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  Users,
  Award,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ChiSiamoViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const ChiSiamoView: React.FC<ChiSiamoViewProps> = ({ onNavigate }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    messaggio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
    setFormData({ nome: '', azienda: '', email: '', telefono: '', messaggio: '' });
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
            <span className="text-[#0A0045] font-semibold">Chi Siamo</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-[#D3E0FF] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F299C]/10 text-xs font-bold text-[#1F299C]">
            <ShieldCheck className="w-4 h-4" />
            <span>ECCELLENZA NELLA FINANZA AGEVOLATA</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0045] tracking-tight">
            Il Network Strategico tra Imprese, Periti e Istituzioni
          </h1>
          <p className="text-base sm:text-lg text-[#364349] leading-relaxed">
            Innovation Smart Plaza nasce con la missione di semplificare e velocizzare l&apos;accesso ai fondi europei, nazionali e regionali, unendo competenze ingegneristiche di perizia, consulenza tributaria e monitoraggio algoritmico dei bandi.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl border border-[#D3E0FF] p-6 shadow-sm">
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1F299C] font-heading">€ 350M+</div>
            <div className="text-xs text-[#5C6E82] font-medium mt-1">Agevolazioni Intermediate</div>
          </div>
          <div className="text-center p-3 border-l border-[#D3E0FF]/60">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-heading">98.4%</div>
            <div className="text-xs text-[#5C6E82] font-medium mt-1">Tasso di Ammissibilità</div>
          </div>
          <div className="text-center p-3 border-l border-[#D3E0FF]/60">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#E8590C] font-heading">1.250+</div>
            <div className="text-xs text-[#5C6E82] font-medium mt-1">Fascicoli Gestiti</div>
          </div>
          <div className="text-center p-3 border-l border-[#D3E0FF]/60">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0A0045] font-heading">450+</div>
            <div className="text-xs text-[#5C6E82] font-medium mt-1">Partner &amp; Studi Accreditati</div>
          </div>
        </div>
      </div>

      {/* Our Sedi / Hubs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0A0045]">
            Presidio Territoriale &amp; Direzioni Operative
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E82] mt-2">
            Due poli strategici interconnessi per garantire copertura capillare su tutto il territorio nazionale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-[#D3E0FF] p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1F299C]/10 text-[#1F299C] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1F299C] uppercase">DIREZIONE NORD &amp; RELAZIONI ISTITUZIONALI</span>
                <h3 className="font-heading text-xl font-bold text-[#0A0045]">Hub Milano</h3>
              </div>
            </div>
            <p className="text-xs text-[#364349] leading-relaxed mb-6">
              Sede di coordinamento per bandi europei diretti Horizon, grandi accordi di innovazione MIMIT, relazioni con intermediari finanziari e grandi corporate industriali.
            </p>
            <div className="space-y-2 text-xs text-[#5C6E82]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1F299C]" />
                <span>Via Monte Napoleone 8, 20121 Milano (MI)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1F299C]" />
                <span>milano@innovationsmartplaza.it</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D3E0FF] p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8590C]/10 text-[#E8590C] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#E8590C] uppercase">DIREZIONE MEZZOGIORNO &amp; DESK ISTRUTTORIE</span>
                <h3 className="font-heading text-xl font-bold text-[#0A0045]">Hub Brindisi</h3>
              </div>
            </div>
            <p className="text-xs text-[#364349] leading-relaxed mb-6">
              Centro operativo specialistico per i fondi ZES Unica Mezzogiorno, bandi regionali PR FESR Puglia/Campania/Sicilia e presidio tecnico per perizie Industria 5.0.
            </p>
            <div className="space-y-2 text-xs text-[#5C6E82]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E8590C]" />
                <span>Corso Giuseppe Garibaldi 54, 72100 Brindisi (BR)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E8590C]" />
                <span>brindisi@innovationsmartplaza.it</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Advisors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0A0045]">
            Comitato Tecnico &amp; Responsabili di Settore
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E82] mt-2">
            Professionisti abilitati con comprovata esperienza nelle commissioni di valutazione ministeriali.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              nome: 'Ing. Carlo Licata',
              ruolo: 'Direttore Generale & Head of Innovation',
              qualifica: 'Ingegnere iscritto all’Ordine, Certificatore GSE 5.0',
              initials: 'CL'
            },
            {
              nome: 'Dott.ssa Elena Conti',
              ruolo: 'Responsabile Istruttorie MIMIT & PNRR',
              qualifica: 'Dottore Commercialista & Revisore Legale MEF',
              initials: 'EC'
            },
            {
              nome: 'Ing. Marco Rossi',
              ruolo: 'Lead Perito Tecnico Asseveratore',
              qualifica: 'Specialista in Robotica e Sistemi di Fabbrica 4.0',
              initials: 'MR'
            },
            {
              nome: 'Dott. Gabriele Bonomi',
              ruolo: 'Head of Regulatory & DNSH Compliance',
              qualifica: 'Esperto in normativa ambientale e aiuti di Stato UE',
              initials: 'GB'
            }
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#D3E0FF] p-6 text-center shadow-xs hover:border-[#1F299C] transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-[#1F299C]/10 text-[#1F299C] font-bold text-lg flex items-center justify-center mx-auto mb-4 border border-[#D3E0FF]">
                {member.initials}
              </div>
              <h3 className="font-heading text-base font-bold text-[#0A0045]">{member.nome}</h3>
              <div className="text-xs font-semibold text-[#1F299C] mt-0.5">{member.ruolo}</div>
              <div className="text-xs text-[#5C6E82] mt-2 leading-relaxed">{member.qualifica}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditations Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white rounded-2xl border border-[#D3E0FF] p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-[#1F299C] uppercase tracking-wider">CONFORMITÀ &amp; CERTIFICAZIONI</span>
              <h3 className="font-heading text-xl font-bold text-[#0A0045]">
                Partner Ufficiali per la Transizione Digitale
              </h3>
              <p className="text-xs text-[#5C6E82] max-w-xl">
                Accreditati presso i registri nazionali di trasparenza, con procedure conformi ISO 9001:2015 per la gestione della progettazione e rendicontazione dei contributi pubblici.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF] text-xs font-semibold text-[#0A0045]">
                Registro Trasparenza UE
              </span>
              <span className="px-4 py-2 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF] text-xs font-semibold text-[#0A0045]">
                Convenzione ODCEC
              </span>
              <span className="px-4 py-2 rounded-lg bg-[#F7FAFF] border border-[#D3E0FF] text-xs font-semibold text-[#0A0045]">
                Certificatori GSE DM 5.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white rounded-2xl border border-[#D3E0FF] p-8 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-heading text-2xl font-bold text-[#0A0045]">
              Richiedi un Contatto con i Nostri Esperti
            </h2>
            <p className="text-xs text-[#5C6E82] mt-2">
              Compila il modulo per essere ricontattato entro 24 ore dal responsabile della sede più vicina alla tua azienda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Es. Mario Rossi"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-xs text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Ragione Sociale Impresa / Ente *
                </label>
                <input
                  type="text"
                  required
                  value={formData.azienda}
                  onChange={(e) => setFormData({ ...formData, azienda: e.target.value })}
                  placeholder="Es. Officine Meccaniche S.p.A."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-xs text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Email Aziendale *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="mario.rossi@azienda.it"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-xs text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Recapito Telefonico *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="+39 02 1234567"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-xs text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                Oggetto della Richiesta o Progetto di Investimento
              </label>
              <textarea
                rows={3}
                value={formData.messaggio}
                onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                placeholder="Descrivi brevemente l'investimento previsto (es. acquisto macchinari 4.0, impianto fotovoltaico, software AI)..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-xs text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#1F299C] hover:bg-[#161E75] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Invia Richiesta di Contatto
            </button>

            {contactSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                Grazie! La tua richiesta è stata presa in carico. Un consulente ti contatterà al più presto.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
