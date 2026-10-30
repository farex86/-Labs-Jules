import React, { useState } from 'react';
import { facilityTypes, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (selectedFacility) {
      setResult(calculateSolarRequirements(selectedFacility, []));
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">حاسبة الطاقة الشمسية</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          اختر نوع المنشأة
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
        >
          <option value="">-- الرجاء الاختيار --</option>
          {facilityTypes.map(facility => (
            <option key={facility.id} value={facility.id}>{facility.name}</option>
          ))}
        </select>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={handleCalculate}
        >
          احسب
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200"
        >
          <h2 className="text-xl font-bold mb-4 text-green-800">النتائج المتوقعة:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm text-gray-600">الحمل الأساسي</p>
              <p className="text-lg font-semibold">{result.totalLoad} kW</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm text-gray-600">حمل الذروة</p>
              <p className="text-lg font-semibold">{result.peakLoad} kW</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm col-span-2">
              <p className="text-sm text-gray-600">الألواح المقترحة</p>
              <p className="text-lg font-semibold">{result.recommendedPanels} لوح</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SolarCalculator;
