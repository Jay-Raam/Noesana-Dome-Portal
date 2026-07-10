import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, Activity } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Get in Touch</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Contact Us</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            Have questions about your headband, the Dome app, or need support? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">

          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col space-y-6">

            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Noesana Headquarters</h3>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-noesana-orange/10 border border-noesana-orange/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-noesana-orange" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Office Address</div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    1 Infinite Loop, Suite 420<br />
                    Cupertino, CA 95014<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-noesana-orange/10 border border-noesana-orange/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-noesana-orange" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Email Support</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">support@noesana.io</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-noesana-orange/10 border border-noesana-orange/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-noesana-orange" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Phone Support</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">+1 (800) 227-CALM</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Mon-Fri, 9AM-6PM PST</p>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-4">Support Availability</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Live Chat</span>
                  <span className="text-noesana-orange font-bold">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email Response</span>
                  <span className="text-white font-semibold">{'<'} 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hardware Returns</span>
                  <span className="text-white font-semibold">30-day window</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-noesana-white text-black p-8 rounded-3xl shadow-2xl">

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-200 pb-4 mb-2">
                  <h3 className="text-lg font-black text-slate-900">Send a Message</h3>
                  <p className="text-slate-500 text-[10px]">We'll respond as quickly as possible</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-noesana-orange"
                  >
                    <option value="">Select a topic...</option>
                    <option value="order">Order & Shipping</option>
                    <option value="hardware">Hardware Support</option>
                    <option value="app">Dome App Support</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your question or issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-noesana-orange text-white hover:bg-black transition-all rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-noesana-orange/20 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-noesana-orange/10 border-2 border-noesana-orange/20 text-noesana-orange flex items-center justify-center">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Message Sent!</h3>
                  <p className="text-slate-500 text-xs max-w-sm">
                    Thank you for reaching out. Our support team will respond to <strong>{formData.email}</strong> within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="px-6 py-2.5 border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}

            {/* Footer branding */}
            <div className="border-t border-slate-200 pt-4 mt-6 flex items-center justify-between text-slate-400 text-[9px] font-mono select-none">
              <span>ENCRYPTED SUBMISSION</span>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded-full bg-noesana-orange flex items-center justify-center">
                  <Activity className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
                <span>NOESANA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
