import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedemptionConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full max-w-md w-full flex-col bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex items-center bg-white dark:bg-slate-900 p-4 border-b border-primary/10 justify-between shrink-0">
        <button onClick={() => navigate('/vendor')} className="text-primary p-2">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display">Confirmation</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex flex-col items-center pt-10 pb-6 px-6 overflow-y-auto">
        {/* Large Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-5xl fill-1">check_circle</span>
        </div>

        {/* Main Status Message (English & Arabic) */}
        <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight text-center pb-2">
          Voucher Redeemed Successfully
        </h1>
        <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight text-center pb-8" dir="rtl">
          تم استرداد القسيمة بنجاح
        </h2>

        {/* Summary Card */}
        <div className="w-full bg-primary/5 dark:bg-primary/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center gap-x-6">
            <div className="flex flex-col">
              <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider">Voucher Code</p>
              <p className="text-slate-900 dark:text-slate-100 text-sm font-medium">#VCH-99283-X</p>
            </div>
            <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider text-right" dir="rtl">رمز القسيمة</p>
          </div>
          <div className="h-px bg-primary/10 w-full"></div>
          <div className="flex justify-between items-center gap-x-6">
            <div className="flex flex-col">
              <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider">Amount</p>
              <p className="text-primary text-xl font-bold">$500.00</p>
            </div>
            <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider text-right" dir="rtl">المبلغ</p>
          </div>
          <div className="h-px bg-primary/10 w-full"></div>
          <div className="flex justify-between items-center gap-x-6">
            <div className="flex flex-col">
              <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider">Vendor</p>
              <p className="text-slate-900 dark:text-slate-100 text-sm font-medium">Artisan Coffee House</p>
            </div>
            <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider text-right" dir="rtl">البائع</p>
          </div>
          <div className="h-px bg-primary/10 w-full"></div>
          <div className="flex justify-between items-center gap-x-6">
            <div className="flex flex-col">
              <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider">Timestamp</p>
              <p className="text-slate-900 dark:text-slate-100 text-sm font-medium">24 Oct 2024, 14:30</p>
            </div>
            <p className="text-primary/70 dark:text-primary/60 text-xs font-semibold uppercase tracking-wider text-right" dir="rtl">الطابع الزمني</p>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="p-6 mt-auto">
        <button
          onClick={() => navigate('/vendor')}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>Done</span>
          <span className="text-white/60 mx-1">|</span>
          <span dir="rtl">تم</span>
        </button>
        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 text-primary font-semibold text-sm">
            <span className="material-symbols-outlined text-lg">print</span>
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedemptionConfirmation;
