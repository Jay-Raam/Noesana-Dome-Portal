import React, { useState, useEffect, useRef } from 'react';
import { Activity, Brain, Moon, Zap, RefreshCw, BarChart2, BellRing, Heart, Info, Calendar, Download, Play, Square, Bluetooth, Wifi, Radio } from 'lucide-react';

export default function Analytics() {
  const [sessionActive, setSessionActive] = useState(false);
  const [mindMode, setMindMode] = useState('focus');
  const [liveCalmScore, setLiveCalmScore] = useState(65);
  const [tensionScore, setTensionScore] = useState(48);
  const [clutterScore, setClutterScore] = useState(30);

  const [wavePhase, setWavePhase] = useState(0);

  // Smooth real-time animation loop for EEG oscilloscope waves
  useEffect(() => {
    if (!sessionActive) return;
    let frameId;
    const animate = () => {
      setWavePhase(prev => (prev + 0.15) % (Math.PI * 2));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [sessionActive]);

  // Builds an authentic wave shape path depending on focus (beta), meditate (alpha/theta) or sleep (delta)
  const generateEEGPath = () => {
    if (!sessionActive) return "M 0 50 L 600 50";
    let points = [];
    
    // Choose frequency, amplitude, and wave noise properties based on the state
    let freq = mindMode === 'focus' ? 0.09 : mindMode === 'meditate' ? 0.04 : 0.015;
    let amp = mindMode === 'focus' ? 12 : mindMode === 'meditate' ? 24 : 36;
    let noiseAmp = mindMode === 'focus' ? 4.5 : 0;

    for (let x = 0; x <= 600; x += 6) {
      let y = 50 + Math.sin(x * freq - wavePhase) * amp;
      // Add jagged high-frequency noise for focused beta-wave signals
      if (noiseAmp > 0) {
        y += Math.sin(x * 0.35 + wavePhase * 3) * noiseAmp;
      }
      points.push(`${x} ${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Bluetooth Pairing Simulator State
  const [isPairing, setIsPairing] = useState(false);
  const [pairingStep, setPairingStep] = useState(0);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [pairingLog, setPairingLog] = useState('');
  const [sensorChecks, setSensorChecks] = useState([]);

  const pairingSteps = [
    'Initializing Bluetooth LE 5.3 radio...',
    'Scanning for nearby Noesana devices...',
    'Found: NOESANA-G2 (88:BF:1A:4E:29:C7)',
    'Establishing encrypted BLE GATT connection...',
    'Handshake complete. Reading device firmware v3.1.4...',
    'Running dry electrode impedance contact tests...'
  ];

  const sensorNodes = [
    { name: 'Frontal Fp1', impedance: '3.2 kΩ', status: 'Stable' },
    { name: 'Frontal Fp2', impedance: '2.8 kΩ', status: 'Stable' },
    { name: 'Temporal T3', impedance: '4.1 kΩ', status: 'Stable' },
    { name: 'Temporal T4', impedance: '3.9 kΩ', status: 'Stable' },
    { name: 'Occipital O1', impedance: '2.1 kΩ', status: 'Locked' },
    { name: 'Ground Ref', impedance: '1.2 kΩ', status: 'Locked' },
  ];

  useEffect(() => {
    if (!isPairing) return;
    setPairingStep(0);
    setDeviceConnected(false);
    setSensorChecks([]);
    setPairingLog(pairingSteps[0]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < pairingSteps.length) {
        setPairingStep(step);
        setPairingLog(pairingSteps[step]);
      } else if (step < pairingSteps.length + sensorNodes.length) {
        const sensorIdx = step - pairingSteps.length;
        setSensorChecks(prev => [...prev, sensorNodes[sensorIdx]]);
        setPairingLog(`Testing ${sensorNodes[sensorIdx].name}... ${sensorNodes[sensorIdx].impedance} (${sensorNodes[sensorIdx].status})`);
      } else {
        clearInterval(interval);
        setDeviceConnected(true);
        setSessionActive(true);
        setPairingLog('All sensors verified. Live EEG telemetry stream active.');
      }
    }, 900);

    return () => clearInterval(interval);
  }, [isPairing]);

  // Breathing Exercise State
  const defaultMins = { Mon: 15, Tue: 25, Wed: 20, Thu: 35, Fri: 10, Sat: 45, Sun: 30 };
  const [weeklyMins, setWeeklyMins] = useState(defaultMins);
  const [secondsCount, setSecondsCount] = useState(0);
  const [logNotice, setLogNotice] = useState('');
  
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale'); // 'Inhale', 'Hold', 'Exhale', 'Hold'
  const [breathingTimer, setBreathingTimer] = useState(4);

  // Respiration Audio Guided Synthesizer Refs
  const breatheAudioCtxRef = useRef(null);
  const breatheOscRef = useRef(null);
  const breatheGainRef = useRef(null);

  const startBreatheAudio = () => {
    try {
      if (!breatheAudioCtxRef.current) {
        breatheAudioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = breatheAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.0, ctx.currentTime);
      mainGain.connect(ctx.destination);
      breatheGainRef.current = mainGain;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.connect(mainGain);
      osc.start();
      breatheOscRef.current = osc;
    } catch (e) {
      console.warn("Web Audio not supported:", e);
    }
  };

  const stopBreatheAudio = () => {
    if (breatheOscRef.current) {
      try { breatheOscRef.current.stop(); } catch (err) {}
      breatheOscRef.current = null;
    }
    breatheGainRef.current = null;
  };

  // Adjust guided tone frequency & volume dynamically to breathing phase transitions
  useEffect(() => {
    if (!breathingActive) {
      stopBreatheAudio();
      return;
    }
    if (!breatheOscRef.current) {
      startBreatheAudio();
    }

    const ctx = breatheAudioCtxRef.current;
    const osc = breatheOscRef.current;
    const gainNode = breatheGainRef.current;

    if (!ctx || !osc || !gainNode) return;

    const now = ctx.currentTime;
    if (breathingPhase === 'Inhale') {
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0.04, now + 3.8);
      osc.frequency.setValueAtTime(osc.frequency.value, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 3.8);
    } else if (breathingPhase === 'Hold') {
      gainNode.gain.setValueAtTime(0.04, now);
      osc.frequency.setValueAtTime(300, now);
    } else if (breathingPhase === 'Exhale') {
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 3.8);
      osc.frequency.setValueAtTime(osc.frequency.value, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 3.8);
    } else { // 'Hold Out'
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0.0, now + 3.8);
      osc.frequency.setValueAtTime(150, now);
    }
  }, [breathingActive, breathingPhase]);

  // --- Focus Trainer Game / Levitating Orb Physics ---
  const [gameState, setGameState] = useState('idle'); // 'idle', 'running', 'gameover'
  const [orbY, setOrbY] = useState(50); // percentage from top (0 - 100)
  const [obstacleX, setObstacleX] = useState(100);
  const [obstacleGap, setObstacleGap] = useState({ top: 30, bottom: 65 });
  const [gameScore, setGameScore] = useState(0);
  const [focusPulseLevel, setFocusPulseLevel] = useState(50);

  useEffect(() => {
    if (gameState !== 'running') return;

    const gameInterval = setInterval(() => {
      // Apply gravity, counter-acted by focusPulseLevel
      setOrbY(prev => {
        const gravityVal = 1.6;
        const liftVal = focusPulseLevel * 0.038;
        const next = prev + gravityVal - liftVal;
        
        // Boundaries
        if (next > 90 || next < 10) {
          setGameState('gameover');
          return next > 90 ? 90 : 10;
        }
        return next;
      });

      // Advance scrolling obstacle
      setObstacleX(prev => {
        if (prev <= -12) {
          // Increment score
          setGameScore(s => s + 1);
          // Spawn new randomized gap
          const gapSize = 35;
          const top = Math.floor(Math.random() * 35) + 12;
          setObstacleGap({ top, bottom: top + gapSize });
          return 100;
        }
        return prev - 2.5; // speed
      });

      // Slowly decay focus level back to baseline
      setFocusPulseLevel(prev => Math.max(prev - 2.5, 0));
    }, 45);

    return () => clearInterval(gameInterval);
  }, [gameState, focusPulseLevel]);

  // Focus levitation collision detection
  useEffect(() => {
    if (gameState !== 'running') return;
    
    // Orb resides horizontally around X = 25%
    if (obstacleX > 20 && obstacleX < 38) {
      if (orbY < obstacleGap.top || orbY > obstacleGap.bottom) {
        setGameState('gameover');
      }
    }
  }, [orbY, obstacleX, obstacleGap, gameState]);

  const triggerFocusPulse = () => {
    if (gameState === 'idle' || gameState === 'gameover') {
      setOrbY(50);
      setObstacleX(100);
      setGameScore(0);
      setFocusPulseLevel(60);
      setGameState('running');
    } else {
      setFocusPulseLevel(prev => Math.min(prev + 22, 100));
    }
  };

  // Load calibration logs on mount
  useEffect(() => {
    const saved = localStorage.getItem('noesana_calibration');
    if (saved) {
      setWeeklyMins(JSON.parse(saved));
    } else {
      localStorage.setItem('noesana_calibration', JSON.stringify(defaultMins));
    }
  }, []);

  // Clickable Session History
  const [selectedHistory, setSelectedHistory] = useState(0);
  const sessionHistory = [
    { date: 'July 10, 2026', type: 'Focus Session', duration: '25 mins', avgCalm: '82%', score: '4,200 pts', summary: 'Maintained stable beta band focus for 18 minutes. Minor alpha drops at the 12-minute mark.' },
    { date: 'July 09, 2026', type: 'Deep Sleep', duration: '7h 42m', avgCalm: '94%', score: '9,800 pts', summary: 'Restorative delta-wave patterns recorded between 2:00 AM and 4:30 AM. Excellent recovery.' },
    { date: 'July 08, 2026', type: 'Calm Routine', duration: '15 mins', avgCalm: '78%', score: '2,400 pts', summary: 'Alpha band asymmetry normalized within 3 minutes of auditory guide onset. Low stress index.' }
  ];

  // Breathing exercise loop
  useEffect(() => {
    if (!breathingActive) {
      setBreathingTimer(4);
      setBreathingPhase('Inhale');
      return;
    }

    const timer = setInterval(() => {
      // Increment session seconds
      setSecondsCount((prevSecs) => {
        const next = prevSecs + 1;
        if (next >= 15) { // 15 seconds = 1 minute calibration
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const today = days[new Date().getDay()];
          
          setWeeklyMins((prevMins) => {
            const updated = {
              ...prevMins,
              [today]: (prevMins[today] || 0) + 1
            };
            localStorage.setItem('noesana_calibration', JSON.stringify(updated));
            return updated;
          });
          
          setLogNotice('Calibration complete: +1 min logged!');
          setTimeout(() => setLogNotice(''), 3000);
          
          return 0; // reset
        }
        return next;
      });

      setBreathingTimer((prev) => {
        if (prev > 1) return prev - 1;
        
        // Phase transition
        setBreathingPhase((currentPhase) => {
          if (currentPhase === 'Inhale') return 'Hold';
          if (currentPhase === 'Hold') return 'Exhale';
          if (currentPhase === 'Exhale') return 'Hold Out';
          return 'Inhale';
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathingActive]);

  // Simulate mindwave fluctuations
  useEffect(() => {
    if (!sessionActive) return;

    const interval = setInterval(() => {
      setLiveCalmScore(prev => {
        const offset = Math.floor(Math.random() * 7) - 3;
        return Math.min(Math.max(prev + offset, 50), 99);
      });
      setTensionScore(prev => {
        const offset = Math.floor(Math.random() * 5) - 2.5;
        return Math.min(Math.max(Math.floor(prev + offset), 10), 90);
      });
      setClutterScore(prev => {
        const offset = Math.floor(Math.random() * 6) - 3;
        return Math.min(Math.max(Math.floor(prev + offset), 5), 80);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [sessionActive]);

  const downloadTelemetryReport = () => {
    const reportContent = `NOESANA COGNITIVE REPORT
========================
Generated: ${new Date().toLocaleDateString()}
Device: NOESANA-G2 (88:BF:1A:4E:29:C7)
Firmware: v3.1.4

WEEKLY CALIBRATION SESSION SUMMARY:
----------------------------------
Monday: ${weeklyMins.Mon} minutes
Tuesday: ${weeklyMins.Tue} minutes
Wednesday: ${weeklyMins.Wed} minutes
Thursday: ${weeklyMins.Thu} minutes
Friday: ${weeklyMins.Fri} minutes
Saturday: ${weeklyMins.Sat} minutes
Sunday: ${weeklyMins.Sun} minutes

BIOMETRIC INDICES:
------------------
- Clarity Index Average: 92%
- Sleep Quality Index Average: 94%
- Core HRV Coherence: Stable
- Active Electrodes: Fp1, Fp2, T3, T4, O1, Ground (All Stable)

End of biometric report log.
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `noesana_telemetry_report_${new Date().toISOString().slice(0,10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-left mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8">
          <div>
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Live Dome Monitoring</div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">Calm States Control</h1>
            <p className="text-slate-400 text-sm mt-2">Activate a simulation session to investigate EEG neural wave telemetry in real time.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
            <button 
              onClick={downloadTelemetryReport}
              className="px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs border border-white/10 hover:border-white/20 text-slate-300 transition-all flex items-center justify-center space-x-2 bg-slate-950/40"
            >
              <Download className="w-4 h-4 text-noesana-orange" />
              <span>Download Report</span>
            </button>

            <button 
              onClick={() => setSessionActive(!sessionActive)}
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center space-x-2 ${
                sessionActive 
                  ? 'bg-emerald-500 text-black shadow-emerald-500/10' 
                  : 'bg-noesana-orange text-white shadow-noesana-orange/10'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${sessionActive ? 'animate-spin' : ''}`} />
              <span>{sessionActive ? 'Session Active' : 'Start Calibration'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left panel: Mode Controls */}
          <div className="lg:col-span-4 flex flex-col space-y-6 text-left">
            
            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Neural Bandwidth Mode</h3>
              
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => setMindMode('focus')}
                  className={`p-4 rounded-xl flex items-center justify-between border text-left transition-all ${
                    mindMode === 'focus' ? 'border-noesana-orange bg-noesana-orange/5' : 'border-white/5 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-noesana-orange" />
                    <div>
                      <div className="text-xs font-bold text-white">Focus & Alertness</div>
                      <p className="text-[10px] text-slate-500">Heuristic amplification of Beta frequencies</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-noesana-orange" />
                </button>

                <button 
                  onClick={() => setMindMode('meditate')}
                  className={`p-4 rounded-xl flex items-center justify-between border text-left transition-all ${
                    mindMode === 'meditate' ? 'border-noesana-orange bg-noesana-orange/5' : 'border-white/5 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-indigo-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Calm & Presence</div>
                      <p className="text-[10px] text-slate-500">Amplification of Alpha & Theta frequencies</p>
                    </div>
                  </div>
                  {mindMode === 'meditate' && <span className="w-2 h-2 rounded-full bg-noesana-orange" />}
                </button>

                <button 
                  onClick={() => setMindMode('sleep')}
                  className={`p-4 rounded-xl flex items-center justify-between border text-left transition-all ${
                    mindMode === 'sleep' ? 'border-noesana-orange bg-noesana-orange/5' : 'border-white/5 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Moon className="w-5 h-5 text-sky-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Deep Rest State</div>
                      <p className="text-[10px] text-slate-500">Amplification of Delta frequencies</p>
                    </div>
                  </div>
                  {mindMode === 'sleep' && <span className="w-2 h-2 rounded-full bg-noesana-orange" />}
                </button>
              </div>

            </div>

            {/* Simulated hardware state */}
            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-4">Hardware Telemetry</h3>
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Headband Sync:</span>
                  <span className={`font-mono font-bold ${deviceConnected ? 'text-emerald-400' : sessionActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {deviceConnected ? 'BLE PAIRED (99.2% signal)' : sessionActive ? 'ACTIVE (99.2% signal)' : 'OFFLINE'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Battery Level:</span>
                  <span className="font-mono text-slate-200">82% (USB-C)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Electrode Temperature:</span>
                  <span className="font-mono text-slate-200">31.2 °C</span>
                </div>
              </div>
            </div>

            {/* Bluetooth Pairing Simulator Panel */}
            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Device Pairing</h3>
                {deviceConnected && (
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span>Connected</span>
                  </span>
                )}
              </div>

              {!isPairing && !deviceConnected && (
                <button
                  onClick={() => setIsPairing(true)}
                  className="w-full py-3.5 bg-noesana-orange text-white font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center space-x-2 hover:bg-white hover:text-black transition-all"
                >
                  <Bluetooth className="w-4 h-4" />
                  <span>Pair Headband via BLE</span>
                </button>
              )}

              {isPairing && !deviceConnected && (
                <div className="space-y-3">
                  {/* Scanning animation */}
                  <div className="flex items-center space-x-3 bg-black/40 border border-white/5 p-3 rounded-xl">
                    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                      <div className="absolute inset-0 rounded-full border-2 border-noesana-orange/30 animate-ping" />
                      <Bluetooth className="w-4 h-4 text-noesana-orange animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-slate-400 font-mono leading-relaxed">{pairingLog}</div>
                      <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-noesana-orange h-full rounded-full transition-all duration-500" style={{ width: `${((pairingStep + 1) / (pairingSteps.length + sensorNodes.length)) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Sensor contact checks */}
                  {sensorChecks.length > 0 && (
                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-2">
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Electrode Contact Tests</div>
                      {sensorChecks.map((sensor, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 font-mono">{sensor.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono font-bold">{sensor.impedance}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${sensor.status === 'Locked' ? 'text-emerald-400' : 'text-noesana-orange'}`}>
                              {sensor.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {deviceConnected && (
                <div className="space-y-3">
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl flex items-center space-x-3">
                    <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="text-[10px] text-emerald-400 font-mono font-bold">NOESANA-G2 (88:BF:1A:4E:29:C7) • Firmware v3.1.4</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {sensorNodes.map((sensor, idx) => (
                      <div key={idx} className="bg-black/40 border border-white/5 p-2 rounded-lg text-center">
                        <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">{sensor.name}</div>
                        <div className="text-[10px] text-emerald-400 font-mono font-bold mt-0.5">{sensor.impedance}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => { setIsPairing(false); setDeviceConnected(false); setSensorChecks([]); }}
                    className="w-full py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center space-x-2 transition-all hover:bg-red-500/20"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Disconnect Device</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Active Graphs & Widgets */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* Live Calm Index card */}
            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl md:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white">EEG Calibration Waveform</h3>
                  <p className="text-[10px] text-slate-500">Live alpha frequency tracking (10 Hz)</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Session Status:</div>
                  <div className={`text-xs font-bold ${sessionActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {sessionActive ? 'TRANSMITTING' : 'STANDBY'}
                  </div>
                </div>
              </div>

              {/* Dynamic SVG waves */}
              <div className="w-full h-32 bg-slate-950 rounded-xl relative overflow-hidden flex items-end">
                <svg className="w-full h-full text-noesana-orange" viewBox="0 0 600 100" preserveAspectRatio="none">
                  <path 
                    d={generateEEGPath()}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white">Daily Calm Score</span>
                  <Activity className="w-4 h-4 text-noesana-orange" />
                </div>
                <div className="font-cyber font-black text-3xl text-white mb-2">{liveCalmScore}%</div>
                <p className="text-[11px] text-slate-500">Calculated over 24-hour neural logs. Score shifts up during meditation calibrations.</p>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-6">
                <div className="bg-noesana-orange h-full rounded-full transition-all duration-1000" style={{ width: `${liveCalmScore}%` }} />
              </div>
            </div>

            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white">Tension Threshold</span>
                  <Heart className="w-4 h-4 text-red-500" />
                </div>
                <div className="font-cyber font-black text-3xl text-white mb-2">{tensionScore} bpm</div>
                <p className="text-[11px] text-slate-500">Corresponds to autonomic heartbeat dynamics. Decreases as calm state increases.</p>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-6">
                <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${tensionScore}%` }} />
              </div>
            </div>

          </div>

        </div>


        {/* NEW SECTION: Weekly Performance, Breathing Guide, & Focus Trainer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start text-left">
          
          {/* Weekly Performance Bar Chart */}
          <div className="lg:col-span-4 bg-slate-950/60 border border-white/5 p-6 rounded-3xl h-96 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white">Weekly Calibration</h3>
                <span className="text-[10px] text-noesana-orange font-mono">Goal: 150m</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Calibration minutes recorded over the last week. Increments with pacer sessions.
              </p>
            </div>

            <div className="w-full h-44 flex items-end justify-between space-x-2 pt-6 border-b border-white/5 pb-2">
              {[
                { day: 'Mon', mins: weeklyMins.Mon },
                { day: 'Tue', mins: weeklyMins.Tue },
                { day: 'Wed', mins: weeklyMins.Wed },
                { day: 'Thu', mins: weeklyMins.Thu },
                { day: 'Fri', mins: weeklyMins.Fri },
                { day: 'Sat', mins: weeklyMins.Sat },
                { day: 'Sun', mins: weeklyMins.Sun }
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                  <span className="text-[8px] text-slate-500 font-mono">{d.mins}m</span>
                  <div 
                    className="w-full bg-noesana-orange rounded-t-sm transition-all duration-500" 
                    style={{ height: `${Math.min((d.mins / 60) * 110, 110)}px` }} 
                  />
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Breathing Guide Box */}
          <div className="lg:col-span-4 bg-slate-950/60 border border-white/5 p-6 rounded-3xl h-96 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white">Respiration Assistant</h3>
                <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                  {breathingActive ? '● Audio Active' : 'Offline'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Pace breaths with the expanding cue. Web Audio guide synthesizer plays in stereo headphones.
              </p>
            </div>

            {/* Visual Expanding Breathing Circle */}
            <div className="flex flex-col items-center justify-center py-4 relative">
              <div 
                className={`rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                  breathingActive && breathingPhase === 'Inhale' ? 'w-24 h-24 bg-noesana-orange/15 border border-noesana-orange shadow-[0_0_20px_rgba(255,85,0,0.15)]' :
                  breathingActive && breathingPhase === 'Exhale' ? 'w-14 h-14 bg-slate-900 border border-white/10' :
                  'w-18 h-18 bg-slate-800 border border-white/5'
                }`}
              >
                {breathingActive ? (
                  <div className="text-center">
                    <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">{breathingPhase}</div>
                    <div className="text-md font-cyber font-black text-white">{breathingTimer}s</div>
                  </div>
                ) : (
                  <Brain className="w-6 h-6 text-noesana-orange" />
                )}
              </div>

              {logNotice && (
                <div className="absolute -bottom-2 text-[9px] text-emerald-400 font-bold tracking-wide animate-pulse">
                  {logNotice}
                </div>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex space-x-3 mt-2 border-t border-white/5 pt-4 z-10">
              <button 
                onClick={() => setBreathingActive(!breathingActive)}
                className={`flex-1 py-3.5 rounded-xl font-bold uppercase tracking-wider text-[10px] flex items-center justify-center space-x-2 transition-all ${
                  breathingActive ? 'bg-red-500/10 border border-red-500/20 text-red-500' : 'bg-noesana-orange text-white hover:bg-white hover:text-black'
                }`}
              >
                {breathingActive ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Breathe Guide</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Breathe Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Focus Trainer Game Box */}
          <div className="lg:col-span-4 bg-slate-950/60 border border-white/5 p-6 rounded-3xl h-96 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white">Focus Trainer (Neuro-Game)</h3>
                <span className="text-[10px] text-sky-400 font-mono">Score: {gameScore}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Click **FOCUS PULSE** repeatedly to increase simulated Beta frequency and elevate the mind orb through obstacles.
              </p>
            </div>

            {/* Game Visual Window */}
            <div className="relative w-full h-36 bg-black border border-white/5 rounded-2xl overflow-hidden">
              
              {gameState === 'idle' && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 z-20">
                  <div className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">Calibration Trainer</div>
                  <p className="text-[9px] text-slate-400 leading-normal mb-2">Test prefrontal neurofeedback focus limits</p>
                  <button 
                    onClick={triggerFocusPulse}
                    className="px-3 py-1.5 bg-noesana-orange text-white text-[9px] font-bold uppercase rounded hover:bg-white hover:text-black transition-colors"
                  >
                    Start Training
                  </button>
                </div>
              )}

              {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-red-950/80 flex flex-col items-center justify-center text-center p-4 z-20">
                  <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Signal Out of Coherence</div>
                  <p className="text-[9px] text-slate-300 leading-normal mb-2">Obstacle hit! Final Score: {gameScore}</p>
                  <button 
                    onClick={triggerFocusPulse}
                    className="px-3 py-1.5 bg-white text-black text-[9px] font-bold uppercase rounded hover:bg-noesana-orange hover:text-white transition-colors"
                  >
                    Restart
                  </button>
                </div>
              )}

              {/* Levitation Orb */}
              <div 
                className="absolute w-4 h-4 bg-sky-400 rounded-full shadow-[0_0_10px_#38bdf8] transition-all duration-75 z-10"
                style={{ left: '25%', top: `${orbY}%`, transform: 'translate(-50%, -50%)' }}
              />

              {/* Scrolling Obstacle Bars */}
              {gameState === 'running' && (
                <>
                  <div 
                    className="absolute w-4 bg-white/10 border-l border-white/20"
                    style={{ left: `${obstacleX}%`, top: '0px', height: `${obstacleGap.top}%` }}
                  />
                  <div 
                    className="absolute w-4 bg-white/10 border-l border-white/20"
                    style={{ left: `${obstacleX}%`, top: `${obstacleGap.bottom}%`, bottom: '0px' }}
                  />
                </>
              )}

              {/* Focus stats bar */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-slate-500 z-10">
                <span>Focus Energy: {Math.floor(focusPulseLevel)}%</span>
                <span>Active channel: Fp1</span>
              </div>
            </div>

            {/* Game Controls */}
            <div className="flex space-x-3 mt-2 border-t border-white/5 pt-4 z-10">
              <button 
                onClick={triggerFocusPulse}
                className="flex-1 py-3.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center space-x-2 transition-all hover:bg-sky-500/20 active:scale-[0.98]"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{gameState === 'running' ? 'Focus Pulse' : 'Launch Game'}</span>
              </button>
            </div>
          </div>

        </div>


        {/* NEW SECTION: Clickable Session History & Export */}
        <div className="bg-slate-950 border border-white/5 p-6 sm:p-10 rounded-3xl text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Calibration Archives</div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Session History</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Click any historic log below to inspect dry-sensor signal summaries and focus stats.
              </p>
            </div>
            
            <button className="px-5 py-3 border border-white/10 hover:border-noesana-orange hover:text-noesana-orange rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 shrink-0 w-fit">
              <Download className="w-4 h-4" />
              <span>Export CSV Telemetry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Log list */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              {sessionHistory.map((sess, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedHistory(idx)}
                  className={`p-4 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                    selectedHistory === idx ? 'border-noesana-orange bg-noesana-orange/5 text-white' : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                  }`}
                >
                  <div>
                    <div className="text-slate-500 font-mono font-normal">{sess.date}</div>
                    <div className="font-bold text-white mt-0.5">{sess.type}</div>
                  </div>
                  <span className="font-mono text-[11px] text-noesana-orange">{sess.duration}</span>
                </button>
              ))}
            </div>

            {/* Log details card */}
            <div className="lg:col-span-7 bg-slate-900/30 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-bold text-white text-md">{sessionHistory[selectedHistory].type} Report</h3>
                  <p className="text-slate-500 text-[10px] font-mono mt-0.5">Recorded: {sessionHistory[selectedHistory].date}</p>
                </div>
                <div className="bg-noesana-orange/15 border border-noesana-orange/20 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-noesana-orange">
                  {sessionHistory[selectedHistory].avgCalm} CALM
                </div>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {sessionHistory[selectedHistory].summary}
              </p>

              <div className="grid grid-cols-2 gap-4 bg-black/40 border border-white/5 p-4 rounded-xl text-xs font-bold text-slate-300">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Session Duration</div>
                  <span className="text-white font-mono">{sessionHistory[selectedHistory].duration}</span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Accumulated Focus</div>
                  <span className="text-noesana-orange font-mono">{sessionHistory[selectedHistory].score}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
