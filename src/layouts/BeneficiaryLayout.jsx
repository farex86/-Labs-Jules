import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const BeneficiaryLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen pb-24 max-w-2xl mx-auto relative shadow-2xl flex flex-col overflow-x-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-primary/10 pb-6 pt-2 z-50 max-w-2xl mx-auto">
        <div className="flex justify-around items-center">
          <Link
            to="/beneficiary"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === '/beneficiary' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary transition-colors'
            }`}
          >
            <span className={`material-symbols-outlined ${location.pathname === '/beneficiary' ? 'fill-1' : ''}`}>home</span>
            <span className="text-[10px] font-bold">Home</span>
          </Link>
          <Link
            to="/beneficiary/vouchers"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === '/beneficiary/vouchers' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary transition-colors'
            }`}
          >
            <span className={`material-symbols-outlined ${location.pathname === '/beneficiary/vouchers' ? 'fill-1' : ''}`}>confirmation_number</span>
            <span className="text-[10px] font-bold">Vouchers</span>
          </Link>
          <Link
            to="/beneficiary/history"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === '/beneficiary/history' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary transition-colors'
            }`}
          >
            <span className={`material-symbols-outlined ${location.pathname === '/beneficiary/history' ? 'fill-1' : ''}`}>history</span>
            <span className="text-[10px] font-bold">History</span>
          </Link>
          <Link
            to="/beneficiary/support"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === '/beneficiary/support' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary transition-colors'
            }`}
          >
            <span className={`material-symbols-outlined ${location.pathname === '/beneficiary/support' ? 'fill-1' : ''}`}>contact_support</span>
            <span className="text-[10px] font-bold">Support</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default BeneficiaryLayout;
