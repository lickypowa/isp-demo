import React, { useState } from 'react';
import { ViewMode } from '../types';
import {
  ShieldCheck,
  Lock,
  Mail,
  Building,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronLeft
} from 'lucide-react';

interface AuthViewsProps {
  mode: 'login' | 'register' | 'recupero-password';
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess?: (role: 'client' | 'admin') => void;
}

export const AuthViews: React.FC<AuthViewsProps> = ({
  mode,
  onNavigate,
  onLoginSuccess
}) => {
  // Login State
  const [loginMethod, setLoginMethod] = useState<'credenziali' | 'spid'>('credenziali');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register State
  const [regRole, setRegRole] = useState<'impresa' | 'partner' | 'pa'>('impresa');
  const [regName, setRegName] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regVat, setRegVat] = useState('');
  const [regAteco, setRegAteco] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Recovery State
  const [recEmail, setRecEmail] = useState('');
  const [recSent, setRecSent] = useState(false);

  // Simulated Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If login is backoffice admin test or normal
    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('isp')) {
      onLoginSuccess ? onLoginSuccess('admin') : onNavigate('backoffice-utenti');
    } else {
      onLoginSuccess ? onLoginSuccess('client') : onNavigate('customer-progetti');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Per proseguire è necessario accettare i termini di servizio e l’informativa privacy.');
      return;
    }
    alert('Registrazione completata con successo! Benvenuto in Innovation Smart Plaza.');
    onLoginSuccess ? onLoginSuccess('client') : onNavigate('customer-progetti');
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1F299C] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            ISP
          </div>
          <div className="text-left leading-none">
            <span className="font-heading font-extrabold text-lg text-[#0A0045] block">
              INNOVATION
            </span>
            <span className="font-heading font-light text-xs text-[#1F299C] tracking-widest block">
              SMART PLAZA
            </span>
          </div>
        </div>

        <h2 className="text-center font-heading text-2xl font-extrabold text-[#0A0045]">
          {mode === 'login' && 'Accedi alla Piattaforma'}
          {mode === 'register' && 'Crea il tuo Account ISP'}
          {mode === 'recupero-password' && 'Recupera Password'}
        </h2>
        <p className="mt-1 text-center text-xs text-[#5C6E82]">
          {mode === 'login' && 'Portale unico per Imprese, Pubbliche Amministrazioni e Partner'}
          {mode === 'register' && 'Inizia subito a monitorare i bandi e a verificare l’ammissibilità'}
          {mode === 'recupero-password' && 'Inserisci l’email con cui ti sei registrato per ricevere il link di ripristino'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-[#D3E0FF] shadow-xs">
          {/* Quick Switch for testing roles */}
          <div className="mb-6 p-2.5 bg-[#F7FAFF] rounded-lg border border-[#D3E0FF] flex items-center justify-between text-xs">
            <span className="text-[#5C6E82] font-medium">Accesso rapido dimostrativo:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setEmail('cliente@impresa.it');
                  setPassword('Password123!');
                  onLoginSuccess ? onLoginSuccess('client') : onNavigate('customer-progetti');
                }}
                className="px-2.5 py-1 rounded bg-[#1F299C]/10 text-[#1F299C] font-semibold hover:bg-[#1F299C]/20 cursor-pointer"
              >
                Impresa Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@innovationsmartplaza.it');
                  setPassword('Admin2025!');
                  onLoginSuccess ? onLoginSuccess('admin') : onNavigate('backoffice-utenti');
                }}
                className="px-2.5 py-1 rounded bg-[#0A0045] text-white font-semibold hover:bg-[#161E75] cursor-pointer"
              >
                Back Office
              </button>
            </div>
          </div>

          {/* VIEW: LOGIN */}
          {mode === 'login' && (
            <div>
              {/* Method Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setLoginMethod('credenziali')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    loginMethod === 'credenziali'
                      ? 'border-[#1F299C] bg-[#1F299C]/5 text-[#1F299C]'
                      : 'border-[#D3E0FF] text-[#5C6E82] hover:bg-slate-50'
                  }`}
                >
                  Email &amp; Password
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('spid')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    loginMethod === 'spid'
                      ? 'border-[#1F299C] bg-[#1F299C]/5 text-[#1F299C]'
                      : 'border-[#D3E0FF] text-[#5C6E82] hover:bg-slate-50'
                  }`}
                >
                  Entra con SPID / CIE
                </button>
              </div>

              {loginMethod === 'credenziali' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                      Email Aziendale
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8FA3BF] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nome@azienda.it"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-[#0A0045]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => onNavigate('recupero-password')}
                        className="text-xs text-[#1F299C] hover:underline"
                      >
                        Password dimenticata?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8FA3BF] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-9 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA3BF] hover:text-[#0A0045]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-[#364349] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded text-[#1F299C] focus:ring-[#1F299C]"
                      />
                      <span>Ricorda le credenziali</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1F299C] hover:bg-[#161E75] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Accedi al Portale</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* SPID / CIE Login UI */
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 leading-relaxed">
                    Accesso federato SPID di Livello 2 per i legali rappresentanti di Imprese e referenti della Pubblica Amministrazione.
                  </div>
                  <button
                    type="button"
                    onClick={() => onLoginSuccess ? onLoginSuccess('client') : onNavigate('customer-progetti')}
                    className="w-full py-3 px-4 rounded-xl bg-[#0066CC] hover:bg-[#004C99] text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="font-extrabold tracking-wider font-mono">SPID</span>
                    <span>Entra con SPID</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onLoginSuccess ? onLoginSuccess('client') : onNavigate('customer-progetti')}
                    className="w-full py-3 px-4 rounded-xl bg-[#0A3D62] hover:bg-[#082D49] text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="font-extrabold tracking-wider font-mono">CIE</span>
                    <span>Entra con Carta d&apos;Identità Elettronica</span>
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-[#D3E0FF]/60 text-center">
                <span className="text-xs text-[#5C6E82]">Non possiedi ancora un account? </span>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="text-xs font-bold text-[#1F299C] hover:underline"
                >
                  Registrati gratuitamente
                </button>
              </div>
            </div>
          )}

          {/* VIEW: REGISTER */}
          {mode === 'register' && (
            <div>
              {/* Role Type Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#0A0045] mb-2">
                  Tipologia di Profilo:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('impresa')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer text-center ${
                      regRole === 'impresa'
                        ? 'border-[#1F299C] bg-[#1F299C]/5 text-[#1F299C]'
                        : 'border-[#D3E0FF] text-[#5C6E82]'
                    }`}
                  >
                    Impresa / PMI
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('partner')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer text-center ${
                      regRole === 'partner'
                        ? 'border-[#1F299C] bg-[#1F299C]/5 text-[#1F299C]'
                        : 'border-[#D3E0FF] text-[#5C6E82]'
                    }`}
                  >
                    Partner / Perito
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('pa')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer text-center ${
                      regRole === 'pa'
                        ? 'border-[#1F299C] bg-[#1F299C]/5 text-[#1F299C]'
                        : 'border-[#D3E0FF] text-[#5C6E82]'
                    }`}
                  >
                    Ente Pubblico
                  </button>
                </div>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Nome e Cognome Referente *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                      Ragione Sociale *
                    </label>
                    <input
                      type="text"
                      required
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="Azienda S.r.l."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                      Partita IVA *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={11}
                      value={regVat}
                      onChange={(e) => setRegVat(e.target.value)}
                      placeholder="01234567890"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Codice ATECO Primario (Opzionale per radar bandi)
                  </label>
                  <input
                    type="text"
                    value={regAteco}
                    onChange={(e) => setRegAteco(e.target.value)}
                    placeholder="Es. 62.01 o 28.99"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Email di Accesso *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="referente@azienda.it"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Password (Minimo 8 caratteri) *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2 text-xs text-[#364349] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="rounded text-[#1F299C] focus:ring-[#1F299C] mt-0.5"
                    />
                    <span>
                      Dichiaro di aver preso visione dell&apos;Informativa Privacy e accetto i Termini di Servizio di Innovation Smart Plaza.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 px-4 rounded-xl bg-[#E8590C] hover:bg-[#CF4D07] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  Completa Registrazione Gratuita
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#D3E0FF]/60 text-center">
                <span className="text-xs text-[#5C6E82]">Hai già un account registrato? </span>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-xs font-bold text-[#1F299C] hover:underline"
                >
                  Accedi
                </button>
              </div>
            </div>
          )}

          {/* VIEW: RECUPERO PASSWORD */}
          {mode === 'recupero-password' && (
            <div className="space-y-4">
              {!recSent ? (
                <form onSubmit={handleRecoverySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                      Indirizzo Email dell&apos;Account
                    </label>
                    <input
                      type="email"
                      required
                      value={recEmail}
                      onChange={(e) => setRecEmail(e.target.value)}
                      placeholder="nome@azienda.it"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1F299C] hover:bg-[#161E75] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                  >
                    Invia Link di Ripristino
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0A0045]">
                    Email Inviata!
                  </h3>
                  <p className="text-xs text-[#5C6E82] leading-relaxed">
                    Abbiamo inviato un messaggio a <strong className="text-[#0A0045]">{recEmail}</strong> contenente le istruzioni e il link sicuro per impostare una nuova password.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-[#D3E0FF]/60 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-xs font-semibold text-[#1F299C] hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Torna alla schermata di accesso</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
