import React from 'react';

const TransactionMonitoring = () => {
  return (
    <div className="flex flex-col h-full min-w-0 overflow-hidden">
      {/* Top Header */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-primary/10 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Transaction Monitoring</h2>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wide flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span className="text-sm font-medium">Export CSV</span>
          </button>
          <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 rounded-lg">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="bg-white dark:bg-slate-900 border-b border-primary/10 p-4 lg:px-8 space-y-4 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-slate-900 dark:text-white" placeholder="Search voucher codes..." type="text"/>
          </div>
          <select className="w-full px-3 py-2 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm appearance-none text-slate-900 dark:text-white">
            <option>All Regions</option>
            <option>East Africa</option>
            <option>West Africa</option>
            <option>South East Asia</option>
          </select>
          <select className="w-full px-3 py-2 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm appearance-none text-slate-900 dark:text-white">
            <option>All Programs</option>
            <option>Emergency Relief 2024</option>
            <option>Education Grant Q3</option>
            <option>Nutrition Support</option>
          </select>
          <select className="w-full px-3 py-2 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm appearance-none text-slate-900 dark:text-white">
            <option>All Vendors</option>
            <option>Metro Foods Co.</option>
            <option>Apex Pharmacy</option>
            <option>Global Supplies Ltd</option>
          </select>
          <div className="relative flex items-center">
            <input className="w-full px-3 py-2 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm text-slate-900 dark:text-white" readOnly type="text" value="Oct 01 - Oct 31, 2024"/>
            <span className="material-symbols-outlined absolute right-3 text-slate-400 text-[20px] pointer-events-none">calendar_today</span>
          </div>
        </div>
      </section>

      {/* Data Table Area */}
      <section className="flex-1 overflow-auto p-4 lg:p-8 bg-background-light dark:bg-background-dark">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-primary/5 dark:bg-slate-800/50 border-b border-primary/10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Voucher Code</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Beneficiary</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {[
                  { code: 'VCH-8821-X9', name: 'John Doe', id: '#88921', vendor: 'Metro Foods Co.', amount: '$45.00', loc: 'Nairobi, KE', time: '2024-10-25 14:22:10', status: 'Redeemed', color: 'green', initial: 'JD' },
                  { code: 'VCH-1102-L2', name: 'Maria West', id: '#99012', vendor: 'Apex Pharmacy', amount: '$120.00', loc: 'Dhaka, BD', time: '2024-10-25 14:18:05', status: 'Processing', color: 'blue', initial: 'MW' },
                  { code: 'VCH-7654-K3', name: 'Ahmed Sulley', id: '#12304', vendor: 'Global Supplies Ltd', amount: '$25.00', loc: 'Lagos, NG', time: '2024-10-25 14:05:44', status: 'Redeemed', color: 'green', initial: 'AS' },
                  { code: 'VCH-0091-M1', name: 'Chen Li', id: '#44567', vendor: 'Metro Foods Co.', amount: '$60.00', loc: 'Jakarta, ID', time: '2024-10-25 13:55:12', status: 'Flagged', color: 'yellow', initial: 'CL' },
                  { code: 'VCH-3342-P8', name: 'Elena Kova', id: '#77832', vendor: 'Apex Pharmacy', amount: '$15.50', loc: 'Kiev, UA', time: '2024-10-25 13:40:00', status: 'Redeemed', color: 'green', initial: 'EK' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm text-primary font-bold tracking-tight">{row.code}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{row.initial}</div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{row.name}</p>
                          <p className="text-xs text-slate-500">ID: {row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{row.vendor}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{row.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{row.loc}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{row.time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${row.color}-100 text-${row.color}-800`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-primary/10 px-8 py-4 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">10</span> of <span className="font-bold text-slate-900 dark:text-white">1,248</span> transactions
        </p>
        <div className="flex items-center gap-2">
          <button className="size-8 flex items-center justify-center rounded border border-primary/10 text-slate-500 hover:bg-primary/5 transition-colors disabled:opacity-50">
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button className="size-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
          <button className="size-8 flex items-center justify-center rounded border border-primary/10 text-slate-600 dark:text-slate-400 hover:bg-primary/5 text-xs font-bold transition-colors">2</button>
          <button className="size-8 flex items-center justify-center rounded border border-primary/10 text-slate-600 dark:text-slate-400 hover:bg-primary/5 text-xs font-bold transition-colors">3</button>
          <span className="px-1 text-slate-400">...</span>
          <button className="size-8 flex items-center justify-center rounded border border-primary/10 text-slate-600 dark:text-slate-400 hover:bg-primary/5 text-xs font-bold transition-colors">125</button>
          <button className="size-8 flex items-center justify-center rounded border border-primary/10 text-slate-500 hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default TransactionMonitoring;
