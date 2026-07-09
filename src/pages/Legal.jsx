import React from 'react';

export default function Legal() {
  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-left">
        
        {/* Title */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Legal Standards</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Legal Disclosures</h1>
          <p className="text-slate-400 text-sm mt-2">Last updated: July 11, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            NOESANA complies with all consumer electronics guidelines, wireless transmission limits, and safety standards.
          </p>

          <h3 className="text-white font-bold text-md pt-4">1. FCC Compliance Statement</h3>
          <p>
            This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions: (1) This device may not cause harmful interference, and (2) this device must accept any interference received.
          </p>

          <h3 className="text-white font-bold text-md pt-4">2. Biometric Safety Certification</h3>
          <p>
            Our active dry silver electrodes utilize low microvolt current collection loops, complying with electrical insulation safety certificates (IEC-60601-1).
          </p>

          <h3 className="text-white font-bold text-md pt-4">3. Patent Disclosures</h3>
          <p>
            The closed-loop audio modulation algorithm and Occipital clasp structure are protected under US Patents #9,832,109 and #10,482,831.
          </p>
        </div>

      </div>
    </div>
  );
}
