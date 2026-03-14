import React from 'react';
import { useNavigate } from 'react-router-dom';

const VoucherDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Top App Bar */}
      <header className="flex items-center bg-white dark:bg-slate-900 p-4 pb-2 justify-between border-b border-primary/10 sticky top-0 z-10 -mx-4 -mt-4 shrink-0">
        <div onClick={() => navigate(-1)} className="text-primary dark:text-primary-foreground flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Voucher Details / تفاصيل القسيمة
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Beneficiary Profile Section */}
        <div className="flex p-8 flex-col items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-primary/20 shadow-lg"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzR6B0rWVuDw2VHtx3VL7cUUhWCa-WtKCjcyI4SFXupkAwcaNt1ZZuCexSrdM-s7YtbTwHRCDTuUpjh5PPFsrYF9JiLN7TmmiBRHMcmtRfRaNC_MbKpfh_sUjjHIxv81qP3IZuDjJ8o_wQn0dy1xKe90_1m7z2gcb_YwSsd8ucrrWEvTV0IlQ4j7WcjL-sdRZZc_44q6kAucfNMhPWjIpiqPMipzKnw_mA00tWDxoF6hh0JiSwpkc3AySF1ZfkQINUC4yokEKdFzc")' }}
          ></div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-900 dark:text-slate-100 text-[24px] font-bold leading-tight tracking-[-0.015em] text-center">Ahmed Abdullah</p>
            <p className="text-primary/70 dark:text-primary/50 text-base font-medium leading-normal text-center">Beneficiary Name / اسم المستفيد</p>
          </div>
        </div>

        {/* Value Display */}
        <div className="bg-white dark:bg-slate-900 mx-4 p-8 rounded-xl shadow-sm border border-primary/10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-success text-3xl">verified_user</span>
            <span className="text-success font-bold text-sm tracking-widest uppercase">Validated / تم التحقق</span>
          </div>
          <h1 className="text-primary tracking-tight text-[48px] font-bold leading-tight text-center">$500.00</h1>
          <h2 className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-tight tracking-[-0.015em] text-center mt-1">Voucher Value / قيمة القسيمة</h2>
        </div>

        {/* Program Info */}
        <div className="mt-6 px-4">
          <div className="bg-primary/5 dark:bg-primary/20 rounded-lg p-4 flex flex-col items-center gap-1 border border-primary/10">
            <h4 className="text-primary dark:text-primary-foreground text-sm font-bold leading-normal tracking-[0.015em] text-center uppercase">Program Information / معلومات البرنامج</h4>
            <p className="text-slate-900 dark:text-slate-100 text-lg font-bold">WFP Food Assistance 2024</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">ID: #VCH-99283-X</p>
          </div>
        </div>

        <div className="px-4 mt-6 mb-8">
          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Valid Until / صالحة حتى</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">31 Dec 2024</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Location / الموقع</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">Amman Branch</span>
          </div>
        </div>
      </div>

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-primary/10 flex flex-col gap-3 max-w-md mx-auto">
        <button
          onClick={() => navigate('/vendor/confirmation')}
          className="w-full bg-success hover:bg-success/90 text-white font-bold py-5 rounded-xl text-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined">check_circle</span>
          <span>Confirm Redemption / تأكيد الصرف</span>
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-primary/10 dark:bg-primary/30 hover:bg-primary/20 text-primary dark:text-primary-foreground font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined">cancel</span>
          <span>Cancel / إلغاء</span>
        </button>
      </div>
    </div>
  );
};

export default VoucherDetails;
