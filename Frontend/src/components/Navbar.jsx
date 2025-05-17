// src/components/Navbar.jsx - Updated with AuthLogin link
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold tracking-wider text-emerald-600">LIZARD</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/men" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-200">Men</Link>
          <Link to="/women" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-200">Women</Link>
          <Link to="/kids" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-200">Kids</Link>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            // Show cart if logged in
            <Link to="/cart" className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-medium hover:bg-emerald-100 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Cart
            </Link>
          ) : (
            // Show login and register buttons if not logged in
            <>
              <Link to="/auth/login" className="px-4 py-2 text-gray-600 font-medium hover:text-emerald-500 transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4 pb-3">
            <Link to="/men" className="text-gray-600 hover:text-emerald-500 px-4 py-2">Men</Link>
            <Link to="/women" className="text-gray-600 hover:text-emerald-500 px-4 py-2">Women</Link>
            <Link to="/kids" className="text-gray-600 hover:text-emerald-500 px-4 py-2">Kids</Link>
            
            {isLoggedIn ? (
              // Show cart if logged in
              <Link to="/cart" className="flex items-center px-4 py-2 text-emerald-600 font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Cart
              </Link>
            ) : (
              // Show login and register buttons if not logged in
              <>
                <Link to="/auth/login" className="text-gray-600 hover:text-emerald-500 px-4 py-2">
                  Login
                </Link>
                <Link to="/register" className="text-emerald-600 font-medium px-4 py-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}