import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import ProfileSeller from './ProfileSeller';
import AddProduct from './AddProduct'; // Import the AddProduct component

export default function SellerDashboard() {
  // State to track which component to display in the main content area
  const [activeComponent, setActiveComponent] = useState('profile'); // Default to profile

  const handleLogout = () => {
    localStorage.removeItem("sellerId");
    window.location.href = "/login";
  };

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'add-product':
        return <AddProductWrapper />;
      case 'profile':
        return <ProfileSellerWrapper />;
      case 'product-list':
        // You would implement or import your ProductList component here
        return <div className="p-8">Product List Component</div>;
      case 'requests':
        // You would implement or import your Requests component here
        return <div className="p-8">Buyer Requests Component</div>;
      default:
        return <ProfileSellerWrapper />;
    }
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
              <button
                onClick={() => setActiveComponent('add-product')}
                className={`w-full text-left block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors ${
                  activeComponent === 'add-product' ? 'bg-blue-100 text-blue-600' : ''
                }`}
              >
                Add Product
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('product-list')}
                className={`w-full text-left block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors ${
                  activeComponent === 'product-list' ? 'bg-blue-100 text-blue-600' : ''
                }`}
              >
                Product List
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('profile')}
                className={`w-full text-left block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors ${
                  activeComponent === 'profile' ? 'bg-blue-100 text-blue-600' : ''
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('requests')}
                className={`w-full text-left block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors ${
                  activeComponent === 'requests' ? 'bg-blue-100 text-blue-600' : ''
                }`}
              >
                Buyer Requests
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Dynamic Header based on active component */}
        <div className="flex justify-between items-center p-8 bg-white shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeComponent === 'add-product' && 'Add Product'}
            {activeComponent === 'profile' && 'Seller Profile'}
            {activeComponent === 'product-list' && 'Product List'}
            {activeComponent === 'requests' && 'Buyer Requests'}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Render the active component */}
        <div className="p-4">
          {renderComponent()}
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

// This wrapper component handles the styling adjustments needed to embed AddProduct in the dashboard
function AddProductWrapper() {
  return (
    <div className="add-product-wrapper">
      {/* Apply custom styles to adapt AddProduct to dashboard layout */}
      <style jsx>{`
        .add-product-wrapper :global(h1) {
          display: none; /* Hide the original heading */
        }

        .add-product-wrapper :global(.py-8) {
          padding-top: 0;
          padding-bottom: 0;
        }
        
        .add-product-wrapper :global(.max-w-4xl) {
          max-width: 100%;
          margin: 0;
        }
        
        .add-product-wrapper :global(.mb-8) {
          margin-bottom: 1rem;
        }
      `}</style>
      
      {/* Include the actual AddProduct component */}
      <AddProduct />
    </div>
  );
}