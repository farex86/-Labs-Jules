import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, Zap, Battery, Sun } from 'lucide-react';
import { FACILITY_TYPES, calculateTotalConsumption } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0].id);
  const [appliances, setAppliances] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const facility = FACILITY_TYPES.find(f => f.id === selectedFacility);
    if (facility) {
      setAppliances(JSON.parse(JSON.stringify(facility.appliances))); // Deep copy
    }
  }, [selectedFacility]);

  useEffect(() => {
    setResults(calculateTotalConsumption(appliances));
  }, [appliances]);

  const handleApplianceChange = (id, field, value) => {
    setAppliances(prev => prev.map(app =>
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const handleAddAppliance = () => {
    const newId = Date.now().toString();
    setAppliances(prev => [...prev, { id: newId, name: 'جهاز جديد', power: 100, quantity: 1, hours: 1 }]);
  };

  const handleRemoveAppliance = (id) => {
    setAppliances(prev => prev.filter(app => app.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Calculator className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h1>
          <p className="mt-4 text-xl text-gray-600">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">اختر نوع المنشأة:</label>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-3 bg-gray-50 border"
            >
              {FACILITY_TYPES.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">الأجهزة الكهربائية</h3>
              <button
                onClick={handleAddAppliance}
                className="flex items-center text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 ml-1" />
                إضافة جهاز
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3 rounded-tr-lg">الجهاز</th>
                    <th className="p-3">الاستهلاك (واط)</th>
                    <th className="p-3">العدد</th>
                    <th className="p-3">ساعات التشغيل/يوم</th>
                    <th className="p-3 rounded-tl-lg text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {appliances.map((app) => (
                    <tr key={app.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-2">
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => handleApplianceChange(app.id, 'name', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm border focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={app.power}
                          onChange={(e) => handleApplianceChange(app.id, 'power', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm border focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          value={app.quantity}
                          onChange={(e) => handleApplianceChange(app.id, 'quantity', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm border focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={app.hours}
                          onChange={(e) => handleApplianceChange(app.id, 'hours', e.target.value)}
                          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm border focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleRemoveAppliance(app.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {appliances.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        لا توجد أجهزة مضافة.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b pb-4">النتائج والتوصيات</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
                <Sun className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-gray-800 mb-1">حجم الألواح المطلوبة</h4>
                <p className="text-3xl font-bold text-blue-600">
                  {results.recommendedSolarSystemSizeKw.toFixed(1)} <span className="text-lg text-blue-500">كيلو واط</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">نظام الألواح الشمسية</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center border border-green-100">
                <Zap className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-gray-800 mb-1">حجم المحول (الإنفرتر)</h4>
                <p className="text-3xl font-bold text-green-600">
                  {results.recommendedInverterSizeKw.toFixed(1)} <span className="text-lg text-green-500">كيلو واط</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">لتغطية أقصى حمل لحظي</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 text-center border border-purple-100">
                <Battery className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-gray-800 mb-1">سعة البطاريات المطلوبة</h4>
                <p className="text-3xl font-bold text-purple-600">
                  {(results.recommendedBatteryCapacityWh / 1000).toFixed(1)} <span className="text-lg text-purple-500">كيلو واط/ساعة</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">سعة التخزين الإجمالية</p>
              </div>

            </div>

            <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600 border border-gray-200">
              <h5 className="font-bold text-gray-800 mb-2">ملاحظات هامة:</h5>
              <ul className="list-disc list-inside space-y-1">
                <li>الاستهلاك اليومي الكلي: <strong>{(results.dailyEnergyWh / 1000).toFixed(1)} كيلو واط/ساعة</strong></li>
                <li>أقصى حمل لحظي: <strong>{(results.maxPowerW / 1000).toFixed(1)} كيلو واط</strong></li>
                <li>تم حساب التوصيات بافتراض 5 ساعات شمس ذروة وكفاءة نظام 80%.</li>
                <li>هذه الحسابات تقريبية، يرجى استشارة مهندس مختص للحصول على تصميم دقيق.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
