import React, { useState } from 'react';
import { Check, HelpCircle, ShieldAlert, Sparkles, Award, Star, Info, Brain, ChevronRight, Target, Moon, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Pricing() {
  const [billing, setBilling] = useState('annual');

  // Cognitive Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0=not started, 1-3=questions, 4=results
  const [quizAnswers, setQuizAnswers] = useState({ goal: '', sleep: '', stress: '' });
  const navigate = useNavigate();

  const quizQuestions = [
    {
      title: 'What is your primary objective?',
      key: 'goal',
      options: [
        { label: 'Deep Focus & Productivity', value: 'focus', icon: <Zap className="w-4 h-4" /> },
        { label: 'Better Sleep Quality', value: 'sleep', icon: <Moon className="w-4 h-4" /> },
        { label: 'Stress & Anxiety Management', value: 'stress', icon: <ShieldAlert className="w-4 h-4" /> },
        { label: 'Meditation Depth', value: 'meditation', icon: <Brain className="w-4 h-4" /> }
      ]
    },
    {
      title: 'How many hours of deep sleep do you average?',
      key: 'sleep',
      options: [
        { label: 'Less than 5 hours', value: 'low', icon: <Moon className="w-4 h-4" /> },
        { label: '5 to 7 hours', value: 'mid', icon: <Moon className="w-4 h-4" /> },
        { label: 'More than 7 hours', value: 'high', icon: <Moon className="w-4 h-4" /> }
      ]
    },
    {
      title: 'How would you describe your daily stress levels?',
      key: 'stress',
      options: [
        { label: 'Mild — I feel mostly calm', value: 'low', icon: <Check className="w-4 h-4" /> },
        { label: 'Moderate — Occasional tension', value: 'mid', icon: <Target className="w-4 h-4" /> },
        { label: 'Intense — Constant mental pressure', value: 'high', icon: <ShieldAlert className="w-4 h-4" /> }
      ]
    }
  ];

  const getQuizResult = () => {
    const { goal, sleep, stress } = quizAnswers;
    let wave = 'Alpha-Theta Crossover';
    let duration = '12 minutes';
    let plan = 'Premium';
    let desc = 'Your profile suggests a balanced relaxation protocol targeting Alpha-Theta transitions.';

    if (goal === 'focus') {
      wave = 'Beta-Gamma Enhancement';
      duration = '20 minutes';
      plan = 'Pro Hardware';
      desc = 'Your responses indicate strong analytical demands. We recommend high-frequency Beta amplification with real-time distraction alerts.';
    } else if (goal === 'sleep') {
      wave = 'Delta Wave Entrainment';
      duration = '30 minutes (before bed)';
      plan = 'Pro Hardware';
      desc = 'Your sleep pattern suggests you could benefit from Delta-wave guided slow oscillation induction during pre-sleep routines.';
    } else if (goal === 'stress') {
      wave = 'Alpha Asymmetry Balancing';
      duration = '15 minutes';
      plan = stress === 'high' ? 'Pro Hardware' : 'Premium';
      desc = 'Your stress indicators suggest autonomic nervous system deregulation. Alpha asymmetry normalization is recommended.';
    } else if (goal === 'meditation') {
      wave = 'Theta-Alpha Peak Training';
      duration = '25 minutes';
      plan = 'Premium';
      desc = 'Deep meditation practitioners benefit from sustained Theta amplification with Alpha guard rails to prevent sleep onset.';
    }

    if (sleep === 'low') {
      duration = '30 minutes (evening)';
      if (goal !== 'focus') wave = 'Delta-Theta Cascade';
    }

    return { wave, duration, plan, desc };
  };

  const comparisonFeatures = [
    { name: 'EEG Calibration Waveform', starter: true, premium: true, hardware: true },
    { name: 'Weekly Mindwave Reports', starter: true, premium: true, hardware: true },
    { name: 'Advanced Audio Guides', starter: false, premium: true, hardware: true },
    { name: 'Apple & Google Health Sync', starter: false, premium: true, hardware: true },
    { name: 'Raw Telemetry CSV Export', starter: false, premium: true, hardware: true },
    { name: 'Gen-2 Headband Hardware', starter: false, starterText: 'No', premium: false, premiumText: 'No', hardware: true, hardwareText: 'Included' },
    { name: 'Lifetime App Access', starter: false, premium: false, hardware: 'Pro Plan Only', hardwareText: 'Pro Plan' }
  ];

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Pricing Plans</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Invest in Your Mind</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            Choose the plan that fits your lifestyle. Every plan comes with our 30-day money-back guarantee.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center bg-slate-900 border border-white/5 rounded-full p-1 mt-8">
            <button 
              onClick={() => setBilling('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billing === 'monthly' ? 'bg-noesana-orange text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBilling('annual')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                billing === 'annual' ? 'bg-noesana-orange text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="bg-white/10 text-white text-[9px] px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* ---------------- SECTION 1: DOME APP MEMBERSHIPS ---------------- */}
        <div className="mb-20 text-left">
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-white tracking-tight uppercase text-slate-400">01 • App-Only Memberships</h2>
            <p className="text-xs text-slate-500 mt-1">Requires owning a Noesana headband (Gen-1 or Gen-2) to sync neural logs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            
            {/* Plan 1: App Starter */}
            <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dome App Starter</div>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="font-cyber font-extrabold text-4xl text-white">
                    {billing === 'annual' ? '$8' : '$10'}
                  </span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Access guided sessions and basic brainwave calibration logs. Best for everyday mental checkups.
                </p>
                <hr className="border-white/5 mb-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Basic Dome App access</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Focus & Sleep calibration logs</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Basic session summaries</span>
                  </li>
                </ul>
              </div>
              <Link to="/shop" className="w-full text-center py-3 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-lg text-xs font-semibold transition-all mt-8">
                Subscribe to Starter
              </Link>
            </div>

            {/* Plan 2: App Premium */}
            <div className="bg-slate-950/40 border border-noesana-orange/30 rounded-3xl p-8 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-6 bg-noesana-orange/15 border border-noesana-orange/30 text-noesana-orange text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                Advanced Analytics
              </div>
              <div>
                <div className="text-xs font-bold text-noesana-orange uppercase tracking-widest mb-2 mt-1">Dome App Premium</div>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="font-cyber font-extrabold text-4xl text-white">
                    {billing === 'annual' ? '$12' : '$16'}
                  </span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Unlock advanced audio feedback models, raw CSV data exports, and synchronization hooks.
                </p>
                <hr className="border-white/5 mb-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>All Starter features included</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Raw Telemetry CSV File Export</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Apple & Google Health integration</span>
                  </li>
                </ul>
              </div>
              <Link to="/shop" className="w-full text-center py-3 bg-noesana-orange text-black hover:bg-white rounded-lg text-xs font-bold transition-all mt-8">
                Subscribe to Premium
              </Link>
            </div>

          </div>
        </div>

        {/* ---------------- SECTION 2: HARDWARE BUNDLES ---------------- */}
        <div className="mb-20 text-left border-t border-white/5 pt-16">
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-white tracking-tight uppercase text-slate-400">02 • Hardware Bundles</h2>
            <p className="text-xs text-slate-500 mt-1">Includes our new Gen-2 headband with built-in active sensor arrays.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Bundle 1: Standard */}
            <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Gen-2 Standard Bundle</div>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="font-cyber font-extrabold text-4xl text-white">$349</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">One-time</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Get the state-of-the-art headband and a full 1-year membership to the Dome Premium App.
                </p>
                <hr className="border-white/5 mb-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Noesana Headband Gen-2</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>1-Year Dome App Premium Access</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Magnetic USB-C Charging Dock</span>
                  </li>
                </ul>
              </div>
              <Link to="/shop" className="w-full text-center py-3 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-lg text-xs font-semibold transition-all mt-8">
                Buy Standard Bundle
              </Link>
            </div>

            {/* Bundle 2: Pro (Lifetime) */}
            <div className="bg-slate-950/80 border-2 border-noesana-orange rounded-3xl p-8 flex flex-col justify-between relative shadow-xl shadow-noesana-orange/5">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-noesana-orange text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div>
                <div className="text-xs font-bold text-noesana-orange uppercase tracking-widest mb-2 mt-2">Gen-2 Pro Lifetime Bundle</div>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="font-cyber font-extrabold text-4xl text-white">$449</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">One-time</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Get the headband and **lifetime** access to the Dome Premium App. Includes premium travel case.
                </p>
                <hr className="border-white/5 mb-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Noesana Headband Gen-2</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Lifetime Dome App Premium Access</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Magnetic dock & Premium Travel Case</span>
                  </li>
                </ul>
              </div>
              <Link to="/shop" className="w-full text-center py-3 bg-noesana-orange text-black hover:bg-white rounded-lg text-xs font-bold transition-all mt-8">
                Buy Pro Bundle
              </Link>
            </div>

            {/* Bundle 3: Team/Clinic */}
            <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Team & Clinic Plan</div>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="font-cyber font-extrabold text-4xl text-white">Custom</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Bulk hardware deployments for wellness centers, universities, and corporations.
                </p>
                <hr className="border-white/5 mb-6" />
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>10+ Headbands (Gen-2)</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Centralized clinic dashboard access</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-noesana-orange shrink-0" />
                    <span>Dedicated account support manager</span>
                  </li>
                </ul>
              </div>
              <a href="mailto:press@noesana.com" className="w-full text-center py-3 bg-white hover:bg-noesana-white text-black rounded-lg text-xs font-semibold transition-all mt-8">
                Contact Sales
              </a>
            </div>

          </div>
        </div>

        {/* ---------------- SECTION 3: FEATURES COMPARISON TABLE ---------------- */}
        <div className="py-16 border-t border-white/5 text-left mb-16 overflow-hidden">
          <div className="max-w-xl mb-10">
            <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Detailed Matrix</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Features Comparison</h2>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-2">Membership Features</th>
                  <th className="py-4 px-2">App Starter</th>
                  <th className="py-4 px-2">App Premium</th>
                  <th className="py-4 px-2">Hardware Bundles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {comparisonFeatures.map((feat, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-2 font-bold text-white">{feat.name}</td>
                    
                    <td className="py-4 px-2">
                      {typeof feat.starter === 'boolean' ? (
                        feat.starter ? <Check className="w-4 h-4 text-noesana-orange" /> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="font-semibold text-[10px]">{feat.starterText}</span>
                      )}
                    </td>
                    
                    <td className="py-4 px-2">
                      {typeof feat.premium === 'boolean' ? (
                        feat.premium ? <Check className="w-4 h-4 text-noesana-orange" /> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="font-semibold text-[10px]">{feat.premiumText}</span>
                      )}
                    </td>
                    
                    <td className="py-4 px-2">
                      {typeof feat.hardware === 'boolean' ? (
                        feat.hardware ? <Check className="w-4 h-4 text-noesana-orange" /> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="font-semibold text-[10px] text-noesana-orange">{feat.hardwareText}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* ---------------- SECTION 4: COGNITIVE PROFILE QUIZ ---------------- */}
        <div className="py-16 border-t border-white/5 text-left mb-16">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-2 bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1.5 rounded-full text-xs font-bold text-noesana-orange uppercase tracking-wider mb-4">
                <Brain className="w-3.5 h-3.5" />
                <span>Personalized Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Discover Your Cognitive Profile</h2>
              <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">
                Answer 3 quick questions and we'll recommend your optimal brainwave training protocol and matching plan.
              </p>
            </div>

            {quizStep === 0 && (
              <div className="text-center">
                <button
                  onClick={() => setQuizStep(1)}
                  className="px-8 py-4 bg-noesana-orange text-white hover:bg-white hover:text-black transition-all rounded-full font-bold text-sm uppercase tracking-wider shadow-lg shadow-noesana-orange/20 inline-flex items-center space-x-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>Start Assessment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {quizStep >= 1 && quizStep <= 3 && (
              <div className="bg-slate-950/60 border border-white/5 p-8 rounded-3xl">
                {/* Progress bar */}
                <div className="flex items-center space-x-2 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-white/5">
                      <div className={`h-full rounded-full transition-all duration-500 ${s <= quizStep ? 'bg-noesana-orange' : 'bg-transparent'}`} style={{ width: s <= quizStep ? '100%' : '0%' }} />
                    </div>
                  ))}
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{quizStep}/3</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-6">{quizQuestions[quizStep - 1].title}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizQuestions[quizStep - 1].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, [quizQuestions[quizStep - 1].key]: opt.value });
                        if (quizStep < 3) {
                          setQuizStep(quizStep + 1);
                        } else {
                          setQuizStep(4);
                        }
                      }}
                      className={`p-4 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                        quizAnswers[quizQuestions[quizStep - 1].key] === opt.value
                          ? 'border-noesana-orange bg-noesana-orange/5'
                          : 'border-white/5 hover:border-white/20 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center shrink-0 text-noesana-orange">
                        {opt.icon}
                      </div>
                      <span className="text-xs font-bold text-white">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {quizStep > 1 && (
                  <button
                    onClick={() => setQuizStep(quizStep - 1)}
                    className="mt-4 text-[10px] text-slate-500 hover:text-white font-bold uppercase tracking-wider transition-colors"
                  >
                    ← Previous Question
                  </button>
                )}
              </div>
            )}

            {quizStep === 4 && (() => {
              const result = getQuizResult();
              return (
                <div className="bg-slate-950/60 border border-white/5 p-8 rounded-3xl space-y-6">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-noesana-orange/10 border-2 border-noesana-orange/20 text-noesana-orange flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black text-white">Your Cognitive Profile</h3>
                    <p className="text-slate-400 text-xs mt-2 max-w-md mx-auto">{result.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Target Wave Protocol</div>
                      <div className="text-sm font-bold text-noesana-orange">{result.wave}</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Optimal Duration</div>
                      <div className="text-sm font-bold text-white">{result.duration}</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-center">
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Recommended Plan</div>
                      <div className="text-sm font-bold text-emerald-400">{result.plan}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        const planMap = {
                          'Starter': 'starter',
                          'Premium': 'premium',
                          'Pro Hardware': 'pro'
                        };
                        const targetPlan = planMap[result.plan] || 'headband';
                        navigate(`/shop?plan=${targetPlan}`);
                      }}
                      className="flex-1 py-3.5 bg-noesana-orange text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center space-x-2 transition-all"
                    >
                      <span>Get {result.plan} Plan</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setQuizStep(0); setQuizAnswers({ goal: '', sleep: '', stress: '' }); }}
                      className="flex-1 py-3.5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center space-x-2 transition-all"
                    >
                      <span>Retake Assessment</span>
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>

      </div>
    </div>
  );
}
