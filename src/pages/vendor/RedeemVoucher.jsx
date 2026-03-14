import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedeemVoucher = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="bg-white dark:bg-slate-900 border-b border-primary/10 -mx-4 -mt-4 mb-6 px-4 py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-lg font-bold leading-none text-slate-900 dark:text-white">Redeem Voucher</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Vendor POS</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full border border-primary/20 text-xs font-semibold text-primary">EN</button>
          <button className="px-3 py-1 rounded-full text-xs font-semibold text-slate-400">AR</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 -mx-4">
        <section className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Validate Customer Voucher</h2>
        <p className="text-slate-600 dark:text-slate-400">Scan a QR code or enter the voucher code manually to verify and redeem.</p>
      </section>

      <section className="space-y-6">
        <button
          onClick={() => navigate('/vendor/details')}
          className="w-full bg-primary text-white rounded-xl py-6 flex flex-col items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          <div className="bg-white/20 p-4 rounded-full">
            <span className="material-symbols-outlined !text-4xl">qr_code_scanner</span>
          </div>
          <span className="text-lg font-bold">Scan QR Code</span>
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-sm font-medium">OR ENTER MANUALLY</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1" htmlFor="voucher-code">Voucher Code</label>
            <input className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:border-primary focus:ring-0 transition-colors uppercase font-mono text-lg tracking-widest placeholder:normal-case placeholder:font-sans placeholder:tracking-normal" id="voucher-code" placeholder="e.g. VCH-1234-5678" type="text"/>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="h-14 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => navigate('/vendor/details')}
              className="h-14 rounded-xl font-bold bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors"
            >
              Validate Voucher
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary mt-0.5">info</span>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-primary">Need help?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Ensure the voucher is valid for today's date and the customer has an active membership.</p>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
};

export default RedeemVoucher;
