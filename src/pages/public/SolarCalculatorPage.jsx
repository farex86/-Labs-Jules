import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';

import PatternSelector from '../../components/solar-calculator/PatternSelector';
import DeviceList from '../../components/solar-calculator/DeviceList';
import ResultsPanel from '../../components/solar-calculator/ResultsPanel';

import { calculateSolarSystem } from '../../lib/solar-calculator/formulas';

const SolarCalculatorPage = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [devices, setDevices] = useState([]);

  // When a pattern is selected, update the devices list with a deep copy
  const handleSelectPattern = (pattern) => {
    setSelectedPattern(pattern);
    const copiedDevices = pattern.defaultDevices.map(device => ({ ...device }));
    setDevices(copiedDevices);
  };

  // Recalculate results whenever the devices list changes
  const results = useMemo(() => calculateSolarSystem(devices), [devices]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-2">
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calculator className="text-primary" size={32} />
              Solar System Calculator
            </h1>
            <p className="text-slate-500 mt-1">Estimate the required solar components based on your energy consumption.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <PatternSelector
              selectedPattern={selectedPattern}
              onSelectPattern={handleSelectPattern}
            />

            <DeviceList
              devices={devices}
              setDevices={setDevices}
            />
          </motion.div>

          {/* Right Column: Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-8">
              <ResultsPanel results={results} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculatorPage;
