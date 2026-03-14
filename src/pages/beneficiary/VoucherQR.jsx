import React from 'react';
import { useNavigate } from 'react-router-dom';

const VoucherQR = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center py-4 grow -mt-6">
      <header className="flex items-center bg-white dark:bg-primary/10 p-4 pb-2 justify-between border-b border-primary/10 w-full mb-6 -mx-4 sticky top-0 z-10">
        <div onClick={() => navigate(-1)} className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Voucher QR | رمز القسيمة
        </h2>
        <div className="size-12 shrink-0"></div>
      </header>

      {/* Program Name */}
      <h3 className="text-primary tracking-tight text-xl font-bold leading-tight text-center pb-2 uppercase">
        Sudan Emergency Food Aid
      </h3>
      <h3 className="text-primary tracking-tight text-lg font-bold leading-tight text-center pb-6">
        برنامج السودان للإغاثة الغذائية الطارئة
      </h3>

      {/* QR Code Container */}
      <div className="w-full bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg flex flex-col items-center border-2 border-primary/20">
        <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden rounded-lg">
          <img
            className="w-full h-auto"
            alt="QR Code"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_HTUcSS7Z3n8nTN8TcEzfwal8IEvsckzj_cZzwteSSgCoY0jXaLIn7ucUsCXRZ2Wsg5BnfCFZKRdJfi_zGfXla--kxbYixYfQwi0UY6FQ8oAb44PL9xQSGRdYuxlsBMiwEj7nbGHs_kxG3ixzuiwN8dy-q8pPVwdXclXFp9N3rRq5UiDhA5p-rBxkszgbSUAcwubB2hqoJkcW3c9kU1TwxNpXgAwbfZpjqzFgObB4suCa18EyFI0nor1wv5dVX-Ko206_BuuBiXI"
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
            Scan to redeem | امسح للاسترداد
          </p>
        </div>
      </div>

      {/* Voucher Details Card */}
      <div className="w-full mt-6 bg-primary text-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight mb-1">
          $75.00 Remaining
        </h1>
        <h1 className="text-2xl font-bold leading-tight tracking-tight mb-4">
          المتبقي ٧٥.٠٠ دولار
        </h1>
        <div className="h-px bg-white/20 w-full my-4"></div>
        <p className="text-white/90 text-sm font-medium">
          Exp: 31 Dec 2023
        </p>
        <p className="text-white/90 text-sm font-medium">
          تاريخ الانتهاء: ٣١ ديسمبر ٢٠٢٣
        </p>
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-2 mt-8 text-slate-500 dark:text-slate-400">
        <span className="material-symbols-outlined text-sm">lock</span>
        <p className="text-xs">Secure Transaction | معاملة آمنة</p>
      </div>

      {/* Done Button */}
      <button
        onClick={() => navigate('/beneficiary')}
        className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <span>Done | تم</span>
        <span className="material-symbols-outlined">check_circle</span>
      </button>
    </div>
  );
};

export default VoucherQR;
