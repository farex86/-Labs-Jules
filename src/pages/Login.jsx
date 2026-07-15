import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, profile, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && profile) {
      switch (profile.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'beneficiary':
          navigate('/beneficiary');
          break;
        case 'vendor':
          navigate('/vendor');
          break;
        default:
          setError('Unknown user role');
          setFormLoading(false);
      }
    } else if (user && !authLoading && !profile) {
      setError('User profile not found. Please contact administrator.');
      setFormLoading(false);
    }
  }, [user, profile, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setFormLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      // Redirect will happen via AuthContext state changes
    } catch (err) {
      const errorMessage = err.message || 'Failed to sign in';
      setError(errorMessage);
      console.error('Login error:', err);
      setFormLoading(false);
    }
  };

  const handleInputChange = () => {
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Voucher Management System
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-3">Demo Credentials:</p>
          <div className="space-y-2 text-xs text-blue-800 dark:text-blue-300">
            <div><strong>Admin:</strong> admin@demo.local / Admin123!</div>
            <div><strong>Beneficiary:</strong> beneficiary@demo.local / Beneficiary123!</div>
            <div><strong>Vendor:</strong> vendor@demo.local / Vendor123!</div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-slate-100"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-slate-100"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={formLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <div className="mt-2">
            <Link to="/solar-calculator" className="text-primary hover:text-primary/80 font-medium">
              جرب الحاسبة الشمسية (Solar Calculator)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
