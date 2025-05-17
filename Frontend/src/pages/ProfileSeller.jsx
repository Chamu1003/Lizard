import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileSeller() {
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    sellerType: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    if (sellerId) {
      setIsLoading(true);
      axios
        .get(`http://localhost:4000/api/sellers/${sellerId}`)
        .then((response) => {
          setSellerData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage("Error fetching seller data");
          setIsLoading(false);
          console.error(error);
        });
    } else {
      setErrorMessage("Seller not logged in");
      navigate("/login");
    }
  }, [sellerId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerData({ ...sellerData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`http://localhost:4000/api/sellers/update/${sellerId}`, sellerData)
      .then((response) => {
        setIsLoading(false);
        alert(response.data.message || "Profile updated successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Error updating profile");
        console.error(error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (confirmDelete) {
      setIsLoading(true);
      axios
        .delete(`http://localhost:4000/api/sellers/delete/${sellerId}`)
        .then((response) => {
          alert(response.data.message || "Account deleted successfully");
          localStorage.removeItem("sellerId");
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage("Error deleting account");
          console.error(error);
        });
    }
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Seller Profile
        </h2>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(sellerData).map(([key, value]) => {
              // Skip the company fields if the seller is not a company
              if (
                (key === "companyName" || key === "companyAddress" || key === "companyPhone") &&
                sellerData.sellerType !== "company"
              ) {
                return null;
              }

              // Skip the password field if it exists
              if (key === "password") return null;

              return (
                <div key={key} className="space-y-1">
                  <label 
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {formatLabel(key)}
                  </label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    id={key}
                    value={value || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Danger Zone
        </h3>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default ProfileSeller;