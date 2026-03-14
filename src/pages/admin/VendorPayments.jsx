import React from 'react';

const VendorPayments = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-primary/10 bg-white dark:bg-slate-900 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Vendor Payments</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20" placeholder="Search vendors..." type="text"/>
          </div>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">account_balance</span>
            Bulk Pay
          </button>
          <div className="flex gap-1 border-l border-slate-200 dark:border-slate-700 pl-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Pending Reimbursement</span>
              <div className="size-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">$45,280.00</h3>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">v.s. last month ($40,428)</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed Payments (Month)</span>
              <div className="size-10 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">task_alt</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">128</h3>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+5.2%</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Target reached: 92%</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Vendors to Pay</span>
              <div className="size-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">store</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">14</h3>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">-2%</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Awaiting verification: 2</p>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Pending Reimbursements</h3>
            <div className="flex gap-2">
              <button className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              <button className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">download</span>
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Shop Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Vouchers</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount Due</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Payment</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {[
                  { name: 'John Doe', initial: 'JD', shop: 'JD Electronics', vouchers: 150, amount: '$1,500.00', last: '2023-10-15', status: 'Pending', color: 'amber' },
                  { name: 'Sarah Smith', initial: 'SS', shop: 'Smith Groceries', vouchers: 320, amount: '$3,200.50', last: '2023-10-20', status: 'Processing', color: 'blue' },
                  { name: 'Robert Brown', initial: 'RB', shop: 'Brown Textiles', vouchers: 85, amount: '$850.00', last: '2023-10-12', status: 'Paid', color: 'green' },
                  { name: 'Elena Velez', initial: 'EV', shop: 'Velez Pharmacy', vouchers: 210, amount: '$2,100.00', last: '2023-10-22', status: 'Pending', color: 'amber' },
                  { name: 'Maria Alvez', initial: 'MA', shop: 'Sunrise Market', vouchers: 412, amount: '$4,120.00', last: '2023-10-25', status: 'Pending', color: 'amber' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary text-xs">{row.initial}</div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{row.shop}</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-slate-700 dark:text-slate-300">{row.vouchers}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{row.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 italic">{row.last}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${row.color}-100 text-${row.color}-700`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-bold text-primary hover:underline decoration-2 underline-offset-4">
                        {row.status === 'Paid' ? 'View Invoice' : row.status === 'Processing' ? 'View Invoice' : 'Initiate Payment'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-primary/10 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <span className="text-xs text-slate-500 font-medium">Showing 1-5 of 14 vendors</span>
            <div className="flex gap-1">
              <button className="size-8 flex items-center justify-center rounded border border-primary/10 bg-white dark:bg-slate-900 text-slate-400 hover:text-primary disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="size-8 flex items-center justify-center rounded bg-primary text-white font-bold text-xs">1</button>
              <button className="size-8 flex items-center justify-center rounded border border-primary/10 bg-white dark:bg-slate-900 text-slate-600 hover:text-primary font-bold text-xs">2</button>
              <button className="size-8 flex items-center justify-center rounded border border-primary/10 bg-white dark:bg-slate-900 text-slate-600 hover:text-primary font-bold text-xs">3</button>
              <button className="size-8 flex items-center justify-center rounded border border-primary/10 bg-white dark:bg-slate-900 text-slate-400 hover:text-primary">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Insight Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-primary text-lg">history</span>
              Recent Audit Logs
            </h4>
            <div className="space-y-4">
              {[
                { text: 'Payment completed for Brown Textiles', meta: 'Authorized by Admin • 2 hours ago', icon: 'check_circle', color: 'green' },
                { text: 'Bulk payment initiated for 8 vendors', meta: 'Transaction ID: TXN-82910 • 5 hours ago', icon: 'info', color: 'blue' },
                { text: 'Velez Pharmacy verification required', meta: 'System Alert • 1 day ago', icon: 'warning', color: 'amber' },
              ].map((log, i) => (
                <div key={i} className={`flex items-start gap-3 ${i < 2 ? 'pb-4 border-b border-primary/5' : ''}`}>
                  <span className={`material-symbols-outlined text-sm text-${log.color}-500 mt-1`}>{log.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{log.text}</p>
                    <p className="text-xs text-slate-500">{log.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col justify-center items-center text-center space-y-4">
            <div className="size-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-2xl">security</span>
            </div>
            <h4 className="font-bold text-lg text-primary">Compliance Status</h4>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">All pending reimbursements are cross-verified with voucher issuance records. Financial audit trail is up to date.</p>
            <button className="text-xs font-bold text-primary border-2 border-primary/30 hover:bg-primary/10 px-6 py-2 rounded-lg transition-all">Download Audit Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPayments;
