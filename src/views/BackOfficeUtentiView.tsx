import React, { useState } from 'react';
import { Utente, UserRole, ViewMode } from '../types';
import { initialUtenti } from '../data/mockData';
import {
  Users,
  UserPlus,
  Search,
  Download,
  Star,
  Shield,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Mail,
  Filter
} from 'lucide-react';

interface BackOfficeUtentiViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const BackOfficeUtentiView: React.FC<BackOfficeUtentiViewProps> = ({ onNavigate }) => {
  const [utenti, setUtenti] = useState<Utente[]>(initialUtenti);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('Tutti');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Utente | null>(null);

  // New user form state
  const [newNome, setNewNome] = useState('');
  const [newCognome, setNewCognome] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRagioneSociale, setNewRagioneSociale] = useState('');
  const [newRuolo, setNewRuolo] = useState<UserRole>('Referente Impresa');

  const toggleStar = (id: string) => {
    setUtenti(
      utenti.map((u) => (u.id === id ? { ...u, isStarred: !u.isStarred } : u))
    );
  };

  const filteredUtenti = utenti.filter((u) => {
    const matchesRole = roleFilter === 'Tutti' || u.ruolo === roleFilter;
    const matchesSearch =
      u.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.cognome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.ragioneSociale.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.userCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: Utente = {
      id: `usr-${Date.now()}`,
      userCode: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      nome: newNome,
      cognome: newCognome,
      email: newEmail,
      ragioneSociale: newRagioneSociale,
      dataCreazione: new Date().toLocaleDateString('it-IT'),
      ruolo: newRuolo,
      stato: 'Attivo',
      avatarInitials: `${newNome[0] || 'U'}${newCognome[0] || 'S'}`.toUpperCase()
    };
    setUtenti([newUser, ...utenti]);
    setShowAddModal(false);
    setNewNome('');
    setNewCognome('');
    setNewEmail('');
    setNewRagioneSociale('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-[#0A0045]">
            Gestione Utenti &amp; Team ISP
          </h1>
          <p className="text-xs text-[#5C6E82] mt-1">
            Amministrazione degli account abilitati alla piattaforma, permessi e ruoli operativi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Download archivio utenti CSV generato!')}
            className="px-3.5 py-2 rounded-lg border border-[#D3E0FF] bg-white hover:bg-[#F7FAFF] text-[#283759] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#1F299C]" />
            <span>Esporta CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Nuovo Utente</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">Utenti Registrati</div>
          <div className="text-2xl font-extrabold text-[#0A0045] font-heading mt-1">
            {utenti.length + 135}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">+18 nell&apos;ultimo mese</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">Consulenti ISP</div>
          <div className="text-2xl font-extrabold text-[#1F299C] font-heading mt-1">
            14 Desk
          </div>
          <div className="text-[11px] text-[#5C6E82] mt-1">Milano &amp; Brindisi Hub</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">Partner Accreditati</div>
          <div className="text-2xl font-extrabold text-[#E8590C] font-heading mt-1">
            42 Studi
          </div>
          <div className="text-[11px] text-[#E8590C] font-semibold mt-1">2 in attesa di firma</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs">
          <div className="text-xs text-[#5C6E82] font-semibold uppercase">Conformità 2FA</div>
          <div className="text-2xl font-extrabold text-emerald-600 font-heading mt-1">
            96.8%
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">Accesso sicuro SPID/OTP</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#D3E0FF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          <span className="text-xs font-bold text-[#5C6E82] uppercase mr-1">Ruolo:</span>
          {[
            'Tutti',
            'Referente Impresa',
            'Consulente ISP',
            'Partner Accreditato',
            'Super Admin'
          ].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                roleFilter === role
                  ? 'bg-[#1F299C] text-white shadow-xs'
                  : 'bg-[#F7FAFF] text-[#283759] hover:bg-[#D3E0FF]/40 border border-[#D3E0FF]/60'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8FA3BF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca per nome, email o CF..."
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
                <th className="py-3 px-3 w-8"></th>
                <th className="py-3 px-3 font-bold text-[#0A0045] uppercase">Codice</th>
                <th className="py-3 px-4 font-bold text-[#0A0045] uppercase">Utente</th>
                <th className="py-3 px-4 font-bold text-[#0A0045] uppercase">Ragione Sociale / Ente</th>
                <th className="py-3 px-4 font-bold text-[#0A0045] uppercase">Data Creazione</th>
                <th className="py-3 px-4 font-bold text-[#0A0045] uppercase">Ruolo</th>
                <th className="py-3 px-4 font-bold text-[#0A0045] uppercase">Stato</th>
                <th className="py-3 px-4 font-bold text-[#0A0045] uppercase text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D3E0FF]/60 text-[#364349]">
              {filteredUtenti.map((user) => (
                <tr key={user.id} className="hover:bg-[#F7FAFF]/80 transition-colors">
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggleStar(user.id)}
                      className="text-slate-300 hover:text-amber-400 cursor-pointer"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          user.isStarred ? 'text-amber-400 fill-amber-400' : ''
                        }`}
                      />
                    </button>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] font-bold text-[#1F299C]">
                    {user.userCode}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#1F299C]/10 text-[#1F299C] font-bold text-xs flex items-center justify-center shrink-0">
                        {user.avatarInitials}
                      </div>
                      <div>
                        <div className="font-bold text-[#0A0045]">
                          {user.nome} {user.cognome}
                        </div>
                        <div className="text-[11px] text-[#5C6E82]">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-medium text-[#0A0045]">
                    {user.ragioneSociale}
                  </td>

                  <td className="py-3 px-4 text-[#5C6E82]">
                    {user.dataCreazione}
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#1F299C]/10 text-[#1F299C]">
                      {user.ruolo}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        user.stato === 'Attivo'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {user.stato}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => alert(`Dettagli utente ${user.nome} ${user.cognome}`)}
                      className="px-2.5 py-1 rounded bg-[#F7FAFF] hover:bg-slate-200 text-[#283759] text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Gestisci
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Nuovo Utente */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#D3E0FF]">
              <h3 className="font-heading text-lg font-bold text-[#0A0045]">
                Crea Nuovo Account Utente
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-[#0A0045] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={newNome}
                    onChange={(e) => setNewNome(e.target.value)}
                    placeholder="Mario"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCognome}
                    onChange={(e) => setNewCognome(e.target.value)}
                    placeholder="Rossi"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Email Aziendale *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="mario.rossi@azienda.it"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Ragione Sociale / Ente *
                </label>
                <input
                  type="text"
                  required
                  value={newRagioneSociale}
                  onChange={(e) => setNewRagioneSociale(e.target.value)}
                  placeholder="Officine Meccaniche S.r.l."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0045] mb-1">
                  Ruolo Assegnato *
                </label>
                <select
                  value={newRuolo}
                  onChange={(e) => setNewRuolo(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
                >
                  <option value="Referente Impresa">Referente Impresa</option>
                  <option value="Consulente ISP">Consulente ISP</option>
                  <option value="Partner Accreditato">Partner Accreditato</option>
                  <option value="Ente Pubblico">Ente Pubblico</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#D3E0FF] text-[#283759] text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Conferma Creazione
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
