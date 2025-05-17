import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function SellerDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-5">
          <h2 className="text-2xl font-bold text-blue-600">🛍️ Lizard</h2>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/seller/add-product"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link 
                to="/seller/productlist"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
              >
                Product List
              </Link>
            </li>
            <li>
              <Link 
                to="/seller/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link 
                to="/seller/requests"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
              >
                Buyer Requests
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Dashboard Overview Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Welcome back, Seller!</h3>
          <p className="text-gray-600 mb-6">Here's a quick overview of your shop's activities:</p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Total Products</h4>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Pending Requests</h4>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Orders in Process</h4>
              <p className="text-3xl font-bold text-blue-600">3</p>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800">Recent Activity</h4>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Product "Summer Dress" updated on 04/05/2025
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Order #12345 confirmed on 04/04/2025
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                Buyer Request "John Doe" received on 04/03/2025
              </li>
            </ul>
          </div>
        </section>

        {/* Outlet for nested routes */}
        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}