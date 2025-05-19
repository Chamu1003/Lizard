import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const { state } = useLocation();
  const items = state?.items || [];
  const total = state?.total || 0;
  const buyerId = localStorage.getItem('buyerId');
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    name: '', email: '', phone: '', whatsapp: '',
    address: '', country: '', city: '', postalCode: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!buyerId) {
      navigate('/buyer/login');
      return;
    }
    axios.get(`http://localhost:4000/api/buyers/${buyerId}`)
      .then(res => setBuyer(res.data))
      .catch(err => {
        console.error('Fetch buyer error:', err);
        alert('Failed to fetch profile. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [buyerId, navigate]);

  const handleChange = (e) => {
    setBuyer(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = () => {
    axios.put(`http://localhost:4000/api/buyers/${buyerId}`, buyer)
      .then(() => alert('Profile updated successfully'))
      .catch(err => {
        console.error('Update buyer error:', err);
        alert('Failed to update profile.');
      });
  };

  const handlePlaceOrder = async () => {
    try {
      const grouped = {};
      for (const item of items) {
        const sellerId = item.product.seller;
        if (!grouped[sellerId]) grouped[sellerId] = [];
        grouped[sellerId].push({
          cartItem: item._id,
          product: item.product._id,
          quantity: item.quantity
        });
      }

      const requests = Object.entries(grouped).map(([seller, items]) =>
        axios.post('http://localhost:4000/api/orders', {
          buyer: buyerId,
          seller,
          items
        })
      );

      await Promise.all(requests);
      alert('Purchase requests sent to sellers.');
      navigate('/buyer/dashboard');
    } catch (err) {
      console.error('Order error:', err);
      alert('Error placing orders. Check console for details.');
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading your profile…</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <section className="mb-10 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Your Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['name', 'email', 'phone', 'whatsapp', 'address', 'country', 'city', 'postalCode'].map(key => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 text-sm font-medium capitalize">{key}:</label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                name={key}
                value={buyer[key] || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveProfile}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Save Profile
        </button>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Order Items</h3>
        <div className="space-y-4">
          {items.map(i => (
            <div key={i._id} className="border-b pb-4">
              <p className="font-medium text-lg">{i.product.name}</p>
              <p>Quantity: {i.quantity}</p>
              <p>Price per unit: Rs. {i.product.price}</p>
              <p>Total: Rs. {(i.product.price * i.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <h3 className="text-xl font-bold mt-6 text-right">Total: Rs. {total}</h3>
        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Place Order
        </button>
      </section>
    </div>
  );
}
