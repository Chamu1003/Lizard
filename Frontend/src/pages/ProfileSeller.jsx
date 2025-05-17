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
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    if (sellerId) {
      axios
        .get(`http://localhost:4000/api/sellers/${sellerId}`)
        .then((response) => {
          setSellerData(response.data);
        })
        .catch((error) => {
          setErrorMessage("Error fetching seller data");
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
    axios
      .put(`http://localhost:4000/api/sellers/update/${sellerId}`, sellerData)
      .then((response) => {
        alert(response.data.message || "Profile updated successfully");
      })
      .catch((error) => {
        setErrorMessage("Error updating profile");
        console.error(error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:4000/api/sellers/delete/${sellerId}`)
        .then((response) => {
          alert(response.data.message || "Account deleted successfully");
          localStorage.removeItem("sellerId");
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage("Error deleting account");
          console.error(error);
        });
    }
  };

  return (
    <div className="profile-container">
      <h2>Seller Profile</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleUpdate}>
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
            <div key={key}>
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button type="submit">Update Profile</button>
      </form>

      <button
        onClick={handleDelete}
        className="delete-button"
      >
        Delete Account
      </button>
    </div>
  );
}

export default ProfileSeller;
