import React from 'react';
import { CONSUMPTION_PATTERNS } from '../../lib/solar-calculator/constants';

const PatternSelector = ({ selectedPattern, onSelectPattern }) => {
  return (
    <div className="mb-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm">
      <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Choose Consumption Pattern</h2>
      <p className="text-sm text-slate-500 mb-4">
        Select a template that matches your building type to pre-fill common devices.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {CONSUMPTION_PATTERNS.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => onSelectPattern(pattern)}
            className={`px-3 py-3 rounded-lg text-sm font-semibold transition-all border ${
              selectedPattern?.id === pattern.id
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-primary hover:bg-primary/5 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            }`}
          >
            {pattern.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternSelector;
