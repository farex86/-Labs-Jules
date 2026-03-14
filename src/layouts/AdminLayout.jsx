import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/admin' },
    { name: 'Beneficiaries', icon: 'group', path: '/admin/beneficiaries' },
    { name: 'Vendors', icon: 'store', path: '/admin/vendors' },
    { name: 'Voucher Programs', icon: 'confirmation_number', path: '/admin/programs' },
    { name: 'Transactions', icon: 'receipt_long', path: '/admin/transactions' },
    { name: 'Payments', icon: 'account_balance_wallet', path: '/admin/payments' },
    { name: 'Reports', icon: 'bar_chart', path: '/admin/reports' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-slate-900 border-r border-primary/10 shadow-sm">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-primary flex items-center justify-center rounded-lg text-white">
            <span className="material-symbols-outlined">diversity_3</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-primary leading-tight uppercase tracking-wider">Human Aid</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">NGO Manager</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/admin/settings"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === '/admin/settings'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-slate-300 dark:bg-slate-700 bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBstDxKmWois4CBzTR0LvpjKDs5ponTNabtqEsy04gevZ9Cjoxmd6Pe3skNiziiws1DkcRwxp8mjribZ-qhY5ID52uIdeeeNT7QxlIsF7BhqbLxpD19RMy7V-sGA-aUZHK_reuoZYHWPrZe6SvEmKJ3Jqn1OtjNHlrELilgRLWiA7GkYkKC84k2M3Jtz3im_bUuloBldm1igehm4irApPsLdcT9m3vYP4NbsBVJyCI_2NECIYzMmi0BDNjfRnBucXf4XoAQ3Rk5ywI')" }}
            ></div>
            <div className="flex flex-col">
              <p className="text-xs font-bold truncate">Sarah Johnson</p>
              <p className="text-[10px] text-slate-500">Regional Director</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
