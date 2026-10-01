import React, { useState } from 'react';
import { ArticoloOsservatorio, ViewMode } from '../types';
import { initialArticoliOsservatorio } from '../data/mockData';
import {
  ChevronRight,
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Mail,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface BlogViewProps {
  onNavigate: (view: ViewMode) => void;
  articles?: ArticoloOsservatorio[];
}

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigate,
  articles = initialArticoliOsservatorio
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<ArticoloOsservatorio | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const categories = [
    'Tutti',
    'Transizione 5.0',
    'PNRR & Mezzogiorno',
    'Export & SIMEST',
    'Crediti d’Imposta',
    'Rendicontazione'
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'Tutti' || art.category === selectedCategory;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setEmailSubscribed(true);
      setTimeout(() => setEmailSubscribed(false), 4000);
      setNewsletterEmail('');
    }
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
            <span className="text-[#0A0045] font-semibold">Osservatorio &amp; Normativa</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-[#D3E0FF] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F299C] uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>OSSERVATORIO ISP NORMATIVA &amp; AGEVOLAZIONI</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0A0045] tracking-tight">
                Guide Tecniche, Decreti e Circolari
              </h1>
              <p className="text-sm sm:text-base text-[#364349] max-w-2xl mt-2 leading-relaxed">
                Aggiornamenti continui a cura dell&apos;Ufficio Studi e Periti di Innovation Smart Plaza su Transizione 5.0, bandi PNRR e prassi fiscali dell&apos;Agenzia delle Entrate.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#8FA3BF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca negli articoli..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D3E0FF] bg-[#F7FAFF] text-[#0A0045] focus:outline-hidden focus:border-[#1F299C] focus:bg-white"
              />
            </div>
          </div>

          {/* Categories Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1F299C] text-white shadow-xs'
                    : 'bg-[#F7FAFF] border border-[#D3E0FF] text-[#283759] hover:bg-[#D3E0FF]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Featured Article Card */}
        {featuredArticle && selectedCategory === 'Tutti' && !searchQuery && (
          <div className="mb-12 bg-white rounded-2xl border border-[#D3E0FF] overflow-hidden shadow-xs hover:border-[#1F299C] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8590C]/10 text-[#E8590C]">
                      IN PRIMO PIANO
                    </span>
                    <span className="text-xs font-semibold text-[#1F299C] bg-[#1F299C]/10 px-2.5 py-0.5 rounded-full">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0A0045] leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm text-[#364349] leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D3E0FF]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1F299C] text-white font-bold text-xs flex items-center justify-center">
                      {featuredArticle.authorInitials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A0045]">{featuredArticle.author}</div>
                      <div className="text-xs text-[#5C6E82]">{featuredArticle.authorRole}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#5C6E82]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                    </span>
                    <button
                      onClick={() => setActiveArticle(featuredArticle)}
                      className="px-4 py-2 rounded-lg bg-[#1F299C] hover:bg-[#161E75] text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Leggi guida</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#0A0045] to-[#1F299C] p-8 flex flex-col justify-between text-white relative">
                <div className="space-y-4">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    ANALISI CIRCOLARE GSE &amp; MIMIT
                  </div>
                  <h3 className="font-heading text-xl font-bold leading-snug">
                    Requisiti di Risparmio Energetico 5.0: Guida al Calcolo Ex-Ante
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Analisi della modulistica ufficiale, attestazioni richieste e modalità di trasmissione delle comunicazioni preliminari sulla piattaforma GSE.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between text-xs text-white/70">
                  <span>Data: {featuredArticle.date}</span>
                  <span className="font-mono">ID: ART-2025-09</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-xl border border-[#D3E0FF] p-6 shadow-xs hover:border-[#1F299C] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1F299C] bg-[#1F299C]/10 px-2.5 py-0.5 rounded-full">
                    {art.category}
                  </span>
                  <span className="text-[#5C6E82] flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {art.date}
                  </span>
                </div>

                <h3 className="font-heading text-base sm:text-lg font-bold text-[#0A0045] leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#364349] leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D3E0FF]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-[#0A0045] font-bold text-xs flex items-center justify-center border border-[#D3E0FF]">
                    {art.authorInitials}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-[#0A0045] truncate max-w-[120px]">{art.author}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(art)}
                  className="text-xs font-bold text-[#1F299C] hover:text-[#0A0045] flex items-center gap-1 cursor-pointer"
                >
                  <span>Approfondisci</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup Box */}
        <div className="mt-16 bg-gradient-to-r from-[#0A0045] to-[#1F299C] rounded-2xl p-8 sm:p-12 text-white shadow-md">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-white/10 mb-2">
              <Mail className="w-6 h-6 text-amber-300" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold">
              Resta sempre aggiornato sui nuovi bandi
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Ricevi ogni venerdì la circolare con le graduatorie approvate, i bandi in apertura la settimana successiva e le istruzioni operative dei nostri periti.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Inserisci la tua email aziendale..."
                className="flex-1 px-4 py-3 rounded-xl bg-white text-[#0A0045] text-xs sm:text-sm placeholder:text-slate-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#E8590C] hover:bg-[#CF4D07] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Iscriviti Gratuitamente
              </button>
            </form>

            {emailSubscribed && (
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-300 pt-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                Iscrizione avvenuta con successo! Controlla la tua casella di posta.
              </div>
            )}
            <div className="text-[11px] text-white/60">
              Nessun invio di spam. Puoi cancellare l&apos;iscrizione in qualsiasi momento con un clic.
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-[#0A0045] hover:bg-slate-100 cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F299C]">
                <Tag className="w-3.5 h-3.5" />
                <span>{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>Tempo di lettura: {activeArticle.readTime}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0A0045] leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 py-3 border-y border-[#D3E0FF]/60">
                <div className="w-10 h-10 rounded-full bg-[#1F299C] text-white font-bold text-xs flex items-center justify-center">
                  {activeArticle.authorInitials}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0045]">{activeArticle.author}</div>
                  <div className="text-xs text-[#5C6E82]">{activeArticle.authorRole}</div>
                </div>
              </div>

              <div className="text-sm text-[#364349] space-y-4 leading-relaxed pt-2">
                <p className="font-semibold text-base text-[#0A0045]">
                  {activeArticle.summary}
                </p>
                <p>
                  Nel contesto delle più recenti disposizioni applicative emanate dal Ministero delle Imprese e del Made in Italy (MIMIT), l&apos;accesso ai crediti d&apos;imposta e ai contributi a fondo perduto richiede una rigorosa perizia asseverata preventiva ex-ante e consuntiva ex-post rilasciata da un valutatore abilitato.
                </p>
                <p>
                  Particolare rilievo assumono i criteri di ammissibilità degli investimenti in beni immateriali 4.0 (software di processo, piattaforme cloud analitiche, sistemi di intelligenza artificiale integrati nei macchinari di reparto) e l&apos;osservanza del principio DNSH (Do No Significant Harm) per la riduzione certificata dei consumi di energia primaria di almeno il 5% per l&apos;intera struttura o del 10% per il singolo processo produttivo interessato.
                </p>
                <p>
                  Innovation Smart Plaza mette a disposizione dei propri clienti e partner accreditati il format preimpostato di asseverazione tecnica conforme alle circolari GSE e le linee guida per la verifica preventiva del Registro Nazionale Aiuti (RNA).
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#D3E0FF] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => onNavigate('bandi')}
                  className="px-4 py-2 rounded-lg bg-[#1F299C] text-white text-xs font-bold hover:bg-[#161E75] cursor-pointer"
                >
                  Consulta i bandi correlati
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-lg border border-[#D3E0FF] text-[#283759] text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Chiudi articolo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
