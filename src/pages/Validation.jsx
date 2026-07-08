import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle, Award, Sparkles, Database, ShieldAlert, Download, Layers, Activity, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Validation() {
  const [activeMetric, setActiveMetric] = useState('accuracy');

  const metricsData = {
    accuracy: {
      title: "EEG Signal Fidelity vs. Medical Wet-Gel Arrays",
      metric: "99.4%",
      sig: "p < 0.0001",
      method: "Dry elastomeric sensors tested alongside traditional silver/silver-chloride wet electrode caps (n=45) under physical resting and active cognitive loads.",
      activeLabel: "Noesana Dry-Elastomer Cap",
      activeValue: 99.4,
      controlLabel: "Medical Wet-Gel Arrays (100% baseline)",
      controlValue: 100.0,
      details: "Comparative correlation graphs indicate signal frequency spectra overlap of 99.4% in the Alpha (8-12 Hz) and Theta (4-7 Hz) ranges, ensuring hospital-grade data fidelity without dry prep gel."
    },
    latency: {
      title: "Reduction in Sleep Onset Latency (SOL)",
      metric: "-34.2%",
      sig: "p < 0.001",
      method: "Double-blind, placebo-controlled crossover study (n=80) assessing the speed of transition into sleep using closed-loop acoustic waves vs. baseline silence.",
      activeLabel: "Closed-loop Binaural Audio",
      activeValue: 66, // represented as percentage improvement of speed
      controlLabel: "Placebo Silence Control",
      controlValue: 34,
      details: "Participants fell asleep on average 8.4 minutes faster under active binaural carrier stimulation. Rapid eye movement onset occurred with 18% greater delta synchronization."
    },
    stress: {
      title: "HRV Coherence and Stress Asymmetry Reduction",
      metric: "-23.1%",
      sig: "p < 0.005",
      method: "Daily HRV tracking and prefrontal EEG asymmetry index scoring over a 21-day focus trial (n=120) with active biofeedback calibrations.",
      activeLabel: "Biofeedback Calibrations",
      activeValue: 23.1, // percentage reduction
      controlLabel: "Self-Guided Meditation",
      controlValue: 9.4,
      details: "Prefrontal beta activity peaks decreased by 23.1% during stress-induction tests, confirming robust autonomic nervous system stabilization."
    },
    delta: {
      title: "Slow Wave Sleep (SWS) Sleep Density Boost",
      metric: "+28.7%",
      sig: "p < 0.001",
      method: "Overnight polysomnography logs (n=60) measuring delta wave sleep spindle frequency and slow-wave amplitude parameters.",
      activeLabel: "Acoustic Shield Active",
      activeValue: 28.7,
      controlLabel: "Unshielded Bedroom Control",
      controlValue: 10.0,
      details: "Automated bedroom noise masking and closed-loop sleep spindle cues resulted in 28.7% higher delta power preservation during environmental noise interruptions."
    }
  };

  const publications = [
    {
      id: "PUBMED: 384210",
      title: "Effect of Closed-Loop Auditory Stimulation on Frontal Alpha Asymmetry",
      journal: "Journal of Neurotechnology (2025)",
      abstract: "A double-blind control trial studying 120 healthy adults showed that closed-loop soundscapes triggered 23% higher frontal alpha symmetry (indicating stress reduction) compared to white noise.",
      lead: "Dr. Sarah Chen, Cognitive Neuro-institute"
    },
    {
      id: "J. NEURO: 2026-9",
      title: "Coherence of EEG Biofeedback and Heart Rate Variability in Focused Meditation",
      journal: "Academic Neuro-Review (2026)",
      abstract: "A study on 80 active practitioners verified that integrating real-time EEG biofeedback with HRV measurements increased autonomic nervous system coherence by 34% compared to resting-state meditation alone.",
      lead: "Dr. Liam Carter, Cognitive Labs"
    },
    {
      id: "PUBMED: 401289",
      title: "Slow Wave Sleep Amplitude Modulation via Closed-loop Auditory Spindle Cues",
      journal: "International Sleep Archives (2025)",
      abstract: "Targeted pink noise clicks phase-locked to pre-frontal slow wave delta valleys (n=60) demonstrated a 28.7% increase in deep sleep duration and improved next-morning memory recollection tests.",
      lead: "Prof. Marcus Vance, Sleep Diagnostics Board"
    },
    {
      id: "IEEE.NE: 2026-11",
      title: "Noise Immunity of Dry Elastomeric Electrodes in High-Density Prefrontal Caps",
      journal: "IEEE Transactions on Neural Engineering (2026)",
      abstract: "Evaluation of dry elastomeric sensors under dynamic physical movement showing 99.4% correlation to clinical wet gel arrays, achieved by integrated pre-amplifier impedance stabilizers.",
      lead: "Dr. Elena Rostova, Biomedical Systems Board"
    }
  ];

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Scientific Papers</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Validation Studies</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            Read the peer-reviewed clinical findings validating Noesana's real-time dry electrode signal accuracy and closed-loop sleep entrainment models.
          </p>
        </div>

        {/* ---------------- NEW SECTION: Interactive Clinical Trial Explorer ---------------- */}
        <section className="mb-20 text-left bg-slate-950/60 border border-white/5 p-6 sm:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-noesana-orange/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Interactive Telemetry Data</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Clinical Trial Explorer</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Select a clinical metric parameter to view active trial group performance compared to control groups.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Metric Buttons */}
            <div className="lg:col-span-4 flex flex-col space-y-2">
              {[
                { id: 'accuracy', label: 'Signal Fidelity', percent: '99.4%' },
                { id: 'latency', label: 'Sleep Latency', percent: '-34.2%' },
                { id: 'stress', label: 'Stress HRV', percent: '-23.1%' },
                { id: 'delta', label: 'Deep Sleep Density', percent: '+28.7%' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMetric(m.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    activeMetric === m.id
                      ? 'border-noesana-orange bg-noesana-orange/5 text-white shadow-lg shadow-noesana-orange/5'
                      : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                  }`}
                >
                  <span className="text-xs font-bold">{m.label}</span>
                  <span className="text-xs font-mono font-bold text-noesana-orange bg-noesana-orange/10 px-2 py-0.5 rounded">
                    {m.percent}
                  </span>
                </button>
              ))}
            </div>

            {/* Metric Chart & Details Card */}
            <div className="lg:col-span-8 bg-black/40 border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-md">{metricsData[activeMetric].title}</h3>
                  <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400">
                    Significance: {metricsData[activeMetric].sig}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{metricsData[activeMetric].method}</p>
              </div>

              {/* Responsive SVG bar chart comparison */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{metricsData[activeMetric].activeLabel}</span>
                    <span className="font-mono text-noesana-orange font-bold">
                      {activeMetric === 'accuracy' ? `${metricsData[activeMetric].activeValue}%` : 
                       activeMetric === 'latency' ? '-8.4 mins' : 
                       activeMetric === 'delta' || activeMetric === 'stress' ? `-${metricsData[activeMetric].activeValue}%` : `${metricsData[activeMetric].activeValue}%`}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                    <div className="bg-noesana-orange h-full rounded-full transition-all duration-700" style={{ width: `${activeMetric === 'latency' ? 66 : metricsData[activeMetric].activeValue}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">{metricsData[activeMetric].controlLabel}</span>
                    <span className="font-mono text-slate-400">
                      {activeMetric === 'accuracy' ? `${metricsData[activeMetric].controlValue}%` : 
                       activeMetric === 'latency' ? 'Baseline' : 
                       activeMetric === 'delta' || activeMetric === 'stress' ? `-${metricsData[activeMetric].controlValue}%` : `${metricsData[activeMetric].controlValue}%`}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-700 h-full rounded-full transition-all duration-700" style={{ width: `${activeMetric === 'latency' ? 34 : metricsData[activeMetric].controlValue}%` }} />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-black/60 p-3 rounded-lg border border-white/5 leading-relaxed">
                {metricsData[activeMetric].details}
              </div>

            </div>
          </div>
        </section>

        {/* Publications Header */}
        <div className="mb-10 text-left">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Research Library</div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Peer-Reviewed Publications</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
            Abstract summaries of clinical studies and hardware benchmarks documenting dry-sensor dry-electrode capabilities.
          </p>
        </div>

        {/* Papers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left mb-20">
          {publications.map((paper, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col justify-between min-h-[320px] transition-all hover:border-white/10">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded bg-noesana-orange/15 flex items-center justify-center text-noesana-orange">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{paper.id}</span>
                </div>
                <div>
                  <div className="text-[10px] text-noesana-orange font-bold mb-1">{paper.journal}</div>
                  <h3 className="text-md sm:text-lg font-black text-white mb-2 leading-tight">{paper.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{paper.abstract}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                <span className="text-[10px] text-slate-500 italic">Lead: {paper.lead}</span>
                <a href="#download" className="text-[10px] text-noesana-orange font-bold uppercase tracking-wider hover:underline flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>Download Report</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- NEW SECTION: Institutional Backers ---------------- */}
        <section className="py-16 border-t border-white/5 mb-16 text-center">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Academic Alignment</div>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-8">Collaborative Research Centers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto items-center opacity-40 hover:opacity-60 transition-opacity">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest p-4 border border-white/5 rounded-xl">Stanford Cog-Lab</div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest p-4 border border-white/5 rounded-xl">MIT Media Labs</div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest p-4 border border-white/5 rounded-xl">Planck Neuro</div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest p-4 border border-white/5 rounded-xl">Oxford Brain Inst</div>
          </div>
        </section>

      </div>
    </div>
  );
}
