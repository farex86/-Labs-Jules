import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const VendorPayments = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalPending: 0,
    completedPayments: 0,
    activeVendors: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchVendorPayments(),
        fetchStats()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorPayments = async () => {
    try {
      const { data: vendorData, error } = await supabase
        .from('vendors')
        .select(`
          *,
          transactions (
            id,
            amount,
            status,
            created_at
          )
        `)
        .order('business_name');

      if (error) throw error;

      const vendorsWithTotals = (vendorData || []).map(vendor => {
        const pendingTransactions = vendor.transactions?.filter(t => t.status === 'completed') || [];
        const totalDue = pendingTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
        const voucherCount = pendingTransactions.length;

        const sortedTransactions = vendor.transactions?.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        ) || [];
        const lastPayment = sortedTransactions[0]?.created_at || null;

        return {
          ...vendor,
          totalDue,
          voucherCount,
          lastPayment,
          hasPending: totalDue > 0
        };
      });

      setVendors(vendorsWithTotals);
    } catch (error) {
      console.error('Error fetching vendor payments:', error);
      setVendors([]);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('amount, status, created_at');

      if (error) throw error;

      const totalPending = transactions
        ?.filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const completedPayments = transactions
        ?.filter(t => t.status === 'completed' && new Date(t.created_at) >= firstDayOfMonth)
        .length || 0;

      const { data: activeVendors, error: vendorError } = await supabase
        .from('vendors')
        .select('id', { count: 'exact' })
        .eq('status', 'active');

      if (vendorError) throw vendorError;

      setStats({
        totalPending,
        completedPayments,
        activeVendors: activeVendors?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Vendor Name', 'Business Name', 'Vouchers', 'Amount Due', 'Last Payment', 'Status'];
    const csvData = filteredVendors.map(v => [
      v.contact_name || 'N/A',
      v.business_name || 'N/A',
      v.voucherCount,
      `SAR ${v.totalDue.toFixed(2)}`,
      v.lastPayment ? new Date(v.lastPayment).toLocaleDateString() : 'Never',
      v.hasPending ? 'Pending' : 'Paid'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vendor_payments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const filteredVendors = vendors.filter(v =>
    v.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.contact_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-20 border-b border-primary/10 bg-white dark:bg-slate-900 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Vendor Payments</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary"
              placeholder="Search vendors..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Total Pending Reimbursement</span>
              <div className="size-11 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">SAR {stats.totalPending.toFixed(2)}</h3>
            <p className="text-xs text-slate-400 mt-2">Due to vendors for redeemed vouchers</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Completed This Month</span>
              <div className="size-11 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">task_alt</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.completedPayments}</h3>
            <p className="text-xs text-slate-400 mt-2">Redeemed vouchers this period</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">Active Vendors</span>
              <div className="size-11 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">store</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.activeVendors}</h3>
            <p className="text-xs text-slate-400 mt-2">Vendors with pending payments</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Vendor Payment Details</h3>
            <div className="flex gap-2">
              <button
                onClick={handleExportCSV}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Business Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Vouchers</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount Due</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Transaction</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {filteredVendors.length > 0 ? filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                          {getInitials(vendor.contact_name)}
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {vendor.contact_name || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {vendor.business_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-slate-700 dark:text-slate-300">
                      {vendor.voucherCount}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">
                      SAR {vendor.totalDue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {vendor.lastPayment ? new Date(vendor.lastPayment).toLocaleDateString() : 'No transactions'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        vendor.hasPending
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      }`}>
                        {vendor.hasPending ? 'Pending' : 'Paid'}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      No vendors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-primary text-xl">info</span>
              Payment Information
            </h4>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p>Vendors are reimbursed for vouchers they redeem from beneficiaries. The system tracks all redemptions and calculates amounts due automatically.</p>
              <p className="pt-3 border-t border-primary/10 text-xs">
                <strong className="text-slate-900 dark:text-white">Note:</strong> Payment processing is handled through your organization's financial department. This dashboard provides tracking and reporting only.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col justify-center items-center text-center space-y-4">
            <div className="size-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-2xl">security</span>
            </div>
            <h4 className="font-bold text-lg text-primary">Financial Compliance</h4>
            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              All reimbursements are tracked and verified against voucher redemptions. Complete audit trail available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPayments;
