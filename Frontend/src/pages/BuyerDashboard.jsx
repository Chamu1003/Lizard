// src/pages/BuyerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../components/CategorySection';
import { FaBoxOpen, FaShoppingBag, FaSpinner } from 'react-icons/fa';

export default function BuyerDashboard() {
  const [buyer, setBuyer] = useState(null);
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'requests'
  const buyerId = localStorage.getItem('buyerId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!buyerId) {
      navigate('/buyer/login');
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const [buyerRes, productsRes, ordersRes] = await Promise.all([
          axios.get(`http://localhost:4000/api/buyers/${buyerId}`),
          axios.get('http://localhost:4000/api/products'),
          axios.get(`http://localhost:4000/api/orders/buyer/${buyerId}`)
        ]);
        
        // Process products to ensure they have the correct data structure
        const processedProducts = productsRes.data.map(product => ({
          ...product,
          // Ensure seller data is accessible consistently
          sellerName: product.seller?.name || 'Unknown Seller',
          sellerId: product.seller?._id || 'Unknown'
        }));
        
        setBuyer(buyerRes.data);
        setProducts(processedProducts);
        setRequests(ordersRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [buyerId, navigate]);

  const getCategoryProducts = (category) =>
    products.filter((p) => p.category?.toLowerCase() === category.toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <span className="ml-3 text-lg text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  if (!buyer) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Buyer not found.</p>
        <button 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate('/buyer/login')}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome to your Dashboard, <span className="font-semibold">{buyer.name}</span>!
        </h2>
        <p className="text-blue-100">Browse our latest collections or check your purchase requests.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'products'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('products')}
        >
          <FaShoppingBag className="inline-block mr-2" />
          Shop Products
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'requests'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          <FaBoxOpen className="inline-block mr-2" />
          Your Requests ({requests.length})
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'products' ? (
        <>
          {/* Category Sections */}
          <CategorySection title="Men's Clothing" products={getCategoryProducts('Men')} />
          <CategorySection title="Women's Clothing" products={getCategoryProducts('Women')} />
          <CategorySection title="Kids' Clothing" products={getCategoryProducts('Kids')} />
          
          {/* Display all products if none are categorized */}
          {!getCategoryProducts('Men').length && 
           !getCategoryProducts('Women').length && 
           !getCategoryProducts('Kids').length && (
            <CategorySection title="All Products" products={products} />
          )}
          
          {products.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No products available at the moment.</p>
            </div>
          )}
        </>
      ) : (
        /* Buyer Requests Tab */
        <section>
          <h3 className="text-xl font-semibold mb-4">Your Purchase Requests</h3>

          {requests.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <FaBoxOpen className="mx-auto text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500">You haven't made any purchase requests yet.</p>
              <button 
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setActiveTab('products')}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {requests.map((r) => (
                <div
                  key={r._id}
                  className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">
                      Order #{r._id.substring(r._id.length - 6)}
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      r.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      r.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                      r.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700">
                    <strong>Seller:</strong> {r.seller?.name || 'Unknown Seller'}
                  </p>
                  
                  <div className="mt-2">
                    <strong className="text-sm text-gray-700">Items:</strong>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                      {r.items.map((it, index) => (
                        <li key={it.cartItem || index}>
                          {it.product?.dressName || it.product?.name || 'Unknown Product'} × {it.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-gray-500">
                      Requested on {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}