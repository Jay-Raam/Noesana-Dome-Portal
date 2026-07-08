import React, { useState } from 'react';
import { Moon, Star, RefreshCw, BarChart2, BellRing, Heart, Brain, Eye, Clock, ShieldCheck, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sleep() {
  const [activeStage, setActiveStage] = useState('deep');
  const [helpHour, setHelpHour] = useState(3);

  const hourData = {
    1: { stage: 'Wake / Stage N1', heartRate: '68 bpm', eeg: 'Alpha & Beta (10 - 15 Hz)', desc: 'Transitioning to rest. Low-amplitude waves with intermittent alpha waves reflecting closed eyes and active brain slowing.' },
    2: { stage: 'Stage N2 (Light)', heartRate: '62 bpm', eeg: 'Theta & Sleep Spindles', desc: 'Sleep spindles and K-complexes detected on temporal sensors. Body temperature falls, muscle tension relaxes.' },
    3: { stage: 'Stage N3 (Deep)', heartRate: '54 bpm', eeg: 'Delta (0.5 - 3 Hz)', desc: 'Slow Wave Sleep (SWS) locked. Large, high-amplitude delta waves dominate. Physical restoration and immune rejuvenation active.' },
    4: { stage: 'Stage N3 (Deep)', heartRate: '53 bpm', eeg: 'Delta (0.5 - 2 Hz)', desc: 'Peak slow wave density. Low auditory sensitivity. Acoustic shielding engine monitoring for bedroom interruptions.' },
    5: { stage: 'REM Sleep', heartRate: '65 bpm', eeg: 'Beta-like (15 - 22 Hz)', desc: 'Active dreaming state. Rapid eye movements detected. High cerebral blood flow, temporary somatic muscle paralysis.' },
    6: { stage: 'Stage N2 (Light)', heartRate: '59 bpm', eeg: 'Theta (4 - 7 Hz)', desc: 'Returning to light sleep cycles. Sleep spindles maintain micro-arousal threshold protection.' },
    7: { stage: 'REM Sleep', heartRate: '64 bpm', eeg: 'Mixed Frequency', desc: 'Extended REM phase. Crucial for memory sorting and emotional cognitive cleanup logs.' },
    8: { stage: 'Stage N1 / Wake', heartRate: '66 bpm', eeg: 'Alpha (8 - 12 Hz)', desc: 'Waking cycle. Prefrontal channels show gradual alpha frequency acceleration matching morning alarms.' }
  };

  const sleepStages = {
    wake: {
      name: 'Wakefulness (Alpha/Beta)',
      percent: '5 - 10%',
      desc: 'Active consciousness. Characterized by high-frequency, low-amplitude Beta and Alpha waves as you wind down in bed.',
      biometrics: 'Heart Rate: 60-70 bpm • High physical muscle tone • Irregular breathing',
      color: 'text-noesana-orange bg-noesana-orange/10 border-noesana-orange/30'
    },
    light: {
      name: 'Light Sleep (Theta / Sleep Spindles)',
      percent: '50 - 60%',
      desc: 'Stage N1 and N2. Transition phase where brain activity slows down, marked by sudden bursts of rapid brainwave activity known as sleep spindles.',
      biometrics: 'Heart Rate slows • Muscle tone decreases • Body temperature drops',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    },
    deep: {
      name: 'Deep Sleep (Delta / Slow Wave)',
      percent: '15 - 25%',
      desc: 'Stage N3. Slow-wave sleep essential for physical restoration, muscle growth, cellular repair, and immune system rejuvenation.',
      biometrics: 'Lowest Heart Rate • Deep physical relaxation • Slow, rhythmic breathing',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    rem: {
      name: 'REM Sleep (Rapid Eye Movement)',
      percent: '20 - 25%',
      desc: 'Active dreaming state. Rapid, shallow brainwaves mimicking wakefulness. Essential for cognitive sorting, memory consolidation, and emotional processing.',
      biometrics: 'Variable Heart Rate • Temporary muscle paralysis • Rapid eye movements detected',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
    }
  };

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Restful Science</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Sleep Tracking</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            Detailed delta-wave monitoring compiles structural overnight reports showing REM, Light, and Deep sleep cycles.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 text-left">
          
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">Deep Rest Diagnostics</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Traditional accelerometers only measure body toss-and-turns. NOESANA measures the physical electrical activity of your brain, identifying REM and Deep sleep stages directly.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Our ultra-thin woven electrodes feel imperceptible when lying down, delivering clean brainwave recordings throughout the night.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-start space-x-3 text-xs text-slate-300">
                <div className="w-5 h-5 rounded bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">✓</div>
                <span>Delta wave analysis determines physical recovery efficiency.</span>
              </li>
              <li className="flex items-start space-x-3 text-xs text-slate-300">
                <div className="w-5 h-5 rounded bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">✓</div>
                <span>Auditory sound masking blocks ambient bedroom noise automatically.</span>
              </li>
            </ul>
          </div>

          {/* Sleep chart widget visualization */}
          <div className="bg-slate-950 border border-white/5 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-80">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-white">Overnight Sleep Cycle Log</span>
                <span className="text-[10px] text-slate-500 font-mono">Duration: 7h 42m</span>
              </div>
              
              {/* Cycles bar graph */}
              <div className="w-full h-32 flex items-end justify-between space-x-1.5 pt-6">
                <div className="flex-1 bg-sky-500/20 h-28 rounded-t-sm relative group cursor-pointer" onClick={() => setActiveStage('rem')}>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[9px] bg-slate-900 text-sky-400 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">REM</span>
                </div>
                <div className="flex-1 bg-indigo-500/30 h-20 rounded-t-sm cursor-pointer" onClick={() => setActiveStage('light')} />
                <div className="flex-1 bg-indigo-600/40 h-12 rounded-t-sm cursor-pointer" onClick={() => setActiveStage('light')} />
                <div className="flex-1 bg-emerald-500/50 h-32 rounded-t-sm cursor-pointer" onClick={() => setActiveStage('deep')} />
                <div className="flex-1 bg-sky-500/20 h-24 rounded-t-sm cursor-pointer" onClick={() => setActiveStage('rem')} />
                <div className="flex-1 bg-indigo-500/30 h-16 rounded-t-sm cursor-pointer" onClick={() => setActiveStage('light')} />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-white/5 pt-4">
              <span>Deep Sleep: 2h 14m</span>
              <span>Clarity index: +15%</span>
            </div>
          </div>

        </div>


        {/* ---------------- NEW SECTION: Overnight Hypnogram Explorer ---------------- */}
        <section className="py-16 border-t border-white/5 text-left mb-16">
          <div className="mb-10">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Biometric Sleep Cycle Timeline</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Interactive 8-Hour Hypnogram</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
              Hover over or tap any hour on the overnight sleep chart to inspect regional wave signatures, EEG spectral density, and arousal events.
            </p>
          </div>

          {/* Interactive Hypnogram Visualizer */}
          <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: The Interactive Timeline Graph */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              
              <div className="relative w-full h-48 bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                {/* Y-axis Labels */}
                <div className="absolute left-3 top-3 bottom-12 flex flex-col justify-between text-[9px] font-mono text-slate-500 text-right w-10">
                  <span>WAKE</span>
                  <span>REM</span>
                  <span>LIGHT</span>
                  <span>DEEP</span>
                </div>

                {/* Hypnogram Line Chart SVG */}
                <div className="flex-1 ml-12 mr-2 relative h-32">
                  <svg className="w-full h-full text-noesana-orange" viewBox="0 0 800 120" preserveAspectRatio="none">
                    {/* Background grid lines */}
                    <line x1="0" y1="10" x2="800" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="45" x2="800" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="115" x2="800" y2="115" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                    {/* Hypnogram path */}
                    <path 
                      d="M 0 10 L 40 10 L 60 80 L 120 80 L 150 115 L 210 115 L 230 45 L 280 45 L 300 80 L 350 80 L 370 115 L 430 115 L 450 45 L 500 45 L 520 80 L 580 80 L 600 115 L 660 115 L 680 45 L 730 45 L 750 10 L 800 10" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />

                    {/* Hover Hotspot zones */}
                    {[...Array(8)].map((_, i) => (
                      <rect
                        key={i}
                        x={i * 100}
                        y={0}
                        width={100}
                        height={120}
                        fill="transparent"
                        className="cursor-pointer hover:fill-noesana-orange/5 transition-colors"
                        onMouseEnter={() => setHelpHour(i + 1)}
                      />
                    ))}
                  </svg>
                </div>

                {/* X-axis Hour Marks */}
                <div className="flex justify-between items-center ml-12 mr-2 border-t border-white/5 pt-2 text-[9px] font-mono text-slate-500">
                  <span>Hour 1 (11PM)</span>
                  <span>Hour 2</span>
                  <span>Hour 3</span>
                  <span>Hour 4</span>
                  <span>Hour 5</span>
                  <span>Hour 6</span>
                  <span>Hour 7</span>
                  <span>Hour 8 (7AM)</span>
                </div>

              </div>
              
              <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center">
                <span>* Hover across the timeline sections above to inspect real-time metrics</span>
                <span>Signal Status: Locked (Clean)</span>
              </div>

            </div>

            {/* Right Column: Dynamic Biometric Details Panel */}
            <div className="lg:col-span-4 bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hour {helpHour} Biometrics</h4>
                  <span className="text-[9px] font-mono bg-noesana-orange/10 border border-noesana-orange/20 text-noesana-orange px-2 py-0.5 rounded">
                    {hourData[helpHour].stage}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg Heart Rate:</span>
                    <span className="text-slate-200 font-mono">{hourData[helpHour].heartRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">EEG Dominance:</span>
                    <span className="text-slate-200 font-mono">{hourData[helpHour].eeg}</span>
                  </div>
                  <div className="flex justify-between flex-col">
                    <span className="text-slate-500 mb-1">Spectral Signature:</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed bg-black/50 p-2.5 rounded-lg border border-white/5">
                      {hourData[helpHour].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ---------------- NEW SECTION: Sleep Stage Interactive Explorer ---------------- */}
        <div className="py-16 border-t border-white/5 text-left mb-20">
          <div className="max-w-xl mb-10">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Stage Analysis</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">How We Map Sleep Stages</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Every stage of sleep has a unique neural fingerprint. Click the stages below to explore how Noesana senses them.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Buttons list */}
            <div className="lg:col-span-4 flex flex-col space-y-2">
              {Object.keys(sleepStages).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveStage(key)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    activeStage === key
                      ? 'border-noesana-orange bg-noesana-orange/5 text-white'
                      : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                  }`}
                >
                  <span className="text-xs font-bold capitalize">{key} Stage</span>
                  <ChevronRight className={`w-4 h-4 text-noesana-orange transition-transform ${activeStage === key ? 'rotate-90' : ''}`} />
                </button>
              ))}
            </div>

            {/* Stage Detail Card */}
            <div className="lg:col-span-8 bg-slate-950 border border-white/5 p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-lg font-black text-white">{sleepStages[activeStage].name}</h3>
                <span className="text-xs font-mono font-bold bg-white/5 border border-white/10 px-2 py-1 rounded text-white">
                  Target: {sleepStages[activeStage].percent} of night
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{sleepStages[activeStage].desc}</p>
              <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Simulated Biometric Readings</div>
                <div className="text-xs text-slate-300 font-mono leading-relaxed">{sleepStages[activeStage].biometrics}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- NEW SECTION: Closed Loop Sleep Auditory System ---------------- */}
        <div className="py-16 border-t border-white/5 text-left mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 bg-slate-950/40 border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-noesana-orange/5 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-xl font-black text-white">Acoustic Sleep Masking</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Our closed-loop audio guides don't just help you fall asleep—they safeguard your rest all night. When Noesana detects a spike in high-frequency environmental noise or micro-arousal states, the audio guides raise an acoustic shield automatically.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                <Clock className="w-5 h-5 text-noesana-orange mx-auto mb-2" />
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Sleep Latency</div>
                <div className="text-xs font-bold text-white mt-1">-35% duration</div>
              </div>
              <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                <Brain className="w-5 h-5 text-noesana-orange mx-auto mb-2" />
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Slow Wave Density</div>
                <div className="text-xs font-bold text-white mt-1">+20% Deep Rest</div>
              </div>
              <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                <ShieldCheck className="w-5 h-5 text-noesana-orange mx-auto mb-2" />
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Arousal Filter</div>
                <div className="text-xs font-bold text-white mt-1">Automatic Shield</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">Deep Rest Safeguard</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Fall asleep to calming generative waves. As your neural logs drift into deep sleep, the app automatically transitions to silent baseline tracking, and only wakes to shield you from disruption.
            </p>
            <Link to="/shop" className="px-6 py-3.5 bg-noesana-orange hover:bg-white text-black hover:text-black font-bold rounded-full text-xs uppercase tracking-wider transition-all shadow-lg shadow-noesana-orange/10 w-fit">
              Get Started
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
