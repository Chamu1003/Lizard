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
    <div style={{ padding: 20 }}>
      <h2>Incoming Purchase Requests</h2>
      {orders.map(o => (
        <div key={o._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <p><strong>Buyer:</strong> {o.buyer?.name || 'Unknown Buyer'}</p>
          <p><strong>Status:</strong> {o.status}</p>
          <div>
            <strong>Items:</strong>
            <ul>
              {o.items.map(it => (
                <li key={it.cartItem}>
                  {it.product?.name || 'Unknown Product'} × {it.quantity}
                </li>
              ))}
            </ul>
          </div>
          {o.status === 'pending' && (
            <button onClick={() => confirm(o._id)}>Confirm</button>
          )}
        </div>
      ))}
    </div>
  );
}
