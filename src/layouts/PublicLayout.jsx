import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-bold text-gray-900">
                VMS App
              </Link>
            </div>
            <nav className="flex gap-4">
              <Link to="/calculator" className="text-gray-600 hover:text-gray-900">
                حاسبة الطاقة (Calculator)
              </Link>
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">
                تسجيل الدخول (Login)
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} VMS. All rights reserved.</p>
      </footer>
    </div>
  );
}
