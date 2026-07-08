import React from 'react';
import { Activity, Brain, Shield, Sliders, Cpu, LineChart } from 'lucide-react';

export default function Algorithms() {
  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Neural Classification</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Heuristic Algorithms</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            Our patented mindwave processing pipelines translate raw microvolt EEG potential into audio-guide modulations.
          </p>
        </div>

        {/* Algorithm Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 text-left">
          
          <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[280px]">
            <div>
              <div className="w-8 h-8 rounded-lg bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mb-6">
                <Sliders className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-md font-bold text-white mb-2">1. Signal De-noising (ICA)</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Raw electrode output is saturated with head muscle movement, blinks, and heartbeat interference. The headband implements real-time Independent Component Analysis (ICA) to strip out these artifacts.
              </p>
            </div>
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Pre-Processing Tier</span>
          </div>

          <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[280px]">
            <div>
              <div className="w-8 h-8 rounded-lg bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mb-6">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-md font-bold text-white mb-2">2. Power Spectral Density</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Clean signals are processed via Fast Fourier Transforms (FFT) to extract power density values for specific frequency bands: Beta (focus), Alpha (calm), Theta (meditation), and Delta (rest).
              </p>
            </div>
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Telemetry Math Tier</span>
          </div>

          <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[280px]">
            <div>
              <div className="w-8 h-8 rounded-lg bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mb-6">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-md font-bold text-white mb-2">3. Acoustic Modulation Loop</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                If Alpha density is low, app audio swells to guide attention back to the breath. As Alpha waves stabilize, the background audio drops, rewarding you with serene silence.
              </p>
            </div>
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Active Feedback Tier</span>
          </div>

        </div>

        {/* Formula layout */}
        <div className="bg-noesana-white text-black p-8 sm:p-12 rounded-3xl text-left">
          <div className="max-w-3xl">
            <h3 className="text-xl font-black text-slate-900 mb-4">The Clarity Heuristics Formula</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Our Dome software dynamically compiles active mind index variables. Below is the simplified algorithm calculation for the Clarity Score:
            </p>
            {/* Display Math Formula */}
            <div className="bg-slate-200/60 p-4 rounded-xl font-mono text-xs text-slate-800 border border-slate-300/40 overflow-x-auto text-center">
              {"\\\\[Clarity\\\\_Index = \\\\frac{\\\\text{Alpha\\\\_Power}}{\\\\text{Beta\\\\_Power}} \\\\times \\\\left(1 - \\\\sigma_{hr}\\\\right)\\\\]"}
            </div>
            <p className="text-slate-500 text-[10px] mt-4 font-mono">
              Where Alpha and Beta reflect power spectral densities, and {"\\\\(\\\\sigma_{hr}\\\\)"} represents heart rate variability fluctuations (stress threshold).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
