import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const BeneficiaryHome = () => {
  const { user } = useAuth();
  const [beneficiary, setBeneficiary] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    fetchBeneficiaryData();
  }, [user]);

  const fetchBeneficiaryData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: beneficiaryData, error: beneficiaryError } = await supabase
        .from('beneficiaries')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (beneficiaryError) throw beneficiaryError;

      if (beneficiaryData) {
        setBeneficiary(beneficiaryData);
        await fetchVouchers(beneficiaryData.id);
      }
    } catch (error) {
      console.error('Error fetching beneficiary data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVouchers = async (beneficiaryId) => {
    try {
      const { data, error } = await supabase
        .from('vouchers')
        .select(`
          *,
          voucher_programs (
            name,
            description,
            program_type
          )
        `)
        .eq('beneficiary_id', beneficiaryId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVouchers(data || []);

      const total = (data || []).reduce((sum, voucher) => sum + (voucher.remaining_amount || 0), 0);
      setTotalBalance(total);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setVouchers([]);
    }
  };

  const getFirstName = (fullName) => {
    if (!fullName) return 'User';
    return fullName.split(' ')[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgramIcon = (programType) => {
    switch (programType) {
      case 'food':
        return 'restaurant';
      case 'medical':
        return 'medical_services';
      case 'education':
        return 'school';
      case 'shelter':
        return 'home';
      default:
        return 'card_giftcard';
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
    <div className="space-y-6">
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
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-primary/10 flex items-center justify-center text-primary font-bold">
              {getFirstName(beneficiary?.full_name).substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 -mx-4 space-y-6">
        <section className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/10">
          <div>
            <h2 className="text-2xl font-bold">Welcome, {getFirstName(beneficiary?.full_name)}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Beneficiary ID: {beneficiary?.beneficiary_id}</p>
          </div>
          <div className="text-primary/40">
            <span className="material-symbols-outlined text-4xl">waving_hand</span>
          </div>
        </section>

        <section className="bg-primary text-white p-6 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 text-white/10">
            <span className="material-symbols-outlined text-9xl">account_balance_wallet</span>
          </div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium uppercase tracking-wide">Available Balance</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black">SAR {totalBalance.toFixed(2)}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-sm">
              <span>{vouchers.length} Active {vouchers.length === 1 ? 'Voucher' : 'Vouchers'}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Active</span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <Link
            to="/beneficiary/vouchers"
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-primary shadow-sm active:scale-95 transition-transform"
          >
            <div className="bg-primary text-white p-3 rounded-full">
              <span className="material-symbols-outlined text-3xl">qr_code_2</span>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-900 dark:text-white">QR Code</p>
              <p className="text-xs text-primary font-bold">Show Voucher</p>
            </div>
          </Link>
          <Link
            to="/beneficiary/history"
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 shadow-sm active:scale-95 transition-transform"
          >
            <div className="bg-primary/10 text-primary p-3 rounded-full">
              <span className="material-symbols-outlined text-3xl">history</span>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-900 dark:text-white">History</p>
              <p className="text-xs text-slate-500 font-bold">Transactions</p>
            </div>
          </Link>
        </section>

        {vouchers.length === 0 ? (
          <section className="bg-slate-50 dark:bg-slate-800 border border-primary/10 p-8 rounded-xl text-center">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">inbox</span>
            <p className="text-slate-600 dark:text-slate-400 font-medium">No active vouchers</p>
            <p className="text-xs text-slate-500 mt-1">Vouchers will appear here when issued</p>
          </section>
        ) : (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Active Programs</h3>
            </div>
            <div className="space-y-3">
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg shrink-0">
                      <span className="material-symbols-outlined">
                        {getProgramIcon(voucher.voucher_programs?.program_type)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="font-bold truncate">{voucher.voucher_programs?.name || 'Program'}</p>
                          <p className="text-xs text-slate-500 truncate">Code: {voucher.voucher_code}</p>
                        </div>
                        <span className="text-primary font-black shrink-0">SAR {voucher.remaining_amount?.toFixed(2)}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">event</span>
                          Exp: {formatDate(voucher.expiration_date)}
                        </span>
                        <span className={`flex items-center gap-1 ${
                          voucher.status === 'active'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-400'
                        }`}>
                          <span className="material-symbols-outlined text-sm">
                            {voucher.status === 'active' ? 'check_circle' : 'cancel'}
                          </span>
                          {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryHome;
