import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const VoucherQR = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVouchers();
  }, [user]);

  const fetchVouchers = async () => {
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
          .eq('beneficiary_id', beneficiaryData.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setVouchers(data || []);
        if (data && data.length > 0) {
          setSelectedVoucher(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generateQRData = (voucher) => {
    return JSON.stringify({
      voucher_id: voucher.id,
      voucher_code: voucher.voucher_code,
      beneficiary_id: voucher.beneficiary_id,
      program_id: voucher.program_id,
      remaining_amount: voucher.remaining_amount,
      timestamp: new Date().toISOString()
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!selectedVoucher || vouchers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">qr_code_2</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Active Vouchers</h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
          You don't have any active vouchers to display
        </p>
        <button
          onClick={() => navigate('/beneficiary')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4 grow -mt-6">
      <header className="flex items-center bg-white dark:bg-primary/10 p-4 pb-2 justify-between border-b border-primary/10 w-full mb-6 -mx-4 sticky top-0 z-10">
        <div
          onClick={() => navigate(-1)}
          className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Voucher QR Code
        </h2>
        <div className="size-12 shrink-0"></div>
      </header>

      {vouchers.length > 1 && (
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Select Voucher
          </label>
          <select
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
            value={selectedVoucher.id}
            onChange={(e) => {
              const voucher = vouchers.find(v => v.id === e.target.value);
              setSelectedVoucher(voucher);
            }}
          >
            {vouchers.map((voucher) => (
              <option key={voucher.id} value={voucher.id}>
                {voucher.voucher_programs?.name} - SAR {voucher.remaining_amount?.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}

      <h3 className="text-primary tracking-tight text-xl font-bold leading-tight text-center pb-2 uppercase">
        {selectedVoucher.voucher_programs?.name || 'Voucher Program'}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm text-center pb-6">
        Code: {selectedVoucher.voucher_code}
      </p>

      <div className="w-full bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg flex flex-col items-center border-2 border-primary/20">
        <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden rounded-lg p-4">
          <QRCodeSVG
            value={generateQRData(selectedVoucher)}
            size={256}
            level="H"
            includeMargin={true}
            className="w-full h-full"
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
            Scan to redeem at vendor
          </p>
        </div>
      </div>

      <div className="w-full mt-6 bg-primary text-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight mb-1">
          SAR {selectedVoucher.remaining_amount?.toFixed(2)}
        </h1>
        <p className="text-white/80 text-sm mb-4">Remaining Balance</p>
        <div className="h-px bg-white/20 w-full my-4"></div>
        <p className="text-white/90 text-sm font-medium">
          Expires: {formatDate(selectedVoucher.expiration_date)}
        </p>
        <p className="text-white/80 text-xs mt-2">
          Original Amount: SAR {selectedVoucher.amount?.toFixed(2)}
        </p>
      </div>

      <div className="w-full mt-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-amber-600 text-xl">info</span>
          <div>
            <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Important</p>
            <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
              Show this QR code to the vendor when making a purchase. The vendor will scan it to redeem your voucher.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6 text-slate-500 dark:text-slate-400">
        <span className="material-symbols-outlined text-sm">lock</span>
        <p className="text-xs">Secure Transaction</p>
      </div>

      <button
        onClick={() => navigate('/beneficiary')}
        className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <span>Done</span>
        <span className="material-symbols-outlined">check_circle</span>
      </button>
    </div>
  );
};

export default VoucherQR;
