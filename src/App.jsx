import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import BeneficiaryLayout from './layouts/BeneficiaryLayout';
import VendorLayout from './layouts/VendorLayout';

// Public Pages
import SolarCalculator from './pages/public/SolarCalculator';

// Auth Pages
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import BeneficiaryManagement from './pages/admin/BeneficiaryManagement';
import VendorManagement from './pages/admin/VendorManagement';
import VoucherPrograms from './pages/admin/VoucherPrograms';
import TransactionMonitoring from './pages/admin/TransactionMonitoring';
import VendorPayments from './pages/admin/VendorPayments';

// Beneficiary Pages
import BeneficiaryHome from './pages/beneficiary/BeneficiaryHome';
import VoucherQR from './pages/beneficiary/VoucherQR';
import TransactionHistory from './pages/beneficiary/TransactionHistory';

// Vendor Pages
import VendorLogin from './pages/vendor/VendorLogin';
import VendorDashboard from './pages/vendor/VendorDashboard';
import RedeemVoucher from './pages/vendor/RedeemVoucher';
import VoucherDetails from './pages/vendor/VoucherDetails';
import RedemptionConfirmation from './pages/vendor/RedemptionConfirmation';
import VendorHistory from './pages/vendor/VendorHistory';
import SyncData from './pages/vendor/SyncData';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Public Routes */}
          <Route path="/solar-calculator" element={<SolarCalculator />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="beneficiaries" element={<BeneficiaryManagement />} />
            <Route path="vendors" element={<VendorManagement />} />
            <Route path="programs" element={<VoucherPrograms />} />
            <Route path="transactions" element={<TransactionMonitoring />} />
            <Route path="payments" element={<VendorPayments />} />
            <Route path="reports" element={<div className="p-8">Reports Placeholder</div>} />
            <Route path="settings" element={<div className="p-8">Settings Placeholder</div>} />
          </Route>

          {/* Beneficiary Routes */}
          <Route path="/beneficiary" element={<ProtectedRoute allowedRoles={['beneficiary']}><BeneficiaryLayout /></ProtectedRoute>}>
            <Route index element={<BeneficiaryHome />} />
            <Route path="vouchers" element={<VoucherQR />} />
            <Route path="history" element={<TransactionHistory />} />
            <Route path="support" element={<div className="p-4">Support Placeholder</div>} />
          </Route>

          {/* Vendor Routes */}
          <Route path="/vendor" element={<ProtectedRoute allowedRoles={['vendor']}><VendorLayout /></ProtectedRoute>}>
            <Route index element={<VendorDashboard />} />
            <Route path="login" element={<VendorLogin />} />
            <Route path="redeem" element={<RedeemVoucher />} />
            <Route path="details" element={<VoucherDetails />} />
            <Route path="confirmation" element={<RedemptionConfirmation />} />
            <Route path="history" element={<VendorHistory />} />
            <Route path="sync" element={<SyncData />} />
            <Route path="settings" element={<div className="p-4">Vendor Settings Placeholder</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
