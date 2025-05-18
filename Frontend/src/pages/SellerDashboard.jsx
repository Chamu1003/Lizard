import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import ProfileSeller from './ProfileSeller'; // Import the ProfileSeller component

export default function SellerDashboardWithProfile() {
  const handleLogout = () => {
    localStorage.removeItem("sellerId");
    window.location.href = "/login";
  };

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
                className="block px-4 py-2 text-gray-700 bg-blue-100 text-blue-600 rounded-md transition-colors"
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
      <main className="flex-1 overflow-y-auto">
        {/* Profile Header with logout */}
        <div className="flex justify-between items-center p-8 bg-white shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">Seller Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Embed the ProfileSeller component */}
        <div className="p-4">
          <ProfileSellerWrapper />
        </div>
      </main>
    </div>
  );
}

// This wrapper component handles the styling adjustments needed to embed ProfileSeller in the dashboard
function ProfileSellerWrapper() {
  return (
    <div className="profile-seller-wrapper">
      {/* Apply custom styles to adapt ProfileSeller to dashboard layout */}
      <style jsx>{`
        .profile-seller-wrapper :global(h1) {
          display: none; /* Hide the original heading */
        }
        
        .profile-seller-wrapper :global(.min-h-screen) {
          min-height: unset;
          background: none;
          padding: 0;
        }
        
        .profile-seller-wrapper :global(.max-w-4xl) {
          max-width: 100%;
          margin: 0;
        }
        
        .profile-seller-wrapper :global(button[type="button"]:has(.lucide-log-out)) {
          display: none; /* Hide the duplicate logout button */
        }
      `}</style>
      
      {/* Include the actual ProfileSeller component */}
      <ProfileSeller />
    </div>
  );
}