import React, { useState } from 'react';
import { Cpu, Eye, Radio, Sparkles, BookOpen, Fingerprint, Layers, Table, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Technology() {
  const [activeSensor, setActiveSensor] = useState('frontal');

  const sensorSpecs = {
    frontal: {
      name: 'Prefrontal Cortex Sensors (Fp1, Fp2)',
      material: 'Dry-contact Silver/Silver-Chloride (Ag/AgCl)',
      function: 'Collects high-frequency frontal lobe signals to analyze focused concentration and active decision-making metrics.',
      signal: 'Beta & Gamma wave calibration',
    },
    temporal: {
      name: 'Temporal Lobe Sensors (T3, T4)',
      material: 'Flexible conductive elastomer array',
      function: 'Measures cognitive noise levels and lateral brainwave changes during visual relaxation cycles.',
      signal: 'Alpha & Theta wave calibration',
    },
    occipital: {
      name: 'Occipital Buckle Reference (O1, O2)',
      material: 'Active dry reference hook',
      function: 'Serves as the signal ground to filter out physical head tosses, heartbeats, and external powerline interference.',
      signal: 'System grounding & noise cancellation',
    }
  };

  const frequencyBands = [
    { band: 'Gamma', range: '30 - 100 Hz', state: 'Peak Cognition', role: 'Flags deep insight, problem solving, and high sensory binding.' },
    { band: 'Beta', range: '12 - 30 Hz', state: 'Active Alertness', role: 'Monitors logical thinking. High levels flag stress threshold triggers.' },
    { band: 'Alpha', range: '8 - 12 Hz', state: 'Relaxed Flow', role: 'Primary guide wave. Ambient audio matches alpha wave density.' },
    { band: 'Theta', range: '4 - 8 Hz', state: 'Meditation & REM', role: 'Amplified during guided breathing, dreaming, and light sleep.' },
    { band: 'Delta', range: '0.5 - 4 Hz', state: 'Deep Sleep', role: 'Overnight rest monitor. Determines physical muscle recovery.' }
  ];

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Scientific Architecture</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">The Sensing Technology</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">
            Medical-grade EEG sensors and advanced neural networks calibrate your audio feed in real time to guide mental relaxation.
          </p>
        </div>

        {/* Sensory Hardware details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <div className="text-left flex flex-col space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Medical-Grade EEG Calibration</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Equipped with active dry-contact silver electrodes on the forehead and temple, NOESANA gathers electrical cortical pulses with high accuracy.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              These microvolt potentials are filtered of muscle movement noise (EMG) before sending clean waveforms to the calibration engine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">ARM Neural Hook</h4>
                  <p className="text-[10px] text-slate-500">Local microprocessor filters raw signal noise instantly.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">
                  <Radio className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Micro Bluetooth v5.3</h4>
                  <p className="text-[10px] text-slate-500">Zero-latency secure sync with local Dome mobile logs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Tech schematic graphic */}
          <div className="bg-slate-950 border border-white/5 p-8 rounded-3xl relative overflow-hidden flex items-center justify-center h-80">
            <div className="absolute inset-0 bg-noesana-orange/5 blur-3xl rounded-full" />
            
            {/* Tech Schema Wireframe */}
            <svg className="w-64 h-64 text-noesana-orange/40" viewBox="0 0 100 100">
              {/* Outer ring */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* Center point */}
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              {/* Radial spokes */}
              <line x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="12" y2="50" stroke="currentColor" strokeWidth="0.5" />
              {/* Sensor points */}
              <circle cx="50" cy="12" r="2.5" className="text-noesana-orange fill-current" />
              <circle cx="82" cy="50" r="2.5" className="text-noesana-orange fill-current" />
              <circle cx="18" cy="50" r="2.5" className="text-noesana-orange fill-current" />
            </svg>
            <div className="absolute bottom-6 font-mono text-[9px] text-slate-500 uppercase tracking-widest">NOESANA SENSOR SPEC v2.4</div>
          </div>

        </div>


        {/* NEW SECTION: Interactive Sensor Explorer */}
        <div className="bg-slate-950 border border-white/5 p-6 sm:p-10 rounded-3xl text-left mb-20">
          <div className="max-w-xl mb-10">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Hardware Nodes</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Interactive Sensor Explorer</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3">
              Click different electrode positions below to inspect sensor materials and neural signal telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Sensor selector list */}
            <div className="md:col-span-4 flex flex-col space-y-3">
              <button 
                onClick={() => setActiveSensor('frontal')}
                className={`p-4 rounded-xl border text-left text-xs font-bold transition-all ${
                  activeSensor === 'frontal' ? 'border-noesana-orange bg-noesana-orange/5 text-white' : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                }`}
              >
                Frontal Array (Fp1, Fp2)
              </button>
              <button 
                onClick={() => setActiveSensor('temporal')}
                className={`p-4 rounded-xl border text-left text-xs font-bold transition-all ${
                  activeSensor === 'temporal' ? 'border-noesana-orange bg-noesana-orange/5 text-white' : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                }`}
              >
                Temporal Electrodes (T3, T4)
              </button>
              <button 
                onClick={() => setActiveSensor('occipital')}
                className={`p-4 rounded-xl border text-left text-xs font-bold transition-all ${
                  activeSensor === 'occipital' ? 'border-noesana-orange bg-noesana-orange/5 text-white' : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                }`}
              >
                Occipital buckle Reference
              </button>
            </div>

            {/* Spec details card */}
            <div className="md:col-span-8 bg-slate-900/40 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-bold text-white text-md mb-1">{sensorSpecs[activeSensor].name}</h3>
                <span className="text-[10px] text-noesana-orange uppercase tracking-wider font-semibold font-mono">
                  Material: {sensorSpecs[activeSensor].material}
                </span>
              </div>
              <hr className="border-white/5" />
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {sensorSpecs[activeSensor].function}
              </p>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 bg-black/40 border border-white/5 p-3 rounded-lg w-fit">
                <Info className="w-4 h-4 text-noesana-orange" />
                <span>Primary Signal: {sensorSpecs[activeSensor].signal}</span>
              </div>
            </div>

          </div>
        </div>


        {/* NEW SECTION: EEG Frequency Band Table */}
        <div className="bg-slate-950 border border-white/5 p-6 sm:p-10 rounded-3xl text-left mb-20 overflow-hidden">
          <div className="max-w-xl mb-10">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Telemetry Framework</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Frequency Bands Specifications</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3">
              The Noesana EEG processor splits active brainwaves into five discrete ranges for targeted cognitive support.
            </p>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-2">Wave Band</th>
                  <th className="py-4 px-2">Range</th>
                  <th className="py-4 px-2">Mental State</th>
                  <th className="py-4 px-2">Noesana Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {frequencyBands.map((freq, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-2 font-bold text-white">{freq.band}</td>
                    <td className="py-4 px-2 font-mono text-noesana-orange">{freq.range}</td>
                    <td className="py-4 px-2 font-semibold">{freq.state}</td>
                    <td className="py-4 px-2 text-slate-400">{freq.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Validation studies card */}
        <div className="bg-noesana-white text-black rounded-3xl p-8 sm:p-12 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scientific Studies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Clinically Checked Alpha Modulation</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Double-blind tests at neuro-research facilities verified that people calibrating their mental sessions with NOESANA audio feedback achieved stable Alpha brainwave thresholds 3x faster than traditional meditation guides.
            </p>
            <Link to="/shop" className="px-6 py-3.5 bg-noesana-orange hover:bg-black text-white hover:text-white transition-all rounded-full font-bold text-xs uppercase tracking-wider shadow-md w-fit flex items-center space-x-2">
              <span>View Purchasing Options</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
