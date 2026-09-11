import React, { useState, useRef, useEffect } from 'react';
import { SupportedLanguage, UserProfile, LiveAlert } from '../types';
import { 
  Bell, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  Menu, 
  X, 
  PhoneCall, 
  Shield, 
  ExternalLink,
  Languages,
  Clock,
  Radio,
  ArrowRight,
  WifiOff,
  AlertTriangle
} from 'lucide-react';
import { useTranslation } from '../data/translations';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  unreadNotifsCount: number;
  currentUser?: UserProfile | null;
  networkStatus?: 'online' | 'degraded' | 'offline';
  latestToastMessage?: string | null;
  latestAlert?: LiveAlert | null;
  tickerMessage?: string;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

// State Emblem of India SVG Component
export const NationalEmblemSvg: React.FC<{ className?: string }> = ({ className = "h-11 w-auto" }) => (
  <svg 
    viewBox="0 0 100 130" 
    className={className} 
    fill="currentColor" 
    aria-label="State Emblem of India"
    role="img"
  >
    {/* Central & Side Lion Heads */}
    <path d="M50 4 C46 4 43 7 42 10 C39 9 34 11 32 15 C30 19 31 23 33 26 C30 28 28 32 29 36 C30 40 33 43 37 45 C37 49 40 53 44 55 C43 58 43 62 45 65 C41 66 38 69 38 73 L62 73 C62 69 59 66 55 65 C57 62 57 58 56 55 C60 53 63 49 63 45 C67 43 70 40 71 36 C72 32 70 28 67 26 C69 23 70 19 68 15 C66 11 61 9 58 10 C57 7 54 4 50 4 Z" fill="#1e3a8a" />
    {/* Lion Details: Eyes, Mane contours */}
    <circle cx="45" cy="22" r="2" fill="#ffffff" />
    <circle cx="55" cy="22" r="2" fill="#ffffff" />
    <path d="M47 28 Q50 31 53 28" stroke="#ffffff" strokeWidth="1.5" fill="none" />
    <path d="M44 38 Q50 42 56 38" stroke="#ffffff" strokeWidth="1.5" fill="none" />
    {/* Side Lions */}
    <circle cx="34" cy="24" r="1.5" fill="#ffffff" />
    <circle cx="66" cy="24" r="1.5" fill="#ffffff" />
    {/* Abacus / Base Platform */}
    <rect x="24" y="74" width="52" height="6" rx="1.5" fill="#1e3a8a" />
    {/* Ashoka Chakra Wheel in Center of Abacus */}
    <circle cx="50" cy="88" r="8" fill="none" stroke="#1e3a8a" strokeWidth="1.8" />
    <circle cx="50" cy="88" r="2" fill="#1e3a8a" />
    {/* 16 / 24 Spokes representation */}
    <path d="M50 80 L50 96 M42 88 L58 88 M44 82 L56 94 M44 94 L56 82 M47 81 L53 95 M43 85 L57 91 M43 91 L57 85 M47 95 L53 81" stroke="#1e3a8a" strokeWidth="0.9" />
    {/* Left Animal (Galloping Horse) & Right Animal (Bull) Silhouettes */}
    <path d="M26 84 C28 82 32 83 34 86 C32 89 28 90 26 87 Z" fill="#1e3a8a" />
    <path d="M74 84 C72 82 68 83 66 86 C68 89 72 90 74 87 Z" fill="#1e3a8a" />
    {/* Lower Pedestal Plinth */}
    <rect x="20" y="98" width="60" height="4" rx="1" fill="#1e3a8a" />
    <path d="M24 102 L76 102 L72 108 L28 108 Z" fill="#1e3a8a" />
    {/* Satyameva Jayate (सत्यमेव जयते) Inscription text block */}
    <text x="50" y="122" textAnchor="middle" fontSize="9.5" fontWeight="900" fontFamily="'Public Sans', serif, sans-serif" fill="#1e3a8a" letterSpacing="0.5">
      सत्यमेव जयते
    </text>
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  language: propLanguage,
  onLanguageChange: propOnLanguageChange,
  unreadNotifsCount,
  currentUser,
  networkStatus = 'online',
  latestToastMessage,
  latestAlert,
  tickerMessage,
  onOpenNotifications,
  onOpenProfile,
  onOpenSettings,
  onLogout
}) => {
  const { language: contextLanguage, setLanguage, t } = useTranslation();
  const currentLanguage = propLanguage || contextLanguage;
  const user = currentUser || {
    name: 'Er. Rajeshwar Sharma',
    officialId: 'GOI-NER-SDMA-9942',
    email: 'dm-east@sikkim.gov.in',
    role: 'SDMA Administrator',
    designation: 'Director, Emergency Operations Centre',
    department: 'MDoNER / NDMA Control',
    jurisdiction: 'East District & NH-10 Corridor',
    clearanceLevel: 'National Level 4 (Full Dispatch & Evac)',
    phone: '+91-3592-202201 (Ext. 104)',
    avatarInitials: 'RS'
  };
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (propOnLanguageChange) {
      propOnLanguageChange(lang);
    }
  };

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg'>('md');

  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Live IST Time Clock
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      };
      setIstTime(now.toLocaleString('en-IN', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-Time Central Ticker Synchronization
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [currentTickerText, setCurrentTickerText] = useState<string>(
    'LIVE UPDATE: Heavy rain warning triggered in Sikkim • NH-10 Status: Monitored'
  );

  const baseTickerItems = [
    'LIVE UPDATE: Heavy rain warning triggered in Sikkim • NH-10 Status: Monitored',
    'IN-SITU TELEMETRY: 28 Inclinometers transmitting • Slope Saturation: Critical (88%)',
    'IMD DOPPLER GRID: Orange Alert in Mangan & Gangtok corridors • 24h Rain: 142mm',
    'BRO HIGHWAY DESK: Rangpo-Singtam axis open with quick-reaction earthmovers deployed',
    'GSI & NESAC SATELLITE: InSAR interferometric slope deformation scan within limits'
  ];

  useEffect(() => {
    if (tickerMessage) {
      setCurrentTickerText(tickerMessage);
      return;
    }
    if (latestToastMessage) {
      setCurrentTickerText(`LATEST UPDATE: ${latestToastMessage}`);
      return;
    }
    if (networkStatus === 'offline') {
      setCurrentTickerText('OFFLINE MESH: Operating on cached satellite buffers • Local packets ready');
      return;
    }
    if (networkStatus === 'degraded') {
      setCurrentTickerText('DEGRADED MESH: Elevated packet latency on remote hill LoRaWAN nodes');
      return;
    }
    if (latestAlert && latestAlert.status === 'Active') {
      const alertMsg = `CRITICAL ALERT: ${latestAlert.title} in ${latestAlert.district} • ${latestAlert.actionRequired || 'Advisory Enforced'}`;
      const pool = [alertMsg, ...baseTickerItems];
      setCurrentTickerText(pool[tickerIndex % pool.length]);
    } else {
      setCurrentTickerText(baseTickerItems[tickerIndex % baseTickerItems.length]);
    }
  }, [tickerIndex, tickerMessage, latestToastMessage, networkStatus, latestAlert]);

  // Interval timer for message rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Role-Based Navigation Items
  const isCitizen = user.role === 'Citizen / General Public' || user.role === 'Public / Observer';
  const isNDRF = user.role === 'NDRF Field Officer';
  const isBRO = user.role === 'BRO Engineer';
  const isGSI = user.role === 'Geological Surveyor (GSI)';

  let rawNavItems = [
    { id: 'dashboard', label: t('navDashboard'), hindiLabel: 'डैशबोर्ड' },
    { id: 'risk-map', label: t('navRiskMap'), hindiLabel: 'जीआईएस मानचित्र' },
    { id: 'ai-predictions', label: t('navAiPredictions'), hindiLabel: 'एआई पूर्वानुमान' },
    { id: 'alerts', label: isCitizen ? 'Public Warnings' : t('navAlerts'), hindiLabel: isCitizen ? 'सार्वजनिक चेतावनी' : 'सक्रिय अलर्ट' },
    { id: 'field-reports', label: isCitizen ? 'Report Hazard' : t('navFieldReports'), hindiLabel: isCitizen ? 'नागरिक सूचना' : 'क्षेत्रीय रिपोर्ट' },
    { id: 'infrastructure', label: isBRO ? 'Highway & Bridges' : t('navInfrastructure'), hindiLabel: 'अवसंरचना' },
    { id: 'analytics', label: isGSI ? 'InSAR & Telemetry' : t('navAnalytics'), hindiLabel: 'विश्लेषिकी एवं XAI' }
  ];

  if (isCitizen) {
    rawNavItems = rawNavItems.filter(item => 
      ['dashboard', 'risk-map', 'alerts', 'field-reports'].includes(item.id)
    );
  } else if (isNDRF) {
    rawNavItems = rawNavItems.filter(item => 
      ['dashboard', 'alerts', 'field-reports', 'risk-map', 'infrastructure'].includes(item.id)
    );
  } else if (isBRO) {
    rawNavItems = rawNavItems.filter(item => 
      ['dashboard', 'infrastructure', 'risk-map', 'field-reports', 'alerts'].includes(item.id)
    );
  } else if (isGSI) {
    rawNavItems = rawNavItems.filter(item => 
      ['dashboard', 'analytics', 'risk-map', 'ai-predictions', 'infrastructure'].includes(item.id)
    );
  }

  const navItems = rawNavItems;

  const languages: SupportedLanguage[] = [
    'English',
    'Hindi',
    'Assamese',
    'Bengali',
    'Manipuri',
    'Mizo',
    'Khasi',
    'Garo',
    'Tripuri'
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-slate-200 shadow-xs">
      {/* 1. TOP OFFICIAL TRICOLOR ACCENT & GOI UTILITY BAR */}
      <div className="w-full bg-white border-b border-slate-200 text-slate-700 text-xs">
        {/* Subtle 2.5px Indian Tricolor Hairline */}
        <div className="h-[3px] w-full flex">
          <div className="w-1/3 bg-[#FF9933]"></div>
          <div className="w-1/3 bg-[#ffffff] border-y border-slate-200"></div>
          <div className="w-1/3 bg-[#138808]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium">
          {/* Left: Official Government of India Identification */}
          <div className="flex items-center gap-2.5 text-slate-700">
            <span className="font-bold text-slate-900 tracking-wide">भारत सरकार</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-800 font-semibold hidden xs:inline">Government of India</span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="text-slate-600 hidden md:inline">
              पूर्वोत्तर क्षेत्र विकास मंत्रालय (MDoNER) &amp; राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA)
            </span>
          </div>

          {/* Right: GoI Standard Controls (Helpline, Font Controls, Clock) */}
          <div className="flex items-center gap-3 text-[11px]">
            {/* Live IST Clock */}
            <div className="hidden sm:flex items-center gap-1 text-slate-500 font-mono text-[10px]">
              <Clock size={11} className="text-slate-400" />
              <span>{istTime || 'IST Live Clock'}</span>
            </div>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* 24x7 National Disaster Helpline */}
            <a 
              href="tel:1070" 
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-700 font-bold border border-red-200 transition-colors"
              title="State & National Disaster Operations Center 24x7 Helpline"
            >
              <PhoneCall size={11} className="text-red-600" />
              <span>हेल्पलाइन / Hotline: 1070 / 112</span>
            </a>

            {/* Accessibility Font Size Controls */}
            <div className="hidden md:flex items-center border border-slate-200 rounded overflow-hidden text-[10px] font-bold">
              <button 
                type="button" 
                onClick={() => setFontScale('sm')} 
                className={`px-1.5 py-0.5 hover:bg-slate-100 ${fontScale === 'sm' ? 'bg-slate-200 text-blue-900' : 'text-slate-600'}`}
                title="Decrease font size"
              >
                A-
              </button>
              <button 
                type="button" 
                onClick={() => setFontScale('md')} 
                className={`px-1.5 py-0.5 hover:bg-slate-100 border-x border-slate-200 ${fontScale === 'md' ? 'bg-slate-200 text-blue-900' : 'text-slate-600'}`}
                title="Default font size"
              >
                A
              </button>
              <button 
                type="button" 
                onClick={() => setFontScale('lg')} 
                className={`px-1.5 py-0.5 hover:bg-slate-100 ${fontScale === 'lg' ? 'bg-slate-200 text-blue-900' : 'text-slate-600'}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BILINGUAL AUTHORITY CREST, CENTRAL TICKER & TITLES */}
      <div className="bg-white border-b border-slate-200 w-full overflow-hidden">
        <div className="w-full max-w-full overflow-hidden flex items-center justify-between gap-2 px-3 py-2">
          {/* National Emblem & Department Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink min-w-0">
            <button
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-2.5 sm:gap-3.5 text-left focus:outline-hidden focus:ring-2 focus:ring-blue-900 rounded-lg p-0.5 group min-w-0 cursor-pointer"
              aria-label="NER-LEWS Portal Home"
            >
              {/* Official State Emblem of India */}
              <div className="shrink-0 flex items-center justify-center p-1 bg-white border border-slate-200 rounded-lg shadow-2xs group-hover:border-blue-900 transition-colors">
                <NationalEmblemSvg className="h-10 sm:h-12 w-auto text-blue-950" />
              </div>

              {/* Bilingual Official Department Title */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200 truncate">
                    राष्ट्रीय भूस्खलन पूर्व चेतावनी ग्रिड
                  </span>
                  <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>GSI &amp; ISRO Live Node Active</span>
                  </span>
                </div>

                <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight leading-tight mt-0.5 truncate">
                  NER-LEWS <span className="font-bold text-slate-700 font-serif">|</span> पूर्वोत्तर भूस्खलन पूर्व चेतावनी प्रणाली
                </h1>

                <p className="text-[11px] text-slate-600 font-medium leading-tight hidden sm:block mt-0.5 truncate">
                  North Eastern Region Landslide Early Warning System • Joint Framework of MDoNER, NDMA, GSI &amp; NESAC
                </p>
              </div>
            </button>
          </div>

          {/* 1. Header Center Ticker Bar (Desktop & Tablet) */}
          <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center max-w-md xl:max-w-xl mx-2 truncate">
            <div 
              role="button"
              tabIndex={0}
              onClick={() => onTabChange('alerts')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onTabChange('alerts'); }}
              className="w-full group cursor-pointer flex items-center justify-between gap-2.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs hover:bg-amber-200/90 transition-all min-w-0 truncate"
              title="Click to view Live Early Warning Alerts & Civil Defense Advisories"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
                {/* Pulsating Live Indicator Dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 animate-pulse"></span>
                </span>
                
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded shrink-0">
                  LIVE UPDATE
                </span>
                
                <span className="truncate text-xs font-bold text-amber-950 flex-1">
                  {currentTickerText}
                </span>
              </div>
              <ArrowRight size={12} className="text-amber-800 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Right Controls: Notifications, Regional Languages, Profile, Mobile Menu */}
          <div className="flex-shrink-0 flex items-center gap-2 max-w-full">
            {/* Notification Bell with Badge */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              aria-label={`Notifications, ${unreadNotifsCount} unread`}
              title="Disaster Bulletins & Field Warnings"
            >
              <Bell size={18} />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-600 text-white font-mono font-black text-[10px] rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Regional Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-800 hover:text-blue-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
                aria-expanded={isLangOpen}
                aria-label="Select Regional Language"
                title="Change Interface Language"
              >
                <Languages size={14} className="text-blue-900" />
                <span className="hidden md:inline text-slate-500 font-normal">भाषा / Lang:</span>
                <span>{currentLanguage}</span>
                <ChevronDown size={13} className={`text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span>क्षेत्रीय भाषाएँ (Languages)</span>
                    <GlobeIcon size={12} />
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        handleLanguageChange(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentLanguage === lang
                          ? 'font-bold text-blue-900 bg-blue-50/80'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang}</span>
                      {currentLanguage === lang && <CheckCircle2 size={13} className="text-blue-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authorized Officer Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 sm:pl-2 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                aria-expanded={isProfileOpen}
                aria-label="User Account Menu"
              >
                <div className="w-8 h-8 rounded-md bg-blue-900 text-white font-black text-xs flex items-center justify-center border border-blue-950 shadow-2xs">
                  {user.avatarInitials || 'GOI'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {user.name.split(',')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">
                    {user.role}
                  </div>
                </div>
                <ChevronDown size={13} className="text-slate-400 hidden md:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.designation}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[9px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 truncate">
                        {user.role}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                        Active EOC
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onOpenProfile();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <User size={14} className="text-slate-500" />
                      <span>{t('myProfile')}</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenSettings();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <Settings size={14} className="text-slate-500" />
                      <span>{t('systemSettings')}</span>
                    </button>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        onLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold cursor-pointer"
                    >
                      <LogOut size={14} className="text-red-500" />
                      <span>{t('signOut')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile / Tablet Ticker Strip */}
        <div className="lg:hidden w-full bg-amber-100/90 border-t border-amber-200 px-4 py-1.5 flex items-center justify-between gap-2 text-[11px] font-medium text-amber-950">
          <div 
            role="button"
            tabIndex={0}
            onClick={() => onTabChange('alerts')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onTabChange('alerts'); }}
            className="flex items-center gap-2 min-w-0 cursor-pointer w-full"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded shrink-0">
              LIVE
            </span>
            <span className="truncate text-[11px] font-bold text-amber-950 flex-1">
              {currentTickerText}
            </span>
            <ArrowRight size={11} className="text-amber-800 shrink-0" />
          </div>
        </div>
      </div>

      {/* 3. OFFICIAL DISASTER MANAGEMENT NAVIGATION TABS */}
      <div className="bg-white border-b border-slate-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-1" aria-label="Official Government Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative px-3.5 py-2.5 text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-blue-900 border-blue-900 bg-blue-50/50'
                      : 'text-slate-600 hover:text-blue-900 border-transparent hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl p-4 animate-in slide-in-from-top-2 duration-150">
          <div className="mb-2 pb-2 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
            <span>आपदा प्रबंधन नेविगेशन / Navigation</span>
            <span>8 NER States Active</span>
          </div>
          <nav className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-left text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div>{item.label}</div>
                  <div className={`text-[10px] font-normal ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                    {item.hindiLabel}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

// Mini helper icon
const GlobeIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

