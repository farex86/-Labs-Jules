import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const BeneficiaryManagement = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    national_id: '',
    family_size: 1,
    address: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const { data, error } = await supabase
        .from('beneficiaries')
        .select(`
          *,
          profiles (
            full_name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBeneficiaries(data || []);
    } catch (error) {
      console.error('Error fetching beneficiaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (beneficiary = null) => {
    if (beneficiary) {
      setEditingBeneficiary(beneficiary);
      setFormData({
        full_name: beneficiary.profiles?.full_name || '',
        email: beneficiary.profiles?.email || '',
        phone: beneficiary.profiles?.phone || '',
        national_id: beneficiary.national_id || '',
        family_size: beneficiary.family_size || 1,
        address: beneficiary.address || '',
        status: beneficiary.status || 'active',
      });
    } else {
      setEditingBeneficiary(null);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        national_id: '',
        family_size: 1,
        address: '',
        status: 'active',
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBeneficiary(null);
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      national_id: '',
      family_size: 1,
      address: '',
      status: 'active',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.full_name.trim()) errors.full_name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.national_id.trim()) errors.national_id = 'National ID is required';
    if (formData.family_size < 1) errors.family_size = 'Family size must be at least 1';
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
      if (editingBeneficiary) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: formData.full_name,
            phone: formData.phone,
          })
          .eq('id', editingBeneficiary.user_id);

        if (profileError) throw profileError;

        const { error: beneficiaryError } = await supabase
          .from('beneficiaries')
          .update({
            national_id: formData.national_id,
            family_size: formData.family_size,
            address: formData.address,
            status: formData.status,
          })
          .eq('id', editingBeneficiary.id);

        if (beneficiaryError) throw beneficiaryError;
      } else {
        const password = Math.random().toString(36).slice(-8);
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([{
              id: authData.user.id,
              email: formData.email,
              full_name: formData.full_name,
              role: 'beneficiary',
              phone: formData.phone,
            }]);

          if (profileError) throw profileError;

          const { error: beneficiaryError } = await supabase
            .from('beneficiaries')
            .insert([{
              user_id: authData.user.id,
              national_id: formData.national_id,
              family_size: formData.family_size,
              address: formData.address,
              status: formData.status,
            }]);

          if (beneficiaryError) throw beneficiaryError;
        }
      }

      await fetchBeneficiaries();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving beneficiary:', error);
      setFormErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (beneficiaryId, userId) => {
    if (!confirm('Are you sure you want to delete this beneficiary?')) return;

    try {
      const { error } = await supabase
        .from('beneficiaries')
        .delete()
        .eq('id', beneficiaryId);

      if (error) throw error;
      await fetchBeneficiaries();
    } catch (error) {
      console.error('Error deleting beneficiary:', error);
    }
  };

  const filteredBeneficiaries = beneficiaries.filter((b) =>
    b.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.national_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Beneficiary Management</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
            {beneficiaries.length} Total
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Add Beneficiary
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 flex gap-4 items-center">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Search by name, ID or email..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Beneficiary</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">National ID</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Family Size</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBeneficiaries.length > 0 ? filteredBeneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {beneficiary.profiles?.full_name?.charAt(0) || 'B'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{beneficiary.profiles?.full_name || 'Unknown'}</p>
                          <p className="text-xs text-slate-500">{beneficiary.profiles?.email || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{beneficiary.national_id}</td>
                    <td className="px-6 py-4 text-sm">{beneficiary.profiles?.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">{beneficiary.family_size} members</td>
                    <td className="px-6 py-4 text-sm font-bold">SAR {beneficiary.total_balance?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase ${
                        beneficiary.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        beneficiary.status === 'inactive' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {beneficiary.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(beneficiary)}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(beneficiary.id, beneficiary.user_id)}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                      No beneficiaries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingBeneficiary ? 'Edit Beneficiary' : 'Add New Beneficiary'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formErrors.submit && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-800 dark:text-red-200">
                  {formErrors.submit}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.full_name && <p className="text-xs text-red-600 mt-1">{formErrors.full_name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={editingBeneficiary}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800 disabled:opacity-50"
                  />
                  {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    National ID *
                  </label>
                  <input
                    type="text"
                    value={formData.national_id}
                    onChange={(e) => setFormData({ ...formData, national_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.national_id && <p className="text-xs text-red-600 mt-1">{formErrors.national_id}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Family Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.family_size}
                    onChange={(e) => setFormData({ ...formData, family_size: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.family_size && <p className="text-xs text-red-600 mt-1">{formErrors.family_size}</p>}
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
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                />
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
                  {submitting ? 'Saving...' : editingBeneficiary ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryManagement;
