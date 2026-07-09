import React from 'react';

export default function Terms() {
  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-left">
        
        {/* Title */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Legal Standards</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Use</h1>
          <p className="text-slate-400 text-sm mt-2">Last updated: July 11, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Welcome to NOESANA. By using our Gen-2 headband and Dome App, you agree to these Terms of Use.
          </p>

          <h3 className="text-white font-bold text-md pt-4">1. Non-Medical Device Disclaimer</h3>
          <p>
            NOESANA is a bio-feedback wellness product designed to aid meditation, focus, and sleep calibrations. It is NOT a medical device and should not be used to diagnose or treat neurological disorders or clinical conditions.
          </p>

          <h3 className="text-white font-bold text-md pt-4">2. Dome App License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to download and run the Dome App for personal, non-commercial mental coaching.
          </p>

          <h3 className="text-white font-bold text-md pt-4">3. Custom Calibration Safety</h3>
          <p>
            Do not use the headband while driving, operating heavy machinery, or engaging in physical activities requiring alert focus.
          </p>
        </div>

      </div>
    </div>
  );
}
