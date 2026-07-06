import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart, Sparkles, ChevronRight, Activity, ArrowRight, Brain, Zap, Moon, Sun, ChevronDown, Check, Phone, ShieldAlert, Award, Volume2, UserCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Import local assets
import heroHeadband from '../assets/hero_headband.png';
import headbandBack from '../assets/headband_back.png';
import headbandSide from '../assets/headband_side.png';
import chargingDock from '../assets/charging_dock.png';
import travelCase from '../assets/travel_case.png';
import headbandStand from '../assets/headband_stand.png';
import vrPod from '../assets/vr_pod.png';
import sensorCare from '../assets/sensor_care.png';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeAudio, setActiveAudio] = useState('rain');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [hoveredWave, setHoveredWave] = useState(null);
  const [brainMode, setBrainMode] = useState('resting');

  // Calculates color intensity, fill opacity and glow properties for the brain mapping nodes
  const getLobeStyle = (lobeName) => {
    if (hoveredWave) {
      if (lobeName === 'Beta' && hoveredWave === 'Beta') return { fill: 'rgba(56,189,248,0.25)', stroke: 'rgba(56,189,248,0.8)', filter: 'url(#glowBlue)', strokeWidth: 2 };
      if (lobeName === 'Theta' && hoveredWave === 'Theta') return { fill: 'rgba(129,140,248,0.25)', stroke: 'rgba(129,140,248,0.8)', filter: 'url(#glowIndigo)', strokeWidth: 2 };
      if (lobeName === 'Alpha' && hoveredWave === 'Alpha') return { fill: 'rgba(255,85,0,0.2)', stroke: 'rgba(255,85,0,0.7)', filter: 'url(#glowOrange)', strokeWidth: 2 };
      if (lobeName === 'Delta' && hoveredWave === 'Delta') return { fill: 'rgba(16,185,129,0.3)', stroke: 'rgba(16,185,129,0.8)', filter: 'url(#glowGreen)', strokeWidth: 2 };
      return { fill: 'rgba(255,255,255,0.01)', stroke: 'rgba(255,255,255,0.03)', filter: 'none', strokeWidth: 1 };
    }

    if (brainMode === 'sleep') {
      if (lobeName === 'Delta') return { fill: 'rgba(16,185,129,0.35)', stroke: '#10b981', filter: 'url(#glowGreen)', strokeWidth: 2 };
      if (lobeName === 'Theta') return { fill: 'rgba(129,140,248,0.1)', stroke: 'rgba(129,140,248,0.2)', filter: 'none', strokeWidth: 1 };
      if (lobeName === 'Alpha') return { fill: 'rgba(255,85,0,0.04)', stroke: 'rgba(255,85,0,0.1)', filter: 'none', strokeWidth: 1 };
      return { fill: 'rgba(255,255,255,0.01)', stroke: 'rgba(255,255,255,0.02)', filter: 'none', strokeWidth: 1 };
    }
    if (brainMode === 'meditate') {
      if (lobeName === 'Alpha') return { fill: 'rgba(255,85,0,0.3)', stroke: '#ff5500', filter: 'url(#glowOrange)', strokeWidth: 2 };
      if (lobeName === 'Theta') return { fill: 'rgba(129,140,248,0.2)', stroke: '#818cf8', filter: 'url(#glowIndigo)', strokeWidth: 1.5 };
      if (lobeName === 'Delta') return { fill: 'rgba(16,185,129,0.1)', stroke: 'rgba(16,185,129,0.15)', filter: 'none', strokeWidth: 1 };
      return { fill: 'rgba(255,255,255,0.01)', stroke: 'rgba(255,255,255,0.02)', filter: 'none', strokeWidth: 1 };
    }
    if (brainMode === 'resting') {
      if (lobeName === 'Alpha') return { fill: 'rgba(255,85,0,0.15)', stroke: 'rgba(255,85,0,0.4)', filter: 'none', strokeWidth: 1.5 };
      if (lobeName === 'Beta') return { fill: 'rgba(56,189,248,0.15)', stroke: 'rgba(56,189,248,0.4)', filter: 'none', strokeWidth: 1.5 };
      return { fill: 'rgba(255,255,255,0.01)', stroke: 'rgba(255,255,255,0.02)', filter: 'none', strokeWidth: 1 };
    }
    if (brainMode === 'stress') {
      if (lobeName === 'Beta') return { fill: 'rgba(56,189,248,0.35)', stroke: '#38bdf8', filter: 'url(#glowBlue)', strokeWidth: 2 };
      if (lobeName === 'Theta') return { fill: 'rgba(129,140,248,0.1)', stroke: 'rgba(129,140,248,0.2)', filter: 'none', strokeWidth: 1 };
      if (lobeName === 'Alpha') return { fill: 'rgba(255,85,0,0.06)', stroke: 'rgba(255,85,0,0.12)', filter: 'none', strokeWidth: 1 };
      return { fill: 'rgba(255,255,255,0.01)', stroke: 'rgba(255,255,255,0.02)', filter: 'none', strokeWidth: 1 };
    }
    return { fill: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.05)', filter: 'none', strokeWidth: 1 };
  };

  // Clinical Reviews Carousel States
  const reviews = [
    {
      name: "Dr. Sarah Chen",
      role: "Cognitive Neuroscientist",
      text: "The microvolt dry-contact electrode stability on the Noesana headband is incredibly reliable compared to traditional gel arrays. It makes home-based biofeedback simple and effective.",
      statLabel: "Signal Accuracy",
      statValue: "99.4%",
      color: "bg-noesana-orange/10 border-noesana-orange/20 text-noesana-orange"
    },
    {
      name: "David Miller",
      role: "Principal Systems Engineer",
      text: "Using the Beta-wave stress alerts has changed how I code. Dome highlights when my cognitive fatigue spikes, letting me take structured focus breaks before building up burnout.",
      statLabel: "Clarity Score",
      statValue: "92%",
      color: "bg-sky-500/10 border-sky-500/20 text-sky-400"
    },
    {
      name: "Marcus Vance",
      role: "High-Performance Coach",
      text: "Noesana is an essential part of my clients' evening relaxation routine. The Delta entrainment soundscapes consistently guide overactive minds into deep sleep recovery cycles.",
      statLabel: "Sleep Quality",
      statValue: "96%",
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      name: "Dr. Evelyn Carter",
      role: "Stanford Advisory Lead",
      text: "Our lab validated the front silver-chloride channels against medical gel arrays. The signal correlation is remarkable, bringing clinical-grade EEG out of the lab.",
      statLabel: "Alpha Peak",
      statValue: "10.4Hz",
      color: "bg-noesana-orange/10 border-noesana-orange/20 text-noesana-orange"
    },
    {
      name: "Sarah Jenkins",
      role: "Clinical Sleep Specialist",
      text: "The ability to track REM sleep latency directly via localized slow-wave delta mapping is a massive leap forward for personalized sleep hygiene coaching.",
      statLabel: "REM Latency",
      statValue: "-28%",
      color: "bg-sky-500/10 border-sky-500/20 text-sky-400"
    },
    {
      name: "Liam O'Connor",
      role: "Biofeedback Researcher",
      text: "Filtering out physical muscle movement artifacts using local ICA computation delivers extremely clean signal-to-noise ratios, even during light movement.",
      statLabel: "Signal-to-Noise",
      statValue: "48 dB",
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    }
  ];

  const [reviewIndex, setReviewIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(3);

  // Manage max slide index based on screen width to prevent empty slide space
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setMaxIndex(reviews.length - 3); // 3 cards visible on desktop
      } else if (width >= 768) {
        setMaxIndex(reviews.length - 2); // 2 cards visible on tablet
      } else {
        setMaxIndex(reviews.length - 1); // 1 card visible on mobile
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [reviews.length]);

  // Auto scroll carousel effect looping back to 0 at maxIndex
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [maxIndex]);

  // Soundscape Mixer States
  const [rainVolume, setRainVolume] = useState(60);
  const [oceanVolume, setOceanVolume] = useState(50);
  const [droneVolume, setDroneVolume] = useState(40);
  const [binauralPitch, setBinauralPitch] = useState(120);

  // Web Audio Synth Engine Refs
  const audioCtxRef = useRef(null);
  const oscNodesRef = useRef([]);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  
  // Real-time Mixer Nodes Refs
  const noiseGainNodeRef = useRef(null);
  const oscGainNodeRef = useRef(null);
  const primaryOscRef = useRef(null);
  const primaryOscRefRight = useRef(null);

  const startAudioSynth = (type) => {
    stopAudioSynth();
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.08, ctx.currentTime);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      const oscs = [];
      if (type === 'rain' || type === 'ocean') {
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(type === 'rain' ? 800 : 400, ctx.currentTime);
        
        const nGain = ctx.createGain();
        const currentVol = type === 'rain' ? rainVolume : oceanVolume;
        nGain.gain.setValueAtTime((currentVol / 100) * 0.08, ctx.currentTime);
        noiseGainNodeRef.current = nGain;

        whiteNoise.connect(filter);
        filter.connect(nGain);
        nGain.connect(mainGain);
        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;

        // True Binaural Beats: Left (carrier) & Right (carrier + 10Hz offset)
        const leftPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (leftPanner) leftPanner.pan.setValueAtTime(-1, ctx.currentTime);
        const rightPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (rightPanner) rightPanner.pan.setValueAtTime(1, ctx.currentTime);

        const oscL = ctx.createOscillator();
        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(binauralPitch, ctx.currentTime);
        primaryOscRef.current = oscL;

        const oscR = ctx.createOscillator();
        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(binauralPitch + 10, ctx.currentTime);
        primaryOscRefRight.current = oscR;

        const pulseGainL = ctx.createGain();
        pulseGainL.gain.setValueAtTime(0.02, ctx.currentTime);
        const pulseGainR = ctx.createGain();
        pulseGainR.gain.setValueAtTime(0.02, ctx.currentTime);

        if (leftPanner && rightPanner) {
          oscL.connect(pulseGainL);
          pulseGainL.connect(leftPanner);
          leftPanner.connect(mainGain);

          oscR.connect(pulseGainR);
          pulseGainR.connect(rightPanner);
          rightPanner.connect(mainGain);
        } else {
          oscL.connect(pulseGainL);
          pulseGainL.connect(mainGain);
          oscR.connect(pulseGainR);
          pulseGainR.connect(mainGain);
        }

        oscL.start();
        oscR.start();
        oscs.push(oscL, oscR);
      } else if (type === 'drone') {
        const frequencies = [110, 165, 220, 330];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((idx - 1.5) * 8, ctx.currentTime);
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(250, ctx.currentTime);
          
          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime((droneVolume / 100) * 0.03, ctx.currentTime);
          if (idx === 0) oscGainNodeRef.current = oscGain; // track first one for volume changes
          
          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(mainGain);
          osc.start();
          oscs.push(osc);
        });
      }
      oscNodesRef.current = oscs;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by browser policies:", e);
    }
  };

  const stopAudioSynth = () => {
    if (oscNodesRef.current.length > 0) {
      oscNodesRef.current.forEach(node => {
        try { node.stop(); } catch (err) {}
      });
      oscNodesRef.current = [];
    }
    if (noiseNodeRef.current) {
      try { noiseNodeRef.current.stop(); } catch (err) {}
      noiseNodeRef.current = null;
    }
    noiseGainNodeRef.current = null;
    oscGainNodeRef.current = null;
    primaryOscRef.current = null;
    primaryOscRefRight.current = null;
  };

  // Real-time volume slider listeners
  useEffect(() => {
    if (noiseGainNodeRef.current && audioCtxRef.current && audioPlaying) {
      const vol = activeAudio === 'rain' ? rainVolume : activeAudio === 'ocean' ? oceanVolume : 0;
      noiseGainNodeRef.current.gain.setValueAtTime((vol / 100) * 0.08, audioCtxRef.current.currentTime);
    }
  }, [rainVolume, oceanVolume, activeAudio, audioPlaying]);

  useEffect(() => {
    if (oscGainNodeRef.current && audioCtxRef.current && audioPlaying && activeAudio === 'drone') {
      oscGainNodeRef.current.gain.setValueAtTime((droneVolume / 100) * 0.03, audioCtxRef.current.currentTime);
    }
  }, [droneVolume, activeAudio, audioPlaying]);

  useEffect(() => {
    if (audioCtxRef.current && audioPlaying) {
      if (primaryOscRef.current) {
        primaryOscRef.current.frequency.setValueAtTime(binauralPitch, audioCtxRef.current.currentTime);
      }
      if (primaryOscRefRight.current) {
        primaryOscRefRight.current.frequency.setValueAtTime(binauralPitch + 10, audioCtxRef.current.currentTime);
      }
    }
  }, [binauralPitch, audioPlaying]);

  useEffect(() => {
    if (audioPlaying) {
      startAudioSynth(activeAudio);
    } else {
      stopAudioSynth();
    }
    return () => {
      stopAudioSynth();
    };
  }, [audioPlaying, activeAudio]);

  // Simulator States
  const [simState, setSimState] = useState('agitated'); // 'agitated', 'restless', 'calm', 'focused'
  const [simCalmScore, setSimCalmScore] = useState(35);
  const [simHrv, setSimHrv] = useState(55);
  const [simWaveText, setSimWaveText] = useState('High Beta (Stress)');

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Adjust simulator values based on active state
  useEffect(() => {
    switch (simState) {
      case 'agitated':
        setSimCalmScore(32);
        setSimHrv(52);
        setSimWaveText('High Beta Wave (Agitated)');
        break;
      case 'restless':
        setSimCalmScore(55);
        setSimHrv(68);
        setSimWaveText('Low Beta / Alpha Wave (Restless)');
        break;
      case 'calm':
        setSimCalmScore(82);
        setSimHrv(88);
        setSimWaveText('Alpha Wave Rhythms (Calm)');
        break;
      case 'focused':
        setSimCalmScore(96);
        setSimHrv(94);
        setSimWaveText('Gamma & Theta Wave (Deep Focus)');
        break;
      default:
        break;
    }
  }, [simState]);

  // Helper to generate mathematically smooth, bounded waves for the simulator
  const generateSimulatorWavePath = (state) => {
    let points = [];
    const steps = 120;
    let frequency = 2;
    let amplitude = 20;
    
    if (state === 'agitated') {
      frequency = 12;
      amplitude = 25;
    } else if (state === 'restless') {
      frequency = 6;
      amplitude = 22;
    } else if (state === 'calm') {
      frequency = 3;
      amplitude = 20;
    } else if (state === 'focused') {
      frequency = 1.5;
      amplitude = 15;
    }

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 500;
      const rad = (i / steps) * Math.PI * 2 * frequency;
      
      // Add slight secondary high-frequency noise for agitated/restless to simulate authentic neural signals
      let noise = 0;
      if (state === 'agitated') {
        noise = Math.sin(rad * 3.5) * 5;
      } else if (state === 'restless') {
        noise = Math.sin(rad * 2.0) * 3;
      }
      
      const y = 50 + Math.sin(rad) * amplitude + noise;
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  const generateMiniWavePath = (type) => {
    let points = [];
    const width = 400;
    const height = 40;
    const midY = height / 2;
    
    let frequency = 1;
    let amplitude = 12;
    let isSpikey = false;
    
    if (type === 'Alpha') {
      frequency = 0.08;
      amplitude = 8;
    } else if (type === 'Beta') {
      frequency = 0.22;
      amplitude = 12;
      isSpikey = true;
    } else if (type === 'Theta') {
      frequency = 0.04;
      amplitude = 10;
    } else if (type === 'Delta') {
      frequency = 0.02;
      amplitude = 14;
    }
    
    for (let x = 0; x <= width; x += isSpikey ? 6 : 2) {
      const angle = x * frequency;
      const y = midY + Math.sin(angle) * amplitude;
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  const brainwaves = [
    {
      name: 'Alpha Waves',
      freq: '8 - 12 Hz',
      state: 'Flow & Calm',
      origin: 'Occipital Lobe',
      soundscape: 'Forest Rain',
      desc: 'Associated with deep physical relaxation, relaxed focus, and peak creative flow. Noesana uses alpha density to modulate ambient audio guides.',
      color: 'border-noesana-orange/15 text-noesana-orange bg-noesana-orange/5 hover:border-noesana-orange/40 hover:shadow-[0_0_30px_rgba(255,85,0,0.08)]',
      icon: <Brain className="w-5 h-5 text-noesana-orange" />
    },
    {
      name: 'Beta Waves',
      freq: '12 - 30 Hz',
      state: 'Alert Focus',
      origin: 'Prefrontal Cortex',
      soundscape: 'Binaural Focus',
      desc: 'Associated with active thinking, analytical problem solving, and external processing. Noesana identifies beta spikes to flag stress thresholds.',
      color: 'border-sky-500/15 text-sky-400 bg-sky-500/5 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.08)]',
      icon: <Zap className="w-5 h-5 text-sky-400" />
    },
    {
      name: 'Theta Waves',
      freq: '4 - 8 Hz',
      state: 'Deep Meditation',
      origin: 'Hippocampus',
      soundscape: 'Ocean Swell',
      desc: 'Occurs during light sleep, deep meditative states, and visual dreaming. Theta amplification marks transitions into deep focus.',
      color: 'border-indigo-500/15 text-indigo-400 bg-indigo-500/5 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(129,140,248,0.08)]',
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />
    },
    {
      name: 'Delta Waves',
      freq: '0.5 - 4 Hz',
      state: 'Deep Sleep Recovery',
      origin: 'Thalamus',
      soundscape: 'Cosmic Drone',
      desc: 'Slow, high-amplitude waves characterizing dreamless deep sleep. Tracking delta-wave intensity determines physical restoration quality.',
      color: 'border-emerald-500/15 text-emerald-400 bg-emerald-500/5 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]',
      icon: <Moon className="w-5 h-5 text-emerald-400" />
    }
  ];

  const faqItems = [
    {
      q: 'How does Noesana measure brain activity?',
      a: 'Noesana uses passive, dry-contact silver-chloride electrodes built into the forehead and occipital bands. These sensors detect microvolt electrical potentials (EEG) generated by your brainwaves. The device does not send electrical currents into your head; it is completely passive and 100% safe.'
    },
    {
      q: 'Does it fit all head sizes comfortably?',
      a: 'Yes. The headband features an occipital comfort buckle and a stretch-woven structural strap. It easily adjusts to head circumferences between 52 cm and 62 cm, providing consistent electrode contact without pinch points.'
    },
    {
      q: 'How long does the battery last?',
      a: 'The Gen-2 headband has an ultra-thin lithium-ion cell that delivers up to 14 hours of continuous tracking on a single charge. It fully recharges on the included magnetic dock via USB-C in 90 minutes.'
    },
    {
      q: 'Can I use Noesana offline?',
      a: 'Yes. The headband caches up to 8 hours of raw calibration sessions locally. Once you reconnect to the Dome App via Bluetooth, your logs are automatically synchronized and compiled.'
    }
  ];

  return (
    <div className="bg-black text-slate-200">
      
      {/* ---------------- 1. Hero Section (Light Theme Card) ---------------- */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto bg-noesana-white text-black rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col items-center text-center">
          
          {/* Subtle abstract glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-noesana-orange/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            
            {/* Rating */}
            <div className="flex items-center space-x-1 text-noesana-orange mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-2">100k+ Happy Users</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-slate-900 mb-6">
              Calm Your Mind.<br />
              Elevate Your Clarity.
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
              Experience the world's most advanced mind-sensing headband. Designed to guide your meditation, reduce stress, and improve focus in real time.
            </p>

            <Link to="/shop" className="px-8 py-4 bg-noesana-orange hover:bg-black text-white hover:text-white transition-all rounded-full font-bold text-sm uppercase tracking-wider shadow-lg shadow-noesana-orange/20 mb-12 flex items-center space-x-2">
              <span>Get Yours Now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Main Visual Arena (Split Columns) */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
            
            {/* Left sidebar: floating widget details */}
            <div className="lg:col-span-3 flex flex-col space-y-4 lg:text-left text-center">
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm text-left">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Tension Level</div>
                <div className="text-2xl font-black text-slate-800 mb-2">80% decrease</div>
                <div className="w-full h-8 relative flex items-end">
                  {/* Mini-line chart */}
                  <svg className="w-full h-full text-noesana-orange" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M 0 18 Q 20 15 40 8 T 80 12 T 100 2" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Center headwear image */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="relative w-full max-w-[340px] aspect-square rounded-full bg-slate-200/50 border border-slate-200 flex items-center justify-center p-4">
                <img 
                  src={heroHeadband} 
                  alt="Noesana headband product front view"
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
              </div>
            </div>

            {/* Right sidebar: index metrics */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Clarity Index</span>
                  <span className="text-xs font-bold text-noesana-orange">92%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-noesana-orange h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Sleep Quality</span>
                  <span className="text-xs font-bold text-emerald-500">94%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ---------------- NEW SECTION: Press Logo Bar ---------------- */}
      <section className="py-8 bg-black border-y border-white/5 select-none opacity-45">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-6 text-xs font-cyber font-extrabold tracking-widest text-slate-500">
          <span>WIRED</span>
          <span>TECHCRUNCH</span>
          <span>FORBES</span>
          <span>ENGADGET</span>
          <span>MIT TECH REVIEW</span>
        </div>
      </section>


      {/* ---------------- 2. Statement/Pitch Section (Black Background) ---------------- */}
      <section className="py-24 bg-black text-center px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-8">
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium leading-relaxed max-w-2xl">
            We help you slow down, release mental <span className="text-noesana-orange font-bold">tension</span>, and regain control of your mind.
          </p>
          <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
            Feel calmer, clearer, and more balanced throughout your day with bio-feedback mind calibration.
          </p>
          <Link to="/shop" className="px-8 py-3.5 bg-noesana-orange hover:bg-white text-black font-bold rounded-full text-xs uppercase tracking-wider transition-all shadow-lg shadow-noesana-orange/10">
            Shop Now
          </Link>
        </div>
      </section>


      {/* ---------------- Brainwave States Grid (Alpha, Beta, Theta, Delta) + Brain Hotspot Mapper ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-xl mb-12">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Biometric Calibration</div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-tight">Identify Your Rhythms</h2>
            <p className="text-slate-400 text-sm mt-3">
              The Noesana headband classifies cortical oscillation speeds to customize guided soundscapes dynamically. Hover over a wave type to see its origin on the brain map.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">

            {/* Left: Wave Cards */}
            <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {brainwaves.map((wave, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  onMouseEnter={() => setHoveredWave(wave.name.split(' ')[0])}
                  onMouseLeave={() => setHoveredWave(null)}
                  className={`border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${wave.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center">
                          {wave.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white leading-none">{wave.name}</h3>
                          <span className="text-[10px] text-slate-500 font-mono mt-1 block">{wave.freq}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
                        {wave.state}
                      </span>
                    </div>

                    {/* Dynamic Micro-Waveform Canvas */}
                    <div className="w-full h-12 bg-black/40 border border-white/5 rounded-xl my-4 flex items-center overflow-hidden relative">
                      <svg className="w-[400px] h-full" viewBox="0 0 400 40" preserveAspectRatio="none">
                        <motion.path
                          d={generateMiniWavePath(wave.name.split(' ')[0])}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          animate={{ x: [-200, 0] }}
                          transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: wave.name.startsWith('Alpha') ? 2.5 : wave.name.startsWith('Beta') ? 1.0 : wave.name.startsWith('Theta') ? 4.5 : 7.0
                          }}
                        />
                      </svg>
                    </div>

                    <p className="text-slate-400 text-[11px] leading-relaxed mb-6">{wave.desc}</p>
                    
                    {/* Detailed telemetries */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-[10px]">
                      <div>
                        <span className="text-slate-500 block uppercase font-bold tracking-wider mb-0.5">Brain Origin</span>
                        <span className="text-white font-medium">{wave.origin}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase font-bold tracking-wider mb-0.5">Target Soundscape</span>
                        <span className="text-white font-medium">{wave.soundscape}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Interactive Brain SVG Hotspot Mapper */}
            <div className="xl:col-span-5 flex flex-col items-center justify-center sticky top-32">
              <div className="bg-black/60 border border-white/5 rounded-3xl p-8 w-full relative overflow-hidden">
                <div className="text-center mb-6">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Neural Region Mapper</div>
                  <h3 className="text-sm font-bold text-white">
                    {hoveredWave ? `${hoveredWave} Wave — Active Region` : 'Hover a Wave Card'}
                  </h3>
                </div>

                {/* Stylized Brain SVG - Side Profile */}
                <svg viewBox="0 0 400 360" className="w-full max-w-[340px] mx-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Glow filters */}
                  <defs>
                    <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glowIndigo" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* Brain outline (side profile) */}
                  <path
                    d="M 200 40 C 120 40, 60 80, 55 140 C 50 180, 60 220, 80 250 C 95 270, 110 290, 140 310 C 170 325, 210 330, 240 320 C 270 310, 300 280, 320 250 C 340 220, 350 180, 345 140 C 340 100, 310 60, 260 45 C 240 40, 220 38, 200 40 Z"
                    fill="none"
                    stroke="var(--brain-outline)"
                    strokeWidth="2"
                  />

                  {/* Central fissure line */}
                  <path d="M 200 45 C 195 100, 200 180, 210 310" fill="none" stroke="var(--brain-connector)" strokeWidth="1" strokeDasharray="4 6" />

                  {/* Prefrontal Cortex (Beta) - Front left */}
                  <ellipse
                    cx="120" cy="130"
                    rx="45" ry="55"
                    fill={getLobeStyle('Beta').fill}
                    stroke={getLobeStyle('Beta').stroke}
                    strokeWidth={getLobeStyle('Beta').strokeWidth}
                    filter={getLobeStyle('Beta').filter}
                    className="transition-all duration-700"
                  />
                  <text x="120" y="125" textAnchor="middle" fill={hoveredWave === 'Beta' ? '#38bdf8' : 'var(--brain-text-primary)'} fontSize="9" fontWeight="bold" className="transition-all duration-500 uppercase" letterSpacing="1.5">Prefrontal</text>
                  <text x="120" y="138" textAnchor="middle" fill={hoveredWave === 'Beta' ? '#38bdf8' : 'var(--brain-text-secondary)'} fontSize="7" className="transition-all duration-500">Cortex</text>

                  {/* Temporal Lobe (Theta) - Side middle */}
                  <ellipse
                    cx="115" cy="230"
                    rx="40" ry="35"
                    fill={getLobeStyle('Theta').fill}
                    stroke={getLobeStyle('Theta').stroke}
                    strokeWidth={getLobeStyle('Theta').strokeWidth}
                    filter={getLobeStyle('Theta').filter}
                    className="transition-all duration-700"
                  />
                  <text x="115" y="228" textAnchor="middle" fill={hoveredWave === 'Theta' ? '#818cf8' : 'var(--brain-text-primary)'} fontSize="9" fontWeight="bold" className="transition-all duration-500 uppercase" letterSpacing="1.5">Temporal</text>
                  <text x="115" y="241" textAnchor="middle" fill={hoveredWave === 'Theta' ? '#818cf8' : 'var(--brain-text-secondary)'} fontSize="7" className="transition-all duration-500">Hippocampus</text>

                  {/* Occipital Lobe (Alpha) - Back top */}
                  <ellipse
                    cx="300" cy="170"
                    rx="38" ry="50"
                    fill={getLobeStyle('Alpha').fill}
                    stroke={getLobeStyle('Alpha').stroke}
                    strokeWidth={getLobeStyle('Alpha').strokeWidth}
                    filter={getLobeStyle('Alpha').filter}
                    className="transition-all duration-700"
                  />
                  <text x="300" y="167" textAnchor="middle" fill={hoveredWave === 'Alpha' ? '#ff5500' : 'var(--brain-text-primary)'} fontSize="9" fontWeight="bold" className="transition-all duration-500 uppercase" letterSpacing="1.5">Occipital</text>
                  <text x="300" y="180" textAnchor="middle" fill={hoveredWave === 'Alpha' ? '#ff5500' : 'var(--brain-text-secondary)'} fontSize="7" className="transition-all duration-500">Lobe</text>

                  {/* Thalamus / Deep Core (Delta) - Center */}
                  <ellipse
                    cx="210" cy="200"
                    rx="30" ry="28"
                    fill={getLobeStyle('Delta').fill}
                    stroke={getLobeStyle('Delta').stroke}
                    strokeWidth={getLobeStyle('Delta').strokeWidth}
                    filter={getLobeStyle('Delta').filter}
                    className="transition-all duration-700"
                  />
                  <text x="210" y="198" textAnchor="middle" fill={hoveredWave === 'Delta' ? '#10b981' : 'var(--brain-text-primary)'} fontSize="9" fontWeight="bold" className="transition-all duration-500 uppercase" letterSpacing="1.5">Thalamus</text>
                  <text x="210" y="211" textAnchor="middle" fill={hoveredWave === 'Delta' ? '#10b981' : 'var(--brain-text-secondary)'} fontSize="7" className="transition-all duration-500">Deep Core</text>

                  {/* Connecting neural pathways (subtle lines) */}
                  <line x1="155" y1="145" x2="185" y2="190" stroke="var(--brain-connector)" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="240" y1="195" x2="268" y2="175" stroke="var(--brain-connector)" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="145" y1="200" x2="182" y2="200" stroke="var(--brain-connector)" strokeWidth="1" strokeDasharray="3 5" />
                </svg>

                {/* Active region label */}
                <div className="text-center mt-4">
                  {hoveredWave === 'Alpha' && <span className="text-[10px] text-noesana-orange font-bold animate-pulse">● Occipital Lobe — Relaxation & Creative Flow</span>}
                  {hoveredWave === 'Beta' && <span className="text-[10px] text-sky-400 font-bold animate-pulse">● Prefrontal Cortex — Analytical Processing</span>}
                  {hoveredWave === 'Theta' && <span className="text-[10px] text-indigo-400 font-bold animate-pulse">● Hippocampus — Memory & Deep Meditation</span>}
                  {hoveredWave === 'Delta' && <span className="text-[10px] text-emerald-400 font-bold animate-pulse">● Thalamus — Dreamless Sleep & Recovery</span>}
                  {!hoveredWave && <span className="text-[10px] text-slate-500">Active Preset: <span className="text-white font-bold capitalize">{brainMode} mode</span></span>}
                </div>

                {/* Brain State Heatmap Slider */}
                <div className="mt-6 bg-slate-950/80 border border-white/5 p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    <span>EEG Heatmap Preset Simulator</span>
                    <span className="text-noesana-orange capitalize">{brainMode} Mode</span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="3" 
                    value={brainMode === 'sleep' ? 0 : brainMode === 'meditate' ? 1 : brainMode === 'resting' ? 2 : 3}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val === 0) setBrainMode('sleep');
                      else if (val === 1) setBrainMode('meditate');
                      else if (val === 2) setBrainMode('resting');
                      else setBrainMode('stress');
                    }}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-noesana-orange"
                  />

                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>Sleep (Delta)</span>
                    <span>Meditate (Alpha)</span>
                    <span>Resting (Alpha/Beta)</span>
                    <span>Stress (Beta)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ---------------- NEW SECTION: Interactive Mindwave Sandbox Simulator ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Explanation */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Interactive Simulator</span>
              </div>
              <h2 className="text-3xl font-black text-white leading-tight">
                Try active bio-feedback.
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Click different mental states on the right to see how the dry sensors detect neural change and alter clarity metrics instantly.
              </p>

              {/* Selector buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSimState('agitated')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    simState === 'agitated' ? 'bg-noesana-orange border-noesana-orange text-black' : 'border-white/5 hover:bg-slate-900'
                  }`}
                >
                  Agitated
                </button>
                <button 
                  onClick={() => setSimState('restless')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    simState === 'restless' ? 'bg-noesana-orange border-noesana-orange text-black' : 'border-white/5 hover:bg-slate-900'
                  }`}
                >
                  Restless
                </button>
                <button 
                  onClick={() => setSimState('calm')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    simState === 'calm' ? 'bg-noesana-orange border-noesana-orange text-black' : 'border-white/5 hover:bg-slate-900'
                  }`}
                >
                  Calm
                </button>
                <button 
                  onClick={() => setSimState('focused')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    simState === 'focused' ? 'bg-noesana-orange border-noesana-orange text-black' : 'border-white/5 hover:bg-slate-900'
                  }`}
                >
                  Deep Focus
                </button>
              </div>
            </div>

            {/* Right: Graphic Panel */}
            <div className="lg:col-span-7 bg-slate-950 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-96 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-noesana-orange/5 rounded-full blur-3xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-bold text-white text-sm">Dome Telemetry Feed</h3>
                  <p className="text-slate-500 text-[10px] font-mono mt-0.5">Sensor Array: Active</p>
                </div>
                <span className="text-[10px] font-mono text-noesana-orange font-bold uppercase tracking-wider bg-noesana-orange/15 border border-noesana-orange/20 px-2.5 py-1 rounded-md">
                  {simWaveText}
                </span>
              </div>

              {/* Wave graph visualizer */}
              <div className="w-full h-32 relative overflow-hidden flex items-end my-4">
                <svg className="w-full h-full text-noesana-orange" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <path 
                    d={generateSimulatorWavePath(simState)} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Clarity Score</div>
                  <div className="text-xl font-cyber font-black text-white">{simCalmScore}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Heart Rate Coherence</div>
                  <div className="text-xl font-cyber font-black text-noesana-orange">{simHrv} bpm</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ---------------- NEW SECTION: Interactive Audio Guides Simulator ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Detail Pitch & Mixer Console */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Closed-Loop Soundscapes</span>
            </div>
            <h2 className="text-3xl font-black text-white leading-tight">
              Acoustic Bio-Feedback Simulator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Experience the responsive audio system. Click a preset soundscape, then adjust the mixing board sliders below to test the synthetic web audio engine in real time.
            </p>

            {/* Soundscape presets */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'rain', label: 'Forest Rain' },
                { id: 'ocean', label: 'Deep Ocean' },
                { id: 'drone', label: 'Cosmic Drone' }
              ].map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => {
                    setActiveAudio(sound.id);
                    setAudioPlaying(true);
                  }}
                  className={`py-2 px-3 rounded-lg border text-center transition-all text-[10px] font-bold ${
                    activeAudio === sound.id 
                      ? 'border-noesana-orange bg-noesana-orange/15 text-white' 
                      : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                  }`}
                >
                  {sound.label}
                </button>
              ))}
            </div>

            {/* Mixer Sliders */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-2 border-b border-white/5 pb-2">Dome Mixer Board</div>
              
              {/* Rain Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Forest Rain Volume</span>
                  <span className="font-mono text-noesana-orange">{rainVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainVolume}
                  onChange={(e) => setRainVolume(Number(e.target.value))}
                  className="w-full accent-noesana-orange bg-slate-900 h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Ocean Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Deep Ocean Volume</span>
                  <span className="font-mono text-noesana-orange">{oceanVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={oceanVolume}
                  onChange={(e) => setOceanVolume(Number(e.target.value))}
                  className="w-full accent-noesana-orange bg-slate-900 h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Drone Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Cosmic Drone Volume</span>
                  <span className="font-mono text-noesana-orange">{droneVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={droneVolume}
                  onChange={(e) => setDroneVolume(Number(e.target.value))}
                  className="w-full accent-noesana-orange bg-slate-900 h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Binaural Pitch Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Binaural Pitch Frequency</span>
                  <span className="font-mono text-noesana-orange">{binauralPitch} Hz</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="250"
                  value={binauralPitch}
                  onChange={(e) => setBinauralPitch(Number(e.target.value))}
                  className="w-full accent-noesana-orange bg-slate-900 h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right: Graphic visualizer panel */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[420px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-noesana-orange/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h3 className="font-bold text-white text-sm">Bio-Acoustic Output Engine</h3>
                <p className="text-slate-500 text-[10px] font-mono mt-0.5">Mode: Closed Loop</p>
              </div>
              <button
                onClick={() => setAudioPlaying(!audioPlaying)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all ${
                  audioPlaying ? 'bg-red-500/10 border border-red-500/20 text-red-500' : 'bg-noesana-orange text-black'
                }`}
              >
                {audioPlaying ? 'Pause Audio' : 'Play Audio'}
              </button>
            </div>

            {/* Simulated Staggered Audio Bars */}
            <div className="h-44 w-full flex items-center justify-center space-x-1.5 px-4 bg-slate-950/60 border border-white/5 rounded-2xl relative overflow-hidden">
              {Array.from({ length: 18 }).map((_, i) => {
                const heights = [15, Math.random() * 60 + 20, 15];
                const duration = Math.random() * 0.4 + 0.4;
                return (
                  <motion.div
                    key={i}
                    animate={audioPlaying ? { height: heights } : { height: 8 }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className={`w-2.5 rounded-full ${
                      activeAudio === 'rain' ? 'bg-teal-400' :
                      activeAudio === 'ocean' ? 'bg-sky-400' :
                      'bg-noesana-orange'
                    }`}
                    style={{ height: 8 }}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest pt-2">
              <span>Decoder: AudioOut</span>
              <span>•</span>
              <span>Active: {activeAudio.toUpperCase()} Presets</span>
            </div>

          </div>

        </div>
      </section>


      {/* ---------------- 3. Calm States Teaser Panel (Light Grey Card) ---------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto bg-noesana-white text-black rounded-3xl p-8 sm:p-12 relative overflow-hidden text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Teaser Detail */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mind-Sensing Bio-Feedback</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                Track Your Calm.<br />
                Improve Your Mind.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                NOESANA is equipped with medical-grade EEG and heart-rate sensors. These sensors detect your brainwaves, translating mental activity into gentle audio guides.
              </p>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-xs text-slate-700 font-semibold">
                  <div className="w-4 h-4 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange">✓</div>
                  <span>EEG Neuro-feedback calibrations</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-700 font-semibold">
                  <div className="w-4 h-4 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange">✓</div>
                  <span>Real-time focus and sleep tracking</span>
                </div>
              </div>
              <Link to="/analytics" className="px-6 py-3.5 bg-noesana-orange hover:bg-black text-white hover:text-white transition-all rounded-full font-bold text-xs uppercase tracking-wider shadow-md w-fit flex items-center space-x-2">
                <span>Open Live Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Right Teaser Mockup Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-2">Calm States</div>
                <div className="h-20 w-full flex items-end justify-between space-x-1.5 pt-2">
                  <div className="flex-1 bg-noesana-orange/30 h-10 rounded-t-sm" />
                  <div className="flex-1 bg-noesana-orange/50 h-14 rounded-t-sm" />
                  <div className="flex-1 bg-noesana-orange/80 h-16 rounded-t-sm" />
                  <div className="flex-1 bg-noesana-orange h-20 rounded-t-sm" />
                  <div className="flex-1 bg-noesana-orange/40 h-12 rounded-t-sm" />
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Active Index</div>
                  <div className="text-xl font-bold text-slate-800">4,200 pts</div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
                  <div className="bg-noesana-orange h-full rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img src={headbandBack} alt="Wearable back focus" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Device Hook</div>
                  <div className="text-xs text-slate-700 leading-relaxed font-semibold">
                    The flexible occipital buckle wraps comfortably, adapting to any skull shape for clear, continuous signal collection.
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ---------------- 4. Product showcase / Calm Technology Grid (Black Background) ---------------- */}
      <section className="py-24 bg-black relative border-t border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left">
            <div>
              <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Designed For Everyday Life</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">Calm Technology.</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mt-4 md:mt-0 leading-relaxed">
              We focus on comfort, biological alignment, and simple daily interface metrics to restore focus easily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Comfort Fit */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={headbandSide} alt="Headband side view" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Comfort Fit Strap</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Ultra-lightweight fabric materials and highly flexible chassis curves ensure you forget you are wearing it.
                </p>
              </div>
              <Link to="/hardware#comfort" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore Fit Tech</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 2: Bio-Feedback */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={heroHeadband} alt="Headband front view" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">EEG Bio-Feedback</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Active electrical sensors measure neural rhythm patterns, immediately shifting the acoustic soundscapes to calm active brains.
                </p>
              </div>
              <Link to="/hardware#eeg" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore EEG Sensors</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 3: Daily Analytics */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={headbandBack} alt="Headband back strap" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Daily Analytics</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  View structural reports detailing deep sleep stages, daily distraction alerts, and overall clarity patterns in your Dome App.
                </p>
              </div>
              <Link to="/hardware#analytics" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore App Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 4: Closed-Loop Audio */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={heroHeadband} alt="Headband audio engine" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500 brightness-95" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Closed-Loop Audio</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Binaural beat synthesis and real-time noise masking adapt dynamically to shield your focus from external micro-arousals.
                </p>
              </div>
              <Link to="/technology/sleep" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore Sound Tech</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 5: Magnetic Charging Dock */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={chargingDock} alt="Magnetic charging dock" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Magnetic Charging Dock</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Compact induction cradle featuring magnetic alignment pins for rapid, hassle-free wireless power delivery.
                </p>
              </div>
              <Link to="/shop" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore Accessories</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 6: Protective Travel Case */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={travelCase} alt="Hardshell travel case" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Protective Travel Case</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Hardshell custom zippered case lined with anti-static microfiber sleeves to secure your mindware on the move.
                </p>
              </div>
              <Link to="/shop" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore Case Specs</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 7: EEG Calibration Stand */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={headbandStand} alt="EEG Calibration Stand" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">EEG Calibration Stand</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Sleek vertical display stand with contact-charging nodes and automatic dry electrode diagnostics.
                </p>
              </div>
              <Link to="/shop" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore Stand Details</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 8: Dome VR Interface Pod */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={vrPod} alt="VR Interface Pod" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Dome VR Interface Pod</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Low-latency wireless bridge module linking EEG telemetry to VR headsets for immersive spatial audio-neural sync.
                </p>
              </div>
              <Link to="/shop" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore VR Sync</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 9: Mindware Care Kit */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(255, 85, 0, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 group"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-6 flex items-center justify-center p-4">
                  <img src={sensorCare} alt="Mindware Care Kit" className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Mindware Care Kit</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Specialized cleaning kit for dry silver-chloride sensors, containing alcohol-free swabs and a micro-fiber calibration cloth.
                </p>
              </div>
              <Link to="/shop" className="mt-6 flex items-center justify-between text-xs font-bold text-noesana-orange group-hover:translate-x-1.5 transition-transform">
                <span>Explore Care Kit</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ---------------- "How a Session Works" (Step-by-step) ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-xl mb-16">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Guided Mind Journey</div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-tight">How it Works</h2>
            <p className="text-slate-400 text-sm mt-3">
              Three simple steps to re-align your neural focus loops during daily calibration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="flex flex-col space-y-4">
              <div className="font-cyber font-black text-4xl text-noesana-orange/20">01</div>
              <h3 className="text-lg font-bold text-white">Wear & Calibrate</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Slip on the lightweight headband. Electrodes form a secure contact, checking signal baseline metrics with the Dome app under 10 seconds.
              </p>
            </div>

            <div className="flex flex-col space-y-4 border-t sm:border-t-0 sm:border-l border-white/5 pt-6 sm:pt-0 sm:pl-8">
              <div className="font-cyber font-black text-4xl text-noesana-orange/20">02</div>
              <h3 className="text-lg font-bold text-white">Acoustic Audio Feedback</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Close your eyes and breathe. Real-time brainwaves modulate soundscapes—shifting weather patterns from storm logs to silent calm as your focus rises.
              </p>
            </div>

            <div className="flex flex-col space-y-4 border-t sm:border-t-0 sm:border-l border-white/5 pt-6 sm:pt-0 sm:pl-8">
              <div className="font-cyber font-black text-4xl text-noesana-orange/20">03</div>
              <h3 className="text-lg font-bold text-white">Log Neural Trends</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Review your session logs. Watch clarity levels rise, heart rate parameters stabilize, and sleep indicators compile over time.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ---------------- App Ecosystem Showcase ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/5 text-left overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
              <Phone className="w-3.5 h-3.5" />
              <span>Dome Companion App</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Calm Telemetry in the palm of your hand.
            </h2>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              The Dome app serves as your cognitive dashboard. Replay session brainwave logs, monitor heart-rate variability (HRV) stress markers, and unlock personalized breathing guides.
            </p>

            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-center space-x-2.5">
                <div className="w-4 h-4 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">✓</div>
                <span>Syncs via Bluetooth Low Energy (BLE)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <div className="w-4 h-4 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">✓</div>
                <span>Export raw CSV telemetry data</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <div className="w-4 h-4 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">✓</div>
                <span>Apple Health and Google Fit integrations</span>
              </li>
            </ul>
          </div>

          {/* SVG App Phone mockup */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div className="phone-mockup relative w-64 aspect-[1/2] rounded-[36px] bg-slate-900 border-[8px] border-slate-800 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Phone speaker notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-b-xl z-20" />

              {/* App Content */}
              <div className="flex-1 flex flex-col justify-between pt-6 text-white text-left text-xs relative z-10 space-y-4">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-cyber font-bold text-[9px] tracking-wider">DOME ENGINE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-noesana-orange animate-pulse" />
                </div>

                {/* Score circle */}
                <div className="w-28 h-28 rounded-full border-4 border-noesana-orange/30 border-t-noesana-orange flex flex-col items-center justify-center mx-auto my-2 shadow-lg shadow-noesana-orange/5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Focus</span>
                  <span className="text-xl font-cyber font-black text-white">88%</span>
                </div>

                {/* Mini chart */}
                <div className="bg-slate-950/60 border border-white/5 rounded-xl p-3 flex-1 flex flex-col justify-between min-h-[80px]">
                  <span className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">HRV Telemetry</span>
                  <svg className="w-full h-12 text-emerald-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path d="M 0 22 C 25 8, 35 8, 50 18 C 65 26, 75 26, 100 12" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
                  </svg>
                </div>

              </div>

              {/* Phone home indicator bar */}
              <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mt-2 z-20" />
            </div>
            
            {/* Background absolute glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-noesana-orange/5 rounded-full blur-[80px] pointer-events-none" />
          </div>

        </div>
      </section>


      {/* ---------------- NEW SECTION: Neuro-Performance Reviews & Case Studies (Auto-Scrolling Carousel) ---------------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/5 text-left overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Clinical & Peer Reviews</div>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight">Trusted by Neuroscientists</h2>
              <p className="text-slate-400 text-sm mt-3">
                Hear from leading brain researchers, software developers, and mental performance coaches who calibrate their minds daily.
              </p>
            </div>

            {/* Slider Dots */}
            <div className="flex space-x-2">
              {reviews.slice(0, maxIndex + 1).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    reviewIndex === idx ? 'bg-noesana-orange w-6' : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Carousel Viewport */}
          <div className="w-full overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translate3d(-${reviewIndex * 344}px, 0, 0)`
              }}
            >
              {reviews.map((rev, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-noesana-orange/20 transition-all duration-300 min-h-[220px] w-[320px] shrink-0"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1.5 text-noesana-orange">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{rev.name}</div>
                      <div className="text-[10px] text-slate-500">{rev.role}</div>
                    </div>
                    <div className={`px-2.5 py-1 rounded text-center shrink-0 border ${
                      rev.color.includes('orange') 
                        ? 'bg-noesana-orange/15 border-noesana-orange/20 text-noesana-orange' 
                        : rev.color.includes('sky') 
                        ? 'bg-sky-500/15 border-sky-500/20 text-sky-400' 
                        : 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400'
                    }`}>
                      <div className="text-[8px] text-slate-400 uppercase tracking-widest leading-none font-bold">{rev.statLabel}</div>
                      <div className="text-xs font-cyber font-bold mt-0.5">{rev.statValue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ---------------- NEW SECTION: Ethics & Neural Data Privacy Commitment ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-xl bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Biometric Ethics & Trust
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Your mind is yours alone. We believe neural data privacy is a fundamental human right.
            </p>
          </div>

          <div className="lg:col-span-8 bg-slate-900/30 border border-white/5 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-2.5 h-2.5 rounded-full bg-noesana-orange mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Local Processing Only</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Raw EEG microvolt signals are computed locally on your phone and never uploaded to our servers or stored in any cloud environment.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-2.5 h-2.5 rounded-full bg-noesana-orange mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Zero Commercialization</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Noesana does not license, share, or sell neural logs to advertising networks or third-party data aggregators.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-2.5 h-2.5 rounded-full bg-noesana-orange mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Permanent Data Wipe</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  You retain complete ownership of your data history. Clear your local calibration database logs with a single tap in the Dome App settings.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ---------------- NEW SECTION: EEG Comparison Table ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-white/5 text-left scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-xl mb-12">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Market Analysis</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">How Noesana Compares</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              A clinical comparison between the Gen-2 headband, traditional gelled EEG arrays, and smartwatch sensors.
            </p>
          </div>

          <div className="overflow-x-auto w-full border border-white/5 rounded-2xl bg-slate-900/10">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider bg-black/40">
                  <th className="py-4 px-4 sm:px-6">Monitoring Parameters</th>
                  <th className="py-4 px-4 sm:px-6 text-noesana-orange">Noesana Gen-2</th>
                  <th className="py-4 px-4 sm:px-6">Gelled EEG Systems</th>
                  <th className="py-4 px-4 sm:px-6">Standard Smartwatches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {[
                  { param: 'Sensor Setup Time', noesana: 'Under 10 Seconds', gelled: '20+ Minutes (requires gel)', watch: 'Instant Wear' },
                  { param: 'EEG Channels Count', noesana: '4 Channels (Active Dry)', gelled: '8 - 64 Channels (Wet)', watch: '0 Channels (Optical only)' },
                  { param: 'Cognitive Load Scoring', noesana: 'Real-time (ICA + FFT)', gelled: 'Offline laboratory computing', watch: 'Inferred via HRV heart rate' },
                  { param: 'Closed-Loop Biofeedback', noesana: 'Yes (Acoustic audio guides)', gelled: 'No (Diagnostic only)', watch: 'No (Static alerts only)' },
                  { param: 'Wear Comfort Profile', noesana: 'High (32g comfort knit)', gelled: 'Low (sticky electrodes)', watch: 'High (Wrist worn)' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-white">{row.param}</td>
                    <td className="py-4 px-4 sm:px-6 text-noesana-orange font-semibold">{row.noesana}</td>
                    <td className="py-4 px-4 sm:px-6">{row.gelled}</td>
                    <td className="py-4 px-4 sm:px-6 text-slate-400">{row.watch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>


      {/* ---------------- Interactive FAQ Accordions ---------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/5 text-left">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Common Questions</div>
            <h2 className="text-3xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-white/5 bg-slate-900/30 rounded-xl overflow-hidden cursor-pointer hover:border-white/10 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="p-5 flex items-center justify-between text-xs sm:text-sm font-bold text-white select-none">
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-noesana-orange transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ---------------- 5. Rotation Badge Banner (Sleek Orange Badge) ---------------- */}
      <section className="py-20 bg-black relative border-t border-white/5 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-noesana-orange/10 rounded-full blur-[90px] pointer-events-none" />
        
        {/* Rotating Circular Text Badge */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="absolute w-full h-full animate-spin-slow text-white" viewBox="0 0 100 100">
            <defs>
              <path id="circlePath" d="M 50 10 A 40 40 0 1 1 49.9 10" fill="none" />
            </defs>
            <text className="font-cyber font-bold text-[8.5px] uppercase tracking-[0.14em] fill-current">
              <textPath href="#circlePath">
                NOESANA • CONSULTATION • NOESANA • CONSULTATION • 
              </textPath>
            </text>
          </svg>
          {/* Inner Orange Hub */}
          <Link to="/shop" className="w-20 h-20 rounded-full bg-noesana-orange hover:bg-white text-black font-black uppercase text-xs tracking-wider flex items-center justify-center transition-colors shadow-lg shadow-noesana-orange/25 z-10">
            Book Now
          </Link>
        </div>
      </section>

    </div>
  );
}
