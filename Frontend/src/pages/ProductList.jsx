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

  if (loading) return <p className="text-lg text-center py-8 text-gray-600">Loading products...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">My Products</h2>
      {error && <p className="p-4 mb-6 bg-red-100 text-red-700 rounded-lg">{error}</p>}
      {products.length === 0 ? (
        <p className="text-lg text-center py-6 text-gray-600">No products found. Please add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="mb-1 text-gray-700"><span className="font-medium">Material:</span> {product.designMaterial}</p>
                <p className="mb-1 text-gray-700"><span className="font-medium">Price:</span> {product.price}</p>
                <p className="mb-1 text-gray-700"><span className="font-medium">Description:</span> {product.description}</p>
                <p className="mb-3 text-gray-700"><span className="font-medium">Category:</span> {product.category}</p>
              </div>
              
              {product.images && product.images.length > 0 && (
                <div className="px-4 pb-3">
                  <div className="grid grid-cols-3 gap-2">
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:4000/uploads/${img}`}
                        alt={`${product.name} thumbnail`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                <button 
                  onClick={() => handleDelete(product._id)} 
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleEdit(product._id)} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;