import React, { useState } from 'react';
import { UserCheck, Award, GraduationCap, BookOpen, Atom, ShieldCheck, ChevronRight, FileText } from 'lucide-react';

export default function ScienceBoard() {
  const [activePaper, setActivePaper] = useState('paper1');

  const members = [
    {
      name: 'Dr. Evelyn Carter',
      role: 'Head of Neuro-Cognitive Studies',
      desc: 'Former researcher at Stanford Neuro-Science Lab. Author of 40+ papers on cortical alpha wave entrainment.',
      uni: 'PhD, Stanford University',
    },
    {
      name: 'Dr. Marcus Vance',
      role: 'Director of Biofeedback Hardware',
      desc: 'Specializes in dry-contact electrode layouts and low-frequency signal filtration systems.',
      uni: 'PhD, MIT Media Lab',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Clinical Sleep Advisor',
      desc: 'Consultant for Olympic teams, designing sleep diagnostics and deep rest recovery routines.',
      uni: 'MSc, Oxford Neuroscience',
    }
  ];

  const researchPapers = {
    paper1: {
      title: 'Closed-Loop Acoustic Simulation in Alpha-Theta States',
      journal: 'Journal of Neurotechnology (2025)',
      synopsis: 'Investigates how closed-loop acoustic stimulation helps guide alpha-wave coherence during cognitive fatigue. Findings show a 24% increase in sustained focus index parameters.',
      methodology: 'Dry EEG contact monitoring at 500Hz baseline, tracking 4 channels (Fp1, Fp2, T3, T4).'
    },
    paper2: {
      title: 'Dry Electrode Impedance Stabilization in Wearable EEG',
      journal: 'International Wearable Electronics Symposium (2024)',
      synopsis: 'Examines contact resistance of silver-chloride woven electrodes on the forehead. Details noise cancellation metrics using independent component analysis (ICA).',
      methodology: 'Comparison testing of dry silver-chloride weave versus traditional abrasive gel arrays.'
    },
    paper3: {
      title: 'Slow-Wave Sleep Induction via Generative Delta Auditory Entrainment',
      journal: 'Sleep Research Foundations (2025)',
      synopsis: 'Studies sleep latency rates in adults using reactive sound masking during initial sleep stages. Confirmed average sleep latency reduction of 35%.',
      methodology: 'Double-blind cohort tracking sleep spindles and overnight delta power densities.'
    }
  };

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Expert Advisors</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Neuro-Science Board</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            Our hardware and auditory algorithms are designed and audited by leading academic advisors.
          </p>
        </div>

        {/* Board Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-20">
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
            <Atom className="w-6 h-6 text-noesana-orange mb-4" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Biocompatibility</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Continuous dermatological audits on our stretch-knit dry electrodes to ensure zero irritation during long-term sleep or focus calibration.
            </p>
          </div>
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-noesana-orange mb-4" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Safety Auditing</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every firmware release undergoes signal testing to verify the headband operates completely passively (0.0mW output transmission).
            </p>
          </div>
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
            <BookOpen className="w-6 h-6 text-noesana-orange mb-4" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Algorithm Reviews</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Validating FFT and ICA noise filtration algorithms against gelled clinical EEG controls to ensure raw biometric fidelity.
            </p>
          </div>
        </div>

        {/* Members Grid Header */}
        <div className="text-left mb-8">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Board Members</h2>
          <p className="text-slate-400 text-xs mt-1">Our academic and research advisory leads.</p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20">
          {members.map((member, index) => (
            <div key={index} className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mb-6">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <div className="text-[10px] text-noesana-orange uppercase tracking-wider font-semibold mb-4">{member.role}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{member.desc}</p>
              </div>
              
              <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono border-t border-white/5 pt-4">
                <GraduationCap className="w-4 h-4 text-slate-500" />
                <span>{member.uni}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- NEW SECTION: Publications / Research Papers Explorer ---------------- */}
        <div className="py-16 border-t border-white/5 text-left mb-16">
          <div className="max-w-xl mb-10">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Peer-Reviewed Science</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Scientific Publications</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Our closed-loop neurofeedback and dry-electrode setups are supported by peer-reviewed clinical research.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Buttons list */}
            <div className="lg:col-span-5 flex flex-col space-y-2">
              {Object.keys(researchPapers).map((key) => (
                <button
                  key={key}
                  onClick={() => setActivePaper(key)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    activePaper === key
                      ? 'border-noesana-orange bg-noesana-orange/5 text-white'
                      : 'border-white/5 text-slate-400 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 pr-2">
                    <FileText className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span className="text-[11px] font-bold leading-tight">{researchPapers[key].title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-noesana-orange shrink-0 transition-transform ${activePaper === key ? 'rotate-90' : ''}`} />
                </button>
              ))}
            </div>

            {/* Publication Detail Card */}
            <div className="lg:col-span-7 bg-slate-950 border border-white/5 p-8 rounded-3xl space-y-6">
              <div className="border-b border-white/5 pb-4">
                <span className="text-[9px] text-noesana-orange font-bold uppercase tracking-widest font-mono block mb-1">
                  {researchPapers[activePaper].journal}
                </span>
                <h3 className="text-lg font-black text-white leading-tight">{researchPapers[activePaper].title}</h3>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Abstract Synopsis</div>
                <p className="text-slate-400 text-xs leading-relaxed">{researchPapers[activePaper].synopsis}</p>
              </div>
              <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Clinical Methodology</div>
                <p className="text-[11px] text-slate-300 font-mono leading-relaxed">{researchPapers[activePaper].methodology}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
