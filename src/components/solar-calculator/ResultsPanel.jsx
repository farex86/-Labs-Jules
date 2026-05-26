import React from 'react';
import { Zap, Battery, Sun, Cpu } from 'lucide-react';

const ResultCard = ({ title, value, unit, icon: Icon, colorClass, bgClass, iconColorClass }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center ${colorClass}`}>
    <div className={`p-4 rounded-full ml-4 ${bgClass} ${iconColorClass}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">
        {value.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}
      </p>
    </div>
  </div>
);

const ResultsPanel = ({ requirements }) => {
  if (!requirements || requirements.totalPower === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center text-gray-500 h-full flex flex-col justify-center items-center">
        <Sun className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-lg">أضف أجهزة لعرض متطلبات النظام الشمسي</p>
      </div>
    );
  }

  // Convert Watts to kW for better readability if large
  const displayTotalPower = requirements.totalPower > 1000 ? (requirements.totalPower / 1000) : requirements.totalPower;
  const powerUnit = requirements.totalPower > 1000 ? 'kW' : 'W';

  const displayEnergy = requirements.dailyEnergy > 1000 ? (requirements.dailyEnergy / 1000) : requirements.dailyEnergy;
  const energyUnit = requirements.dailyEnergy > 1000 ? 'kWh/day' : 'Wh/day';

  return (
    <div className="space-y-6" dir="rtl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">النتائج والمتطلبات</h3>

      <div className="grid grid-cols-1 gap-4">
        <ResultCard
          title="إجمالي القدرة (Total Power)"
          value={displayTotalPower}
          unit={powerUnit}
          icon={Zap}
          colorClass="border-r-4 border-yellow-500"
          bgClass="bg-yellow-100"
          iconColorClass="text-yellow-600"
        />
        <ResultCard
          title="الطاقة اليومية (Daily Energy)"
          value={displayEnergy}
          unit={energyUnit}
          icon={Zap}
          colorClass="border-r-4 border-orange-500"
          bgClass="bg-orange-100"
          iconColorClass="text-orange-600"
        />
        <ResultCard
          title="حجم الإنفرتر المطلوب (Inverter)"
          value={requirements.requiredInverter > 1000 ? requirements.requiredInverter / 1000 : requirements.requiredInverter}
          unit={requirements.requiredInverter > 1000 ? 'kW' : 'W'}
          icon={Cpu}
          colorClass="border-r-4 border-blue-500"
          bgClass="bg-blue-100"
          iconColorClass="text-blue-600"
        />
        <ResultCard
          title="سعة البطاريات المطلوبة (Battery)"
          value={requirements.requiredBatteryCapacity}
          unit="Ah (24V)"
          icon={Battery}
          colorClass="border-r-4 border-green-500"
          bgClass="bg-green-100"
          iconColorClass="text-green-600"
        />
        <ResultCard
          title="حجم الألواح الشمسية (Solar Array)"
          value={requirements.requiredSolarArray > 1000 ? requirements.requiredSolarArray / 1000 : requirements.requiredSolarArray}
          unit={requirements.requiredSolarArray > 1000 ? 'kW' : 'W'}
          icon={Sun}
          colorClass="border-r-4 border-amber-500"
          bgClass="bg-amber-100"
          iconColorClass="text-amber-600"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">ملاحظات هامة:</h4>
        <ul className="list-disc list-inside text-xs text-blue-700 space-y-1">
          <li>تم حساب الإنفرتر بزيادة 25% كمعامل أمان.</li>
          <li>تم حساب سعة البطاريات على أساس تفريغ 50% (DoD) لنظام 24 فولت.</li>
          <li>تم حساب الألواح بناءً على 5.5 ساعات شمس ذروة ومعامل فقد 20%.</li>
          <li>هذه الحسابات تقديرية ويجب استشارة مهندس مختص للتصميم النهائي.</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsPanel;
