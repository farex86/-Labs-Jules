import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [filter, setFilter] = useState('this_month');

  useEffect(() => {
    fetchTransactions();
  }, [user, filter]);

  const fetchTransactions = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: beneficiaryData, error: beneficiaryError } = await supabase
        .from('beneficiaries')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (beneficiaryError) throw beneficiaryError;

      if (beneficiaryData) {
        let query = supabase
          .from('transactions')
          .select(`
            *,
            vouchers (
              voucher_code,
              voucher_programs (name)
            ),
            vendors (business_name)
          `)
          .eq('vouchers.beneficiary_id', beneficiaryData.id)
          .order('created_at', { ascending: false });

        const now = new Date();
        if (filter === 'this_month') {
          const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
          query = query.gte('created_at', firstDay);
        } else if (filter === 'last_month') {
          const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
          const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
          query = query.gte('created_at', firstDayLastMonth).lt('created_at', firstDayThisMonth);
        }

        const { data, error } = await query;

        if (error) throw error;

        setTransactions(data || []);

        const total = (data || [])
          .filter(t => t.status === 'completed')
          .reduce((sum, t) => sum + (t.amount || 0), 0);
        setTotalSpent(total);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' • ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'pending':
        return 'text-amber-600 dark:text-amber-400';
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'check_circle';
      case 'pending':
        return 'schedule';
      case 'failed':
        return 'cancel';
      default:
        return 'help';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Redeemed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const getCurrentMonth = () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-primary/10 -mx-4 -mt-6 mb-6 px-4 py-4 flex items-center justify-between shrink-0">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-primary"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">Transaction History</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="relative overflow-hidden rounded-xl bg-primary p-6 text-white shadow-lg">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-white/80 text-sm font-medium mb-1">Total Spent</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">SAR {totalSpent.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center opacity-80 border-t border-white/20 pt-4">
          <span className="text-xs uppercase tracking-wider font-semibold">{getCurrentMonth()}</span>
          <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setFilter('this_month')}
            className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 shadow-sm ${
              filter === 'this_month'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-slate-800 border border-primary/10 text-slate-700 dark:text-slate-200'
            }`}
          >
            <span className="text-sm font-semibold">This Month</span>
          </button>
          <button
            onClick={() => setFilter('last_month')}
            className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 shadow-sm ${
              filter === 'last_month'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-slate-800 border border-primary/10 text-slate-700 dark:text-slate-200'
            }`}
          >
            <span className="text-sm font-medium">Last Month</span>
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 shadow-sm ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-slate-800 border border-primary/10 text-slate-700 dark:text-slate-200'
            }`}
          >
            <span className="text-sm font-medium">All Time</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest px-1">
          Recent Activities
        </h3>
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-primary/5 flex items-center gap-4"
              >
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">storefront</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                    {transaction.vendors?.business_name || 'Vendor'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {formatDate(transaction.created_at)}
                  </p>
                  {transaction.vouchers?.voucher_programs?.name && (
                    <p className="text-xs text-primary font-medium mt-1">
                      {transaction.vouchers.voucher_programs.name}
                    </p>
                  )}
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    SAR {transaction.amount?.toFixed(2)}
                  </span>
                  <div className={`flex items-center gap-1 mt-0.5 ${getStatusColor(transaction.status)}`}>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                      {getStatusText(transaction.status)}
                    </span>
                    <span className="material-symbols-outlined text-base">
                      {getStatusIcon(transaction.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800 border border-primary/10 p-8 rounded-xl text-center">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">receipt_long</span>
            <p className="text-slate-600 dark:text-slate-400 font-medium">No transactions yet</p>
            <p className="text-xs text-slate-500 mt-1">Your transaction history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
