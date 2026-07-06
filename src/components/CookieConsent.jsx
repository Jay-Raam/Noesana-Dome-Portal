import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('noesana_consent');
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('noesana_consent', 'accepted');
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('noesana_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9997] bg-zinc-900/95 backdrop-blur-md border-t border-white/5 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-noesana-orange shrink-0" />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            We use local storage to save your session data, calibration logs, and order history to improve your experience.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-noesana-orange text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-black transition-all"
          >
            Accept
          </button>
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:text-white hover:border-white/30 transition-all"
          >
            Decline
          </button>
          <button
            onClick={declineCookies}
            className="p-1.5 text-slate-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
