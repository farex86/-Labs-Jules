import React from 'react';

const AnalyticsChart = ({ data, type = 'bar', title }) => {
  const getMaxValue = () => {
    return Math.max(...data.map(d => d.value), 1);
  };

  const getBarHeight = (value) => {
    const max = getMaxValue();
    return `${(value / max) * 100}%`;
  };

  const formatValue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };

  if (type === 'bar') {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-primary/10">
        {title && <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>}
        <div className="flex items-end justify-between gap-2 h-48">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center justify-end h-full">
                <span className="text-xs font-bold text-primary mb-1">
                  {formatValue(item.value)}
                </span>
                <div
                  className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80"
                  style={{ height: getBarHeight(item.value) }}
                ></div>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium text-center truncate w-full">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'line') {
    const max = getMaxValue();
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value / max) * 80);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-primary/10">
        {title && <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>}
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              points={points}
              className="text-primary"
            />
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((item.value / max) * 80);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  className="fill-primary"
                />
              );
            })}
          </svg>
          <div className="flex justify-between mt-2">
            {data.map((item, index) => (
              <span key={index} className="text-xs text-slate-600 dark:text-slate-400">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'donut') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;

    const slices = data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = index === 0 ? 0 : data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);
      const endAngle = currentAngle + angle;
      const newAngle = endAngle;

      const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
      const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
      const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
      const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M 50 50`,
        `L ${startX} ${startY}`,
        `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `Z`
      ].join(' ');

      return { pathData, percentage: percentage.toFixed(1), ...item };
    });

    const colors = [
      'fill-primary',
      'fill-emerald-500',
      'fill-amber-500',
      'fill-red-500',
      'fill-blue-500',
      'fill-purple-500'
    ];

    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-primary/10">
        {title && <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>}
        <div className="flex items-center gap-6">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {slices.map((slice, index) => (
                <path
                  key={index}
                  d={slice.pathData}
                  className={colors[index % colors.length]}
                  opacity={0.9}
                />
              ))}
              <circle cx="50" cy="50" r="25" className="fill-white dark:fill-slate-800" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{total}</div>
                <div className="text-xs text-slate-500">Total</div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {slices.map((slice, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{slice.label}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {slice.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AnalyticsChart;
