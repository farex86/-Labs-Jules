import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const VoucherPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount_per_voucher: '',
    valid_from: '',
    valid_until: '',
    total_budget: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('voucher_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (program = null) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        name: program.name || '',
        description: program.description || '',
        amount_per_voucher: program.amount_per_voucher || '',
        valid_from: program.valid_from?.split('T')[0] || '',
        valid_until: program.valid_until?.split('T')[0] || '',
        total_budget: program.total_budget || '',
        status: program.status || 'active',
      });
    } else {
      setEditingProgram(null);
      setFormData({
        name: '',
        description: '',
        amount_per_voucher: '',
        valid_from: '',
        valid_until: '',
        total_budget: '',
        status: 'active',
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProgram(null);
    setFormData({
      name: '',
      description: '',
      amount_per_voucher: '',
      valid_from: '',
      valid_until: '',
      total_budget: '',
      status: 'active',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Program name is required';
    if (!formData.amount_per_voucher) errors.amount_per_voucher = 'Amount per voucher is required';
    if (!formData.valid_from) errors.valid_from = 'Start date is required';
    if (!formData.valid_until) errors.valid_until = 'End date is required';
    if (!formData.total_budget) errors.total_budget = 'Total budget is required';
    if (formData.valid_from && formData.valid_until && formData.valid_from >= formData.valid_until) {
      errors.valid_until = 'End date must be after start date';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const programData = {
        name: formData.name,
        description: formData.description,
        amount_per_voucher: parseFloat(formData.amount_per_voucher),
        valid_from: formData.valid_from,
        valid_until: formData.valid_until,
        total_budget: parseFloat(formData.total_budget),
        status: formData.status,
      };

      if (editingProgram) {
        const { error } = await supabase
          .from('voucher_programs')
          .update(programData)
          .eq('id', editingProgram.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('voucher_programs')
          .insert([programData]);

        if (error) throw error;
      }

      await fetchPrograms();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving program:', error);
      setFormErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (programId) => {
    if (!confirm('Are you sure you want to delete this program? This will affect all associated vouchers.')) return;

    try {
      const { error } = await supabase
        .from('voucher_programs')
        .delete()
        .eq('id', programId);

      if (error) throw error;
      await fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const filteredPrograms = programs.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (program) => {
    const now = new Date();
    const validFrom = new Date(program.valid_from);
    const validUntil = new Date(program.valid_until);

    if (program.status === 'inactive') return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    if (program.status === 'completed') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    if (now < validFrom) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    if (now > validUntil) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
  };

  const getStatusText = (program) => {
    const now = new Date();
    const validFrom = new Date(program.valid_from);
    const validUntil = new Date(program.valid_until);

    if (program.status === 'inactive') return 'Inactive';
    if (program.status === 'completed') return 'Completed';
    if (now < validFrom) return 'Scheduled';
    if (now > validUntil) return 'Expired';
    return 'Active';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-primary/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Voucher Programs</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
            {programs.length} Total
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Create Program
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 flex gap-4 items-center">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Search programs..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.length > 0 ? filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{program.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{program.description || 'No description'}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(program)}`}>
                    {getStatusText(program)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Amount</p>
                    <p className="text-lg font-bold text-primary">SAR {program.amount_per_voucher?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Budget</p>
                    <p className="text-lg font-bold">SAR {program.total_budget?.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Budget Used</span>
                    <span className="font-bold">{((program.used_budget / program.total_budget) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min((program.used_budget / program.total_budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-slate-500">Start Date</p>
                    <p className="font-semibold">{new Date(program.valid_from).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">End Date</p>
                    <p className="font-semibold">{new Date(program.valid_until).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleOpenModal(program)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-3 text-center py-12 text-slate-500">
              No programs found
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formErrors.submit && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-800 dark:text-red-200">
                  {formErrors.submit}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Program Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  placeholder="e.g., Food Security Program 2024"
                />
                {formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  placeholder="Describe the purpose and goals of this program..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Amount Per Voucher (SAR) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount_per_voucher}
                    onChange={(e) => setFormData({ ...formData, amount_per_voucher: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.amount_per_voucher && <p className="text-xs text-red-600 mt-1">{formErrors.amount_per_voucher}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Total Budget (SAR) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.total_budget}
                    onChange={(e) => setFormData({ ...formData, total_budget: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.total_budget && <p className="text-xs text-red-600 mt-1">{formErrors.total_budget}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.valid_from}
                    onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.valid_from && <p className="text-xs text-red-600 mt-1">{formErrors.valid_from}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.valid_until}
                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.valid_until && <p className="text-xs text-red-600 mt-1">{formErrors.valid_until}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingProgram ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherPrograms;
