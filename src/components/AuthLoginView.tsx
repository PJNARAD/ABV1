import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { 
  Shield, 
  Lock, 
  Mail, 
  UserCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Building2, 
  ArrowRight, 
  HelpCircle,
  Sparkles,
  KeyRound,
  Fingerprint,
  Layers,
  Globe2,
  HardHat,
  Users,
  Compass,
  AlertTriangle
} from 'lucide-react';

interface AuthLoginViewProps {
  onLogin: (user: UserProfile) => void;
  onShowToast: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

const PRESET_ACCOUNTS: Record<UserRole, UserProfile> = {
  'SDMA Administrator': {
    name: 'Er. Rajeshwar Sharma, IAS',
    officialId: 'GOI-NER-SDMA-9942',
    email: 'rajeshwar.sharma@sikkim.gov.in',
    role: 'SDMA Administrator',
    designation: 'Director, State Emergency Operations Centre',
    department: 'Dept. of Disaster Management, Govt. of Sikkim',
    jurisdiction: 'Sikkim & Northern West Bengal Corridor',
    clearanceLevel: 'Level 4 (Full Command & Evac Dispatch)',
    phone: '+91-3592-202201',
    avatarInitials: 'RS'
  },
  'NDRF Field Officer': {
    name: 'Insp. Vikram Rathore',
    officialId: 'NDRF-12BN-NER-4102',
    email: 'vikram.rathore@ndrf.gov.in',
    role: 'NDRF Field Officer',
    designation: 'Commander, 12th Battalion Quick Response Team',
    department: 'National Disaster Response Force (NER HQ Itanagar)',
    jurisdiction: 'Arunachal Pradesh & Assam Border Sectors',
    clearanceLevel: 'Level 3 (Tactical Response & Search/Rescue)',
    phone: '+91-360-2291120',
    avatarInitials: 'VR'
  },
  'BRO Engineer': {
    name: 'Maj. Ananya Sen, BRO',
    officialId: 'BRO-SWASTIK-7719',
    email: 'ananya.sen@bro.gov.in',
    role: 'BRO Engineer',
    designation: 'Executive Engineer (Highways & Slope Stabilization)',
    department: 'Border Roads Organisation (Project Swastik, NH-10)',
    jurisdiction: 'NH-10, NH-717A & Siliguri-Gangtok Axis',
    clearanceLevel: 'Level 3 (Highway Clearance & Traffic Directives)',
    phone: '+91-1800-180-2222',
    avatarInitials: 'AS'
  },
  'Geological Surveyor (GSI)': {
    name: 'Dr. Tenzing Norbu',
    officialId: 'GSI-NER-GEO-5531',
    email: 'tenzing.norbu@gsi.gov.in',
    role: 'Geological Surveyor (GSI)',
    designation: 'Senior Geologist (Landslide Studies Division)',
    department: 'Geological Survey of India (NER Regional Centre, Shillong)',
    jurisdiction: 'Meghalaya Plateau & Nagaland-Manipur Thrust Belt',
    clearanceLevel: 'Level 3 (Telemetry Calibration & Geo-Hazard Audit)',
    phone: '+91-364-2226572',
    avatarInitials: 'TN'
  },
  'Public / Observer': {
    name: 'Tashi Wangchuk',
    officialId: 'CITIZEN-NER-WATCH-108',
    email: 'tashi.wangchuk@observer.nic.in',
    role: 'Public / Observer',
    designation: 'Community Disaster Warden & Field Spotter',
    department: 'Community Early Warning & Citizen Science Network',
    jurisdiction: 'East Sikkim / Dikchu Basin Community Group',
    clearanceLevel: 'Level 1 (Public Advisory & Ground Reporting)',
    phone: '+91-98765-43210',
    avatarInitials: 'TW'
  },
  'Citizen / General Public': {
    name: 'Pema Bhutia',
    officialId: 'CITIZEN-NER-9982',
    email: 'pema.bhutia@gmail.com',
    role: 'Citizen / General Public',
    designation: 'Citizen & Community Volunteer (Gangtok Ward 4)',
    department: 'General Public (NER Public Safety & Early Warning)',
    jurisdiction: 'East Sikkim & Teesta Basin Community Watch',
    clearanceLevel: 'Citizen Tier (Public Warnings & Community Spotting)',
    phone: '+91-98320-11223',
    avatarInitials: 'PB'
  }
};

export const AuthLoginView: React.FC<AuthLoginViewProps> = ({ onLogin, onShowToast }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('SDMA Administrator');
  const [authMethod, setAuthMethod] = useState<'sso' | 'credentials'>('credentials');
  const [officialIdOrEmail, setOfficialIdOrEmail] = useState<string>(PRESET_ACCOUNTS['SDMA Administrator'].email);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberTerminal, setRememberTerminal] = useState<boolean>(true);
  const [twoFactorPin, setTwoFactorPin] = useState<string>('892401');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isCitizen = selectedRole === 'Citizen / General Public';

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const preset = PRESET_ACCOUNTS[role];
    setOfficialIdOrEmail(preset.email);
    setPassword(role === 'Citizen / General Public' ? 'Citizen@2026' : 'GovtPass@2026');
    setAuthError(null);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const inputVal = officialIdOrEmail.trim();

