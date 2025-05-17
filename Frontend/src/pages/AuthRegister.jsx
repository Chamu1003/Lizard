import { useState } from "react";
import { Link } from "react-router-dom";
import BuyerRegister from "./BuyerRegister";
import SellerRegister from "./SellerRegister";

export default function AuthRegister() {
  const [registerType, setRegisterType] = useState(null);

  // Handle selection of registration type
  const handleRegisterTypeSelect = (type) => {
    setRegisterType(type);
  };

  // If no type is selected yet, show the selection screen
  if (!registerType) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Choose Registration Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buyer Card */}
          <div 
            onClick={() => handleRegisterTypeSelect("buyer")}
            className="border border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center"
          >
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Register as Buyer</h3>
            <p className="text-gray-600 text-center">Create an account to shop and purchase products</p>
          </div>
          
          {/* Seller Card */}
          <div 
            onClick={() => handleRegisterTypeSelect("seller")}
            className="border border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center"
          >
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Register as Seller</h3>
            <p className="text-gray-600 text-center">Create an account to list and sell your products</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account? {" "}
            <Link to="/login" className="text-emerald-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // If a type is selected, render the corresponding component
  return (
    <div>
      <div className="max-w-4xl mx-auto mb-6 pt-6 px-6">
        <button 
          onClick={() => setRegisterType(null)}
          className="flex items-center text-emerald-600 hover:text-emerald-700"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to selection
        </button>
      </div>
      
      {registerType === "buyer" ? <BuyerRegister /> : <SellerRegister />}
    </div>
  );
}