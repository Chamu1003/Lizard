// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaShoppingCart, FaSpinner, FaMinus, FaPlus } from 'react-icons/fa';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const buyerId = localStorage.getItem("buyerId");

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!buyerId) {
      alert("Please log in as a buyer first.");
      navigate('/buyer/login');
      return;
    }

    // Add to cart logic
    axios.post("http://localhost:4000/api/cart", {
      buyerId,
      productId: product._id,
      quantity
    })
    .then(() => {
      // Show confirmation message
      const confirmAdd = window.confirm("Product added to cart successfully! Do you want to view your cart?");
      if (confirmAdd) {
        // Redirect to cart page
        navigate('/cart');
      }
    })
    .catch(err => console.error("Add to cart error:", err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <span className="ml-3 text-lg text-gray-600">Loading product details...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Product not found.</p>
        <button 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Prepare image URLs
  const imageUrls = product.images?.length > 0 
    ? product.images.map(img => `http://localhost:4000/uploads/${img}`)
    : ['/images/placeholder.png'];

  const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);
  
  // Get product name from either name property
  const productName = product.name || 'Product';
  
  // Get material info from designMaterial property
  const materialInfo = product.designMaterial || 'Not specified';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Products
      </button>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Images */}
          <div className="md:w-1/2 p-6">
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              <img
                src={imageUrls[activeImage]}
                alt={productName}
                className="object-contain max-h-full max-w-full"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = '/images/placeholder.png';
                }}
              />
            </div>
            
            {/* Thumbnail gallery */}
            {imageUrls.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {imageUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-20 w-20 flex-shrink-0 rounded border-2 transition ${
                      activeImage === idx 
                        ? 'border-blue-500 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${productName} thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover rounded"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = '/images/placeholder.png';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{productName}</h1>
            
            <div className="mb-4">
              <p className="text-2xl font-semibold text-blue-600">Rs.{product.price}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Description</h3>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Material</h3>
                <p className="mt-2 text-gray-700">{materialInfo}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</h3>
                <p className="mt-2 text-gray-700">{product.category || 'Uncategorized'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Seller</h3>
                <p className="mt-2 text-gray-700">{product.seller?.name || 'Unknown Seller'}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Quantity</h3>
              <div className="flex items-center mt-2 border rounded w-min">
                <button 
                  onClick={decreaseQty}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <FaMinus />
                </button>
                <span className="px-4 py-2 border-l border-r">{quantity}</span>
                <button 
                  onClick={increaseQty}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            
            <div className="mt-2 mb-6">
              <p className="text-lg font-medium">Total: <span className="text-blue-600 font-semibold">Rs.{totalPrice}</span></p>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              
              <button 
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}