import React from 'react';

export default function Privacy() {
  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-left">
        
        {/* Title */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Legal Standards</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
          <p className="text-slate-400 text-sm mt-2">Last updated: July 11, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            At NOESANA, we take your mental privacy seriously. This Privacy Policy details how we handle the EEG and biometric data gathered by your Gen-2 headband.
          </p>

          <h3 className="text-white font-bold text-md pt-4">1. Local Device Encryption</h3>
          <p>
            All raw microvolt brainwave signals (EEG) collected by dry-contact sensors are encrypted locally on the device microcontroller (AES-256) before transmission.
          </p>

          <h3 className="text-white font-bold text-md pt-4">2. Zero Cloud Storage for Neural Data</h3>
          <p>
            Your raw brainwave recordings are never uploaded to our servers or stored in the cloud. EEG telemetry is processed locally within the Dome App on your phone and resides entirely on your device sandboxed storage.
          </p>

          <h3 className="text-white font-bold text-md pt-4">3. Data Portability</h3>
          <p>
            You can delete your local calibration database logs at any time from the Dome App settings menu.
          </p>
        </div>

      </div>
    </div>
  );
}
