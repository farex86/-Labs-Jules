import React from 'react';
import { Sun, Battery, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultsPanel = ({ results }) => {
  if (!results) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-center text-slate-500">
        Add devices to see your solar system recommendations here.
      </div>
    );
  }

  const cards = [
    {
      title: 'Inverter Size',
      value: `${results.inverterSizeKVA} kVA`,
      subtitle: `Covers ${results.totalPowerW.toLocaleString()}W peak load + 25% safety`,
      icon: <Activity className="text-blue-500" size={24} />,
      color: 'blue'
    },
    {
      title: 'Solar Panels Needed',
      value: `${results.panelsNeeded} Panels`,
      subtitle: `Based on ${results.panelWattage}W panels & 5.5 sun hours`,
      icon: <Sun className="text-amber-500" size={24} />,
      color: 'amber'
    },
    {
      title: 'Battery Capacity',
      value: `${results.batteryCapacityAh.toLocaleString()} Ah`,
      subtitle: `At ${results.batteryVoltage}V system (50% DOD)`,
      icon: <Battery className="text-emerald-500" size={24} />,
      color: 'emerald'
    },
    {
      title: 'Daily Energy',
      value: `${(results.totalDailyEnergyWh / 1000).toFixed(2)} kWh`,
      subtitle: 'Total daily consumption',
      icon: <Zap className="text-purple-500" size={24} />,
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Recommended System Size</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-start gap-4"
          >
            <div className={`p-3 rounded-lg bg-${card.color}-100 dark:bg-${card.color}-900/30`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{card.value}</h3>
              <p className="text-xs text-slate-400">{card.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <strong>Note:</strong> These calculations are estimates based on standard conditions in Sudan (5.5 peak sun hours). Actual requirements may vary based on exact device efficiency, wiring losses, and weather conditions. Consult a certified installer for a precise quotation.
        </p>
      </div>
    </div>
  );
};

export default ResultsPanel;
