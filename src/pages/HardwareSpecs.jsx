import React, { useState, useEffect, useRef } from 'react';
import { Activity, ShieldCheck, Cpu, Heart, Check, Sparkles, AlertCircle, RefreshCw, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import local assets
import heroHeadband from '../assets/hero_headband.png';
import headbandBack from '../assets/headband_back.png';
import headbandSide from '../assets/headband_side.png';
import chargingDock from '../assets/charging_dock.png';
import travelCase from '../assets/travel_case.png';
import headbandStand from '../assets/headband_stand.png';
import vrPod from '../assets/vr_pod.png';
import sensorCare from '../assets/sensor_care.png';

export default function HardwareSpecs() {
  const containerRef = useRef(null);

  // Parallax Scroll Effect on whole page background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Section 1: Tension Simulator State
  const [strapTension, setStrapTension] = useState(60); // 0 to 100
  const [signalStability, setSignalStability] = useState(85);
  const [comfortScore, setComfortScore] = useState(90);

  useEffect(() => {
    // Math to compute stability and comfort based on tension
    // Too loose (low tension) -> low stability, high comfort
    // Too tight (high tension) -> high stability, low comfort
    // Optimal = around 55-70
    if (strapTension < 30) {
      setSignalStability(Math.floor(strapTension * 1.5));
      setComfortScore(98);
    } else if (strapTension >= 30 && strapTension <= 70) {
      setSignalStability(Math.floor(75 + (strapTension - 30) * 0.5));
      setComfortScore(Math.floor(95 - (strapTension - 30) * 0.3));
    } else {
      setSignalStability(98);
      setComfortScore(Math.max(Math.floor(83 - (strapTension - 70) * 1.5), 10));
    }
  }, [strapTension]);

  // Scroll to hash on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  // Section 2: Sensor Calibration State
  const [activeElectrode, setActiveElectrode] = useState('frontal');

  const electrodeDetails = {
    frontal: {
      label: 'Fp1 & Fp2 (Frontal Electrodes)',
      waves: 'Beta (12-30 Hz) and Gamma (30-100 Hz)',
      desc: 'Detects cortical activity from the prefrontal cortex related to attention, logical processing, and stress triggers.'
    },
    temporal: {
      label: 'T3 & T4 (Temporal Electrodes)',
      waves: 'Alpha (8-12 Hz) and Theta (4-8 Hz)',
      desc: 'Measures neural rhythm changes during sensory relaxation and transitions into deep focused calm.'
    },
    reference: {
      label: 'Occipital Ground Ref (O1 & O2)',
      waves: 'System Baseline Grounding',
      desc: 'Acts as reference point to cancel out physical muscle movement, heartbeat signals, and ambient powerline hum.'
    }
  };

  // Section 3: Live Signal Simulator
  const [oscActive, setOscActive] = useState(true);
  const [oscMode, setOscMode] = useState('alpha');

  return (
    <div 
      ref={containerRef}
      className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Parallax Stars/Grid */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,85,0,0.05),rgba(255,255,255,0))] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-left mb-20 border-b border-white/5 pb-10">
          <div className="text-xs font-cyber font-extrabold text-noesana-orange uppercase tracking-widest mb-2">Technical Dossier</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">Hardware Specifications</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
            Deep dive into the material science, electrical engineering, and neural analytics that power the Noesana headband.
          </p>
        </div>


        {/* ---------------- NEW SECTION: Interactive Hardware Profile Explorer ---------------- */}
        <section className="py-12 border-b border-white/5 text-left">
          <div className="bg-slate-950/60 border border-white/5 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Selector & Details */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div>
                  <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">3D Architecture</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">Anatomical Design</h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                    Explore the physical anatomy of the Gen-2 Headband. Toggle between profiles to inspect regional sensors and structural mechanics.
                  </p>
                </div>

                {/* Profile selectors */}
                <div className="flex flex-col space-y-2">
                  {[
                    { id: 'front', label: 'Front Profile (Sensor Weave)', desc: 'Dry silver-chloride frontal nodes & processor pod' },
                    { id: 'side', label: 'Side Profile (Ergonomic Chassis)', desc: 'Temporal nodes & stretch-woven structural strap' },
                    { id: 'rear', label: 'Rear Profile (Adjustment Buckle)', desc: 'Lithium battery cell & micro-adjustment comfort buckle' }
                  ].map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => setActiveElectrode(profile.id === 'front' ? 'frontal' : profile.id === 'side' ? 'temporal' : 'reference')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        (profile.id === 'front' && activeElectrode === 'frontal') ||
                        (profile.id === 'side' && activeElectrode === 'temporal') ||
                        (profile.id === 'rear' && activeElectrode === 'reference')
                          ? 'border-noesana-orange bg-noesana-orange/5 text-white'
                          : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="text-xs font-bold">{profile.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{profile.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Render with Glowing Annotation Hotspots */}
              <div className="lg:col-span-7 flex justify-center relative bg-black/40 border border-white/5 rounded-2xl p-8 min-h-[380px] items-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-noesana-orange/5 rounded-full blur-2xl pointer-events-none" />
                
                {activeElectrode === 'frontal' && (
                  <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                    <img src={heroHeadband} alt="Headband front profile" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,85,0,0.15)] animate-[pulse-slow_3s_ease-in-out_infinite]" />
                    
                    {/* Glowing Hotspot 1: Frontal Sensors */}
                    <div className="absolute top-[48%] left-[28%] -translate-y-1/2 group cursor-pointer z-20">
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-noesana-orange opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-noesana-orange"></span>
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white border border-white/10 px-2.5 py-1.5 rounded-lg text-[9px] w-36 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-sans shadow-xl">
                        <span className="font-bold text-noesana-orange block mb-0.5">Frontal Sensors</span>
                        Dry-contact electrodes tracking active prefrontal focus logs.
                      </div>
                    </div>
                  </div>
                )}

                {activeElectrode === 'temporal' && (
                  <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                    <img src={headbandSide} alt="Headband side profile" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(56,189,248,0.15)] animate-[pulse-slow_3s_ease-in-out_infinite]" />
                    
                    {/* Glowing Hotspot 2: Side Band */}
                    <div className="absolute top-[48%] left-[45%] group cursor-pointer z-20">
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-400"></span>
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white border border-white/10 px-2.5 py-1.5 rounded-lg text-[9px] w-36 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-sans shadow-xl">
                        <span className="font-bold text-sky-400 block mb-0.5">Stretch-Knit Strap</span>
                        Durable elastomeric weave conforming to all cranium profiles.
                      </div>
                    </div>
                  </div>
                )}

                {activeElectrode === 'reference' && (
                  <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                    <img src={headbandBack} alt="Headband rear profile" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-[pulse-slow_3s_ease-in-out_infinite]" />
                    
                    {/* Glowing Hotspot 3: Back Adjuster */}
                    <div className="absolute top-[52%] left-[58%] group cursor-pointer z-20">
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white border border-white/10 px-2.5 py-1.5 rounded-lg text-[9px] w-36 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-sans shadow-xl">
                        <span className="font-bold text-emerald-400 block mb-0.5">Tension Buckle</span>
                        Adjusts fit window to maintain continuous electrode signals.
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 1: COMFORT FIT STRAP ---------------- */}
        <section id="comfort" className="py-16 border-b border-white/5 text-left scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanations */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
                <span>Pillar 01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-noesana-orange" />
                <span>Comfort Fit Strap</span>
              </div>
              
              <h2 className="text-3xl font-black text-white leading-tight">
                Designed to be forgotten.
              </h2>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                EEG calibration requires consistent sensor contact with the skin, which traditionally required sticky gels or tight bands. Noesana achieves this passively through our stretch-woven comfort band and flexible occipital tension buckles.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-5 h-5 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mt-0.5 shrink-0">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">Recycled Elastomer Knit</h4>
                    <p className="text-[11px] text-slate-500">Hypoallergenic weave fabric prevents sweat buildup and skin irritation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-5 h-5 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mt-0.5 shrink-0">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">32g Ultra-Lightweight</h4>
                    <p className="text-[11px] text-slate-500">Balanced weight distribution removes tension points across the cranium.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Tension Simulator */}
            <div className="lg:col-span-6 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col justify-between h-[360px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-noesana-orange/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <h3 className="font-bold text-white text-sm">Strap Tension Calibration</h3>
                <p className="text-[11px] text-slate-500 mt-1">Adjust the tension slider to see impact on comfort and contact stability.</p>
              </div>

              {/* Slider tool */}
              <div className="my-6">
                <div className="flex justify-between items-center text-xs font-bold text-white mb-2">
                  <span>Tension Load</span>
                  <span className="font-mono text-noesana-orange">{strapTension}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={strapTension} 
                  onChange={(e) => setStrapTension(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-noesana-orange focus:outline-none"
                />
              </div>

              {/* Outputs */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-left">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Signal Stability</div>
                  <span className={`text-lg font-cyber font-black ${signalStability < 60 ? 'text-red-500' : 'text-emerald-400'}`}>
                    {signalStability}%
                  </span>
                </div>

                <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-left">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Comfort Rating</div>
                  <span className={`text-lg font-cyber font-black ${comfortScore < 60 ? 'text-red-500' : 'text-emerald-400'}`}>
                    {comfortScore}%
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Material Properties & Specifications Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/5">
            
            <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Material Composition</h4>
              <ul className="space-y-2.5 text-[11px] text-slate-400">
                <li className="flex justify-between">
                  <span>Recycled Polyester:</span>
                  <span className="font-semibold text-white">65%</span>
                </li>
                <li className="flex justify-between">
                  <span>Conductive Elastomer:</span>
                  <span className="font-semibold text-white">25%</span>
                </li>
                <li className="flex justify-between">
                  <span>Spandex (Stretch Lycra):</span>
                  <span className="font-semibold text-white">10%</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Tension Physics</h4>
              <ul className="space-y-2.5 text-[11px] text-slate-400">
                <li className="flex justify-between">
                  <span>Tensile Elastic Limit:</span>
                  <span className="font-semibold text-white">18.5 N/cm²</span>
                </li>
                <li className="flex justify-between">
                  <span>Optimal Contact Force:</span>
                  <span className="font-semibold text-white">0.3 - 0.5 N</span>
                </li>
                <li className="flex justify-between">
                  <span>Impedance Range:</span>
                  <span className="font-semibold text-white">5kΩ - 15kΩ</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Comfort Ergonomics</h4>
              <ul className="space-y-2.5 text-[11px] text-slate-400">
                <li className="flex justify-between">
                  <span>Moisture Wicking Index:</span>
                  <span className="font-semibold text-white">4.8 g/m²/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Adjustment Precision:</span>
                  <span className="font-semibold text-white">0.5 mm steps</span>
                </li>
                <li className="flex justify-between">
                  <span>Strap Fit Window:</span>
                  <span className="font-semibold text-white">52 - 62 cm</span>
                </li>
              </ul>
            </div>

          </div>
        </section>


        {/* ---------------- NEW SECTION: Mindware Ecosystem Accessories ---------------- */}
        <section className="py-20 border-b border-white/5 text-left">
          <div className="mb-12">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Expanded Ecosystem</div>
            <h2 className="text-3xl font-black text-white tracking-tight">Ecosystem Accessories & Modules</h2>
            <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
              Enhance your mind-sensing experience. Add specialized physical docks, travel modules, and maintenance blocks calibrated for the Gen-2 headband.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Accessory 1: Magnetic Charging Dock */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-noesana-orange/20 transition-all duration-300">
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={chargingDock} alt="Magnetic charging dock" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Magnetic Charging Dock</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Compact induction cradle featuring magnetic alignment pins for rapid, hassle-free wireless power delivery. Includes LED battery levels.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">SPEC: 15W Qi-Fast</span>
                <span className="font-bold text-noesana-orange">INCLUDED IN BUNDLE</span>
              </div>
            </div>

            {/* Accessory 2: Protective Travel Case */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-noesana-orange/20 transition-all duration-300">
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={travelCase} alt="Hardshell travel case" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Protective Travel Case</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Hardshell custom zippered case lined with anti-static microfiber sleeves to secure your mindware on the move. Built-in USB routing.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">WEIGHT: 110g</span>
                <span className="font-bold text-noesana-orange">WATER-RESISTANT</span>
              </div>
            </div>

            {/* Accessory 3: EEG Calibration Stand */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-noesana-orange/20 transition-all duration-300">
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={headbandStand} alt="EEG Calibration Stand" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">EEG Calibration Stand</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Sleek vertical display stand with contact-charging nodes and automatic dry electrode diagnostics. Keeps sensors aligned and dust-free.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">MATERIAL: Anodized Alum</span>
                <span className="font-bold text-noesana-orange">STANDALONE OPTION</span>
              </div>
            </div>

            {/* Accessory 4: Dome VR Interface Pod */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-noesana-orange/20 transition-all duration-300">
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={vrPod} alt="VR Interface Pod" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Dome VR Interface Pod</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Low-latency wireless bridge module linking EEG telemetry to VR headsets for immersive spatial audio-neural sync.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">LATENCY: &lt; 2.5ms</span>
                <span className="font-bold text-noesana-orange">BLUETOOTH 5.3</span>
              </div>
            </div>

            {/* Accessory 5: Mindware Care Kit */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-noesana-orange/20 transition-all duration-300">
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={sensorCare} alt="Mindware Care Kit" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mindware Care Kit</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Specialized cleaning kit for dry silver-chloride sensors, containing alcohol-free swabs and a micro-fiber calibration cloth.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">CYCLES: 120 Sessions</span>
                <span className="font-bold text-noesana-orange">SENSOR SAFE</span>
              </div>
            </div>

          </div>
        </section>


        {/* ---------------- SECTION 2: EEG BIO-FEEDBACK ---------------- */}
        <section id="eeg" className="py-16 border-b border-white/5 text-left scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Diagram list */}
            <div className="lg:col-span-6 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-3xl h-[380px] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-sm mb-2">Sensor Node Mapping</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-6">
                  Select a node position on the left to read about regional calibration tasks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onClick={() => setActiveElectrode('frontal')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    activeElectrode === 'frontal' ? 'bg-noesana-orange border-noesana-orange text-black' : 'border-white/5 hover:bg-slate-900'
                  }`}
                >
                  Frontal Nodes
                </button>
                <button 
                  onClick={() => setActiveElectrode('temporal')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    activeElectrode === 'temporal' ? 'bg-noesana-orange border-noesana-orange text-black' : 'border-white/5 hover:bg-slate-900'
                  }`}
                >
                  Temporal Nodes
                </button>
                <button 
                  onClick={() => setActiveElectrode('reference')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    activeElectrode === 'reference' ? 'bg-noesana-orange border-noesana-orange text-black' : 'border-white/5 hover:bg-slate-900'
                  }`}
                >
                  Ground Ref
                </button>
              </div>

              <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-left mt-6">
                <h4 className="text-xs font-bold text-white mb-1">{electrodeDetails[activeElectrode].label}</h4>
                <div className="text-[9px] text-noesana-orange uppercase tracking-wider font-semibold mb-2 font-mono">
                  Bands: {electrodeDetails[activeElectrode].waves}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {electrodeDetails[activeElectrode].desc}
                </p>
              </div>

            </div>

            {/* Right: Specs Description */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
                <span>Pillar 02</span>
                <span className="w-1.5 h-1.5 rounded-full bg-noesana-orange" />
                <span>EEG Bio-Feedback Array</span>
              </div>
              
              <h2 className="text-3xl font-black text-white leading-tight">
                Dry-sensor neurotelemetry.
              </h2>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Active pre-amplified electrodes measure electrical microvolt variations at a rate of 250 samples per second. This data is computed by our local ARM processor to rejection eye blinks, muscle movement artifacts, and environment power noise.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-cyber font-black text-2xl text-white">250 Hz</h4>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">ADC Sampling Rate</p>
                </div>
                <div>
                  <h4 className="font-cyber font-black text-2xl text-white">24-Bit</h4>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Signal Resolution</p>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ---------------- SECTION 3: DAILY ANALYTICS ---------------- */}
        <section id="analytics" className="py-16 text-left scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Specs Description */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
                <span>Pillar 03</span>
                <span className="w-1.5 h-1.5 rounded-full bg-noesana-orange" />
                <span>Dome Telemetry Pipeline</span>
              </div>
              
              <h2 className="text-3xl font-black text-white leading-tight">
                Real-world mind insights.
              </h2>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Our calibration software performs a Fast Fourier Transform (FFT) on cleaned waveforms, isolating Delta (deep sleep), Theta (meditation), Alpha (relaxation), and Beta (focus) frequencies. These scores sync via Bluetooth LE directly to your local health logs.
              </p>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">✓</div>
                  <span>Local database processing (AES-256 encrypted)</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">✓</div>
                  <span>Export raw CSV EEG logs for analysis</span>
                </li>
              </ul>
            </div>

            {/* Right: Graphic oscilloscope */}
            <div className="lg:col-span-6 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-3xl h-[340px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-noesana-orange/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-bold text-white text-sm">Dome Telemetry Oscilloscope</h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Scale: 50μV / div</p>
                </div>
                
                <button 
                  onClick={() => setOscActive(!oscActive)}
                  className="px-3.5 py-1.5 rounded-full border border-white/10 hover:border-noesana-orange text-[10px] font-bold uppercase transition-colors"
                >
                  {oscActive ? 'PAUSE' : 'RUN'}
                </button>
              </div>

              {/* Wave Graph Canvas */}
              <div className="w-full h-32 relative overflow-hidden flex items-end my-4">
                <svg className="w-full h-full text-noesana-orange" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <path 
                    d={oscActive ? "M 0 50 C 50 20, 100 20, 150 50 C 200 80, 250 80, 300 50 C 350 20, 400 20, 450 50 C 500 80, 550 80, 600 50" : "M 0 50 L 500 50"}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    className={oscActive ? 'animate-pulse' : ''}
                  />
                </svg>
              </div>

              <div className="flex space-x-2 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                <span>FFT: Active</span>
                <span>•</span>
                <span>Band: Alpha Peak</span>
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
