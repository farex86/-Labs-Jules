import React from 'react';
import { useNavigate } from 'react-router-dom';

const SyncData = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex items-center bg-white dark:bg-slate-900 p-4 border-b border-primary/10 justify-between sticky top-0 z-10 -mx-4 -mt-4 mb-4 shrink-0">
        <button onClick={() => navigate(-1)} className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 px-4">Sync Data</h2>
        <div className="text-primary flex size-10 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined">help_outline</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        {/* Status Card */}
        <div className="flex flex-col gap-4 rounded-xl p-8 bg-white dark:bg-slate-900 shadow-sm border border-primary/5 items-center text-center">
          <div className="size-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-4xl">cloud_off</span>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Current Connection</p>
            <p className="text-red-600 dark:text-red-400 text-3xl font-black leading-tight">OFFLINE</p>
          </div>
          <div className="w-full h-px bg-primary/5 my-2"></div>
          <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed">
            Your device is currently disconnected.<br/>
            <span className="font-medium text-primary">المزامنة متوقفة حالياً لعدم وجود اتصال</span>
          </p>
        </div>

        {/* Pending Transactions Summary */}
        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border-2 border-dashed border-primary/20 flex flex-col items-center">
          <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold leading-tight text-center">3 Pending Transactions</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mt-4 text-center max-w-xs">
            Transactions will sync when internet is available
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 text-center font-medium" dir="rtl">
            ستتم مزامنة المعاملات عند توفر الإنترنت
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined">sync</span>
            <span className="text-lg">Sync Now</span>
          </button>
          <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-4">
            Last successful sync: Today at 08:42 AM
          </p>
        </div>

        {/* Details List (Subtle UI) */}
        <div className="space-y-3">
          <h3 className="text-slate-900 dark:text-slate-100 font-bold px-1">Queue Details</h3>
          {[
            { id: 'INV-98234', time: '12:04 PM', amount: '$42.00' },
            { id: 'INV-98235', time: '12:15 PM', amount: '$128.50' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-lg p-4 flex items-center justify-between border border-primary/5">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-500">receipt_long</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{item.id}</p>
                  <p className="text-xs text-slate-500">{item.time} • {item.amount}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded uppercase tracking-tighter">Pending</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyncData;
