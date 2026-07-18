import React, { useState } from 'react';
import {
  FACILITY_TYPES,
  calculateTotalDailyEnergy,
  calculateRecommendedSystemSize,
  calculateBatteryBankCapacity
} from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);

  const facility = FACILITY_TYPES.find(f => f.id === selectedFacility);
  const devices = facility ? facility.defaultDevices : [];

  const dailyWh = calculateTotalDailyEnergy(devices);
  const systemSizeKw = calculateRecommendedSystemSize(dailyWh);
  const batteryCapacityAh = calculateBatteryBankCapacity(dailyWh);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Solar Calculator</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Estimate your solar energy needs based on your facility type.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Select Facility Type (نوع المنشأة)
        </label>
        <select
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
        >
          {FACILITY_TYPES.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Typical Devices (الأجهزة)</h3>
          <div className="space-y-4">
            {devices.map((device, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{device.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{device.powerW}W × {device.qty} units</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{device.hoursPerDay} hrs/day</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary p-6 rounded-2xl shadow-lg shadow-primary/20 text-white space-y-6">
          <h3 className="text-xl font-bold border-b border-white/20 pb-4">Estimated Requirements</h3>

          <div>
            <p className="text-primary/40 uppercase tracking-wider text-xs font-bold brightness-200 mb-1">Total Daily Energy</p>
            <p className="text-3xl font-black">{dailyWh.toLocaleString()} <span className="text-lg font-medium opacity-80">Wh/day</span></p>
          </div>

          <div>
            <p className="text-primary/40 uppercase tracking-wider text-xs font-bold brightness-200 mb-1">Recommended Solar Array</p>
            <p className="text-3xl font-black">{systemSizeKw.toFixed(1)} <span className="text-lg font-medium opacity-80">kW</span></p>
            <p className="text-xs opacity-75 mt-1">Based on 5.5 peak sun hours & 80% efficiency</p>
          </div>

          <div>
            <p className="text-primary/40 uppercase tracking-wider text-xs font-bold brightness-200 mb-1">Recommended Battery Bank</p>
            <p className="text-3xl font-black">{Math.round(batteryCapacityAh).toLocaleString()} <span className="text-lg font-medium opacity-80">Ah</span></p>
            <p className="text-xs opacity-75 mt-1">Based on 48V system, 1 day autonomy, 80% DoD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
