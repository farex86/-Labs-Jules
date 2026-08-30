import React, { useState, useReducer, useEffect } from 'react';
import { FACILITY_TYPES, getDefaultDevices, calculateSolarRequirements } from '../../models/SolarCalculatorModel';
import { Plus, Trash2, Calculator, ArrowRight, Zap, Battery, Sun } from 'lucide-react';

// Using useReducer for complex state management of devices
const deviceReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DEFAULTS':
      return action.payload;
    case 'ADD_DEVICE':
      return [...state, { id: Date.now().toString(), name: '', power: 0, quantity: 1, hours: 0 }];
    case 'UPDATE_DEVICE':
      return state.map(device =>
        device.id === action.payload.id
          ? { ...device, [action.payload.field]: action.payload.value }
          : device
      );
    case 'REMOVE_DEVICE':
      return state.filter(device => device.id !== action.payload);
    default:
      return state;
  }
};

const SolarCalculator = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [devices, dispatch] = useReducer(deviceReducer, []);
  const [results, setResults] = useState(null);

  // When facility changes, load its default devices
  useEffect(() => {
    if (selectedFacility) {
      const defaultDevices = getDefaultDevices(selectedFacility);
      dispatch({ type: 'LOAD_DEFAULTS', payload: defaultDevices });
            setTimeout(() => setResults(null), 0); // Reset results when facility changes
    } else {
      dispatch({ type: 'LOAD_DEFAULTS', payload: [] });
            setTimeout(() => setResults(null), 0);
    }
  }, [selectedFacility]);

  const handleCalculate = () => {
    // Validate inputs
    const isValid = devices.every(d => d.name.trim() !== '' && d.power > 0 && d.quantity > 0 && d.hours > 0);
    if (!isValid && devices.length > 0) {
      alert('الرجاء التأكد من إدخال جميع بيانات الأجهزة بشكل صحيح (الاسم، القدرة، العدد، ساعات العمل يجب أن تكون أكبر من صفر).');
      return;
    }

    if (devices.length === 0) {
      alert('الرجاء إضافة جهاز واحد على الأقل.');
      return;
    }

    const calculatedResults = calculateSolarRequirements(devices);
    setResults(calculatedResults);
  };

  const handleDeviceChange = (id, field, value) => {
    dispatch({ type: 'UPDATE_DEVICE', payload: { id, field, value } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            حاسبة الطاقة الشمسية
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            قم بحساب احتياجاتك من الطاقة الشمسية بناءً على نوع منشأتك والأجهزة المستخدمة.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Facility Selection */}
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
              <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المنشأة للبدء (يحمل أجهزة افتراضية)
              </label>
              <select
                id="facilityType"
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">-- اختر نوع المنشأة أو ابدأ من الصفر --</option>
                {FACILITY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Devices List */}
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">الأجهزة الكهربائية</h2>
                <button
                  onClick={() => dispatch({ type: 'ADD_DEVICE' })}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-1 mr-2 h-4 w-4" />
                  إضافة جهاز
                </button>
              </div>

              {devices.length === 0 ? (
                <p className="text-gray-500 text-center py-4">لم يتم إضافة أي أجهزة بعد. اختر منشأة أو أضف جهازاً يدوياً.</p>
              ) : (
                <div className="space-y-4">
                  {/* Table Header (visible on larger screens) */}
                  <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 px-2 text-sm font-medium text-gray-500">
                    <div className="sm:col-span-4">اسم الجهاز</div>
                    <div className="sm:col-span-2 text-center">القدرة (واط)</div>
                    <div className="sm:col-span-2 text-center">العدد</div>
                    <div className="sm:col-span-3 text-center">ساعات العمل (يومياً)</div>
                    <div className="sm:col-span-1"></div>
                  </div>

                  {devices.map((device) => (
                    <div key={device.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50 p-4 sm:p-2 rounded-md sm:bg-transparent">
                      <div className="sm:col-span-4">
                        <label className="block sm:hidden text-xs text-gray-500 mb-1">اسم الجهاز</label>
                        <input
                          type="text"
                          value={device.name}
                          onChange={(e) => handleDeviceChange(device.id, 'name', e.target.value)}
                          placeholder="مثال: مكيف"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="sm:col-span-2">
                         <label className="block sm:hidden text-xs text-gray-500 mb-1">القدرة (واط)</label>
                        <input
                          type="number"
                          min="0"
                          value={device.power || ''}
                          onChange={(e) => handleDeviceChange(device.id, 'power', e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block sm:hidden text-xs text-gray-500 mb-1">العدد</label>
                        <input
                          type="number"
                          min="1"
                          value={device.quantity || ''}
                          onChange={(e) => handleDeviceChange(device.id, 'quantity', e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="sm:col-span-3">
                         <label className="block sm:hidden text-xs text-gray-500 mb-1">ساعات العمل (يومياً)</label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          value={device.hours || ''}
                          onChange={(e) => handleDeviceChange(device.id, 'hours', e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_DEVICE', payload: device.id })}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 focus:outline-none"
                          title="حذف الجهاز"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-gray-200">
                <button
                  onClick={handleCalculate}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Calculator className="-ml-1 mr-2 h-5 w-5" />
                  احسب الاحتياجات
                </button>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <ArrowRight className="h-5 w-5 ml-2 text-green-500" />
                النتائج التقديرية
              </h2>

              {!results ? (
                <div className="text-center py-10 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>قم بإضافة الأجهزة واضغط على "احسب الاحتياجات" لرؤية النتائج.</p>
                </div>
              ) : (
                <div className="space-y-6">

                  {/* Energy Consumption */}
                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                      <Zap className="h-4 w-4 ml-1 text-yellow-500" />
                      الاستهلاك اليومي التقريبي
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(results.totalDailyEnergyWh / 1000).toFixed(2)} <span className="text-base font-normal text-gray-500">كيلو واط ساعة (kWh)</span>
                    </div>
                  </div>

                  {/* Inverter Capacity */}
                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                      <Zap className="h-4 w-4 ml-1 text-blue-500" />
                      حجم الانفرتر المقترح
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                       {(results.inverterCapacityW / 1000).toFixed(2)} <span className="text-base font-normal text-gray-500">كيلو واط (kW)</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">يتحمل أقصى حمل تشغيل مع هامش أمان 25%</p>
                  </div>

                  {/* Solar Panels */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                      <Sun className="h-4 w-4 ml-1 text-orange-500" />
                      سعة الألواح الشمسية المطلوبة
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {(results.solarPanelCapacityW / 1000).toFixed(2)} <span className="text-base font-normal text-gray-500">كيلو واط (kW)</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">بافتراض 5 ساعات ذروة شمسية</p>
                  </div>

                  {/* Battery Capacity */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                      <Battery className="h-4 w-4 ml-1 text-green-500" />
                      سعة البطاريات المطلوبة
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                       {(results.batteryCapacityWh / 1000).toFixed(2)} <span className="text-base font-normal text-gray-500">كيلو واط ساعة (kWh)</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">تكفي لتشغيل الأجهزة ليوم كامل بدون شمس (بطاريات رصاص/جل)</p>
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>ملاحظة:</strong> هذه الحسابات تقديرية وتعتمد على كفاءة الأجهزة وظروف الطقس. يوصى باستشارة مهندس طاقة شمسية لتصميم النظام بدقة.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
