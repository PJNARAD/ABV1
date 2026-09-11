/*
 * =========================================================================
 *  [JASSU_ENCRYPTED_TELEMETRY_NODE_09]
 *  CIPHER: "SmFzc3Ugc2V5czogQWx3YXlzIG1vbml0b3IgdGhlIHNs b3Blcy4gT2JzZXJ2ZSwgUHJvdGVjdCwgU3Vydml2ZS4="
 *  DECODE: Base64 -> "Jassu says: Always monitor the slopes. Observe, Protect, Survive."
 * =========================================================================
 */

import React, { useState } from 'react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
  onSelectState?: (stateName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectState }) => {
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);

  const policyContent: Record<string, string> = {
    'Terms of Use': 'This platform is provided by MDoNER & NDMA for geohazard monitoring. Authorized personnel and public users must adhere to GIGW 3.0 guidelines regarding data usage and reporting.',
    'Privacy Policy': 'Personal data collected via field reports or telemetry is encrypted and processed in compliance with the Digital Personal Data Protection Act (DPDP) and Govt. of India standards.',
    'Hyperlinking Policy': 'Prior permission is required before hyperlinking to this portal from any site. Framework links to official portals (india.gov.in, data.gov.in) do not imply endorsement.',
    'Copyright Policy': 'Content on this website may be reproduced free of charge in any format or media without requiring specific permission, subject to the material being reproduced accurately.',
    'Disclaimer': 'Landslide hazard warnings and Factor of Safety (FS) indicators are generated via real-time satellite telemetry (INSAT-3DR/InSAR) and IoT sensors. Local authorities should verify ground conditions before major deployments.',
    'Accessibility Statement': 'This portal complies with WCAG 2.1 Level AA and GIGW 3.0 standard rules for screen readers and keyboard navigation.',
    'Sitemap': '1. Dashboard | 2. GIS Risk Map | 3. AI Predictions | 4. Live Alerts | 5. Field Reports | 6. Infrastructure Status | 7. Regional Analytics'
  };

  const handleNavClick = (tabKey: string) => {
    if (onNavigate) {
      onNavigate(tabKey);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStateClick = (stateName: string) => {
    if (onSelectState) {
      onSelectState(stateName);
    } else if (onNavigate) {
      onNavigate('risk-map');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPolicyModal = (title: string) => {
    setActiveModal({
      title,
      content: policyContent[title] || 'Official Government Policy Information.'
    });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 text-sm">
      {/* Tricolor Accent Line */}
      <div className="h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Identity & Nodal Partners */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-600 block">सत्यमेव जयते</span>
              <div className="border-l border-slate-300 h-6" />
              <div>
                <h4 className="font-bold text-xs text-slate-900">भारत सरकार | GOVERNMENT OF INDIA</h4>
                <p className="text-[11px] font-semibold text-blue-900">NER-LEWS • पूर्वोत्तर भूस्खलन पूर्व चेतावनी प्रणाली</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              National Landslide Early Warning & Disaster Resilience Platform for the North Eastern Region of India. An institutional spatio-temporal geohazard surveillance network deployed across Sikkim, Arunachal Pradesh, Assam, Meghalaya, Nagaland, Manipur, Mizoram, and Tripura.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">NODAL PARTNER INSTITUTIONS:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'MDoNER', url: 'https://mdoner.gov.in' },
                  { name: 'NDMA', url: 'https://ndma.gov.in' },
                  { name: 'GSI', url: 'https://gsi.gov.in' },
                  { name: 'NESAC / ISRO', url: 'https://nesac.gov.in' },
                  { name: 'IMD', url: 'https://mausam.imd.gov.in' }
                ].map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] rounded transition-colors"
                  >
                    {partner.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Platform Core Links (Connected to Active Tab View) */}
          <div>
            <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
              PLATFORM CORE
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Dashboard', key: 'dashboard' },
                { name: 'Risk Map', key: 'risk-map' },
                { name: 'AI Predictions', key: 'ai-predictions' },
                { name: 'Alerts', key: 'alerts' },
                { name: 'Field Reports', key: 'field-reports' },
                { name: 'Infrastructure', key: 'infrastructure' },
                { name: 'Analytics', key: 'analytics' }
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className="text-slate-600 hover:text-blue-700 hover:underline transition-colors text-left font-medium cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 8 NER SDMA Directory (Interactive Call & Filter Buttons) */}
          <div>
            <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
              राज्य आपदा प्रबंधन प्राधिकरण (8 NER STATES)
            </h5>
            <ul className="space-y-1.5 text-xs">
              {[
                { name: 'Sikkim SSDMA', state: 'Sikkim', hq: 'Gangtok', phone: '03592-202892' },
                { name: 'Assam ASDMA', state: 'Assam', hq: 'Guwahati', phone: '0361-2237219' },
                { name: 'Arunachal SDMA', state: 'Arunachal Pradesh', hq: 'Itanagar', phone: '0360-2291120' },
                { name: 'Meghalaya SDMA', state: 'Meghalaya', hq: 'Shillong', phone: '0364-2226572' },
                { name: 'Nagaland NSDMA', state: 'Nagaland', hq: 'Kohima', phone: '0370-2270050' },
                { name: 'Manipur SDMA', state: 'Manipur', hq: 'Imphal', phone: '0385-2443441' },
                { name: 'Mizoram DM&R Dept.', state: 'Mizoram', hq: 'Aizawl', phone: '0389-2335811' },
                { name: 'Tripura TDMA', state: 'Tripura', hq: 'Agartala', phone: '0381-2416241' }
              ].map((sdma) => (
                <li key={sdma.name} className="flex justify-between items-center py-0.5">
                  <button
                    onClick={() => handleStateClick(sdma.state)}
                    className="text-slate-700 hover:text-blue-700 hover:underline font-medium text-[11px] text-left cursor-pointer"
                    title={`Filter dashboard to ${sdma.state}`}
                  >
                    {sdma.name}
                  </button>
                  <a
                    href={`tel:${sdma.phone.replace(/[^0-9]/g, '')}`}
                    className="text-[10px] text-slate-500 hover:text-blue-700 hover:underline font-mono"
                    title={`Call HQ at ${sdma.phone}`}
                  >
                    {sdma.hq} ({sdma.phone})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Emergency Helplines & Direct Dialing */}
          <div>
            <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
              आपातकालीन हेल्पलाइन (24x7 ACTIVE)
            </h5>
            <div className="space-y-2 mb-4">
              <div className="bg-red-50 border border-red-200 rounded p-2 flex justify-between items-center">
                <span className="text-xs font-semibold text-red-900">National Emergency Number</span>
                <a href="tel:112" className="font-bold text-red-700 text-sm hover:underline font-mono">112</a>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">State EOC</span>
                  <a href="tel:1070" className="font-bold text-slate-800 hover:text-blue-700 font-mono">1070</a>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">District EOC</span>
                  <a href="tel:1077" className="font-bold text-slate-800 hover:text-blue-700 font-mono">1077</a>
                </div>
              </div>
              <div className="text-[11px] space-y-1 text-slate-600 pt-1">
                <p>NDRF HQ: <a href="tel:01124363260" className="font-semibold text-blue-700 hover:underline font-mono">011-24363260</a></p>
                <p>BRO Highway: <a href="tel:18001802222" className="font-semibold text-blue-700 hover:underline font-mono">1800-180-2222</a></p>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2 space-y-1">
              <p><strong className="text-slate-700">मंत्रालय / Nodal Ministry:</strong> MDoNER, Vigyan Bhawan Annexe, New Delhi</p>
              <p><strong className="text-slate-700">Execution:</strong> NDMA & GSI in partnership with NESAC (ISRO)</p>
            </div>
          </div>

        </div>

        {/* National Gateways & Legal Links */}
        <div className="border-t border-slate-200 pt-4 pb-2 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">राष्ट्रीय पोर्टल / National Gateways:</span>
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline font-medium">india.gov.in</a>
            <span>•</span>
            <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline font-medium">data.gov.in</a>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
            {[
              'Terms of Use',
              'Privacy Policy',
              'Hyperlinking Policy',
              'Copyright Policy',
              'Disclaimer',
              'Accessibility Statement',
              'Sitemap'
            ].map((policy) => (
              <button
                key={policy}
                onClick={() => openPolicyModal(policy)}
                className="hover:text-blue-700 hover:underline text-slate-600 cursor-pointer"
              >
                {policy}
              </button>
            ))}
          </div>
        </div>

        {/* System Meta & Copyright */}
        <div className="border-t border-slate-100 pt-4 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-slate-700 font-semibold">100% Telemetry Uptime • Version 4.2.8-NER-GOI</span>
          </div>
          <p>© 2026 पूर्वोत्तर क्षेत्र विकास मंत्रालय, भारत सरकार। सर्वाधिकार सुरक्षित।</p>
          <p className="text-slate-400">Hosted by NIC / Cloud MeghRaj</p>
        </div>
      </div>

      {/* Policy Modal Popup */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-bold text-slate-900 text-base">{activeModal.title}</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              {activeModal.content}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
              >
                Close Guidance
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};