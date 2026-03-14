import React from 'react';

const VendorManagement = () => {
  return (
    <div className="flex flex-col h-full min-w-0">
      {/* Top Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">store</span>
          <h2 className="text-lg font-bold tracking-tight">Vendor Management</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64" placeholder="Search vendors..." type="text"/>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Approve New Vendor
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="p-8 overflow-y-auto flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Vendor Database</h1>
          <p className="text-slate-500 mt-1">Manage and monitor vendor activity across all regional programs.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <button className="px-4 py-3 text-sm font-bold border-b-2 border-primary text-primary">All Vendors</button>
          <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Pending Approval</button>
          <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Active</button>
          <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Deactivated</button>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Shop Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Performance</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: 'Global Reach Co.', initial: 'G', shop: 'Global Supplies', loc: 'Nairobi, Kenya', status: 'Active', perf: 'High Volume', type: 'active' },
                { name: 'Local Harvest', initial: 'L', shop: 'Green Grocers', loc: 'Lagos, Nigeria', status: 'Pending Approval', perf: 'Medium', type: 'pending' },
                { name: 'EduBuild Ltd.', initial: 'E', shop: 'School Gear', loc: 'Accra, Ghana', status: 'Active', perf: 'High Volume', type: 'active' },
                { name: 'TechAid', initial: 'T', shop: 'Digital Solutions', loc: 'Addis Ababa', status: 'Deactivated', perf: 'Low Volume', type: 'deactivated' },
              ].map((vendor, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">{vendor.initial}</div>
                      <span className="font-medium">{vendor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{vendor.shop}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{vendor.loc}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                        vendor.type === 'active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        vendor.type === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-slate-200 text-slate-600 border-slate-300'
                      }`}>
                        {vendor.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                        vendor.perf === 'High Volume' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                        vendor.perf === 'Medium' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                        'bg-rose-100 text-rose-700 border-rose-200'
                      }`}>
                        {vendor.perf}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">analytics</span>
                      </button>
                      {vendor.type === 'pending' ? (
                        <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all">
                          Approve
                        </button>
                      ) : vendor.type === 'deactivated' ? (
                        <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-all">
                          Reactivate
                        </button>
                      ) : (
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <span className="material-symbols-outlined text-xl">block</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">Showing 1 to 4 of 28 vendors</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-xs font-bold disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-xs font-bold">Next</button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { label: 'Active Vendors', value: '24', icon: 'check_circle', color: 'emerald' },
            { label: 'Pending Review', value: '12', icon: 'pending_actions', color: 'amber' },
            { label: 'High Performers', value: '8', icon: 'trending_up', color: 'indigo' },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">{card.label}</p>
                <h3 className="text-2xl font-black mt-1">{card.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-full bg-${card.color}-100 dark:bg-${card.color}-900/30 flex items-center justify-center text-${card.color}-600`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