    if (!inputVal) {
      setAuthError(
        isCitizen 
          ? 'Please enter your email address (@gmail.com, @yahoo.com) or 10-digit mobile number.' 
          : 'Please enter your Government Portal Email or Official GOI ID.'
      );
      return;
    }

    if (!isCitizen) {
      // For official roles, ensure appropriate ID or government email
      if (inputVal.includes('@') && !inputVal.includes('.gov.in') && !inputVal.includes('.nic.in') && !inputVal.includes('.in')) {
        // Warning if non-gov email is entered for official role
        setAuthError('Official roles require a valid Government/NIC ID or official domain (@gov.in, @nic.in, @sikkim.gov.in). For personal email sign-in, please select the "Citizen / General Public" role.');
        return;
      }
    } else {
      // Citizen validation: allow phone numbers (10 digits) or any email
      const isPhone = /^[0-9+\-\s]{8,15}$/.test(inputVal);
      const isEmail = inputVal.includes('@') && inputVal.includes('.');
      if (!isPhone && !isEmail) {
        setAuthError('Please enter a valid email address (e.g., yourname@gmail.com) or a 10-digit mobile number.');
        return;
      }
    }

    if (authMethod === 'credentials' && !password.trim()) {
      setAuthError(
        isCitizen 
          ? 'Please enter your password or OTP to continue.' 
          : 'Please enter your secure officer password or passkey.'
      );
      return;
    }

    setIsAuthenticating(true);

    // Simulate authentic security handshake with NIC MeghRaj SSO / Citizen Gateway
    setTimeout(() => {
      setIsAuthenticating(false);
      const matchedProfile: UserProfile = {
        ...PRESET_ACCOUNTS[selectedRole],
        email: inputVal.includes('@') 
          ? inputVal 
          : isCitizen 
            ? `${inputVal}@citizen.ner.in` 
            : `${inputVal.toLowerCase()}@gov.in`
      };

      onLogin(matchedProfile);
      onShowToast(
        isCitizen
          ? `Welcome, ${matchedProfile.name}! Citizen Early Warning & Safety Portal is active.`
          : `Session authenticated via NIC SSO Gateway. Welcome, ${matchedProfile.name} (${matchedProfile.role}).`,
        'success'
      );
    }, 850);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      {/* 1. TOP OFFICIAL TRICOLOR ACCENT & GOI HEADER */}
      <header className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-30">
        {/* Tricolor Hairline */}
        <div className="h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-center pr-3 border-r border-slate-200">
              <span className="text-xs font-extrabold text-slate-800 block tracking-tight">सत्यमेव जयते</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">GOVT. OF INDIA</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black text-slate-900 tracking-tight">
                  NER-LEWS <span className="font-semibold text-slate-600">| पूर्वोत्तर भूस्खलन पूर्व चेतावनी प्रणाली</span>
                </h1>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold">
                  GOI SECURE PORTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Ministry of Development of North Eastern Region (MDoNER) & National Disaster Management Authority (NDMA)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Auth Node: NIC MeghRaj EOC</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN AUTHENTICATION CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl items-center">
          
