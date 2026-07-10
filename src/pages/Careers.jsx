import React from 'react';
import { ArrowRight, Briefcase, MapPin, Globe } from 'lucide-react';

export default function Careers() {
  const jobs = [
    {
      title: 'Senior Neuro-Signal Engineer',
      dept: 'Sensing Heuristics Team',
      loc: 'San Francisco, CA (Hybrid)',
    },
    {
      title: 'Industrial Product Designer',
      dept: 'Wearable Hardware Team',
      loc: 'Tokyo, JP (On-site)',
    },
    {
      title: 'Lead Mobile Developer',
      dept: 'Dome App Ecosystem',
      loc: 'Remote (US/EU)',
    }
  ];

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-left">
        
        {/* Title */}
        <div className="mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Join Us</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Careers</h1>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Build products that help millions of people reduce stress and improve mental clarity. Let's design calm technology together.
          </p>
        </div>

        {/* Jobs List */}
        <div className="flex flex-col space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-noesana-orange/20 transition-colors gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-noesana-orange/10 flex items-center justify-center text-noesana-orange shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-white mb-0.5">{job.title}</h3>
                  <div className="text-[10px] text-noesana-orange font-semibold uppercase tracking-wider mb-1">{job.dept}</div>
                  
                  <div className="flex items-center space-x-1 text-[10px] text-slate-500 font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.loc}</span>
                  </div>
                </div>
              </div>

              <button className="px-5 py-2 border border-white/10 hover:border-noesana-orange hover:text-noesana-orange text-slate-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                <span>Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
