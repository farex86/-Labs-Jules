import React from 'react';

const TransactionHistory = () => {
  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-primary/10 -mx-4 -mt-6 mb-6 px-4 py-4 flex items-center justify-between shrink-0">
        <button onClick={() => window.history.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-primary">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">Transaction History</h1>
          <span className="text-sm font-medium text-primary/70">سجل العمليات</span>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Summary Card */}
      <div className="relative overflow-hidden rounded-xl bg-primary p-6 text-white shadow-lg">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-primary-100/80 text-sm font-medium mb-1">Total Spent | إجمالي المصروفات</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">$50.00</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center opacity-80 border-t border-white/20 pt-4">
          <span className="text-xs uppercase tracking-wider font-semibold">October 2024</span>
          <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-2 min-w-max">
          <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-white px-5 shadow-sm">
            <span className="text-sm font-semibold">This Month | هذا الشهر</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-primary/10 text-slate-700 dark:text-slate-200 px-5">
            <span className="text-sm font-medium">Last Month | الشهر الماضي</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-primary/10 text-slate-700 dark:text-slate-200 px-5">
            <span className="text-sm font-medium">All Time | كل الأوقات</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest px-1">Recent Activities | العمليات الأخيرة</h3>
        <div className="space-y-3">
          {[
            { store: 'Al-Falah General Store', date: 'Oct 24, 2024 • 14:30', amount: '$25.00', icon: 'storefront' },
            { store: 'Noor Market', date: 'Oct 20, 2024 • 09:15', amount: '$15.00', icon: 'shopping_cart' },
            { store: 'Central Pharmacy', date: 'Oct 18, 2024 • 11:45', amount: '$10.00', icon: 'local_pharmacy' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-primary/5 flex items-center gap-4 transition-transform active:scale-[0.98]">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.store}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.date}</p>
              </div>
              <div className="text-right flex flex-col items-end shrink-0">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.amount}</span>
                <div className="flex items-center gap-1 mt-0.5 text-emerald-600 dark:text-emerald-400">
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Redeemed | تم الصرف</span>
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
