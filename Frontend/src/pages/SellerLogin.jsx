import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:4000"; // Fixed to match server port

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/api/sellers/login`, formData);

      if (res.status === 200) {
        alert("Login Successful");
        localStorage.setItem("sellerId", res.data.seller._id);
        navigate("/seller/dashboard");
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

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Seller Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
    </div>
  );
}

export default SellerLogin;
