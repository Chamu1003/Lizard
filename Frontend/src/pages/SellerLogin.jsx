import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmMessage from "../components/ConfirmMessage"; // Import the ConfirmMessage component

function SellerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:4000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/api/sellers/login`, formData);

      if (res.status === 200) {
        // Instead of alert, show the confirmation popup
        localStorage.setItem("sellerId", res.data.seller._id);
        setShowConfirmation(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        setErrorMessage(error.response.data.message || "Login Failed");
      } else if (error.request) {
        console.error("No Response from Backend:", error.request);
        setErrorMessage("No response from the server. Please check your connection.");
      } else {
        console.error("Error Message:", error.message);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  // Handle confirmation action (redirect to dashboard)
  const handleConfirm = () => {
    setShowConfirmation(false);
    navigate("/seller/dashboard");
  };

  // Handle close action (just close the popup)
  const handleClose = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-100 to-teal-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">Seller Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/auth/login')}
              className="text-emerald-600 hover:text-emerald-800 font-medium"
            >
              Back to Login Selection
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Popup */}
      <ConfirmMessage
        isOpen={showConfirmation}
        title="Login Successful"
        message="You have successfully logged in to your seller account."
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default SellerLogin;