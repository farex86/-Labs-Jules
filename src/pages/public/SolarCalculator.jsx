import React, { useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Settings, Battery, Sun, Zap, Plus, Trash2, Edit2, Check } from 'lucide-react';
import {
  FACILITY_TYPES,
  calculateTotalConsumption,
  calculatePeakLoad,
  calculateInverterSize,
  calculatePanelCapacity,
  calculateBatteryCapacity,
} from '../../models/SolarCalculatorModel';
import toast from 'react-hot-toast';

// Initial state for the reducer
const initialState = {
  selectedFacilityId: '',
  appliances: [],
  editingId: null,
  editForm: { name: '', power: '', quantity: '', hours: '' },
  newForm: { name: '', power: '', quantity: '', hours: '' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FACILITY': {
      const facility = FACILITY_TYPES.find((f) => f.id === action.payload);
      if (!facility) return state;
      // Deep copy to prevent mutating the constant
      const appliances = facility.defaultAppliances.map((a) => ({ ...a }));
      return { ...state, selectedFacilityId: action.payload, appliances, editingId: null };
    }
    case 'ADD_APPLIANCE': {
      const newAppliance = {
        id: Date.now().toString(),
        name: action.payload.name,
        power: Number(action.payload.power),
        quantity: Number(action.payload.quantity),
        hours: Number(action.payload.hours),
      };
      return {
        ...state,
        appliances: [...state.appliances, newAppliance],
        newForm: initialState.newForm, // Reset form
      };
    }
    case 'REMOVE_APPLIANCE':
      return {
        ...state,
        appliances: state.appliances.filter((a) => a.id !== action.payload),
      };
    case 'START_EDIT': {
      const appliance = state.appliances.find((a) => a.id === action.payload);
      if (!appliance) return state;
      return {
        ...state,
        editingId: action.payload,
        editForm: { ...appliance },
      };
    }
    case 'CANCEL_EDIT':
      return { ...state, editingId: null, editForm: initialState.editForm };
    case 'SAVE_EDIT': {
      return {
        ...state,
        appliances: state.appliances.map((a) =>
          a.id === state.editingId
            ? {
                ...a,
                name: action.payload.name,
                power: Number(action.payload.power),
                quantity: Number(action.payload.quantity),
                hours: Number(action.payload.hours),
              }
            : a
        ),
        editingId: null,
        editForm: initialState.editForm,
      };
    }
    case 'UPDATE_NEW_FORM':
      return { ...state, newForm: { ...state.newForm, ...action.payload } };
    case 'UPDATE_EDIT_FORM':
      return { ...state, editForm: { ...state.editForm, ...action.payload } };
    default:
      return state;
  }
}

const SolarCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalConsumptionWh = calculateTotalConsumption(state.appliances);
  const peakLoadW = calculatePeakLoad(state.appliances);
  const inverterSizeW = calculateInverterSize(peakLoadW);
  const panelCapacityW = calculatePanelCapacity(totalConsumptionWh);
  const batteryCapacityAh = calculateBatteryCapacity(totalConsumptionWh);

  const handleAddAppliance = (e) => {
    e.preventDefault();
    if (!state.newForm.name || !state.newForm.power || !state.newForm.quantity || !state.newForm.hours) {
      toast.error('الرجاء تعبئة جميع الحقول');
      return;
    }
    dispatch({ type: 'ADD_APPLIANCE', payload: state.newForm });
    toast.success('تم إضافة الجهاز بنجاح');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!state.editForm.name || !state.editForm.power || !state.editForm.quantity || !state.editForm.hours) {
      toast.error('الرجاء تعبئة جميع الحقول');
      return;
    }
    dispatch({ type: 'SAVE_EDIT', payload: state.editForm });
    toast.success('تم تحديث الجهاز بنجاح');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <Sun className="text-yellow-500 w-10 h-10" />
            حاسبة الطاقة الشمسية
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            احسب احتياجاتك من الطاقة الشمسية بناءً على نوع المنشأة ونمط الاستهلاك.
            اختر نوع المنشأة للبدء أو قم بإضافة أجهزتك يدوياً.
          </p>
        </div>

        {/* Facility Selector */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            اختر نوع المنشأة (نمط الاستهلاك):
          </label>
          <select
            className="w-full md:w-1/2 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            value={state.selectedFacilityId}
            onChange={(e) => dispatch({ type: 'SELECT_FACILITY', payload: e.target.value })}
          >
            <option value="" disabled>اختر نوع المنشأة...</option>
            {FACILITY_TYPES.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appliances List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">قائمة الأجهزة</h2>
                <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  {state.appliances.length} أجهزة
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">الجهاز</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">القدرة (واط)</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">العدد</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">ساعات العمل/يوم</th>
                      <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {state.appliances.map((appliance) => (
                      <tr key={appliance.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        {state.editingId === appliance.id ? (
                          <>
                            <td className="px-4 py-2">
                              <input type="text" className="w-full p-2 text-sm border rounded dark:bg-slate-800 dark:border-slate-700" value={state.editForm.name} onChange={e => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { name: e.target.value } })} />
                            </td>
                            <td className="px-4 py-2">
                              <input type="number" className="w-full p-2 text-sm border rounded dark:bg-slate-800 dark:border-slate-700" value={state.editForm.power} onChange={e => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { power: e.target.value } })} />
                            </td>
                            <td className="px-4 py-2">
                              <input type="number" className="w-full p-2 text-sm border rounded dark:bg-slate-800 dark:border-slate-700" value={state.editForm.quantity} onChange={e => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { quantity: e.target.value } })} />
                            </td>
                            <td className="px-4 py-2">
                              <input type="number" className="w-full p-2 text-sm border rounded dark:bg-slate-800 dark:border-slate-700" value={state.editForm.hours} onChange={e => dispatch({ type: 'UPDATE_EDIT_FORM', payload: { hours: e.target.value } })} />
                            </td>
                            <td className="px-4 py-2 flex justify-center gap-2">
                              <button onClick={handleSaveEdit} className="text-green-600 p-1 hover:bg-green-50 rounded"><Check size={18}/></button>
                              <button onClick={() => dispatch({ type: 'CANCEL_EDIT' })} className="text-slate-400 p-1 hover:bg-slate-50 rounded">إلغاء</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{appliance.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{appliance.power}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{appliance.quantity}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{appliance.hours}</td>
                            <td className="px-6 py-4 flex justify-center gap-2">
                              <button onClick={() => dispatch({ type: 'START_EDIT', payload: appliance.id })} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => {
                                dispatch({ type: 'REMOVE_APPLIANCE', payload: appliance.id });
                                toast.success('تم حذف الجهاز');
                              }} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {state.appliances.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                          لا توجد أجهزة مضافة. اختر نوع المنشأة أو أضف جهازاً يدوياً.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Add New Appliance Form */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">إضافة جهاز جديد</h3>
                <form onSubmit={handleAddAppliance} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input type="text" placeholder="اسم الجهاز" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    value={state.newForm.name} onChange={e => dispatch({ type: 'UPDATE_NEW_FORM', payload: { name: e.target.value } })} />
                  <input type="number" placeholder="القدرة (واط)" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    value={state.newForm.power} onChange={e => dispatch({ type: 'UPDATE_NEW_FORM', payload: { power: e.target.value } })} />
                  <input type="number" placeholder="العدد" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    value={state.newForm.quantity} onChange={e => dispatch({ type: 'UPDATE_NEW_FORM', payload: { quantity: e.target.value } })} />
                  <input type="number" placeholder="ساعات العمل/يوم" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    value={state.newForm.hours} onChange={e => dispatch({ type: 'UPDATE_NEW_FORM', payload: { hours: e.target.value } })} />
                  <button type="submit" className="bg-primary text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <Plus size={18} />
                    <span>إضافة</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="bg-primary text-white rounded-2xl p-6 shadow-xl shadow-primary/20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400" />
                ملخص النظام المطلوب
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-primary-100 text-sm mb-1">الاستهلاك اليومي الإجمالي</p>
                  <p className="text-3xl font-bold">{(totalConsumptionWh / 1000).toFixed(2)} <span className="text-lg font-normal opacity-80">kWh/day</span></p>
                </div>

                <div className="h-px bg-white/20"></div>

                <div>
                  <p className="text-primary-100 text-sm mb-1">حجم الألواح الشمسية المقترح</p>
                  <p className="text-2xl font-bold flex items-center justify-between">
                    <span>{panelCapacityW.toLocaleString()} <span className="text-sm font-normal opacity-80">W</span></span>
                    <Sun className="opacity-50" size={24} />
                  </p>
                  <p className="text-xs text-primary-200 mt-1">بافتراض 5 ساعات شمس ذروة وكفاءة 80%</p>
                </div>

                <div>
                  <p className="text-primary-100 text-sm mb-1">سعة البطاريات المقترحة (48V)</p>
                  <p className="text-2xl font-bold flex items-center justify-between">
                    <span>{batteryCapacityAh.toLocaleString()} <span className="text-sm font-normal opacity-80">Ah</span></span>
                    <Battery className="opacity-50" size={24} />
                  </p>
                  <p className="text-xs text-primary-200 mt-1">ليوم واحد احتياطي وتفريغ 80%</p>
                </div>

                <div>
                  <p className="text-primary-100 text-sm mb-1">حجم الإنفرتر المقترح</p>
                  <p className="text-2xl font-bold flex items-center justify-between">
                    <span>{inverterSizeW.toLocaleString()} <span className="text-sm font-normal opacity-80">W</span></span>
                    <Settings className="opacity-50" size={24} />
                  </p>
                  <p className="text-xs text-primary-200 mt-1">يشمل 25% هامش أمان للحمل الأقصى</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 flex gap-3 text-yellow-800 dark:text-yellow-200 text-sm">
              <span className="material-symbols-outlined shrink-0">info</span>
              <p>هذه الحسابات تقديرية وتعتمد على متوسطات مثالية. يُنصح باستشارة مهندس طاقة شمسية مختص قبل اتخاذ قرار الشراء.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SolarCalculator;
