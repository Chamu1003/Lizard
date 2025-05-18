import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SellerRequests() {
  const sellerId = localStorage.getItem('sellerId');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/orders/seller/${sellerId}`)
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, [sellerId]);

  const confirm = (id) => {
    axios.put(`http://localhost:4000/api/orders/${id}/confirm`)
      .then(res => {
        const updated = res.data.order;
        setOrders(o => o.map(x => x._id === id ? updated : x));
      })
      .catch(console.error);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Incoming Purchase Requests</h2>
      
      {orders.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No pending requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
            <div 
              key={o._id} 
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Order ID: {o._id}</span>
                </div>
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      o.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      o.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                      o.status === 'delivered' ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-sm">
                      {(o.buyer?.name || 'Unknown').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{o.buyer?.name || 'Unknown Buyer'}</p>
                    <p className="text-sm text-gray-500">{o.buyer?.email || 'No email provided'}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {o.items.map((it, index) => (
                      <div 
                        key={it.cartItem || index} 
                        className={`px-4 py-3 flex justify-between items-center ${
                          index !== o.items.length - 1 ? 'border-b border-gray-200' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mr-3">
                            <span className="text-xs text-gray-600">IMG</span>
                          </div>
                          <div>
                            <p className="font-medium">{it.product?.name || 'Unknown Product'}</p>
                            <p className="text-xs text-gray-500">
                              {it.product?.sku || 'No SKU'} • {it.product?.category || 'No Category'}
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            × {it.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {o.status === 'pending' && (
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => confirm(o._id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Confirm Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}