          {/* Left Column: Platform Brief & Nodal Partner Endorsement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-900 text-white text-xs font-bold tracking-wide">
                <Shield size={13} className="text-blue-200" />
                <span>RESTRICTED ACCESS • AUTHORIZED DISASTER COMMAND</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                National Landslide Early Warning & Disaster Resilience Network
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Official single-window operational portal for geohazard telemetry, satellite InSAR displacement tracking, IoT inclinometers, and rapid multi-agency emergency response across all 8 North Eastern States.
              </p>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <CheckCircle2 size={15} className="text-blue-900" />
                  <span>Real-Time InSAR / IoT</span>
                </div>
                <p className="text-[11px] text-slate-500">Live slope displacement & telemetry feeds across NH corridors.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <CheckCircle2 size={15} className="text-emerald-700" />
                  <span>8 NER SDMA Interlink</span>
                </div>
                <p className="text-[11px] text-slate-500">Instant coordination between Sikkim, Assam, Arunachal & SDMAs.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <CheckCircle2 size={15} className="text-amber-700" />
                  <span>NDRF & BRO Dispatch</span>
                </div>
                <p className="text-[11px] text-slate-500">Immediate road clearance directives and task team assignments.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <CheckCircle2 size={15} className="text-purple-700" />
                  <span>AI Predictive Modeling</span>
                </div>
                <p className="text-[11px] text-slate-500">24h Factor of Safety (FS) curves & rainfall threshold alarms.</p>
              </div>
            </div>

            {/* Institutional Endorsements */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                NODAL INSTITUTIONAL PARTNERS
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700">
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">MDoNER</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">NDMA</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">GSI</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">NESAC / ISRO</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded">IMD</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
              
              {/* Header inside form */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {isCitizen ? 'Citizen & Community Portal Sign-In' : 'Official Command Sign-In'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {isCitizen 
                      ? 'NER Public Early Warning, Road Passability & Community Spotting' 
                      : 'National Disaster Management Single Sign-On Gateway'}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-xs ${isCitizen ? 'bg-emerald-700' : 'bg-blue-900'}`}>
                  {isCitizen ? <Users size={20} /> : <KeyRound size={20} />}
                </div>
              </div>

              {/* Quick Role Selection (Preset Accounts for rapid access) */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800">
                    Select Portal Access Role:
                  </label>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    isCitizen 
                      ? 'text-emerald-800 bg-emerald-50 border-emerald-200' 
                      : 'text-blue-900 bg-blue-50 border-blue-200'
                  }`}>
                    {isCitizen ? 'Public Access Tier' : 'Official Command Tier'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(PRESET_ACCOUNTS) as UserRole[]).map((role) => {
                    const isSelected = selectedRole === role;
                    const isRoleCitizen = role === 'Citizen / General Public' || role === 'Public / Observer';
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? isRoleCitizen
                              ? 'border-emerald-700 bg-emerald-50/90 text-emerald-950 font-bold shadow-2xs ring-1 ring-emerald-700'
                              : 'border-blue-900 bg-blue-50/90 text-blue-950 font-bold shadow-2xs ring-1 ring-blue-900'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <div className="truncate font-semibold flex items-center justify-between gap-1">
                          <span>{role}</span>
                          {role === 'Citizen / General Public' && (
                            <span className="text-[9px] bg-emerald-600 text-white px-1 rounded font-bold">NEW</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate font-normal mt-0.5">
                          {PRESET_ACCOUNTS[role].avatarInitials} • {PRESET_ACCOUNTS[role].name.split(',')[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Authentication Mode Switcher */}
              <div className="flex rounded-lg bg-slate-100 p-1 mb-5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuthMethod('credentials')}
                  className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === 'credentials'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock size={13} />
                  <span>{isCitizen ? 'Password / Mobile OTP' : 'Govt. ID & Password'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('sso')}
                  className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === 'sso'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Fingerprint size={13} />
                  <span>{isCitizen ? 'Citizen Jan-Dhan / Aadhaar OTP' : 'JanParichay / NIC SSO'}</span>
                </button>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
                  <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Authentication Check</span>
                    <span>{authError}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1.5">
                    {isCitizen ? 'Citizen Email Address or 10-Digit Mobile Number' : 'Government Portal Email / Official ID'}
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={officialIdOrEmail}
                      onChange={(e) => setOfficialIdOrEmail(e.target.value)}
                      placeholder={isCitizen ? 'e.g., pema.bhutia@gmail.com or 9832011223' : 'e.g., officer.name@gov.in or GOI-NER-9942'}
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {isCitizen 
                      ? 'Accepts personal emails (@gmail.com, @yahoo.com, etc.) or 10-digit mobile numbers. No @gov.in required.' 
                      : 'Supported official domains: @gov.in, @nic.in, @sikkim.gov.in, @ndrf.gov.in, @bro.gov.in'}
                  </span>
                </div>

                {authMethod === 'credentials' ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-bold text-slate-800">
                        {isCitizen ? 'Password / Passkey' : 'Officer Secure Password / PIN'}
                      </label>
                      <button
                        type="button"
                        onClick={() => onShowToast(
                          isCitizen 
                            ? 'One-Time Passcode (OTP) sent to your registered phone/email.' 
                            : 'Password recovery token sent to your registered NIC mobile line.',
                          'info'
                        )}
                        className="text-[11px] text-blue-900 hover:underline font-semibold"
                      >
                        {isCitizen ? 'Get OTP via SMS' : 'Forgot credentials?'}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isCitizen ? 'Enter your password or OTP' : 'Enter secure officer password'}
                        required
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950">
                        {isCitizen ? 'Citizen Mobile OTP Verification' : 'NIC Parichay 2FA Token'}
                      </span>
                      <span className="font-mono text-[10px] bg-blue-900 text-white px-2 py-0.5 rounded font-bold">
                        OTP Active
                      </span>
                    </div>
                    <div className="relative">
                      <Fingerprint size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900" />
                      <input
                        type="text"
                        value={twoFactorPin}
                        onChange={(e) => setTwoFactorPin(e.target.value)}
                        placeholder="Enter 6-digit verification PIN"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-blue-200 rounded-lg text-slate-900 font-mono font-bold tracking-widest outline-none"
                      />
                    </div>
                    <p className="text-[10px] text-blue-900 font-medium">
                      {isCitizen 
                        ? 'Simulated SMS token: 892401 sent to your mobile device.' 
                        : 'Token auto-verified for registered officer terminal (Gangtok EOC Station #4).'}
                    </p>
                  </div>
                )}

                {/* Remember Checkbox & Security Notice */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberTerminal}
                      onChange={(e) => setRememberTerminal(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                    />
                    <span>Remember this EOC Terminal</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">TLS 1.3 256-Bit</span>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying GOI Credentials...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck size={16} />
                      <span>Sign In to Disaster Command Portal</span>
                      <ArrowRight size={15} className="ml-1" />
                    </>
                  )}
                </button>

                {/* Selected Role Badge Summary */}
                <div className="pt-2 text-center text-[11px] text-slate-500 font-medium">
                  Signing in as <strong className="text-slate-900">{PRESET_ACCOUNTS[selectedRole].name}</strong> ({selectedRole})
                </div>
              </form>

            </div>
          </div>

        </div>
      </main>

      {/* 3. EMERGENCY HELPLINE BAR & OFFICIAL GOI FOOTER */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-600">
        {/* Helpline Strip */}
        <div className="bg-red-50/80 border-b border-red-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-red-900 font-bold">
              <AlertTriangle size={15} className="text-red-700" />
              <span>24x7 Geohazard Emergency Command Lines:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-slate-800">
                <span className="text-slate-500">National Emergency:</span>
                <a href="tel:112" className="text-red-700 font-mono font-bold hover:underline">112</a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <span className="text-slate-500">State EOC:</span>
                <a href="tel:1070" className="text-slate-900 font-mono font-bold hover:underline">1070</a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <span className="text-slate-500">District EOC:</span>
                <a href="tel:1077" className="text-slate-900 font-mono font-bold hover:underline">1077</a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <span className="text-slate-500">NDRF HQ:</span>
                <a href="tel:01124363260" className="text-blue-900 font-mono font-bold hover:underline">011-24363260</a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <span className="text-slate-500">BRO Highway:</span>
                <a href="tel:18001802222" className="text-blue-900 font-mono font-bold hover:underline">1800-180-2222</a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">सत्यमेव जयते</span>
            <span>•</span>
            <span>भारत सरकार | Government of India • MDoNER & NDMA</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Compliant with GIGW 3.0</span>
            <span>•</span>
            <span>Hosted by NIC Cloud MeghRaj</span>
            <span>•</span>
            <span>DPDP Act 2023 Encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
