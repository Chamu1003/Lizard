import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Women() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    sortBy: 'default'
  });

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        const womenProducts = res.data.filter(p => p.category.toLowerCase() === 'women');
        setProducts(womenProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching women products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Apply filters and sorting
  const filteredProducts = () => {
    let result = [...products];
    
    // Price filtering
    if (filters.priceRange === 'under1000') {
      result = result.filter(p => p.price < 1000);
    } else if (filters.priceRange === '1000to3000') {
      result = result.filter(p => p.price >= 1000 && p.price <= 3000);
    } else if (filters.priceRange === 'above3000') {
      result = result.filter(p => p.price > 3000);
    }
    
    // Sorting
    if (filters.sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    
    return result;
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Banner */}
      <div className="bg-pink-600 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">Women's Collection</h1>
          <p className="text-pink-100 text-center mt-2">Discover our latest women's fashion items</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filters Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <span className="font-medium text-gray-700 mr-4">Filter by:</span>
              <select 
                name="priceRange" 
                value={filters.priceRange} 
                onChange={handleFilterChange}
                className="border rounded py-1 px-2 text-gray-700"
              >
                <option value="all">All Prices</option>
                <option value="under1000">Under Rs.1000</option>
                <option value="1000to3000">Rs.1000 - Rs.3000</option>
                <option value="above3000">Above Rs.3000</option>
              </select>
            </div>
            
            <div>
              <span className="font-medium text-gray-700 mr-4">Sort by:</span>
              <select 
                name="sortBy" 
                value={filters.sortBy} 
                onChange={handleFilterChange}
                className="border rounded py-1 px-2 text-gray-700"
              >
                <option value="default">Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <p className="text-gray-600 mb-4">
            Showing {filteredProducts().length} product{filteredProducts().length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!loading && !error && filteredProducts().map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              isAuthenticated={true} // You would pass these props from your auth context
              userRole="buyer"       // You would pass these props from your auth context
            />
          ))}
        </div>

        {/* Empty State */}
        {!loading && !error && filteredProducts().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
            <button 
              onClick={() => setFilters({ priceRange: 'all', sortBy: 'default' })}
              className="mt-4 bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Back to Categories Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/" 
            className="inline-block bg-gray-200 text-gray-800 py-2 px-6 rounded-full hover:bg-gray-300 transition"
          >
            ← Back to Categories
          </Link>
        </div>
      </div>
    </div>
  );
}