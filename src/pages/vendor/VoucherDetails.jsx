import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const VoucherDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [voucher, setVoucher] = useState(null);
  const [beneficiary, setBeneficiary] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redeeming, setRedeeming] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchVoucherDetails();
  }, [location]);

  const fetchVoucherDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const { voucherData, voucherCode } = location.state || {};

      if (!voucherData && !voucherCode) {
        setError('No voucher information provided');
        setLoading(false);
        return;
      }

      let query;
      if (voucherData) {
        query = supabase
          .from('vouchers')
          .select(`
            *,
            beneficiaries (*),
            voucher_programs (*)
          `)
          .eq('id', voucherData.voucher_id)
          .maybeSingle();
      } else {
        query = supabase
          .from('vouchers')
          .select(`
            *,
            beneficiaries (*),
            voucher_programs (*)
          `)
          .eq('voucher_code', voucherCode)
          .maybeSingle();
      }

      const { data, error: voucherError } = await query;

      if (voucherError) throw voucherError;

      if (!data) {
        setError('Voucher not found');
        setLoading(false);
        return;
      }

      if (data.status !== 'active') {
        setError(`Voucher is ${data.status}. Only active vouchers can be redeemed.`);
        setLoading(false);
        return;
      }

      const expirationDate = new Date(data.expiration_date);
      if (expirationDate < new Date()) {
        setError('Voucher has expired');
        setLoading(false);
        return;
      }

      if (data.remaining_amount <= 0) {
        setError('Voucher balance is depleted');
        setLoading(false);
        return;
      }

      setVoucher(data);
      setBeneficiary(data.beneficiaries);

      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (vendorError) throw vendorError;
      setVendor(vendorData);

    } catch (err) {
      console.error('Error fetching voucher:', err);
      setError('Failed to load voucher details');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const redeemAmount = parseFloat(amount);
    if (redeemAmount > voucher.remaining_amount) {
      setError(`Amount exceeds remaining balance (SAR ${voucher.remaining_amount.toFixed(2)})`);
      return;
    }

    setRedeeming(true);
    setError('');

    try {
      const newRemainingAmount = voucher.remaining_amount - redeemAmount;
      const newStatus = newRemainingAmount <= 0 ? 'redeemed' : 'active';

      const { error: voucherUpdateError } = await supabase
        .from('vouchers')
        .update({
          remaining_amount: newRemainingAmount,
          status: newStatus
        })
        .eq('id', voucher.id);

      if (voucherUpdateError) throw voucherUpdateError;

      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          voucher_id: voucher.id,
          vendor_id: vendor.id,
          amount: redeemAmount,
          status: 'completed',
          location: vendor.location
        });

      if (transactionError) throw transactionError;

      navigate('/vendor/confirmation', {
        state: {
          success: true,
          amount: redeemAmount,
          voucherCode: voucher.voucher_code,
          beneficiaryName: beneficiary.full_name
        }
      });

    } catch (err) {
      console.error('Error redeeming voucher:', err);
      setError('Failed to process redemption. Please try again.');
    } finally {
      setRedeeming(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !voucher) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Validation Failed</h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-6">{error}</p>
        <button
          onClick={() => navigate('/vendor/redeem')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="flex items-center bg-white dark:bg-slate-900 p-4 pb-2 justify-between border-b border-primary/10 sticky top-0 z-10 -mx-4 -mt-4 shrink-0">
        <div
          onClick={() => navigate(-1)}
          className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight flex-1 text-center pr-12">
          Voucher Details
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto pb-80">
        <div className="flex p-8 flex-col items-center gap-4">
          <div className="size-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20 shadow-lg">
            <span className="text-4xl font-bold text-primary">
              {getInitials(beneficiary?.full_name)}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight text-center">
              {beneficiary?.full_name}
            </p>
            <p className="text-primary/70 text-base font-medium leading-normal text-center">
              Beneficiary ID: {beneficiary?.beneficiary_id}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 mx-4 p-8 rounded-xl shadow-sm border border-primary/10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-emerald-600 text-3xl">verified_user</span>
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">Validated</span>
          </div>
          <h1 className="text-primary tracking-tight text-5xl font-bold leading-tight text-center">
            SAR {voucher?.remaining_amount?.toFixed(2)}
          </h1>
          <h2 className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-tight text-center mt-1">
            Available Balance
          </h2>
        </div>

        <div className="mt-6 px-4">
          <div className="bg-primary/5 rounded-lg p-4 flex flex-col items-center gap-1 border border-primary/10">
            <h4 className="text-primary text-sm font-bold leading-normal uppercase">Program Information</h4>
            <p className="text-slate-900 dark:text-slate-100 text-lg font-bold">
              {voucher?.voucher_programs?.name}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Code: {voucher?.voucher_code}</p>
          </div>
        </div>

        <div className="px-4 mt-6">
          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Valid Until</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              {formatDate(voucher?.expiration_date)}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Original Amount</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              SAR {voucher?.amount?.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Status</span>
            <span className="text-emerald-600 font-semibold capitalize">{voucher?.status}</span>
          </div>
        </div>

        <div className="px-4 mt-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Redemption Amount (SAR)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            max={voucher?.remaining_amount}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:border-primary focus:ring-0 transition-colors text-lg font-bold"
            placeholder="0.00"
          />
          <p className="text-xs text-slate-500 mt-2">
            Maximum: SAR {voucher?.remaining_amount?.toFixed(2)}
          </p>
        </div>

        {error && (
          <div className="mx-4 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-primary/10 flex flex-col gap-3 max-w-md mx-auto">
        <button
          onClick={handleRedeem}
          disabled={redeeming || !amount}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold py-5 rounded-xl text-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed"
        >
          {redeeming ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">check_circle</span>
              <span>Confirm Redemption</span>
            </>
          )}
        </button>
        <button
          onClick={() => navigate(-1)}
          disabled={redeeming}
          className="w-full bg-primary/10 hover:bg-primary/20 disabled:bg-slate-200 text-primary font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined">cancel</span>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default VoucherDetails;
