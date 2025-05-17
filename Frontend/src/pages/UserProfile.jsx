// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  const buyerId = localStorage.getItem("buyerId");

  useEffect(() => {
    if (!buyerId) return;

    const fetchBuyer = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/buyers/${buyerId}`);
        setBuyer(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to load buyer profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyer();
  }, [buyerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/buyers/${buyerId}`, formData);
      setBuyer(response.data.buyer);
      setEditMode(false);
      setUpdateSuccess(true);
      // Auto-hide success message after 5 seconds
      setTimeout(() => setUpdateSuccess(false), 5000);
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    // Using a more styled confirmation dialog instead of window.confirm
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:4000/api/buyers/${buyerId}`);
      localStorage.removeItem("buyerId");
      navigate("/");
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  const handleLogout = () => {
    // Clear buyer data from localStorage
    localStorage.removeItem("buyerId");
    // Any other auth tokens or user data should be cleared here
    
    // Navigate to home page or login page
    navigate("/");
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );
  
  if (!buyer) return (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center max-w-md mx-auto mt-12">
      <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      Buyer not found.
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-3 mr-4">
                <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{buyer.name}</h1>
                <p className="text-emerald-100">{buyer.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="bg-white text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>

          {updateSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Profile updated successfully
            </div>
          )}

          {editMode ? (
            <div className="space-y-4">
              {Object.keys(formData).map((key) => (
                key !== '_id' && key !== 'password' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && (
                  <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key] || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                )
              ))}
              
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={handleUpdate} 
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setEditMode(false)} 
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{buyer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{buyer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{buyer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="font-medium">{buyer.whatsapp || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{buyer.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium">{buyer.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium">{buyer.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Postal Code</p>
                    <p className="font-medium">{buyer.postalCode}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
                <button 
                  onClick={() => setEditMode(true)} 
                  className="flex items-center justify-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  Edit Profile
                </button>
                <button 
                  onClick={handleDelete} 
                  className="flex items-center justify-center bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}