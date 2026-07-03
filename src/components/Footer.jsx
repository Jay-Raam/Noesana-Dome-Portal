import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-slate-500 py-20 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand & Catchphrase Column */}
          <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-7 h-7 flex items-center justify-center bg-noesana-orange rounded-full">
                <Activity className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-cyber font-black text-lg tracking-widest text-white">NOESANA</span>
            </Link>
            <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
              We create sensory products that help you calm your mind, release tension, and regain daily clarity.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="text-left flex flex-col space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <nav className="flex flex-col space-y-2 text-xs">
              <Link to="/shop" className="hover:text-noesana-orange transition-colors">Headband Gen-2</Link>
              <Link to="/analytics" className="hover:text-noesana-orange transition-colors">Calm States</Link>
              <Link to="/pricing" className="hover:text-noesana-orange transition-colors">Pricing Info</Link>
              <Link to="/order-status" className="hover:text-noesana-orange transition-colors">Order Status</Link>
            </nav>
          </div>

          {/* Links Column 2 */}
          <div className="text-left flex flex-col space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Technology</h4>
            <nav className="flex flex-col space-y-2 text-xs">
              <Link to="/technology" className="hover:text-noesana-orange transition-colors">Sensing Hardware</Link>
              <Link to="/technology/algorithms" className="hover:text-noesana-orange transition-colors">Heuristic Algorithms</Link>
              <Link to="/technology/sleep" className="hover:text-noesana-orange transition-colors">Sleep Tracking</Link>
              <Link to="/technology/validation" className="hover:text-noesana-orange transition-colors">Validation Studies</Link>
            </nav>
          </div>

          {/* Links Column 3 */}
          <div className="text-left flex flex-col space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <nav className="flex flex-col space-y-2 text-xs">
              <Link to="/about" className="hover:text-noesana-orange transition-colors">Our Vision</Link>
              <Link to="/science" className="hover:text-noesana-orange transition-colors">Neuro-Science Board</Link>
              <Link to="/press" className="hover:text-noesana-orange transition-colors">Press Inquiries</Link>
              <Link to="/careers" className="hover:text-noesana-orange transition-colors">Careers</Link>
            </nav>
          </div>

          {/* CTA column */}
          <div className="text-left flex flex-col space-y-4 lg:col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Get Active</h4>
            <Link to="/shop" className="w-full text-center py-3 bg-noesana-orange hover:bg-white text-black font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-lg shadow-noesana-orange/10">
              Shop Now
            </Link>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} NOESANA Inc. All rights reserved.</span>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-noesana-orange transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-noesana-orange transition-colors">Terms of Use</Link>
            <Link to="/legal" className="hover:text-noesana-orange transition-colors">Legal Disclosures</Link>
          </div>
        </div>

      </div>

      {/* Backdrop Stencil Watermark */}
      <div className="absolute bottom-0 left-0 w-full select-none overflow-hidden h-28 pointer-events-none opacity-5">
        <div className="font-cyber font-black text-[130px] tracking-[0.2em] leading-none text-white text-center translate-y-10">
          NOESANA
        </div>
      </div>
    </footer>
  );
}
