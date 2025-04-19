'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Check auth here if you implement sessions or cookies
    // If not authenticated, redirect
    // Example:
    // if (!isLoggedIn) router.push('/admin/login');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md p-6 md:min-h-screen">
          <h2 className="text-2xl font-bold text-blue-700 mb-8">Admin Panel</h2>
          <nav className="space-y-4">
            <a href="#" className="block text-blue-600 font-medium hover:underline">Dashboard</a>
            <a href="#" className="block text-gray-600 hover:text-blue-600">Manage Users</a>
            <a href="#" className="block text-gray-600 hover:text-blue-600">Orders</a>
            <a href="#" className="block text-gray-600 hover:text-blue-600">Settings</a>
            <button
              onClick={() => router.push('/admin/login')}
              className="mt-10 text-red-500 hover:underline"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Welcome, Admin 👋</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-700">New Orders</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">32</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-700">Support Tickets</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
