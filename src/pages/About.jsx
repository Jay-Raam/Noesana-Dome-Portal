import React from 'react';
import { Heart, Globe, Award, ShieldAlert, Sparkles, BookOpen, Clock, Activity } from 'lucide-react';

export default function About() {
  const principles = [
    {
      title: 'Scientific Rigor',
      desc: 'We never publish placeholders or marketing hype. Every claim, sensor layer, and auditory feedback loop is clinically evaluated by neuro-advisors.',
      icon: <BookOpen className="w-5 h-5 text-noesana-orange" />
    },
    {
      title: 'Absolute Privacy',
      desc: 'Biometric records belong to you alone. We enforce local-device encryption, reject cloud uploads, and never share neural data with third parties.',
      icon: <ShieldAlert className="w-5 h-5 text-noesana-orange" />
    },
    {
      title: 'Screens-Off Design',
      desc: 'Our headband has no screens, vibrating motors, or flashing notifications. We design for absolute calm, helping you look inward without distractions.',
      icon: <Sparkles className="w-5 h-5 text-noesana-orange" />
    }
  ];

  const milestones = [
    { year: '2024', title: 'Founding & Ideation', desc: 'Noesana was established by a team of neuro-scientists and industrial designers in San Francisco, aiming to solve screen-induced mental fatigue.' },
    { year: '2025', title: 'Clinical Trials & Gen-1', desc: 'Completed double-blind testing on frontal alpha asymmetry. Launched our Gen-1 headband, helping 30k users establish meditation routines.' },
    { year: '2026', title: 'Gen-2 & Global Scale', desc: 'Unveiled the Gen-2 headband with integrated HRV sensor arrays, occipital buckle fit configurations, and local AES security layers.' }
  ];

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Our Mission</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Our Vision</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            We believe that mental clarity should be accessible, scientific, and integrated into daily life.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left mb-20 items-center">
          
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Re-calibrating Modern Minds</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              In a world flooded with alerts and screen notifications, finding quiet focus has become an uphill battle. Noesana was founded in 2024 by a team of neuroscientists and industrial designers committed to restoring focus.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Our products bridge biofeedback tech with high-end fabric hardware, allowing you to monitor and adjust mental patterns calmly.
            </p>
          </div>

          <div className="bg-slate-950 border border-white/5 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center h-80">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="flex items-start space-x-3 text-left">
                <Globe className="w-5 h-5 text-noesana-orange mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Global Scale</h4>
                  <p className="text-[10px] text-slate-500">Over 100k active members across 40 countries.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-left">
                <Heart className="w-5 h-5 text-noesana-orange mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Pure Purpose</h4>
                  <p className="text-[10px] text-slate-500">1% of all hardware profits fund local mental wellness clinics.</p>
                </div>
              </div>

            </div>
          </div>

        </div>


        {/* NEW SECTION: Our Core Principles */}
        <div className="py-16 border-t border-white/5 text-left mb-16">
          <div className="max-w-xl mb-12">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Core Values</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Our Guiding Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((pr, idx) => (
              <div key={idx} className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[250px]">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-black/40 flex items-center justify-center mb-6">
                    {pr.icon}
                  </div>
                  <h3 className="text-md font-bold text-white mb-2">{pr.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pr.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* NEW SECTION: Timeline / Milestones */}
        <div className="py-16 border-t border-white/5 text-left mb-16">
          <div className="max-w-xl mb-16">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">The Journey</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Our Milestones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex flex-col space-y-4">
                <div className="font-cyber font-black text-4xl text-noesana-orange/20">{m.year}</div>
                <h3 className="text-md font-bold text-white">{m.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>


        {/* NEW SECTION: Screens-Off Manifesto */}
        <div className="bg-noesana-white text-black rounded-3xl p-8 sm:p-12 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider mb-6">
              <Activity className="w-3.5 h-3.5" />
              <span>The Screens-Off Manifesto</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Why We Build Without Screens</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              The modern wellness industry is filled with apps that require your eyes to be glued to glowing displays. We believe that true meditation requires shutting out external light. Our headband contains zero screens, zero notification vibrations, and zero buzzing. It is built as a pure sensory conduit—helping you close your eyes, listen to bio-acoustic soundscapes, and look inward.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
