import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    designMaterial: "",
    description: "",
    category: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/products/${productId}`);
        const p = res.data;
        setForm({
          name: p.name,
          price: p.price,
          designMaterial: p.designMaterial,
          description: p.description,
          category: p.category,
          images: [], // No images initially
        });
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred while fetching product.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("designMaterial", form.designMaterial);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("seller", localStorage.getItem("sellerId"));

    form.images.forEach((file) => formData.append("images", file)); // Append images

    try {
      await axios.put(`http://localhost:4000/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set the right content type
        },
      });
      alert("Product updated successfully!");
      navigate("/seller/productlist");
    } catch (error) {
      console.error(error);
      alert("Update failed: " + error.response?.data?.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Update Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        required
      />
      <input
        name="designMaterial"
        value={form.designMaterial}
        onChange={handleChange}
        placeholder="Material"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <button type="submit">Update Product</button>
    </form>
  );
}

export default UpdateProduct;
