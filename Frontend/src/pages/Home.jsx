import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTshirt, FaUserFriends, FaTruck } from 'react-icons/fa';
import axios from 'axios';
import FrockImage from '../images/hero5.svg';
import MenImage from '../images/men1.jpg';
import WomenImage from '../images/women.jpg';
import KidsImage from '../images/kids.jpg';
import News from '../images/hero1.png';


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the API
    setLoading(true);
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        // Get one product from each category
        const menProduct = res.data.find(p => p.category.toLowerCase() === 'men');
        const womenProduct = res.data.find(p => p.category.toLowerCase() === 'women');
        const kidsProduct = res.data.find(p => p.category.toLowerCase() === 'kids');
        
        // Create featured products array
        const featured = [
          menProduct,
          womenProduct, 
          kidsProduct,
          // Add a fourth product (could be random or the highest rated)
          res.data.find(p => p._id !== menProduct?._id && p._id !== womenProduct?._id && p._id !== kidsProduct?._id)
        ].filter(Boolean); // Remove any undefined items if a category wasn't found
        
        // Use mock data as fallback if API doesn't return enough products
        if (featured.length < 3) {
          const mockProducts = [
            {
              _id: '1',
              name: 'Summer Collection Dress',
              dressName: 'Floral Maxi Dress',
              images: ['../images/Frock 1.jpg'],
              price: 89.99,
              category: 'Women',
              seller: { name: 'Fashion Forward' }
            },
            {
              _id: '2',
              name: 'Premium Fit Shirt',
              dressName: 'Casual Oxford Button-Down',
              images: ['../images/shirt 5.jpeg'],
              price: 59.99,
              category: 'Men',
              seller: { name: 'Urban Style Co.' }
            },
            {
              _id: '3',
              name: 'Kids Play Set',
              dressName: 'Adventure Outdoors Set',
              images: ['../images/Tshirt 2.jpg'],
              price: 45.99,
              category: 'Kids',
              seller: { name: 'Little Explorers' }
            },
            {
              _id: '4',
              name: 'Seasonal Jacket',
              dressName: 'All-Weather Light Jacket',
              images: ['../images/shirt 2.jpg'],
              price: 120.99,
              category: 'Men',
              seller: { name: 'Outerwear Specialists' }
            }
          ];
          
          // Fill in with mock products if needed
          setFeaturedProducts([...featured, ...mockProducts].slice(0, 4));
        } else {
          setFeaturedProducts(featured.slice(0, 4)); // Limit to 4 featured products
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        // Fallback to mock data on error
        const mockProducts = [
          {
            _id: '1',
            name: 'Summer Collection Dress',
            dressName: 'Floral Maxi Dress',
            images: ['../images/Frock 1.jpg'],
            price: 89.99,
            category: 'Women',
            seller: { name: 'Fashion Forward' }
          },
          {
            _id: '2',
            name: 'Premium Fit Shirt',
            dressName: 'Casual Oxford Button-Down',
            images: ['../images/shirt 5.jpeg'],
            price: 59.99,
            category: 'Men',
            seller: { name: 'Urban Style Co.' }
          },
          {
            _id: '3',
            name: 'Kids Play Set',
            dressName: 'Adventure Outdoors Set',
            images: ['../images/Tshirt 2.jpg'],
            price: 45.99,
            category: 'Kids',
            seller: { name: 'Little Explorers' }
          },
          {
            _id: '4',
            name: 'Seasonal Jacket',
            dressName: 'All-Weather Light Jacket',
            images: ['../images/shirt 2.jpg'],
            price: 120.99,
            category: 'Men',
            seller: { name: 'Outerwear Specialists' }
          }
        ];
        setFeaturedProducts(mockProducts);
        setError('Failed to load products from server. Showing sample products instead.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Discover Your Style at LIZARD
              </h1>
              <p className="text-xl text-emerald-50 mb-8">
                Trendy, sustainable fashion for everyone. Redefine your wardrobe with our latest collections.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/men" 
                  className="bg-white text-emerald-600 hover:bg-emerald-50 py-3 px-6 rounded-lg font-medium transition-colors duration-200 inline-flex items-center"
                >
                  Shop Men's
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link 
                  to="/women" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                >
                  Shop Women's
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-64 h-64 bg-emerald-300 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-teal-300 rounded-full opacity-20"></div>
                <img 
                  src={FrockImage} 
                  alt="Fashion collection showcase" 
                  className="relative z-10 rounded-lg shadow-xl h-96 w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Men's Category */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src={MenImage} 
                alt="Men's Collection" 
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Men's Collection</h3>
                <p className="text-emerald-200 mb-4">Sophisticated & Modern</p>
                <Link 
                  to="/men" 
                  className="bg-white text-emerald-600 hover:bg-emerald-50 py-2 px-4 rounded font-medium inline-flex items-center transition-colors duration-200"
                >
                  Explore
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Women's Category */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src={WomenImage}
                alt="Women's Collection" 
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Women's Collection</h3>
                <p className="text-emerald-200 mb-4">Elegant & Trendy</p>
                <Link 
                  to="/women" 
                  className="bg-white text-emerald-600 hover:bg-emerald-50 py-2 px-4 rounded font-medium inline-flex items-center transition-colors duration-200"
                >
                  Explore
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Kids' Category */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src={KidsImage} 
                alt="Kids' Collection" 
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Kids' Collection</h3>
                <p className="text-emerald-200 mb-4">Playful & Comfortable</p>
                <Link 
                  to="/kids" 
                  className="bg-white text-emerald-600 hover:bg-emerald-50 py-2 px-4 rounded font-medium inline-flex items-center transition-colors duration-200"
                >
                  Explore
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <div className="flex space-x-4">
              <Link 
                to="/men" 
                className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
              >
                Women
              </Link>
              <Link 
                to="/kids" 
                className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
              >
                Kids
              </Link>
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">{error}</p>
            </div>
          )}
          
          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product._id} className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
                  <div className="relative h-64 overflow-hidden">
                    {/* Use either API image path or fallback to local image */}
                    <img 
                      src={product.images && product.images[0] && product.images[0].startsWith('http') 
                        ? product.images[0]
                        : product.images && product.images[0] 
                          ? `http://localhost:4000/uploads/${product.images[0]}`
                          : '/images/placeholder.png'}
                      alt={product.dressName || product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = '/images/placeholder.png';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      {product.seller?.name || product.sellerName || 'Brand'}
                    </p>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {product.dressName || product.name || 'Product'}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-emerald-600">
                        RS.{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </p>
                      <Link 
                        to={`/product/${product._id}`}
                        className="text-sm text-emerald-600 hover:text-emerald-700 inline-flex items-center"
                      >
                        Details
                        <FaArrowRight className="ml-1 text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTshirt className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Materials</h3>
              <p className="text-gray-600">Premium fabrics and sustainable materials for longevity and comfort.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserFriends className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ethical Production</h3>
              <p className="text-gray-600">Fair trade practices and ethical working conditions for all our artisans.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping and hassle-free returns on all your favorite styles.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-500 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
                <p className="text-emerald-50 mb-6">
                  Stay updated with the latest trends, exclusive offers, and new arrivals.
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none"
                  />
                  <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-3 rounded-r-lg font-medium transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full opacity-20"></div>
                </div>
                <img 
                  src={News}
                  alt="Fashion newsletter" 
                  className="relative z-10 rounded-lg shadow-xl h-70 w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}