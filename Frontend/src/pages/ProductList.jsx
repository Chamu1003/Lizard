import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    if (sellerId) fetchProducts();
  }, [sellerId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      const myProducts = res.data.filter(
        (product) => product?.seller?._id === sellerId
      );
      setProducts(myProducts);
    } catch (error) {
      console.error(error);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${productId}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      setError("Error deleting product");
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="container">
      <h2 className="header">My Products</h2>
      {error && <p className="error-message">{error}</p>}
      {products.length === 0 ? (
        <p className="no-products">No products found. Please add some!</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p><b>Material:</b> {product.designMaterial}</p>
            <p><b>Price:</b> {product.price}</p>
            <p><b>Description:</b> {product.description}</p>
            <p><b>Category:</b> {product.category}</p>
            <div className="product-images">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/uploads/${img}`}
                  alt="Product"
                />
              ))}
            </div>
            <div className="button-group">
              <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
              <button onClick={() => handleEdit(product._id)} className="update-btn">Update</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
