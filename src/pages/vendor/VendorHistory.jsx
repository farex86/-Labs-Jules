import React from 'react';

const VendorHistory = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-primary/10 -mx-4 -mt-4 mb-4 px-4 py-4 flex items-center justify-between shrink-0">
        <button onClick={() => window.history.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-primary">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">Transaction History</h1>
          <p className="text-primary/70 text-xs font-medium uppercase tracking-wider">Riwayat Transaksi</p>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Filters */}
      <div className="flex gap-3 pb-4 overflow-x-auto no-scrollbar shrink-0">
        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary px-6 text-white transition-colors">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">Today</span>
            <span className="text-[10px] opacity-80 uppercase leading-none tracking-tighter">Hari Ini</span>
          </div>
        </button>
        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary/10 dark:bg-primary/20 px-6 text-primary transition-colors">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">Week</span>
            <span className="text-[10px] opacity-80 uppercase leading-none tracking-tighter">Minggu Ini</span>
          </div>
        </button>
        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary/10 dark:bg-primary/20 px-6 text-primary transition-colors">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold">All</span>
            <span className="text-[10px] opacity-80 uppercase leading-none tracking-tighter">Semua</span>
          </div>
        </button>
      </div>

      {/* List View */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {[
          { id: 'VC-882910', amount: '$45.00', status: 'Synced / Sinkron', time: '24 Oct 2023 • 14:20 PM', color: 'green', icon: 'check_circle' },
          { id: 'VC-771234', amount: '$12.50', status: 'Pending / Tertunda', time: '24 Oct 2023 • 11:05 AM', color: 'amber', icon: 'schedule' },
          { id: 'VC-665129', amount: '$89.99', status: 'Synced / Sinkron', time: '24 Oct 2023 • 09:45 AM', color: 'green', icon: 'check_circle' },
          { id: 'VC-554001', amount: '$22.00', status: 'Synced / Sinkron', time: '23 Oct 2023 • 18:30 PM', color: 'green', icon: 'check_circle', opacity: 'opacity-80' },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-4 bg-white dark:bg-background-dark p-4 rounded-xl border border-primary/5 shadow-sm ${item.opacity || ''}`}>
            <div className={`text-${item.color}-600 dark:text-${item.color}-400 flex items-center justify-center rounded-full bg-${item.color}-50 dark:bg-${item.color}-900/20 shrink-0 size-12`}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex justify-between items-start">
                <p className="text-slate-900 dark:text-slate-100 text-base font-bold">{item.id}</p>
                <p className="text-slate-900 dark:text-slate-100 text-base font-bold">{item.amount}</p>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Status: {item.status}</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorHistory;
