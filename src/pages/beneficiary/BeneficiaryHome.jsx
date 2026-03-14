import React from 'react';
import { Link } from 'react-router-dom';

const BeneficiaryHome = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="bg-white dark:bg-primary/10 border-b border-primary/10 sticky top-0 z-50 -mx-4 mb-6">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white p-2 rounded-lg">
              <span className="material-symbols-outlined block">volunteer_activism</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-primary">Humanitarian Aid</h1>
              <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70">NGO Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-primary/10">
              <img
                className="w-full h-full object-cover"
                alt="Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBciyJv3XpoLW0DLLUaXxR0Jib0XNKLntbcJnk12TMRCrn50ljGRaPCZyy3G4c22iDXL2gkxLc7GhHFuWO3eN8KfsbWL2r9i6FN57yiOl1HEoat9AGYUUt-OefhoyYftHAkBZKt3Tl3tjSU7NCrToWkJEZbZIX25eUlpa3uDm9i4A8N-WFtPXrPoqXycukeYPKEo6jQFVmPkkPOlJdTf3P3NFtVQIy44hkVQA7MF6uKzyfnDrk2jOvyFieVh_Rdto2pS9oNAQqkn3Y"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 -mx-4 space-y-6">
        {/* Welcome Section */}
        <section className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/10">
        <div>
          <h2 className="text-2xl font-bold">Welcome, Fatima</h2>
          <p className="text-primary font-medium">مرحباً، فاطمة إبراهيم</p>
        </div>
        <div className="text-primary/40">
          <span className="material-symbols-outlined text-4xl">waving_hand</span>
        </div>
      </section>

      {/* Balance Card */}
      <section className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 text-white/10">
          <span className="material-symbols-outlined text-9xl">account_balance_wallet</span>
        </div>
        <div className="relative z-10">
          <p className="text-white/80 text-sm font-medium uppercase tracking-wide">Available Balance / الرصيد المتبقي</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-black">$125.00</span>
            <span className="text-xl font-medium opacity-80">Remaining</span>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-sm">
            <span>Next top-up: Dec 1, 2023</span>
            <span className="bg-white/20 px-2 py-1 rounded">Active</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4">
        <Link to="/beneficiary/vouchers" className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-primary shadow-sm active:scale-95 transition-transform">
          <div className="bg-primary text-white p-3 rounded-full">
            <span className="material-symbols-outlined text-3xl">qr_code_2</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-900 dark:text-white">QR Code</p>
            <p className="text-xs text-primary font-bold">رمز الاستجابة</p>
          </div>
        </Link>
        <Link to="/beneficiary/history" className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 shadow-sm active:scale-95 transition-transform">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <span className="material-symbols-outlined text-3xl">history</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-900 dark:text-white">History</p>
            <p className="text-xs text-slate-500 font-bold">سجل العمليات</p>
          </div>
        </Link>
      </section>

      {/* Alerts */}
      <section className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-3 items-start">
        <span className="material-symbols-outlined text-amber-600">info</span>
        <div>
          <p className="text-sm font-bold text-amber-900 dark:text-amber-100">December Voucher Issued</p>
          <p className="text-xs text-amber-800 dark:text-amber-200">تم إصدار قسيمة جديدة لشهر ديسمبر. يرجى مراجعة رصيدك.</p>
        </div>
      </section>

      {/* Active Programs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Active Programs / البرامج النشطة</h3>
          <button className="text-primary text-sm font-bold">See All</button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Sudan Emergency Food Aid', ar: 'مساعدات غذائية طارئة', value: '$75.00', icon: 'flatware', exp: '31 Dec 2023' },
            { title: 'WASH Hygiene Kit Voucher', ar: 'قسيمة مستلزمات النظافة', value: '$50.00', icon: 'medical_services', exp: '15 Jan 2024' },
          ].map((prog, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/10 shadow-sm flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <span className="material-symbols-outlined">{prog.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{prog.title}</p>
                    <p className="text-xs text-slate-500">{prog.ar}</p>
                  </div>
                  <span className="text-primary font-black">{prog.value}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">event</span> Exp: {prog.exp}</span>
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
      </div>
    </div>
  );
};

export default BeneficiaryHome;
