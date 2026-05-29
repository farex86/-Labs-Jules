import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FACILITY_TYPES,
  DEFAULT_EQUIPMENT_BY_FACILITY,
  calculateTotalDailyConsumption,
  calculatePeakPower,
  calculateRequiredPVSize,
  calculateRequiredInverterSize,
  calculateRequiredBatteryCapacity
} from '../../models/solarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    // Load default equipment when facility changes
    const defaultEq = DEFAULT_EQUIPMENT_BY_FACILITY[selectedFacility] || [];
    // Create a deep copy to allow editing without mutating constants
    setEquipmentList(JSON.parse(JSON.stringify(defaultEq)));
  }, [selectedFacility]);

  // Derived state (no need for useEffect+setState)
  const dailyConsumption = useMemo(() => calculateTotalDailyConsumption(equipmentList), [equipmentList]);
  const peakPower = useMemo(() => calculatePeakPower(equipmentList), [equipmentList]);
  const pvSize = useMemo(() => calculateRequiredPVSize(dailyConsumption), [dailyConsumption]);
  const inverterSize = useMemo(() => calculateRequiredInverterSize(peakPower), [peakPower]);
  const batteryCapacity = useMemo(() => calculateRequiredBatteryCapacity(dailyConsumption), [dailyConsumption]);

  const handleEquipmentChange = (index, field, value) => {
    const newList = [...equipmentList];
    newList[index][field] = Number(value);
    setEquipmentList(newList);
  };

  const addEquipment = () => {
    setEquipmentList([
      ...equipmentList,
      { id: Date.now().toString(), name: 'جهاز جديد', power: 0, quantity: 1, hoursPerDay: 1 } // Using hoursPerDay consistently now
    ]);
  };

  const removeEquipment = (index) => {
    const newList = [...equipmentList];
    newList.splice(index, 1);
    setEquipmentList(newList);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 transition-colors" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة والأجهزة المستخدمة.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            اختر نوع المنشأة
          </label>
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {FACILITY_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">الأجهزة (نمط الاستهلاك)</h2>
            <button
              onClick={addEquipment}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              إضافة جهاز
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الجهاز</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">القدرة (وات)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">الكمية</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ساعات العمل/يوم</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">إجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {equipmentList.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const newList = [...equipmentList];
                          newList[index].name = e.target.value;
                          setEquipmentList(newList);
                        }}
                        className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={item.power}
                        onChange={(e) => handleEquipmentChange(index, 'power', e.target.value)}
                        className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleEquipmentChange(index, 'quantity', e.target.value)}
                        className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={item.hoursPerDay || item.hours || 0} // handle legacy data if any
                        onChange={(e) => handleEquipmentChange(index, 'hoursPerDay', e.target.value)}
                        className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeEquipment(index)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">النتائج التقديرية للنظام</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">الاستهلاك اليومي</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(dailyConsumption / 1000).toFixed(2)} <span className="text-sm font-normal">كيلو وات ساعة (kWh)</span>
              </p>
            </div>

            <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">الألواح الشمسية المطلوبة</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(pvSize / 1000).toFixed(2)} <span className="text-sm font-normal">كيلو وات (kWp)</span>
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">سعة المحول (Inverter)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(inverterSize / 1000).toFixed(2)} <span className="text-sm font-normal">كيلو وات (kW)</span>
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">سعة البطاريات (48V)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {batteryCapacity.toFixed(0)} <span className="text-sm font-normal">أمبير ساعة (Ah)</span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            * هذه الحسابات تقديرية وتعتمد على متوسط الإشعاع الشمسي (5.5 ساعات) وكفاءة النظام (80%). قد تختلف الاحتياجات الفعلية بناءً على الموقع والتصميم الهندسي الدقيق.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
