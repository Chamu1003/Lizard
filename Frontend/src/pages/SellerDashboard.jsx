import React from 'react';
import { Link, Outlet } from 'react-router-dom';


export default function SellerDashboard() {
  return (
    <div className="seller-dashboard">
      <aside className="sidebar">
        <h2 className="logo">🛍️ Lizard</h2>
        <nav className="menu">
          <Link to="/seller/add-product">Add Product</Link>
          <Link to="/seller/productlist">Product List</Link>
          <Link to="/seller/profile">Profile</Link>
          <Link to="/seller/requests">Buyer Requests</Link>
        </nav>
      </aside>

      <main className="dashboard-content">
        {/* Add a Welcome Message or Dashboard Summary */}
        <section className="dashboard-overview">
          <h3>Welcome back, Seller!</h3>
          <p>Here’s a quick overview of your shop’s activities:</p>
          <div className="stats">
            <div className="stat-item">
              <h4>Total Products</h4>
              <p>12</p> {/* You can dynamically fetch the product count */}
            </div>
            <div className="stat-item">
              <h4>Pending Requests</h4>
              <p>5</p> {/* Similarly, fetch pending requests dynamically */}
            </div>
            <div className="stat-item">
              <h4>Orders in Process</h4>
              <p>3</p> {/* Example dynamic data */}
            </div>
          </div>
        </section>

        <section className="recent-activity">
          <h4>Recent Activity</h4>
          <ul>
            <li>Product "Summer Dress" updated on 04/05/2025</li>
            <li>Order #12345 confirmed on 04/04/2025</li>
            <li>Buyer Request "John Doe" received on 04/03/2025</li>
          </ul>
        </section>

        <Outlet /> {/* Nested page content will render here */}
      </main>
    </div>
  );
}
