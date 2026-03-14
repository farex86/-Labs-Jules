import React from 'react';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Top Header Section */}
      <header className="bg-white dark:bg-background-dark/50 border-b border-primary/10 -mx-4 -mt-4 px-4 pt-6 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbF51GA8_FsdbDA_3XJ1Dmb16jHblIQZQMrmPrUQNs5yoRiS_KwyUiEEylIXN_osCbsFwgD0l-o1ZGAbqyZpT94yvij0ZaO89DsmQxRv7AnIiEfQmgLjPeLDHb9Ey0xj4Nm1eyJ_xUMrfTyGDBs4IfQPPJ18KbffNbomW6GMwpibZXFm65z5GIfasaG9xQemdj4sQtGpv6jVUrH8Lk-qrQ0tibNmwMvX2mRStuFbB1Aed0NYj5ItUkwM2N7T3fEewjkqcqo-BpHYY')" }}
              ></div>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-100">Artisan Coffee House</h1>
              <p className="text-sm text-primary font-medium">Ahmed Al-Farsi</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-primary/5 text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined">language</span>
            </button>
            <button className="p-2 rounded-full hover:bg-primary/5 text-slate-600 dark:text-slate-400 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 -mx-4 space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Dashboard Overview</span>
          <div className="h-px flex-1 bg-primary/10"></div>
        </div>

        {/* Summary Cards */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl shadow-sm border border-primary/5 flex flex-col gap-2">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">confirmation_number</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Redeemed Today</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">42</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl shadow-sm border border-primary/5 flex flex-col gap-2">
          <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Value</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100"><span className="text-sm font-normal text-slate-400 mr-1">SAR</span>2,840</p>
          </div>
        </div>
      </section>

      {/* Primary Action Buttons */}
      <section className="space-y-3">
        <Link to="/vendor/redeem" className="w-full bg-primary text-white py-5 px-6 rounded-xl flex items-center justify-between shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
            <div className="text-left">
              <span className="block text-lg font-bold">Redeem Voucher</span>
              <span className="text-xs text-white/70">Scan or enter code manually</span>
            </div>
          </div>
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
        <Link to="/vendor/history" className="w-full bg-white dark:bg-slate-800 border border-primary/20 text-slate-900 dark:text-slate-100 py-4 px-6 rounded-xl flex items-center justify-between hover:bg-primary/5 transition-colors">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">receipt_long</span>
            <span className="text-base font-semibold">View Transactions</span>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </Link>
        <Link to="/vendor/sync" className="w-full bg-white dark:bg-slate-800 border border-primary/20 text-slate-900 dark:text-slate-100 py-4 px-6 rounded-xl flex items-center justify-between hover:bg-primary/5 transition-colors">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">sync</span>
            <span className="text-base font-semibold">Sync Offline Data</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">3 Pending</span>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </div>
        </Link>
      </section>

      {/* Status Indicator */}
      <section className="flex justify-center pt-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-900/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-bold uppercase tracking-widest">System Online</span>
        </div>
      </section>

        {/* Language Toggle (Floating Style for Quick Access) */}
        <div className="flex justify-end pt-8">
          <button className="bg-white dark:bg-slate-800 shadow-lg border border-primary/10 rounded-full px-4 py-2 text-xs font-bold text-primary flex items-center gap-2">
            <span>العربية</span>
            <span className="material-symbols-outlined text-sm">translate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
