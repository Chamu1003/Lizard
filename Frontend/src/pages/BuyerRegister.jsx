import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BuyerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//..................................................validation ............................................
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email.";
    if (!formData.phone.match(/^\d{10,15}$/)) newErrors.phone = "Phone must be 10–15 digits.";
    if (formData.whatsapp && !formData.whatsapp.match(/^\d{10,15}$/)) newErrors.whatsapp = "WhatsApp must be 10–15 digits.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.postalCode.match(/^\d{4,10}$/)) newErrors.postalCode = "Invalid postal code.";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:4000/api/buyers/register", formData);
      alert("✅ Buyer Registered Successfully");
      navigate("/buyer/login");
    } catch (error) {
      alert(error.response?.data?.message || "❌ Registration Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Buyer Registration</h2>
      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-2 gap-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "WhatsApp", name: "whatsapp", type: "text" },
          { label: "Address", name: "address", type: "text" },
          { label: "Country", name: "country", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "Postal Code", name: "postalCode", type: "text" },
          { label: "Password", name: "password", type: "password" }
        ].map(({ label, name, type }) => (
          <div key={name} className="col-span-1">
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={label}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors[name] && <p className="text-sm text-red-500 mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
