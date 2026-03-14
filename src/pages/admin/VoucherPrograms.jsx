import React from 'react';

const VoucherPrograms = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-primary/10 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Voucher Programs</h2>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">Programs</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="pl-10 pr-4 py-1.5 rounded-lg border border-primary/10 bg-primary/5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm w-64 transition-all" placeholder="Search programs..." type="text"/>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
            <span className="material-symbols-outlined text-base">add_circle</span>
            Create New Program
          </button>
          <div className="w-px h-6 bg-primary/10 mx-2"></div>
          <button className="text-slate-500 hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">person</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="flex border-b border-primary/10 gap-8">
          <button className="pb-4 border-b-2 border-primary text-primary text-sm font-bold">All Programs (12)</button>
          <button className="pb-4 border-b-2 border-transparent text-slate-500 text-sm font-medium hover:text-primary transition-colors">Ongoing (5)</button>
          <button className="pb-4 border-b-2 border-transparent text-slate-500 text-sm font-medium hover:text-primary transition-colors">Upcoming (3)</button>
          <button className="pb-4 border-b-2 border-transparent text-slate-500 text-sm font-medium hover:text-primary transition-colors">Completed (4)</button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Ongoing Program Card */}
          <div className="bg-white dark:bg-background-dark/40 rounded-xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div
                className="h-48 md:w-64 md:h-auto bg-cover bg-center shrink-0"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSioRnCsAHPaUKKm0S4ZP5oicxh80QS0zK31f2MwmNi93tH5Bu5htIfT5XmQz5ET8bR50ioape9g4gH_JDgsmmxKis3Y9MbHbEqpclmkqJj2-g9p9oIUoNZ2XK5bSGMqG4lZxb3Oc58wHrcUj8hsKBaoTwjwC3dt4cNYOx0O-WwNGAGR42mW-8hY6sQucOOEK9zCNNIXiuDoE0ICGE5BMEzRT3sYH0JilRkrug5S41xmjQ7hfnWjWVX45pfTemAB4Ir8nriT2K3ok')" }}
              ></div>
              <div className="p-6 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Ongoing</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Sudan Emergency Food Aid 2024</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      Jan 2024 - Dec 2024
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-primary/5 rounded border border-primary/10 text-center">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-tighter leading-none">Voucher Value</p>
                    <p className="text-lg font-black text-primary">$50.00</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Distribution Progress</span>
                      <span className="text-primary">68% Distributed</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500">6,800 vouchers of 10,000 distributed</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Budget Spent</span>
                      <span className="text-primary">$340,000 / $500,000</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500">Includes administrative and logistics fees</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full border-2 border-white dark:border-background-dark bg-slate-200 flex items-center justify-center text-[10px] font-bold">JD</div>
                    <div className="h-8 w-8 rounded-full border-2 border-white dark:border-background-dark bg-slate-300 flex items-center justify-center text-[10px] font-bold">MS</div>
                    <div className="h-8 w-8 rounded-full border-2 border-white dark:border-background-dark bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">+3</div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-1.5 rounded-lg border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">Manage Program</button>
                    <button className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold shadow shadow-primary/20 hover:bg-primary/90">View Reports</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Program Card */}
          <div className="bg-white dark:bg-background-dark/40 rounded-xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div
                className="h-48 md:w-64 md:h-auto bg-cover bg-center shrink-0 opacity-80"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDObbkFZnLhxr_wHrqOrWL60khmB_NjyxUpXw91eX-uATQHo12HBp5uO0oL1-zRee5Gf2gxTrpZzSlZOcEOJE_M81KiXG5ngtwHz5dkiG859b9JPFiS-aKhz8yhK_CblOOV9vqQuX1zXKeuJ2o7kt9JzQNkn4HlZNbkxjFcgc3t1bu0lds1Uo_GPhlaaYxwdCDvybw4nE_68ZmwXf27ZgWheuosWTKovKa4JY3qGmpM4HBOL8zEGP5gGPj8-Npc-PGDozWRVA2uVJk')" }}
              ></div>
              <div className="p-6 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Upcoming</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Yemen Hygiene Kit Distribution</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      Starts May 2024
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-primary/5 rounded border border-primary/10 text-center">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-tighter leading-none">Voucher Value</p>
                    <p className="text-lg font-black text-primary">$35.00</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Prep Progress</span>
                      <span className="text-amber-600">85% Ready</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500">Vendor contracts finalized</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Allocated Budget</span>
                      <span className="text-primary">$250,000 Total</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/10 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-xs text-slate-500">Funding secured from Global Fund</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-400 italic">Pre-distribution verification phase...</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-1.5 rounded-lg border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">Setup Details</button>
                    <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold">Approve Release</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherPrograms;
