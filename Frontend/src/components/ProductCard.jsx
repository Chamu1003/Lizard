// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, isAuthenticated, userRole }) {
  // Handle server-side image paths or use placeholder
  const defaultImage = '/images/placeholder.png';
  
  // Validate and select image URL
  const getImageUrl = () => {
    if (product?.images?.length > 0) {
      // Handle relative image paths from server uploads directory
      return `http://localhost:4000/uploads/${product.images[0]}`;
    } else if (product?.photos?.length > 0 && /^https?:\/\//.test(product.photos[0])) {
      // Handle full URLs from photos array if present
      return product.photos[0];
    }
    return defaultImage;
  };

  // Price formatting
  const price = Number(product.price);
  const displayPrice = !isNaN(price) ? `₹${price.toFixed(2)}` : 'Price Not Available';
  
  // Get product name from either dressName or name property
  const productName = product.dressName || product.name || 'Product';
  
  // Get material info from either material or designMaterial property
  const materialInfo = product.material || product.designMaterial || 'Not specified';

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-300">
      {/* Image Section */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="h-64 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={getImageUrl()}
            alt={productName}
            className="object-cover h-full w-full"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultImage;
            }}
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{productName}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{materialInfo}</p>
        <p className="text-blue-600 font-semibold mb-2">{displayPrice}</p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>

        {/* Seller Details */}
        <div className="text-sm text-gray-500 mb-4">
          <p>Seller: <span className="text-gray-700 font-medium">
            {product.sellerName || (product.seller && product.seller.name) || 'Unknown Seller'}
          </span></p>
          <p>Seller ID: <span className="text-gray-700 font-medium">{product.sellerId || (product.seller && product.seller._id)}</span></p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link 
            to={`/product/${product._id}`} 
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition"
          >
            View Details
          </Link>
          
          {isAuthenticated && userRole === 'buyer' && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                // This would be implemented with a cart context/state in a real app
                alert(`Product "${productName}" added to cart!`);
              }}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}