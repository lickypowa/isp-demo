export type ViewMode =
  | 'home'
  | 'bandi'
  | 'categoria-innovazione'
  | 'bando-detail'
  | 'piani'
  | 'blog'
  | 'chi-siamo'
  | 'login'
  | 'register'
  | 'recupero-password'
  | 'customer-progetti'
  | 'customer-progetto-detail'
  | 'customer-profilo'
  | 'backoffice-utenti'
  | 'backoffice-partner';

export type UserRole =
  | 'Referente Impresa'
  | 'Consulente ISP'
  | 'Partner Accreditato'
  | 'Super Admin'
  | 'Ente Pubblico';

export interface Bando {
  id: string;
  code: string;
  title: string;
  ente: string;
  enteType: 'MIMIT' | 'Invitalia' | 'SIMEST' | 'Regione Lombardia' | 'Regione Puglia' | 'MUR' | 'Unioncamere';
  status: 'Aperto' | 'In apertura' | 'In scadenza' | 'Scaduto';
  programma: string;
  dotazione: string;
  dotazioneVal: number;
  dataApertura: string;
  termineScadenza: string;
  formaAgevolazione: string;
  finalita: string;
  descrizione: string;
  soggetti: string;
  settore: string;
  spesaMinima?: string;
  spesaMassima?: string;
  regimeAiuto?: string;
  codiciAteco?: string[];
  premialita?: string[];
  allegati?: { name: string; size: string }[];
  isFeatured?: boolean;
}

export interface Progetto {
  id: string;
  codiceFascicolo: string;
  titolo: string;
  misura: string;
  cliente: string;
  enteGestore: 'MIMIT' | 'Invitalia' | 'SIMEST' | 'Regione';
  importoAgevolabile: string;
  tipoContributo: string;
  deskIsp: string;
  prossimaScadenza: string;
  scadenzaNote?: string;
  stato: 'In Lavorazione (Fase Istruttoria)' | 'Completato (Erogato)' | 'In attesa graduatoria' | 'Invio 1° SAL';
  messaggi: {
    id: string;
    sender: string;
    senderRole: string;
    text: string;
    time: string;
    isClient: boolean;
    attachment?: string;
  }[];
  documenti: {
    id: string;
    name: string;
    size: string;
    date: string;
    type: 'pdf' | 'xlsx' | 'doc';
  }[];
  noteInterne: {
    id: string;
    category: string;
    title: string;
    text: string;
    author: string;
    date: string;
  }[];
  scadenze: {
    id: string;
    date: string;
    title: string;
    note: string;
    type: 'video' | 'deadline';
  }[];
}

export interface Utente {
  id: string;
  userCode: string;
  nome: string;
  cognome: string;
  email: string;
  ragioneSociale: string;
  dataCreazione: string;
  ruolo: UserRole;
  stato: 'Attivo' | 'In attesa verifica' | 'Sospeso';
  avatarInitials: string;
  isStarred?: boolean;
}

export interface PartnerRichiesta {
  id: string;
  codiceRichiesta: string;
  studio: string;
  referente: string;
  albo: string;
  piva: string;
  sede: string;
  dataRichiesta: string;
  documentiCount: number;
  tipoConvenzione: string;
  splitProvvigionale: string;
  statoAml: string;
  ordineODCEC: string;
  polizzaRC: string;
  antiriciclaggio: string;
  firmaDigitale: 'Attesa Firma' | 'Firmato' | 'Rifiutato';
  stato: 'In attesa' | 'Approvato' | 'Rifiutato' | 'Chiarimenti';
}

export interface ArticoloOsservatorio {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  badge?: string;
  summary: string;
  author: string;
  authorRole: string;
  authorInitials: string;
  imageTag?: string;
  featured?: boolean;
}
