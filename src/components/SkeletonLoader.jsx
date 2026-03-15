import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/10 animate-pulse">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          </div>
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonStat = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      </div>
      <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
    </div>
  </div>
);

const SkeletonLoader = ({ type = 'card', count = 1, ...props }) => {
  if (type === 'table') {
    return <SkeletonTable {...props} />;
  }

  if (type === 'stat') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonStat key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
