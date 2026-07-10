import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Brain, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md text-center space-y-8">

        {/* Large 404 display */}
        <div className="relative">
          <div className="text-[120px] sm:text-[160px] font-cyber font-black text-white/[0.03] leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-noesana-orange/10 border-2 border-noesana-orange/20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-noesana-orange" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Signal Lost</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            The neural pathway you're looking for doesn't exist or has been recalibrated. Let's guide you back to a stable frequency.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-noesana-orange text-white hover:bg-white hover:text-black transition-all rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Branding */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <div className="w-6 h-6 rounded-full bg-noesana-orange flex items-center justify-center">
            <Activity className="w-3 h-3 text-black stroke-[3]" />
          </div>
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">NOESANA</span>
        </div>

      </div>
    </div>
  );
}
