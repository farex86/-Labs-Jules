import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    business_name: '',
    business_license: '',
    category: 'grocery',
    address: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
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
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (vendor = null) => {
    if (vendor) {
      setEditingVendor(vendor);
      setFormData({
        full_name: vendor.profiles?.full_name || '',
        email: vendor.profiles?.email || '',
        phone: vendor.profiles?.phone || '',
        business_name: vendor.business_name || '',
        business_license: vendor.business_license || '',
        category: vendor.category || 'grocery',
        address: vendor.address || '',
        status: vendor.status || 'active',
      });
    } else {
      setEditingVendor(null);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        business_name: '',
        business_license: '',
        category: 'grocery',
        address: '',
        status: 'active',
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVendor(null);
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      business_name: '',
      business_license: '',
      category: 'grocery',
      address: '',
      status: 'active',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.full_name.trim()) errors.full_name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.business_name.trim()) errors.business_name = 'Business name is required';
    if (!formData.business_license.trim()) errors.business_license = 'Business license is required';
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
      if (editingVendor) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: formData.full_name,
            phone: formData.phone,
          })
          .eq('id', editingVendor.user_id);

        if (profileError) throw profileError;

        const { error: vendorError } = await supabase
          .from('vendors')
          .update({
            business_name: formData.business_name,
            business_license: formData.business_license,
            category: formData.category,
            address: formData.address,
            status: formData.status,
          })
          .eq('id', editingVendor.id);

        if (vendorError) throw vendorError;
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
              role: 'vendor',
              phone: formData.phone,
            }]);

          if (profileError) throw profileError;

          const { error: vendorError } = await supabase
            .from('vendors')
            .insert([{
              user_id: authData.user.id,
              business_name: formData.business_name,
              business_license: formData.business_license,
              category: formData.category,
              address: formData.address,
              status: formData.status,
            }]);

          if (vendorError) throw vendorError;
        }
      }

      await fetchVendors();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving vendor:', error);
      setFormErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (vendorId) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;

    try {
      const { error } = await supabase
        .from('vendors')
        .delete()
        .eq('id', vendorId);

      if (error) throw error;
      await fetchVendors();
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const filteredVendors = vendors.filter((v) =>
    v.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.business_license?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Vendor Management</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
            {vendors.length} Total
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Add Vendor
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 flex gap-4 items-center">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Search by business name, license, or owner..."
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
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">License</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Redeemed</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Payment</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredVendors.length > 0 ? filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {vendor.business_name?.charAt(0) || 'V'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{vendor.business_name || 'Unknown'}</p>
                          <p className="text-xs text-slate-500">{vendor.address || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{vendor.profiles?.full_name || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">{vendor.profiles?.phone || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{vendor.business_license}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {vendor.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">SAR {vendor.total_redeemed?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-amber-600">SAR {vendor.pending_payment?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase ${
                        vendor.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        vendor.status === 'inactive' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(vendor)}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(vendor.id)}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                      No vendors found
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
                {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
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
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.business_name && <p className="text-xs text-red-600 mt-1">{formErrors.business_name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Business License *
                  </label>
                  <input
                    type="text"
                    value={formData.business_license}
                    onChange={(e) => setFormData({ ...formData, business_license: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  {formErrors.business_license && <p className="text-xs text-red-600 mt-1">{formErrors.business_license}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Owner Name *
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
                    disabled={editingVendor}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800 disabled:opacity-50"
                  />
                  {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
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
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  >
                    <option value="food">Food</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="grocery">Grocery</option>
                    <option value="other">Other</option>
                  </select>
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
                  {submitting ? 'Saving...' : editingVendor ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
