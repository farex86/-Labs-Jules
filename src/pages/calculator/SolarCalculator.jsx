import React, { useState, useEffect, useMemo } from 'react';
import { consumptionPatterns, systemDefaults } from './config';
import {
  calculateDailyConsumptionWh,
  calculatePeakPowerWatts,
  calculateRequiredSolarArrayWatts,
  calculateNumberOfPanels,
  calculateBatteryCapacityWh,
  calculateNumberOfBatteries,
  calculateInverterSizeWatts
} from './logic';
import { Calculator, Zap, Battery, Sun, Wrench, Settings, Trash2, Plus } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('');
  const [devices, setDevices] = useState([]);
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'
  const [daysOfAutonomy, setDaysOfAutonomy] = useState(1);
  const [isEditingSettings, setIsEditingSettings] = useState(false);

  // Settings states
  const [settings, setSettings] = useState({
    panelCapacityWatts: systemDefaults.panelCapacityWatts,
    batteryCapacityWh: systemDefaults.batteryCapacityWh,
    batteryDod: systemDefaults.batteryDod,
    systemLosses: systemDefaults.systemLosses,
    peakSunHours: systemDefaults.peakSunHours
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    if (selectedPatternId) {
      const pattern = consumptionPatterns.find(p => p.id === selectedPatternId);
      if (pattern) {
        // Deep copy devices so we can edit them independently
        setDevices(JSON.parse(JSON.stringify(pattern.defaultDevices)));
      }
    } else {
      setDevices([]);
    }
  }, [selectedPatternId]);

  const handleDeviceChange = (index, field, value) => {
    const updatedDevices = [...devices];
    updatedDevices[index][field] = Number(value) >= 0 ? Number(value) : 0;
    setDevices(updatedDevices);
  };

  const removeDevice = (index) => {
    const updatedDevices = [...devices];
    updatedDevices.splice(index, 1);
    setDevices(updatedDevices);
  };

  const addDevice = () => {
    setDevices([
      ...devices,
      {
        id: `custom_${Date.now()}`,
        name_en: 'New Device',
        name_ar: 'جهاز جديد',
        power_watts: 100,
        quantity: 1,
        hours_per_day: 1
      }
    ]);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: parseFloat(value) || 0
    });
  };

  // Perform calculations
  const results = useMemo(() => {
    if (devices.length === 0) return null;

    const dailyConsumptionWh = calculateDailyConsumptionWh(devices);
    const dailyConsumptionKWh = dailyConsumptionWh / 1000;
    const peakPowerWatts = calculatePeakPowerWatts(devices);

    const requiredArrayWatts = calculateRequiredSolarArrayWatts(dailyConsumptionWh, settings.peakSunHours, settings.systemLosses);
    const requiredArrayKW = requiredArrayWatts / 1000;
    const numPanels = calculateNumberOfPanels(requiredArrayWatts, settings.panelCapacityWatts);

    const requiredBatteryCapacityWh = calculateBatteryCapacityWh(dailyConsumptionWh, daysOfAutonomy, settings.batteryDod);
    const requiredBatteryCapacityKWh = requiredBatteryCapacityWh / 1000;
    const numBatteries = calculateNumberOfBatteries(requiredBatteryCapacityWh, settings.batteryCapacityWh);

    const inverterSizeWatts = calculateInverterSizeWatts(peakPowerWatts);
    const inverterSizeKW = inverterSizeWatts / 1000;

    return {
      dailyConsumptionKWh,
      peakPowerWatts,
      requiredArrayKW,
      numPanels,
      requiredBatteryCapacityKWh,
      numBatteries,
      inverterSizeKW,
      inverterSizeWatts,
      panelCapacityWatts: settings.panelCapacityWatts,
      batteryCapacityWh: settings.batteryCapacityWh
    };
  }, [devices, daysOfAutonomy, settings]);


  const t = {
    title: isRTL ? 'حاسبة الطاقة الشمسية' : 'Solar Calculator',
    subtitle: isRTL ? 'احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك' : 'Calculate your solar energy needs based on your consumption pattern',
    pattern_label: isRTL ? 'اختر نمط الاستهلاك (المنشأة)' : 'Select Consumption Pattern (Facility)',
    pattern_placeholder: isRTL ? '-- اختر من القائمة --' : '-- Select from list --',
    devices_title: isRTL ? 'الأجهزة والأحمال' : 'Devices and Loads',
    device_name: isRTL ? 'اسم الجهاز' : 'Device Name',
    power: isRTL ? 'القدرة (واط)' : 'Power (W)',
    quantity: isRTL ? 'العدد' : 'Quantity',
    hours: isRTL ? 'ساعات العمل/يوم' : 'Hours/Day',
    add_device: isRTL ? 'إضافة جهاز' : 'Add Device',
    results_title: isRTL ? 'نتائج الحساب' : 'Calculation Results',
    daily_consumption: isRTL ? 'الاستهلاك اليومي' : 'Daily Consumption',
    inverter_size: isRTL ? 'حجم المحول (الإنفرتر) المطلوب' : 'Required Inverter Size',
    solar_array: isRTL ? 'حجم الألواح الشمسية المطلوبة' : 'Required Solar Array',
    panels: isRTL ? 'عدد الألواح' : 'Number of Panels',
    battery_bank: isRTL ? 'سعة البطاريات المطلوبة' : 'Required Battery Bank',
    batteries: isRTL ? 'عدد البطاريات' : 'Number of Batteries',
    days_autonomy: isRTL ? 'أيام التخزين الاحتياطي (بدون شمس)' : 'Days of Autonomy (No Sun)',
    settings: isRTL ? 'إعدادات النظام' : 'System Settings',
    save_settings: isRTL ? 'حفظ وإخفاء الإعدادات' : 'Save & Hide Settings',
    peak_sun: isRTL ? 'ساعات ذروة الشمس' : 'Peak Sun Hours',
    sys_losses: isRTL ? 'معامل الفقد في النظام' : 'System Loss Factor',
    panel_cap: isRTL ? 'قدرة اللوح الواحد (واط)' : 'Single Panel Capacity (W)',
    batt_cap: isRTL ? 'سعة البطارية الواحدة (واط.ساعة)' : 'Single Battery Capacity (Wh)',
    batt_dod: isRTL ? 'عمق التفريغ المسموح للبطارية' : 'Battery Depth of Discharge (DoD)'
  };

  return (
    <div className={`max-w-6xl mx-auto p-4 md:p-8 ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            {t.title}
          </h1>
          <p className="text-slate-500 mt-2">{t.subtitle}</p>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${language === 'ar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            العربية
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-6">

          {/* Pattern Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t.pattern_label}
            </label>
            <select
              value={selectedPatternId}
              onChange={(e) => setSelectedPatternId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
            >
              <option value="">{t.pattern_placeholder}</option>
              {consumptionPatterns.map(pattern => (
                <option key={pattern.id} value={pattern.id}>
                  {isRTL ? pattern.label_ar : pattern.label_en}
                </option>
              ))}
            </select>
          </div>

          {/* Devices List */}
          {selectedPatternId && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  {t.devices_title}
                </h2>
                <button
                  onClick={addDevice}
                  className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  {t.add_device}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-slate-500">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">{t.device_name}</th>
                      <th className="px-4 py-3 w-24">{t.power}</th>
                      <th className="px-4 py-3 w-24">{t.quantity}</th>
                      <th className="px-4 py-3 w-24">{t.hours}</th>
                      <th className="px-4 py-3 w-16 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-slate-50">
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={isRTL ? (device.name_ar || device.name_en) : (device.name_en || device.name_ar)}
                            onChange={(e) => {
                              const updatedDevices = [...devices];
                              if (isRTL) updatedDevices[index].name_ar = e.target.value;
                              else updatedDevices[index].name_en = e.target.value;
                              setDevices(updatedDevices);
                            }}
                            className="w-full bg-transparent border-slate-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number" min="0" step="10"
                            value={device.power_watts}
                            onChange={(e) => handleDeviceChange(index, 'power_watts', e.target.value)}
                            className="w-full border-slate-300 rounded-md p-1 text-center focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number" min="1" step="1"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(index, 'quantity', e.target.value)}
                            className="w-full border-slate-300 rounded-md p-1 text-center focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number" min="0" max="24" step="0.5"
                            value={device.hours_per_day}
                            onChange={(e) => handleDeviceChange(index, 'hours_per_day', e.target.value)}
                            className="w-full border-slate-300 rounded-md p-1 text-center focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => removeDevice(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {devices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-slate-500 italic">
                          No devices added.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Autonomy & Settings Toggle */}
          {selectedPatternId && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.days_autonomy}
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0" max="5" step="0.5"
                      value={daysOfAutonomy}
                      onChange={(e) => setDaysOfAutonomy(parseFloat(e.target.value))}
                      className="w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="font-bold text-lg text-blue-600">{daysOfAutonomy}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingSettings(!isEditingSettings)}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  {isEditingSettings ? t.save_settings : t.settings}
                </button>
             </div>
          )}

          {/* Settings Panel */}
          {isEditingSettings && selectedPatternId && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.peak_sun}</label>
                  <input type="number" step="0.1" name="peakSunHours" value={settings.peakSunHours} onChange={handleSettingsChange} className="w-full border-slate-300 rounded-md p-2 text-sm" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.sys_losses} (e.g. 1.2 = 20% loss)</label>
                  <input type="number" step="0.05" name="systemLosses" value={settings.systemLosses} onChange={handleSettingsChange} className="w-full border-slate-300 rounded-md p-2 text-sm" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.panel_cap}</label>
                  <input type="number" step="10" name="panelCapacityWatts" value={settings.panelCapacityWatts} onChange={handleSettingsChange} className="w-full border-slate-300 rounded-md p-2 text-sm" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.batt_cap} (e.g. 200Ah*12V=2400)</label>
                  <input type="number" step="100" name="batteryCapacityWh" value={settings.batteryCapacityWh} onChange={handleSettingsChange} className="w-full border-slate-300 rounded-md p-2 text-sm" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t.batt_dod} (0.0 to 1.0)</label>
                  <input type="number" step="0.1" max="1" min="0.1" name="batteryDod" value={settings.batteryDod} onChange={handleSettingsChange} className="w-full border-slate-300 rounded-md p-2 text-sm" />
               </div>
            </div>
          )}

        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-1">
          {results ? (
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl shadow-xl text-white p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <Calculator className="h-5 w-5 text-blue-400" />
                {t.results_title}
              </h2>

              <div className="space-y-6">

                {/* Consumption */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-slate-300 mb-1">{t.daily_consumption}</div>
                  <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                    {results.dailyConsumptionKWh.toFixed(2)} <span className="text-sm font-normal text-slate-400">kWh/day</span>
                  </div>
                </div>

                {/* Inverter */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-orange-400" />
                    <div className="text-sm text-slate-300">{t.inverter_size}</div>
                  </div>
                  <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                    {results.inverterSizeKW >= 1 ? results.inverterSizeKW.toFixed(2) : results.inverterSizeWatts}
                    <span className="text-sm font-normal text-slate-400">{results.inverterSizeKW >= 1 ? 'kW' : 'W'}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Peak Load: {(results.peakPowerWatts / 1000).toFixed(2)} kW
                  </div>
                </div>

                {/* Solar Panels */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-yellow-400" />
                    <div className="text-sm text-slate-300">{t.solar_array}</div>
                  </div>
                  <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                    {results.requiredArrayKW.toFixed(2)} <span className="text-sm font-normal text-slate-400">kW</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg text-sm">
                    <span className="font-bold text-lg">{results.numPanels}</span> {t.panels}
                    <span className="text-xs opacity-70">({results.panelCapacityWatts}W)</span>
                  </div>
                </div>

                {/* Battery Bank */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-4 w-4 text-green-400" />
                    <div className="text-sm text-slate-300">{t.battery_bank}</div>
                  </div>
                  <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                    {results.requiredBatteryCapacityKWh.toFixed(2)} <span className="text-sm font-normal text-slate-400">kWh</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-2 rounded-lg text-sm">
                    <span className="font-bold text-lg">{results.numBatteries}</span> {t.batteries}
                    <span className="text-xs opacity-70">({results.batteryCapacityWh}Wh)</span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-slate-400">
              <Calculator className="h-12 w-12 mb-4 opacity-50" />
              <p>{isRTL ? 'اختر نمط الاستهلاك لرؤية النتائج' : 'Select a consumption pattern to view results'}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SolarCalculator;
