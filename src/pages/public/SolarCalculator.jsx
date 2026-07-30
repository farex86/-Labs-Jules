import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, Sun, Battery, Zap, Settings, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { FACILITY_TYPES, calculateTotalConsumption, calculateSystemSize } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [appliances, setAppliances] = useState([]);
  const [, setResults] = useState(null);

  const handleFacilityChange = (e) => {
    const value = e.target.value;
    setSelectedFacility(value);

    if (value) {
      const facility = FACILITY_TYPES.find(f => f.id === value);
      if (facility) {
        setAppliances(JSON.parse(JSON.stringify(facility.appliances)));
        toast.success(`تم تحميل الأجهزة الافتراضية لـ: ${facility.name}`);
      }
    } else {
      setAppliances([]);
    }
  };

  // Derive results directly during rendering instead of useEffect
  let currentResults = null;
  if (appliances.length > 0) {
    const { totalDailyWh, maxPowerW } = calculateTotalConsumption(appliances);
    currentResults = calculateSystemSize(totalDailyWh, maxPowerW);
  }

  // Update results state for backwards compatibility if needed, but we'll use currentResults in UI
  useEffect(() => {
    setResults(currentResults);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliances]);

  const handleApplianceChange = (id, field, value) => {
    setAppliances(prev =>
      prev.map(app => (app.id === id ? { ...app, [field]: value } : app))
    );
  };

  const handleAddAppliance = () => {
    const newId = Date.now().toString();
    setAppliances([...appliances, { id: newId, name: 'جهاز جديد', quantity: 1, watts: 100, hours: 4 }]);
    toast.success('تم إضافة جهاز جديد');
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(appliances.filter(app => app.id !== id));
    toast.success('تم حذف الجهاز');
  };

  const resetCalculator = () => {
    setSelectedFacility('');
    setAppliances([]);
    setResults(null);
    toast.success('تم إعادة ضبط الحاسبة');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4"
          >
            <Sun className="h-8 w-8 text-yellow-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            حاسبة الطاقة الشمسية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4"
          >
            احسب احتياجاتك من الطاقة الشمسية بناءً على نمط استهلاكك
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Input (Takes up 2 columns on md) */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-lg p-3 border"
                value={selectedFacility}
                onChange={handleFacilityChange}
              >
                <option value="">-- اختر من القائمة --</option>
                {FACILITY_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {appliances.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h3>
                  <button
                    onClick={handleAddAppliance}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة جهاز
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العدد</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القدرة (واط)</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ساعات العمل</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appliances.map((app) => (
                        <tr key={app.id}>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={app.name}
                              onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={app.quantity}
                              onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2 w-20"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={app.watts}
                              onChange={(e) => handleApplianceChange(app.id, 'watts', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2 w-24"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={app.hours}
                              onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border p-2 w-20"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleRemoveAppliance(app.id)}
                              className="text-red-600 hover:text-red-900"
                              title="حذف"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="md:col-span-1">
            {currentResults ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-lg shadow border-t-4 border-yellow-500 sticky top-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Calculator className="h-6 w-6 text-yellow-500 ml-2" />
                    النتائج التقديرية
                  </h3>
                  <button onClick={resetCalculator} className="text-gray-400 hover:text-gray-600">
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-1">إجمالي الاستهلاك اليومي</p>
                    <p className="text-2xl font-bold text-yellow-900">{currentResults.totalDailykWh} <span className="text-sm font-normal">كيلوواط/ساعة</span></p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                      <Sun className="h-4 w-4 ml-1 text-orange-500" />
                      الألواح الشمسية المطلوبة
                    </h4>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentResults.numberOfPanels} <span className="text-sm font-normal text-gray-500">لوح ({currentResults.panelCapacityW} واط)</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">إجمالي القدرة: {currentResults.totalArraySizekW} كيلوواط</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                      <Zap className="h-4 w-4 ml-1 text-blue-500" />
                      حجم الانفرتر (المحول)
                    </h4>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentResults.inverterSizekW} <span className="text-sm font-normal text-gray-500">كيلوواط</span>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                      <Battery className="h-4 w-4 ml-1 text-green-500" />
                      البطاريات المقترحة
                    </h4>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentResults.numberOfBatteries} <span className="text-sm font-normal text-gray-500">بطارية ({currentResults.batteryAhPerUnit}Ah / {currentResults.batteryVoltage}V)</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                    <Settings className="h-3 w-3 ml-1" />
                    هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-100 p-6 rounded-lg text-center h-full flex flex-col justify-center border-2 border-dashed border-gray-300">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">الرجاء اختيار نوع المنشأة لعرض الحسابات التقديرية</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
