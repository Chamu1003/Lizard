import React, { useState } from 'react';
import { LogOut, MessageSquare } from 'lucide-react';
import ProfileSeller from './ProfileSeller';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import SellerRequests from './SellerRequest';
import Assistant from '../components/Assistant';

export default function SellerDashboard() {
  const [activeComponent, setActiveComponent] = useState('profile');

  const handleLogout = () => {
    localStorage.removeItem("sellerId");
    window.location.href = "/";
  };

  // Function to navigate to product list after adding a product
  const handleProductAdded = () => {
    setActiveComponent('product-list');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add-product':
        return <AddProductWrapper onProductAdded={handleProductAdded} />;
      case 'profile':
        return <ProfileSellerWrapper />;
      case 'product-list':
        return <ProductListWrapper />;
      case 'requests':
        return <SellerRequestsWrapper />;
      case 'assistant':
        return <AssistantWrapper />;
      default:
        return <ProfileSellerWrapper />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-5">
          <h2 className="text-2xl font-bold text-blue-600">Lizard Enterprise</h2>
          <p className="text-sm text-gray-500 mt-1">Merchant Portal</p>
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
            <li>
              <button
                onClick={() => setActiveComponent('assistant')}
                className={`w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors ${
                  activeComponent === 'assistant' ? 'bg-blue-100 text-blue-600' : ''
                }`}
              >
                <MessageSquare size={16} className="mr-2" />
                AI Assistant
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Logout button moved to bottom of sidebar */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 w-full bg-gray-100 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Component content */}
        <div className="p-6">
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
      <style jsx>{`
        .profile-seller-wrapper :global(h1) {
          display: none;
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
          display: none;
        }
      `}</style>
      
      <ProfileSeller />
    </div>
  );
}

// This wrapper component handles the styling adjustments needed to embed AddProduct in the dashboard
// Now passes the onProductAdded callback
function AddProductWrapper({ onProductAdded }) {
  return (
    <div className="add-product-wrapper">
      <style jsx>{`
        .add-product-wrapper :global(h1) {
          display: none;
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
      
      <AddProduct onProductAdded={onProductAdded} />
    </div>
  );
}

// This wrapper component handles the styling adjustments needed to embed ProductList in the dashboard
function ProductListWrapper() {
  return (
    <div className="product-list-wrapper">
      <style jsx>{`
        .product-list-wrapper :global(h2) {
          display: none;
        }

        .product-list-wrapper :global(.py-8) {
          padding-top: 0;
          padding-bottom: 0;
        }
        
        .product-list-wrapper :global(.max-w-6xl) {
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
      
      <ProductList />
    </div>
  );
}

// This wrapper component handles the styling adjustments needed to embed SellerRequests in the dashboard
function SellerRequestsWrapper() {
  return (
    <div className="seller-requests-wrapper">
      <style jsx>{`
        .seller-requests-wrapper :global(h2) {
          display: none;
        }
        
        .seller-requests-wrapper :global(.max-w-6xl) {
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
        
        .seller-requests-wrapper :global(.p-6) {
          padding: 0;
        }
      `}</style>
      
      <SellerRequests />
    </div>
  );
}

// This wrapper component handles any styling adjustments needed for the Assistant component
function AssistantWrapper() {
  return (
    <div className="assistant-wrapper h-full">
      <Assistant />
    </div>
  );
}