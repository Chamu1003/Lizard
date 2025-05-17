// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaArrowLeft, FaSpinner, FaCreditCard } from 'react-icons/fa';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantityError, setQuantityError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const buyerId = localStorage.getItem("buyerId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!buyerId) {
      navigate('/buyer/login');
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:4000/api/cart/${buyerId}`)
      .then(res => {
        setItems(res.data);
        // Auto-select all items by default for better UX
        setSelectedItems(res.data.map(item => item._id));
      })
      .catch(err => {
        setErrorMessage("Error fetching cart items.");
        console.error("Cart fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [buyerId, navigate]);

  const handleRemove = (cartItemId) => {
    axios.delete(`http://localhost:4000/api/cart/${cartItemId}`)
      .then(() => {
        setItems(prev => prev.filter(i => i._id !== cartItemId));
        setSelectedItems(prev => prev.filter(id => id !== cartItemId));
      })
      .catch(err => {
        setErrorMessage("Error removing item from cart.");
        console.error("Remove error:", err);
      });
  };

  const handleSelect = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(items.map(item => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleQuantityChange = (itemId, newQty) => {
    const quantity = parseInt(newQty, 10);
    if (!quantity || quantity < 1) {
      setQuantityError('Quantity must be a positive number.');
      return;
    }
    setQuantityError('');

    axios.put(`http://localhost:4000/api/cart/${itemId}`, { quantity })
      .then(res => {
        const updatedItem = res.data;
        setItems(prev =>
          prev.map(item =>
            item._id === itemId ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
      })
      .catch(err => {
        setErrorMessage("Error updating quantity.");
        console.error("Quantity update error:", err);
      });
  };

  // Calculate subtotal, taxes, and total
  const selectedItemsData = items.filter(i => selectedItems.includes(i._id) && i.product);
  const subtotal = selectedItemsData
    .reduce((sum, i) => sum + (parseFloat(i.product.price) * i.quantity), 0);
  
  const tax = subtotal * 0.18; // Assuming 18% GST
  const total = subtotal + tax;

  const proceedToPurchase = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed.");
      return;
    }
    const selectedProducts = items.filter(i => selectedItems.includes(i._id) && i.product);
    navigate('/checkout', { state: { items: selectedProducts, total: total.toFixed(2) } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <span className="ml-3 text-lg text-gray-600">Loading your cart...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back navigation */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <FaArrowLeft className="mr-2" />
        Continue Shopping
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaShoppingBag className="mr-2 text-blue-600" />
                Your Shopping Cart
              </h2>
              {errorMessage && (
                <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <Link 
                  to="/" 
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                {/* Cart header */}
                <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-8">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selectedItems.length === items.length}
                        onChange={handleSelectAll}
                      />
                    </div>
                    <div className="w-16"></div> {/* For image */}
                    <div className="flex-grow font-medium">Product</div>
                    <div className="w-32 text-center font-medium">Price</div>
                    <div className="w-32 text-center font-medium">Quantity</div>
                    <div className="w-32 text-center font-medium">Total</div>
                    <div className="w-16"></div> {/* For actions */}
                  </div>
                </div>

                {/* Cart items */}
                <div className="divide-y divide-gray-200">
                  {items.map(item => {
                    const product = item.product;
                    if (!product) return null;

                    const itemTotal = (parseFloat(product.price) * item.quantity).toFixed(2);

                    return (
                      <div key={item._id} className="p-4 hover:bg-gray-50 transition">
                        <div className="flex items-center">
                          {/* Checkbox */}
                          <div className="w-8">
                            <input
                              type="checkbox"
                              className="h-4 w-4"
                              checked={selectedItems.includes(item._id)}
                              onChange={() => handleSelect(item._id)}
                            />
                          </div>

                          {/* Product Image */}
                          <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                            <img
                              src={`http://localhost:4000/uploads/${product.images?.[0] || 'default.jpg'}`}
                              alt={product.name || 'Product'}
                              className="h-full w-full object-cover object-center"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/images/placeholder.png';
                              }}
                            />
                          </div>

                          {/* Product Name */}
                          <div className="ml-4 flex-grow">
                            <h3 className="text-base font-medium text-gray-800">
                              <Link to={`/product/${product._id}`} className="hover:text-blue-600">
                                {product.name || product.dressName}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.material || product.designMaterial || 'Standard'}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="w-32 text-center">
                            <p className="text-gray-700">₹{parseFloat(product.price).toFixed(2)}</p>
                          </div>

                          {/* Quantity */}
                          <div className="w-32 flex justify-center">
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="px-2 py-1 border-r text-gray-600 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={e => handleQuantityChange(item._id, e.target.value)}
                                className="w-12 text-center border-none focus:outline-none focus:ring-0"
                              />
                              <button 
                                className="px-2 py-1 border-l text-gray-600 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="w-32 text-center">
                            <p className="font-medium text-blue-600">₹{itemTotal}</p>
                          </div>

                          {/* Actions */}
                          <div className="w-16 flex justify-end">
                            <button 
                              onClick={() => handleRemove(item._id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              aria-label="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        {quantityError && item._id === quantityError.itemId && (
                          <p className="text-sm text-red-500 ml-8 mt-1">{quantityError.message}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        {items.length > 0 && (
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                Order Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal ({selectedItemsData.length} items)</p>
                  <p className="text-gray-800 font-medium">₹{subtotal.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax (18% GST)</p>
                  <p className="text-gray-800 font-medium">₹{tax.toFixed(2)}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <p className="text-lg font-bold text-gray-800">Total</p>
                    <p className="text-lg font-bold text-blue-600">₹{total.toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Including GST and all applicable taxes
                  </p>
                </div>
                
                <button
                  onClick={proceedToPurchase}
                  disabled={selectedItems.length === 0}
                  className={`w-full mt-6 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    selectedItems.length === 0 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  <FaCreditCard className="mr-2" />
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-center">
                  <Link 
                    to="/" 
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    or Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}