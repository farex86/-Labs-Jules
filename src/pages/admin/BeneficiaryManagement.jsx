import React from 'react';

const BeneficiaryManagement = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-primary/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Beneficiary Management</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-primary/20 text-primary font-semibold text-sm rounded-lg hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-xl">upload</span>
            Upload CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">add</span>
            Add Beneficiary
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Search by name, ID or phone..." type="text"/>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm font-medium cursor-pointer">
                <option>All Locations</option>
                <option>Nairobi</option>
                <option>Mombasa</option>
                <option>Kisumu</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">keyboard_arrow_down</span>
            </div>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm font-medium cursor-pointer">
                <option>All Programs</option>
                <option>Food Security</option>
                <option>Health Care</option>
                <option>Education Support</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">keyboard_arrow_down</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-background-light dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-xl">filter_list</span>
              More Filters
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-light/50 dark:bg-slate-800/50 border-b border-primary/10">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Phone / ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Location</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Program</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Voucher Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {[
                  { name: 'John Doe', initial: 'JD', phone: '+254 712 345 678', id: 'ID-10029384', loc: 'Nairobi, Embakasi', program: 'Food Security', status: 'Active', color: 'emerald' },
                  { name: 'Jane Smith', initial: 'JS', phone: '+254 723 456 789', id: 'ID-88273611', loc: 'Mombasa, Nyali', program: 'Education Support', status: 'Pending', color: 'amber' },
                  { name: 'Michael Lee', initial: 'ML', phone: '+254 734 567 890', id: 'ID-44556677', loc: 'Nakuru, Lanet', program: 'Water Access', status: 'Redeemed', color: 'slate' },
                  { name: 'Alice Johnson', initial: 'AJ', phone: '+254 745 678 901', id: 'ID-99211233', loc: 'Nairobi, Westlands', program: 'Food Security', status: 'Active', color: 'emerald' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{row.initial}</div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                      {row.phone}<br/>
                      <span className="text-xs font-mono text-slate-400">{row.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{row.loc}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.program === 'Food Security' ? 'bg-primary/10 text-primary' : row.program === 'Education Support' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                        {row.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1.5 text-${row.color}-600 dark:text-${row.color}-400`}>
                        <span className={`size-2 rounded-full bg-${row.color}-500`}></span>
                        <span className="text-xs font-bold">{row.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button className="px-3 py-1 text-xs font-bold text-primary hover:underline">View Details</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 bg-background-light/30 dark:bg-slate-800/30 border-t border-primary/10 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">Showing 1-4 of 1,248 beneficiaries</p>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded border border-primary/10 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50 transition-colors" disabled>
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button className="size-8 rounded bg-primary text-white text-xs font-bold shadow shadow-primary/20">1</button>
              <button className="size-8 rounded hover:bg-white dark:hover:bg-slate-700 text-xs font-bold border border-primary/5">2</button>
              <button className="size-8 rounded hover:bg-white dark:hover:bg-slate-700 text-xs font-bold border border-primary/5">3</button>
              <span className="text-slate-400 mx-1">...</span>
              <button className="size-8 rounded hover:bg-white dark:hover:bg-slate-700 text-xs font-bold border border-primary/5">312</button>
              <button className="p-1 rounded border border-primary/10 hover:bg-white dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Beneficiaries', value: '1,248', icon: 'groups', trend: '+12% this month', color: 'primary' },
            { label: 'Active Vouchers', value: '842', icon: 'confirmation_number', progress: '67%', color: 'emerald' },
            { label: 'Pending Approvals', value: '56', icon: 'hourglass_empty', note: 'Requires admin review', color: 'amber' },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{card.label}</span>
                <span className={`material-symbols-outlined text-${card.color}-500`}>{card.icon}</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
              {card.trend && <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-sm">trending_up</span>{card.trend}</p>}
              {card.progress && <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden"><div className="bg-emerald-500 h-full" style={{ width: card.progress }}></div></div>}
              {card.note && <p className="text-xs text-slate-500 mt-2 italic font-medium">{card.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryManagement;
