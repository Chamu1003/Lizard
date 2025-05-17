import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Save, Trash2, UserCircle, Phone, MapPin, Mail, Briefcase } from "lucide-react";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    if (sellerId) {
      setIsLoading(true);
      fetch(`http://localhost:4000/api/sellers/${sellerId}`)
        .then(response => {
          if (!response.ok) throw new Error("Failed to fetch");
          return response.json();
        })
        .then(data => {
          setSellerData(data);
          setIsLoading(false);
        })
        .catch(error => {
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
    setSuccessMessage("");
    setErrorMessage("");
    
    fetch(`http://localhost:4000/api/sellers/update/${sellerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sellerData)
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to update");
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setSuccessMessage(data.message || "Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      })
      .catch(error => {
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
      fetch(`http://localhost:4000/api/sellers/delete/${sellerId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) throw new Error("Failed to delete");
          return response.json();
        })
        .then(data => {
          alert(data.message || "Account deleted successfully");
          localStorage.removeItem("sellerId");
          navigate("/");
        })
        .catch(error => {
          setIsLoading(false);
          setErrorMessage("Error deleting account");
          console.error(error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerId");
    navigate("/login");
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  if (isLoading && !sellerData.name) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  const personalFields = ["name", "email", "phone", "whatsapp"];
  const addressFields = ["address", "country", "city", "postalCode"];
  const companyFields = ["companyName", "companyAddress", "companyPhone"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Seller Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-6 px-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <UserCircle size={64} className="text-purple-600" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">{sellerData.name || "Seller Name"}</h2>
                <p className="text-blue-100">{sellerData.email}</p>
                <p className="text-blue-100">{sellerData.sellerType === "company" ? "Business Account" : "Individual Seller"}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex-1 py-4 px-4 text-center font-medium ${
                activeTab === "personal"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`flex-1 py-4 px-4 text-center font-medium ${
                activeTab === "address"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Address
            </button>
            {sellerData.sellerType === "company" && (
              <button
                onClick={() => setActiveTab("company")}
                className={`flex-1 py-4 px-4 text-center font-medium ${
                  activeTab === "company"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Company
              </button>
            )}
            <button
              onClick={() => setActiveTab("account")}
              className={`flex-1 py-4 px-4 text-center font-medium ${
                activeTab === "account"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Account
            </button>
          </div>

          {/* Messages */}
          {errorMessage && (
            <div className="mx-8 mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center">
              <span className="mr-2">⚠️</span>
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="mx-8 mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md flex items-center animate-pulse">
              <span className="mr-2">✅</span>
              {successMessage}
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleUpdate} className="p-8">
            <div className="space-y-8">
              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Mail className="text-purple-500" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {personalFields.map(key => (
                      <div key={key} className="space-y-2">
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                          {formatLabel(key)}
                        </label>
                        <input
                          type={key === "email" ? "email" : key.includes("phone") || key.includes("whatsapp") ? "tel" : "text"}
                          name={key}
                          id={key}
                          value={sellerData[key] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === "address" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="text-purple-500" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800">Address Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addressFields.map(key => (
                      <div key={key} className="space-y-2">
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                          {formatLabel(key)}
                        </label>
                        <input
                          type="text"
                          name={key}
                          id={key}
                          value={sellerData[key] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Tab */}
              {activeTab === "company" && sellerData.sellerType === "company" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="text-purple-500" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800">Company Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {companyFields.map(key => (
                      <div key={key} className="space-y-2">
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                          {formatLabel(key)}
                        </label>
                        <input
                          type={key.includes("Phone") ? "tel" : "text"}
                          name={key}
                          id={key}
                          value={sellerData[key] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span> Danger Zone
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Actions here cannot be undone. Please proceed with caution.
                    </p>
                  </div>
                  
                  <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                    <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                    <p className="text-red-600 mb-4 text-sm">
                      Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                    </p>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <Trash2 size={16} />
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Update Button - only show on tabs with form fields */}
            {(activeTab === "personal" || activeTab === "address" || 
              (activeTab === "company" && sellerData.sellerType === "company")) && (
              <div className="mt-12 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  Update Profile
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSeller;