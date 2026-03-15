import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AnalyticsChart from '../../components/AnalyticsChart';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBeneficiaries: 0,
    activeVendors: 0,
    vouchersIssued: 0,
    vouchersRedeemed: 0,
    redemptionRate: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    programDistribution: [],
    monthlyTransactions: [],
    statusDistribution: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [beneficiariesResult, vendorsResult, vouchersResult, transactionsResult] = await Promise.all([
        supabase.from('beneficiaries').select('id', { count: 'exact', head: true }),
        supabase.from('vendors').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('vouchers').select('id, status', { count: 'exact' }),
        supabase.from('transactions')
          .select(`
            id,
            amount,
            status,
            created_at,
            beneficiary_id,
            vendor_id,
            beneficiaries (
              profiles (
                full_name
              ),
              national_id
            ),
            vendors (
              business_name
            ),
            vouchers (
              code
            )
          `)
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      const vouchersIssued = vouchersResult.count || 0;
      const vouchersRedeemed = vouchersResult.data?.filter(v => v.status === 'used').length || 0;
      const redemptionRate = vouchersIssued > 0 ? ((vouchersRedeemed / vouchersIssued) * 100).toFixed(1) : 0;

      setStats({
        totalBeneficiaries: beneficiariesResult.count || 0,
        activeVendors: vendorsResult.count || 0,
        vouchersIssued,
        vouchersRedeemed,
        redemptionRate,
      });

      setRecentTransactions(transactionsResult.data || []);

      const { data: programData } = await supabase
        .from('voucher_programs')
        .select('name, vouchers(count)');

      const programDistribution = (programData || []).map(p => ({
        label: p.name,
        value: p.vouchers?.[0]?.count || 0
      }));

      const { data: vouchersByStatus } = await supabase
        .from('vouchers')
        .select('status');

      const statusCounts = (vouchersByStatus || []).reduce((acc, v) => {
        acc[v.status] = (acc[v.status] || 0) + 1;
        return acc;
      }, {});

      const statusDistribution = Object.entries(statusCounts).map(([key, value]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value
      }));

      setChartData({
        programDistribution,
        statusDistribution,
        monthlyTransactions: []
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-primary/10 shadow-sm z-10 shrink-0">
        <div className="flex items-center max-w-md w-full">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
              placeholder="Search beneficiaries, IDs, or vendors..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">help</span>
          </button>
        </div>
      </header>
      <div className="p-8 space-y-8 flex-1 overflow-y-auto">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Program Overview</h2>
            <p className="text-sm text-slate-500">Summary of ongoing humanitarian aid operations.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              <span>Last 30 Days</span>
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
              Generate Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Beneficiaries', value: stats.totalBeneficiaries.toLocaleString(), width: '85%' },
            { label: 'Active Vendors', value: stats.activeVendors.toLocaleString(), width: '65%' },
            { label: 'Vouchers Issued', value: stats.vouchersIssued.toLocaleString(), width: '92%' },
            { label: 'Vouchers Redeemed', value: stats.vouchersRedeemed.toLocaleString(), width: '76%' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-primary/10 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: stat.width }}></div>
              </div>
            </div>
          ))}
          <div className="bg-primary p-5 rounded-xl shadow-lg shadow-primary/20 text-white">
            <p className="text-xs font-semibold text-primary/30 uppercase tracking-wider mb-2 brightness-200">Redemption Rate</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{stats.redemptionRate}%</h3>
            </div>
            <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="bg-white h-full" style={{ width: `${stats.redemptionRate}%` }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Voucher Usage Over Time</h3>
                <p className="text-xs text-slate-500">Daily redemption volume across all regions</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><span className="size-2 rounded-full bg-primary"></span> REDEMPTIONS</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><span className="size-2 rounded-full bg-primary/30"></span> ISSUANCE</span>
              </div>
            </div>
            <div className="h-[240px] w-full relative">
              <svg className="w-full h-full" viewBox="0 0 800 240">
                <defs>
                  <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#43007a" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#43007a" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 200 Q 100 150, 200 180 T 400 100 T 600 140 T 800 60 L 800 240 L 0 240 Z" fill="url(#gradient)"></path>
                <path d="M0 200 Q 100 150, 200 180 T 400 100 T 600 140 T 800 60" fill="none" stroke="#43007a" strokeWidth="3"></path>
                <circle cx="200" cy="180" fill="#43007a" r="4" stroke="white" strokeWidth="2"></circle>
                <circle cx="400" cy="100" fill="#43007a" r="4" stroke="white" strokeWidth="2"></circle>
                <circle cx="800" cy="60" fill="#43007a" r="4" stroke="white" strokeWidth="2"></circle>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-bold">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 dark:text-white">Redemption by Region</h3>
              <p className="text-xs text-slate-500">Distribution of aid utilization</p>
            </div>
            <div className="space-y-6">
              {[
                { region: 'Khartoum', value: '48%' },
                { region: 'Darfur', value: '32%', opacity: '60%' },
                { region: 'Kassala', value: '20%', opacity: '30%' },
              ].map((r, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{r.region}</span>
                    <span>{r.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: r.value, opacity: r.opacity || '100%' }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">map</span>
              <div className="text-xs">
                <p className="font-bold text-primary">Kassala Region Spike</p>
                <p className="text-slate-500">Redemptions up 15% this week in the eastern sector.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-primary/10 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <a className="text-xs font-bold text-primary hover:underline" href="#">View All Transactions</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Beneficiary</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Voucher ID</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {transaction.beneficiaries?.profiles?.full_name?.charAt(0) || 'B'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{transaction.beneficiaries?.profiles?.full_name || 'Unknown'}</p>
                          <p className="text-[10px] text-slate-500">ID: {transaction.beneficiaries?.national_id || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{transaction.vouchers?.code || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">{transaction.vendors?.business_name || 'Unknown Vendor'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        transaction.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        transaction.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right">SAR {transaction.amount?.toFixed(2) || '0.00'}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
