import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const VendorLayout = () => {
  const location = useLocation();

  if (location.pathname === '/vendor/login') {
    return <Outlet />;
  }

  const navItems = [
    { name: 'Home', icon: 'home', path: '/vendor' },
    { name: 'Redeem', icon: 'qr_code_scanner', path: '/vendor/redeem' },
    { name: 'History', icon: 'history', path: '/vendor/history' },
    { name: 'Sync', icon: 'sync', path: '/vendor/sync' },
    { name: 'Settings', icon: 'settings', path: '/vendor/settings' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-background-dark border-t border-primary/10 pb-6 pt-2">
        <div className="flex justify-around items-end">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                location.pathname === item.path ? 'text-primary' : 'text-slate-400 hover:text-primary transition-colors'
              }`}
            >
              <span className={`material-symbols-outlined ${location.pathname === item.path ? 'fill-1' : ''}`}>{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default VendorLayout;
