import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Sun, Battery, Zap, AlertCircle } from 'lucide-react';
import { FACILITY_TYPES, calculateSolarSystem } from '../../models/SolarCalculatorModel';

const SolarCalculator = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState(FACILITY_TYPES[0].id);
  const [appliances, setAppliances] = useState([]);

  // Derive default appliances dynamically if no custom ones exist
  const facility = FACILITY_TYPES.find(f => f.id === selectedFacilityId);

  // Use user-modified appliances, OR fallback to defaults from the selected facility
  const currentAppliances = appliances.length > 0 ? appliances : (facility ? JSON.parse(JSON.stringify(facility.defaultAppliances)) : []);

  // Derive results during render instead of using useEffect to prevent cascading renders
  const results = currentAppliances.length > 0 ? calculateSolarSystem(currentAppliances) : null;

  const handleFacilityChange = (e) => {
    setSelectedFacilityId(e.target.value);
    setAppliances([]); // Reset appliances state to let derived state pick up defaults for the new facility
  };

  const handleApplianceChange = (index, field, value) => {
    const updatedAppliances = [...currentAppliances];
    updatedAppliances[index][field] = value;
    setAppliances(updatedAppliances);
  };

  const removeAppliance = (index) => {
    const updatedAppliances = [...currentAppliances];
    updatedAppliances.splice(index, 1);
    setAppliances(updatedAppliances);
  };

  const addAppliance = () => {
    setAppliances([
      ...currentAppliances,
      { id: `custom_${Date.now()}`, name: 'جهاز جديد', power: 100, quantity: 1, hours: 4 }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">حاسبة الطاقة الشمسية</h2>
          <p className="mt-2 text-lg text-gray-600">احسب حجم النظام الشمسي المناسب لمنشأتك</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8">

            {/* Facility Selection */}
            <div className="mb-8">
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة
              </label>
              <select
                id="facility"
                value={selectedFacilityId}
                onChange={handleFacilityChange}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              >
                {FACILITY_TYPES.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appliances List */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية (أنماط الاستهلاك)</h3>
                <button
                  onClick={addAppliance}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة جهاز
                </button>
              </div>

              <div className="space-y-4">
                {currentAppliances.map((app, index) => (
                  <div key={app.id || index} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 items-start sm:items-center">
                    <div className="flex-1 w-full">
                      <label className="block text-xs text-gray-500 mb-1">اسم الجهاز</label>
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => handleApplianceChange(index, 'name', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="w-full sm:w-24">
                      <label className="block text-xs text-gray-500 mb-1">القدرة (واط)</label>
                      <input
                        type="number"
                        min="0"
                        value={app.power}
                        onChange={(e) => handleApplianceChange(index, 'power', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="w-full sm:w-24">
                      <label className="block text-xs text-gray-500 mb-1">العدد</label>
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => handleApplianceChange(index, 'quantity', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="w-full sm:w-24">
                      <label className="block text-xs text-gray-500 mb-1">ساعات العمل</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={app.hours}
                        onChange={(e) => handleApplianceChange(index, 'hours', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => removeAppliance(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="حذف"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {currentAppliances.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                    لا توجد أجهزة مضافة. قم بإضافة أجهزة لحساب النظام.
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            {results && currentAppliances.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">المواصفات المقترحة للنظام</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Inverter Card */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex flex-col items-center text-center">
                    <Zap className="h-10 w-10 text-blue-500 mb-3" />
                    <h4 className="text-sm font-medium text-gray-500 mb-1">حجم المحول (Inverter)</h4>
                    <div className="text-2xl font-bold text-gray-900">{results.inverterSizeKVA} <span className="text-lg">kVA</span></div>
                    <div className="text-sm text-gray-500 mt-1">({results.inverterSizeW} واط)</div>
                  </div>

                  {/* Solar Panels Card */}
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100 flex flex-col items-center text-center">
                    <Sun className="h-10 w-10 text-yellow-500 mb-3" />
                    <h4 className="text-sm font-medium text-gray-500 mb-1">الألواح الشمسية</h4>
                    <div className="text-2xl font-bold text-gray-900">{results.totalSolarCapacityKW} <span className="text-lg">kW</span></div>
                    <div className="text-sm text-gray-500 mt-1">({results.totalSolarCapacityW} واط)</div>
                  </div>

                  {/* Batteries Card */}
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100 flex flex-col items-center text-center">
                    <Battery className="h-10 w-10 text-green-500 mb-3" />
                    <h4 className="text-sm font-medium text-gray-500 mb-1">سعة البطاريات</h4>
                    <div className="text-2xl font-bold text-gray-900">{results.batteryCapacityAh} <span className="text-lg">Ah</span></div>
                    <div className="text-sm text-gray-500 mt-1">نظام {results.systemVoltage} فولت</div>
                  </div>

                </div>

                <div className="mt-6 text-sm text-gray-500 text-center bg-gray-50 p-4 rounded-lg">
                  <p>إجمالي الاستهلاك اليومي: <strong>{(results.totalEnergyWh / 1000).toFixed(1)} kWh</strong> | أقصى حمل في نفس الوقت: <strong>{(results.totalPowerW / 1000).toFixed(1)} kW</strong></p>
                  <p className="mt-2 text-xs">ملاحظة: هذه الحسابات تقديرية وتعتمد على كفاءة الأجهزة وساعات العمل الفعلية. يُنصح باستشارة مهندس مختص قبل التركيب.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
