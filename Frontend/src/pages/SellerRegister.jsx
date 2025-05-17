// src/pages/SellerRegister.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SellerRegister() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", whatsapp: "", address: "",
    country: "", city: "", postalCode: "", sellerType: "solo",
    companyName: "", companyAddress: "", companyPhone: "", password: ""
  });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/sellers/register", formData);
      alert("Seller Registered Successfully");
      navigate("/seller/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Seller Registration</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="phone" placeholder="Phone" required onChange={handleChange} />
        <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} />
        <input name="address" placeholder="Address" required onChange={handleChange} />
        <input name="country" placeholder="Country" required onChange={handleChange} />
        <input name="city" placeholder="City" required onChange={handleChange} />
        <input name="postalCode" placeholder="Postal Code" required onChange={handleChange} />

        <label>Seller Type</label>
        <select name="sellerType" onChange={handleChange} value={formData.sellerType}>
          <option value="solo">Solo</option>
          <option value="company">Company</option>
        </select>

        {formData.sellerType === "company" && (
          <>
            <input name="companyName" placeholder="Company Name" onChange={handleChange} />
            <input name="companyAddress" placeholder="Company Address" onChange={handleChange} />
            <input name="companyPhone" placeholder="Company Phone" onChange={handleChange} />
          </>
        )}

        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit" className="btn-submit">Register</button>
      </form>
    </div>
  );
}

export default SellerRegister;
