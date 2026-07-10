import React, { useState } from 'react';
import { Mail, Download, FileText, Image, Users, Award, ChevronRight, Check, Search } from 'lucide-react';

export default function Press() {
  const [downloading, setDownloading] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const triggerDownload = (item) => {
    setDownloading(item);
    setTimeout(() => {
      setDownloading(null);
      alert(`${item} has been packaged and downloaded successfully.`);
    }, 1500);
  };

  const pressReleases = [
    {
      date: 'July 02, 2026',
      title: 'Noesana Gen-2 Receives FCC Conformance Certification',
      desc: 'The next-generation passive EEG headband passes official consumer radiation and electromagnetic standards for safe, overnight sleep tracking.'
    },
    {
      date: 'May 14, 2026',
      title: 'Noesana Partners with Academic Neuro-Labs for Alpha Wave Asymmetry Studies',
      desc: 'Collaborative trial will examine the impact of real-time bio-acoustic modulation on chronic stress indicators in active workplace environments.'
    },
    {
      date: 'March 10, 2026',
      title: 'Noesana Closes $12M Series A Funding to Expand Biometric Wearable Lines',
      desc: 'Led by neural tech venture funds, the capital will accelerate production of occipital buckle comfort systems and temporal sensor upgrades.'
    },
    {
      date: 'December 15, 2025',
      title: 'Noesana Gen-2 Wins Red Dot Design Award for Wearable Comfort',
      desc: 'Recognized for industrial styling excellence, the comfort-fit occipital strap configuration and passive dry silver-chloride electrode housing took top design honors.'
    },
    {
      date: 'September 22, 2025',
      title: 'Noesana Integrates with Apple HealthKit for Sleep Stage Synchronization',
      desc: 'Direct software bridge permits users to sync overnight delta-wave sleep tracking metrics directly into their iOS health dashboard logs.'
    },
    {
      date: 'June 08, 2025',
      title: 'Noesana Releases Open-Source Python API for EEG Researchers',
      desc: 'Academic neuro-research departments can now access, stream, and log raw 250Hz microvolt data files via our local Bluetooth interface protocols.'
    },
    {
      date: 'January 18, 2025',
      title: 'Noesana Launches Corporate Mental Wellness Partnership Program',
      desc: 'Offering bulk headband packaging distributions and custom calm dashboard panels for remote employee teams seeking daily focus improvements.'
    }
  ];

  const filteredReleases = pressReleases.filter(
    (release) =>
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Media Relations</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Press Inquiries</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">
            Resources, official press releases, and brand kit downloads for journalists and media publishers covering Noesana.
          </p>
        </div>

        {/* PR Contacts & Brandkit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left mb-20">
          
          {/* PR contacts cards */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            <div className="bg-slate-950/60 border border-white/5 p-6 sm:p-8 rounded-3xl">
              <div className="w-10 h-10 rounded-lg bg-noesana-orange/10 flex items-center justify-center text-noesana-orange mb-6">
                <Mail className="w-5 h-5" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">Press Contact</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                For interview requests, review unit allocations, or speaking panels, reach out to our media relations desk:
              </p>
              
              <div className="space-y-4 text-xs">
                <div className="border-t border-white/5 pt-4">
                  <div className="text-slate-500 uppercase font-mono font-normal">Global PR Desk</div>
                  <a href="mailto:press@noesana.com" className="text-white hover:text-noesana-orange transition-colors font-bold mt-1 block">
                    press@noesana.com
                  </a>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-slate-500 uppercase font-mono font-normal">Mailing Address</div>
                  <div className="text-slate-300 font-semibold mt-1">
                    Noesana Inc., PR Dept.<br />
                    100 Pine Street, Suite 1200<br />
                    San Francisco, CA 94111
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Media Kit downloads card */}
          <div className="lg:col-span-7 bg-slate-950/60 border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Media Assets Kit</h3>
                <span className="text-[10px] text-slate-500 font-mono">Size: 45 MB</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Download the official brand asset package containing high-resolution studio photos, vector logo marks, and bios for the founding team.
              </p>

              {/* Download items */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border border-white/5 bg-slate-900/30 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 text-xs font-bold text-white">
                    <Image className="w-4.5 h-4.5 text-noesana-orange" />
                    <span>Product & Studio Photography</span>
                  </div>
                  <button 
                    onClick={() => triggerDownload('product_photos.zip')}
                    className="p-2 border border-white/5 hover:border-noesana-orange text-noesana-orange hover:bg-noesana-orange/5 rounded-lg transition-colors text-xs font-bold flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between border border-white/5 bg-slate-900/30 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 text-xs font-bold text-white">
                    <FileText className="w-4.5 h-4.5 text-noesana-orange" />
                    <span>Logo Kit (Vector SVG / PNG)</span>
                  </div>
                  <button 
                    onClick={() => triggerDownload('logo_assets.zip')}
                    className="p-2 border border-white/5 hover:border-noesana-orange text-noesana-orange hover:bg-noesana-orange/5 rounded-lg transition-colors text-xs font-bold flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between border border-white/5 bg-slate-900/30 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 text-xs font-bold text-white">
                    <Users className="w-4.5 h-4.5 text-noesana-orange" />
                    <span>Founders Bios & Headshots</span>
                  </div>
                  <button 
                    onClick={() => triggerDownload('founders_bio.zip')}
                    className="p-2 border border-white/5 hover:border-noesana-orange text-noesana-orange hover:bg-noesana-orange/5 rounded-lg transition-colors text-xs font-bold flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* NEW SECTION: Recent Press Releases */}
        <div className="py-16 border-t border-white/5 text-left mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Company News</div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Recent Press Releases</h2>
            </div>

            {/* Search Input Bar */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search releases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/5 focus:border-noesana-orange/40 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredReleases.length > 0 ? (
              filteredReleases.map((release, idx) => (
                <div key={idx} className="border border-white/5 bg-slate-950/40 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-noesana-orange/20 transition-all">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>PUBLISHED BY NOESANA NEWSROOM</span>
                    <span>{release.date}</span>
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-white mb-2">{release.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{release.desc}</p>
                  </div>
                  <button className="text-noesana-orange text-xs font-bold hover:underline flex items-center space-x-1 w-fit mt-2">
                    <span>Read Full Release</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="border border-dashed border-white/5 bg-slate-950/20 p-8 rounded-2xl text-center">
                <p className="text-slate-500 text-xs">No press releases match your search query.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
