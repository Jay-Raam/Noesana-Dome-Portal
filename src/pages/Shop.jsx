import React, { useState, useEffect } from 'react';
import { ShieldCheck, Heart, Sparkles, Check, Lock, CreditCard, ChevronRight, HelpCircle, Eye, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Shop() {
  const plans = [
    {
      id: 'starter',
      name: 'App Starter Plan',
      sub: 'Annual App-Only Membership',
      price: 96.00,
      tax: 7.68,
      desc: 'Access guided sessions and basic brainwave calibration logs. Billed annually.'
    },
    {
      id: 'premium',
      name: 'App Premium Plan',
      sub: 'Annual App-Only Membership',
      price: 192.00,
      tax: 15.36,
      desc: 'Access advanced audio guides, raw telemetry export, and daily calibration metrics.'
    },
    {
      id: 'headband',
      name: 'Gen-2 Headband Bundle',
      sub: 'Hardware + 12M App Access',
      price: 349.00,
      tax: 27.92,
      desc: 'Includes the Gen-2 mind-sensing headband, compact magnetic charging dock, and 12 months premium access.'
    },
    {
      id: 'pro',
      name: 'Pro Hardware Suite',
      sub: 'Hardware + Lifetime App Access',
      price: 499.00,
      tax: 39.92,
      desc: 'Includes the Gen-2 headband, charging dock, premium travel case, and lifetime Dome app access.'
    }
  ];

  const location = useLocation();
  const [selectedPlanId, setSelectedPlanId] = useState('headband');

  // Detect matching plan from URL search parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planParam = params.get('plan');
    if (planParam === 'starter' || planParam === 'premium' || planParam === 'headband' || planParam === 'pro') {
      setSelectedPlanId(planParam);
    }
  }, [location]);

  const activePlan = plans.find(p => p.id === selectedPlanId) || plans[2];

  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form', 'processing', 'success'
  const [processingLog, setProcessingLog] = useState('');
  const [cardFocused, setCardFocused] = useState(false); // true if CVV focused (for card flip)
  const [orderNum, setOrderNum] = useState('NS-78394-US');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNum: '',
    expiry: '',
    cvv: '',
    zip: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Detect card brand
  const getCardBrand = (number) => {
    const clean = number.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (clean.startsWith('5')) return 'mastercard';
    if (clean.startsWith('3')) return 'amex';
    return 'generic';
  };

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    setFormData({ ...formData, cardNum: parts.join(' ') });
  };

  // Format Expiry (adds slash MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      setFormData({ ...formData, expiry: `${value.slice(0, 2)}/${value.slice(2)}` });
    } else {
      setFormData({ ...formData, expiry: value });
    }
  };

  // Validate form before submitting
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name) errors.name = 'Cardholder name is required';
    if (!emailRegex.test(formData.email)) errors.email = 'Enter a valid email address';
    
    const cleanCard = formData.cardNum.replace(/\s/g, '');
    if (cleanCard.length < 15) errors.cardNum = 'Card number is invalid';
    
    if (formData.expiry.length < 5) errors.expiry = 'Invalid expiry date';
    if (formData.cvv.length < 3) errors.cvv = 'Invalid CVV';
    if (formData.zip.length < 5) errors.zip = 'Invalid ZIP';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setCheckoutStep('processing');
  };

  // Simulate payment gateway log animation
  useEffect(() => {
    if (checkoutStep !== 'processing') return;

    const logs = [
      'Establishing secure SSL tunnel (AES-256)...',
      'Tokenizing card credentials via PCI-DSS compliant vault...',
      'Connecting to payment gateway API...',
      'Conducting 3D-Secure verification checks...',
      'Authorized! Fetching transaction token...',
      'Finalizing merchant ledger entries...'
    ];

    let currentLogIndex = 0;
    setProcessingLog(logs[0]);

    const logInterval = setInterval(() => {
      currentLogIndex++;
      if (currentLogIndex < logs.length) {
        setProcessingLog(logs[currentLogIndex]);
      } else {
        clearInterval(logInterval);
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const generatedOrder = `NS-${randomNum}-US`;
        setOrderNum(generatedOrder);

        const orderData = {
          orderId: generatedOrder,
          name: formData.name,
          email: formData.email,
          item: activePlan.name,
          price: `$${(activePlan.price + activePlan.tax).toFixed(2)}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'In Transit',
          logs: [
            { time: '10:02 AM', status: 'Payment Authorized', desc: 'Secure payment gateway tokenized and captured successfully.' },
            { time: '11:15 AM', status: 'Calibration Complete', desc: 'Active dry silver sensor node matrix configured and frequency-calibrated.' },
            { time: '02:30 PM', status: 'Package Sealed', desc: 'Headwear packed in anti-static travel sleeve with magnetic charging dock.' },
            { time: '04:45 PM', status: 'Carrier Handover', desc: 'Shipment dispatched to regional parcel sorting facility.' }
          ]
        };

        const existingOrders = JSON.parse(localStorage.getItem('noesana_orders') || '[]');
        existingOrders.push(orderData);
        localStorage.setItem('noesana_orders', JSON.stringify(existingOrders));

        setCheckoutStep('success');
      }
    }, 1200);

    return () => clearInterval(logInterval);
  }, [checkoutStep, formData, activePlan]);

  const cardBrand = getCardBrand(formData.cardNum);

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-left mb-16 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Acquire Clarity</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Order Checkout</h1>
          <p className="text-slate-400 text-sm mt-3 max-w-xl">
            Choose your device plan. Experience medical-grade bio-feedback, deep sleep diagnostics, and daily mind-states calibration.
          </p>
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left panel: Product Specs & Pricing Summary */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            
            {/* Plan Selector Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Device or App Plan</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-40 ${
                      selectedPlanId === plan.id
                        ? 'border-noesana-orange bg-noesana-orange/5 text-white'
                        : 'border-white/5 bg-slate-950/40 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{plan.sub}</div>
                      <h4 className="text-sm font-black text-white">{plan.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed line-clamp-2">{plan.desc}</p>
                    </div>
                    <div className="text-right mt-4 border-t border-white/5 pt-2 flex items-baseline justify-between w-full">
                      <span className="text-[9px] text-slate-500">Total Due</span>
                      <span className="font-cyber font-black text-white text-base">${(plan.price + plan.tax).toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Price Summary */}
            <div className="bg-slate-950/60 border border-white/5 p-6 sm:p-8 rounded-3xl">
              <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Selected Plan Details</div>
              <h3 className="text-xl font-black text-white mb-2">{activePlan.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                {activePlan.desc}
              </p>

              <hr className="border-white/5 my-6" />

              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Pricing Breakdown</h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-200">${activePlan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping (Insured)</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Sales Tax</span>
                  <span className="text-slate-200">${activePlan.tax.toFixed(2)}</span>
                </div>
                <hr className="border-white/5 my-2" />
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-white">Total Charge</span>
                  <span className="text-noesana-orange font-cyber text-lg">${(activePlan.price + activePlan.tax).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Satisfaction pledge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-noesana-orange shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">30-Day Home Trial</h4>
                  <p className="text-[10px] text-slate-500">Test Noesana in your home. Return it for a full refund if not completely calm.</p>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl flex items-start space-x-3">
                <Sparkles className="w-6 h-6 text-noesana-orange shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">1-Year Warranty</h4>
                  <p className="text-[10px] text-slate-500">Full parts coverage and automatic calibration patches.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel: Dynamic Checkout Card */}
          <div className="lg:col-span-6 bg-noesana-white text-black p-8 rounded-3xl relative shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
            
            {/* Phase 1: Interactive Payment Form */}
            {checkoutStep === 'form' && (
              <form onSubmit={handleCheckout} className="flex flex-col space-y-5">
                
                {/* Secure Badge header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-0.5">Secure Checkout</h3>
                    <p className="text-slate-500 text-[10px]">Encrypted direct gateway connection</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 rounded px-2.5 py-1 text-[9px] font-bold text-slate-600 uppercase font-mono">
                    <Lock className="w-3 h-3 text-noesana-orange stroke-[2.5]" />
                    <span>SSL Secured</span>
                  </div>
                </div>

                {/* Virtual Credit Card Graphic */}
                <div className="w-full aspect-[1.8/1] rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-white p-6 relative shadow-lg overflow-hidden border border-white/10 select-none">
                  {/* Chip and brand */}
                  <div className="flex items-start justify-between">
                    {/* Card Chip */}
                    <div className="w-10 h-7 rounded bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border border-amber-500/40 relative shadow-sm" />
                    {/* Card Brand icon */}
                    <div className="text-xs font-cyber font-black tracking-widest text-slate-400 uppercase">
                      {cardBrand === 'visa' && <span className="text-sky-400 font-bold italic">VISA</span>}
                      {cardBrand === 'mastercard' && <span className="text-red-500 font-bold">Mastercard</span>}
                      {cardBrand === 'amex' && <span className="text-noesana-orange font-bold">AMEX</span>}
                      {cardBrand === 'generic' && <span>CARD</span>}
                    </div>
                  </div>

                  {/* Card Number display */}
                  <div className="mt-8 font-cyber font-bold text-lg sm:text-xl tracking-wider text-white">
                    {formData.cardNum || '•••• •••• •••• ••••'}
                  </div>

                  {/* Holder and Expiry */}
                  <div className="flex justify-between items-end mt-8">
                    <div>
                      <div className="text-[8px] text-slate-500 uppercase tracking-widest">Cardholder</div>
                      <div className="text-xs font-bold font-mono tracking-wide truncate max-w-[180px]">
                        {formData.name.toUpperCase() || 'JANE DOE'}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[8px] text-slate-500 uppercase tracking-widest">Expires</div>
                      <div className="text-xs font-bold font-mono tracking-wide">
                        {formData.expiry || 'MM/YY'}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[8px] text-slate-500 uppercase tracking-widest">CVV</div>
                      <div className="text-xs font-bold font-mono tracking-wide">
                        {formData.cvv || '•••'}
                      </div>
                    </div>
                  </div>

                  {/* Tech Grid Backdrop */}
                  <div className="absolute inset-0 bg-noesana-orange/[0.02] pointer-events-none" />
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Cardholder Name */}
                  <div className="col-span-2 flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                    />
                    {formErrors.name && (
                      <span className="text-[10px] text-red-500 flex items-center space-x-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Card Number */}
                  <div className="col-span-2 flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="4000 1234 5678 9010"
                        value={formData.cardNum}
                        onChange={handleCardNumChange}
                        className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                    {formErrors.cardNum && (
                      <span className="text-[10px] text-red-500 flex items-center space-x-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.cardNum}</span>
                      </span>
                    )}
                  </div>

                  {/* Expiry Date */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleExpiryChange}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                    />
                    {formErrors.expiry && (
                      <span className="text-[10px] text-red-500 flex items-center space-x-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.expiry}</span>
                      </span>
                    )}
                  </div>

                  {/* CVV */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">CVV Code</label>
                    <input 
                      type="password" 
                      placeholder="•••"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                    />
                    {formErrors.cvv && (
                      <span className="text-[10px] text-red-500 flex items-center space-x-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.cvv}</span>
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@enterprise.io"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                    />
                    {formErrors.email && (
                      <span className="text-[10px] text-red-500 flex items-center space-x-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.email}</span>
                      </span>
                    )}
                  </div>

                  {/* Billing ZIP */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Billing ZIP</label>
                    <input 
                      type="text" 
                      maxLength={6}
                      placeholder="94043"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-noesana-orange"
                    />
                    {formErrors.zip && (
                      <span className="text-[10px] text-red-500 flex items-center space-x-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.zip}</span>
                      </span>
                    )}
                  </div>

                </div>

                <button 
                  type="submit"
                  className="w-full text-center py-4 bg-noesana-orange text-white hover:bg-black transition-all rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-noesana-orange/20 mt-4 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  <span>Authorize Charge of ${(activePlan.price + activePlan.tax).toFixed(2)}</span>
                </button>
              </form>
            )}

            {/* Phase 2: Processing Payment Simulation */}
            {checkoutStep === 'processing' && (
              <div className="flex-1 flex flex-col justify-center items-center py-16 space-y-8">
                
                {/* Glowing spinner */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[3px] border-slate-200 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-[3px] border-noesana-orange border-t-transparent animate-spin" />
                  <Lock className="w-8 h-8 text-noesana-orange animate-bounce" />
                </div>

                <div className="text-center space-y-2 max-w-sm">
                  <h3 className="text-lg font-black text-slate-900">Processing Secure Transaction</h3>
                  <p className="text-slate-500 text-xs">Do not close this window or refresh the page.</p>
                </div>

                {/* Live transaction log console */}
                <div className="w-full max-w-md bg-slate-950 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-slate-400 text-left min-h-[60px] flex items-center">
                  <span className="relative flex h-2 w-2 mr-3.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-noesana-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-noesana-orange"></span>
                  </span>
                  <span>{processingLog}</span>
                </div>

              </div>
            )}

            {/* Phase 3: Success Screen */}
            {checkoutStep === 'success' && (
              <div className="flex-1 flex flex-col justify-center items-center py-12 text-center space-y-6">
                
                {/* Animated check bubble */}
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Order Confirmed!</h3>
                  <p className="text-slate-500 text-xs max-w-sm">
                    Thank you for joining NOESANA. Your payment of **${(activePlan.price + activePlan.tax).toFixed(2)}** has been completed successfully via our secure gateway.
                  </p>
                </div>

                {/* Receipt widget */}
                <div className="w-full max-w-md bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left text-xs space-y-3.5 mt-4">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Receipt ID</span>
                    <span className="text-slate-800 font-mono font-bold">{orderNum}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cardholder Name:</span>
                      <span className="text-slate-800 font-semibold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email Reference:</span>
                      <span className="text-slate-800 font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimated Delivery:</span>
                      <span className="text-emerald-600 font-bold">July 15, 2026</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setFormData({ name: '', email: '', cardNum: '', expiry: '', cvv: '', zip: '' });
                    setCheckoutStep('form');
                  }}
                  className="px-6 py-2.5 border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors mt-6"
                >
                  Order Another Headband
                </button>

              </div>
            )}

            {/* PCI Compliance Assurance footer */}
            <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-slate-400 text-[9px] font-mono select-none">
              <span>PCI-DSS COMPLIANT</span>
              <span>AES-256 ENCRYPTED</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
