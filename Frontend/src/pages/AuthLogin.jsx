import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyerLogin from '../pages/BuyerLogin';
import SellerLogin from '../pages/SellerLogin';

export default function AuthLogin() {
  const [loginType, setLoginType] = useState(null);
  const navigate = useNavigate();

  // Handle login type selection
  const handleLoginTypeSelect = (type) => {
    setLoginType(type);
  };

  // Render the login type selection screen
  const renderLoginSelection = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Choose Login Type</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleLoginTypeSelect('buyer')}
              className="py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 flex flex-col items-center justify-center"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Login as Buyer
            </button>
            
            <button
              onClick={() => handleLoginTypeSelect('seller')}
              className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition duration-300 flex flex-col items-center justify-center"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Login as Seller
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Show the selected login form or the selection screen
  if (loginType === 'buyer') {
    return <BuyerLogin />;
  } else if (loginType === 'seller') {
    return <SellerLogin />;
  } else {
    return renderLoginSelection();
  }
}