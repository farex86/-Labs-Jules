import React, { useState, useMemo } from 'react';
import { CONSUMPTION_PATTERNS } from '../utils/solarConstants';
import { calculateSolarRequirements } from '../utils/solarLogic';
import DeviceList from '../components/solar-calculator/DeviceList';
import ResultsPanel from '../components/solar-calculator/ResultsPanel';
import { Calculator } from 'lucide-react';

const SolarCalculator = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('custom');
  const [devices, setDevices] = useState([]);

  // Handle pattern change
  const handlePatternChange = (e) => {
    const patternId = e.target.value;
    setSelectedPatternId(patternId);

    if (patternId === 'custom') {
      setDevices([]);
    } else {
      const pattern = CONSUMPTION_PATTERNS.find(p => p.id === patternId);
      if (pattern && pattern.devices) {
        // Deep copy devices to ensure unique IDs if modified later
        const devicesCopy = pattern.devices.map(d => ({
          ...d,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // unique ID for editing
        }));
        setDevices(devicesCopy);
      }
    }
  };

  // Calculate requirements whenever devices change
  const requirements = useMemo(() => {
    return calculateSolarRequirements(devices);
  }, [devices]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600 ml-4">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">حاسبة النظام الشمسي (Solar Calculator)</h1>
            <p className="text-gray-500 mt-1">احسب متطلبات النظام الشمسي بناءً على الأجهزة أو نمط الاستهلاك.</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Input (Pattern Selection + Device List) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Pattern Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <label htmlFor="pattern-select" className="block text-sm font-medium text-gray-700 mb-2">
                اختر نمط الاستهلاك (Choose Consumption Pattern)
              </label>
              <select
                id="pattern-select"
                value={selectedPatternId}
                onChange={handlePatternChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              >
                {CONSUMPTION_PATTERNS.map((pattern) => (
                  <option key={pattern.id} value={pattern.id}>
                    {pattern.name}
                  </option>
                ))}
              </select>
              {selectedPatternId !== 'custom' && (
                <p className="mt-2 text-sm text-gray-500">
                  تم تحميل الأجهزة الافتراضية لهذا النمط. يمكنك التعديل عليها في الجدول أدناه.
                </p>
              )}
            </div>

            {/* Device List */}
            <DeviceList devices={devices} onUpdateDevices={setDevices} />

          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ResultsPanel requirements={requirements} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
