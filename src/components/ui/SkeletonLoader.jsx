import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="flex flex-col h-full animate-pulse p-8">
      {/* Header Skeleton */}
      <div className="h-16 flex items-center justify-between mb-8">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-slate-100 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 h-28">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-[340px]">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
          <div className="h-[240px] bg-slate-200 dark:bg-slate-700/50 rounded w-full"></div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-[340px]">
           <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
           <div className="space-y-6">
             {[...Array(3)].map((_, i) => (
               <div key={i}>
                 <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                 <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
