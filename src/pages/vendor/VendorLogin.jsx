import React from 'react';
import { useNavigate } from 'react-router-dom';

const VendorLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-background-dark shadow-xl overflow-x-hidden">
      {/* Top App Bar / Logo Section */}
      <header className="flex items-center bg-white dark:bg-background-dark p-4 pb-2 justify-between">
        <div className="text-primary flex size-12 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-3xl">storefront</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
          Vendor Portal / بوابة البائع
        </h2>
      </header>

      {/* NGO Logo Placeholder */}
      <div className="px-6 py-6">
        <div className="w-full bg-primary/10 dark:bg-primary/20 flex flex-col items-center justify-center overflow-hidden rounded-xl min-h-[160px] border-2 border-dashed border-primary/30">
          <span className="material-symbols-outlined text-6xl text-primary mb-2">stabilization_action</span>
          <p className="text-primary font-semibold text-sm">NGO LOGO PLACEHOLDER</p>
          <p className="text-primary/60 text-xs">شعار المنظمة</p>
        </div>
      </div>

      {/* Login Header */}
      <div className="px-6 pt-4 pb-2">
        <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-bold leading-tight text-center">
          Vendor Login
        </h1>
        <h2 className="text-primary text-xl font-bold leading-tight tracking-tight text-center mt-1">
          تسجيل دخول البائع
        </h2>
      </div>

      {/* Login Form */}
      <div className="px-6 py-4 space-y-6">
        {/* Phone Number Input */}
        <label className="flex flex-col w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-900 dark:text-slate-100 text-base font-semibold">Phone Number</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">رقم الهاتف</span>
          </div>
          <div className="flex w-full items-stretch rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 focus-within:border-primary transition-colors">
            <input className="form-input flex w-full min-w-0 flex-1 border-none bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 h-16 px-4 text-xl font-medium focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-600" placeholder="000 000 000" type="tel"/>
            <div className="text-slate-400 dark:text-slate-500 flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-800/50">
              <span className="material-symbols-outlined">call</span>
            </div>
          </div>
        </label>

        {/* PIN Input */}
        <label className="flex flex-col w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-900 dark:text-slate-100 text-base font-semibold">Security PIN</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">الرمز السري</span>
          </div>
          <div className="flex w-full items-stretch rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 focus-within:border-primary transition-colors">
            <input className="form-input flex w-full min-w-0 flex-1 border-none bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 h-16 px-4 text-xl font-bold tracking-[0.5em] focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-600" inputMode="numeric" maxLength="6" pattern="[0-9]*" placeholder="••••••" type="password"/>
            <div className="text-slate-400 dark:text-slate-500 flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-800/50">
              <span className="material-symbols-outlined">lock</span>
            </div>
          </div>
        </label>

        {/* Login Button */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/vendor')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-xl text-xl shadow-lg shadow-primary/20 flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-transform"
          >
            <span>Login</span>
            <span className="text-sm font-normal opacity-90">تسجيل الدخول</span>
          </button>
        </div>
      </div>

      {/* Support / Footer */}
      <div className="mt-auto px-6 py-8 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Need help? Contact your NGO supervisor
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
          هل تحتاج مساعدة؟ اتصل بالمشرف الخاص بك
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-1 text-primary/70 text-sm font-medium cursor-pointer">
            <span className="material-symbols-outlined text-lg">language</span>
            <span>English</span>
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-1 text-primary/70 text-sm font-medium cursor-pointer">
            <span>العربية</span>
          </div>
        </div>
      </div>

      {/* Connectivity Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>ONLINE</span>
      </div>
    </div>
  );
};

export default VendorLogin;
