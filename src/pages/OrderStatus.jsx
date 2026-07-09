import React, { useState } from 'react';
import { Search, Package, MapPin, Calendar, Clock } from 'lucide-react';

export default function OrderStatus() {
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderId) return;

    const query = orderId.trim().toUpperCase();
    const existingOrders = JSON.parse(localStorage.getItem('noesana_orders') || '[]');
    const matchedOrder = existingOrders.find(ord => ord.orderId.toUpperCase() === query);

    if (matchedOrder) {
      setStatus({
        id: matchedOrder.orderId,
        date: matchedOrder.date,
        estimate: 'July 15, 2026',
        state: 'shipped',
        carrier: 'Noesana Express Logistics (Insured)',
        location: 'Carrier Hub Dispatch',
        customLogs: matchedOrder.logs,
        foundLocal: true,
        item: matchedOrder.item,
        price: matchedOrder.price,
        name: matchedOrder.name
      });
    } else {
      setStatus({
        id: query,
        date: '2026-07-10',
        estimate: '2026-07-15',
        state: 'shipped',
        carrier: 'FedEx Ground Shipping',
        location: 'Memphis Hub, TN',
        foundLocal: false,
        item: 'Noesana Headband Gen-2 Bundle',
        price: '$376.92',
        name: 'Guest Client'
      });
    }
    setSearched(true);
  };

  return (
    <div className="bg-black text-slate-200 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-left">
        
        {/* Title */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <div className="text-xs font-bold text-noesana-orange uppercase tracking-wider mb-2">Delivery Logs</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Order Status</h1>
          <p className="text-slate-400 text-sm mt-2">Enter your order ID (e.g. NS-XXXXX-US) to check the shipping status of your Gen-2 headband.</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-slate-950/60 border border-white/5 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 flex flex-col space-y-1 w-full">
            <label className="text-[10px] uppercase font-bold text-slate-500">Order ID</label>
            <input 
              type="text" 
              required
              placeholder="e.g. NS-78394-US"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-black border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-noesana-orange w-full"
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-noesana-orange text-white hover:bg-white hover:text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 shrink-0 h-10 w-full sm:w-auto justify-center"
          >
            <Search className="w-4 h-4" />
            <span>Track Order</span>
          </button>
        </form>

        {/* Search Results */}
        {searched && status && (
          <div className="bg-slate-950/60 border border-white/10 p-6 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
              <div>
                <h3 className="font-bold text-white text-md">Order ID: {status.id}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Carrier: {status.carrier}</p>
                {status.foundLocal && (
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block mt-1">✓ Order Verified in Local Registry</span>
                )}
              </div>
              <div className="bg-noesana-orange/10 border border-noesana-orange/20 px-3 py-1 rounded text-xs font-bold text-noesana-orange uppercase tracking-wider w-fit">
                IN TRANSIT
              </div>
            </div>

            {/* General details */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient:</span>
                <span className="text-white font-semibold">{status.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Item Purchased:</span>
                <span className="text-white font-semibold">{status.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Charged:</span>
                <span className="text-noesana-orange font-bold font-mono">{status.price}</span>
              </div>
            </div>

            {/* Steps tracker / Standard Timeline */}
            {!status.foundLocal ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-noesana-orange shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Order Received</div>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{status.date} (12:44 PM)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-noesana-orange shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">In Transit</div>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{status.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-400">Estimated Delivery</div>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{status.estimate}</p>
                  </div>
                </div>
              </div>
            ) : (
              // Live local shipment timeline logs!
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Detailed Shipment Milestones</h4>
                <div className="relative border-l border-white/5 ml-3 pl-6 space-y-5">
                  {status.customLogs.map((log, idx) => (
                    <div key={idx} className="relative">
                      {/* Node Dot */}
                      <span className="absolute -left-[30px] top-1.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-noesana-orange opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-noesana-orange"></span>
                      </span>
                      
                      <div className="text-xs font-bold text-white">{log.status}</div>
                      <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider block mt-0.5">
                        {status.date} • {log.time}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-xl leading-relaxed">{log.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
