import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    designMaterial: "",
    description: "",
    category: "",
    images: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Enter a valid price.";
    if (!formData.designMaterial.trim()) newErrors.designMaterial = "Material is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.images.length) {
      newErrors.images = "At least one image is required.";
    } else {
      // Validate image type and size (optional)
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i];
        if (!allowedTypes.includes(file.type)) {
          newErrors.images = "Only JPG, JPEG, and PNG files are allowed.";
          break;
        }
        if (file.size > 2 * 1024 * 1024) {
          newErrors.images = "Each image must be under 2MB.";
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      alert("Seller not logged in.");
      return;
    }

    if (!validate()) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("designMaterial", formData.designMaterial);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("seller", sellerId);

      for (let i = 0; i < formData.images.length; i++) {
        data.append("images", formData.images[i]);
      }

      await axios.post("http://localhost:4000/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product added successfully!");
      navigate("/seller/productlist");
    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert("❌ Error adding product: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <br /><br />

        <input type="number" name="price" placeholder="Price" onChange={handleChange} />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
        <br /><br />

        <input type="text" name="designMaterial" placeholder="Material" onChange={handleChange} />
        {errors.designMaterial && <p style={{ color: "red" }}>{errors.designMaterial}</p>}
        <br /><br />

        <input type="text" name="category" placeholder="Category" onChange={handleChange} />
        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
        <br /><br />

        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
        <br /><br />

        <input type="file" name="images" onChange={handleChange} multiple />
        {errors.images && <p style={{ color: "red" }}>{errors.images}</p>}
        <br /><br />

        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "blue", color: "white" }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
