import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

const RedeemVoucher = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let scanner;

    if (showScanner) {
      scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scanner.render(onScanSuccess, onScanError);
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [showScanner]);

  const onScanSuccess = (decodedText) => {
    try {
      const voucherData = JSON.parse(decodedText);
      navigate('/vendor/details', { state: { voucherData } });
    } catch (err) {
      setError('Invalid QR code format');
    }
  };

  const onScanError = (err) => {
    console.log('QR scan error:', err);
  };

  const handleManualValidation = () => {
    if (!manualCode.trim()) {
      setError('Please enter a voucher code');
      return;
    }

    navigate('/vendor/details', {
      state: {
        voucherCode: manualCode.trim().toUpperCase()
      }
    });
  };

  if (showScanner) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <header className="bg-white dark:bg-slate-900 border-b border-primary/10 -mx-4 -mt-4 mb-6 px-4 py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowScanner(false)}
              className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 text-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900 dark:text-white">Scan QR Code</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Position QR code in frame</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 -mx-4">
          <div id="qr-reader" className="w-full"></div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-0.5">info</span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary">Scanning Tips</h3>
                <ul className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed list-disc list-inside space-y-1">
                  <li>Hold the device steady</li>
                  <li>Ensure good lighting</li>
                  <li>Center the QR code in the frame</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="bg-white dark:bg-slate-900 border-b border-primary/10 -mx-4 -mt-4 mb-6 px-4 py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 text-primary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-lg font-bold leading-none text-slate-900 dark:text-white">Redeem Voucher</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Vendor POS</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 -mx-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Validate Customer Voucher</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Scan a QR code or enter the voucher code manually to verify and redeem.
          </p>
        </section>

        <section className="space-y-6">
          <button
            onClick={() => setShowScanner(true)}
            className="w-full bg-primary text-white rounded-xl py-6 flex flex-col items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            <div className="bg-white/20 p-4 rounded-full">
              <span className="material-symbols-outlined !text-4xl">qr_code_scanner</span>
            </div>
            <span className="text-lg font-bold">Scan QR Code</span>
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-sm font-medium">OR ENTER MANUALLY</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1"
                htmlFor="voucher-code"
              >
                Voucher Code
              </label>
              <input
                className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-900 focus:border-primary focus:ring-0 transition-colors uppercase font-mono text-lg tracking-widest placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
                id="voucher-code"
                placeholder="e.g. VCH-1234-5678"
                type="text"
                value={manualCode}
                onChange={(e) => {
                  setManualCode(e.target.value);
                  setError('');
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleManualValidation();
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => navigate(-1)}
                className="h-14 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleManualValidation}
                className="h-14 rounded-xl font-bold bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors"
              >
                Validate Voucher
              </button>
            </div>
          </div>
        </section>

        <section className="mt-12 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary mt-0.5">info</span>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-primary">Need help?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ensure the voucher is valid and active. The customer should present their QR code from the beneficiary app.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RedeemVoucher;
